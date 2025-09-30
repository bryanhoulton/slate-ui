import type { Meta, StoryObj } from '@storybook/react-vite'

import { args } from '../../utilities'
import { RadarChart } from './'
import { RadarDataPoint } from './RadarChart.types'

// Skills assessment data
const skillsData: RadarDataPoint[] = [
  { axis: 'Communication', value: 85 },
  { axis: 'Leadership', value: 72 },
  { axis: 'Technical', value: 90 },
  { axis: 'Problem Solving', value: 88 },
  { axis: 'Creativity', value: 65 },
  { axis: 'Teamwork', value: 78 }
]

// Product ratings data
const productRatings: RadarDataPoint[] = [
  { axis: 'Quality', value: 4.5 },
  { axis: 'Price', value: 3.8 },
  { axis: 'Support', value: 4.2 },
  { axis: 'Features', value: 4.7 },
  { axis: 'Ease of Use', value: 4.0 }
]

// Performance metrics
const performanceData: RadarDataPoint[] = [
  { axis: 'Speed', value: 92 },
  { axis: 'Reliability', value: 88 },
  { axis: 'Security', value: 95 },
  { axis: 'Scalability', value: 78 },
  { axis: 'Cost', value: 70 },
  { axis: 'Documentation', value: 82 }
]

// Character stats (RPG-style)
const characterStats: RadarDataPoint[] = [
  { axis: 'Strength', value: 18 },
  { axis: 'Dexterity', value: 14 },
  { axis: 'Intelligence', value: 16 },
  { axis: 'Wisdom', value: 12 },
  { axis: 'Charisma', value: 15 },
  { axis: 'Constitution', value: 17 }
]

const meta: Meta<typeof RadarChart> = {
  component: RadarChart,
  title: 'Charts/RadarChart',
  parameters: {
    docs: {
      description: {
        component:
          'A simple radar (spider/web) chart component for visualizing multivariate data. Takes an array of axis/value pairs and renders them as a radar chart.'
      }
    }
  },
  argTypes: args({
    data: {
      description:
        'Array of data points with axis labels and corresponding values',
      control: false
    },
    color: {
      description: 'Color of the radar area (CSS custom property or hex)',
      control: 'text'
    },
    fillOpacity: {
      description: 'Opacity of the filled radar area',
      control: { type: 'number', min: 0, max: 1, step: 0.1 }
    },
    height: {
      description: 'Custom height in pixels',
      control: { type: 'number', min: 200, max: 800, step: 10 }
    }
  })
}

export default meta
type Story = StoryObj<typeof RadarChart>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Basic radar chart showing skill assessment across multiple categories.'
      }
    }
  },
  args: {
    data: skillsData,
    height: 400
  }
}

export const ProductRatings: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Product evaluation radar chart. Useful for comparing product features.'
      }
    }
  },
  args: {
    data: productRatings,
    color: 'var(--color-success)',
    fillOpacity: 0.5,
    height: 350
  }
}

export const PerformanceMetrics: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Technical performance metrics across multiple dimensions.'
      }
    }
  },
  args: {
    data: performanceData,
    color: 'var(--color-info)',
    fillOpacity: 0.7,
    height: 400
  }
}

export const CharacterStats: Story = {
  parameters: {
    docs: {
      description: {
        story: 'RPG-style character statistics display.'
      }
    }
  },
  args: {
    data: characterStats,
    color: 'var(--color-error)',
    fillOpacity: 0.5,
    height: 400
  }
}

export const CustomColor: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Radar chart with custom color and opacity settings.'
      }
    }
  },
  args: {
    data: skillsData,
    color: '#8b5cf6',
    fillOpacity: 0.8,
    height: 400
  }
}

export const LowOpacity: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Radar chart with low fill opacity for a subtle appearance.'
      }
    }
  },
  args: {
    data: performanceData,
    color: 'var(--color-warning)',
    fillOpacity: 0.3,
    height: 400
  }
}

export const LargeDataset: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Radar chart with many axes showing complex data.'
      }
    }
  },
  args: {
    data: [
      { axis: 'A', value: 78 },
      { axis: 'B', value: 85 },
      { axis: 'C', value: 72 },
      { axis: 'D', value: 90 },
      { axis: 'E', value: 68 },
      { axis: 'F', value: 82 },
      { axis: 'G', value: 75 },
      { axis: 'H', value: 88 }
    ],
    height: 450
  }
}

export const SmallChart: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Compact radar chart for dashboards or card layouts.'
      }
    }
  },
  args: {
    data: productRatings,
    color: 'var(--color-secondary)',
    fillOpacity: 0.7,
    height: 250
  }
}
