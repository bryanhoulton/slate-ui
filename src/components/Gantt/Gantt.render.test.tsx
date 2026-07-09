// @vitest-environment jsdom
/**
 * Rendering-layer smoke tests: mounts the real <Gantt /> and drives it the
 * way a user would (pointer drags, pinch-zoom wheel events, clicks) to make
 * sure the engine is wired to the DOM correctly.
 */
import { act } from 'react'
import { createRoot, Root } from 'react-dom/client'
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest'

import { Gantt } from './'
import { GanttTask } from './Gantt.types'

declare global {
  // eslint-disable-next-line no-var
  var IS_REACT_ACT_ENVIRONMENT: boolean
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true

// jsdom is missing layout APIs the component touches.
beforeEach(() => {
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  )
  Element.prototype.scrollTo = () => {}
})

let container: HTMLDivElement
let root: Root

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)
})

afterEach(() => {
  act(() => root.unmount())
  container.remove()
  vi.unstubAllGlobals()
})

function day(offset: number): Date {
  const today = new Date()
  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + offset
  )
}

function makeTasks(): GanttTask[] {
  return [
    { id: 'p', name: 'Phase', type: 'project', start: day(-5), end: day(5) },
    { id: 'a', name: 'Alpha', parentId: 'p', start: day(-5), end: day(-1), progress: 50 },
    { id: 'b', name: 'Beta', parentId: 'p', start: day(0), end: day(5), progress: 0, dependencies: ['a'] },
    { id: 'm', name: 'Ship', type: 'milestone', start: day(6), end: day(6) }
  ]
}

function render(ui: Parameters<Root['render']>[0]) {
  act(() => root.render(ui))
}

function pointer(type: string, options: MouseEventInit = {}): MouseEvent {
  return new MouseEvent(type, { bubbles: true, button: 0, ...options })
}

function findBar(name: string): HTMLElement {
  const bar = container.querySelector<HTMLElement>(`[aria-label="${name}"]`)
  expect(bar, `bar "${name}" should render`).not.toBeNull()
  return bar!
}

describe('Gantt rendering layer', () => {
  it('renders the toolbar (opt-in), task list, bars, arrows, and today line', () => {
    render(<Gantt tasks={makeTasks()} defaultZoom={44} showToolbar />)

    // Toolbar: unit presets + Today, with the derived unit active.
    const buttons = Array.from(container.querySelectorAll('button')).map(
      (button) => button.textContent
    )
    for (const label of ['Day', 'Week', 'Month', 'Quarter', 'Year', 'Today']) {
      expect(buttons).toContain(label)
    }

    // Task list: one row per task, dates shown.
    for (const name of ['Phase', 'Alpha', 'Beta', 'Ship']) {
      expect(container.textContent).toContain(name)
    }

    // Bars render with accessible names, including the milestone.
    findBar('Alpha')
    findBar('Ship')

    // Dependency arrow svg and today marker exist.
    expect(container.querySelector('svg path[marker-end]')).not.toBeNull()
    expect(container.querySelector('.bg-error-400')).not.toBeNull()
  })

  it('collapses a project subtree from the task list chevron', () => {
    render(<Gantt tasks={makeTasks()} />)
    expect(container.textContent).toContain('Alpha')

    const chevron = container.querySelector<HTMLElement>(
      '[aria-label="Collapse"]'
    )
    expect(chevron).not.toBeNull()
    act(() => {
      chevron!.dispatchEvent(pointer('click'))
    })

    expect(container.textContent).not.toContain('Alpha')
    expect(container.textContent).toContain('Phase')
  })

  it('selects on click and reports it', () => {
    const onTaskClick = vi.fn()
    const onSelectedChange = vi.fn()
    render(
      <Gantt
        tasks={makeTasks()}
        onTaskClick={onTaskClick}
        onSelectedChange={onSelectedChange}
      />
    )
    act(() => {
      findBar('Alpha').dispatchEvent(pointer('click'))
    })
    expect(onTaskClick).toHaveBeenCalledTimes(1)
    expect(onTaskClick.mock.calls[0][0].id).toBe('a')
    expect(onSelectedChange).toHaveBeenCalledWith('a')
  })

  it('drags a bar freely and commits snapped to the visible day grid', async () => {
    const onTaskChange = vi.fn()
    render(
      <Gantt tasks={makeTasks()} defaultZoom={44} onTaskChange={onTaskChange} />
    )
    const alpha = findBar('Alpha')

    act(() => {
      alpha.dispatchEvent(pointer('pointerdown', { clientX: 0 }))
    })
    // 100px at 44 px/day = 2.27 days of free movement...
    act(() => {
      window.dispatchEvent(pointer('pointermove', { clientX: 100 }))
    })
    act(() => {
      window.dispatchEvent(pointer('pointerup', { clientX: 100 }))
    })

    // ...which snaps to exactly +2 days on release.
    expect(onTaskChange).toHaveBeenCalledTimes(1)
    const changed = onTaskChange.mock.calls[0][0] as GanttTask
    expect(changed.id).toBe('a')
    expect(changed.start).toEqual(day(-3))
    expect(changed.end).toEqual(day(1))

    // The committed position persists in the task list (uncontrolled usage).
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300))
    })
    expect(container.textContent).toContain('Alpha')
  })

  it('treats tiny pointer wiggles as clicks, not drags', () => {
    const onTaskChange = vi.fn()
    const onTaskClick = vi.fn()
    render(
      <Gantt
        tasks={makeTasks()}
        defaultZoom={44}
        onTaskChange={onTaskChange}
        onTaskClick={onTaskClick}
      />
    )
    const alpha = findBar('Alpha')
    act(() => {
      alpha.dispatchEvent(pointer('pointerdown', { clientX: 0 }))
      window.dispatchEvent(pointer('pointermove', { clientX: 2 }))
      window.dispatchEvent(pointer('pointerup', { clientX: 2 }))
      alpha.dispatchEvent(pointer('click'))
    })
    expect(onTaskChange).not.toHaveBeenCalled()
    expect(onTaskClick).toHaveBeenCalledTimes(1)
  })

  it('pinch (ctrl+wheel) zooms continuously and crosses unit thresholds', () => {
    const onZoomChange = vi.fn()
    const onUnitChange = vi.fn()
    render(
      <Gantt
        tasks={makeTasks()}
        defaultZoom={44}
        onZoomChange={onZoomChange}
        onUnitChange={onUnitChange}
      />
    )
    const scroller = container.querySelector<HTMLElement>('.overflow-auto')
    expect(scroller).not.toBeNull()

    // Pinch out (zoom out): positive deltaY with ctrlKey.
    act(() => {
      scroller!.dispatchEvent(
        new WheelEvent('wheel', {
          bubbles: true,
          cancelable: true,
          ctrlKey: true,
          deltaY: 100,
          clientX: 400
        })
      )
    })
    expect(onZoomChange).toHaveBeenCalled()
    const zoomedTo = onZoomChange.mock.calls[0][0] as number
    expect(zoomedTo).toBeLessThan(44)
    expect(zoomedTo).toBeCloseTo(44 * Math.exp(-1), 5)
    // 44 -> ~16.2 px/day crosses into the week unit.
    expect(onUnitChange).toHaveBeenCalledWith('week')

    // Plain scrolling (no modifier) must not zoom.
    onZoomChange.mockClear()
    act(() => {
      scroller!.dispatchEvent(
        new WheelEvent('wheel', { bubbles: true, deltaY: 100 })
      )
    })
    expect(onZoomChange).not.toHaveBeenCalled()
  })

  it('hides the toolbar by default', () => {
    render(<Gantt tasks={makeTasks()} />)
    const buttons = Array.from(container.querySelectorAll('button')).map(
      (button) => button.textContent
    )
    expect(buttons).not.toContain('Today')
    expect(buttons).not.toContain('Month')
  })

  it('jumps to unit presets from the toolbar', () => {
    const onUnitChange = vi.fn()
    render(
      <Gantt
        tasks={makeTasks()}
        defaultZoom={44}
        showToolbar
        onUnitChange={onUnitChange}
      />
    )
    const monthButton = Array.from(
      container.querySelectorAll('button')
    ).find((button) => button.textContent === 'Month')
    act(() => {
      monthButton!.dispatchEvent(pointer('click'))
    })
    expect(onUnitChange).toHaveBeenCalledWith('month')
  })

  it('shows a tooltip with dates on hover', () => {
    render(<Gantt tasks={makeTasks()} defaultZoom={44} />)
    act(() => {
      // React synthesizes onPointerEnter from pointerover.
      findBar('Beta').dispatchEvent(pointer('pointerover', { clientX: 50 }))
    })
    expect(container.textContent).toContain('% complete')
  })

  it('renders the empty state when there are no tasks', () => {
    render(<Gantt tasks={[]} emptyState={{ title: 'Nothing scheduled' }} />)
    expect(container.textContent).toContain('Nothing scheduled')
  })

  it('respects readOnly by not committing drags', () => {
    const onTaskChange = vi.fn()
    render(<Gantt tasks={makeTasks()} readOnly onTaskChange={onTaskChange} />)
    const alpha = findBar('Alpha')
    act(() => {
      alpha.dispatchEvent(pointer('pointerdown', { clientX: 0 }))
      window.dispatchEvent(pointer('pointermove', { clientX: 200 }))
      window.dispatchEvent(pointer('pointerup', { clientX: 200 }))
    })
    expect(onTaskChange).not.toHaveBeenCalled()
  })
})
