import type {
  Meta,
  StoryObj
} from '@storybook/react'

import { args } from '../../utilities/stories'
import { TextArea } from './'

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  title: 'Inputs/TextArea',
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
type Story = StoryObj<typeof TextArea>

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    label: 'First Name',
    placeholder: 'Steve Jobs'
  }
}
