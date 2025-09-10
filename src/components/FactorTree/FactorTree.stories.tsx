import type {
  Meta,
  StoryObj
} from '@storybook/react'

import { FactorTreeNode } from './FactorTree.types'
import { FactorTree } from './index'

const meta: Meta<typeof FactorTree> = {
  title: 'Diagrams/FactorTree',
  component: FactorTree,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The FactorTree component visualizes the prime factorization of numbers as an interactive tree diagram. 
It automatically calculates factors or accepts custom tree structures.

## Features
- Automatic prime factorization
- Custom tree structures
- Configurable colors and sizes
- Prime/composite number legend
- Responsive SVG rendering
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: 'Number to factor or custom tree structure',
      control: { type: 'number', min: 2, max: 1000 }
    },
    nodeSize: {
      description: 'Size of the tree nodes',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    showTitle: {
      description: 'Whether to show the title',
      control: { type: 'boolean' }
    },
    autoFactor: {
      description: 'Whether to automatically calculate factors',
      control: { type: 'boolean' }
    },
    primeColor: {
      description: 'Color for prime factor nodes',
      control: { type: 'color' }
    },
    compositeColor: {
      description: 'Color for composite nodes',
      control: { type: 'color' }
    },
    lineColor: {
      description: 'Color for connecting lines',
      control: { type: 'color' }
    },
    levelSpacing: {
      description: 'Vertical spacing between tree levels',
      control: { type: 'range', min: 40, max: 120, step: 10 }
    },
    nodeSpacing: {
      description: 'Horizontal spacing between sibling nodes',
      control: { type: 'range', min: 40, max: 100, step: 10 }
    }
  }
}

export default meta

type Story = StoryObj<typeof FactorTree>

export const Default: Story = {
  args: {
    data: 24,
    showTitle: true,
    nodeSize: 'md',
    autoFactor: true
  }
}

export const SimpleNumber: Story = {
  args: {
    data: 12,
    showTitle: true,
    title: 'Factor Tree: 12 = 2² × 3'
  }
}

export const LargerNumber: Story = {
  args: {
    data: 60,
    showTitle: true,
    nodeSize: 'sm'
  }
}

export const PrimeNumber: Story = {
  args: {
    data: 17,
    showTitle: true,
    title: '17 is Prime!'
  }
}

export const CustomColors: Story = {
  args: {
    data: 36,
    primeColor: '#dc2626',
    compositeColor: '#7c3aed',
    lineColor: '#059669',
    showTitle: true
  }
}

export const LargeNodes: Story = {
  args: {
    data: 18,
    nodeSize: 'lg',
    levelSpacing: 100,
    nodeSpacing: 80
  }
}

export const CompactSpacing: Story = {
  args: {
    data: 48,
    nodeSize: 'sm',
    levelSpacing: 50,
    nodeSpacing: 40
  }
}

// Custom tree structure example
const customTree: FactorTreeNode = {
  value: 100,
  isPrime: false,
  children: [
    {
      value: 4,
      isPrime: false,
      children: [
        { value: 2, isPrime: true },
        { value: 2, isPrime: true }
      ]
    },
    {
      value: 25,
      isPrime: false,
      children: [
        { value: 5, isPrime: true },
        { value: 5, isPrime: true }
      ]
    }
  ]
}

export const CustomTreeStructure: Story = {
  args: {
    data: customTree,
    showTitle: true,
    title: 'Custom Factor Tree: 100 = 2² × 5²',
    autoFactor: false
  }
}

// Complex number example
export const ComplexNumber: Story = {
  args: {
    data: 84,
    showTitle: true,
    title: 'Prime Factorization of 84'
  }
}

export const VeryLargeNumber: Story = {
  args: {
    data: 144,
    nodeSize: 'sm',
    levelSpacing: 60,
    nodeSpacing: 45,
    showTitle: true
  }
}

// Without title
export const NoTitle: Story = {
  args: {
    data: 30,
    showTitle: false,
    nodeSize: 'md'
  }
}

// Educational examples with different styling
export const Educational: Story = {
  args: {
    data: 72,
    primeColor: '#059669',
    compositeColor: '#3b82f6',
    showTitle: true,
    title: 'Find the Prime Factors of 72'
  }
}
