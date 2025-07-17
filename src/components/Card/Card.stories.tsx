import type {
  Meta,
  StoryObj
} from '@storybook/react-vite'

import { SlateProvider } from '../SlateProvider'
import { Card } from './'

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'Display/Card',
  decorators: [
    (Story) => (
      <SlateProvider>
        <Story />
      </SlateProvider>
    )
  ]
}

export default meta
type Story = StoryObj<typeof Card>

export const Primary: Story = {
  args: {
    children: 'Click me!',
    preview: <div className="bg-muted-test h-full w-full"></div>,
    menu: {
      items: [
        {
          id: '1',
          label: 'Delete',
          type: 'button'
        }
      ]
    }
  }
}
