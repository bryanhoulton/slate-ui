import { Eye } from 'lucide-react'

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
      {STORY_VARIANTS.map((variant: SlateVariant) => (
        <Icon key={variant} icon={Eye} variant={variant} />
      ))}
    </div>
  )
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      {STORY_SIZES.map((size: SlateSize) => (
        <Icon key={size} icon={Eye} size={size} />
      ))}
    </div>
  )
}

export const AllSizesAndVariants: Story = {
  render: () => (
    <div className="space-y-6">
      {STORY_VARIANTS.map((variant: SlateVariant) => (
        <div key={variant}>
          <h3 className="mb-3 text-lg font-semibold capitalize">{variant}</h3>
          <div className="flex flex-wrap items-center gap-4">
            {STORY_SIZES.map((size: SlateSize) => (
              <Icon key={size} icon={Eye} variant={variant} size={size} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
