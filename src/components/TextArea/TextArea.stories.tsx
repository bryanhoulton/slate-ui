import type {
  Meta,
  StoryObj
} from '@storybook/react-vite'

import {
  args,
  STORY_VARIANTS
} from '../../utilities'
import { TextArea } from './'

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  title: 'Inputs/TextArea',
  argTypes: args({
    variant: {
      control: {
        type: 'select'
      },
      options: STORY_VARIANTS
    },

    label: {
      control: {
        type: 'text'
      }
    },
    error: {
      control: {
        type: 'text'
      }
    },
    placeholder: {
      control: {
        type: 'text'
      }
    }
  })
}

export default meta
type Story = StoryObj<typeof TextArea>

export const Default: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter your description here...'
  }
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <TextArea
        variant="primary"
        label="Primary"
        placeholder="Primary variant textarea"
      />
      <TextArea
        variant="secondary"
        label="Secondary"
        placeholder="Secondary variant textarea"
      />
      <TextArea
        variant="default"
        label="Default"
        placeholder="Default variant textarea"
      />
      <TextArea
        variant="success"
        label="Success"
        placeholder="Success variant textarea"
      />
      <TextArea
        variant="warning"
        label="Warning"
        placeholder="Warning variant textarea"
      />
      <TextArea
        variant="error"
        label="Error"
        placeholder="Error variant textarea"
      />
      <TextArea
        variant="info"
        label="Info"
        placeholder="Info variant textarea"
      />
    </div>
  )
}

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <TextArea label="Normal" placeholder="Normal state" />
      <TextArea label="Disabled" placeholder="Disabled state" disabled />
      <TextArea label="Required" placeholder="Required field" required />
      <TextArea
        label="With Value"
        value="This textarea has some pre-filled content that demonstrates how the component looks with text."
      />
      <TextArea
        label="With Error"
        placeholder="Invalid input"
        error="This field is required and must be at least 10 characters long"
        variant="error"
      />
    </div>
  )
}

export const DifferentRows: Story = {
  render: () => (
    <div className="space-y-4">
      <TextArea label="Small (2 rows)" placeholder="Small textarea" rows={2} />
      <TextArea
        label="Medium (4 rows)"
        placeholder="Medium textarea"
        rows={4}
      />
      <TextArea label="Large (6 rows)" placeholder="Large textarea" rows={6} />
      <TextArea
        label="Extra Large (8 rows)"
        placeholder="Extra large textarea"
        rows={8}
      />
    </div>
  )
}

export const FormExamples: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-lg font-semibold">Feedback Form</h3>
        <div className="space-y-4">
          <TextArea
            label="Comments"
            placeholder="Please share your thoughts and feedback..."
            rows={4}
            required
          />
          <TextArea
            label="Suggestions"
            placeholder="Any suggestions for improvement?"
            rows={3}
            variant="secondary"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Support Ticket</h3>
        <div className="space-y-4">
          <TextArea
            label="Issue Description"
            placeholder="Please describe the issue you're experiencing in detail..."
            rows={5}
            required
          />
          <TextArea
            label="Steps to Reproduce"
            placeholder="1. Go to...\n2. Click on...\n3. See error"
            rows={4}
          />
          <TextArea
            label="Additional Information"
            placeholder="Any other relevant details..."
            rows={3}
            variant="default"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Content Creation</h3>
        <div className="space-y-4">
          <TextArea
            label="Article Content"
            placeholder="Write your article content here..."
            rows={8}
            value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
          />
          <TextArea
            label="Meta Description"
            placeholder="Brief description for SEO (150-160 characters)"
            rows={2}
            variant="secondary"
          />
        </div>
      </div>
    </div>
  )
}

export const ValidationExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <TextArea
        label="Valid Input"
        value="This is a valid input with sufficient content that meets all the requirements."
        rows={3}
      />
      <TextArea
        label="Too Short"
        value="Short"
        error="Content must be at least 20 characters long"
        variant="error"
        rows={3}
      />
      <TextArea
        label="Required Field"
        placeholder="This field is required"
        error="This field cannot be empty"
        variant="error"
        required
        rows={3}
      />
      <TextArea
        label="Character Limit"
        placeholder="Maximum 100 characters allowed"
        value="This text is getting close to the character limit and will show a warning when it exceeds the maximum allowed length."
        error="Character limit exceeded (125/100)"
        variant="error"
        rows={4}
      />
    </div>
  )
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      {(
        [
          'primary',
          'secondary',
          'default',
          'success',
          'warning',
          'error',
          'info'
        ] as const
      ).map((variant) => (
        <div key={variant}>
          <h3 className="mb-3 text-lg font-semibold capitalize">{variant}</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <TextArea
                variant={variant}
                label="Normal"
                placeholder="Enter text..."
                rows={3}
              />
              <TextArea
                variant={variant}
                disabled
                label="Disabled"
                placeholder="Disabled..."
                rows={3}
              />
              <TextArea
                variant={variant}
                required
                label="Required"
                placeholder="Required..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <TextArea
                variant={variant}
                value="With value content"
                label="With Value"
                rows={3}
              />
              <TextArea
                variant={variant}
                label="Different Rows"
                placeholder="4 rows..."
                rows={4}
              />
              <TextArea
                variant={variant}
                label="Many Rows"
                placeholder="6 rows..."
                rows={6}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
