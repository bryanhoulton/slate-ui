import type {
  Meta,
  StoryObj
} from '@storybook/react-vite'

import {
  args,
  ChartData,
  STORY_SIZES,
  STORY_VARIANTS
} from '../../utilities'
import { PieChart } from './'

// Basic sample data
const sampleData: ChartData[] = [
  { name: 'Desktop', value: 45 },
  { name: 'Mobile', value: 32 },
  { name: 'Tablet', value: 23 }
]

// Market share data
const marketShareData: ChartData[] = [
  { segment: 'Chrome', share: 65.2 },
  { segment: 'Safari', share: 18.8 },
  { segment: 'Edge', share: 4.3 },
  { segment: 'Firefox', share: 3.5 },
  { segment: 'Others', share: 8.2 }
]

// Revenue by department
const departmentData: ChartData[] = [
  { department: 'Sales', revenue: 450000 },
  { department: 'Marketing', revenue: 280000 },
  { department: 'Engineering', revenue: 620000 },
  { department: 'Support', revenue: 180000 },
  { department: 'Operations', revenue: 320000 }
]

// Age demographics
const ageData: ChartData[] = [
  { ageGroup: '18-24', count: 1250 },
  { ageGroup: '25-34', count: 2840 },
  { ageGroup: '35-44', count: 2100 },
  { ageGroup: '45-54', count: 1680 },
  { ageGroup: '55-64', count: 920 },
  { ageGroup: '65+', count: 580 }
]

// Project status
const projectStatusData: ChartData[] = [
  { status: 'Completed', projects: 42 },
  { status: 'In Progress', projects: 28 },
  { status: 'On Hold', projects: 12 },
  { status: 'Cancelled', projects: 8 }
]

// Survey satisfaction
const satisfactionData: ChartData[] = [
  { rating: 'Very Satisfied', responses: 156 },
  { rating: 'Satisfied', responses: 234 },
  { rating: 'Neutral', responses: 87 },
  { rating: 'Dissatisfied', responses: 34 },
  { rating: 'Very Dissatisfied', responses: 12 }
]

const meta: Meta<typeof PieChart> = {
  component: PieChart,
  title: 'Charts/PieChart',
  parameters: {
    docs: {
      description: {
        component:
          'A flexible pie chart component for visualizing proportional data. Built on Recharts with support for custom styling, donut charts, and interactive features.'
      }
    }
  },
  argTypes: args({
    data: {
      description: 'Array of data objects with name and value properties',
      control: false
    },
    nameKey: {
      description: 'Key for slice names/labels',
      control: 'text'
    },
    valueKey: {
      description: 'Key for slice values',
      control: 'text'
    },
    innerRadius: {
      description: 'Inner radius for donut chart (0 for full pie)',
      control: { type: 'number', min: 0, max: 100, step: 5 }
    },
    outerRadius: {
      description: 'Outer radius of the pie chart',
      control: { type: 'number', min: 50, max: 150, step: 5 }
    },
    height: {
      description: 'Custom height in pixels',
      control: { type: 'number', min: 200, max: 600, step: 10 }
    },
    showLabels: {
      description: 'Show/hide slice labels with percentages',
      control: 'boolean'
    },
    showTooltip: {
      description: 'Enable/disable hover tooltips',
      control: 'boolean'
    },
    showLegend: {
      description: 'Show/hide legend',
      control: 'boolean'
    },
    labelLine: {
      description: 'Show/hide lines connecting labels to slices',
      control: 'boolean'
    },
    startAngle: {
      description: 'Starting angle for the first slice',
      control: { type: 'number', min: 0, max: 360, step: 15 }
    },
    endAngle: {
      description: 'Ending angle for the last slice',
      control: { type: 'number', min: 0, max: 360, step: 15 }
    },
    slices: {
      description: 'Configuration for individual slices',
      control: false
    }
  })
}

export default meta
type Story = StoryObj<typeof PieChart>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Basic pie chart with default settings. Perfect for simple proportional data visualization.'
      }
    }
  },
  args: {
    data: sampleData,
    nameKey: 'name',
    valueKey: 'value'
  }
}

export const BrowserMarketShare: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Browser market share visualization with custom slice colors and labels.'
      }
    }
  },
  args: {
    data: marketShareData,
    nameKey: 'segment',
    valueKey: 'share',
    showLabels: true,
    slices: [
      { key: 'Chrome', color: 'primary' },
      { key: 'Safari', color: 'secondary' },
      { key: 'Edge', color: 'info' },
      { key: 'Firefox', color: 'warning' },
      { key: 'Others', color: 'error' }
    ],
    height: 400
  }
}

export const DonutChart: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Donut chart variation with inner radius. Great for displaying totals in the center or creating a modern look.'
      }
    }
  },
  args: {
    data: departmentData,
    nameKey: 'department',
    valueKey: 'revenue',
    innerRadius: 60,
    outerRadius: 100,
    showLabels: false,
    height: 350
  }
}

export const AgeDemographics: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Age demographics with detailed labeling and custom color scheme.'
      }
    }
  },
  args: {
    data: ageData,
    nameKey: 'ageGroup',
    valueKey: 'count',
    showLabels: true,
    labelLine: true,
    slices: [
      { key: '18-24', color: 'info', opacity: 0.8 },
      { key: '25-34', color: 'primary', opacity: 0.9 },
      { key: '35-44', color: 'secondary' },
      { key: '45-54', color: 'success', opacity: 0.8 },
      { key: '55-64', color: 'warning', opacity: 0.7 },
      { key: '65+', color: 'error', opacity: 0.6 }
    ],
    height: 420
  }
}

export const ProjectStatus: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Project status tracking with semantic colors for different states.'
      }
    }
  },
  args: {
    data: projectStatusData,
    nameKey: 'status',
    valueKey: 'projects',
    slices: [
      { key: 'Completed', color: 'success' },
      { key: 'In Progress', color: 'primary' },
      { key: 'On Hold', color: 'warning' },
      { key: 'Cancelled', color: 'error' }
    ],
    innerRadius: 40,
    height: 300
  }
}

export const CustomerSatisfaction: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Customer satisfaction survey results with gradient-like color progression.'
      }
    }
  },
  args: {
    data: satisfactionData,
    nameKey: 'rating',
    valueKey: 'responses',
    showLabels: true,
    slices: [
      { key: 'Very Satisfied', color: 'success' },
      { key: 'Satisfied', color: 'primary' },
      { key: 'Neutral', color: 'secondary' },
      { key: 'Dissatisfied', color: 'warning' },
      { key: 'Very Dissatisfied', color: 'error' }
    ],
    height: 380,
    startAngle: 90,
    endAngle: 450
  }
}

export const HalfPie: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Half pie chart (semicircle) for dashboard gauges or progress indicators.'
      }
    }
  },
  args: {
    data: sampleData,
    nameKey: 'name',
    valueKey: 'value',
    startAngle: 180,
    endAngle: 0,
    innerRadius: 50,
    outerRadius: 90,
    showLabels: false,
    height: 250
  }
}

export const MinimalPie: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Minimal pie chart with no legend or labels. Perfect for embedding in tight spaces.'
      }
    }
  },
  args: {
    data: sampleData,
    nameKey: 'name',
    valueKey: 'value',
    showLegend: false,
    showLabels: false,
    showTooltip: true,
    height: 200,
    outerRadius: 70
  }
}

export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Comparison of all available chart sizes. Shows how the chart adapts to different container sizes.'
      }
    }
  },
  render: () => (
    <div className="space-y-6">
      {STORY_SIZES.map((size) => (
        <div key={size}>
          <h3 className="mb-2 text-lg font-semibold capitalize">{size}</h3>
          <PieChart
            data={sampleData}
            nameKey="name"
            valueKey="value"
            height={size === 'sm' ? 200 : size === 'md' ? 300 : 400}
            outerRadius={size === 'sm' ? 60 : size === 'md' ? 80 : 100}
          />
        </div>
      ))}
    </div>
  )
}

export const ColorVariants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Showcase of different color variants available for pie slices. Each color has semantic meaning.'
      }
    }
  },
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      {STORY_VARIANTS.map((variant) => (
        <div key={variant}>
          <h4 className="mb-2 text-md font-medium capitalize">{variant}</h4>
          <PieChart
            data={[
              { name: 'Primary', value: 60 },
              { name: 'Secondary', value: 40 }
            ]}
            nameKey="name"
            valueKey="value"
            slices={[
              { key: 'Primary', color: variant },
              { key: 'Secondary', color: 'secondary', opacity: 0.6 }
            ]}
            height={200}
            outerRadius={60}
            showLegend={false}
          />
        </div>
      ))}
    </div>
  )
}

export const SingleSlice: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Edge case with single data point. Shows minimal viable chart.'
      }
    }
  },
  args: {
    data: [{ name: 'Total', value: 100 }],
    nameKey: 'name',
    valueKey: 'value',
    slices: [{ key: 'Total', color: 'primary' }],
    height: 200,
    outerRadius: 70
  }
}

export const EmptyData: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Edge case with empty data array. Component should handle gracefully.'
      }
    }
  },
  args: {
    data: [],
    nameKey: 'name',
    valueKey: 'value',
    height: 200
  }
}

export const InteractivePlayground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground with all controls enabled for experimenting with different configurations.'
      }
    }
  },
  args: {
    data: marketShareData,
    nameKey: 'segment',
    valueKey: 'share',
    innerRadius: 0,
    outerRadius: 80,
    showLabels: true,
    showTooltip: true,
    showLegend: true,
    labelLine: true,
    startAngle: 0,
    endAngle: 360,
    height: 350
  }
}
