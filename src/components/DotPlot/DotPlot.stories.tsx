import type {
  Meta,
  StoryObj
} from '@storybook/react-vite'

import {
  args,
  STORY_VARIANTS
} from '../../utilities'
import { DotPlot } from './'

// Basic sample data
const sampleData = [
  { category: 'A', count: 5 },
  { category: 'B', count: 3 },
  { category: 'C', count: 8 },
  { category: 'D', count: 2 },
  { category: 'E', count: 6 }
]

// Customer satisfaction survey
const surveyData = [
  { category: 'Excellent', count: 12 },
  { category: 'Good', count: 18 },
  { category: 'Fair', count: 8 },
  { category: 'Poor', count: 3 }
]

// Student grade distribution
const gradeData = [
  { category: 'A', count: 4 },
  { category: 'B', count: 7 },
  { category: 'C', count: 12 },
  { category: 'D', count: 5 },
  { category: 'F', count: 2 }
]

// Website traffic by device
const deviceData = [
  { category: 'Desktop', count: 24 },
  { category: 'Mobile', count: 32 },
  { category: 'Tablet', count: 8 },
  { category: 'Other', count: 2 }
]

// Bug severity distribution
const bugData = [
  { category: 'Critical', count: 2 },
  { category: 'High', count: 5 },
  { category: 'Medium', count: 12 },
  { category: 'Low', count: 18 },
  { category: 'Trivial', count: 8 }
]

// Employee department distribution
const departmentData = [
  { category: 'Engineering', count: 15 },
  { category: 'Design', count: 6 },
  { category: 'Product', count: 4 },
  { category: 'Marketing', count: 8 },
  { category: 'Sales', count: 10 },
  { category: 'Support', count: 7 }
]

// Age group distribution
const ageData = [
  { category: '18-24', count: 8 },
  { category: '25-34', count: 22 },
  { category: '35-44', count: 18 },
  { category: '45-54', count: 12 },
  { category: '55-64', count: 6 },
  { category: '65+', count: 3 }
]

const meta: Meta<typeof DotPlot> = {
  component: DotPlot,
  title: 'Charts/DotPlot',
  parameters: {
    docs: {
      description: {
        component:
          'A dot plot visualization for displaying categorical data distributions using dots arranged in columns. Perfect for showing frequency distributions, survey results, and categorical counts.'
      }
    }
  },
  argTypes: args({
    data: {
      description: 'Array of data points with category and count values',
      control: false
    },
    label: {
      description: 'Chart title displayed at the top',
      control: 'text'
    },
    variant: {
      description: 'Visual style variant affecting dot colors',
      control: 'select',
      options: STORY_VARIANTS
    },
    height: {
      description: 'Custom height in pixels',
      control: { type: 'number', min: 100, max: 600, step: 10 }
    },
    dotSize: {
      description: 'Size of individual dots in pixels',
      control: { type: 'number', min: 4, max: 20, step: 1 }
    },
    binSize: {
      description: 'Number of dots per column before creating a new column',
      control: { type: 'number', min: 1, max: 10, step: 1 }
    }
  })
}

export default meta
type Story = StoryObj<typeof DotPlot>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Basic dot plot with simple categorical data. Each dot represents one unit of count.'
      }
    }
  },
  args: {
    data: sampleData,
    label: 'Basic Category Distribution'
  }
}

export const CustomerSatisfaction: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Survey results visualization showing customer satisfaction ratings. Great for displaying feedback data.'
      }
    }
  },
  args: {
    data: surveyData,
    label: 'Customer Satisfaction Survey',
    variant: 'info',
    height: 250
  }
}

export const StudentGrades: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Academic grade distribution with custom dot size. Perfect for educational dashboards.'
      }
    }
  },
  args: {
    data: gradeData,
    label: 'Student Grade Distribution',
    variant: 'secondary',
    height: 200,
    dotSize: 10
  }
}

export const WebsiteTraffic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Device usage analytics showing traffic distribution across different device types.'
      }
    }
  },
  args: {
    data: deviceData,
    label: 'Website Traffic by Device',
    variant: 'success',
    height: 280,
    dotSize: 12
  }
}

export const BugSeverity: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Bug tracking dashboard showing issue severity distribution. Uses warning variant to indicate attention needed.'
      }
    }
  },
  args: {
    data: bugData,
    label: 'Bug Severity Distribution',
    variant: 'warning',
    height: 240,
    dotSize: 8
  }
}

export const TeamStructure: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Organizational chart showing employee distribution across departments.'
      }
    }
  },
  args: {
    data: departmentData,
    label: 'Team Structure by Department',
    variant: 'primary',
    height: 300,
    dotSize: 10
  }
}

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Showcase of all available color variants. Each variant conveys different semantic meaning.'
      }
    }
  },
  render: () => (
    <div className="space-y-6">
      {STORY_VARIANTS.map((variant) => (
        <div key={variant}>
          <h3 className="mb-2 text-lg font-semibold capitalize">{variant}</h3>
          <DotPlot
            variant={variant}
            data={sampleData}
            label={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Variant`}
            height={200}
          />
        </div>
      ))}
    </div>
  )
}

export const DotSizeComparison: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Comparison of different dot sizes. Larger dots are more prominent but require more space.'
      }
    }
  },
  render: () => (
    <div className="space-y-6">
      <DotPlot
        data={sampleData}
        label="Small Dots (6px)"
        dotSize={6}
        height={150}
        variant="primary"
      />
      <DotPlot
        data={sampleData}
        label="Medium Dots (10px)"
        dotSize={10}
        height={180}
        variant="secondary"
      />
      <DotPlot
        data={sampleData}
        label="Large Dots (16px)"
        dotSize={16}
        height={220}
        variant="success"
      />
      <DotPlot
        data={sampleData}
        label="Extra Large Dots (20px)"
        dotSize={20}
        height={260}
        variant="info"
      />
    </div>
  )
}

export const BinSizeComparison: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Different bin sizes affect how dots are stacked. Smaller bin sizes create more columns.'
      }
    }
  },
  render: () => (
    <div className="space-y-6">
      <DotPlot
        data={ageData}
        label="Bin Size: 3 (More Columns)"
        binSize={3}
        height={200}
        variant="primary"
      />
      <DotPlot
        data={ageData}
        label="Bin Size: 5 (Default)"
        binSize={5}
        height={200}
        variant="secondary"
      />
      <DotPlot
        data={ageData}
        label="Bin Size: 8 (Fewer Columns)"
        binSize={8}
        height={200}
        variant="success"
      />
    </div>
  )
}

export const HighVolume: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Handling large count values with appropriate binning and spacing.'
      }
    }
  },
  args: {
    data: [
      { category: 'Low', count: 8 },
      { category: 'Medium', count: 25 },
      { category: 'High', count: 42 },
      { category: 'Critical', count: 15 }
    ],
    label: 'High Volume Response Distribution',
    height: 350,
    dotSize: 8,
    binSize: 6,
    variant: 'warning'
  }
}

export const EmptyState: Story = {
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
    label: 'No Data Available',
    height: 150
  }
}

export const SingleDataPoint: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Edge case with only one data point. Shows minimal viable chart.'
      }
    }
  },
  args: {
    data: [{ category: 'Score', count: 15 }],
    label: 'Single Category Result',
    height: 180,
    variant: 'info'
  }
}

export const ZeroCounts: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Edge case handling categories with zero counts. Should display category labels without dots.'
      }
    }
  },
  args: {
    data: [
      { category: 'Active', count: 12 },
      { category: 'Inactive', count: 0 },
      { category: 'Pending', count: 5 },
      { category: 'Cancelled', count: 0 }
    ],
    label: 'User Status Distribution',
    variant: 'subtle',
    height: 200
  }
}

export const DemographicsAnalysis: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Real-world example showing age group demographics with optimized visualization settings.'
      }
    }
  },
  args: {
    data: ageData,
    label: 'User Demographics by Age Group',
    variant: 'info',
    height: 320,
    dotSize: 12,
    binSize: 4
  }
}

export const CompactView: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Minimal, space-efficient dot plot perfect for dashboards and small spaces.'
      }
    }
  },
  args: {
    data: [
      { category: 'Q1', count: 8 },
      { category: 'Q2', count: 12 },
      { category: 'Q3', count: 15 },
      { category: 'Q4', count: 11 }
    ],
    label: 'Quarterly Performance',
    height: 120,
    dotSize: 6,
    binSize: 4,
    variant: 'default'
  }
}

export const WithoutLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Dot plot without a title label for embedding in custom layouts.'
      }
    }
  },
  args: {
    data: surveyData,
    variant: 'primary',
    height: 200,
    dotSize: 10
  }
}

export const InteractivePlayground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive story with all controls enabled for experimenting with different configurations.'
      }
    }
  },
  args: {
    data: departmentData,
    label: 'Interactive Dot Plot',
    variant: 'primary',
    height: 300,
    dotSize: 10,
    binSize: 5
  }
}
