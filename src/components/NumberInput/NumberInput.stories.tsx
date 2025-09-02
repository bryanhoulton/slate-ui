import {
  Eye,
  User
} from 'lucide-react'

import type {
  Meta,
  StoryObj
} from '@storybook/react-vite'

import {
  args,
  SlateVariant,
  STORY_SIZES,
  STORY_VARIANTS
} from '../../utilities'
import { NumberInput } from './'

const meta: Meta<typeof NumberInput> = {
  component: NumberInput,
  title: 'Inputs/NumberInput',
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
    label: {
      control: {
        type: 'text'
      }
    },
    error: {
      control: {
        type: 'text'
      }
    },
    placeholder: {
      control: {
        type: 'text'
      }
    },
    prefix: {
      control: {
        type: 'text'
      }
    }
  })
}

export default meta
type Story = StoryObj<typeof NumberInput>

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    label: 'How many cows?',
    placeholder: '17'
  }
}

export const WithIcons: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    label: 'How many cows?',
    placeholder: '17',
    iconLeft: User,
    iconRight: Eye
  }
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      {STORY_VARIANTS.map((variant: SlateVariant) => (
        <NumberInput
          key={variant}
          variant={variant}
          label={variant.charAt(0).toUpperCase() + variant.slice(1)}
          placeholder="Enter number"
        />
      ))}
    </div>
  )
}
