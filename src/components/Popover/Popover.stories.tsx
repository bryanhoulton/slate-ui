import { MousePointerClick } from 'lucide-react'

import type {
  Meta,
  StoryObj
} from '@storybook/react'

import { ActionIcon } from '../ActionIcon'
import { SlateProvider } from '../SlateProvider'
import { Popover } from './'

const meta: Meta<typeof Popover> = {
  component: Popover,
  title: 'Display/Popover',
  decorators: [
    (Story) => (
      <SlateProvider>
        <Story />
      </SlateProvider>
    )
  ]
}

export default meta
type Story = StoryObj<typeof Popover>

export const Primary: Story = {
  args: {
    children: <ActionIcon icon={MousePointerClick} />,
    content: 'Hello, world!',
    side: 'top',
    className: 'p-2'
  }
}
