import { CalendarSearch, Home } from 'lucide-react'

import type { Meta, StoryObj } from '@storybook/react'

import { args } from '../../utilities/stories'
import { Tabs } from './'

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: 'Inputs/Tabs',
  argTypes: args({
    tabs: {
      control: {
        type: 'object'
      }
    },
    defaultTab: {
      control: {
        type: 'text'
      }
    },
    value: {
      control: {
        type: 'text'
      }
    }
  }),
  args: {}
}

export default meta
type Story = StoryObj<typeof Tabs>

export const Primary: Story = {
  args: {
    tabs: [
      {
        id: 'tab1',
        name: 'Tab 1',
        content: 'Tab 1 content',
        iconLeft: Home
      },
      {
        id: 'tab2',
        name: 'Tab 2',
        content: 'Tab 2 content',
        iconRight: CalendarSearch
      }
    ],
    defaultTab: 'tab1',
    styles: {
      tabContainer: {
        backgroundColor: 'red'
      }
    }
  }
}
