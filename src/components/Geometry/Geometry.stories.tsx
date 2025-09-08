import type {
  Meta,
  StoryObj
} from '@storybook/react-vite'

import { Shapes } from './'

const meta: Meta<typeof Shapes> = {
  component: Shapes,
  title: 'Diagrams/Shapes',
  parameters: {
    docs: {
      description: {
        component:
          'Interactive geometric diagrams for educational problems and visualizations.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof Shapes>

export const TriangleAngleSum: Story = {
  name: 'Triangle Angle Sum Problem',
  parameters: {
    docs: {
      description: {
        story:
          'A triangle ABC where students need to find the missing angle. Given: ∠A = 65°, ∠B = 45°. Find: ∠C = ?'
      }
    }
  },
  args: {
    shapes: [
      {
        points: [
          { id: 'A', x: 0, y: 0 },
          { id: 'B', x: 10, y: 0 },
          { id: 'C', x: 3.2, y: 6.8 }
        ],
        edges: [
          { id: 'AB', source: 'A', target: 'B' },
          { id: 'BC', source: 'B', target: 'C' },
          { id: 'CA', source: 'C', target: 'A' }
        ],
        angles: [
          {
            id: 'angleA',
            pointA: 'C',
            pointB: 'A',
            pointC: 'B',
            label: '65°',
            type: 'non-reflex'
          },
          {
            id: 'angleB',
            pointA: 'A',
            pointB: 'B',
            pointC: 'C',
            label: '45°',
            type: 'non-reflex'
          },
          {
            id: 'angleC',
            pointA: 'B',
            pointB: 'C',
            pointC: 'A',
            label: '?',
            type: 'non-reflex'
          }
        ]
      }
    ]
  }
}

export const QuadrilateralProperties: Story = {
  name: 'Quadrilateral Properties',
  parameters: {
    docs: {
      description: {
        story:
          'A parallelogram PQRS with marked parallel sides. Students identify properties: opposite sides parallel and equal, opposite angles equal.'
      }
    }
  },
  args: {
    shapes: [
      {
        points: [
          { id: 'P', x: 1, y: 2 },
          { id: 'Q', x: 8, y: 2 },
          { id: 'R', x: 9, y: 7 },
          { id: 'S', x: 2, y: 7 }
        ],
        edges: [
          { id: 'PQ', source: 'P', target: 'Q', color: 'blue' },
          { id: 'QR', source: 'Q', target: 'R', color: 'red' },
          {
            id: 'RS',
            source: 'R',
            target: 'S',
            color: 'blue',
            stroke: 'dashed'
          },
          { id: 'SP', source: 'S', target: 'P', color: 'red', stroke: 'dashed' }
        ],
        angles: [
          {
            id: 'angleP',
            pointA: 'S',
            pointB: 'P',
            pointC: 'Q',
            label: '∠P',
            type: 'non-reflex'
          },
          {
            id: 'angleR',
            pointA: 'Q',
            pointB: 'R',
            pointC: 'S',
            label: '∠R',
            type: 'non-reflex'
          }
        ]
      }
    ]
  }
}

export const ParallelLinesTransversal: Story = {
  name: 'Parallel Lines and Transversal',
  parameters: {
    docs: {
      description: {
        story:
          'Two parallel lines cut by a transversal. Students identify corresponding angles, alternate interior angles, and co-interior angles.'
      }
    }
  },
  args: {
    shapes: [
      {
        points: [
          { id: 'A', x: 0, y: 3 },
          { id: 'B', x: 10, y: 3 },
          { id: 'C', x: 0, y: 7 },
          { id: 'D', x: 10, y: 7 },
          { id: 'E', x: 2, y: 1 },
          { id: 'F', x: 8, y: 9 },
          { id: 'G', x: 3.5, y: 3 },
          { id: 'H', x: 6.5, y: 7 }
        ],
        edges: [
          { id: 'line1', source: 'A', target: 'B', color: 'blue' },
          { id: 'line2', source: 'C', target: 'D', color: 'blue' },
          { id: 'transversal', source: 'E', target: 'F', color: 'red' }
        ],
        angles: [
          {
            id: 'angle1',
            pointA: 'A',
            pointB: 'G',
            pointC: 'F',
            label: '125°',
            type: 'non-reflex'
          },
          {
            id: 'angle2',
            pointA: 'C',
            pointB: 'H',
            pointC: 'G',
            label: '?',
            type: 'non-reflex'
          }
        ]
      }
    ]
  }
}

export const RightTriangleProblem: Story = {
  name: 'Right Triangle Problem',
  parameters: {
    docs: {
      description: {
        story:
          'A right triangle with one leg and hypotenuse marked. Students can apply Pythagorean theorem or trigonometry.'
      }
    }
  },
  args: {
    shapes: [
      {
        points: [
          { id: 'A', x: 0, y: 0 },
          { id: 'B', x: 6, y: 0 },
          { id: 'C', x: 0, y: 3.5 }
        ],
        edges: [
          { id: 'AB', source: 'A', target: 'B' },
          { id: 'BC', source: 'B', target: 'C' },
          { id: 'CA', source: 'C', target: 'A' }
        ],
        angles: [
          {
            id: 'rightAngle',
            pointA: 'A',
            pointB: 'B',
            pointC: 'C',
            label: '30°',
            type: 'non-reflex'
          },
          {
            id: 'angleA',
            pointA: 'C',
            pointB: 'A',
            pointC: 'B',
            label: '90°',
            type: 'non-reflex'
          },
          {
            id: 'angleC',
            pointA: 'B',
            pointB: 'C',
            pointC: 'A',
            label: '?',
            type: 'non-reflex'
          }
        ]
      }
    ]
  }
}

export const PentagonInteriorAngles: Story = {
  name: 'Pentagon Interior Angles',
  parameters: {
    docs: {
      description: {
        story:
          'A regular pentagon where students calculate interior angles using the formula (n-2)×180°/n.'
      }
    }
  },
  args: {
    shapes: [
      {
        points: [
          { id: 'A', x: 5, y: 0 },
          { id: 'B', x: 8.8, y: 2.8 },
          { id: 'C', x: 7.4, y: 7.2 },
          { id: 'D', x: 2.6, y: 7.2 },
          { id: 'E', x: 1.2, y: 2.8 }
        ],
        edges: [
          { id: 'AB', source: 'A', target: 'B' },
          { id: 'BC', source: 'B', target: 'C' },
          { id: 'CD', source: 'C', target: 'D' },
          { id: 'DE', source: 'D', target: 'E' },
          { id: 'EA', source: 'E', target: 'A' }
        ],
        angles: [
          {
            id: 'angleA',
            pointA: 'E',
            pointB: 'A',
            pointC: 'B',
            label: '?',
            type: 'non-reflex'
          },
          {
            id: 'angleB',
            pointA: 'A',
            pointB: 'B',
            pointC: 'C',
            label: '108°',
            type: 'non-reflex'
          },
          {
            id: 'angleC',
            pointA: 'B',
            pointB: 'C',
            pointC: 'D',
            label: '108°',
            type: 'non-reflex'
          }
        ]
      }
    ]
  }
}

export const IsoscelesTriangle: Story = {
  name: 'Isosceles Triangle Properties',
  parameters: {
    docs: {
      description: {
        story:
          'An isosceles triangle ABC with AB = AC. Students identify base angles are equal and find missing angles.'
      }
    }
  },
  args: {
    shapes: [
      {
        points: [
          { id: 'A', x: 4, y: 11.0 },
          { id: 'B', x: 0, y: 0 },
          { id: 'C', x: 8, y: 0 }
        ],
        edges: [
          { id: 'AB', source: 'A', target: 'B', color: 'green' },
          { id: 'AC', source: 'A', target: 'C', color: 'green' },
          { id: 'BC', source: 'B', target: 'C' }
        ],
        angles: [
          {
            id: 'angleA',
            pointA: 'B',
            pointB: 'A',
            pointC: 'C',
            label: '40°',
            type: 'non-reflex'
          },
          {
            id: 'angleB',
            pointA: 'C',
            pointB: 'B',
            pointC: 'A',
            label: '?',
            type: 'non-reflex'
          },
          {
            id: 'angleC',
            pointA: 'A',
            pointB: 'C',
            pointC: 'B',
            label: '?',
            type: 'non-reflex'
          }
        ]
      }
    ]
  }
}

export const SupplementaryAngles: Story = {
  name: 'Supplementary Angles on a Line',
  parameters: {
    docs: {
      description: {
        story:
          'Adjacent angles on a straight line that sum to 180°. Students find the missing angle.'
      }
    }
  },
  args: {
    shapes: [
      {
        points: [
          { id: 'A', x: 0, y: 5 },
          { id: 'B', x: 5, y: 5 },
          { id: 'C', x: 10, y: 5 },
          { id: 'D', x: 7.3, y: 8.3 }
        ],
        edges: [
          { id: 'line', source: 'A', target: 'C' },
          { id: 'ray', source: 'B', target: 'D' }
        ],
        angles: [
          {
            id: 'angle1',
            pointA: 'A',
            pointB: 'B',
            pointC: 'D',
            label: '125°',
            type: 'non-reflex'
          },
          {
            id: 'angle2',
            pointA: 'D',
            pointB: 'B',
            pointC: 'C',
            label: '?',
            type: 'non-reflex'
          }
        ]
      }
    ]
  }
}

export const CongruentTriangles: Story = {
  name: 'Congruent Triangles (SAS)',
  parameters: {
    docs: {
      description: {
        story:
          'Two triangles with Side-Angle-Side congruence. Students identify corresponding parts and prove congruence.'
      }
    }
  },
  args: {
    shapes: [
      {
        points: [
          // Triangle 1
          { id: 'A', x: 1, y: 2 },
          { id: 'B', x: 4, y: 2 },
          { id: 'C', x: 2, y: 6 },
          // Triangle 2
          { id: 'P', x: 6, y: 2 },
          { id: 'Q', x: 9, y: 2 },
          { id: 'R', x: 7, y: 6 }
        ],
        edges: [
          // Triangle 1
          { id: 'AB', source: 'A', target: 'B', color: 'blue' },
          { id: 'BC', source: 'B', target: 'C' },
          { id: 'CA', source: 'C', target: 'A', color: 'red' },
          // Triangle 2
          { id: 'PQ', source: 'P', target: 'Q', color: 'blue' },
          { id: 'QR', source: 'Q', target: 'R' },
          { id: 'RP', source: 'R', target: 'P', color: 'red' }
        ],
        angles: [
          {
            id: 'angleB',
            pointA: 'A',
            pointB: 'B',
            pointC: 'C',
            label: '75°',
            type: 'non-reflex'
          },
          {
            id: 'angleQ',
            pointA: 'P',
            pointB: 'Q',
            pointC: 'R',
            label: '75°',
            type: 'non-reflex'
          }
        ]
      }
    ]
  }
}
