/**
 * GanttEngine: the complete state & behavior of the Gantt component with no
 * React and no DOM. The rendering layer subscribes to snapshots and forwards
 * user gestures (in pixels, converted to days) into engine actions.
 *
 * This separation keeps every behavior — zooming, unit derivation, dragging,
 * snapping, collapsing, selection, commits — directly unit-testable.
 */
import { SlateId } from '../../utilities'
import {
  GanttTask,
  GanttUnit
} from './Gantt.types'
import {
  applyDrag,
  buildArrows,
  buildColumns,
  buildHeaderGroups,
  buildLayout,
  buildScale,
  clamp,
  computeRange,
  GanttArrow,
  GanttBarLayout,
  GanttColumn,
  GanttDragMode,
  GanttHeaderGroup,
  GanttScale,
  MAX_ZOOM,
  MIN_ZOOM,
  resolveTasks,
  ResolvedGanttTask,
  shiftDays,
  snapDrag,
  startOfDay,
  TaskWindow,
  unitForZoom
} from './gantt-core'

export type GanttCommit = {
  task: GanttTask
  window: TaskWindow
}

export type GanttEngineOptions = {
  tasks: GanttTask[]
  zoom?: number
  rowHeight?: number
  locale?: string
  onCommit?: (commit: GanttCommit) => void
  onZoomChange?: (zoom: number) => void
  onUnitChange?: (unit: GanttUnit) => void
  onSelectedChange?: (id: SlateId | null) => void
}

export type GanttDragSnapshot = {
  taskId: SlateId
  mode: GanttDragMode
  moved: boolean
  /** Live, unsnapped window following the pointer exactly. */
  preview: TaskWindow
  /** Where the task will land when released (snapped to the day grid). */
  snapped: TaskWindow
}

export type GanttEngineSnapshot = {
  zoom: number
  unit: GanttUnit
  selectedId: SlateId | null
  hoveredId: SlateId | null
  collapsedIds: ReadonlySet<SlateId>
  drag: GanttDragSnapshot | null
  /** Id of the task whose drag just committed; used to animate the snap. */
  snappingId: SlateId | null
  rows: ResolvedGanttTask[]
  scale: GanttScale
  columns: GanttColumn[]
  headerGroups: GanttHeaderGroup[]
  layout: Map<SlateId, GanttBarLayout>
  arrows: GanttArrow[]
  todayX: number
}

type TaskOverride = {
  base: { start: number; end: number; progress: number }
  value: TaskWindow
}

type ActiveDrag = {
  taskId: SlateId
  mode: GanttDragMode
  orig: TaskWindow
  isMilestone: boolean
  moved: boolean
  preview: TaskWindow
}

export class GanttEngine {
  private tasks: GanttTask[]
  private zoom: number
  private rowHeight: number
  private locale: string
  private options: GanttEngineOptions

  private overrides = new Map<SlateId, TaskOverride>()
  private collapsedIds = new Set<SlateId>()
  private selectedId: SlateId | null = null
  private hoveredId: SlateId | null = null
  private drag: ActiveDrag | null = null
  private snappingId: SlateId | null = null
  private viewportWidth = 0

  private listeners = new Set<() => void>()
  private snapshot: GanttEngineSnapshot | null = null

  constructor(options: GanttEngineOptions) {
    this.options = options
    this.tasks = options.tasks
    this.zoom = clamp(options.zoom ?? 44, MIN_ZOOM, MAX_ZOOM)
    this.rowHeight = options.rowHeight ?? 40
    this.locale = options.locale ?? 'en-US'
  }

  // -- Subscription ---------------------------------------------------------

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  getSnapshot = (): GanttEngineSnapshot => {
    if (!this.snapshot) this.snapshot = this.computeSnapshot()
    return this.snapshot
  }

  private emit() {
    this.snapshot = null
    this.listeners.forEach((listener) => listener())
  }

  // -- Configuration --------------------------------------------------------

  configure(options: Partial<GanttEngineOptions>) {
    this.options = { ...this.options, ...options }
    let dirty = false
    if (options.tasks && options.tasks !== this.tasks) {
      this.tasks = options.tasks
      dirty = true
    }
    if (options.locale && options.locale !== this.locale) {
      this.locale = options.locale
      dirty = true
    }
    if (options.rowHeight !== undefined && options.rowHeight !== this.rowHeight) {
      this.rowHeight = options.rowHeight
      dirty = true
    }
    if (
      options.zoom !== undefined &&
      clamp(options.zoom, MIN_ZOOM, MAX_ZOOM) !== this.zoom
    ) {
      this.zoom = clamp(options.zoom, MIN_ZOOM, MAX_ZOOM)
      dirty = true
    }
    if (dirty) this.emit()
  }

  setViewportWidth(width: number) {
    if (width === this.viewportWidth) return
    this.viewportWidth = width
    this.emit()
  }

  // -- Zoom -----------------------------------------------------------------

  get unit(): GanttUnit {
    return unitForZoom(this.zoom)
  }

  setZoom(zoom: number) {
    const next = clamp(zoom, MIN_ZOOM, MAX_ZOOM)
    if (next === this.zoom) return
    const prevUnit = this.unit
    this.zoom = next
    this.options.onZoomChange?.(next)
    if (this.unit !== prevUnit) this.options.onUnitChange?.(this.unit)
    this.emit()
  }

  /** Multiplies zoom, e.g. from a pinch gesture. */
  zoomBy(factor: number) {
    this.setZoom(this.zoom * factor)
  }

  // -- Selection / hover / collapse -----------------------------------------

  select(id: SlateId | null) {
    if (id === this.selectedId) return
    this.selectedId = id
    this.options.onSelectedChange?.(id)
    this.emit()
  }

  hover(id: SlateId | null) {
    if (id === this.hoveredId) return
    this.hoveredId = id
    this.emit()
  }

  toggleCollapse(id: SlateId) {
    if (this.collapsedIds.has(id)) this.collapsedIds.delete(id)
    else this.collapsedIds.add(id)
    this.emit()
  }

  // -- Dragging -------------------------------------------------------------

  startDrag(taskId: SlateId, mode: GanttDragMode): boolean {
    const task = this.effectiveResolved().find((t) => t.id === taskId)
    if (!task || task.type === 'project' || task.disabled) return false
    this.drag = {
      taskId,
      mode,
      orig: { start: task.start, end: task.end, progress: task.progress },
      isMilestone: task.type === 'milestone',
      moved: false,
      preview: { start: task.start, end: task.end, progress: task.progress }
    }
    this.snappingId = null
    this.emit()
    return true
  }

  /** Continuous update with the pointer's total delta in fractional days. */
  moveDrag(deltaDays: number) {
    if (!this.drag) return
    // Ignore sub-3px jitters so plain clicks never count as drags.
    if (!this.drag.moved && Math.abs(deltaDays) * this.zoom < 3) return
    this.drag.moved = true
    this.drag.preview = applyDrag(
      this.drag.orig,
      this.drag.mode,
      deltaDays,
      this.drag.isMilestone
    )
    this.emit()
  }

  /**
   * Ends the drag: snaps the live preview to the day grid, stores it as an
   * override, and reports the commit. Returns null for drags that never
   * moved (plain clicks).
   */
  endDrag(): GanttCommit | null {
    const drag = this.drag
    this.drag = null
    if (!drag || !drag.moved) {
      if (drag) this.emit()
      return null
    }
    const snapped = snapDrag(
      drag.orig,
      drag.preview,
      drag.mode,
      drag.isMilestone
    )
    const original = this.tasks.find((task) => task.id === drag.taskId)
    if (!original) {
      this.emit()
      return null
    }
    this.overrides.set(drag.taskId, {
      base: {
        start: original.start.getTime(),
        end: original.end.getTime(),
        progress: original.progress ?? 0
      },
      value: snapped
    })
    this.snappingId = drag.taskId
    const commit: GanttCommit = {
      task: {
        ...original,
        start: snapped.start,
        end: snapped.end,
        progress: snapped.progress
      },
      window: snapped
    }
    this.emit()
    this.options.onCommit?.(commit)
    return commit
  }

  cancelDrag() {
    if (!this.drag) return
    this.drag = null
    this.emit()
  }

  /** Clears the snap-animation marker once the rendering layer is done. */
  clearSnapping() {
    if (this.snappingId === null) return
    this.snappingId = null
    this.emit()
  }

  /**
   * Keyboard nudge: shift a task (or one of its edges) by one visible unit's
   * worth of days, landing on the day grid.
   */
  nudge(taskId: SlateId, mode: 'move' | 'start' | 'end', direction: -1 | 1) {
    const task = this.effectiveResolved().find((t) => t.id === taskId)
    if (!task || task.type === 'project' || task.disabled) return
    const orig: TaskWindow = {
      start: task.start,
      end: task.end,
      progress: task.progress
    }
    const preview = applyDrag(
      orig,
      mode,
      direction * this.unitDurationDays(),
      task.type === 'milestone'
    )
    const snapped = snapDrag(orig, preview, mode, task.type === 'milestone')
    const original = this.tasks.find((t) => t.id === taskId)
    if (!original) return
    this.overrides.set(taskId, {
      base: {
        start: original.start.getTime(),
        end: original.end.getTime(),
        progress: original.progress ?? 0
      },
      value: snapped
    })
    this.emit()
    this.options.onCommit?.({
      task: {
        ...original,
        start: snapped.start,
        end: snapped.end,
        progress: snapped.progress
      },
      window: snapped
    })
  }

  private unitDurationDays(): number {
    switch (this.unit) {
      case 'day':
        return 1
      case 'week':
        return 7
      case 'month':
        return 30
      case 'quarter':
        return 91
      case 'year':
        return 365
    }
  }

  // -- Derived state --------------------------------------------------------

  /** Tasks with committed overrides and the live drag preview merged in. */
  private effectiveTasks(): GanttTask[] {
    return this.tasks.map((task) => {
      let merged = task
      const override = this.overrides.get(task.id)
      if (
        override &&
        task.start.getTime() === override.base.start &&
        task.end.getTime() === override.base.end &&
        (task.progress ?? 0) === override.base.progress
      ) {
        merged = { ...merged, ...override.value }
      }
      if (this.drag && this.drag.moved && this.drag.taskId === task.id) {
        merged = { ...merged, ...this.drag.preview }
      }
      return merged
    })
  }

  private effectiveResolved(): ResolvedGanttTask[] {
    return resolveTasks(this.effectiveTasks(), this.collapsedIds)
  }

  private computeSnapshot(): GanttEngineSnapshot {
    const effective = this.effectiveTasks()
    const unit = this.unit
    const rows = resolveTasks(effective, this.collapsedIds)
    const allRows = resolveTasks(effective, new Set())
    const { rangeStart, rangeEnd } = computeRange(
      allRows,
      unit,
      this.zoom,
      this.viewportWidth
    )
    const scale = buildScale(rangeStart, rangeEnd, this.zoom)
    const columns = buildColumns(scale, unit)
    const layout = buildLayout(rows, scale, this.rowHeight)
    const today = startOfDay(new Date())
    return {
      zoom: this.zoom,
      unit,
      selectedId: this.selectedId,
      hoveredId: this.hoveredId,
      collapsedIds: this.collapsedIds,
      drag: this.drag
        ? {
            taskId: this.drag.taskId,
            mode: this.drag.mode,
            moved: this.drag.moved,
            preview: this.drag.preview,
            snapped: snapDrag(
              this.drag.orig,
              this.drag.preview,
              this.drag.mode,
              this.drag.isMilestone
            )
          }
        : null,
      snappingId: this.snappingId,
      rows,
      scale,
      columns,
      headerGroups: buildHeaderGroups(columns, unit, this.locale),
      layout,
      arrows: buildArrows(rows, layout, this.rowHeight),
      todayX:
        (scale.dateToX(today) + scale.dateToX(shiftDays(today, 1))) / 2
    }
  }
}
