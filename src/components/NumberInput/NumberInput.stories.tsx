import {
  Eye,
  User
} from 'lucide-react'

import type {
  Meta,
  StoryObj
} from '@storybook/react-vite'

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
      options: [
        'primary',
        'secondary',
        'subtle',
        'success',
        'warning',
        'error',
        'info'
      ]
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
      <NumberInput
        variant="primary"
        label="Primary"
        placeholder="Enter number"
      />
      <NumberInput
        variant="secondary"
        label="Secondary"
        placeholder="Enter number"
      />
      <NumberInput variant="subtle" label="Subtle" placeholder="Enter number" />
      <NumberInput
        variant="success"
        label="Success"
        placeholder="Enter number"
      />
      <NumberInput
        variant="warning"
        label="Warning"
        placeholder="Enter number"
      />
      <NumberInput variant="error" label="Error" placeholder="Enter number" />
      <NumberInput variant="info" label="Info" placeholder="Enter number" />
    </div>
  )
}
