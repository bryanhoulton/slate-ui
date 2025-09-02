import {
  AlertCircle,
  Bell,
  Check,
  CheckCircle,
  Clock,
  Heart,
  Plus,
  Star,
  Trophy,
  User,
  X,
  Zap
} from 'lucide-react'

import type {
  Meta,
  StoryObj
} from '@storybook/react-vite'

import { args } from '../../utilities/stories'
import { Badge } from './'

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: 'Display/Badge',
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
    }
  })
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Badge'
  }
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="subtle">Subtle</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="success">Success</Badge>
    </div>
  )
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  )
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge iconLeft={Check}>Completed</Badge>
      <Badge iconRight={Star}>Featured</Badge>
      <Badge iconLeft={AlertCircle} iconRight={X} variant="secondary">
        Warning
      </Badge>
    </div>
  )
}

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="primary" iconLeft={CheckCircle}>
        Active
      </Badge>
      <Badge variant="secondary" iconLeft={Clock}>
        Pending
      </Badge>
      <Badge variant="subtle" iconLeft={X}>
        Inactive
      </Badge>
      <Badge variant="error" iconLeft={AlertCircle}>
        Error
      </Badge>
      <Badge variant="primary" iconLeft={Zap}>
        Premium
      </Badge>
    </div>
  )
}

export const NotificationBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="primary" size="sm">
        12
      </Badge>
      <Badge variant="secondary" iconLeft={Bell} size="sm">
        3 new
      </Badge>
      <Badge variant="primary" iconLeft={Heart} size="sm">
        99+
      </Badge>
      <Badge variant="subtle" size="sm">
        Updated
      </Badge>
    </div>
  )
}

export const CategoryBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="primary" iconLeft={Trophy}>
        Achievement
      </Badge>
      <Badge variant="secondary" iconLeft={User}>
        Team
      </Badge>
      <Badge variant="subtle" iconLeft={Star}>
        Featured
      </Badge>
      <Badge variant="primary" iconLeft={Plus}>
        New Feature
      </Badge>
    </div>
  )
}

export const AllSizesAndVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-lg font-semibold">Primary</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Badge variant="primary" size="sm">
            Small
          </Badge>
          <Badge variant="primary" size="md">
            Medium
          </Badge>
          <Badge variant="primary" size="lg">
            Large
          </Badge>
          <Badge variant="primary" size="sm" iconLeft={Star}>
            With Icon
          </Badge>
          <Badge variant="primary" size="md" iconLeft={Check}>
            With Icon
          </Badge>
          <Badge variant="primary" size="lg" iconLeft={Trophy}>
            With Icon
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Secondary</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Badge variant="secondary" size="sm">
            Small
          </Badge>
          <Badge variant="secondary" size="md">
            Medium
          </Badge>
          <Badge variant="secondary" size="lg">
            Large
          </Badge>
          <Badge variant="secondary" size="sm" iconLeft={Bell}>
            With Icon
          </Badge>
          <Badge variant="secondary" size="md" iconLeft={Clock}>
            With Icon
          </Badge>
          <Badge variant="secondary" size="lg" iconLeft={User}>
            With Icon
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Subtle</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Badge variant="subtle" size="sm">
            Small
          </Badge>
          <Badge variant="subtle" size="md">
            Medium
          </Badge>
          <Badge variant="subtle" size="lg">
            Large
          </Badge>
          <Badge variant="subtle" size="sm" iconLeft={Heart}>
            With Icon
          </Badge>
          <Badge variant="subtle" size="md" iconLeft={AlertCircle}>
            With Icon
          </Badge>
          <Badge variant="subtle" size="lg" iconLeft={Zap}>
            With Icon
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Error</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Badge variant="error" size="sm">
            Small
          </Badge>
          <Badge variant="error" size="md">
            Medium
          </Badge>
          <Badge variant="error" size="lg">
            Large
          </Badge>
          <Badge variant="error" size="sm" iconLeft={X}>
            With Icon
          </Badge>
          <Badge variant="error" size="md" iconLeft={AlertCircle}>
            With Icon
          </Badge>
          <Badge variant="error" size="lg" iconLeft={AlertCircle}>
            With Icon
          </Badge>
        </div>
      </div>
    </div>
  )
}
