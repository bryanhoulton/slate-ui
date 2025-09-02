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

import {
  args,
  SlateSize,
  SlateVariant,
  STORY_SIZES,
  STORY_VARIANTS
} from '../../utilities'
import { ActionIcon } from './'

const meta: Meta<typeof ActionIcon> = {
  component: ActionIcon,
  title: 'Inputs/ActionIcon',
  argTypes: args({
    variant: {
      control: {
        type: 'select'
      },
      options: STORY_VARIANTS
    },
    size: {
      control: {
        type: 'select'
      },
      options: STORY_SIZES
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
      {STORY_VARIANTS.map((variant: SlateVariant) => (
        <ActionIcon
          key={variant}
          variant={variant}
          icon={Plus}
          tooltip={variant.charAt(0).toUpperCase() + variant.slice(1)}
        />
      ))}
    </div>
  )
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {STORY_SIZES.map((size: SlateSize) => (
        <ActionIcon
          key={size}
          size={size}
          icon={Plus}
          tooltip={size.charAt(0).toUpperCase() + size.slice(1)}
        />
      ))}
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
        <h3 className="mb-3 text-lg font-semibold">Default Actions</h3>
        <div className="flex flex-wrap gap-4">
          <ActionIcon
            variant="default"
            icon={MoreHorizontal}
            tooltip="More options"
          />
          <ActionIcon variant="default" icon={Filter} tooltip="Filter" />
          <ActionIcon variant="default" icon={RefreshCw} tooltip="Refresh" />
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
          <ActionIcon variant="default" icon={Heart} tooltip="Like" />
          <ActionIcon variant="default" icon={Star} tooltip="Favorite" />
          <ActionIcon variant="default" icon={Bookmark} tooltip="Bookmark" />
          <ActionIcon variant="default" icon={Share} tooltip="Share" />
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
          <ActionIcon variant="default" icon={Maximize} tooltip="Maximize" />
          <ActionIcon variant="default" icon={Minimize} tooltip="Minimize" />
          <ActionIcon variant="default" icon={X} tooltip="Close" />
        </div>
      </div>
    </div>
  )
}

export const AllSizesAndVariants: Story = {
  render: () => (
    <div className="space-y-6">
      {STORY_VARIANTS.map((variant: SlateVariant) => (
        <div key={variant}>
          <h3 className="mb-3 text-lg font-semibold capitalize">{variant}</h3>
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-4">
              {STORY_SIZES.map((size: SlateSize) => (
                <ActionIcon
                  key={`${variant}-${size}`}
                  variant={variant}
                  size={size}
                  icon={Plus}
                  tooltip={size.charAt(0).toUpperCase() + size.slice(1)}
                />
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              {STORY_SIZES.map((size: SlateSize, index) => {
                const icons = [Edit, Settings, Search]
                return (
                  <ActionIcon
                    key={`${variant}-${size}-icon`}
                    variant={variant}
                    size={size}
                    icon={icons[index] || Edit}
                    tooltip={`${size.charAt(0).toUpperCase() + size.slice(1)} Icon`}
                  />
                )
              })}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              {STORY_SIZES.map((size: SlateSize, index) => {
                const icons = [Plus, Edit, Settings]
                return (
                  <ActionIcon
                    key={`${variant}-${size}-disabled`}
                    variant={variant}
                    size={size}
                    icon={icons[index] || Plus}
                    tooltip={`${size.charAt(0).toUpperCase() + size.slice(1)} Disabled`}
                    disabled
                  />
                )
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
