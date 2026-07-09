import {
  KeyboardEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore
} from 'react'

import { CalendarRange } from 'lucide-react'

import {
  cn,
  gid,
  SlateId
} from '../../utilities'
import { Button } from '../Button'
import { EmptyState } from '../EmptyState'
import {
  GanttProps,
  GanttUnit
} from './Gantt.types'
import {
  clamp,
  columnLabel,
  columnSubLabel,
  diffDays,
  formatDateLong,
  GanttDragMode,
  isWeekend,
  ResolvedGanttTask,
  startOfDay,
  UNIT_PRESET_ZOOM
} from './gantt-core'
import { GanttEngine } from './GanttEngine'
import { GanttBar } from './GanttBar'
import {
  GanttTaskListHeader,
  GanttTaskListRows
} from './GanttTaskList'

export * from './Gantt.types'
export {
  GanttEngine,
  type GanttCommit,
  type GanttEngineOptions,
  type GanttEngineSnapshot
} from './GanttEngine'
export {
  MAX_ZOOM,
  MIN_ZOOM,
  UNIT_PRESET_ZOOM,
  unitForZoom,
  type GanttDragMode,
  type ResolvedGanttTask
} from './gantt-core'

const UNITS: { id: GanttUnit; label: string }[] = [
  { id: 'day', label: 'Day' },
  { id: 'week', label: 'Week' },
  { id: 'month', label: 'Month' },
  { id: 'quarter', label: 'Quarter' },
  { id: 'year', label: 'Year' }
]

const ROW_HEIGHTS = { sm: 32, md: 40, lg: 48 }
const HEADER_HEIGHT = 56
const HEADER_TOP_HEIGHT = 24
const MIN_TASK_LIST_WIDTH = 150
const MAX_TASK_LIST_WIDTH = 520
const SNAP_ANIMATION_MS = 200

export function Gantt({
  tasks,
  size = 'md',
  zoom: zoomProp,
  defaultZoom,
  onZoomChange,
  onUnitChange,
  selectedId: selectedIdProp,
  onSelectedChange,
  onTaskChange,
  onTaskClick,
  onTaskDoubleClick,
  readOnly = false,
  showToolbar = true,
  showTaskList = true,
  showDependencies = true,
  showToday = true,
  showWeekends = true,
  showProgress = true,
  taskListWidth: taskListWidthProp = 288,
  rowHeight: rowHeightProp,
  maxHeight,
  locale = 'en-US',
  renderTooltip,
  emptyState,
  className,
  styles,
  ...props
}: GanttProps) {
  const rowHeight = rowHeightProp ?? ROW_HEIGHTS[size]

  // The engine owns all state & logic; this component only renders it and
  // translates DOM gestures (pixels) into engine actions (days).
  const engineRef = useRef<GanttEngine | null>(null)
  if (!engineRef.current) {
    engineRef.current = new GanttEngine({
      tasks,
      zoom: zoomProp ?? defaultZoom,
      rowHeight,
      locale
    })
  }
  const engine = engineRef.current

  useEffect(() => {
    engine.configure({
      tasks,
      zoom: zoomProp,
      rowHeight,
      locale,
      onCommit: (commit) => onTaskChange?.(commit.task),
      onZoomChange,
      onUnitChange,
      onSelectedChange
    })
  })

  useEffect(() => {
    if (selectedIdProp !== undefined) engine.select(selectedIdProp)
  }, [engine, selectedIdProp])

  const snap = useSyncExternalStore(
    engine.subscribe,
    engine.getSnapshot,
    engine.getSnapshot
  )

  const [taskListWidth, setTaskListWidth] = useState(taskListWidthProp)
  const [tooltipX, setTooltipX] = useState<number | null>(null)
  const listWidth = showTaskList ? taskListWidth : 0
  const listWidthRef = useRef(listWidth)
  listWidthRef.current = listWidth

  const scrollRef = useRef<HTMLDivElement>(null)
  const suppressClickRef = useRef(false)
  const pendingAnchorRef = useRef<{ date: Date; pointerX: number } | null>(
    null
  )
  const markerId = useMemo(gid, [])

  const { rows, scale, columns, headerGroups, layout, arrows, todayX } = snap
  const bodyHeight = rows.length * rowHeight
  const today = startOfDay(new Date())

  // -- Viewport tracking (grid always fills the visible area) ---------------

  const [viewportWidth, setViewportWidth] = useState(0)
  useEffect(() => {
    const node = scrollRef.current
    if (!node) return
    const observer = new ResizeObserver((entries) => {
      setViewportWidth(entries[0].contentRect.width)
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [tasks.length])

  useEffect(() => {
    engine.setViewportWidth(Math.max(viewportWidth - listWidth, 0))
  }, [engine, viewportWidth, listWidth])

  // -- Scroll stability -----------------------------------------------------

  // Keeps the viewport visually stable when the scale changes: pinch zooming
  // anchors the date under the pointer, and range growth (e.g. dragging a bar
  // past the edge) compensates for newly prepended columns.
  const prevScaleRef = useRef<{ startMs: number; zoom: number } | null>(null)
  useLayoutEffect(() => {
    const node = scrollRef.current
    const startMs = scale.rangeStart.getTime()
    const prev = prevScaleRef.current
    prevScaleRef.current = { startMs, zoom: snap.zoom }
    if (!node || !prev) return
    const anchor = pendingAnchorRef.current
    if (anchor) {
      pendingAnchorRef.current = null
      node.scrollLeft =
        scale.dateToX(anchor.date) + listWidthRef.current - anchor.pointerX
    } else if (prev.startMs !== startMs && prev.zoom === snap.zoom) {
      node.scrollLeft += scale.dateToX(new Date(prev.startMs))
    }
  }, [scale, snap.zoom])

  function scrollToToday(smooth = true) {
    const node = scrollRef.current
    if (!node) return
    const target = todayX - (node.clientWidth - listWidth) / 2
    node.scrollTo({
      left: Math.max(target, 0),
      behavior: smooth ? 'smooth' : 'auto'
    })
  }

  const hasScrolledRef = useRef(false)
  useEffect(() => {
    if (hasScrolledRef.current || tasks.length === 0) return
    hasScrolledRef.current = true
    scrollToToday(false)
  }, [tasks.length])

  // -- Pinch / ctrl+scroll zoom ---------------------------------------------

  useEffect(() => {
    const node = scrollRef.current
    if (!node) return
    function onWheel(event: WheelEvent) {
      if (!node) return
      // Trackpad pinches arrive as wheel events with ctrlKey set; also allow
      // explicit ctrl/cmd + scroll.
      if (!event.ctrlKey && !event.metaKey) return
      event.preventDefault()
      const rect = node.getBoundingClientRect()
      const pointerX = Math.max(
        event.clientX - rect.left,
        listWidthRef.current
      )
      const current = engine.getSnapshot()
      const contentX = node.scrollLeft + pointerX - listWidthRef.current
      pendingAnchorRef.current = {
        date: current.scale.xToDate(contentX),
        pointerX
      }
      engine.zoomBy(Math.exp(-event.deltaY * 0.01))
    }
    node.addEventListener('wheel', onWheel, { passive: false })
    return () => node.removeEventListener('wheel', onWheel)
  }, [engine, tasks.length])

  function setUnitPreset(unit: GanttUnit) {
    const node = scrollRef.current
    if (node) {
      const center = listWidth + (node.clientWidth - listWidth) / 2
      const contentX = node.scrollLeft + center - listWidth
      pendingAnchorRef.current = {
        date: scale.xToDate(contentX),
        pointerX: center
      }
    }
    engine.setZoom(UNIT_PRESET_ZOOM[unit])
  }

  // -- Bar dragging ----------------------------------------------------------

  function handleDragStart(
    event: ReactPointerEvent<HTMLDivElement>,
    task: ResolvedGanttTask,
    mode: GanttDragMode
  ) {
    if (readOnly || event.button !== 0) return
    event.preventDefault()
    if (!engine.startDrag(task.id, mode)) return

    const startX = event.clientX
    const zoom = snap.zoom
    const cursor = mode === 'move' ? 'grabbing' : 'ew-resize'
    const prevCursor = document.body.style.cursor
    const prevSelect = document.body.style.userSelect
    document.body.style.cursor = cursor
    document.body.style.userSelect = 'none'

    function onMove(moveEvent: PointerEvent) {
      engine.moveDrag((moveEvent.clientX - startX) / zoom)
    }
    function onUp() {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      document.body.style.cursor = prevCursor
      document.body.style.userSelect = prevSelect
      const commit = engine.endDrag()
      if (commit) {
        suppressClickRef.current = true
        setTimeout(() => {
          suppressClickRef.current = false
        }, 0)
        setTimeout(() => engine.clearSnapping(), SNAP_ANIMATION_MS + 40)
      }
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  function handleBarClick(task: ResolvedGanttTask) {
    if (suppressClickRef.current) return
    engine.select(task.id)
    onTaskClick?.(task)
  }

  function handleKeyNudge(
    task: ResolvedGanttTask,
    event: KeyboardEvent<HTMLDivElement>
  ) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleBarClick(task)
      return
    }
    if (readOnly) return
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    const direction = event.key === 'ArrowLeft' ? -1 : 1
    engine.nudge(task.id, event.shiftKey ? 'end' : 'move', direction)
  }

  // -- Task list splitter -----------------------------------------------------

  function handleSplitterDown(event: ReactPointerEvent<HTMLDivElement>) {
    event.preventDefault()
    const startX = event.clientX
    const startWidth = taskListWidth
    const prevCursor = document.body.style.cursor
    const prevSelect = document.body.style.userSelect
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'

    function onMove(moveEvent: PointerEvent) {
      setTaskListWidth(
        clamp(
          startWidth + moveEvent.clientX - startX,
          MIN_TASK_LIST_WIDTH,
          MAX_TASK_LIST_WIDTH
        )
      )
    }
    function onUp() {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      document.body.style.cursor = prevCursor
      document.body.style.userSelect = prevSelect
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  // -- Tooltip ----------------------------------------------------------------

  const [hoveredTooltipId, setHoveredTooltipId] = useState<SlateId | null>(null)
  const tooltipTask = snap.drag
    ? rows.find((task) => task.id === snap.drag?.taskId)
    : hoveredTooltipId !== null
      ? rows.find((task) => task.id === hoveredTooltipId)
      : undefined
  const tooltipLayout = tooltipTask ? layout.get(tooltipTask.id) : undefined

  function defaultTooltip(task: ResolvedGanttTask): ReactNode {
    // While dragging, show where the task will land when it snaps.
    const window =
      snap.drag && snap.drag.taskId === task.id
        ? snap.drag.snapped
        : { start: task.start, end: task.end, progress: task.progress }
    const days = diffDays(window.end, window.start) + 1
    return (
      <div className="flex flex-col gap-0.5">
        <span className="font-medium">{task.name}</span>
        <span className="opacity-80">
          {task.type === 'milestone'
            ? formatDateLong(window.start, locale)
            : `${formatDateLong(window.start, locale)} – ${formatDateLong(window.end, locale)} · ${days}d`}
        </span>
        {showProgress &&
          task.type !== 'milestone' &&
          (snap.drag?.taskId === task.id && snap.drag.mode === 'progress' ? (
            <span className="opacity-80">
              {Math.round(window.progress)}% complete
            </span>
          ) : (
            <span className="opacity-80">{task.progress}% complete</span>
          ))}
      </div>
    )
  }

  const isEmpty = tasks.length === 0

  return (
    <div
      className={cn(
        'flex w-full flex-col overflow-hidden rounded-lg border bg-white',
        className
      )}
      style={styles?.root}
      {...props}
    >
      {showToolbar && (
        <div
          className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b px-3 py-2"
          style={styles?.toolbar}
        >
          <div className="flex items-center rounded-lg border p-0.5">
            {UNITS.map((unit) => (
              <button
                key={unit.id}
                type="button"
                className={cn(
                  'cursor-pointer rounded-md px-2.5 py-1 text-xs leading-none transition-colors',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  snap.unit === unit.id
                    ? 'bg-primary text-anti-primary'
                    : 'text-muted hover:bg-muted-light'
                )}
                onClick={() => setUnitPreset(unit.id)}
              >
                {unit.label}
              </button>
            ))}
          </div>
          <Button size="sm" onClick={() => scrollToToday()}>
            Today
          </Button>
        </div>
      )}

      {isEmpty ? (
        <EmptyState
          icon={CalendarRange}
          title="No tasks to display"
          {...emptyState}
        />
      ) : (
        <div
          ref={scrollRef}
          className="relative min-h-0 overflow-auto overscroll-x-contain"
          style={{ maxHeight, ...styles?.timeline }}
        >
          <div
            className="relative"
            style={{ width: listWidth + scale.totalWidth }}
          >
            {/* Header row: pinned while scrolling vertically. */}
            <div
              className="sticky top-0 z-20 flex border-b bg-white"
              style={{ height: HEADER_HEIGHT, ...styles?.header }}
            >
              {showTaskList && (
                <div
                  className="sticky left-0 z-10 shrink-0 border-r bg-white"
                  style={{ width: listWidth }}
                >
                  <GanttTaskListHeader width={listWidth} />
                  <div
                    className="absolute inset-y-0 -right-1 z-10 w-2 cursor-col-resize hover:bg-primary-100/60"
                    onPointerDown={handleSplitterDown}
                    onDoubleClick={() => setTaskListWidth(taskListWidthProp)}
                  />
                </div>
              )}
              <div
                className="relative shrink-0"
                style={{ width: scale.totalWidth }}
              >
                {headerGroups.map((group) => (
                  <div
                    key={`${group.x}`}
                    className="absolute top-0 overflow-hidden border-l border-primary-50 whitespace-nowrap px-2 text-xs font-medium leading-none text-muted"
                    style={{
                      left: group.x,
                      width: group.width,
                      height: HEADER_TOP_HEIGHT,
                      paddingTop: 8
                    }}
                  >
                    {group.label}
                  </div>
                ))}
                {columns.map((column) => {
                  const isToday =
                    snap.unit === 'day' &&
                    column.start.getTime() === today.getTime()
                  const subLabel = columnSubLabel(column, snap.unit, locale)
                  return (
                    <div
                      key={column.start.getTime()}
                      className={cn(
                        'absolute bottom-0 flex flex-col items-center justify-center gap-0.5 overflow-hidden',
                        'border-l border-primary-50 text-xs leading-none text-muted'
                      )}
                      style={{
                        left: column.x,
                        width: column.width,
                        height: HEADER_HEIGHT - HEADER_TOP_HEIGHT
                      }}
                    >
                      {subLabel && (
                        <span className="text-[10px] opacity-70">
                          {subLabel}
                        </span>
                      )}
                      <span
                        className={cn(
                          isToday &&
                            'flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 font-medium text-anti-primary'
                        )}
                      >
                        {columnLabel(column, snap.unit, locale)}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Body row. */}
            <div className="flex">
              {showTaskList && (
                <div
                  className="sticky left-0 z-10 shrink-0 border-r bg-white"
                  style={{ width: listWidth, ...styles?.taskList }}
                >
                  <GanttTaskListRows
                    rows={rows}
                    width={listWidth}
                    rowHeight={rowHeight}
                    collapsedIds={snap.collapsedIds}
                    selectedId={snap.selectedId}
                    hoveredId={snap.hoveredId}
                    locale={locale}
                    onToggleCollapse={(id) => engine.toggleCollapse(id)}
                    onRowClick={handleBarClick}
                    onRowHover={(id) => engine.hover(id)}
                  />
                  <div
                    className="absolute inset-y-0 -right-1 z-10 w-2 cursor-col-resize hover:bg-primary-100/60"
                    onPointerDown={handleSplitterDown}
                    onDoubleClick={() => setTaskListWidth(taskListWidthProp)}
                  />
                </div>
              )}

              <div
                className="relative shrink-0"
                style={{ width: scale.totalWidth, height: bodyHeight }}
                onClick={(event) => {
                  if (event.target === event.currentTarget) {
                    engine.select(null)
                  }
                }}
              >
                {/* Weekend shading. */}
                {showWeekends &&
                  snap.unit === 'day' &&
                  columns.map(
                    (column) =>
                      isWeekend(column.start) && (
                        <div
                          key={column.start.getTime()}
                          className="absolute inset-y-0 bg-muted-light/50"
                          style={{ left: column.x, width: column.width }}
                        />
                      )
                  )}

                {/* Vertical grid lines. */}
                {columns.map((column) => (
                  <div
                    key={column.start.getTime()}
                    className="absolute inset-y-0 border-l border-primary-50"
                    style={{ left: column.x }}
                  />
                ))}

                {/* Row stripes: hover + selection highlight, click to select. */}
                {rows.map((task, row) => (
                  <div
                    key={task.id}
                    className={cn(
                      'absolute inset-x-0 border-b border-primary-50 transition-colors',
                      snap.hoveredId === task.id && 'bg-muted-light/40',
                      snap.selectedId === task.id && 'bg-muted-light/60'
                    )}
                    style={{ top: row * rowHeight, height: rowHeight }}
                    onClick={() => handleBarClick(task)}
                    onPointerEnter={() => engine.hover(task.id)}
                    onPointerLeave={() => engine.hover(null)}
                  />
                ))}

                {/* Today marker. */}
                {showToday && (
                  <div
                    className="pointer-events-none absolute inset-y-0"
                    style={{ left: todayX }}
                  >
                    <div className="absolute inset-y-0 w-px bg-error-400" />
                    <div className="absolute -left-[3px] top-0 h-[7px] w-[7px] rounded-full bg-error-400" />
                  </div>
                )}

                {/* Dependency arrows. */}
                {showDependencies && arrows.length > 0 && (
                  <svg
                    className="pointer-events-none absolute inset-0"
                    width={scale.totalWidth}
                    height={bodyHeight}
                  >
                    <defs>
                      <marker
                        id={`${markerId}-arrow`}
                        viewBox="0 0 8 8"
                        refX="7"
                        refY="4"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse"
                      >
                        <path
                          d="M 0 0.5 L 7.5 4 L 0 7.5 z"
                          fill="var(--color-primary-200)"
                        />
                      </marker>
                      <marker
                        id={`${markerId}-arrow-active`}
                        viewBox="0 0 8 8"
                        refX="7"
                        refY="4"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse"
                      >
                        <path
                          d="M 0 0.5 L 7.5 4 L 0 7.5 z"
                          fill="var(--color-primary)"
                        />
                      </marker>
                    </defs>
                    {arrows.map((arrow) => {
                      const highlighted =
                        snap.hoveredId === arrow.fromId ||
                        snap.hoveredId === arrow.toId ||
                        snap.selectedId === arrow.fromId ||
                        snap.selectedId === arrow.toId
                      return (
                        <path
                          key={`${String(arrow.fromId)}-${String(arrow.toId)}`}
                          d={orthogonalPath(arrow.points, 4)}
                          fill="none"
                          strokeWidth={1.5}
                          className={
                            highlighted
                              ? 'stroke-primary'
                              : 'stroke-primary-200'
                          }
                          markerEnd={`url(#${markerId}-arrow${highlighted ? '-active' : ''})`}
                        />
                      )
                    })}
                  </svg>
                )}

                {/* Bars. */}
                {rows.map((task) => {
                  const barLayout = layout.get(task.id)
                  if (!barLayout) return null
                  return (
                    <GanttBar
                      key={task.id}
                      task={task}
                      x1={barLayout.x1}
                      x2={barLayout.x2}
                      y={barLayout.y}
                      rowHeight={rowHeight}
                      selected={snap.selectedId === task.id}
                      interactive={
                        !readOnly && !task.disabled && task.type !== 'project'
                      }
                      showProgress={showProgress}
                      snapping={snap.snappingId === task.id}
                      label={task.name}
                      barStyle={styles?.bar}
                      onDragStart={handleDragStart}
                      onClick={handleBarClick}
                      onDoubleClick={(clicked) => onTaskDoubleClick?.(clicked)}
                      onHover={(hovered, clientX) => {
                        engine.hover(hovered ? hovered.id : null)
                        setHoveredTooltipId(hovered ? hovered.id : null)
                        if (hovered && scrollRef.current) {
                          const rect =
                            scrollRef.current.getBoundingClientRect()
                          setTooltipX(
                            clientX -
                              rect.left +
                              scrollRef.current.scrollLeft -
                              listWidth
                          )
                        } else {
                          setTooltipX(null)
                        }
                      }}
                      onKeyNudge={handleKeyNudge}
                    />
                  )
                })}

                {/* Tooltip. */}
                {tooltipTask && tooltipLayout && (
                  <div
                    className={cn(
                      'pointer-events-none absolute z-30 w-max max-w-64 -translate-x-1/2 -translate-y-full',
                      'rounded-md bg-primary px-2.5 py-1.5 text-xs text-anti-primary shadow-md'
                    )}
                    style={{
                      left: clamp(
                        snap.drag
                          ? (tooltipLayout.x1 + tooltipLayout.x2) / 2
                          : (tooltipX ?? 0),
                        48,
                        Math.max(scale.totalWidth - 48, 48)
                      ),
                      top: tooltipLayout.y - 2,
                      ...styles?.tooltip
                    }}
                  >
                    {(renderTooltip ?? defaultTooltip)(tooltipTask)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function orthogonalPath(points: [number, number][], radius: number): string {
  if (points.length < 2) return ''
  let d = `M ${points[0][0]} ${points[0][1]}`
  for (let i = 1; i < points.length; i++) {
    const [x, y] = points[i]
    const [px, py] = points[i - 1]
    if (i === points.length - 1) {
      d += ` L ${x} ${y}`
      continue
    }
    const [nx, ny] = points[i + 1]
    const r = Math.min(
      radius,
      Math.max(Math.abs(x - px), Math.abs(y - py)) / 2,
      Math.max(Math.abs(nx - x), Math.abs(ny - y)) / 2
    )
    const inX = x === px ? 0 : x > px ? -r : r
    const inY = y === py ? 0 : y > py ? -r : r
    const outX = nx === x ? 0 : nx > x ? r : -r
    const outY = ny === y ? 0 : ny > y ? r : -r
    d += ` L ${x + inX} ${y + inY} Q ${x} ${y} ${x + outX} ${y + outY}`
  }
  return d
}

Gantt.displayName = 'Gantt'
