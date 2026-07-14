import { useState } from 'react'

import type {
  Meta,
  StoryObj
} from '@storybook/react-vite'

import { AddressInput } from './'
import { AddressValue } from './AddressInput.types'

const meta: Meta<typeof AddressInput> = {
  component: AddressInput,
  title: 'Inputs/AddressInput',
  argTypes: {
    disabled: { control: 'boolean' },
    onChange: { table: { disable: true } },
    fetchSuggestions: { table: { disable: true } },
    value: { table: { disable: true } },
    ref: { table: { disable: true } }
  }
}

export default meta
type Story = StoryObj<typeof AddressInput>

const Controlled = (
  props: Partial<React.ComponentProps<typeof AddressInput>>
) => {
  const [value, setValue] = useState<AddressValue | null>(null)
  return (
    <div className="space-y-4">
      <AddressInput
        label="Address"
        {...props}
        value={value}
        onChange={setValue}
      />
      <pre className="text-xs text-muted">
        {value ? JSON.stringify(value, null, 2) : 'No address selected'}
      </pre>
    </div>
  )
}

/** Uses the default OpenStreetMap Nominatim suggestion source. */
export const Default: Story = {
  render: () => <Controlled placeholder="Try '1600 Pennsylvania Ave'..." />
}

const MOCK_ADDRESSES: AddressValue[] = [
  {
    formatted: '123 Main St, Springfield, IL 62701, United States',
    lat: 39.7817,
    lon: -89.6501,
    city: 'Springfield',
    state: 'Illinois',
    postalCode: '62701',
    country: 'United States'
  },
  {
    formatted: '456 Market St, San Francisco, CA 94105, United States',
    lat: 37.7903,
    lon: -122.3971,
    city: 'San Francisco',
    state: 'California',
    postalCode: '94105',
    country: 'United States'
  },
  {
    formatted: '789 Broadway, New York, NY 10003, United States',
    lat: 40.7322,
    lon: -73.9924,
    city: 'New York',
    state: 'New York',
    postalCode: '10003',
    country: 'United States'
  }
]

/** Uses a mocked suggestion source instead of hitting Nominatim. */
export const MockedSuggestions: Story = {
  render: () => (
    <Controlled
      label="Address (mocked)"
      fetchSuggestions={async (query) => {
        await new Promise((resolve) => setTimeout(resolve, 500))
        return MOCK_ADDRESSES.filter((address) =>
          address.formatted.toLowerCase().includes(query.toLowerCase())
        )
      }}
    />
  )
}

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <AddressInput
        label="Disabled"
        disabled
        value={null}
        onChange={() => {}}
      />
      <AddressInput
        label="With error"
        error="Address is required"
        value={null}
        onChange={() => {}}
      />
    </div>
  )
}
