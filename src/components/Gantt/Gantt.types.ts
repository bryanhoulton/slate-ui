import {
  CSSProperties,
  HTMLAttributes,
  ReactNode
} from 'react'

import {
  SlateId,
  SlateSize,
  SlateVariant,
  Styleable
} from '../../utilities'
import { EmptyStateProps } from '../EmptyState/EmptyState.types'

/**
 * The unit shown by the grid and header, derived from the continuous zoom
 * level (pixels per day). Drags always snap to whole days regardless of the
 * visible unit.
 */
export type GanttUnit = 'day' | 'week' | 'month' | 'quarter' | 'year'

export type GanttTaskType = 'task' | 'milestone' | 'project'

export interface GanttTask {
  id: SlateId
  name: string
  /** Start date. Only the date portion is used. */
  start: Date
  /** End date, inclusive. Ignored for milestones. */
  end: Date
  /** Defaults to 'task'. */
  type?: GanttTaskType
  /** Percent complete, 0-100. Projects derive it from children when omitted. */
  progress?: number
  variant?: SlateVariant
  /** Ids of tasks this one depends on. Rendered as arrows. */
  dependencies?: SlateId[]
  /** Nest this task under a project task. */
  parentId?: SlateId
  /** Prevent moving and resizing this specific task. */
  disabled?: boolean
}

export type GanttStyles = {
  root: CSSProperties
  toolbar: CSSProperties
  taskList: CSSProperties
  header: CSSProperties
  timeline: CSSProperties
  bar: CSSProperties
  tooltip: CSSProperties
}

export interface GanttProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'>,
    Styleable<GanttStyles> {
  tasks: GanttTask[]
  size?: SlateSize

  /**
   * Zoom level in pixels per day (controlled). Also adjustable by pinching
   * the trackpad (or ctrl/cmd + scroll) over the timeline. The visible unit
   * (day/week/month/quarter/year) is derived from it.
   */
  zoom?: number
  defaultZoom?: number
  onZoomChange?: (zoom: number) => void
  onUnitChange?: (unit: GanttUnit) => void

  selectedId?: SlateId | null
  onSelectedChange?: (id: SlateId | null) => void

  /** Called after a task is moved, resized, or its progress is dragged. */
  onTaskChange?: (task: GanttTask) => void
  onTaskClick?: (task: GanttTask) => void
  onTaskDoubleClick?: (task: GanttTask) => void

  /** Disable all moving, resizing, and progress dragging. */
  readOnly?: boolean
  /** Show the unit-preset / Today toolbar above the chart. Off by default. */
  showToolbar?: boolean
  showTaskList?: boolean
  showDependencies?: boolean
  showToday?: boolean
  /** Shade Saturdays and Sundays in day view. */
  showWeekends?: boolean
  showProgress?: boolean

  /** Initial width of the task list pane. Resizable by dragging its edge. */
  taskListWidth?: number
  /** Override the height of a row. */
  rowHeight?: number
  /** Scroll vertically past this height. Headers and the task list stay pinned. */
  maxHeight?: number
  locale?: string

  renderTooltip?: (task: GanttTask) => ReactNode
  emptyState?: Partial<EmptyStateProps>
}
