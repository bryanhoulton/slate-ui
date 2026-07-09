import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest'

import { GanttTask } from './Gantt.types'
import {
  MAX_ZOOM,
  MIN_ZOOM,
  UNIT_PRESET_ZOOM
} from './gantt-core'
import {
  GanttCommit,
  GanttEngine
} from './GanttEngine'

process.env.TZ = 'UTC'
const TODAY = new Date(2026, 2, 15)

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(TODAY)
})

afterEach(() => {
  vi.useRealTimers()
})

function d(year: number, month: number, day: number): Date {
  return new Date(year, month - 1, day)
}

function makeTasks(): GanttTask[] {
  return [
    { id: 'p', name: 'Project', type: 'project', start: d(2026, 3, 1), end: d(2026, 3, 1) },
    { id: 'a', name: 'A', parentId: 'p', start: d(2026, 3, 10), end: d(2026, 3, 14), progress: 50 },
    { id: 'b', name: 'B', parentId: 'p', start: d(2026, 3, 16), end: d(2026, 3, 18), progress: 0, dependencies: ['a'] },
    { id: 'm', name: 'M', type: 'milestone', start: d(2026, 3, 20), end: d(2026, 3, 20) },
    { id: 'locked', name: 'Locked', start: d(2026, 3, 1), end: d(2026, 3, 2), disabled: true }
  ]
}

describe('GanttEngine zoom', () => {
  it('derives the unit from zoom and clamps to bounds', () => {
    const engine = new GanttEngine({ tasks: makeTasks(), zoom: 44 })
    expect(engine.getSnapshot().unit).toBe('day')
    engine.setZoom(UNIT_PRESET_ZOOM.month)
    expect(engine.getSnapshot().unit).toBe('month')
    engine.setZoom(10000)
    expect(engine.getSnapshot().zoom).toBe(MAX_ZOOM)
    engine.setZoom(0)
    expect(engine.getSnapshot().zoom).toBe(MIN_ZOOM)
  })

  it('zoomBy multiplies and notifies listeners exactly once per change', () => {
    const engine = new GanttEngine({ tasks: makeTasks(), zoom: 40 })
    let notifications = 0
    engine.subscribe(() => notifications++)
    engine.zoomBy(0.5)
    expect(engine.getSnapshot().zoom).toBe(20)
    expect(notifications).toBe(1)
    engine.setZoom(20) // no-op
    expect(notifications).toBe(1)
  })

  it('fires onZoomChange and onUnitChange when thresholds are crossed', () => {
    const zooms: number[] = []
    const units: string[] = []
    const engine = new GanttEngine({
      tasks: makeTasks(),
      zoom: 44,
      onZoomChange: (zoom) => zooms.push(zoom),
      onUnitChange: (unit) => units.push(unit)
    })
    engine.zoomBy(0.5) // 22 px/day -> week
    engine.zoomBy(0.5) // 11 px/day -> still week
    expect(zooms).toEqual([22, 11])
    expect(units).toEqual(['week'])
  })

  it('scale total width matches the range at the current zoom', () => {
    const engine = new GanttEngine({ tasks: makeTasks(), zoom: 10 })
    const { scale } = engine.getSnapshot()
    const days =
      (scale.rangeEnd.getTime() - scale.rangeStart.getTime()) / (24 * 3600e3)
    expect(scale.totalWidth).toBeCloseTo(days * 10)
  })

  it('extends the range to fill the viewport', () => {
    const engine = new GanttEngine({ tasks: makeTasks(), zoom: 2.5 })
    engine.setViewportWidth(1200)
    expect(engine.getSnapshot().scale.totalWidth).toBeGreaterThanOrEqual(1200)
  })
})

describe('GanttEngine selection, hover, collapse', () => {
  it('selects and reports changes', () => {
    const selections: (string | number | null)[] = []
    const engine = new GanttEngine({
      tasks: makeTasks(),
      onSelectedChange: (id) => selections.push(id)
    })
    engine.select('a')
    engine.select('a') // no-op
    engine.select(null)
    expect(selections).toEqual(['a', null])
  })

  it('collapsing a project hides its subtree in rows', () => {
    const engine = new GanttEngine({ tasks: makeTasks() })
    expect(engine.getSnapshot().rows.map((r) => r.id)).toEqual([
      'p',
      'a',
      'b',
      'm',
      'locked'
    ])
    engine.toggleCollapse('p')
    expect(engine.getSnapshot().rows.map((r) => r.id)).toEqual([
      'p',
      'm',
      'locked'
    ])
    engine.toggleCollapse('p')
    expect(engine.getSnapshot().rows).toHaveLength(5)
  })
})

describe('GanttEngine drag lifecycle', () => {
  it('refuses to drag projects and disabled tasks', () => {
    const engine = new GanttEngine({ tasks: makeTasks() })
    expect(engine.startDrag('p', 'move')).toBe(false)
    expect(engine.startDrag('locked', 'move')).toBe(false)
    expect(engine.startDrag('a', 'move')).toBe(true)
  })

  it('ignores sub-3px jitter so clicks never become drags', () => {
    const engine = new GanttEngine({ tasks: makeTasks(), zoom: 44 })
    engine.startDrag('a', 'move')
    engine.moveDrag(0.05) // ~2px at 44px/day
    expect(engine.getSnapshot().drag?.moved).toBe(false)
    expect(engine.endDrag()).toBeNull()
  })

  it('previews continuously (unsnapped) while dragging', () => {
    const engine = new GanttEngine({ tasks: makeTasks(), zoom: 44 })
    engine.startDrag('a', 'move')
    engine.moveDrag(1.4)
    const snap = engine.getSnapshot()
    const preview = snap.drag?.preview
    // The bar follows the pointer exactly: 1.4 days, not a whole day.
    expect(preview?.start.getTime()).toBe(
      d(2026, 3, 10).getTime() + 1.4 * 24 * 3600e3
    )
    // But the snapshot already knows where it will land when released.
    expect(snap.drag?.snapped.start).toEqual(d(2026, 3, 11))
    // The live preview flows into row/layout state too.
    const row = snap.rows.find((r) => r.id === 'a')
    expect(row?.start).toEqual(preview?.start)
  })

  it('snaps to the day grid and commits on release', () => {
    const commits: GanttCommit[] = []
    const engine = new GanttEngine({
      tasks: makeTasks(),
      zoom: 44,
      onCommit: (commit) => commits.push(commit)
    })
    engine.startDrag('a', 'move')
    engine.moveDrag(1.4)
    const commit = engine.endDrag()
    expect(commit).not.toBeNull()
    expect(commits).toHaveLength(1)
    expect(commit?.window.start).toEqual(d(2026, 3, 11))
    expect(commit?.window.end).toEqual(d(2026, 3, 15))
    // The override persists after the drag even though the tasks prop is
    // unchanged (uncontrolled usage).
    const row = engine.getSnapshot().rows.find((r) => r.id === 'a')
    expect(row?.start).toEqual(d(2026, 3, 11))
    // Snapping marker is set for the render layer's animation, then cleared.
    expect(engine.getSnapshot().snappingId).toBe('a')
    engine.clearSnapping()
    expect(engine.getSnapshot().snappingId).toBeNull()
  })

  it('still snaps to whole days when zoomed out past the day unit', () => {
    const engine = new GanttEngine({
      tasks: makeTasks(),
      zoom: UNIT_PRESET_ZOOM.week
    })
    expect(engine.getSnapshot().unit).toBe('week')
    engine.startDrag('a', 'move')
    engine.moveDrag(4.4)
    const commit = engine.endDrag()
    // Day-precise even in week view: +4.4 days rounds to +4, not to Monday.
    expect(commit?.window.start).toEqual(d(2026, 3, 14))
    expect(commit?.window.end).toEqual(d(2026, 3, 18))
  })

  it('drops the override once the task prop itself changes (controlled)', () => {
    const tasks = makeTasks()
    const engine = new GanttEngine({ tasks, zoom: 44 })
    engine.startDrag('a', 'move')
    engine.moveDrag(2)
    engine.endDrag()

    // Parent applies the change: new tasks array with the new dates.
    const applied = tasks.map((task) =>
      task.id === 'a'
        ? { ...task, start: d(2026, 3, 12), end: d(2026, 3, 16) }
        : task
    )
    engine.configure({ tasks: applied })
    const row = engine.getSnapshot().rows.find((r) => r.id === 'a')
    expect(row?.start).toEqual(d(2026, 3, 12))

    // Parent later moves it somewhere else entirely: props win over the
    // stale override.
    const moved = applied.map((task) =>
      task.id === 'a'
        ? { ...task, start: d(2026, 4, 1), end: d(2026, 4, 5) }
        : task
    )
    engine.configure({ tasks: moved })
    expect(
      engine.getSnapshot().rows.find((r) => r.id === 'a')?.start
    ).toEqual(d(2026, 4, 1))
  })

  it('progress drags round to whole percents and never move dates', () => {
    const engine = new GanttEngine({ tasks: makeTasks(), zoom: 44 })
    engine.startDrag('a', 'progress')
    engine.moveDrag(1) // 1 day over a 5-day bar = +20%
    const commit = engine.endDrag()
    expect(commit?.window.progress).toBe(70)
    expect(commit?.window.start).toEqual(d(2026, 3, 10))
    expect(commit?.window.end).toEqual(d(2026, 3, 14))
  })

  it('cancelDrag discards the preview without committing', () => {
    const commits: GanttCommit[] = []
    const engine = new GanttEngine({
      tasks: makeTasks(),
      zoom: 44,
      onCommit: (commit) => commits.push(commit)
    })
    engine.startDrag('a', 'move')
    engine.moveDrag(3)
    engine.cancelDrag()
    expect(commits).toHaveLength(0)
    expect(
      engine.getSnapshot().rows.find((r) => r.id === 'a')?.start
    ).toEqual(d(2026, 3, 10))
  })

  it('milestones drag as a single snapped point', () => {
    const engine = new GanttEngine({ tasks: makeTasks(), zoom: 44 })
    engine.startDrag('m', 'move')
    engine.moveDrag(1.6)
    const commit = engine.endDrag()
    expect(commit?.window.start).toEqual(d(2026, 3, 22))
    expect(commit?.window.end).toEqual(d(2026, 3, 22))
  })
})

describe('GanttEngine keyboard nudges', () => {
  it('moves a task by one visible unit of days', () => {
    const commits: GanttCommit[] = []
    const engine = new GanttEngine({
      tasks: makeTasks(),
      zoom: 44,
      onCommit: (commit) => commits.push(commit)
    })
    engine.nudge('a', 'move', 1)
    expect(commits[0].window.start).toEqual(d(2026, 3, 11))
    expect(commits[0].window.end).toEqual(d(2026, 3, 15))
  })

  it('nudges by a week of days at the week unit', () => {
    const commits: GanttCommit[] = []
    const engine = new GanttEngine({
      tasks: makeTasks(),
      zoom: UNIT_PRESET_ZOOM.week,
      onCommit: (commit) => commits.push(commit)
    })
    engine.nudge('a', 'move', 1)
    // Mar 10 + 7 days = Mar 17, exactly; no snapping to Monday.
    expect(commits[0].window.start).toEqual(d(2026, 3, 17))
  })

  it('ignores nudges on projects and disabled tasks', () => {
    const commits: GanttCommit[] = []
    const engine = new GanttEngine({
      tasks: makeTasks(),
      onCommit: (commit) => commits.push(commit)
    })
    engine.nudge('p', 'move', 1)
    engine.nudge('locked', 'move', 1)
    expect(commits).toHaveLength(0)
  })
})

describe('GanttEngine derived snapshot', () => {
  it('exposes layout and arrows consistent with rows', () => {
    const engine = new GanttEngine({
      tasks: makeTasks(),
      zoom: 10,
      rowHeight: 40
    })
    const snap = engine.getSnapshot()
    expect(snap.layout.size).toBe(snap.rows.length)
    expect(snap.arrows.map((a) => `${a.fromId}->${a.toId}`)).toEqual([
      'a->b'
    ])
    const rowB = snap.rows.findIndex((r) => r.id === 'b')
    expect(snap.layout.get('b')?.y).toBe(rowB * 40)
  })

  it('caches the snapshot between changes', () => {
    const engine = new GanttEngine({ tasks: makeTasks() })
    const first = engine.getSnapshot()
    expect(engine.getSnapshot()).toBe(first)
    engine.select('a')
    expect(engine.getSnapshot()).not.toBe(first)
  })
})
