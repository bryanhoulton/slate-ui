import { CSSProperties } from 'react'

import { ChevronRight } from 'lucide-react'

import { cn, SlateId } from '../../utilities'
import { Icon } from '../Icon'
import {
  formatDate,
  ResolvedGanttTask
} from './gantt-core'

const DATE_COLUMN_WIDTH = 56
const MIN_WIDTH_FOR_DATES = 240

export function GanttTaskListHeader({ width }: { width: number }) {
  return (
    <div className="flex h-full items-end gap-1 px-3 pb-2 text-sm font-medium leading-none text-muted">
      <span className="h-4 w-4 shrink-0" />
      <span className="min-w-0 flex-1">Name</span>
      {width >= MIN_WIDTH_FOR_DATES && (
        <>
          <span
            className="shrink-0 text-right"
            style={{ width: DATE_COLUMN_WIDTH }}
          >
            Start
          </span>
          <span
            className="shrink-0 text-right"
            style={{ width: DATE_COLUMN_WIDTH }}
          >
            End
          </span>
        </>
      )}
    </div>
  )
}

export interface GanttTaskListRowsProps {
  rows: ResolvedGanttTask[]
  width: number
  rowHeight: number
  collapsedIds: ReadonlySet<SlateId>
  selectedId: SlateId | null
  hoveredId: SlateId | null
  locale: string
  style?: CSSProperties
  onToggleCollapse: (id: SlateId) => void
  onRowClick: (task: ResolvedGanttTask) => void
  onRowHover: (id: SlateId | null) => void
}

export function GanttTaskListRows({
  rows,
  width,
  rowHeight,
  collapsedIds,
  selectedId,
  hoveredId,
  locale,
  style,
  onToggleCollapse,
  onRowClick,
  onRowHover
}: GanttTaskListRowsProps) {
  const showDates = width >= MIN_WIDTH_FOR_DATES

  return (
    <div style={style}>
      {rows.map((task) => {
        const hasChildren = task.childIds.length > 0
        const collapsed = collapsedIds.has(task.id)
        return (
          <div
            key={task.id}
            className={cn(
              'flex items-center gap-1 border-b border-primary-50 pr-3 text-sm',
              'cursor-pointer select-none transition-colors',
              hoveredId === task.id && 'bg-muted-light/60',
              selectedId === task.id && 'bg-muted-light'
            )}
            style={{
              height: rowHeight,
              paddingLeft: 12 + task.depth * 16
            }}
            onClick={() => onRowClick(task)}
            onPointerEnter={() => onRowHover(task.id)}
            onPointerLeave={() => onRowHover(null)}
          >
            {hasChildren ? (
              <button
                type="button"
                className={cn(
                  'flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded',
                  'text-muted hover:bg-primary-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary'
                )}
                onClick={(event) => {
                  event.stopPropagation()
                  onToggleCollapse(task.id)
                }}
                aria-label={collapsed ? 'Expand' : 'Collapse'}
                aria-expanded={!collapsed}
              >
                <Icon
                  icon={ChevronRight}
                  size="sm"
                  className={cn('transition-transform', !collapsed && 'rotate-90')}
                />
              </button>
            ) : (
              <span className="h-4 w-4 shrink-0" />
            )}

            <span
              className={cn(
                'min-w-0 flex-1 truncate',
                task.type === 'project' && 'font-medium'
              )}
              title={task.name}
            >
              {task.name}
            </span>

            {showDates && (
              <>
                <span
                  className="shrink-0 text-right text-xs text-muted tabular-nums"
                  style={{ width: DATE_COLUMN_WIDTH }}
                >
                  {formatDate(task.start, locale)}
                </span>
                <span
                  className="shrink-0 text-right text-xs text-muted tabular-nums"
                  style={{ width: DATE_COLUMN_WIDTH }}
                >
                  {task.type === 'milestone' ? '—' : formatDate(task.end, locale)}
                </span>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}
