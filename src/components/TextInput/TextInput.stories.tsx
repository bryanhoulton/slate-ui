import { Eye, User } from 'lucide-react'

import type { Meta, StoryObj } from '@storybook/react'

import { args } from '../../utilities/stories'
import { TextInput } from './'

const meta: Meta<typeof TextInput> = {
  component: TextInput,
  title: 'Inputs/TextInput',
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
type Story = StoryObj<typeof TextInput>

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    label: 'First Name',
    value: '',
    placeholder: 'Steve Jobs',
    onChange: () => {}
  }
}

export const WithIcons: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    label: 'First Name',
    value: '',
    placeholder: 'Steve Jobs',
    onChange: () => {},
    iconLeft: User,
    iconRight: Eye
  }
}
