import type {
  Meta,
  StoryObj
} from '@storybook/react-vite'

import {
  args,
  STORY_SIZES
} from '../../utilities'
import { Progress } from './'

const meta: Meta<typeof Progress> = {
  component: Progress,
  title: 'Display/Progress',
  argTypes: args({
    gap: {
      control: {
        type: 'select'
      },
      options: STORY_SIZES
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
