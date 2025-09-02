import {
  BookAudio,
  HandPlatter,
  User
} from 'lucide-react'

import { TooltipProvider } from '@radix-ui/react-tooltip'
import type {
  Meta,
  StoryObj
} from '@storybook/react-vite'

import { args } from '../../utilities/stories'
import { Select } from './'

const meta: Meta<typeof Select> = {
  component: Select,
  title: 'Inputs/Select',
  argTypes: args({
    searchable: { control: 'boolean' },
    variant: {
      control: {
        type: 'select'
      },
      options: [
        'primary',
        'secondary',
        'subtle',
        'success',
        'warning',
        'error',
        'info'
      ]
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
    disabled: { control: 'boolean' },
    clearable: { control: 'boolean' }
  }),
  args: {
    searchable: true,
    variant: 'primary',
    size: 'md'
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    )
  ]
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    items: [
      { id: 1, name: 'Option 1', icon: User },
      { id: 2, name: 'Option 2', icon: BookAudio },
      { id: 3, name: 'Option 3', icon: HandPlatter }
    ],
    placeholder: 'Select an option',
    value: null,
    onChange: () => {}
  }
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Select
        variant="primary"
        items={[
          { id: 1, name: 'Primary Option 1' },
          { id: 2, name: 'Primary Option 2' }
        ]}
        placeholder="Primary variant"
        value={null}
        onChange={() => {}}
      />
      <Select
        variant="secondary"
        items={[
          { id: 1, name: 'Secondary Option 1' },
          { id: 2, name: 'Secondary Option 2' }
        ]}
        placeholder="Secondary variant"
        value={null}
        onChange={() => {}}
      />
      <Select
        variant="subtle"
        items={[
          { id: 1, name: 'Subtle Option 1' },
          { id: 2, name: 'Subtle Option 2' }
        ]}
        placeholder="Subtle variant"
        value={null}
        onChange={() => {}}
      />
      <Select
        variant="success"
        items={[
          { id: 1, name: 'Success Option 1' },
          { id: 2, name: 'Success Option 2' }
        ]}
        placeholder="Success variant"
        value={null}
        onChange={() => {}}
      />
      <Select
        variant="warning"
        items={[
          { id: 1, name: 'Warning Option 1' },
          { id: 2, name: 'Warning Option 2' }
        ]}
        placeholder="Warning variant"
        value={null}
        onChange={() => {}}
      />
      <Select
        variant="error"
        items={[
          { id: 1, name: 'Error Option 1' },
          { id: 2, name: 'Error Option 2' }
        ]}
        placeholder="Error variant"
        value={null}
        onChange={() => {}}
      />
      <Select
        variant="info"
        items={[
          { id: 1, name: 'Info Option 1' },
          { id: 2, name: 'Info Option 2' }
        ]}
        placeholder="Info variant"
        value={null}
        onChange={() => {}}
      />
    </div>
  )
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Select
        size="sm"
        items={[
          { id: 1, name: 'Small Option 1' },
          { id: 2, name: 'Small Option 2' }
        ]}
        placeholder="Small size"
        value={null}
        onChange={() => {}}
      />
      <Select
        size="md"
        items={[
          { id: 1, name: 'Medium Option 1' },
          { id: 2, name: 'Medium Option 2' }
        ]}
        placeholder="Medium size"
        value={null}
        onChange={() => {}}
      />
      <Select
        size="lg"
        items={[
          { id: 1, name: 'Large Option 1' },
          { id: 2, name: 'Large Option 2' }
        ]}
        placeholder="Large size"
        value={null}
        onChange={() => {}}
      />
    </div>
  )
}

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <Select
        iconLeft={User}
        items={[
          { id: 1, name: 'John Doe', icon: User },
          { id: 2, name: 'Jane Smith', icon: User },
          { id: 3, name: 'Bob Johnson', icon: User }
        ]}
        placeholder="Select a user"
        label="User"
        value={null}
        onChange={() => {}}
      />
      <Select
        items={[
          { id: 1, name: 'Audio File', icon: BookAudio },
          { id: 2, name: 'Document', icon: HandPlatter },
          { id: 3, name: 'Image', icon: User }
        ]}
        placeholder="Select file type"
        label="File Type"
        value={null}
        onChange={() => {}}
      />
    </div>
  )
}

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <Select
        items={[
          { id: 1, name: 'Option 1' },
          { id: 2, name: 'Option 2' }
        ]}
        placeholder="Normal state"
        label="Normal"
        value={null}
        onChange={() => {}}
      />
      <Select
        items={[
          { id: 1, name: 'Option 1' },
          { id: 2, name: 'Option 2' }
        ]}
        placeholder="Disabled state"
        label="Disabled"
        disabled
        value={null}
        onChange={() => {}}
      />
      <Select
        items={[
          { id: 1, name: 'Option 1' },
          { id: 2, name: 'Option 2' }
        ]}
        placeholder="Required field"
        label="Required"
        required
        value={null}
        onChange={() => {}}
      />
      <Select
        items={[
          { id: 1, name: 'Option 1' },
          { id: 2, name: 'Option 2' }
        ]}
        placeholder="With error"
        label="With Error"
        error="Please select an option"
        variant="error"
        value={null}
        onChange={() => {}}
      />
    </div>
  )
}

export const SearchableSelect: Story = {
  render: () => (
    <div className="space-y-4">
      <Select
        searchable
        items={[
          { id: 1, name: 'Apple' },
          { id: 2, name: 'Banana' },
          { id: 3, name: 'Cherry' },
          { id: 4, name: 'Date' },
          { id: 5, name: 'Elderberry' },
          { id: 6, name: 'Fig' },
          { id: 7, name: 'Grape' },
          { id: 8, name: 'Honeydew' }
        ]}
        placeholder="Search fruits..."
        label="Searchable Fruits"
        value={null}
        onChange={() => {}}
      />
      <Select
        searchable
        clearable
        items={[
          { id: 1, name: 'United States', icon: User },
          { id: 2, name: 'Canada', icon: BookAudio },
          { id: 3, name: 'United Kingdom', icon: HandPlatter },
          { id: 4, name: 'Germany' },
          { id: 5, name: 'France' },
          { id: 6, name: 'Japan' },
          { id: 7, name: 'Australia' }
        ]}
        placeholder="Search countries..."
        label="Country (Clearable)"
        value={null}
        onChange={() => {}}
      />
    </div>
  )
}

export const FormExample: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-lg font-semibold">User Profile Form</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select
              items={[
                { id: 'mr', name: 'Mr.' },
                { id: 'ms', name: 'Ms.' },
                { id: 'mrs', name: 'Mrs.' },
                { id: 'dr', name: 'Dr.' }
              ]}
              placeholder="Select title"
              label="Title"
              size="sm"
              value={null}
              onChange={() => {}}
            />
            <Select
              items={[
                { id: 'admin', name: 'Administrator' },
                { id: 'editor', name: 'Editor' },
                { id: 'viewer', name: 'Viewer' }
              ]}
              placeholder="Select role"
              label="Role"
              required
              value={null}
              onChange={() => {}}
            />
          </div>
          <Select
            searchable
            items={[
              { id: 'us', name: 'United States' },
              { id: 'ca', name: 'Canada' },
              { id: 'uk', name: 'United Kingdom' },
              { id: 'de', name: 'Germany' },
              { id: 'fr', name: 'France' }
            ]}
            placeholder="Search countries..."
            label="Country"
            value={null}
            onChange={() => {}}
          />
          <Select
            items={[
              { id: 'english', name: 'English' },
              { id: 'spanish', name: 'Spanish' },
              { id: 'french', name: 'French' },
              { id: 'german', name: 'German' }
            ]}
            placeholder="Select language"
            label="Preferred Language"
            variant="secondary"
            value={null}
            onChange={() => {}}
          />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Settings Form</h3>
        <div className="space-y-4">
          <Select
            items={[
              { id: 'light', name: 'Light Theme' },
              { id: 'dark', name: 'Dark Theme' },
              { id: 'auto', name: 'Auto (System)' }
            ]}
            placeholder="Select theme"
            label="Theme"
            value="light"
            onChange={() => {}}
          />
          <Select
            items={[
              { id: 'daily', name: 'Daily' },
              { id: 'weekly', name: 'Weekly' },
              { id: 'monthly', name: 'Monthly' },
              { id: 'never', name: 'Never' }
            ]}
            placeholder="Select frequency"
            label="Email Notifications"
            value="weekly"
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  )
}
