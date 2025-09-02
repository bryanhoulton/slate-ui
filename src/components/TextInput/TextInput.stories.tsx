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

import {
  args,
  SlateSize,
  SlateVariant,
  STORY_SIZES,
  STORY_VARIANTS
} from '../../utilities'
import { TextInput } from './'

const meta: Meta<typeof TextInput> = {
  component: TextInput,
  title: 'Inputs/TextInput',
  argTypes: args({
    variant: {
      control: {
        type: 'select'
      },
      options: STORY_VARIANTS
    },
    size: {
      control: {
        type: 'select'
      },
      options: STORY_SIZES
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
      {STORY_VARIANTS.map((variant: SlateVariant) => (
        <TextInput
          key={variant}
          variant={variant}
          label={variant.charAt(0).toUpperCase() + variant.slice(1)}
          placeholder={`${variant.charAt(0).toUpperCase() + variant.slice(1)} variant`}
        />
      ))}
    </div>
  )
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      {STORY_SIZES.map((size: SlateSize) => (
        <TextInput
          key={size}
          size={size}
          label={size.charAt(0).toUpperCase() + size.slice(1)}
          placeholder={`${size.charAt(0).toUpperCase() + size.slice(1)} size`}
        />
      ))}
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
      {STORY_VARIANTS.map((variant: SlateVariant) => (
        <div key={variant}>
          <h3 className="mb-3 text-lg font-semibold capitalize">{variant}</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              {STORY_SIZES.map((size: SlateSize) => (
                <TextInput
                  key={`${variant}-${size}`}
                  variant={variant}
                  size={size}
                  label={size.charAt(0).toUpperCase() + size.slice(1)}
                  placeholder={size.charAt(0).toUpperCase() + size.slice(1)}
                />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {STORY_SIZES.map((size: SlateSize) => (
                <TextInput
                  key={`${variant}-${size}-icon`}
                  variant={variant}
                  size={size}
                  iconLeft={User}
                  label="With Icon"
                  placeholder={size.charAt(0).toUpperCase() + size.slice(1)}
                />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <TextInput
                variant={variant}
                size={STORY_SIZES[0]}
                disabled
                label="Disabled"
                placeholder="Disabled"
              />
              <TextInput
                variant={variant}
                size={STORY_SIZES[1]}
                required
                label="Required"
                placeholder="Required"
              />
              <TextInput
                variant={variant}
                size={STORY_SIZES[2]}
                value="With value"
                label="With Value"
                placeholder="With Value"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
