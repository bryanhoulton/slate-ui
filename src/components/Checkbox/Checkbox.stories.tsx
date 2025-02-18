import { useState } from 'react'

import type {
  Meta,
  StoryObj
} from '@storybook/react'

import { args } from '../../utilities/stories'
import { Checkbox } from './'
import { CheckboxProps } from './Checbox.types'

function CheckboxStory({
  checked: _checked,
  onCheckedChange: _onCheckedChange,
  ...props
}: CheckboxProps) {
  const [checked, setChecked] = useState(false)
  return (
    <Checkbox
      {...props}
      checked={checked}
      onCheckedChange={(value) => setChecked(value === false)}
    />
  )
}

const meta: Meta<typeof CheckboxStory> = {
  component: CheckboxStory,
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
type Story = StoryObj<typeof CheckboxStory>

export const Primary: Story = {
  args: {
    withBody: true
  }
}
