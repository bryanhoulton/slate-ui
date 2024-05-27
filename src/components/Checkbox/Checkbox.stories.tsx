import type { Meta, StoryObj } from '@storybook/react'

import { args } from '../../utilities/stories'
import { Checkbox } from './'

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'Inputs/Checkbox',
  argTypes: args({
    withBody: { control: 'boolean' },
    label: { control: 'text' },
    disabled: { control: 'boolean' }
  }),
  args: {
    disabled: false,
    withBody: false,
    label: 'Airplane Mode'
  }
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Primary: Story = {
  args: {}
}
