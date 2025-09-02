import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  Edit,
  Plus,
  Save,
  Settings,
  Trash2,
  Upload,
  X
} from 'lucide-react'

import type {
  Meta,
  StoryObj
} from '@storybook/react-vite'

import {
  args,
  SlateSize,
  SlateVariant,
  STORY_SIZES,
  STORY_VARIANTS
} from '../../utilities'
import { Button } from './'

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Inputs/Button',
  argTypes: args({
    variant: {
      control: {
        type: 'select'
      },
      options: STORY_VARIANTS
    },
    size: {
      control: {
        type: 'select'
      },
      options: STORY_SIZES
    },
    disabled: {
      control: {
        type: 'boolean'
      }
    },
    loading: {
      control: {
        type: 'boolean'
      }
    }
  })
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Button'
  }
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {STORY_VARIANTS.map((variant: SlateVariant) => (
        <Button key={variant} variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
      ))}
    </div>
  )
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {STORY_SIZES.map((size: SlateSize) => (
        <Button key={size} size={size}>
          {size.charAt(0).toUpperCase() + size.slice(1)}
        </Button>
      ))}
    </div>
  )
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button iconLeft={Plus}>Add Item</Button>
      <Button iconRight={ArrowRight}>Continue</Button>
      <Button iconLeft={Download} iconRight={ArrowRight}>
        Download & Next
      </Button>
    </div>
  )
}

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Button>Normal</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
        <Button loading disabled>
          Loading Disabled
        </Button>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button variant="secondary">Normal</Button>
        <Button variant="secondary" disabled>
          Disabled
        </Button>
        <Button variant="secondary" loading>
          Loading
        </Button>
        <Button variant="secondary" loading disabled>
          Loading Disabled
        </Button>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button variant="error">Normal</Button>
        <Button variant="error" disabled>
          Disabled
        </Button>
        <Button variant="error" loading>
          Loading
        </Button>
        <Button variant="error" loading disabled>
          Loading Disabled
        </Button>
      </div>
    </div>
  )
}

export const ActionButtons: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-lg font-semibold">Primary Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Button iconLeft={Save}>Save</Button>
          <Button iconLeft={Plus}>Create New</Button>
          <Button iconLeft={Upload}>Upload</Button>
          <Button iconLeft={Check}>Confirm</Button>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Secondary Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="secondary" iconLeft={Edit}>
            Edit
          </Button>
          <Button variant="secondary" iconLeft={Settings}>
            Settings
          </Button>
          <Button variant="secondary" iconLeft={Download}>
            Download
          </Button>
          <Button variant="secondary" iconLeft={ArrowLeft}>
            Back
          </Button>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Destructive Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="error" iconLeft={Trash2}>
            Delete
          </Button>
          <Button variant="error" iconLeft={X}>
            Cancel
          </Button>
          <Button variant="error" iconLeft={AlertTriangle}>
            Remove
          </Button>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Default Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Skip</Button>
          <Button variant="default" iconLeft={X}>
            Dismiss
          </Button>
          <Button variant="default" iconRight={ArrowRight}>
            Learn More
          </Button>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Subtle Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="subtle">Close</Button>
          <Button variant="subtle" iconLeft={X}>
            Dismiss
          </Button>
          <Button variant="subtle" iconRight={ArrowRight}>
            View Details
          </Button>
        </div>
      </div>
    </div>
  )
}

export const AllSizesAndVariants: Story = {
  render: () => (
    <div className="space-y-6">
      {STORY_VARIANTS.map((variant: SlateVariant) => (
        <div key={variant}>
          <h3 className="mb-3 text-lg font-semibold capitalize">{variant}</h3>
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-4">
              {STORY_SIZES.map((size: SlateSize) => (
                <Button key={size} variant={variant} size={size}>
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              {STORY_SIZES.map((size: SlateSize) => (
                <Button
                  key={`icon-${size}`}
                  variant={variant}
                  size={size}
                  iconLeft={Plus}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant={variant} size={STORY_SIZES[0]} disabled>
                Disabled
              </Button>
              <Button variant={variant} size={STORY_SIZES[1]} loading>
                Loading
              </Button>
              <Button
                variant={variant}
                size={STORY_SIZES[2]}
                iconLeft={Plus}
                loading
              >
                Loading
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export const DefaultVsSubtle: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-lg font-semibold">
          Default vs Subtle Comparison
        </h3>
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-sm text-gray-600">
              Default variant (has border):
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default Button</Button>
              <Button variant="default" iconLeft={Plus}>
                Add Item
              </Button>
              <Button variant="default" disabled>
                Disabled
              </Button>
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm text-gray-600">
              Subtle variant (no border, no background):
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="subtle">Subtle Button</Button>
              <Button variant="subtle" iconLeft={Plus}>
                Add Item
              </Button>
              <Button variant="subtle" disabled>
                Disabled
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const FormButtons: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-lg font-semibold">Form Actions</h3>
        <div className="flex flex-wrap gap-2">
          <Button type="submit">Submit</Button>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
          <Button type="reset" variant="default">
            Reset
          </Button>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Modal Actions</h3>
        <div className="flex flex-wrap gap-2">
          <Button iconLeft={Save}>Save Changes</Button>
          <Button variant="secondary">Cancel</Button>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Confirmation Actions</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="error" iconLeft={Trash2}>
            Delete Item
          </Button>
          <Button variant="secondary">Keep Item</Button>
        </div>
      </div>
    </div>
  )
}
