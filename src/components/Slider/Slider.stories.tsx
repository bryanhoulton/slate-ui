import type { Meta, StoryObj } from '@storybook/react'

import { args } from '../../utilities/stories'
import { SlateProvider } from '../SlateProvider'
import { Slider } from './'

const meta: Meta<typeof Slider> = {
  component: Slider,
  title: 'Inputs/Slider',
  argTypes: args({
    min: { control: { type: 'number' } },
    max: { control: { type: 'number' } },
    step: { control: { type: 'number' } },
    value: { control: { type: 'number' } },
    disabled: { control: { type: 'boolean' } }
  }),
  decorators: [
    (Story) => (
      <SlateProvider>
        <Story />
      </SlateProvider>
    )
  ],
  args: {
    defaultValue: [50],
    max: 100,
    min: 0,
    label: 'Slider',
    tooltip: 'Slide me'
  }
}

export default meta
type Story = StoryObj<typeof Slider>

export const Primary: Story = {}
