import type {
  Meta,
  StoryObj
} from '@storybook/react-vite'

import { args } from '../../utilities/stories'
import { ColorPicker } from './'

const meta: Meta<typeof ColorPicker> = {
  component: ColorPicker,
  title: 'Inputs/ColorPicker',
  argTypes: args({
    variant: {
      control: {
        type: 'select'
      },
      options: [
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
      control: {
        type: 'select'
      },
      options: ['sm', 'md', 'lg']
    }
  })
}

export default meta
type Story = StoryObj<typeof ColorPicker>

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    className: 'w-96',
    label: 'Color'
  }
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <ColorPicker variant="primary" label="Primary" className="w-96" />
      <ColorPicker variant="secondary" label="Secondary" className="w-96" />
      <ColorPicker variant="subtle" label="Subtle" className="w-96" />
      <ColorPicker variant="success" label="Success" className="w-96" />
      <ColorPicker variant="warning" label="Warning" className="w-96" />
      <ColorPicker variant="error" label="Error" className="w-96" />
      <ColorPicker variant="info" label="Info" className="w-96" />
    </div>
  )
}
