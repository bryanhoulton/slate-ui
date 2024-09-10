import { Check } from 'lucide-react';

import type {
  Meta,
  StoryObj,
} from '@storybook/react';

import { args } from '../../utilities/stories';
import { Badge } from './';

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: 'Display/Badge',
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
type Story = StoryObj<typeof Badge>

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Active'
  }
}

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Active',
    iconLeft: Check
  }
}
