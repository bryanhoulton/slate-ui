import type { Meta, StoryObj } from '@storybook/react'

import { args } from '../../utilities/stories'
import { RadioGroup } from './'

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  title: 'Inputs/RadioGroup',
  argTypes: args({
    onChange: { table: { disable: true } },
    onSearchChange: { table: { disable: true } },
    ref: { table: { disable: true } },
    id: { table: { disable: true } },
    value: { table: { disable: true } },
    search: { table: { disable: true } },
    disabled: { control: 'boolean' },
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] }
  }),
  args: {
    orientation: 'vertical'
  }
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Primary: Story = {
  args: {
    label: 'Radio Group',
    items: [
      { id: 1, name: 'Item 1', description: 'Description 1' },
      { id: 2, name: 'Item 2', description: 'Description 2' },
      { id: 3, name: 'A supppper long item!', description: 'Description 3' }
    ]
  }
}
