import { useState } from 'react'

import type {
  Meta,
  StoryObj
} from '@storybook/react-vite'
import { Plus, RotateCcw, Trash } from 'lucide-react'

import { args, SlateId, STORY_SIZES } from '../../utilities'
import { Button } from '../Button'
import { Gantt } from './'
import { GanttTask, GanttUnit } from './Gantt.types'

function day(offset: number): Date {
  const today = new Date()
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset)
}

const projectTasks: GanttTask[] = [
  {
    id: 'design',
    name: 'Design',
    type: 'project',
    start: day(-10),
    end: day(2)
  },
  {
    id: 'research',
    name: 'User research',
    parentId: 'design',
    start: day(-10),
    end: day(-6),
    progress: 100
  },
  {
    id: 'wireframes',
    name: 'Wireframes',
    parentId: 'design',
    start: day(-5),
    end: day(-2),
    progress: 100,
    dependencies: ['research']
  },
  {
    id: 'visual-design',
    name: 'Visual design',
    parentId: 'design',
    start: day(-1),
    end: day(2),
    progress: 60,
    dependencies: ['wireframes']
  },
  {
    id: 'design-review',
    name: 'Design sign-off',
    type: 'milestone',
    start: day(3),
    end: day(3),
    variant: 'warning',
    dependencies: ['visual-design']
  },
  {
    id: 'build',
    name: 'Build',
    type: 'project',
    start: day(0),
    end: day(16)
  },
  {
    id: 'api',
    name: 'API endpoints',
    parentId: 'build',
    start: day(0),
    end: day(6),
    progress: 45,
    variant: 'info'
  },
  {
    id: 'frontend',
    name: 'Frontend implementation',
    parentId: 'build',
    start: day(4),
    end: day(12),
    progress: 20,
    variant: 'info',
    dependencies: ['design-review']
  },
  {
    id: 'integration',
    name: 'Integration & polish',
    parentId: 'build',
    start: day(12),
    end: day(16),
    progress: 0,
    variant: 'info',
    dependencies: ['api', 'frontend']
  },
  {
    id: 'qa',
    name: 'QA pass',
    start: day(16),
    end: day(20),
    progress: 0,
    variant: 'success',
    dependencies: ['integration']
  },
  {
    id: 'launch',
    name: 'Launch',
    type: 'milestone',
    start: day(21),
    end: day(21),
    variant: 'error',
    dependencies: ['qa']
  }
]

const simpleTasks: GanttTask[] = [
  { id: 1, name: 'Kickoff', start: day(-4), end: day(-3), progress: 100 },
  { id: 2, name: 'Draft proposal', start: day(-2), end: day(2), progress: 70 },
  {
    id: 3,
    name: 'Review cycle',
    start: day(3),
    end: day(6),
    progress: 0,
    dependencies: [2]
  },
  {
    id: 4,
    name: 'Final delivery',
    type: 'milestone',
    start: day(8),
    end: day(8),
    dependencies: [3]
  }
]

const meta: Meta<typeof Gantt> = {
  component: Gantt,
  title: 'Display/Gantt',
  parameters: {
    docs: {
      description: {
        component:
          'An interactive Gantt chart for planning and tracking work over time. Supports projects, tasks, and milestones, dependency arrows, drag to move and resize (bars follow the pointer, then snap to whole days on release), progress dragging, collapsible groups, a resizable task list, and a continuous zoom — pinch the trackpad (or ctrl/cmd + scroll) to move smoothly between day, week, month, quarter, and year scales. All state and logic live in the framework-free `GanttEngine`; the component is a rendering layer over it.'
      }
    }
  },
  argTypes: args({
    tasks: {
      description:
        'Tasks to render. Projects group children via parentId, milestones render as diamonds.',
      control: false
    },
    size: {
      description: 'Row density',
      control: 'select',
      options: STORY_SIZES
    },
    zoom: {
      description:
        'Zoom in pixels per day (controlled). The visible unit is derived from it.',
      control: { type: 'number', min: 0.3, max: 120, step: 0.1 }
    },
    defaultZoom: {
      description: 'Initial zoom in pixels per day (uncontrolled)',
      control: { type: 'number', min: 0.3, max: 120, step: 0.1 }
    },
    readOnly: {
      description: 'Disable all editing interactions',
      control: 'boolean'
    },
    showToolbar: {
      description: 'Show the unit-preset / Today toolbar. Off by default.',
      control: 'boolean'
    },
    showTaskList: { control: 'boolean' },
    showDependencies: { control: 'boolean' },
    showToday: { control: 'boolean' },
    showWeekends: { control: 'boolean' },
    showProgress: { control: 'boolean' },
    taskListWidth: {
      description: 'Initial task list width. Drag its edge to resize.',
      control: { type: 'number', min: 150, max: 520, step: 10 }
    },
    maxHeight: {
      description: 'Scroll vertically past this height',
      control: { type: 'number', min: 200, max: 800, step: 20 }
    },
    onTaskChange: { control: false },
    onTaskClick: { control: false },
    onTaskDoubleClick: { control: false },
    renderTooltip: { control: false },
    emptyState: { control: false }
  })
}

export default meta
type Story = StoryObj<typeof Gantt>

/** Wires tasks into state so drags persist like they would in a real app. */
function StatefulGantt(props: React.ComponentProps<typeof Gantt>) {
  const [tasks, setTasks] = useState(props.tasks)
  return (
    <Gantt
      {...props}
      tasks={tasks}
      onTaskChange={(changed) => {
        setTasks((prev) =>
          prev.map((task) => (task.id === changed.id ? changed : task))
        )
        props.onTaskChange?.(changed)
      }}
    />
  )
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A full project plan: grouped phases, dependencies, milestones, and progress. Drag bars to move them, drag their edges to resize, and drag the small dot under a bar to set progress.'
      }
    }
  },
  render: (storyArgs) => <StatefulGantt {...storyArgs} />,
  args: {
    tasks: projectTasks,
    showToolbar: true
  }
}

export const Simple: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A minimal flat task list with a single dependency chain.'
      }
    }
  },
  render: (storyArgs) => <StatefulGantt {...storyArgs} />,
  args: {
    tasks: simpleTasks
  }
}

export const ZoomedOut: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A zoomed-out starting point (month scale). Pinch the trackpad or use ctrl/cmd + scroll over the timeline to zoom continuously; the grid and header adapt as you cross day/week/month/quarter/year thresholds, while drags always stay day-precise. The toolbar buttons jump to preset zoom levels.'
      }
    }
  },
  render: (storyArgs) => <StatefulGantt {...storyArgs} />,
  args: {
    tasks: projectTasks,
    defaultZoom: 4.4,
    showToolbar: true
  }
}

export const ReadOnly: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Read-only mode disables moving, resizing, and progress dragging while keeping selection, tooltips, and collapsing.'
      }
    }
  },
  args: {
    tasks: projectTasks,
    readOnly: true
  }
}

export const WithoutTaskList: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Timeline-only layout with the task list hidden. Bars keep their inline labels.'
      }
    }
  },
  render: (storyArgs) => <StatefulGantt {...storyArgs} />,
  args: {
    tasks: simpleTasks,
    showTaskList: false
  }
}

export const Minimal: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'All chrome stripped back: no toolbar, dependencies, today line, weekend shading, or progress.'
      }
    }
  },
  args: {
    tasks: simpleTasks,
    readOnly: true,
    showToolbar: false,
    showDependencies: false,
    showToday: false,
    showWeekends: false,
    showProgress: false
  }
}

export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Row density adapts through the standard sm, md, and lg sizes.'
      }
    }
  },
  render: () => (
    <div className="space-y-6">
      {STORY_SIZES.map((size) => (
        <div key={size}>
          <h3 className="mb-2 text-lg font-semibold capitalize">{size}</h3>
          <Gantt tasks={simpleTasks} size={size} showToolbar={false} readOnly />
        </div>
      ))}
    </div>
  )
}

export const ColorVariants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Each task can use any Slate variant. Bars use the light tint for the track and the solid color for progress.'
      }
    }
  },
  args: {
    tasks: (
      [
        'primary',
        'secondary',
        'default',
        'subtle',
        'success',
        'warning',
        'error',
        'info'
      ] as const
    ).map((variant, index) => ({
      id: variant,
      name: variant.charAt(0).toUpperCase() + variant.slice(1),
      start: day(index - 4),
      end: day(index + 2),
      progress: 55,
      variant
    })),
    showToolbar: false,
    readOnly: true
  }
}

export const ControlledSelection: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Selection can be controlled. Click a bar or row to select it; click empty timeline space to clear.'
      }
    }
  },
  render: () => {
    const [selected, setSelected] = useState<string | number | null>(2)
    return (
      <div className="space-y-2">
        <p className="text-sm text-muted">
          Selected: {selected === null ? 'none' : String(selected)}
        </p>
        <Gantt
          tasks={simpleTasks}
          selectedId={selected}
          onSelectedChange={setSelected}
          readOnly
        />
      </div>
    )
  }
}

export const ScrollingManyTasks: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'With maxHeight set, the chart scrolls vertically while the header and task list stay pinned.'
      }
    }
  },
  render: (storyArgs) => <StatefulGantt {...storyArgs} />,
  args: {
    tasks: Array.from({ length: 30 }, (_, index) => ({
      id: index,
      name: `Task ${index + 1}`,
      start: day((index % 10) * 2 - 8),
      end: day((index % 10) * 2 - 4 + (index % 4)),
      progress: (index * 17) % 100,
      variant: (['primary', 'info', 'success', 'warning'] as const)[index % 4],
      dependencies: index % 5 === 4 ? [index - 1] : undefined
    })),
    maxHeight: 400
  }
}

export const CustomTooltip: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tooltips can be fully replaced via renderTooltip.'
      }
    }
  },
  args: {
    tasks: simpleTasks,
    readOnly: true,
    renderTooltip: (task) => (
      <div className="flex items-center gap-2">
        <span className="font-semibold">{task.name}</span>
        <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">
          {task.progress ?? 0}%
        </span>
      </div>
    )
  }
}

export const EmptyData: Story = {
  parameters: {
    docs: {
      description: {
        story: 'With no tasks, the chart renders an empty state.'
      }
    }
  },
  args: {
    tasks: [],
    emptyState: {
      title: 'No tasks scheduled yet',
      button: { children: 'Add task', variant: 'primary' }
    }
  }
}

/**
 * A miniature app around the Gantt: fully controlled tasks, add/delete/reset,
 * and a live readout of everything the component reports back.
 */
function Playground() {
  const [tasks, setTasks] = useState<GanttTask[]>(projectTasks)
  const [selected, setSelected] = useState<SlateId | null>(null)
  const [zoom, setZoom] = useState(44)
  const [unit, setUnit] = useState<GanttUnit>('day')
  const [events, setEvents] = useState<string[]>([])
  const [nextId, setNextId] = useState(1)

  function logEvent(message: string) {
    setEvents((prev) => [message, ...prev].slice(0, 5))
  }

  function formatRange(task: GanttTask): string {
    const fmt = (date: Date) =>
      date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    return `${fmt(task.start)} – ${fmt(task.end)}`
  }

  function handleTaskChange(changed: GanttTask) {
    setTasks((prev) =>
      prev.map((task) => (task.id === changed.id ? changed : task))
    )
    logEvent(
      `"${changed.name}" → ${formatRange(changed)} · ${changed.progress ?? 0}%`
    )
  }

  function addTask() {
    // If a project is selected, nest the new task under it.
    const selectedTask = tasks.find((task) => task.id === selected)
    const parentId =
      selectedTask?.type === 'project' ? selectedTask.id : selectedTask?.parentId
    const task: GanttTask = {
      id: `new-${nextId}`,
      name: `New task ${nextId}`,
      start: day(0),
      end: day(3),
      progress: 0,
      variant: 'secondary',
      parentId
    }
    setNextId((n) => n + 1)
    setTasks((prev) => [...prev, task])
    setSelected(task.id)
    logEvent(`Added "${task.name}"`)
  }

  function deleteSelected() {
    const task = tasks.find((t) => t.id === selected)
    if (!task) return
    // Remove the task, any children, and references to it in dependencies.
    setTasks((prev) =>
      prev
        .filter((t) => t.id !== task.id && t.parentId !== task.id)
        .map((t) => ({
          ...t,
          dependencies: t.dependencies?.filter((id) => id !== task.id)
        }))
    )
    setSelected(null)
    logEvent(`Deleted "${task.name}"`)
  }

  const selectedTask = tasks.find((task) => task.id === selected)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant="primary" iconLeft={Plus} onClick={addTask}>
          Add task
        </Button>
        <Button
          size="sm"
          variant="error"
          iconLeft={Trash}
          disabled={!selectedTask}
          onClick={deleteSelected}
        >
          Delete selected
        </Button>
        <Button
          size="sm"
          iconLeft={RotateCcw}
          onClick={() => {
            setTasks(projectTasks)
            setSelected(null)
            setEvents([])
            logEvent('Reset to the original plan')
          }}
        >
          Reset
        </Button>
        <span className="ml-auto text-sm text-muted">
          {zoom.toFixed(1)} px/day · {unit} grid ·{' '}
          {selectedTask ? `selected: ${selectedTask.name}` : 'nothing selected'}
        </span>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <Gantt
          tasks={tasks}
          selectedId={selected}
          onSelectedChange={setSelected}
          onTaskChange={handleTaskChange}
          onZoomChange={setZoom}
          onUnitChange={setUnit}
          maxHeight={420}
        />
      </div>

      <div className="text-sm">
        <p className="font-medium">Recent changes</p>
        {events.length === 0 ? (
          <p className="text-muted">
            Drag a bar, resize its edges, drag the progress dot, or pinch to
            zoom — changes show up here.
          </p>
        ) : (
          <ul className="text-muted">
            {events.map((event, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={index}>{event}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export const InteractivePlayground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A full working example: controlled tasks, selection, and zoom, with add/delete/reset actions and a live log of every change the chart emits. Use it to feel out dragging, resizing, progress dragging, pinch zoom, and collapsing.'
      }
    }
  },
  render: () => <Playground />
}
