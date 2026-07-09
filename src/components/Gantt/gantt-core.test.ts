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
  addUnit,
  applyDrag,
  buildArrows,
  buildColumns,
  buildHeaderGroups,
  buildLayout,
  buildScale,
  computeRange,
  DAY_MS,
  diffDays,
  resolveTasks,
  routeArrow,
  shiftDays,
  snapDrag,
  snapToUnit,
  startOfUnit,
  startOfWeek,
  unitForZoom,
  UNIT_MIN_ZOOM,
  UNIT_PRESET_ZOOM
} from './gantt-core'

// Pin the timezone so DST transitions don't shift pixel expectations, and
// fix the clock so ranges (which include "today") are deterministic.
process.env.TZ = 'UTC'
const TODAY = new Date(2026, 2, 15) // Sun Mar 15 2026

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

describe('date helpers', () => {
  it('startOfWeek is Monday-based', () => {
    expect(startOfWeek(d(2026, 3, 15))).toEqual(d(2026, 3, 9)) // Sun -> prev Mon
    expect(startOfWeek(d(2026, 3, 9))).toEqual(d(2026, 3, 9)) // Mon -> itself
    expect(startOfWeek(d(2026, 3, 11))).toEqual(d(2026, 3, 9)) // Wed -> Mon
  })

  it('startOfUnit truncates to each unit', () => {
    const date = d(2026, 8, 20)
    expect(startOfUnit(date, 'day')).toEqual(d(2026, 8, 20))
    expect(startOfUnit(date, 'month')).toEqual(d(2026, 8, 1))
    expect(startOfUnit(date, 'quarter')).toEqual(d(2026, 7, 1))
    expect(startOfUnit(date, 'year')).toEqual(d(2026, 1, 1))
  })

  it('addUnit handles month rollover', () => {
    expect(addUnit(d(2026, 12, 1), 'month', 1)).toEqual(d(2027, 1, 1))
    expect(addUnit(d(2026, 1, 1), 'month', -1)).toEqual(d(2025, 12, 1))
    expect(addUnit(d(2026, 10, 1), 'quarter', 1)).toEqual(d(2027, 1, 1))
  })

  it('snapToUnit rounds to the nearest day boundary', () => {
    // 10am on Mar 10 -> snaps back to Mar 10; 2pm -> forward to Mar 11.
    expect(snapToUnit(new Date(2026, 2, 10, 10), 'day')).toEqual(d(2026, 3, 10))
    expect(snapToUnit(new Date(2026, 2, 10, 14), 'day')).toEqual(d(2026, 3, 11))
    // Exactly noon rounds forward.
    expect(snapToUnit(new Date(2026, 2, 10, 12), 'day')).toEqual(d(2026, 3, 11))
  })
})

describe('unitForZoom', () => {
  it('derives the visible unit from continuous zoom', () => {
    expect(unitForZoom(60)).toBe('day')
    expect(unitForZoom(UNIT_MIN_ZOOM.day)).toBe('day')
    expect(unitForZoom(UNIT_MIN_ZOOM.day - 0.01)).toBe('week')
    expect(unitForZoom(UNIT_MIN_ZOOM.week)).toBe('week')
    expect(unitForZoom(UNIT_MIN_ZOOM.week - 0.01)).toBe('month')
    expect(unitForZoom(UNIT_MIN_ZOOM.month)).toBe('month')
    expect(unitForZoom(UNIT_MIN_ZOOM.month - 0.01)).toBe('quarter')
    expect(unitForZoom(UNIT_MIN_ZOOM.quarter)).toBe('quarter')
    expect(unitForZoom(UNIT_MIN_ZOOM.quarter - 0.01)).toBe('year')
    expect(unitForZoom(0.3)).toBe('year')
  })

  it('preset zooms land in their own unit', () => {
    expect(unitForZoom(UNIT_PRESET_ZOOM.day)).toBe('day')
    expect(unitForZoom(UNIT_PRESET_ZOOM.week)).toBe('week')
    expect(unitForZoom(UNIT_PRESET_ZOOM.month)).toBe('month')
    expect(unitForZoom(UNIT_PRESET_ZOOM.quarter)).toBe('quarter')
    expect(unitForZoom(UNIT_PRESET_ZOOM.year)).toBe('year')
  })
})

describe('buildScale', () => {
  const scale = buildScale(d(2026, 3, 1), d(2026, 4, 1), 10)

  it('maps dates to pixels linearly at zoom px/day', () => {
    expect(scale.totalWidth).toBe(310) // 31 days * 10px
    expect(scale.dateToX(d(2026, 3, 1))).toBe(0)
    expect(scale.dateToX(d(2026, 3, 2))).toBe(10)
    expect(scale.dateToX(d(2026, 4, 1))).toBe(310)
  })

  it('xToDate inverts dateToX', () => {
    const date = d(2026, 3, 20)
    expect(scale.xToDate(scale.dateToX(date)).getTime()).toBe(date.getTime())
    // Fractional pixels produce fractional dates.
    expect(scale.xToDate(15).getTime()).toBe(
      d(2026, 3, 2).getTime() + DAY_MS / 2
    )
  })
})

describe('computeRange', () => {
  const tasks = [
    { start: d(2026, 3, 10), end: d(2026, 3, 20) },
    { start: d(2026, 3, 5), end: d(2026, 3, 12) }
  ]

  it('pads the task extent by two units on each side', () => {
    const { rangeStart, rangeEnd } = computeRange(tasks, 'day', 44, 0)
    expect(rangeStart).toEqual(d(2026, 3, 3)) // min(Mar 5) - 2 days
    expect(rangeEnd).toEqual(d(2026, 3, 23)) // max(Mar 20) + 3 days
  })

  it('extends the end so the grid fills the viewport', () => {
    const { rangeStart, rangeEnd } = computeRange(tasks, 'day', 10, 1000)
    const widthDays = (rangeEnd.getTime() - rangeStart.getTime()) / DAY_MS
    expect(widthDays * 10).toBeGreaterThanOrEqual(1000)
  })

  it('includes today even when tasks are far in the past', () => {
    const past = [{ start: d(2020, 1, 1), end: d(2020, 2, 1) }]
    const { rangeEnd } = computeRange(past, 'month', 4, 0)
    expect(rangeEnd.getTime()).toBeGreaterThan(TODAY.getTime())
  })
})

describe('buildColumns / buildHeaderGroups', () => {
  it('builds contiguous columns covering the range', () => {
    const scale = buildScale(d(2026, 1, 1), d(2026, 4, 1), 4)
    const columns = buildColumns(scale, 'month')
    expect(columns.map((c) => c.start)).toEqual([
      d(2026, 1, 1),
      d(2026, 2, 1),
      d(2026, 3, 1)
    ])
    // Widths follow real month lengths: Jan 31d, Feb 28d, Mar 31d at 4px/day.
    expect(columns.map((c) => c.width)).toEqual([124, 112, 124])
    expect(columns[1].x).toBe(124)
    expect(columns[2].x).toBe(236)
  })

  it('groups day columns by month', () => {
    const scale = buildScale(d(2026, 2, 26), d(2026, 3, 3), 44)
    const columns = buildColumns(scale, 'day')
    const groups = buildHeaderGroups(columns, 'day', 'en-US')
    expect(groups.map((g) => g.label)).toEqual([
      'February 2026',
      'March 2026'
    ])
    // 3 Feb days + 2 Mar days.
    expect(groups[0].width).toBe(3 * 44)
    expect(groups[1].width).toBe(2 * 44)
  })

  it('has no top tier at the year unit', () => {
    const scale = buildScale(d(2024, 1, 1), d(2027, 1, 1), 0.5)
    const columns = buildColumns(scale, 'year')
    expect(buildHeaderGroups(columns, 'year', 'en-US')).toEqual([])
  })
})

describe('resolveTasks', () => {
  const tasks: GanttTask[] = [
    { id: 'p', name: 'Project', type: 'project', start: d(2026, 3, 1), end: d(2026, 3, 2) },
    { id: 'a', name: 'A', parentId: 'p', start: d(2026, 3, 5), end: d(2026, 3, 9), progress: 100 },
    { id: 'b', name: 'B', parentId: 'p', start: d(2026, 3, 10), end: d(2026, 3, 19), progress: 40 },
    { id: 'solo', name: 'Solo', start: d(2026, 3, 1), end: d(2026, 3, 3) },
    { id: 'm', name: 'Milestone', type: 'milestone', start: d(2026, 3, 20), end: d(2026, 3, 25) }
  ]

  it('keeps input order with children nested under their parent', () => {
    const rows = resolveTasks(tasks, new Set())
    expect(rows.map((r) => r.id)).toEqual(['p', 'a', 'b', 'solo', 'm'])
    expect(rows.map((r) => r.depth)).toEqual([0, 1, 1, 0, 0])
  })

  it('derives project bounds and duration-weighted progress from children', () => {
    const project = resolveTasks(tasks, new Set())[0]
    expect(project.start).toEqual(d(2026, 3, 5))
    expect(project.end).toEqual(d(2026, 3, 19))
    // 5 days at 100% + 10 days at 40% = (500 + 400) / 15 = 60.
    expect(project.progress).toBe(60)
    expect(project.childIds).toEqual(['a', 'b'])
  })

  it('hides the subtree of collapsed projects', () => {
    const rows = resolveTasks(tasks, new Set(['p']))
    expect(rows.map((r) => r.id)).toEqual(['p', 'solo', 'm'])
  })

  it('normalizes milestone ends to their start', () => {
    const milestone = resolveTasks(tasks, new Set()).find((r) => r.id === 'm')
    expect(milestone?.end).toEqual(d(2026, 3, 20))
  })

  it('treats tasks with unknown parents as roots instead of dropping them', () => {
    const rows = resolveTasks(
      [{ id: 'x', name: 'X', parentId: 'ghost', start: d(2026, 3, 1), end: d(2026, 3, 2) }],
      new Set()
    )
    expect(rows).toHaveLength(1)
    expect(rows[0].depth).toBe(0)
  })

  it('clamps inverted date ranges', () => {
    const rows = resolveTasks(
      [{ id: 'x', name: 'X', start: d(2026, 3, 10), end: d(2026, 3, 5) }],
      new Set()
    )
    expect(rows[0].end).toEqual(d(2026, 3, 10))
  })
})

describe('applyDrag (continuous preview)', () => {
  const orig = { start: d(2026, 3, 10), end: d(2026, 3, 14), progress: 50 }

  it('move shifts both edges by fractional days', () => {
    const preview = applyDrag(orig, 'move', 1.5, false)
    expect(preview.start).toEqual(shiftDays(orig.start, 1.5))
    expect(preview.end).toEqual(shiftDays(orig.end, 1.5))
    expect(preview.progress).toBe(50)
  })

  it('start resize clamps at the end', () => {
    const preview = applyDrag(orig, 'start', 10, false)
    expect(preview.start).toEqual(orig.end)
  })

  it('end resize clamps at the start', () => {
    const preview = applyDrag(orig, 'end', -10, false)
    expect(preview.end).toEqual(orig.start)
  })

  it('progress converts day-delta across duration into percent', () => {
    // 5-day duration: dragging 1 day = 20%.
    const preview = applyDrag(orig, 'progress', 1, false)
    expect(preview.progress).toBeCloseTo(70)
    expect(applyDrag(orig, 'progress', 10, false).progress).toBe(100)
    expect(applyDrag(orig, 'progress', -10, false).progress).toBe(0)
  })
})

describe('snapDrag (snap to days on release)', () => {
  const orig = { start: d(2026, 3, 10), end: d(2026, 3, 14), progress: 50 }

  it('move snaps the start to the nearest day and preserves duration exactly', () => {
    const preview = applyDrag(orig, 'move', 1.6, false)
    const snapped = snapDrag(orig, preview, 'move', false)
    expect(snapped.start).toEqual(d(2026, 3, 12))
    expect(snapped.end).toEqual(d(2026, 3, 16))
    expect(diffDays(snapped.end, snapped.start)).toBe(
      diffDays(orig.end, orig.start)
    )
  })

  it('always snaps to days, never to coarser units', () => {
    // Even a multi-week move lands on the exact day, not a week boundary.
    const preview = applyDrag(orig, 'move', 16.4, false)
    const snapped = snapDrag(orig, preview, 'move', false)
    expect(snapped.start).toEqual(d(2026, 3, 26)) // a Thursday
  })

  it('end resize snaps the exclusive edge back to an inclusive date', () => {
    // Preview end Mar 15.7 -> exclusive edge Mar 16.7 -> snaps to Mar 17
    // -> inclusive end Mar 16.
    const preview = applyDrag(orig, 'end', 1.7, false)
    const snapped = snapDrag(orig, preview, 'end', false)
    expect(snapped.start).toEqual(orig.start)
    expect(snapped.end).toEqual(d(2026, 3, 16))
  })

  it('never inverts the bar when snapping edges', () => {
    const preview = applyDrag(orig, 'start', 4.4, false)
    const snapped = snapDrag(orig, preview, 'start', false)
    expect(snapped.start.getTime()).toBeLessThanOrEqual(
      snapped.end.getTime()
    )
  })

  it('progress rounds to a whole percent and keeps dates', () => {
    const preview = applyDrag(orig, 'progress', 0.33, false)
    const snapped = snapDrag(orig, preview, 'progress', false)
    expect(snapped.progress).toBe(57)
    expect(snapped.start).toEqual(orig.start)
    expect(snapped.end).toEqual(orig.end)
  })

  it('milestones snap start and end together', () => {
    const milestone = { start: d(2026, 3, 10), end: d(2026, 3, 10), progress: 0 }
    const preview = applyDrag(milestone, 'move', 2.4, true)
    const snapped = snapDrag(milestone, preview, 'move', true)
    expect(snapped.start).toEqual(d(2026, 3, 12))
    expect(snapped.end).toEqual(snapped.start)
  })
})

describe('layout & arrows', () => {
  const tasks: GanttTask[] = [
    { id: 'a', name: 'A', start: d(2026, 3, 2), end: d(2026, 3, 4), progress: 0 },
    { id: 'b', name: 'B', start: d(2026, 3, 6), end: d(2026, 3, 8), progress: 0, dependencies: ['a'] },
    { id: 'c', name: 'C', start: d(2026, 3, 1), end: d(2026, 3, 2), progress: 0, dependencies: ['b', 'ghost'] }
  ]
  const rows = resolveTasks(tasks, new Set())
  const scale = buildScale(d(2026, 3, 1), d(2026, 4, 1), 20)
  const layout = buildLayout(rows, scale, 40)

  it('lays bars out with exclusive right edges and row-indexed y', () => {
    const a = layout.get('a')
    expect(a).toBeDefined()
    expect(a?.x1).toBe(20) // Mar 2
    expect(a?.x2).toBe(80) // Mar 5 (end Mar 4 inclusive)
    expect(a?.y).toBe(0)
    expect(layout.get('b')?.y).toBe(40)
  })

  it('routes forward dependencies as a direct elbow when there is room', () => {
    // A ends at x=80, B starts at x=100: enough room for a direct elbow.
    const points = routeArrow(layout.get('a')!, layout.get('b')!, 40)
    expect(points[0]).toEqual([80, 20]) // out of A's end, A's row center
    expect(points[points.length - 1][1]).toBe(60) // into B's row center
    // Direct elbows have exactly 4 points.
    expect(points).toHaveLength(4)
  })

  it('drops into the target bar edge for adjacent finish-to-start links', () => {
    // Target starts the day the source ends (gap 0): the common case.
    const adjacentTasks: GanttTask[] = [
      { id: 'a', name: 'A', start: d(2026, 3, 2), end: d(2026, 3, 4), progress: 0 },
      { id: 'b', name: 'B', start: d(2026, 3, 5), end: d(2026, 3, 8), progress: 0, dependencies: ['a'] }
    ]
    const adjacentRows = resolveTasks(adjacentTasks, new Set())
    const adjacentLayout = buildLayout(adjacentRows, scale, 40)
    const points = routeArrow(
      adjacentLayout.get('a')!,
      adjacentLayout.get('b')!,
      40
    )
    expect(points).toHaveLength(3)
    // Ends pointing down into the top edge of B's bar.
    const [endX, endY] = points[points.length - 1]
    expect(endX).toBe(adjacentLayout.get('a')!.x2 + 8)
    expect(endY).toBe(adjacentLayout.get('b')!.y + Math.round(40 * 0.2))
  })

  it('detours when the target starts before the source ends', () => {
    const points = routeArrow(layout.get('b')!, layout.get('c')!, 40)
    expect(points).toHaveLength(6)
    // The final turn sits 20px back from the target so the line approaches
    // the arrowhead horizontally with room for the corner rounding.
    const targetX1 = layout.get('c')!.x1
    expect(points[4][0]).toBe(targetX1 - 20)
    expect(points[5]).toEqual([targetX1 - 5, layout.get('c')!.y + 20])
  })

  it('skips arrows whose endpoints are not visible', () => {
    const arrows = buildArrows(rows, layout, 40)
    // 'ghost' dependency is dropped; a->b and b->c remain.
    expect(arrows.map((arrow) => `${arrow.fromId}->${arrow.toId}`)).toEqual([
      'a->b',
      'b->c'
    ])
  })
})
