import { useState } from 'react'

import type {
  Meta,
  StoryObj
} from '@storybook/react-vite'

import { args } from '../../utilities/stories'
import { Switch } from './'
import { SwitchProps } from './Switch.types'

function SwitchStory({
  checked: _checked,
  onCheckedChange: _onCheckedChange,
  ...props
}: SwitchProps) {
  const [checked, setChecked] = useState(false)
  return (
    <Switch
      {...props}
      checked={checked}
      onCheckedChange={(value) => setChecked(value)}
    />
  )
}

const meta: Meta<typeof SwitchStory> = {
  component: SwitchStory,
  title: 'Inputs/Switch',
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
type Story = StoryObj<typeof SwitchStory>

export const Primary: Story = {
  args: {}
}
