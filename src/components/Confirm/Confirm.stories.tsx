import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import { args } from '../../utilities/stories';
import { Button } from '../Button';
import { Confirm } from './';

const meta: Meta<typeof Confirm> = {
  component: Confirm,
  title: 'Inputs/Confirm',
  argTypes: args({
    title: { control: { type: 'text' } },
    description: { control: { type: 'text' } },
    children: { control: { disable: true } },
    confirmText: { control: { type: 'text' } },
    cancelText: { control: { type: 'text' } }
  }),
  args: {
    children: <Button>Open Confirm</Button>
  }
}

export default meta
type Story = StoryObj<typeof Confirm>

export const Primary: Story = {
  args: {
    title: 'Are you sure?',
    description: 'This action cannot be undone.',
    onConfirm: async () => {
      // sleep for 1 second
      return await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }
}
