import {
  AlertTriangle,
  Bookmark,
  Copy,
  Download,
  Edit,
  Eye,
  EyeOff,
  Filter,
  Heart,
  Maximize,
  Minimize,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Share,
  Star,
  Trash2,
  Upload,
  Volume2,
  VolumeX,
  X
} from 'lucide-react'

import { TooltipProvider } from '@radix-ui/react-tooltip'
import type {
  Meta,
  StoryObj
} from '@storybook/react-vite'

import { args } from '../../utilities/stories'
import { ActionIcon } from './'

const meta: Meta<typeof ActionIcon> = {
  component: ActionIcon,
  title: 'Inputs/ActionIcon',
  argTypes: args({
    variant: {
      control: {
        type: 'select'
      },
      options: ['primary', 'secondary', 'subtle', 'error', 'info', 'success']
    },
    size: {
      control: {
        type: 'select'
      },
      options: ['sm', 'md', 'lg']
    },
    tooltip: {
      control: 'text'
    },
    icon: {
      table: {
        disable: true
      }
    },
    disabled: {
      control: 'boolean'
    }
  }),
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    )
  ]
}

export default meta
type Story = StoryObj<typeof ActionIcon>

export const Default: Story = {
  args: {
    icon: Plus,
    tooltip: 'Add new item'
  }
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ActionIcon variant="primary" icon={Plus} tooltip="Primary" />
      <ActionIcon variant="secondary" icon={Edit} tooltip="Secondary" />
      <ActionIcon variant="subtle" icon={Settings} tooltip="Subtle" />
      <ActionIcon variant="error" icon={Trash2} tooltip="Error" />
    </div>
  )
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <ActionIcon size="sm" icon={Plus} tooltip="Small" />
      <ActionIcon size="md" icon={Plus} tooltip="Medium" />
      <ActionIcon size="lg" icon={Plus} tooltip="Large" />
    </div>
  )
}

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <ActionIcon icon={Plus} tooltip="Normal" />
        <ActionIcon icon={Plus} tooltip="Disabled" disabled />
      </div>
      <div className="flex flex-wrap gap-4">
        <ActionIcon variant="secondary" icon={Edit} tooltip="Normal" />
        <ActionIcon
          variant="secondary"
          icon={Edit}
          tooltip="Disabled"
          disabled
        />
      </div>
      <div className="flex flex-wrap gap-4">
        <ActionIcon variant="error" icon={Trash2} tooltip="Normal" />
        <ActionIcon variant="error" icon={Trash2} tooltip="Disabled" disabled />
      </div>
    </div>
  )
}

export const CommonActions: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-lg font-semibold">Primary Actions</h3>
        <div className="flex flex-wrap gap-4">
          <ActionIcon icon={Plus} tooltip="Add" />
          <ActionIcon icon={Edit} tooltip="Edit" />
          <ActionIcon icon={Settings} tooltip="Settings" />
          <ActionIcon icon={Search} tooltip="Search" />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">File Actions</h3>
        <div className="flex flex-wrap gap-4">
          <ActionIcon variant="secondary" icon={Download} tooltip="Download" />
          <ActionIcon variant="secondary" icon={Upload} tooltip="Upload" />
          <ActionIcon variant="secondary" icon={Copy} tooltip="Copy" />
          <ActionIcon variant="secondary" icon={Share} tooltip="Share" />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Destructive Actions</h3>
        <div className="flex flex-wrap gap-4">
          <ActionIcon variant="error" icon={Trash2} tooltip="Delete" />
          <ActionIcon variant="error" icon={X} tooltip="Remove" />
          <ActionIcon variant="error" icon={AlertTriangle} tooltip="Warning" />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Subtle Actions</h3>
        <div className="flex flex-wrap gap-4">
          <ActionIcon
            variant="subtle"
            icon={MoreHorizontal}
            tooltip="More options"
          />
          <ActionIcon variant="subtle" icon={Filter} tooltip="Filter" />
          <ActionIcon variant="subtle" icon={RefreshCw} tooltip="Refresh" />
        </div>
      </div>
    </div>
  )
}

export const InteractionIcons: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-lg font-semibold">Social Actions</h3>
        <div className="flex flex-wrap gap-4">
          <ActionIcon variant="subtle" icon={Heart} tooltip="Like" />
          <ActionIcon variant="subtle" icon={Star} tooltip="Favorite" />
          <ActionIcon variant="subtle" icon={Bookmark} tooltip="Bookmark" />
          <ActionIcon variant="subtle" icon={Share} tooltip="Share" />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Visibility Toggle</h3>
        <div className="flex flex-wrap gap-4">
          <ActionIcon variant="secondary" icon={Eye} tooltip="Show" />
          <ActionIcon variant="secondary" icon={EyeOff} tooltip="Hide" />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Media Controls</h3>
        <div className="flex flex-wrap gap-4">
          <ActionIcon icon={Play} tooltip="Play" />
          <ActionIcon icon={Pause} tooltip="Pause" />
          <ActionIcon variant="secondary" icon={Volume2} tooltip="Volume On" />
          <ActionIcon variant="secondary" icon={VolumeX} tooltip="Volume Off" />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Window Controls</h3>
        <div className="flex flex-wrap gap-4">
          <ActionIcon variant="subtle" icon={Maximize} tooltip="Maximize" />
          <ActionIcon variant="subtle" icon={Minimize} tooltip="Minimize" />
          <ActionIcon variant="subtle" icon={X} tooltip="Close" />
        </div>
      </div>
    </div>
  )
}

export const AllSizesAndVariants: Story = {
  render: () => (
    <div className="space-y-6">
      {(['primary', 'secondary', 'subtle', 'error'] as const).map((variant) => (
        <div key={variant}>
          <h3 className="mb-3 text-lg font-semibold capitalize">{variant}</h3>
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-4">
              <ActionIcon
                variant={variant}
                size="sm"
                icon={Plus}
                tooltip="Small"
              />
              <ActionIcon
                variant={variant}
                size="md"
                icon={Plus}
                tooltip="Medium"
              />
              <ActionIcon
                variant={variant}
                size="lg"
                icon={Plus}
                tooltip="Large"
              />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <ActionIcon
                variant={variant}
                size="sm"
                icon={Edit}
                tooltip="Small Edit"
              />
              <ActionIcon
                variant={variant}
                size="md"
                icon={Settings}
                tooltip="Medium Settings"
              />
              <ActionIcon
                variant={variant}
                size="lg"
                icon={Search}
                tooltip="Large Search"
              />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <ActionIcon
                variant={variant}
                size="sm"
                icon={Plus}
                tooltip="Small Disabled"
                disabled
              />
              <ActionIcon
                variant={variant}
                size="md"
                icon={Edit}
                tooltip="Medium Disabled"
                disabled
              />
              <ActionIcon
                variant={variant}
                size="lg"
                icon={Settings}
                tooltip="Large Disabled"
                disabled
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export const ToolbarExample: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-lg font-semibold">Text Editor Toolbar</h3>
        <div className="flex gap-1 p-2 bg-gray-50 rounded-lg border">
          <ActionIcon variant="subtle" size="sm" icon={Plus} tooltip="Add" />
          <ActionIcon variant="subtle" size="sm" icon={Edit} tooltip="Edit" />
          <ActionIcon variant="subtle" size="sm" icon={Copy} tooltip="Copy" />
          <div className="w-px bg-gray-300 mx-1" />
          <ActionIcon
            variant="subtle"
            size="sm"
            icon={Upload}
            tooltip="Upload"
          />
          <ActionIcon
            variant="subtle"
            size="sm"
            icon={Download}
            tooltip="Download"
          />
          <div className="w-px bg-gray-300 mx-1" />
          <ActionIcon
            variant="error"
            size="sm"
            icon={Trash2}
            tooltip="Delete"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Media Player Controls</h3>
        <div className="flex gap-2 p-3 bg-black rounded-lg items-center justify-center">
          <ActionIcon
            variant="secondary"
            size="sm"
            icon={RefreshCw}
            tooltip="Previous"
          />
          <ActionIcon size="lg" icon={Play} tooltip="Play" />
          <ActionIcon
            variant="secondary"
            size="sm"
            icon={RefreshCw}
            tooltip="Next"
          />
          <div className="w-px bg-gray-600 mx-2" />
          <ActionIcon
            variant="subtle"
            size="sm"
            icon={Volume2}
            tooltip="Volume"
          />
          <ActionIcon
            variant="subtle"
            size="sm"
            icon={Maximize}
            tooltip="Fullscreen"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Card Actions</h3>
        <div className="p-4 border rounded-lg bg-white">
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-medium">Card Title</h4>
            <div className="flex gap-1">
              <ActionIcon
                variant="subtle"
                size="sm"
                icon={Heart}
                tooltip="Like"
              />
              <ActionIcon
                variant="subtle"
                size="sm"
                icon={Bookmark}
                tooltip="Bookmark"
              />
              <ActionIcon
                variant="subtle"
                size="sm"
                icon={MoreHorizontal}
                tooltip="More"
              />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-3">
            Card content goes here...
          </p>
          <div className="flex justify-end gap-2">
            <ActionIcon
              variant="secondary"
              size="sm"
              icon={Edit}
              tooltip="Edit"
            />
            <ActionIcon
              variant="error"
              size="sm"
              icon={Trash2}
              tooltip="Delete"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
