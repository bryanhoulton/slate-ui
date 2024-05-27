import { Eye } from 'lucide-react'

import type { Meta, StoryObj } from '@storybook/react'

import { args } from '../../utilities/stories'
import { ActionIcon } from '../ActionIcon'
import { Tooltip, TooltipProvider } from './'

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  title: 'Display/Tooltip',
  argTypes: args({
    content: {
      control: 'text'
    }
  }),
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    )
  ]
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Primary: Story = {
  args: {
    children: <ActionIcon icon={Eye} />,
    content: 'Tooltip content'
  }
}
