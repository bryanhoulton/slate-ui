import type {
  Meta,
  StoryObj
} from '@storybook/react-vite'

import { ChartData } from '../../utilities'
import { ScatterPlot } from './'

// Basic sample data
const sampleData: ChartData[] = [
  { x: 10, y: 25 },
  { x: 15, y: 30 },
  { x: 20, y: 22 },
  { x: 25, y: 35 },
  { x: 30, y: 28 },
  { x: 35, y: 40 },
  { x: 40, y: 33 },
  { x: 45, y: 45 },
  { x: 50, y: 38 },
  { x: 55, y: 50 }
]

// Height vs Weight data
const heightWeightData: ChartData[] = [
  { height: 160, weight: 55, age: 25 },
  { height: 165, weight: 62, age: 30 },
  { height: 170, weight: 68, age: 28 },
  { height: 175, weight: 75, age: 35 },
  { height: 180, weight: 82, age: 32 },
  { height: 185, weight: 88, age: 40 },
  { height: 155, weight: 50, age: 22 },
  { height: 162, weight: 58, age: 27 },
  { height: 178, weight: 78, age: 38 },
  { height: 172, weight: 70, age: 29 }
]

// Sales performance data
const performanceData: ChartData[] = [
  { experience: 1, sales: 15, satisfaction: 3.2 },
  { experience: 2, sales: 25, satisfaction: 3.8 },
  { experience: 3, sales: 35, satisfaction: 4.1 },
  { experience: 4, sales: 42, satisfaction: 4.3 },
  { experience: 5, sales: 55, satisfaction: 4.6 },
  { experience: 6, sales: 48, satisfaction: 4.4 },
  { experience: 7, sales: 62, satisfaction: 4.7 },
  { experience: 8, sales: 58, satisfaction: 4.5 },
  { experience: 9, sales: 72, satisfaction: 4.8 },
  { experience: 10, sales: 68, satisfaction: 4.9 }
]

// Multi-series data
const multiSeriesData: ChartData[] = [
  { x: 10, seriesA: 25, seriesB: 15, seriesC: 35 },
  { x: 20, seriesA: 30, seriesB: 22, seriesC: 28 },
  { x: 30, seriesA: 22, seriesB: 35, seriesC: 40 },
  { x: 40, seriesA: 35, seriesB: 28, seriesC: 33 },
  { x: 50, seriesA: 28, seriesB: 40, seriesC: 45 },
  { x: 60, seriesA: 40, seriesB: 33, seriesC: 38 },
  { x: 70, seriesA: 33, seriesB: 45, seriesC: 50 }
]

const meta: Meta<typeof ScatterPlot> = {
  title: 'Charts/ScatterPlot',
  component: ScatterPlot,
  parameters: {
    docs: {
      description: {
        component:
          'A scatter plot component for visualizing correlations between two variables. Built on Recharts with customizable styling and multiple data series support.'
      }
    }
  },
  argTypes: {
    data: {
      description: 'Array of data objects to display',
      control: false
    },
    xKey: {
      description: 'Key for x-axis values',
      control: 'text'
    },
    yKey: {
      description: 'Key for y-axis values',
      control: 'text'
    },
    scatters: {
      description: 'Configuration for scatter series',
      control: false
    },
    showGrid: {
      description: 'Whether to show grid lines',
      control: 'boolean'
    },
    xAxisLabel: {
      description: 'Label for x-axis',
      control: 'text'
    },
    yAxisLabel: {
      description: 'Label for y-axis',
      control: 'text'
    },
    height: {
      description: 'Chart height in pixels',
      control: 'number'
    },
    width: {
      description: 'Chart width (defaults to 100%)',
      control: 'text'
    },
    dotSize: {
      description: 'Default size for scatter dots',
      control: 'number'
    },
    margin: {
      description: 'Chart margins',
      control: false
    }
  },
  args: {
    data: sampleData,
    xKey: 'x',
    yKey: 'y',
    showGrid: true,
    height: 300,
    dotSize: 4
  }
}

export default meta
type Story = StoryObj<typeof ScatterPlot>

// Basic scatter plot
export const Default: Story = {
  args: {
    data: sampleData,
    xAxisLabel: 'X Values',
    yAxisLabel: 'Y Values',
    scatters: [{ key: 'y', color: 'primary' }]
  }
}

// Height vs Weight correlation
export const HeightWeight: Story = {
  args: {
    data: heightWeightData,
    xKey: 'height',
    yKey: 'weight',
    xAxisLabel: 'Height (cm)',
    yAxisLabel: 'Weight (kg)',
    scatters: [{ key: 'weight', color: 'primary', size: 6 }]
  }
}

// Sales performance analysis
export const SalesPerformance: Story = {
  args: {
    data: performanceData,
    xKey: 'experience',
    yKey: 'sales',
    xAxisLabel: 'Years of Experience',
    yAxisLabel: 'Sales (units)',
    scatters: [{ key: 'sales', color: 'secondary', size: 5 }],
    height: 350
  }
}

// Multiple series scatter plot
export const MultiSeries: Story = {
  args: {
    data: multiSeriesData,
    xKey: 'x',
    scatters: [
      { key: 'seriesA', color: 'primary', size: 4 },
      { key: 'seriesB', color: 'secondary', size: 4 },
      { key: 'seriesC', color: 'success', size: 4 }
    ],
    xAxisLabel: 'X Values',
    yAxisLabel: 'Y Values',
    height: 400
  }
}

// Large dots
export const LargeDots: Story = {
  args: {
    data: sampleData,
    dotSize: 8,
    scatters: [{ key: 'y', color: 'warning', opacity: 0.7 }],
    xAxisLabel: 'X Values',
    yAxisLabel: 'Y Values'
  }
}

// No grid
export const NoGrid: Story = {
  args: {
    data: sampleData,
    showGrid: false,
    scatters: [{ key: 'y', color: 'error' }],
    xAxisLabel: 'X Values',
    yAxisLabel: 'Y Values'
  }
}

// Custom styling
export const CustomStyling: Story = {
  args: {
    data: sampleData,
    scatters: [{ key: 'y', color: 'primary' }],
    xAxisLabel: 'X Values',
    yAxisLabel: 'Y Values',
    className: 'bg-gray-50',
    styles: {
      root: { border: '2px solid #3b82f6' },
      chart: { backgroundColor: '#f8fafc' },
      tooltip: { backgroundColor: '#1f2937', color: 'white' }
    }
  }
}

// Different sizes
export const Small: Story = {
  args: {
    data: sampleData,
    height: 200,
    scatters: [{ key: 'y', color: 'primary', size: 3 }],
    xAxisLabel: 'X Values',
    yAxisLabel: 'Y Values'
  }
}

export const Large: Story = {
  args: {
    data: sampleData,
    height: 500,
    scatters: [{ key: 'y', color: 'primary', size: 6 }],
    xAxisLabel: 'X Values',
    yAxisLabel: 'Y Values'
  }
}

// Real-world example: Customer satisfaction vs price
const satisfactionData: ChartData[] = [
  { price: 10, satisfaction: 3.2, customers: 150 },
  { price: 15, satisfaction: 3.8, customers: 120 },
  { price: 20, satisfaction: 4.1, customers: 100 },
  { price: 25, satisfaction: 4.3, customers: 85 },
  { price: 30, satisfaction: 4.6, customers: 70 },
  { price: 35, satisfaction: 4.4, customers: 60 },
  { price: 40, satisfaction: 4.7, customers: 45 },
  { price: 45, satisfaction: 4.5, customers: 40 },
  { price: 50, satisfaction: 4.8, customers: 30 },
  { price: 55, satisfaction: 4.9, customers: 25 }
]

export const CustomerSatisfaction: Story = {
  args: {
    data: satisfactionData,
    xKey: 'price',
    yKey: 'satisfaction',
    scatters: [{ key: 'satisfaction', color: 'success', size: 5 }],
    xAxisLabel: 'Price ($)',
    yAxisLabel: 'Customer Satisfaction (1-5)',
    height: 350
  }
}
