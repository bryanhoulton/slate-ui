import type {
  Meta,
  StoryObj
} from '@storybook/react'

import { args } from '../../utilities/stories'
import { ColorPicker } from './'

const meta: Meta<typeof ColorPicker> = {
  component: ColorPicker,
  title: 'Inputs/ColorPicker',
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
      options: ['sm', 'md', 'lg']
    }
  })
}

export default meta
type Story = StoryObj<typeof ColorPicker>

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    className: 'w-96',
    label: 'Color'
  }
}
