import {
  AlertCircle,
  Building,
  Calendar,
  Check,
  CreditCard,
  DollarSign,
  Eye,
  Globe,
  Lock,
  Mail,
  MapPin,
  Phone,
  Search,
  User
} from 'lucide-react'

import type {
  Meta,
  StoryObj
} from '@storybook/react-vite'

import { args } from '../../utilities/stories'
import { TextInput } from './'

const meta: Meta<typeof TextInput> = {
  component: TextInput,
  title: 'Inputs/TextInput',
  argTypes: args({
    variant: {
      control: {
        type: 'select'
      },
      options: ['primary', 'secondary', 'subtle', 'error', 'info', 'success']
    },
    size: {
      control: {
        type: 'select'
      },
      options: ['sm', 'md', 'lg']
    },
    label: {
      control: {
        type: 'text'
      }
    },
    error: {
      control: {
        type: 'text'
      }
    },
    placeholder: {
      control: {
        type: 'text'
      }
    }
  })
}

export default meta
type Story = StoryObj<typeof TextInput>

export const Default: Story = {
  args: {
    label: 'Name',
    placeholder: 'Enter your name'
  }
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <TextInput
        variant="primary"
        label="Primary"
        placeholder="Primary variant"
      />
      <TextInput
        variant="secondary"
        label="Secondary"
        placeholder="Secondary variant"
      />
      <TextInput variant="subtle" label="Subtle" placeholder="Subtle variant" />
      <TextInput variant="error" label="Error" placeholder="Error variant" />
    </div>
  )
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <TextInput size="sm" label="Small" placeholder="Small size" />
      <TextInput size="md" label="Medium" placeholder="Medium size" />
      <TextInput size="lg" label="Large" placeholder="Large size" />
    </div>
  )
}

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <TextInput
        iconLeft={User}
        label="Username"
        placeholder="Enter username"
      />
      <TextInput
        iconRight={Eye}
        label="Password"
        type="password"
        placeholder="Enter password"
      />
      <TextInput
        iconLeft={Search}
        iconRight={Check}
        label="Search"
        placeholder="Search items..."
      />
    </div>
  )
}

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <TextInput label="Normal" placeholder="Normal state" />
      <TextInput label="Disabled" placeholder="Disabled state" disabled />
      <TextInput label="Required" placeholder="Required field" required />
      <TextInput label="With Value" value="Pre-filled value" />
      <TextInput
        label="With Error"
        placeholder="Invalid input"
        error="This field is required"
      />
    </div>
  )
}

export const InputTypes: Story = {
  render: () => (
    <div className="space-y-4">
      <TextInput
        type="text"
        iconLeft={User}
        label="Text"
        placeholder="Enter text"
      />
      <TextInput
        type="email"
        iconLeft={Mail}
        label="Email"
        placeholder="Enter email"
      />
      <TextInput
        type="password"
        iconLeft={Lock}
        label="Password"
        placeholder="Enter password"
      />
      <TextInput
        type="tel"
        iconLeft={Phone}
        label="Phone"
        placeholder="Enter phone number"
      />
      <TextInput
        type="url"
        iconLeft={Globe}
        label="Website"
        placeholder="Enter website URL"
      />
      <TextInput
        type="search"
        iconLeft={Search}
        label="Search"
        placeholder="Search..."
      />
      <TextInput
        type="number"
        iconLeft={DollarSign}
        label="Amount"
        placeholder="Enter amount"
      />
      <TextInput type="date" iconLeft={Calendar} label="Date" />
    </div>
  )
}

export const FormFields: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-lg font-semibold">Personal Information</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <TextInput iconLeft={User} label="First Name" placeholder="John" />
            <TextInput iconLeft={User} label="Last Name" placeholder="Doe" />
          </div>
          <TextInput
            iconLeft={Mail}
            label="Email"
            type="email"
            placeholder="john@example.com"
          />
          <TextInput
            iconLeft={Phone}
            label="Phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
          />
          <TextInput
            iconLeft={MapPin}
            label="Address"
            placeholder="123 Main St"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Company Information</h3>
        <div className="space-y-4">
          <TextInput
            iconLeft={Building}
            label="Company Name"
            placeholder="Acme Corp"
          />
          <TextInput
            iconLeft={Globe}
            label="Website"
            type="url"
            placeholder="https://example.com"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Payment Information</h3>
        <div className="space-y-4">
          <TextInput
            iconLeft={CreditCard}
            label="Card Number"
            placeholder="1234 5678 9012 3456"
          />
          <div className="grid grid-cols-2 gap-4">
            <TextInput label="Expiry Date" placeholder="MM/YY" />
            <TextInput label="CVV" placeholder="123" />
          </div>
        </div>
      </div>
    </div>
  )
}

export const ValidationStates: Story = {
  render: () => (
    <div className="space-y-4">
      <TextInput
        label="Valid Input"
        value="john@example.com"
        iconRight={Check}
        className="text-green-600"
      />
      <TextInput
        label="Invalid Email"
        value="invalid-email"
        error="Please enter a valid email address"
        variant="error"
        iconRight={AlertCircle}
      />
      <TextInput
        label="Required Field"
        placeholder="This field is required"
        error="This field cannot be empty"
        variant="error"
        required
      />
      <TextInput
        label="Password Strength"
        type="password"
        value="weak"
        error="Password must be at least 8 characters"
        variant="error"
      />
    </div>
  )
}

export const AllSizesAndVariants: Story = {
  render: () => (
    <div className="space-y-6">
      {(['primary', 'secondary', 'subtle', 'error'] as const).map((variant) => (
        <div key={variant}>
          <h3 className="mb-3 text-lg font-semibold capitalize">{variant}</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <TextInput
                variant={variant}
                size="sm"
                label="Small"
                placeholder="Small"
              />
              <TextInput
                variant={variant}
                size="md"
                label="Medium"
                placeholder="Medium"
              />
              <TextInput
                variant={variant}
                size="lg"
                label="Large"
                placeholder="Large"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <TextInput
                variant={variant}
                size="sm"
                iconLeft={User}
                label="With Icon"
                placeholder="Small"
              />
              <TextInput
                variant={variant}
                size="md"
                iconLeft={User}
                label="With Icon"
                placeholder="Medium"
              />
              <TextInput
                variant={variant}
                size="lg"
                iconLeft={User}
                label="With Icon"
                placeholder="Large"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <TextInput
                variant={variant}
                size="sm"
                disabled
                label="Disabled"
                placeholder="Small"
              />
              <TextInput
                variant={variant}
                size="md"
                required
                label="Required"
                placeholder="Medium"
              />
              <TextInput
                variant={variant}
                size="lg"
                value="With value"
                label="With Value"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
