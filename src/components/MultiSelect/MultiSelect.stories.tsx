import { useState } from 'react'

import {
  BookAudio,
  Globe,
  HandPlatter,
  User
} from 'lucide-react'

import { TooltipProvider } from '@radix-ui/react-tooltip'
import type {
  Meta,
  StoryObj
} from '@storybook/react-vite'

import {
  args,
  SlateVariant,
  STORY_SIZES,
  STORY_VARIANTS
} from '../../utilities'
import { MultiSelect } from './'

const meta: Meta<typeof MultiSelect> = {
  component: MultiSelect,
  title: 'Inputs/MultiSelect',
  argTypes: args({
    searchable: { control: 'boolean' },
    variant: {
      control: { type: 'select' },
      options: STORY_VARIANTS
    },
    size: {
      control: { type: 'select' },
      options: STORY_SIZES
    },
    onChange: { table: { disable: true } },
    onSearchChange: { table: { disable: true } },
    ref: { table: { disable: true } },
    id: { table: { disable: true } },
    value: { table: { disable: true } },
    search: { table: { disable: true } },
    disabled: { control: 'boolean' },
    clearable: { control: 'boolean' },
    maxSelected: { control: 'number' }
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
type Story = StoryObj<typeof MultiSelect>

const fruitItems = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Cherry' },
  { id: 4, name: 'Date' },
  { id: 5, name: 'Elderberry' },
  { id: 6, name: 'Fig' },
  { id: 7, name: 'Grape' },
  { id: 8, name: 'Honeydew' }
]

const countryItems = [
  { id: 'us', name: 'United States', icon: Globe },
  { id: 'ca', name: 'Canada', icon: Globe },
  { id: 'uk', name: 'United Kingdom', icon: Globe },
  { id: 'de', name: 'Germany', icon: Globe },
  { id: 'fr', name: 'France', icon: Globe },
  { id: 'jp', name: 'Japan', icon: Globe },
  { id: 'au', name: 'Australia', icon: Globe }
]

type ControlledProps<T extends string | number> = {
  items: { id: T; name: string; icon?: typeof User }[]
  initial?: T[]
} & Partial<
  Omit<
    React.ComponentProps<typeof MultiSelect>,
    'value' | 'onChange' | 'items' | 'defaultValue'
  >
>

const Controlled = <T extends string | number>({
  items,
  initial = [],
  ...props
}: ControlledProps<T>) => {
  const [value, setValue] = useState<T[]>(initial)
  return (
    <MultiSelect<T>
      {...(props as object)}
      items={items}
      value={value}
      onChange={setValue}
    />
  )
}

export const Default: Story = {
  render: (args) => (
    <Controlled
      {...args}
      items={[
        { id: 1, name: 'Option 1', icon: User },
        { id: 2, name: 'Option 2', icon: BookAudio },
        { id: 3, name: 'Option 3', icon: HandPlatter }
      ]}
      placeholder="Select options"
    />
  )
}

export const WithInitialValues: Story = {
  render: () => (
    <Controlled
      label="Favorite fruits"
      items={fruitItems}
      initial={[1, 3]}
      placeholder="Pick fruits"
    />
  )
}

export const Searchable: Story = {
  render: () => (
    <div className="space-y-4">
      <Controlled
        label="Fruits"
        items={fruitItems}
        placeholder="Search fruits..."
        searchable
      />
      <Controlled
        label="Countries (clearable)"
        items={countryItems}
        placeholder="Search countries..."
        searchable
        clearable
      />
    </div>
  )
}

export const WithIcons: Story = {
  render: () => (
    <Controlled
      iconLeft={Globe}
      label="Visited countries"
      items={countryItems}
      placeholder="Where have you been?"
      initial={['us', 'jp']}
    />
  )
}

export const MaxSelected: Story = {
  render: () => (
    <Controlled
      label="Pick up to 3 fruits"
      items={fruitItems}
      maxSelected={3}
      placeholder="Max 3"
    />
  )
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      {STORY_VARIANTS.map((variant: SlateVariant) => (
        <Controlled
          key={variant}
          variant={variant}
          label={variant}
          items={[
            { id: 1, name: `${variant} option 1` },
            { id: 2, name: `${variant} option 2` },
            { id: 3, name: `${variant} option 3` }
          ]}
          placeholder={`${variant} variant`}
        />
      ))}
    </div>
  )
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      {STORY_SIZES.map((size) => (
        <Controlled
          key={size}
          size={size}
          label={size}
          items={fruitItems}
          initial={[1, 2]}
          placeholder={`${size} size`}
        />
      ))}
    </div>
  )
}

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <Controlled
        label="Normal"
        items={fruitItems}
        placeholder="Pick some fruits"
      />
      <Controlled
        label="Disabled"
        items={fruitItems}
        initial={[1, 2]}
        disabled
      />
      <Controlled
        label="With error"
        items={fruitItems}
        error="Please select at least one option"
        variant="error"
      />
    </div>
  )
}
