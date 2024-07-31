import {
  BookAudio,
  HandPlatter,
  User,
} from 'lucide-react';

import type {
  Meta,
  StoryObj,
} from '@storybook/react';

import { args } from '../../utilities/stories';
import { Select } from './';

const meta: Meta<typeof Select> = {
  component: Select,
  title: 'Inputs/Select',
  argTypes: args({
    searchable: { control: 'boolean' },
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
    onChange: { table: { disable: true } },
    onSearchChange: { table: { disable: true } },
    ref: { table: { disable: true } },
    id: { table: { disable: true } },
    value: { table: { disable: true } },
    search: { table: { disable: true } },
    disabled: { control: 'boolean' }
  }),
  args: {
    searchable: true,
    variant: 'primary',
    size: 'md'
  }
}

export default meta
type Story = StoryObj<typeof Select>

export const Primary: Story = {
  args: {
    items: [
      { id: 1, name: 'Item 1', icon: User },
      { id: 2, name: 'Item 2', icon: BookAudio },
      { id: 3, name: 'Item 3', icon: HandPlatter }
    ],
    iconLeft: User
  }
}
