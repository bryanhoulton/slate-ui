import { useState } from 'react'

import type {
  Meta,
  StoryObj
} from '@storybook/react-vite'

import {
  args,
  STORY_SIZES,
  STORY_VARIANTS
} from '../../utilities'
import { SlateProvider } from '../SlateProvider'
import { DatePicker } from './'
import { DatePickerProps } from './DatePicker.types'

function DatePickerStory({
  value: _value,
  onChange: _onChange,
  defaultValue,
  ...props
}: DatePickerProps) {
  const [value, setValue] = useState<Date | null>(defaultValue ?? null)

  return <DatePicker {...props} value={value} onChange={setValue} />
}

const meta: Meta<typeof DatePickerStory> = {
  component: DatePickerStory,
  title: 'Inputs/DatePicker',
  decorators: [
    (Story) => (
      <SlateProvider>
        <Story />
      </SlateProvider>
    )
  ],
  argTypes: args({
    variant: {
      control: { type: 'select' },
      options: STORY_VARIANTS
    },
    size: {
      control: { type: 'select' },
      options: STORY_SIZES
    },
    showTime: { control: 'boolean' },
    clearable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    minuteStep: { control: { type: 'number', min: 1 } },
    timeSlots: { table: { disable: true } },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    minDate: { table: { disable: true } },
    maxDate: { table: { disable: true } },
    format: { table: { disable: true } }
  }),
  args: {
    label: 'Schedule date',
    placeholder: 'Select date'
  }
}

export default meta

type Story = StoryObj<typeof DatePickerStory>

export const Default: Story = {
  args: {}
}

export const WithConstraints: Story = {
  args: {},
  render: (args) => {
    const today = new Date()
    const minDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 2
    )
    const maxDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 14
    )

    return (
      <DatePickerStory
        {...args}
        minDate={minDate}
        maxDate={maxDate}
        label="Availability window"
      />
    )
  }
}
