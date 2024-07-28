import { Eye, User } from 'lucide-react'

import type { Meta, StoryObj } from '@storybook/react'

import { args } from '../../utilities/stories'
import { NumberInput } from './'

const meta: Meta<typeof NumberInput> = {
  component: NumberInput,
  title: 'Inputs/NumberInput',
  argTypes: args({
    variant: {
      control: {
        type: 'select'
      },
      options: ['primary', 'secondary', 'subtle']
    },
    size: {
      control: {
        type: 'select'
      },
      options: ['xs', 'sm', 'md', 'lg', 'xl']
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
