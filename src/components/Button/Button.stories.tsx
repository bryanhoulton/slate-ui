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
