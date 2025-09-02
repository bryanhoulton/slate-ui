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
import { ColorPicker } from './'

const meta: Meta<typeof ColorPicker> = {
  component: ColorPicker,
  title: 'Inputs/ColorPicker',
  argTypes: args({
    variant: {
      control: {
        type: 'select'
      },
      options: STORY_VARIANTS
    },
    size: {
      control: {
        type: 'select'
      },
      options: STORY_SIZES
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
      {STORY_VARIANTS.map((variant: SlateVariant) => (
        <ColorPicker
          key={variant}
          variant={variant}
          label={variant.charAt(0).toUpperCase() + variant.slice(1)}
          className="w-96"
        />
      ))}
    </div>
  )
}
