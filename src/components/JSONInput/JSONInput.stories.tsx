import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { args, STORY_SIZES, STORY_VARIANTS } from '../../utilities'
import { SlateProvider } from '../SlateProvider'
import { JSONInput } from './'
import { JSONSchema, JSONValue } from './JSONInput.types'

const meta: Meta<typeof JSONInput> = {
  component: JSONInput,
  title: 'Inputs/JSONInput',
  argTypes: args({
    variant: {
      control: { type: 'select' },
      options: STORY_VARIANTS
    },
    size: {
      control: { type: 'select' },
      options: STORY_SIZES
    },
    disabled: {
      control: { type: 'boolean' }
    },
    label: {
      control: { type: 'text' }
    },
    description: {
      control: { type: 'text' }
    }
  })
}

export default meta
type Story = StoryObj<typeof JSONInput>

const userSchema: JSONSchema = {
  type: 'object',
  title: 'New User',
  description: 'Fill in the details to create a new account.',
  required: ['name', 'email', 'role'],
  properties: {
    name: {
      type: 'string',
      title: 'Full Name',
      placeholder: 'Jane Doe',
      minLength: 1
    },
    email: {
      type: 'string',
      format: 'email',
      title: 'Email',
      placeholder: 'jane@example.com'
    },
    password: {
      type: 'string',
      format: 'password',
      title: 'Password',
      description: 'Must be at least 8 characters.',
      minLength: 8
    },
    role: {
      type: 'string',
      title: 'Role',
      enum: ['admin', 'editor', 'viewer'],
      enumLabels: {
        admin: 'Administrator',
        editor: 'Editor',
        viewer: 'Read-only Viewer'
      }
    },
    age: {
      type: 'integer',
      title: 'Age',
      minimum: 0,
      maximum: 120
    },
    bio: {
      type: 'string',
      format: 'textarea',
      title: 'Bio',
      description: 'Tell us a little about yourself.',
      maxLength: 500
    },
    subscribed: {
      type: 'boolean',
      title: 'Subscribe to newsletter',
      default: true
    }
  }
}

export const Primary: Story = {
  args: {
    schema: userSchema,
    variant: 'primary',
    size: 'md'
  },
  render: (renderArgs) => {
    const [value, setValue] = useState<JSONValue>({
      subscribed: true
    })
    return (
      <SlateProvider>
        <div className="grid grid-cols-2 gap-6 max-w-4xl">
          <JSONInput {...renderArgs} value={value} onChange={setValue} />
          <pre className="text-xs bg-gray-50 rounded-lg p-3 overflow-auto max-h-[600px]">
            {JSON.stringify(value, null, 2)}
          </pre>
        </div>
      </SlateProvider>
    )
  }
}

const nestedSchema: JSONSchema = {
  type: 'object',
  title: 'Company Profile',
  required: ['name', 'address'],
  properties: {
    name: {
      type: 'string',
      title: 'Company Name'
    },
    website: {
      type: 'string',
      format: 'url',
      title: 'Website'
    },
    industry: {
      type: 'string',
      enum: ['technology', 'finance', 'healthcare', 'retail', 'other'],
      title: 'Industry'
    },
    address: {
      type: 'object',
      title: 'Headquarters',
      required: ['street', 'city'],
      properties: {
        street: { type: 'string', title: 'Street' },
        city: { type: 'string', title: 'City' },
        state: { type: 'string', title: 'State / Region' },
        postalCode: { type: 'string', title: 'Postal Code' },
        country: {
          type: 'string',
          title: 'Country',
          enum: ['US', 'CA', 'UK', 'DE', 'FR']
        }
      }
    },
    socialLinks: {
      type: 'array',
      title: 'Social Links',
      addLabel: 'Add link',
      items: {
        type: 'object',
        required: ['platform', 'url'],
        properties: {
          platform: {
            type: 'string',
            title: 'Platform',
            enum: ['twitter', 'linkedin', 'github', 'facebook']
          },
          url: { type: 'string', format: 'url', title: 'URL' }
        }
      }
    }
  }
}

export const Nested: Story = {
  render: () => {
    const [value, setValue] = useState<JSONValue>({})
    return (
      <SlateProvider>
        <div className="grid grid-cols-2 gap-6 max-w-5xl">
          <JSONInput
            schema={nestedSchema}
            value={value}
            onChange={setValue}
            variant="primary"
          />
          <pre className="text-xs bg-gray-50 rounded-lg p-3 overflow-auto max-h-[700px]">
            {JSON.stringify(value, null, 2)}
          </pre>
        </div>
      </SlateProvider>
    )
  }
}

const widgetsSchema: JSONSchema = {
  type: 'object',
  title: 'Widget Showcase',
  description: 'Every widget the component knows how to render.',
  properties: {
    shortText: { type: 'string', title: 'Short Text' },
    longText: { type: 'string', format: 'textarea', title: 'Long Text' },
    email: { type: 'string', format: 'email', title: 'Email' },
    url: { type: 'string', format: 'url', title: 'Website URL' },
    password: { type: 'string', format: 'password', title: 'Password' },
    phone: { type: 'string', format: 'phone', title: 'Phone' },
    color: {
      type: 'string',
      format: 'color',
      title: 'Brand Color',
      default: '#6366f1'
    },
    releaseDate: {
      type: 'string',
      format: 'date',
      title: 'Release Date'
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      title: 'Created At'
    },
    status: {
      type: 'string',
      title: 'Status',
      enum: ['draft', 'published', 'archived']
    },
    quantity: {
      type: 'integer',
      title: 'Quantity',
      minimum: 1,
      maximum: 100,
      default: 1
    },
    volume: {
      type: 'number',
      format: 'slider',
      title: 'Volume',
      minimum: 0,
      maximum: 100,
      default: 50
    },
    enabled: {
      type: 'boolean',
      title: 'Enabled (switch)',
      default: true
    },
    acceptTerms: {
      type: 'boolean',
      format: 'checkbox',
      title: 'I accept the terms'
    },
    tags: {
      type: 'array',
      title: 'Tags',
      addLabel: 'Add tag',
      items: { type: 'string', title: 'Tag' }
    }
  }
}

export const AllWidgets: Story = {
  render: () => {
    const [value, setValue] = useState<JSONValue>({})
    return (
      <SlateProvider>
        <div className="grid grid-cols-2 gap-6 max-w-5xl">
          <JSONInput
            schema={widgetsSchema}
            value={value}
            onChange={setValue}
            variant="primary"
          />
          <pre className="text-xs bg-gray-50 rounded-lg p-3 overflow-auto max-h-[700px]">
            {JSON.stringify(value, null, 2)}
          </pre>
        </div>
      </SlateProvider>
    )
  }
}

export const WithErrors: Story = {
  render: () => {
    const [value, setValue] = useState<JSONValue>({
      name: '',
      email: 'not-an-email',
      role: 'viewer',
      age: 150
    })
    const errors: Record<string, string> = {
      name: 'Name is required',
      email: 'Please enter a valid email address',
      age: 'Age must be 120 or lower'
    }
    return (
      <SlateProvider>
        <div className="max-w-lg">
          <JSONInput
            schema={userSchema}
            value={value}
            onChange={setValue}
            errors={errors}
            variant="primary"
          />
        </div>
      </SlateProvider>
    )
  }
}

const primitiveSchema: JSONSchema = {
  type: 'string',
  title: 'API Key',
  format: 'password',
  description: 'Paste your API key. Keep it secret.'
}

export const PrimitiveRoot: Story = {
  render: () => {
    const [value, setValue] = useState<JSONValue>('')
    return (
      <SlateProvider>
        <div className="max-w-sm">
          <JSONInput
            schema={primitiveSchema}
            value={value}
            onChange={setValue}
            variant="primary"
          />
        </div>
      </SlateProvider>
    )
  }
}

const arrayRootSchema: JSONSchema = {
  type: 'array',
  title: 'Todos',
  description: 'A list of things to do.',
  addLabel: 'Add todo',
  items: {
    type: 'object',
    required: ['title'],
    properties: {
      title: { type: 'string', title: 'Title' },
      done: { type: 'boolean', title: 'Done' },
      priority: {
        type: 'string',
        title: 'Priority',
        enum: ['low', 'medium', 'high']
      }
    }
  }
}

export const ArrayRoot: Story = {
  render: () => {
    const [value, setValue] = useState<JSONValue>([
      { title: 'Write docs', done: false, priority: 'high' },
      { title: 'Ship it', done: false, priority: 'medium' }
    ])
    return (
      <SlateProvider>
        <div className="grid grid-cols-2 gap-6 max-w-4xl">
          <JSONInput
            schema={arrayRootSchema}
            value={value}
            onChange={setValue}
            variant="primary"
          />
          <pre className="text-xs bg-gray-50 rounded-lg p-3 overflow-auto max-h-[600px]">
            {JSON.stringify(value, null, 2)}
          </pre>
        </div>
      </SlateProvider>
    )
  }
}
