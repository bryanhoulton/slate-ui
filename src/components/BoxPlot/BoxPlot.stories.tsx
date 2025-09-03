import type {
  Meta,
  StoryObj
} from '@storybook/react-vite'

import {
  args,
  SlateSize,
  STORY_SIZES
} from '../../utilities'
import { BoxPlot } from './'

const meta: Meta<typeof BoxPlot> = {
  component: BoxPlot,
  title: 'Charts/BoxPlot',
  argTypes: args({
    size: {
      control: {
        type: 'select'
      },
      options: STORY_SIZES
    },
    height: {
      control: 'number'
    },
    min: {
      control: 'number'
    },
    q1: {
      control: 'number'
    },
    median: {
      control: 'number'
    },
    q3: {
      control: 'number'
    },
    max: {
      control: 'number'
    }
  })
}

export default meta
type Story = StoryObj<typeof BoxPlot>

export const Default: Story = {
  args: {
    min: 10,
    q1: 25,
    median: 35,
    q3: 45,
    max: 60,
    outliers: [5, 65],
    label: 'Sample Distribution'
  }
}

export const TestScores: Story = {
  args: {
    min: 65,
    q1: 78,
    median: 84,
    q3: 91,
    max: 98,
    outliers: [52, 100],
    label: 'Test Scores Distribution',
    variant: 'info'
  }
}

export const SalesPerformance: Story = {
  args: {
    min: 120,
    q1: 150,
    median: 180,
    q3: 220,
    max: 280,
    outliers: [100, 300],
    label: 'Monthly Sales ($K)',
    variant: 'success'
  }
}

export const WithoutOutliers: Story = {
  args: {
    min: 20,
    q1: 35,
    median: 45,
    q3: 55,
    max: 70,
    label: 'Clean Distribution',
    variant: 'secondary'
  }
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      {STORY_SIZES.map((size: SlateSize) => (
        <div key={size}>
          <h3 className="mb-2 text-lg font-semibold capitalize">{size}</h3>
          <BoxPlot
            size={size}
            min={10}
            q1={25}
            median={35}
            q3={45}
            max={60}
            outliers={[5, 65]}
            label={`${size.charAt(0).toUpperCase() + size.slice(1)} Size`}
            height={size === 'sm' ? 60 : size === 'md' ? 80 : 100}
          />
        </div>
      ))}
    </div>
  )
}

export const MultipleBoxPlots: Story = {
  render: () => (
    <div className="space-y-4">
      <BoxPlot
        min={85}
        q1={92}
        median={95}
        q3={98}
        max={100}
        outliers={[80, 102]}
        label="Q1 2023 Performance"
        variant="primary"
      />
      <BoxPlot
        min={88}
        q1={94}
        median={97}
        q3={99}
        max={102}
        outliers={[82, 105]}
        label="Q2 2023 Performance"
        variant="secondary"
      />
      <BoxPlot
        min={90}
        q1={95}
        median={98}
        q3={101}
        max={104}
        outliers={[85, 107]}
        label="Q3 2023 Performance"
        variant="success"
      />
      <BoxPlot
        min={87}
        q1={93}
        median={96}
        q3={100}
        max={103}
        outliers={[83, 106]}
        label="Q4 2023 Performance"
        variant="info"
      />
    </div>
  )
}

export const CustomHeight: Story = {
  args: {
    min: 15,
    q1: 28,
    median: 35,
    q3: 42,
    max: 58,
    outliers: [8, 62],
    label: 'Tall Box Plot',
    height: 120,
    variant: 'warning'
  }
}
