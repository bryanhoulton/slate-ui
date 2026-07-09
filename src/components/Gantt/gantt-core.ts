/**
 * Pure state & logic for the Gantt component. No React, no DOM.
 *
 * Everything here is deterministic and unit-testable: date math, the
 * continuous zoomable time scale, unit derivation, snapping, task tree
 * resolution, drag math, and arrow routing.
 */
import { SlateId } from '../../utilities'
import {
  GanttTask,
  GanttUnit
} from './Gantt.types'

export const DAY_MS = 24 * 60 * 60 * 1000

// ---------------------------------------------------------------------------
// Date helpers
// ---------------------------------------------------------------------------

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days)
}

/** Shift by a possibly fractional number of days (used for live drags). */
export function shiftDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * DAY_MS)
}

export function diffDays(a: Date, b: Date): number {
  return Math.round(
    (startOfDay(a).getTime() - startOfDay(b).getTime()) / DAY_MS
  )
}

/** Monday-based start of week. */
export function startOfWeek(date: Date): Date {
  const day = (date.getDay() + 6) % 7
  return addDays(startOfDay(date), -day)
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function startOfQuarter(date: Date): Date {
  return new Date(date.getFullYear(), Math.floor(date.getMonth() / 3) * 3, 1)
}

export function startOfYear(date: Date): Date {
  return new Date(date.getFullYear(), 0, 1)
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay()
  return day === 0 || day === 6
}

export function startOfUnit(date: Date, unit: GanttUnit): Date {
  switch (unit) {
    case 'day':
      return startOfDay(date)
    case 'week':
      return startOfWeek(date)
    case 'month':
      return startOfMonth(date)
    case 'quarter':
      return startOfQuarter(date)
    case 'year':
      return startOfYear(date)
  }
}

export function addUnit(date: Date, unit: GanttUnit, count: number): Date {
  switch (unit) {
    case 'day':
      return addDays(date, count)
    case 'week':
      return addDays(date, 7 * count)
    case 'month':
      return new Date(date.getFullYear(), date.getMonth() + count, 1)
    case 'quarter':
      return new Date(date.getFullYear(), date.getMonth() + 3 * count, 1)
    case 'year':
      return new Date(date.getFullYear() + count, 0, 1)
  }
}

/** Rounds a (possibly fractional) date to the nearest boundary of the unit. */
export function snapToUnit(date: Date, unit: GanttUnit): Date {
  const floor = startOfUnit(date, unit)
  const ceil = addUnit(floor, unit, 1)
  return date.getTime() - floor.getTime() < ceil.getTime() - date.getTime()
    ? floor
    : ceil
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

// ---------------------------------------------------------------------------
// Zoom → unit derivation
// ---------------------------------------------------------------------------

/**
 * Zoom is measured in pixels per day and is continuous. The visible unit
 * (what the grid and header show) is derived from it; drags always snap to
 * whole days.
 */
export const UNIT_MIN_ZOOM: Record<Exclude<GanttUnit, 'year'>, number> = {
  day: 24,
  week: 7,
  month: 2.2,
  quarter: 0.9
}

/** Comfortable default zoom for each unit, used by presets and stories. */
export const UNIT_PRESET_ZOOM: Record<GanttUnit, number> = {
  day: 44,
  week: 14,
  month: 4.4,
  quarter: 1.5,
  year: 0.55
}

export const MIN_ZOOM = 0.3
export const MAX_ZOOM = 120

export function unitForZoom(zoom: number): GanttUnit {
  if (zoom >= UNIT_MIN_ZOOM.day) return 'day'
  if (zoom >= UNIT_MIN_ZOOM.week) return 'week'
  if (zoom >= UNIT_MIN_ZOOM.month) return 'month'
  if (zoom >= UNIT_MIN_ZOOM.quarter) return 'quarter'
  return 'year'
}

// ---------------------------------------------------------------------------
// Time scale
// ---------------------------------------------------------------------------

export type GanttScale = {
  rangeStart: Date
  rangeEnd: Date
  zoom: number
  totalWidth: number
  dateToX: (date: Date) => number
  xToDate: (x: number) => Date
}

/** Linear time scale: x = elapsed days since rangeStart * zoom. */
export function buildScale(
  rangeStart: Date,
  rangeEnd: Date,
  zoom: number
): GanttScale {
  const startMs = rangeStart.getTime()
  const endMs = rangeEnd.getTime()
  const totalWidth = ((endMs - startMs) / DAY_MS) * zoom
  return {
    rangeStart,
    rangeEnd,
    zoom,
    totalWidth,
    dateToX: (date) => ((date.getTime() - startMs) / DAY_MS) * zoom,
    xToDate: (x) => new Date(startMs + (x / zoom) * DAY_MS)
  }
}

/**
 * Computes the visible range: all tasks padded by a couple of units on each
 * side, then extended so the grid always fills the viewport.
 */
export function computeRange(
  tasks: { start: Date; end: Date }[],
  unit: GanttUnit,
  zoom: number,
  minWidth: number
): { rangeStart: Date; rangeEnd: Date } {
  const today = startOfDay(new Date())
  let min = today
  let max = today
  for (const task of tasks) {
    if (task.start < min) min = task.start
    if (task.end > max) max = task.end
  }
  const rangeStart = addUnit(startOfUnit(min, unit), unit, -2)
  let rangeEnd = addUnit(startOfUnit(max, unit), unit, 3)

  if (minWidth > 0) {
    const width =
      ((rangeEnd.getTime() - rangeStart.getTime()) / DAY_MS) * zoom
    if (width < minWidth) {
      const missingDays = (minWidth - width) / zoom
      rangeEnd = startOfUnit(
        addUnit(shiftDays(rangeEnd, missingDays), unit, 1),
        unit
      )
    }
  }
  return { rangeStart, rangeEnd }
}

// ---------------------------------------------------------------------------
// Columns & headers
// ---------------------------------------------------------------------------

export type GanttColumn = {
  start: Date
  x: number
  width: number
}

export type GanttHeaderGroup = {
  label: string
  x: number
  width: number
}

export function buildColumns(scale: GanttScale, unit: GanttUnit): GanttColumn[] {
  const columns: GanttColumn[] = []
  let cursor = startOfUnit(scale.rangeStart, unit)
  while (cursor.getTime() < scale.rangeEnd.getTime()) {
    const next = addUnit(cursor, unit, 1)
    const x = scale.dateToX(cursor)
    columns.push({ start: cursor, x, width: scale.dateToX(next) - x })
    cursor = next
  }
  return columns
}

export function columnLabel(
  column: GanttColumn,
  unit: GanttUnit,
  locale: string
): string {
  switch (unit) {
    case 'day':
      return column.start.toLocaleDateString(locale, { day: 'numeric' })
    case 'week':
      return column.start.toLocaleDateString(locale, {
        month: 'short',
        day: 'numeric'
      })
    case 'month':
      return column.start.toLocaleDateString(locale, { month: 'short' })
    case 'quarter':
      return `Q${Math.floor(column.start.getMonth() / 3) + 1}`
    case 'year':
      return String(column.start.getFullYear())
  }
}

/** Narrow weekday letter, only meaningful in the day unit. */
export function columnSubLabel(
  column: GanttColumn,
  unit: GanttUnit,
  locale: string
): string | null {
  if (unit !== 'day') return null
  return column.start.toLocaleDateString(locale, { weekday: 'narrow' })
}

function groupKey(date: Date, unit: GanttUnit): string {
  switch (unit) {
    case 'day':
    case 'week':
      return `${date.getFullYear()}-${date.getMonth()}`
    case 'month':
    case 'quarter':
      return String(date.getFullYear())
    case 'year':
      return ''
  }
}

function groupLabel(date: Date, unit: GanttUnit, locale: string): string {
  switch (unit) {
    case 'day':
    case 'week':
      return date.toLocaleDateString(locale, {
        month: 'long',
        year: 'numeric'
      })
    case 'month':
    case 'quarter':
      return String(date.getFullYear())
    case 'year':
      return ''
  }
}

/** Top header tier: contiguous columns grouped by month or year. */
export function buildHeaderGroups(
  columns: GanttColumn[],
  unit: GanttUnit,
  locale: string
): GanttHeaderGroup[] {
  if (unit === 'year') return []
  const groups: GanttHeaderGroup[] = []
  let lastKey: string | null = null
  for (const column of columns) {
    const key = groupKey(column.start, unit)
    if (lastKey === key && groups.length > 0) {
      groups[groups.length - 1].width += column.width
    } else {
      groups.push({
        label: groupLabel(column.start, unit, locale),
        x: column.x,
        width: column.width
      })
      lastKey = key
    }
  }
  return groups
}

export function formatDate(date: Date, locale: string): string {
  return date.toLocaleDateString(locale, { month: 'short', day: 'numeric' })
}

export function formatDateLong(date: Date, locale: string): string {
  return date.toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

// ---------------------------------------------------------------------------
// Task tree resolution
// ---------------------------------------------------------------------------

/**
 * A task with derived values resolved: project bounds and progress computed
 * from children, milestone ends normalized, and depth/children metadata for
 * the tree.
 */
export type ResolvedGanttTask = GanttTask & {
  start: Date
  end: Date
  type: NonNullable<GanttTask['type']>
  progress: number
  depth: number
  childIds: SlateId[]
}

/**
 * Resolves the task tree in input order: children are grouped under their
 * parent (preserving relative order), projects derive bounds and progress
 * from their descendants, and collapsed projects hide their subtree.
 */
export function resolveTasks(
  tasks: GanttTask[],
  collapsedIds: ReadonlySet<SlateId>
): ResolvedGanttTask[] {
  const byParent = new Map<SlateId | undefined, GanttTask[]>()
  const ids = new Set(tasks.map((task) => task.id))
  for (const task of tasks) {
    // Treat tasks with unknown parents as roots so they never disappear.
    const parent =
      task.parentId !== undefined && ids.has(task.parentId)
        ? task.parentId
        : undefined
    const siblings = byParent.get(parent) ?? []
    siblings.push(task)
    byParent.set(parent, siblings)
  }

  const resolved: ResolvedGanttTask[] = []

  function resolveBounds(task: GanttTask): {
    start: Date
    end: Date
    progress: number
  } {
    const children = byParent.get(task.id) ?? []
    const type = task.type ?? 'task'
    if (type !== 'project' || children.length === 0) {
      const start = task.start
      const end = type === 'milestone' ? start : task.end < task.start ? task.start : task.end
      return { start, end, progress: clamp(task.progress ?? 0, 0, 100) }
    }

    let start: Date | null = null
    let end: Date | null = null
    let weighted = 0
    let totalWeight = 0
    for (const child of children) {
      const bounds = resolveBounds(child)
      if (!start || bounds.start < start) start = bounds.start
      if (!end || bounds.end > end) end = bounds.end
      const weight = diffDays(bounds.end, bounds.start) + 1
      weighted += bounds.progress * weight
      totalWeight += weight
    }
    return {
      start: start ?? task.start,
      end: end ?? task.end,
      progress:
        task.progress !== undefined
          ? clamp(task.progress, 0, 100)
          : totalWeight > 0
            ? Math.round(weighted / totalWeight)
            : 0
    }
  }

  function walk(parent: SlateId | undefined, depth: number) {
    for (const task of byParent.get(parent) ?? []) {
      const bounds = resolveBounds(task)
      const children = byParent.get(task.id) ?? []
      resolved.push({
        ...task,
        ...bounds,
        type: task.type ?? 'task',
        depth,
        childIds: children.map((child) => child.id)
      })
      if (!collapsedIds.has(task.id)) {
        walk(task.id, depth + 1)
      }
    }
  }

  walk(undefined, 0)
  return resolved
}

// ---------------------------------------------------------------------------
// Drag math
// ---------------------------------------------------------------------------

export type GanttDragMode = 'move' | 'start' | 'end' | 'progress'

export type TaskWindow = {
  start: Date
  end: Date
  progress: number
}

/**
 * Applies a continuous (fractional-day) drag delta. The result is a live,
 * unsnapped preview: bars follow the pointer exactly.
 */
export function applyDrag(
  orig: TaskWindow,
  mode: GanttDragMode,
  deltaDays: number,
  isMilestone: boolean
): TaskWindow {
  if (mode === 'move') {
    return {
      start: shiftDays(orig.start, deltaDays),
      end: shiftDays(orig.end, deltaDays),
      progress: orig.progress
    }
  }
  if (mode === 'start') {
    let start = shiftDays(orig.start, deltaDays)
    if (start > orig.end) start = orig.end
    return { start, end: orig.end, progress: orig.progress }
  }
  if (mode === 'end') {
    let end = shiftDays(orig.end, deltaDays)
    if (end < orig.start) end = orig.start
    return { start: orig.start, end, progress: orig.progress }
  }
  // progress: delta expressed in days across the bar's duration.
  const durationDays =
    (orig.end.getTime() + DAY_MS - orig.start.getTime()) / DAY_MS
  const progress = clamp(
    orig.progress + (deltaDays / Math.max(durationDays, 0.01)) * 100,
    0,
    100
  )
  if (isMilestone) return { ...orig }
  return { start: orig.start, end: orig.end, progress }
}

/**
 * Snaps a live drag preview onto the day grid. Days are the smallest unit
 * tasks are measured in, so drags always land on day boundaries no matter
 * how far the view is zoomed out.
 * - move: the start edge snaps to the nearest day and the task's day
 *   duration is preserved exactly.
 * - start/end: the dragged edge snaps to the nearest day boundary (the end
 *   edge snaps its exclusive boundary), clamped to at least one day.
 * - progress: rounds to the nearest whole percent.
 */
export function snapDrag(
  orig: TaskWindow,
  preview: TaskWindow,
  mode: GanttDragMode,
  isMilestone: boolean
): TaskWindow {
  if (mode === 'progress') {
    return {
      start: orig.start,
      end: orig.end,
      progress: Math.round(preview.progress)
    }
  }
  if (isMilestone) {
    const start = snapToUnit(preview.start, 'day')
    return { start, end: start, progress: orig.progress }
  }
  if (mode === 'move') {
    const start = snapToUnit(preview.start, 'day')
    return {
      start,
      end: addDays(start, diffDays(orig.end, orig.start)),
      progress: orig.progress
    }
  }
  if (mode === 'start') {
    let start = snapToUnit(preview.start, 'day')
    const end = startOfDay(orig.end)
    if (start > end) start = end
    return { start, end: orig.end, progress: orig.progress }
  }
  // end: snap the exclusive edge, then convert back to an inclusive end date.
  let end = addDays(snapToUnit(shiftDays(preview.end, 1), 'day'), -1)
  const start = startOfDay(orig.start)
  if (end < start) end = start
  return { start: orig.start, end, progress: orig.progress }
}

// ---------------------------------------------------------------------------
// Layout & arrows
// ---------------------------------------------------------------------------

export type GanttBarLayout = {
  row: number
  x1: number
  x2: number
  y: number
}

export function buildLayout(
  rows: ResolvedGanttTask[],
  scale: GanttScale,
  rowHeight: number
): Map<SlateId, GanttBarLayout> {
  const map = new Map<SlateId, GanttBarLayout>()
  rows.forEach((task, row) => {
    const y = row * rowHeight
    if (task.type === 'milestone') {
      const x = scale.dateToX(task.start)
      const half = Math.round(rowHeight * 0.2)
      map.set(task.id, { row, x1: x - half, x2: x + half, y })
    } else {
      map.set(task.id, {
        row,
        x1: scale.dateToX(task.start),
        x2: scale.dateToX(shiftDays(task.end, 1)),
        y
      })
    }
  })
  return map
}

export type GanttArrow = {
  fromId: SlateId
  toId: SlateId
  points: [number, number][]
}

/**
 * Routes an orthogonal dependency arrow from the end of `from` to the start
 * of `to`:
 * - Plenty of room: a direct elbow into the target's left edge.
 * - Adjacent (finish-to-start with little or no gap, the common case): a
 *   short drop into the target bar's top (or bottom) edge.
 * - Backward (target starts before the source ends): a detour around the
 *   source row.
 */
export function routeArrow(
  from: GanttBarLayout,
  to: GanttBarLayout,
  rowHeight: number
): [number, number][] {
  const fromY = from.y + rowHeight / 2
  const toY = to.y + rowHeight / 2
  const arrowInset = 5
  const gap = to.x1 - from.x2

  if (gap >= 16) {
    const midX = to.x1 - 10
    return [
      [from.x2, fromY],
      [midX, fromY],
      [midX, toY],
      [to.x1 - arrowInset, toY]
    ]
  }

  const down = toY > fromY
  if (gap >= -4 && fromY !== toY) {
    // Bars are (nearly) adjacent: drop vertically into the target's edge.
    const x = from.x2 + 8
    const barEdgeY = down
      ? to.y + Math.round(rowHeight * 0.2)
      : to.y + rowHeight - Math.round(rowHeight * 0.2)
    return [
      [from.x2, fromY],
      [x, fromY],
      [x, barEdgeY]
    ]
  }

  // Backward link: detour around the source row. The last vertical turn sits
  // well back from the target so the line has room to finish turning and
  // approach the arrowhead horizontally from the left.
  const approachX = to.x1 - 20
  const detourY = down ? from.y + rowHeight : from.y
  return [
    [from.x2, fromY],
    [from.x2 + 8, fromY],
    [from.x2 + 8, detourY],
    [approachX, detourY],
    [approachX, toY],
    [to.x1 - arrowInset, toY]
  ]
}

export function buildArrows(
  rows: ResolvedGanttTask[],
  layout: Map<SlateId, GanttBarLayout>,
  rowHeight: number
): GanttArrow[] {
  const arrows: GanttArrow[] = []
  for (const target of rows) {
    for (const depId of target.dependencies ?? []) {
      const from = layout.get(depId)
      const to = layout.get(target.id)
      if (!from || !to) continue
      arrows.push({
        fromId: depId,
        toId: target.id,
        points: routeArrow(from, to, rowHeight)
      })
    }
  }
  return arrows
}
