import { useState } from 'react'

import {
  Phone,
  User
} from 'lucide-react'

import type {
  Meta,
  StoryObj
} from '@storybook/react'

import { PhoneInput } from './'
import { CountryCode } from './PhoneInput.types'

const meta = {
  title: 'Inputs/PhoneInput',
  component: PhoneInput,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'subtle']
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    autoFormat: {
      control: { type: 'boolean' }
    },
    validatePhoneNumber: {
      control: { type: 'boolean' }
    },
    disabled: {
      control: { type: 'boolean' }
    },
    required: {
      control: { type: 'boolean' }
    }
  }
} satisfies Meta<typeof PhoneInput>

export default meta
type Story = StoryObj<typeof meta>

// Basic story
export const Default: Story = {
  args: {
    label: 'Phone Number',
    placeholder: '123-456-7890'
  }
}

// Controlled component example
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    const [country, setCountry] = useState<CountryCode | null>(null)

    return (
      <div className="space-y-4">
        <PhoneInput
          {...args}
          value={value}
          onChange={(phoneNumber, _formatted, selectedCountry) => {
            setValue(phoneNumber)
            setCountry(selectedCountry)
          }}
          onCountryChange={setCountry}
        />

        <div className="text-sm text-gray-600">
          <p>Raw value: {value}</p>
          <p>
            Selected country: {country?.name} ({country?.dialCode})
          </p>
        </div>
      </div>
    )
  },
  args: {
    label: 'Phone Number',
    placeholder: 'Enter your phone number'
  }
}

// Different variants
export const Variants: Story = {
  render: (args) => (
    <div className="space-y-4">
      <PhoneInput {...args} variant="primary" label="Primary Variant" />
      <PhoneInput {...args} variant="secondary" label="Secondary Variant" />
      <PhoneInput {...args} variant="subtle" label="Subtle Variant" />
    </div>
  ),
  args: {
    placeholder: 'Enter phone number'
  }
}

// Different sizes
export const Sizes: Story = {
  render: (args) => (
    <div className="space-y-4">
      <PhoneInput {...args} size="sm" label="Small Size" />
      <PhoneInput {...args} size="md" label="Medium Size" />
      <PhoneInput {...args} size="lg" label="Large Size" />
    </div>
  ),
  args: {
    placeholder: 'Enter phone number'
  }
}

// With icons
export const WithIcons: Story = {
  render: (args) => (
    <div className="space-y-4">
      <PhoneInput {...args} iconLeft={Phone} label="With Left Icon" />
      <PhoneInput {...args} iconRight={User} label="With Right Icon" />
    </div>
  ),
  args: {
    placeholder: 'Enter phone number'
  }
}

// Error states
export const ErrorStates: Story = {
  render: (args) => (
    <div className="space-y-4">
      <PhoneInput
        {...args}
        error="This field is required"
        label="With Custom Error"
      />
      <PhoneInput
        {...args}
        label="With Validation"
        defaultValue="123"
        validatePhoneNumber={true}
      />
    </div>
  ),
  args: {
    placeholder: 'Enter phone number'
  }
}

// Without formatting
export const WithoutFormatting: Story = {
  render: (args) => (
    <div className="space-y-4">
      <PhoneInput {...args} autoFormat={true} label="With Auto-formatting" />
      <PhoneInput
        {...args}
        autoFormat={false}
        label="Without Auto-formatting"
      />
    </div>
  ),
  args: {
    placeholder: 'Enter phone number',
    defaultValue: '1234567890'
  }
}

// Disabled state
export const Disabled: Story = {
  args: {
    label: 'Phone Number',
    placeholder: 'Enter your phone number',
    disabled: true,
    defaultValue: '1234567890'
  }
}

// Required field
export const Required: Story = {
  args: {
    label: 'Phone Number',
    placeholder: 'Enter your phone number',
    required: true
  }
}

// Custom countries
export const CustomCountries: Story = {
  render: (args) => {
    const customCountries = [
      {
        id: 'us',
        name: 'United States',
        code: 'US',
        dialCode: '+1',
        flag: '🇺🇸',
        format: '(###) ###-####',
        priority: 1
      },
      {
        id: 'ca',
        name: 'Canada',
        code: 'CA',
        dialCode: '+1',
        flag: '🇨🇦',
        format: '(###) ###-####',
        priority: 2
      },
      {
        id: 'gb',
        name: 'United Kingdom',
        code: 'GB',
        dialCode: '+44',
        flag: '🇬🇧',
        format: '#### ### ####',
        priority: 3
      }
    ]

    return (
      <PhoneInput
        {...args}
        countries={customCountries}
        defaultCountry="ca"
        label="North America & UK Only"
      />
    )
  },
  args: {
    placeholder: 'Enter phone number'
  }
}

// Form integration example
export const FormExample: Story = {
  render: (args) => {
    const [formData, setFormData] = useState({
      name: '',
      phone: '',
      email: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      alert(`Form submitted: ${JSON.stringify(formData, null, 2)}`)
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4 w-80">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Your name"
          />
        </div>

        <PhoneInput
          {...args}
          label="Phone Number"
          value={formData.phone}
          onChange={(phone) => setFormData((prev) => ({ ...prev, phone }))}
          required
        />

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="your@email.com"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Submit
        </button>
      </form>
    )
  },
  args: {
    placeholder: 'Enter your phone number'
  }
}
