import { Eye } from 'lucide-react'

import type {
  Meta,
  StoryObj
} from '@storybook/react-vite'

import { args } from '../../utilities/stories'
import { Icon } from './'

const meta: Meta<typeof Icon> = {
  component: Icon,
  title: 'Display/Icon',
  argTypes: args({
    icon: {
      table: {
        disable: true
      }
    },
    variant: {
      control: {
        type: 'select'
      },
      options: [
        'primary',
        'secondary',
        'subtle',
        'success',
        'warning',
        'error',
        'info'
      ]
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
type Story = StoryObj<typeof Icon>

export const Primary: Story = {
  args: {
    icon: Eye,
    variant: 'primary',
    size: 'md'
  }
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Icon icon={Eye} variant="primary" />
      <Icon icon={Eye} variant="secondary" />
      <Icon icon={Eye} variant="subtle" />
      <Icon icon={Eye} variant="success" />
      <Icon icon={Eye} variant="warning" />
      <Icon icon={Eye} variant="error" />
      <Icon icon={Eye} variant="info" />
    </div>
  )
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Icon icon={Eye} size="sm" />
      <Icon icon={Eye} size="md" />
      <Icon icon={Eye} size="lg" />
    </div>
  )
}

export const AllSizesAndVariants: Story = {
  render: () => (
    <div className="space-y-6">
      {(
        [
          'primary',
          'secondary',
          'subtle',
          'success',
          'warning',
          'error',
          'info'
        ] as const
      ).map((variant) => (
        <div key={variant}>
          <h3 className="mb-3 text-lg font-semibold capitalize">{variant}</h3>
          <div className="flex flex-wrap items-center gap-4">
            <Icon icon={Eye} variant={variant} size="sm" />
            <Icon icon={Eye} variant={variant} size="md" />
            <Icon icon={Eye} variant={variant} size="lg" />
          </div>
        </div>
      ))}
    </div>
  )
}
