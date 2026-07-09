import { CSSProperties, KeyboardEvent, PointerEvent } from 'react'

import { cva } from 'class-variance-authority'

import { cn } from '../../utilities'
import { SlateVariant, Variants } from '../../utilities/types'
import {
  GanttDragMode,
  ResolvedGanttTask
} from './gantt-core'

const trackVariants = cva<Variants<{ variant: SlateVariant }>>(
  ['absolute rounded-md border transition-shadow'],
  {
    variants: {
      variant: {
        default: 'bg-muted-light border-primary-100',
        primary: 'bg-primary-100 border-primary-200',
        secondary: 'bg-secondary-100 border-secondary-200',
        subtle: 'bg-transparent border-primary-100 border-dashed',
        success: 'bg-success-100 border-success-200',
        warning: 'bg-warning-100 border-warning-200',
        error: 'bg-error-100 border-error-200',
        info: 'bg-info-100 border-info-200'
      }
    }
  }
)

const progressVariants = cva<Variants<{ variant: SlateVariant }>>(
  ['absolute inset-0'],
  {
    variants: {
      variant: {
        default: 'bg-primary-200',
        primary: 'bg-primary',
        secondary: 'bg-secondary-400',
        subtle: 'bg-primary-100',
        success: 'bg-success-500',
        warning: 'bg-warning-500',
        error: 'bg-error-500',
        info: 'bg-info-500'
      }
    }
  }
)

/** Label color on the light track portion of a bar. */
const labelOnTrackVariants = cva<Variants<{ variant: SlateVariant }>>([''], {
  variants: {
    variant: {
      default: 'text-primary-900',
      primary: 'text-primary-900',
      secondary: 'text-secondary-900',
      subtle: 'text-primary-700',
      success: 'text-success-800',
      warning: 'text-warning-800',
      error: 'text-error-800',
      info: 'text-info-800'
    }
  }
})

/** Label color over the solid progress fill (the block's anti color). */
const labelOnProgressVariants = cva<Variants<{ variant: SlateVariant }>>(
  [''],
  {
    variants: {
      variant: {
        default: 'text-white',
        primary: 'text-anti-primary',
        secondary: 'text-anti-secondary',
        subtle: 'text-primary-900',
        success: 'text-anti-success',
        warning: 'text-anti-warning',
        error: 'text-anti-error',
        info: 'text-anti-info'
      }
    }
  }
)

const LABEL_CLASSES =
  'absolute left-0 top-1/2 -translate-y-1/2 truncate px-2 text-xs font-medium leading-none'
/**
 * Labels placed beside a shape get a white chip so dependency arrows passing
 * at row center run behind them instead of striking through the text.
 */
const SIDE_LABEL_CLASSES =
  'absolute left-full whitespace-nowrap rounded bg-white/90 px-1 py-0.5 text-xs leading-none'
const MIN_WIDTH_FOR_INSIDE_LABEL = 48

const solidVariants = cva<Variants<{ variant: SlateVariant }>>([''], {
  variants: {
    variant: {
      default: 'bg-primary-300',
      primary: 'bg-primary',
      secondary: 'bg-secondary-600',
      subtle: 'bg-primary-200',
      success: 'bg-success-600',
      warning: 'bg-warning-600',
      error: 'bg-error-600',
      info: 'bg-info-600'
    }
  }
})

export interface GanttBarProps {
  task: ResolvedGanttTask
  x1: number
  x2: number
  y: number
  rowHeight: number
  selected: boolean
  interactive: boolean
  showProgress: boolean
  /** Animate into place after a drag commits and snaps to the grid. */
  snapping?: boolean
  label?: string
  barStyle?: CSSProperties
  onDragStart: (
    event: PointerEvent<HTMLDivElement>,
    task: ResolvedGanttTask,
    mode: GanttDragMode
  ) => void
  onClick: (task: ResolvedGanttTask) => void
  onDoubleClick: (task: ResolvedGanttTask) => void
  onHover: (task: ResolvedGanttTask | null, clientX: number) => void
  onKeyNudge: (
    task: ResolvedGanttTask,
    event: KeyboardEvent<HTMLDivElement>
  ) => void
}

export function GanttBar({
  task,
  x1,
  x2,
  y,
  rowHeight,
  selected,
  interactive,
  showProgress,
  snapping = false,
  label,
  barStyle,
  onDragStart,
  onClick,
  onDoubleClick,
  onHover,
  onKeyNudge
}: GanttBarProps) {
  const variant = task.variant ?? 'primary'
  const width = Math.max(x2 - x1, 2)
  const snapClass = snapping
    ? 'transition-[left,width,top] duration-200 ease-out'
    : undefined

  const sharedProps = {
    role: 'button',
    tabIndex: 0,
    onClick: () => onClick(task),
    onDoubleClick: () => onDoubleClick(task),
    onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => onKeyNudge(task, event),
    onPointerEnter: (event: PointerEvent<HTMLDivElement>) =>
      onHover(task, event.clientX),
    onPointerMove: (event: PointerEvent<HTMLDivElement>) =>
      onHover(task, event.clientX),
    onPointerLeave: () => onHover(null, 0)
  }

  if (task.type === 'milestone') {
    const diamond = Math.round(rowHeight * 0.4)
    return (
      <div
        {...sharedProps}
        className={cn(
          'absolute flex items-center justify-center cursor-pointer',
          'focus:outline-none group',
          snapClass
        )}
        style={{
          left: x1 - rowHeight / 2,
          top: y,
          width: rowHeight,
          height: rowHeight,
          ...barStyle
        }}
        onPointerDown={(event) =>
          interactive && onDragStart(event, task, 'move')
        }
        aria-label={task.name}
      >
        <div
          className={cn(
            'rotate-45 rounded-[3px] transition-shadow',
            solidVariants({ variant }),
            interactive && 'cursor-grab active:cursor-grabbing',
            selected
              ? 'ring-2 ring-primary ring-offset-1'
              : 'group-focus-visible:ring-2 group-focus-visible:ring-primary group-focus-visible:ring-offset-1'
          )}
          style={{ width: diamond, height: diamond }}
        />
        {label && (
          <span
            className={cn(SIDE_LABEL_CLASSES, 'text-muted')}
            style={{ marginLeft: 6 }}
          >
            {label}
          </span>
        )}
      </div>
    )
  }

  if (task.type === 'project') {
    const barHeight = Math.max(Math.round(rowHeight * 0.28), 8)
    const capSize = Math.min(Math.round(barHeight * 0.85), 9)
    const top = y + Math.round((rowHeight - barHeight) / 2) - capSize / 2
    return (
      <div
        {...sharedProps}
        className={cn(
          'absolute cursor-pointer focus:outline-none group',
          'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-sm',
          snapClass
        )}
        style={{ left: x1, top, width, height: barHeight + capSize, ...barStyle }}
        aria-label={task.name}
      >
        {/* Top corners only: square bottom corners connect flush with the
            end caps below. */}
        <div
          className={cn(
            'absolute inset-x-0 top-0 rounded-t-sm opacity-90',
            solidVariants({ variant }),
            selected && 'ring-2 ring-primary ring-offset-1'
          )}
          style={{ height: barHeight }}
        />
        {/* End caps pointing down, marking the project extent. */}
        <div
          className={cn('absolute left-0', solidVariants({ variant }))}
          style={{
            top: barHeight - 1,
            width: capSize,
            height: capSize,
            clipPath: 'polygon(0 0, 100% 0, 0 100%)'
          }}
        />
        <div
          className={cn('absolute right-0', solidVariants({ variant }))}
          style={{
            top: barHeight - 1,
            width: capSize,
            height: capSize,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%)'
          }}
        />
        {label && (
          <span
            className={cn(
              SIDE_LABEL_CLASSES,
              '-top-0.5 font-medium text-primary-900'
            )}
            style={{ marginLeft: 8 }}
          >
            {label}
          </span>
        )}
      </div>
    )
  }

  const barHeight = Math.max(Math.round(rowHeight * 0.6), 16)
  const top = y + Math.round((rowHeight - barHeight) / 2)
  const progress = showProgress ? task.progress : 0
  const labelInside = Boolean(label) && width >= MIN_WIDTH_FOR_INSIDE_LABEL

  return (
    <div
      {...sharedProps}
      className={cn(
        trackVariants({ variant }),
        'group focus:outline-none',
        snapClass,
        interactive ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer',
        selected
          ? 'ring-2 ring-primary ring-offset-1'
          : 'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 hover:shadow-sm'
      )}
      style={{ left: x1, top, width, height: barHeight, ...barStyle }}
      onPointerDown={(event) => interactive && onDragStart(event, task, 'move')}
      aria-label={task.name}
    >
      {/* Label on the track, under the progress fill. */}
      {labelInside && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[5px]">
          <span
            className={cn(LABEL_CLASSES, labelOnTrackVariants({ variant }))}
            style={{ width }}
          >
            {label}
          </span>
        </div>
      )}

      {/* Progress fill, carrying an anti-colored copy of the label clipped
          to its width so the text stays readable across the boundary. */}
      {progress > 0 && (
        <div
          className={cn(
            'pointer-events-none absolute inset-y-0 left-0 overflow-hidden rounded-l-[5px]',
            progress >= 100 && 'rounded-r-[5px]'
          )}
          style={{ width: `${progress}%` }}
        >
          <div className={progressVariants({ variant })} />
          {labelInside && (
            <span
              className={cn(
                LABEL_CLASSES,
                labelOnProgressVariants({ variant })
              )}
              style={{ width }}
            >
              {label}
            </span>
          )}
        </div>
      )}

      {interactive && (
        <>
          <div
            className={cn(
              'absolute inset-y-0 left-0 w-2 cursor-ew-resize opacity-0',
              'group-hover:opacity-100 flex items-center justify-center'
            )}
            onPointerDown={(event) => {
              event.stopPropagation()
              onDragStart(event, task, 'start')
            }}
          >
            <div className="h-1/2 w-0.5 rounded-full bg-white/80 mix-blend-difference" />
          </div>
          <div
            className={cn(
              'absolute inset-y-0 right-0 w-2 cursor-ew-resize opacity-0',
              'group-hover:opacity-100 flex items-center justify-center'
            )}
            onPointerDown={(event) => {
              event.stopPropagation()
              onDragStart(event, task, 'end')
            }}
          >
            <div className="h-1/2 w-0.5 rounded-full bg-white/80 mix-blend-difference" />
          </div>
          {showProgress && (
            <div
              className={cn(
                'absolute top-full -translate-x-1/2 -translate-y-1 cursor-ew-resize',
                'opacity-0 group-hover:opacity-100'
              )}
              style={{ left: `${progress}%` }}
              onPointerDown={(event) => {
                event.stopPropagation()
                onDragStart(event, task, 'progress')
              }}
            >
              <div
                className={cn(
                  'h-2 w-2 rounded-full border border-white shadow-sm',
                  solidVariants({ variant })
                )}
              />
            </div>
          )}
        </>
      )}

      {/* Too narrow for an inside label: fall back to the right side. */}
      {label && !labelInside && (
        <span
          className={cn(
            SIDE_LABEL_CLASSES,
            'top-1/2 -translate-y-1/2 text-muted'
          )}
          style={{ marginLeft: 8 }}
        >
          {label}
        </span>
      )}
    </div>
  )
}
