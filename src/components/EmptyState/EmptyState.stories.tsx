import {
  Construction,
  Plus,
} from 'lucide-react';

import type {
  Meta,
  StoryObj,
} from '@storybook/react';

import { args } from '../../utilities/stories';
import { EmptyState } from './';

const meta: Meta<typeof EmptyState> = {
  component: EmptyState,
  title: 'Display/EmptyState',
  argTypes: args({})
}

export default meta
type Story = StoryObj<typeof EmptyState>

export const Primary: Story = {
  args: {
    icon: Construction,
    title: 'There are no items to display',
    button: {
      children: 'Create Item',
      variant: 'primary',
      iconLeft: Plus
    }
  }
}
