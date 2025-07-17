import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import { args } from '../../utilities/stories';
import { EditableText } from './';

const meta: Meta<typeof EditableText> = {
  component: EditableText,
  title: 'Inputs/EditableText',
  argTypes: args({})
}

export default meta
type Story = StoryObj<typeof EditableText>

export const Primary: Story = {
  args: {
    defaultValue: 'Hello, world!'
  }
}
