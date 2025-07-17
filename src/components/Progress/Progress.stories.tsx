import type { Meta, StoryObj } from '@storybook/react-vite'

import { args } from '../../utilities/stories'
import { Progress } from './'

const meta: Meta<typeof Progress> = {
  component: Progress,
  title: 'Display/Progress',
  argTypes: args({
    gap: {
      control: {
        type: 'select'
      },
      options: ['sm', 'md', 'lg']
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
type Story = StoryObj<typeof Progress>

export const Primary: Story = {
  args: {
    size: 'md',
    gap: 'md',
    value: 50,
    min: 0,
    max: 100,
    sections: 1
  }
}
