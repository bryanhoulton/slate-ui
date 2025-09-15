import { useState } from 'react'

import type {
  Meta,
  StoryObj
} from '@storybook/react'

import { VerificationCodeInput } from './index'

const meta = {
  title: 'Inputs/VerificationCodeInput',
  component: VerificationCodeInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A verification code input component that displays individual digit boxes for entering verification codes like 2FA tokens or SMS codes.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    length: {
      control: { type: 'number', min: 3, max: 10 },
      description: 'Number of digits in the verification code'
    },
    variant: {
      control: 'select',
      options: [
        'default',
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
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    masked: {
      control: 'boolean',
      description: 'Whether to mask the input (show dots instead of numbers)'
    },
    disabled: {
      control: 'boolean'
    },
    autoFocus: {
      control: 'boolean'
    }
  }
} satisfies Meta<typeof VerificationCodeInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    length: 6,
    variant: 'default',
    size: 'md'
  }
}

export const WithValue: Story = {
  args: {
    length: 6,
    value: '123456',
    variant: 'default',
    size: 'md'
  }
}

export const FourDigits: Story = {
  args: {
    length: 4,
    variant: 'default',
    size: 'md'
  }
}

export const EightDigits: Story = {
  args: {
    length: 8,
    variant: 'default',
    size: 'md'
  }
}

export const Primary: Story = {
  args: {
    length: 6,
    variant: 'primary',
    size: 'md'
  }
}

export const Secondary: Story = {
  args: {
    length: 6,
    variant: 'secondary',
    size: 'md'
  }
}

export const Small: Story = {
  args: {
    length: 6,
    variant: 'default',
    size: 'sm'
  }
}

export const Large: Story = {
  args: {
    length: 6,
    variant: 'default',
    size: 'lg'
  }
}

export const Masked: Story = {
  args: {
    length: 6,
    variant: 'default',
    size: 'md',
    masked: true,
    value: '123456'
  }
}

export const WithError: Story = {
  args: {
    length: 6,
    variant: 'error',
    size: 'md',
    error: 'Invalid verification code'
  }
}

export const Disabled: Story = {
  args: {
    length: 6,
    variant: 'default',
    size: 'md',
    disabled: true,
    value: '123'
  }
}

export const AutoFocus: Story = {
  args: {
    length: 6,
    variant: 'default',
    size: 'md',
    autoFocus: true
  }
}

export const WithPlaceholder: Story = {
  args: {
    length: 6,
    variant: 'subtle',
    size: 'md',
    placeholder: '0'
  }
}

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    const [complete, setComplete] = useState(false)

    return (
      <div className="space-y-4">
        <VerificationCodeInput
          {...args}
          value={value}
          onChange={(newValue) => {
            setValue(newValue)
            setComplete(false)
          }}
          onComplete={(completeValue) => {
            console.log('Code complete:', completeValue)
            setComplete(true)
          }}
        />
        <div className="text-sm text-gray-600">
          <p>Current value: {value || 'Empty'}</p>
          <p>Complete: {complete ? 'Yes' : 'No'}</p>
        </div>
      </div>
    )
  },
  args: {
    length: 6,
    variant: 'primary',
    size: 'md'
  }
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Default</h3>
        <VerificationCodeInput length={6} variant="default" value="123456" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Primary</h3>
        <VerificationCodeInput length={6} variant="primary" value="123456" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Secondary</h3>
        <VerificationCodeInput length={6} variant="secondary" value="123456" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Success</h3>
        <VerificationCodeInput length={6} variant="success" value="123456" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Warning</h3>
        <VerificationCodeInput length={6} variant="warning" value="123456" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Error</h3>
        <VerificationCodeInput
          length={6}
          variant="error"
          value="123456"
          error="Invalid code"
        />
      </div>
    </div>
  )
}

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Small</h3>
        <VerificationCodeInput length={6} size="sm" value="123456" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Medium</h3>
        <VerificationCodeInput length={6} size="md" value="123456" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Large</h3>
        <VerificationCodeInput length={6} size="lg" value="123456" />
      </div>
    </div>
  )
}
