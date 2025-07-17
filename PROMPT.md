# Slate UI Component Library

## Overview

Slate UI is an opinionated, configurable React component library built for scalable development teams. It combines the power of Tailwind CSS for styling, Radix UI for accessibility primitives, and TypeScript for type safety. The library provides a comprehensive set of UI components with a consistent design system.

## Core Technologies

- **React 18+** - Modern React with hooks and TypeScript
- **Tailwind CSS** - Utility-first CSS framework with custom design tokens
- **Radix UI** - Accessible, unstyled UI primitives
- **Class Variance Authority (CVA)** - For component variant management
- **Lucide React** - Icon library
- **TypeScript** - Full type safety

## Installation

```bash
npm install slate-ui
# or
yarn add slate-ui
```

### Dependencies

Make sure your project includes these peer dependencies:

- `react ^18.3.1`
- `tailwindcss ^3.4.3`

## Setup

### 1. Tailwind Configuration

Add the slate-ui paths to your `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/slate-ui/dist/**/*.{js,ts,jsx,tsx}' // Add this line
  ]
  // ... rest of your config
}
```

### 2. CSS Import

Import the slate-ui styles in your main CSS file:

```css
@import 'slate-ui/dist/index.css';
```

### 3. Provider Setup

Wrap your app with the `SlateProvider` for global functionality:

```tsx
import { SlateProvider } from 'slate-ui'

function App() {
  return <SlateProvider>{/* Your app content */}</SlateProvider>
}
```

## Design System

### Variants

All components follow a consistent variant system:

- **primary** - Main brand colors, high emphasis
- **secondary** - Secondary brand colors, medium emphasis
- **subtle** - Low emphasis, minimal styling

### Sizes

Components support three sizes:

- **sm** - Small, compact size
- **md** - Medium, default size
- **lg** - Large, prominent size

### Colors

The library uses a semantic color system:

- **primary** - Brand primary color
- **secondary** - Brand secondary color
- **success** - Success states
- **warning** - Warning states
- **danger/error** - Error states
- **info** - Informational states

## Component Usage Patterns

### Basic Button

```tsx
import { Button } from 'slate-ui'
import { Plus } from 'lucide-react'

function MyComponent() {
  return (
    <div>
      {/* Basic button */}
      <Button>Click me</Button>

      {/* With variants and sizes */}
      <Button variant="secondary" size="lg">
        Large Secondary
      </Button>

      {/* With icons */}
      <Button iconLeft={Plus}>Add Item</Button>

      {/* Loading state */}
      <Button loading>Processing...</Button>
    </div>
  )
}
```

### Form Components

```tsx
import { TextInput, Select, Checkbox, Button } from 'slate-ui'

function FormExample() {
  const [name, setName] = useState('')
  const [country, setCountry] = useState(null)
  const [agreed, setAgreed] = useState(false)

  const countries = [
    { id: 'us', name: 'United States' },
    { id: 'ca', name: 'Canada' },
    { id: 'uk', name: 'United Kingdom' }
  ]

  return (
    <form className="space-y-4">
      <TextInput
        label="Full Name"
        value={name}
        onChange={setName}
        placeholder="Enter your name"
        error={!name ? 'Name is required' : undefined}
      />

      <Select
        label="Country"
        items={countries}
        value={country}
        onChange={setCountry}
        placeholder="Select country"
        searchable
      />

      <Checkbox
        checked={agreed}
        onChange={setAgreed}
        label="I agree to the terms and conditions"
      />

      <Button type="submit" disabled={!name || !country || !agreed}>
        Submit
      </Button>
    </form>
  )
}
```

### Layout Components

```tsx
import { Card, Badge, EmptyState } from 'slate-ui'

function DashboardCard() {
  const data = []

  return (
    <Card>
      <Card.Header>
        <div className="flex justify-between items-center">
          <h3>Recent Activity</h3>
          <Badge variant="secondary">5 new</Badge>
        </div>
      </Card.Header>

      <Card.Content>
        {data.length === 0 ? (
          <EmptyState
            title="No activity yet"
            description="When you start using the app, activity will appear here"
            action={<Button>Get Started</Button>}
          />
        ) : (
          // Render data
        )}
      </Card.Content>
    </Card>
  )
}
```

### Interactive Components

```tsx
import { Modal, useConfirm, Tooltip } from 'slate-ui'

function InteractiveExample() {
  const [modalOpen, setModalOpen] = useState(false)
  const confirm = useConfirm()

  const handleDelete = () => {
    confirm({
      title: 'Delete Item',
      description:
        'Are you sure you want to delete this item? This action cannot be undone.',
      confirmText: 'Delete',
      variant: 'danger',
      onConfirm: () => {
        // Handle deletion
      }
    })
  }

  return (
    <div>
      <Tooltip content="Click to edit this item">
        <Button onClick={() => setModalOpen(true)}>Edit Item</Button>
      </Tooltip>

      <Button variant="subtle" onClick={handleDelete}>
        Delete
      </Button>

      <Modal open={modalOpen} onOpenChange={setModalOpen}>
        <Modal.Header>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Content>{/* Modal content */}</Modal.Content>
        <Modal.Footer>
          <Button variant="subtle" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
```

## Available Components

### Input Components

- `Button` - Clickable button with variants, sizes, icons, and loading states
- `TextInput` - Text input field with label, error states, and icons
- `TextArea` - Multi-line text input
- `NumberInput` - Numeric input with increment/decrement
- `Select` - Dropdown selection with search functionality
- `Checkbox` - Checkbox input with label
- `RadioGroup` - Radio button group
- `Switch` - Toggle switch
- `Slider` - Range slider input
- `ColorPicker` - Color selection input
- `FileUpload` - File upload component

### Display Components

- `Badge` - Status indicators and labels
- `Card` - Container with header, content, and footer
- `Icon` - Wrapper for Lucide React icons
- `Label` - Form labels
- `Progress` - Progress indicator
- `EmptyState` - Empty state placeholder
- `Table` - Data table with sorting and pagination

### Navigation Components

- `Tabs` - Tab navigation
- `Menu` - Dropdown menu
- `Pagination` - Page navigation

### Overlay Components

- `Modal` - Modal dialog
- `Popover` - Popover overlay
- `Tooltip` - Hover tooltips
- `Confirm` - Confirmation dialog (via `useConfirm` hook)

### Utility Components

- `SlateProvider` - Global provider for library functionality
- `ActionIcon` - Small icon button

## Component API Patterns

### Common Props

Most components share these common props:

```tsx
interface CommonProps {
  variant?: 'primary' | 'secondary' | 'subtle'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
  styles?: Record<string, CSSProperties> // For styling specific parts
}
```

### Form Component Pattern

Form components typically follow this pattern:

```tsx
interface FormComponentProps {
  value?: T
  onChange?: (value: T) => void
  defaultValue?: T
  label?: string
  error?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
}
```

### Styleable Components

Components support detailed styling through the `styles` prop:

```tsx
<Button
  styles={{
    root: { borderRadius: '4px' },
    icon: { color: 'red' }
  }}
>
  Custom Styled Button
</Button>
```

## Theming

### CSS Custom Properties

Slate UI uses CSS custom properties for theming. Override these in your CSS:

```css
:root {
  /* Primary colors */
  --primary-500: #3b82f6;
  --anti-primary: #ffffff;

  /* Secondary colors */
  --secondary-500: #8b5cf6;
  --anti-secondary: #ffffff;

  /* Gray scale */
  --gray-100: #f3f4f6;
  --gray-500: #6b7280;
  --gray-900: #111827;
}
```

### Dark Mode

Add dark mode by targeting the `.dark` class:

```css
.dark {
  --primary-500: #60a5fa;
  --gray-100: #1f2937;
  --gray-900: #f9fafb;
}
```

## Best Practices

### 1. Always Use the Provider

```tsx
// ✅ Good
<SlateProvider>
  <App />
</SlateProvider>

// ❌ Bad - missing provider
<App />
```

### 2. Leverage TypeScript

```tsx
// ✅ Good - fully typed
const handleSelectChange = (
  value: string | null,
  item: SelectItem<string> | null
) => {
  // TypeScript knows the exact types
}

// ❌ Bad - any types
const handleSelectChange = (value: any, item: any) => {
  // No type safety
}
```

### 3. Use Semantic HTML

```tsx
// ✅ Good
<form onSubmit={handleSubmit}>
  <TextInput type="email" required />
  <Button type="submit">Submit</Button>
</form>

// ❌ Bad
<div onClick={handleSubmit}>
  <TextInput />
  <Button>Submit</Button>
</div>
```

### 4. Handle Loading States

```tsx
// ✅ Good
<Button loading={isSubmitting} disabled={isSubmitting}>
  {isSubmitting ? 'Saving...' : 'Save'}
</Button>

// ❌ Bad - no loading feedback
<Button>Save</Button>
```

### 5. Provide Error Feedback

```tsx
// ✅ Good
<TextInput
  error={errors.email}
  value={email}
  onChange={setEmail}
/>

// ❌ Bad - no error handling
<TextInput value={email} onChange={setEmail} />
```

## Utilities

### Hooks

- `useConfirm()` - Access the global confirm dialog
- `useSometimesControlled()` - Handle controlled/uncontrolled state

### Utility Functions

- `cn()` - Merge Tailwind classes safely
- `gid()` - Generate unique IDs for components

### Types

- `SlateSize` - Size variant type
- `SlateVariant` - Style variant type
- `SlateColor` - Color variant type
- `SlateId` - ID type (string | number)

## Examples

### Complete Form

```tsx
import { useState } from 'react'
import {
  Button,
  TextInput,
  Select,
  TextArea,
  Checkbox,
  Card,
  SlateProvider
} from 'slate-ui'

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: null,
    message: '',
    newsletter: false
  })

  const subjects = [
    { id: 'support', name: 'Technical Support' },
    { id: 'sales', name: 'Sales Inquiry' },
    { id: 'general', name: 'General Question' }
  ]

  return (
    <SlateProvider>
      <Card className="max-w-md mx-auto">
        <Card.Header>
          <Card.Title>Contact Us</Card.Title>
        </Card.Header>

        <Card.Content className="space-y-4">
          <TextInput
            label="Name"
            value={formData.name}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, name: value }))
            }
            required
          />

          <TextInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, email: value }))
            }
            required
          />

          <Select
            label="Subject"
            items={subjects}
            value={formData.subject}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, subject: value }))
            }
            placeholder="Select a subject"
          />

          <TextArea
            label="Message"
            value={formData.message}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, message: value }))
            }
            placeholder="How can we help?"
            rows={4}
          />

          <Checkbox
            checked={formData.newsletter}
            onChange={(checked) =>
              setFormData((prev) => ({ ...prev, newsletter: checked }))
            }
            label="Subscribe to our newsletter"
          />
        </Card.Content>

        <Card.Footer>
          <Button className="w-full">Send Message</Button>
        </Card.Footer>
      </Card>
    </SlateProvider>
  )
}
```

This documentation provides everything needed to effectively use the Slate UI component library in React applications. The library prioritizes accessibility, type safety, and developer experience while maintaining flexibility for customization.
