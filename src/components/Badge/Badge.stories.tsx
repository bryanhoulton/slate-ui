import {
  AlertCircle,
  AlertTriangle,
  Bell,
  Check,
  CheckCircle,
  Circle,
  Clock,
  Dot,
  Heart,
  Minus,
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

import {
  args,
  SlateSize,
  SlateVariant,
  STORY_SIZES,
  STORY_VARIANTS
} from '../../utilities'
import { Badge } from './'

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: 'Display/Badge',
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
      {STORY_VARIANTS.map((variant: SlateVariant) => (
        <Badge key={variant} variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Badge>
      ))}
    </div>
  )
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {STORY_SIZES.map((size: SlateSize) => (
        <Badge key={size} size={size}>
          {size.charAt(0).toUpperCase() + size.slice(1)}
        </Badge>
      ))}
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
      <Badge variant="default" iconLeft={X}>
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
      <Badge variant="default" size="sm">
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
      <Badge variant="default" iconLeft={Star}>
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
      {STORY_VARIANTS.map((variant: SlateVariant) => {
        const iconMap = {
          primary: [Star, Check, Trophy],
          secondary: [Bell, Clock, User],
          default: [Heart, AlertCircle, Zap],
          subtle: [Circle, Dot, Minus],
          success: [Check, Check, Check],
          warning: [AlertTriangle, AlertTriangle, AlertTriangle],
          error: [X, AlertCircle, AlertCircle],
          info: [Bell, Bell, Bell]
        }
        const icons = iconMap[variant] || [Star, Check, Trophy]

        return (
          <div key={variant}>
            <h3 className="mb-3 text-lg font-semibold capitalize">{variant}</h3>
            <div className="flex flex-wrap items-center gap-4">
              {STORY_SIZES.map((size: SlateSize) => (
                <Badge key={`${variant}-${size}`} variant={variant} size={size}>
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </Badge>
              ))}
              {STORY_SIZES.map((size: SlateSize, index) => (
                <Badge
                  key={`${variant}-${size}-icon`}
                  variant={variant}
                  size={size}
                  iconLeft={icons[index] || icons[0]}
                >
                  With Icon
                </Badge>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
