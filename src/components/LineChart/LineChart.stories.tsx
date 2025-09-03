import type {
  Meta,
  StoryObj
} from '@storybook/react-vite'

import {
  args,
  ChartData,
  SlateSize,
  STORY_SIZES
} from '../../utilities'
import { LineChart } from './'

const sampleData: ChartData[] = [
  { month: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
  { month: 'Feb', revenue: 3000, expenses: 1398, profit: 1602 },
  { month: 'Mar', revenue: 2000, expenses: 9800, profit: -7800 },
  { month: 'Apr', revenue: 2780, expenses: 3908, profit: -1128 },
  { month: 'May', revenue: 1890, expenses: 4800, profit: -2910 },
  { month: 'Jun', revenue: 2390, expenses: 3800, profit: -1410 },
  { month: 'Jul', revenue: 3490, expenses: 4300, profit: -810 }
]

const simpleData: ChartData[] = [
  { x: 1, y: 10 },
  { x: 2, y: 20 },
  { x: 3, y: 15 },
  { x: 4, y: 25 },
  { x: 5, y: 30 },
  { x: 6, y: 22 },
  { x: 7, y: 35 }
]

const meta: Meta<typeof LineChart> = {
  component: LineChart,
  title: 'Charts/LineChart',
  argTypes: args({
    size: {
      control: {
        type: 'select'
      },
      options: STORY_SIZES
    },
    showGrid: {
      control: 'boolean'
    },
    showTooltip: {
      control: 'boolean'
    },
    showLegend: {
      control: 'boolean'
    },
    showXAxis: {
      control: 'boolean'
    },
    showYAxis: {
      control: 'boolean'
    },
    height: {
      control: 'number'
    }
  })
}

export default meta
type Story = StoryObj<typeof LineChart>

export const Default: Story = {
  args: {
    data: simpleData,
    xKey: 'x',
    yKey: 'y',
    xAxisLabel: 'Time Period',
    yAxisLabel: 'Value'
  }
}

export const MultipleLines: Story = {
  args: {
    data: sampleData,
    xKey: 'month',
    lines: [
      { key: 'revenue', color: 'primary' },
      { key: 'expenses', color: 'error' },
      { key: 'profit', color: 'success' }
    ],
    height: 400,
    xAxisLabel: 'Month',
    yAxisLabel: 'Amount ($)'
  }
}

export const WithCustomStyling: Story = {
  args: {
    data: sampleData,
    xKey: 'month',
    lines: [
      { key: 'revenue', color: 'primary', strokeWidth: 3 },
      { key: 'expenses', color: 'secondary', strokeDasharray: '5 5' }
    ],
    showGrid: false,
    height: 350
  }
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      {STORY_SIZES.map((size: SlateSize) => (
        <div key={size}>
          <h3 className="mb-2 text-lg font-semibold capitalize">{size}</h3>
          <LineChart
            data={simpleData}
            xKey="x"
            yKey="y"
            height={size === 'sm' ? 200 : size === 'md' ? 300 : 400}
          />
        </div>
      ))}
    </div>
  )
}

export const MinimalChart: Story = {
  args: {
    data: simpleData,
    xKey: 'x',
    yKey: 'y',
    showGrid: false,
    height: 150
  }
}

export const BusinessMetrics: Story = {
  args: {
    data: [
      { quarter: 'Q1', users: 1200, conversions: 240, revenue: 48000 },
      { quarter: 'Q2', users: 1800, conversions: 380, revenue: 76000 },
      { quarter: 'Q3', users: 2200, conversions: 460, revenue: 92000 },
      { quarter: 'Q4', users: 2800, conversions: 580, revenue: 116000 }
    ] as ChartData[],
    xKey: 'quarter',
    lines: [
      { key: 'users', color: 'info' },
      { key: 'conversions', color: 'warning' },
      { key: 'revenue', color: 'success' }
    ],
    height: 400,
    xAxisLabel: 'Quarter',
    yAxisLabel: 'Metrics'
  }
}
