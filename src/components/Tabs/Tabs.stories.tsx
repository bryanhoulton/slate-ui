import {
  Bell,
  CalendarSearch,
  CreditCard,
  FileText,
  Home,
  Settings,
  Shield,
  User,
} from 'lucide-react';

import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import { args } from '../../utilities/stories';
import { Tabs } from './';

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
    defaultTab: 'tab1'
  }
}

export const WithBadges: Story = {
  args: {
    tabs: [
      {
        id: 'tab1',
        name: 'Inbox',
        content: 'Inbox content',
        iconLeft: Home,
        badge: {
          children: '5',
          variant: 'primary'
        }
      },
      {
        id: 'tab2',
        name: 'Archive',
        content: 'Archive content',
        badge: {
          children: 'New',
          variant: 'secondary'
        }
      }
    ],
    defaultTab: 'tab1'
  }
}

export const WithoutIcons: Story = {
  args: {
    tabs: [
      { id: 'overview', name: 'Overview', content: 'Overview content' },
      { id: 'activity', name: 'Activity', content: 'Activity content' },
      { id: 'settings', name: 'Settings', content: 'Settings content' }
    ],
    defaultTab: 'overview'
  }
}

export const ManyTabs: Story = {
  args: {
    tabs: [
      { id: 'profile', name: 'Profile', content: 'Profile content', iconLeft: User },
      { id: 'account', name: 'Account', content: 'Account content', iconLeft: Settings },
      { id: 'billing', name: 'Billing', content: 'Billing content', iconLeft: CreditCard },
      {
        id: 'notifications',
        name: 'Notifications',
        content: 'Notifications content',
        iconLeft: Bell,
        badge: { children: '12', variant: 'error' }
      },
      { id: 'security', name: 'Security', content: 'Security content', iconLeft: Shield },
      { id: 'documents', name: 'Documents', content: 'Documents content', iconLeft: FileText }
    ],
    defaultTab: 'profile'
  }
}

export const WithoutContentPadding: Story = {
  args: {
    tabs: [
      {
        id: 'padded',
        name: 'Default Padding',
        content: 'This tab content has the default padding.'
      },
      {
        id: 'unpadded',
        name: 'No Padding',
        padding: false,
        content: (
          <div className="bg-muted-light p-2">
            This tab content has padding disabled, so it renders flush against
            the tab list. Useful for tables or full-bleed content.
          </div>
        )
      }
    ],
    defaultTab: 'padded'
  }
}

export const RichContent: Story = {
  args: {
    tabs: [
      {
        id: 'profile',
        name: 'Profile',
        iconLeft: User,
        content: (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Profile</h3>
            <p className="text-sm text-gray-600">
              Manage your public profile information.
            </p>
            <ul className="list-disc pl-5 text-sm">
              <li>Display name</li>
              <li>Avatar</li>
              <li>Bio</li>
            </ul>
          </div>
        )
      },
      {
        id: 'notifications',
        name: 'Notifications',
        iconLeft: Bell,
        badge: { children: '3', variant: 'primary' },
        content: (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <p className="text-sm text-gray-600">
              You have 3 unread notifications.
            </p>
          </div>
        )
      }
    ],
    defaultTab: 'profile'
  }
}

export const CustomStyles: Story = {
  args: {
    tabs: [
      { id: 'tab1', name: 'First', content: 'First tab content' },
      { id: 'tab2', name: 'Second', content: 'Second tab content' }
    ],
    defaultTab: 'tab1',
    styles: {
      tabContainer: { backgroundColor: '#f9fafb' },
      tab: { textTransform: 'uppercase', letterSpacing: '0.05em' },
      contentContainer: { minHeight: 120 }
    }
  }
}
