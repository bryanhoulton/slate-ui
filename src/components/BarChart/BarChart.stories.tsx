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
import { BarChart } from './'

// Basic sample data
const sampleData: ChartData[] = [
  { category: 'A', value: 45 },
  { category: 'B', value: 32 },
  { category: 'C', value: 67 },
  { category: 'D', value: 28 },
  { category: 'E', value: 54 }
]

// Monthly revenue data
const revenueData: ChartData[] = [
  { month: 'Jan', revenue: 42000, expenses: 28000, profit: 14000 },
  { month: 'Feb', revenue: 38000, expenses: 25000, profit: 13000 },
  { month: 'Mar', revenue: 52000, expenses: 32000, profit: 20000 },
  { month: 'Apr', revenue: 48000, expenses: 30000, profit: 18000 },
  { month: 'May', revenue: 55000, expenses: 33000, profit: 22000 },
  { month: 'Jun', revenue: 61000, expenses: 35000, profit: 26000 }
]

// Product sales data
const salesData: ChartData[] = [
  { product: 'Laptops', q1: 120, q2: 145, q3: 160, q4: 180 },
  { product: 'Phones', q1: 200, q2: 220, q3: 240, q4: 280 },
  { product: 'Tablets', q1: 80, q2: 85, q3: 90, q4: 95 },
  { product: 'Accessories', q1: 150, q2: 165, q3: 170, q4: 190 }
]

// Website metrics
const websiteData: ChartData[] = [
  { page: 'Home', views: 1250, clicks: 89, conversions: 12 },
  { page: 'Products', views: 980, clicks: 156, conversions: 28 },
  { page: 'About', views: 420, clicks: 32, conversions: 3 },
  { page: 'Contact', views: 180, clicks: 45, conversions: 8 },
  { page: 'Blog', views: 650, clicks: 78, conversions: 5 }
]

// Survey response counts
const surveyData: ChartData[] = [
  { response: 'Strongly Agree', count: 45 },
  { response: 'Agree', count: 78 },
  { response: 'Neutral', count: 23 },
  { response: 'Disagree', count: 12 },
  { response: 'Strongly Disagree', count: 5 }
]

const meta: Meta<typeof BarChart> = {
  component: BarChart,
  title: 'Charts/BarChart',
  parameters: {
    docs: {
      description: {
        component:
          'A flexible bar chart component for visualizing categorical data. Built on Recharts with support for multiple data series, custom styling, and interactive features.'
      }
    }
  },
  argTypes: args({
    data: {
      description: 'Array of data objects with category and value properties',
      control: false
    },
    xKey: {
      description: 'Key for x-axis (category) values',
      control: 'text'
    },
    yKey: {
      description: 'Key for y-axis (value) values when using single bar',
      control: 'text'
    },
    bars: {
      description: 'Configuration for multiple bars/series',
      control: false
    },
    size: {
      description: 'Overall size of the chart',
      control: 'select',
      options: STORY_SIZES
    },
    height: {
      description: 'Custom height in pixels',
      control: { type: 'number', min: 200, max: 800, step: 10 }
    },
    showGrid: {
      description: 'Show/hide grid lines',
      control: 'boolean'
    },
    showTooltip: {
      description: 'Enable/disable hover tooltips',
      control: 'boolean'
    },
    showLegend: {
      description: 'Show/hide legend for multiple series',
      control: 'boolean'
    },
    showXAxis: {
      description: 'Show/hide x-axis',
      control: 'boolean'
    },
    showYAxis: {
      description: 'Show/hide y-axis',
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
    barGap: {
      description: 'Gap between bars in the same category',
      control: { type: 'number', min: 0, max: 20, step: 1 }
    },
    categoryGap: {
      description: 'Gap between categories (percentage)',
      control: { type: 'range', min: 0, max: 50, step: 5 }
    }
  })
}

export default meta
type Story = StoryObj<typeof BarChart>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Basic bar chart with single data series. Perfect for simple categorical comparisons.'
      }
    }
  },
  args: {
    data: sampleData,
    xKey: 'category',
    yKey: 'value',
    xAxisLabel: 'Categories',
    yAxisLabel: 'Values'
  }
}

export const MonthlyRevenue: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Financial dashboard showing monthly revenue trends. Single bar series with success color variant.'
      }
    }
  },
  args: {
    data: revenueData,
    xKey: 'month',
    bars: [{ key: 'revenue', color: 'success' }],
    xAxisLabel: 'Month',
    yAxisLabel: 'Revenue ($)',
    height: 350
  }
}

export const MultipleSeries: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Multi-series bar chart comparing revenue, expenses, and profit. Shows how to use multiple bars with different colors.'
      }
    }
  },
  args: {
    data: revenueData,
    xKey: 'month',
    bars: [
      { key: 'revenue', color: 'primary' },
      { key: 'expenses', color: 'error' },
      { key: 'profit', color: 'success' }
    ],
    height: 400,
    xAxisLabel: 'Month',
    yAxisLabel: 'Amount ($)'
  }
}

export const QuarterlySales: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Product performance across quarters. Demonstrates multiple data series with clear category grouping.'
      }
    }
  },
  args: {
    data: salesData,
    xKey: 'product',
    bars: [
      { key: 'q1', color: 'info' },
      { key: 'q2', color: 'primary' },
      { key: 'q3', color: 'warning' },
      { key: 'q4', color: 'success' }
    ],
    height: 380,
    xAxisLabel: 'Product Category',
    yAxisLabel: 'Units Sold',
    barGap: 2
  }
}

export const WebsiteAnalytics: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Website performance metrics showing views, clicks, and conversions per page.'
      }
    }
  },
  args: {
    data: websiteData,
    xKey: 'page',
    bars: [
      { key: 'views', color: 'info', opacity: 0.8 },
      { key: 'clicks', color: 'warning', opacity: 0.9 },
      { key: 'conversions', color: 'success' }
    ],
    height: 350,
    xAxisLabel: 'Page',
    yAxisLabel: 'Count'
  }
}

export const SurveyResults: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Survey response visualization with semantic color coding for feedback analysis.'
      }
    }
  },
  args: {
    data: surveyData,
    xKey: 'response',
    yKey: 'count',
    bars: [{ key: 'count', color: 'secondary' }],
    height: 280,
    xAxisLabel: 'Response',
    yAxisLabel: 'Number of Responses'
  }
}

export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Comparison of all available chart sizes. Shows how padding and spacing adapt to different sizes.'
      }
    }
  },
  render: () => (
    <div className="space-y-6">
      {STORY_SIZES.map((size) => (
        <div key={size}>
          <h3 className="mb-2 text-lg font-semibold capitalize">{size}</h3>
          <BarChart
            sizes={size}
            data={sampleData}
            xKey="category"
            yKey="value"
            height={size === 'sm' ? 200 : size === 'md' ? 300 : 400}
            xAxisLabel={`${size.toUpperCase()} Chart`}
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
          'Showcase of different color variants available for bars. Each color has semantic meaning.'
      }
    }
  },
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      {STORY_VARIANTS.map((variant) => (
        <div key={variant}>
          <h4 className="mb-2 text-md font-medium capitalize">{variant}</h4>
          <BarChart
            data={sampleData.slice(0, 3)}
            xKey="category"
            bars={[{ key: 'value', color: variant }]}
            height={200}
            sizes="sm"
          />
        </div>
      ))}
    </div>
  )
}

export const CustomStyling: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Bar chart with custom styling options including opacity, gaps, and rounded corners.'
      }
    }
  },
  args: {
    data: revenueData,
    xKey: 'month',
    bars: [
      { key: 'revenue', color: 'primary', opacity: 0.7 },
      { key: 'expenses', color: 'error', opacity: 0.8 }
    ],
    height: 320,
    barGap: 8,
    categoryGap: 30,
    xAxisLabel: 'Month',
    yAxisLabel: 'Amount'
  }
}

export const MinimalChart: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Minimal bar chart with all decorative elements hidden. Perfect for embedding in tight spaces.'
      }
    }
  },
  args: {
    data: sampleData,
    xKey: 'category',
    yKey: 'value',
    showGrid: false,
    height: 150
  }
}

export const SingleBar: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Edge case with single data point. Shows minimal viable chart.'
      }
    }
  },
  args: {
    data: [{ category: 'Total', value: 100 }],
    xKey: 'category',
    yKey: 'value',
    bars: [{ key: 'value', color: 'info' }],
    height: 200,
    xAxisLabel: 'Category',
    yAxisLabel: 'Count'
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
    xKey: 'category',
    yKey: 'value',
    height: 200,
    xAxisLabel: 'No Data',
    yAxisLabel: 'Values'
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
    data: revenueData,
    xKey: 'month',
    bars: [
      { key: 'revenue', color: 'primary' },
      { key: 'expenses', color: 'warning' }
    ],
    showGrid: true,
    height: 350,
    barGap: 4,
    categoryGap: 20,
    xAxisLabel: 'Time Period',
    yAxisLabel: 'Amount ($)'
  }
}
