import {
  AlertCircle,
  BookOpen,
  CheckCircle,
  Code,
  CreditCard,
  HelpCircle,
  Phone,
  Settings,
  Star,
  Zap
} from 'lucide-react'

import type {
  Meta,
  StoryObj
} from '@storybook/react-vite'

import {
  ACCORDION_TYPE_OPTIONS,
  args
} from '../../utilities'
import { Accordion } from './'

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  title: 'Display/Accordion',
  argTypes: args({
    type: {
      control: {
        type: 'select'
      },
      options: ACCORDION_TYPE_OPTIONS
    },
    collapsible: {
      control: {
        type: 'boolean'
      }
    },
    disabled: {
      control: {
        type: 'boolean'
      }
    }
  })
}

export default meta
type Story = StoryObj<typeof Accordion>

const sampleItems = [
  {
    id: '1',
    title: 'Getting Started',
    leftIcon: BookOpen,
    content:
      'Learn the basics of our platform with step-by-step guides and tutorials. This section covers installation, setup, and your first project.'
  },
  {
    id: '2',
    title: 'API Documentation',
    leftIcon: Code,
    content:
      'Comprehensive API reference with endpoints, parameters, and examples. Includes authentication, rate limiting, and best practices.'
  },
  {
    id: '3',
    title: 'Advanced Features',
    leftIcon: Zap,
    content:
      'Explore advanced functionality including webhooks, custom integrations, and enterprise features. Perfect for power users and developers.'
  },
  {
    id: '4',
    title: 'Troubleshooting',
    leftIcon: HelpCircle,
    content:
      "Common issues and their solutions. If you can't find what you're looking for, contact our support team for assistance."
  }
]

const faqItems = [
  {
    id: 'faq1',
    title: 'What is your refund policy?',
    leftIcon: CreditCard,
    content:
      "We offer a 30-day money-back guarantee for all our services. If you're not satisfied, contact us within 30 days of purchase for a full refund."
  },
  {
    id: 'faq2',
    title: 'How do I cancel my subscription?',
    leftIcon: Settings,
    content:
      'You can cancel your subscription at any time from your account settings. Your service will continue until the end of your current billing period.'
  },
  {
    id: 'faq3',
    title: 'Do you offer customer support?',
    leftIcon: Phone,
    content:
      'Yes! We provide 24/7 customer support via email, chat, and phone. Premium customers also get priority support with faster response times.'
  }
]

export const Default: Story = {
  args: {
    items: sampleItems
  }
}

export const Multiple: Story = {
  args: {
    items: sampleItems,
    type: 'multiple'
  }
}

export const WithDefaultValue: Story = {
  args: {
    items: sampleItems,
    defaultValue: '1'
  }
}

export const MultipleWithDefaults: Story = {
  args: {
    items: sampleItems,
    type: 'multiple',
    defaultValue: ['1', '3']
  }
}

export const NonCollapsible: Story = {
  args: {
    items: sampleItems,
    collapsible: false,
    defaultValue: '1'
  }
}

export const FAQ: Story = {
  args: {
    items: faqItems,
    type: 'single'
  }
}

export const Disabled: Story = {
  args: {
    items: sampleItems,
    disabled: true
  }
}

export const WithDisabledItems: Story = {
  args: {
    items: [
      ...sampleItems.slice(0, 2),
      {
        ...sampleItems[2],
        disabled: true
      },
      sampleItems[3]
    ]
  }
}

export const WithoutIcons: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Simple Item 1',
        content: 'This accordion item has no left icon.'
      },
      {
        id: '2',
        title: 'Simple Item 2',
        content: 'This accordion item also has no left icon.'
      },
      {
        id: '3',
        title: 'Mixed with Icon',
        leftIcon: Zap,
        content: 'This item has an icon while others do not.'
      }
    ]
  }
}

export const CustomStyling: Story = {
  args: {
    items: sampleItems,
    className: 'max-w-2xl',
    styles: {
      root: {
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      },
      trigger: {
        backgroundColor: '#f8fafc',
        fontWeight: '600'
      },
      content: {
        backgroundColor: '#f1f5f9'
      }
    }
  }
}

export const WithBadges: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Premium Features',
        leftIcon: Star,
        badge: {
          children: 'New',
          variant: 'primary',
          size: 'sm'
        },
        content:
          'Unlock advanced features including priority support, custom integrations, and enhanced analytics. Perfect for growing businesses.'
      },
      {
        id: '2',
        title: 'Documentation',
        leftIcon: BookOpen,
        badge: {
          children: 'Updated',
          variant: 'secondary',
          size: 'sm',
          iconLeft: CheckCircle
        },
        content:
          'Comprehensive guides and API documentation. Recently updated with new examples and best practices.'
      },
      {
        id: '3',
        title: 'Support Center',
        leftIcon: HelpCircle,
        badge: {
          children: '24/7',
          variant: 'default',
          size: 'sm'
        },
        content:
          'Get help when you need it. Our support team is available around the clock to assist with any questions or issues.'
      },
      {
        id: '4',
        title: 'System Status',
        leftIcon: Settings,
        badge: {
          children: 'Issues',
          variant: 'primary',
          size: 'sm',
          iconLeft: AlertCircle
        },
        content:
          'Current system status and any ongoing maintenance. We strive to keep our services running smoothly with minimal downtime.'
      }
    ]
  }
}
