import type {
  Meta,
  StoryObj
} from '@storybook/react'

import { FractionDiagram } from './index'

const meta: Meta<typeof FractionDiagram> = {
  title: 'Diagrams/FractionDiagram',
  component: FractionDiagram,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['grid', 'pie']
    },
    size: {
      control: { type: 'range', min: 100, max: 400, step: 10 }
    },
    showLabel: {
      control: { type: 'boolean' }
    },
    fillColor: {
      control: { type: 'color' }
    },
    emptyColor: {
      control: { type: 'color' }
    },
    gridColumns: {
      control: { type: 'number', min: 1 }
    },
    gridGap: {
      control: { type: 'range', min: 0, max: 10, step: 1 }
    },
    spacing: {
      control: { type: 'range', min: 0, max: 50, step: 2 }
    }
  }
}

export default meta
type Story = StoryObj<typeof FractionDiagram>

export const GridDefault: Story = {
  args: {
    fractions: { numerator: 3, denominator: 4 },
    type: 'grid'
  }
}

export const PieDefault: Story = {
  args: {
    fractions: { numerator: 3, denominator: 4 },
    type: 'pie'
  }
}

export const GridSimple: Story = {
  args: {
    fractions: { numerator: 1, denominator: 2 },
    type: 'grid',
    size: 150
  }
}

export const GridThirds: Story = {
  args: {
    fractions: { numerator: 2, denominator: 3 },
    type: 'grid',
    size: 180
  }
}

export const GridComplex: Story = {
  args: {
    fractions: { numerator: 7, denominator: 12 },
    type: 'grid',
    size: 240,
    gridColumns: 4
  }
}

export const PieHalf: Story = {
  args: {
    fractions: { numerator: 1, denominator: 2 },
    type: 'pie',
    size: 200
  }
}

export const PieThreeQuarters: Story = {
  args: {
    fractions: { numerator: 3, denominator: 4 },
    type: 'pie',
    size: 200
  }
}

export const PieSevenEighths: Story = {
  args: {
    fractions: { numerator: 7, denominator: 8 },
    type: 'pie',
    size: 200
  }
}

export const CustomColors: Story = {
  args: {
    fractions: { numerator: 5, denominator: 8 },
    type: 'grid',
    size: 200,
    fillColor: '#10b981',
    emptyColor: '#f3f4f6'
  }
}

export const CustomLabel: Story = {
  args: {
    fractions: { numerator: 3, denominator: 5, label: 'Three Fifths' },
    type: 'pie',
    size: 180,
    fillColor: '#8b5cf6'
  }
}

export const NoLabel: Story = {
  args: {
    fractions: { numerator: 2, denominator: 3 },
    type: 'grid',
    size: 160,
    showLabel: false
  }
}

export const LargeGrid: Story = {
  args: {
    fractions: { numerator: 15, denominator: 20 },
    type: 'grid',
    size: 300,
    gridColumns: 5,
    gridGap: 3
  }
}

export const SmallDiagrams: Story = {
  render: () => (
    <div className="flex space-x-6">
      <FractionDiagram
        fractions={{ numerator: 1, denominator: 4 }}
        type="grid"
        size={120}
      />
      <FractionDiagram
        fractions={{ numerator: 1, denominator: 4 }}
        type="pie"
        size={120}
      />
      <FractionDiagram
        fractions={{ numerator: 2, denominator: 4 }}
        type="grid"
        size={120}
      />
      <FractionDiagram
        fractions={{ numerator: 2, denominator: 4 }}
        type="pie"
        size={120}
      />
      <FractionDiagram
        fractions={{ numerator: 3, denominator: 4 }}
        type="grid"
        size={120}
      />
      <FractionDiagram
        fractions={{ numerator: 3, denominator: 4 }}
        type="pie"
        size={120}
      />
    </div>
  )
}

export const MultipleDiagramsGrid: Story = {
  args: {
    fractions: [
      { numerator: 1, denominator: 4 },
      { numerator: 2, denominator: 4 },
      { numerator: 3, denominator: 4 }
    ],
    type: 'grid',
    size: 120,
    spacing: 20
  }
}

export const MultipleDiagramsPie: Story = {
  args: {
    fractions: [
      { numerator: 1, denominator: 8 },
      { numerator: 3, denominator: 8 },
      { numerator: 5, denominator: 8 },
      { numerator: 7, denominator: 8 }
    ],
    type: 'pie',
    size: 100,
    spacing: 16
  }
}

export const ComparingEquivalentFractions: Story = {
  args: {
    fractions: [
      { numerator: 1, denominator: 2, label: '1/2' },
      { numerator: 2, denominator: 4, label: '2/4' },
      { numerator: 4, denominator: 8, label: '4/8' }
    ],
    type: 'grid',
    size: 140,
    spacing: 24
  }
}

export const FractionSequence: Story = {
  args: {
    fractions: [
      { numerator: 1, denominator: 6 },
      { numerator: 2, denominator: 6 },
      { numerator: 3, denominator: 6 },
      { numerator: 4, denominator: 6 },
      { numerator: 5, denominator: 6 },
      { numerator: 6, denominator: 6 }
    ],
    type: 'pie',
    size: 80,
    spacing: 12
  }
}

export const CustomColorsMultiple: Story = {
  args: {
    fractions: [
      { numerator: 1, denominator: 3, fillColor: '#ef4444' },
      { numerator: 2, denominator: 3, fillColor: '#22c55e' },
      { numerator: 3, denominator: 3, fillColor: '#3b82f6' }
    ],
    type: 'grid',
    size: 120,
    spacing: 20
  }
}

export const ImproperFractionsGrid: Story = {
  args: {
    fractions: [
      { numerator: 5, denominator: 4 },
      { numerator: 7, denominator: 3 },
      { numerator: 9, denominator: 2 }
    ],
    type: 'grid',
    size: 100,
    spacing: 24
  }
}

export const ImproperFractionsPie: Story = {
  args: {
    fractions: [
      { numerator: 9, denominator: 4 },
      { numerator: 11, denominator: 6 },
      { numerator: 13, denominator: 5 }
    ],
    type: 'pie',
    size: 80,
    spacing: 20
  }
}

export const SingleImproperFraction: Story = {
  args: {
    fractions: { numerator: 7, denominator: 3 },
    type: 'grid',
    size: 120
  }
}

export const ImproperFractionSequence: Story = {
  args: {
    fractions: [
      { numerator: 4, denominator: 4, label: '4/4' },
      { numerator: 5, denominator: 4, label: '5/4' },
      { numerator: 6, denominator: 4, label: '6/4' },
      { numerator: 7, denominator: 4, label: '7/4' },
      { numerator: 8, denominator: 4, label: '8/4' }
    ],
    type: 'pie',
    size: 70,
    spacing: 16
  }
}

export const MixedProperAndImproper: Story = {
  args: {
    fractions: [
      { numerator: 3, denominator: 4, label: '3/4' },
      { numerator: 4, denominator: 4, label: '4/4' },
      { numerator: 5, denominator: 4, label: '5/4' },
      { numerator: 6, denominator: 4, label: '6/4' }
    ],
    type: 'grid',
    size: 100,
    spacing: 20
  }
}

export const WholeFractions: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Whole Number Fractions (1/1, 2/2, etc.)</h3>
        <div className="space-y-4">
          <FractionDiagram
            fractions={[
              { numerator: 1, denominator: 1, label: '1/1' },
              { numerator: 2, denominator: 2, label: '2/2' },
              { numerator: 3, denominator: 3, label: '3/3' },
              { numerator: 4, denominator: 4, label: '4/4' }
            ]}
            type="grid"
            size={120}
            spacing={20}
          />
          <FractionDiagram
            fractions={[
              { numerator: 1, denominator: 1, label: '1/1' },
              { numerator: 2, denominator: 2, label: '2/2' },
              { numerator: 3, denominator: 3, label: '3/3' },
              { numerator: 4, denominator: 4, label: '4/4' }
            ]}
            type="pie"
            size={120}
            spacing={20}
          />
        </div>
      </div>
    </div>
  )
}

export const ComparingFractions: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Comparing 1/2 and 2/4</h3>
        <FractionDiagram
          fractions={[
            { numerator: 1, denominator: 2 },
            { numerator: 2, denominator: 4 }
          ]}
          type="grid"
          size={150}
          spacing={32}
        />
      </div>

      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">
          Different Representations
        </h3>
        <div className="space-y-4">
          <FractionDiagram
            fractions={[
              { numerator: 3, denominator: 8, label: 'Grid View' },
              { numerator: 3, denominator: 8, label: 'Pie View' }
            ]}
            type="grid"
            size={160}
            spacing={40}
          />
          <FractionDiagram
            fractions={[
              { numerator: 3, denominator: 8 },
              { numerator: 3, denominator: 8 }
            ]}
            type="pie"
            size={160}
            spacing={40}
            showLabel={false}
          />
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Improper Fractions</h3>
        <div className="space-y-4">
          <FractionDiagram
            fractions={[
              { numerator: 7, denominator: 4, label: '7/4' },
              { numerator: 11, denominator: 6, label: '11/6' }
            ]}
            type="grid"
            size={120}
            spacing={40}
          />
          <FractionDiagram
            fractions={[
              { numerator: 9, denominator: 4, label: '9/4' },
              { numerator: 13, denominator: 5, label: '13/5' }
            ]}
            type="pie"
            size={100}
            spacing={40}
          />
        </div>
      </div>
    </div>
  )
}
