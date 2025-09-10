import type {
  Meta,
  StoryObj
} from '@storybook/react'

import { NumberLine } from './'

const meta: Meta<typeof NumberLine> = {
  title: 'Diagrams/NumberLine',
  component: NumberLine,
  parameters: {
    layout: 'padded'
  },
  argTypes: {
    min: {
      control: { type: 'number' }
    },
    max: {
      control: { type: 'number' }
    },
    step: {
      control: { type: 'number' }
    },
    showTicks: {
      control: { type: 'boolean' }
    },
    showLabels: {
      control: { type: 'boolean' }
    },
    showArrows: {
      control: { type: 'boolean' }
    },
    height: {
      control: { type: 'number' }
    },
    width: {
      control: { type: 'text' }
    }
  }
}

export default meta
type Story = StoryObj<typeof NumberLine>

export const Basic: Story = {
  args: {
    min: 0,
    max: 10,
    step: 1,
    showTicks: true,
    showLabels: true,
    showArrows: true,
    title: 'Basic Number Line'
  }
}

export const WithMarks: Story = {
  args: {
    min: -5,
    max: 15,
    step: 5,
    title: 'Number Line with Marks',
    marks: [
      { value: 0, label: 'Start', color: 'green', size: 'lg' },
      { value: 7, label: 'Middle', color: 'yellow', size: 'md' },
      { value: 12, label: 'End', color: 'red', size: 'sm' }
    ]
  }
}

export const DifferentColors: Story = {
  render: () => (
    <div className="space-y-6 w-full">
      <NumberLine
        min={0}
        max={10}
        title="Blue Marks"
        marks={[{ value: 5, label: '5', color: 'blue' }]}
      />
      <NumberLine
        min={0}
        max={10}
        title="Green Marks"
        marks={[{ value: 5, label: '5', color: 'green' }]}
      />
      <NumberLine
        min={0}
        max={10}
        title="Red Marks"
        marks={[{ value: 5, label: '5', color: 'red' }]}
      />
      <NumberLine
        min={0}
        max={10}
        title="Purple Marks"
        marks={[{ value: 5, label: '5', color: 'purple' }]}
      />
    </div>
  )
}

export const MathRange: Story = {
  args: {
    min: -10,
    max: 10,
    step: 2,
    title: 'Math Number Line (-10 to 10)',
    marks: [
      { value: -8, label: '-8', color: 'red' },
      { value: 0, label: '0', color: 'blue', size: 'lg' },
      { value: 6, label: '6', color: 'green' }
    ]
  }
}

export const CustomTicks: Story = {
  args: {
    min: 0,
    max: 100,
    customTicks: [0, 25, 50, 75, 100],
    title: 'Custom Tick Positions',
    marks: [
      { value: 25, label: 'Q1', color: 'cyan' },
      { value: 50, label: 'Median', color: 'blue', size: 'lg' },
      { value: 75, label: 'Q3', color: 'cyan' }
    ]
  }
}

export const NoLabelsOrTicks: Story = {
  args: {
    min: 0,
    max: 10,
    showTicks: false,
    showLabels: false,
    showArrows: false,
    title: 'Minimal Number Line',
    marks: [
      { value: 3, color: 'blue', size: 'lg' },
      { value: 7, color: 'green', size: 'lg' }
    ]
  }
}

export const Fractions: Story = {
  args: {
    min: 0,
    max: 1,
    step: 0.25,
    title: 'Fractions (0 to 1)',
    marks: [
      { value: 0.25, label: '1/4', color: 'cyan' },
      { value: 0.5, label: '1/2', color: 'blue', size: 'lg' },
      { value: 0.75, label: '3/4', color: 'cyan' },
      { value: 1, label: '1', color: 'green' }
    ]
  }
}

export const LargeRange: Story = {
  args: {
    min: 0,
    max: 1000,
    step: 100,
    title: 'Large Range (0 to 1000)',
    marks: [
      { value: 250, label: '250', color: 'yellow' },
      { value: 500, label: '500', color: 'blue', size: 'lg' },
      { value: 750, label: '750', color: 'green' }
    ]
  }
}

export const FullWidth: Story = {
  render: () => (
    <div className="w-full space-y-6">
      <div className="border border-gray-200 p-4 rounded">
        <h4 className="text-sm font-medium mb-2">In a Container</h4>
        <NumberLine
          min={0}
          max={100}
          step={10}
          title="Full Width Number Line"
          marks={[
            { value: 25, label: '25%', color: 'cyan' },
            { value: 50, label: '50%', color: 'blue', size: 'lg' },
            { value: 75, label: '75%', color: 'green' }
          ]}
        />
      </div>

      <div className="max-w-2xl border border-gray-200 p-4 rounded">
        <h4 className="text-sm font-medium mb-2">In a Constrained Container</h4>
        <NumberLine
          min={-10}
          max={10}
          step={5}
          title="Responsive Number Line"
          marks={[
            { value: -5, label: 'Min', color: 'red' },
            { value: 0, label: 'Zero', color: 'blue', size: 'lg' },
            { value: 5, label: 'Max', color: 'green' }
          ]}
        />
      </div>
    </div>
  )
}

export const Segments: Story = {
  args: {
    min: 0,
    max: 10,
    title: 'Line Segments',
    segments: [
      {
        start: 2,
        end: 5,
        label: '2 < x < 5',
        color: 'blue',
        startType: 'open',
        endType: 'open'
      },
      {
        start: 6,
        end: 8,
        label: '6 ≤ x ≤ 8',
        color: 'green',
        startType: 'closed',
        endType: 'closed'
      }
    ]
  }
}

export const Rays: Story = {
  args: {
    min: -5,
    max: 10,
    title: 'Rays',
    rays: [
      {
        value: 3,
        direction: 'right',
        label: 'x > 3',
        color: 'red',
        type: 'open'
      },
      {
        value: -2,
        direction: 'left',
        label: 'x ≤ -2',
        color: 'purple',
        type: 'closed'
      }
    ]
  }
}

export const Combined: Story = {
  render: () => (
    <div className="space-y-6 w-full">
      <NumberLine
        min={-5}
        max={10}
        title="Mixed Elements"
        marks={[{ value: 0, label: 'Origin', color: 'gray', size: 'lg' }]}
        segments={[
          {
            start: 2,
            end: 6,
            label: '2 < x < 6',
            color: 'blue',
            startType: 'open',
            endType: 'open'
          }
        ]}
        rays={[
          {
            value: 8,
            direction: 'right',
            label: 'x ≥ 8',
            color: 'green',
            type: 'closed'
          }
        ]}
      />

      <NumberLine
        min={-10}
        max={10}
        title="Mathematical Inequalities"
        segments={[
          {
            start: -3,
            end: 4,
            label: '-3 ≤ x < 4',
            color: 'orange',
            startType: 'closed',
            endType: 'open'
          }
        ]}
        rays={[
          {
            value: 7,
            direction: 'left',
            label: 'x < 7',
            color: 'red',
            type: 'open'
          }
        ]}
      />
    </div>
  )
}

export const Interactive: Story = {
  render: () => {
    const marks = [
      {
        value: 2,
        label: 'Point A',
        color: 'blue',
        variant: 'arrow' as const
      },
      { value: 5, label: 'Point B', color: 'green', variant: 'dot' as const },
      { value: 8, label: 'Point C', color: 'red', variant: 'tick' as const }
    ]

    return (
      <div className="space-y-4 w-full">
        <NumberLine
          min={0}
          max={10}
          title="Interactive Number Line Example"
          marks={marks}
        />
        <div className="text-sm text-gray-600">
          This number line shows three different types of marks: arrows, dots,
          and ticks.
        </div>
      </div>
    )
  }
}
