import { Plus } from 'lucide-react'

import type { Meta, StoryObj } from '@storybook/react'

import { args } from '../../utilities/stories'
import { Button } from './'

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Inputs/Button',
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
    disabled: {
      control: {
        type: 'boolean'
      }
    },
    loading: {
      control: {
        type: 'boolean'
      }
    }
  })
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Click me!'
  }
}

export const WithLeftIcon: Story = {
  args: {
    children: 'New Item',
    iconLeft: Plus
  }
}

export const WithRightIcon: Story = {
  args: {
    children: 'New Item',
    iconRight: Plus
  }
}
