import type {
  Meta,
  StoryObj,
} from '@storybook/react';

import { args } from '../../utilities/stories';
import { Switch } from './';

const meta: Meta<typeof Switch> = {
  component: Switch,
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
type Story = StoryObj<typeof Switch>

export const Primary: Story = {
  args: {
    onCheckedChange: (checked) => console.log(checked)
  }
}
