# Slate UI Component Library

## Overview

Slate UI is an opinionated, configurable React component library built for scalable development teams. It combines the power of Tailwind CSS for styling, Radix UI for accessibility primitives, and TypeScript for type safety. The library provides a comprehensive set of UI components with a consistent design system.

## Core Technologies

- **React 19+** - Modern React with hooks and TypeScript
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

- `react >=19.0.0`
- `react-dom >=19.0.0`

Note: Slate UI uses Tailwind CSS v4 internally.

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

- **default** - Low emphasis, minimal styling
- **primary** - Main brand colors, high emphasis
- **secondary** - Secondary brand colors, medium emphasis
- **subtle** - Very low emphasis, transparent background
- **success** - Success states, green colors
- **warning** - Warning states, amber/yellow colors
- **error** - Error states, red colors
- **info** - Informational states, blue colors

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
- **error** - Error states
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
import { Inbox } from 'lucide-react'

function DashboardCard() {
  const data = []

  return (
    <Card
      preview={
        data.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title="No activity yet"
            button={{ children: 'Get Started', onClick: () => {} }}
          />
        ) : (
          // Render preview content
        )
      }
      menu={{
        items: [
          { id: 'edit', type: 'button', label: 'Edit', onClick: () => {} },
          { id: 'delete', type: 'button', label: 'Delete', onClick: () => {} }
        ]
      }}
    >
      <div className="flex justify-between items-center">
        <h3>Recent Activity</h3>
        <Badge variant="secondary">5 new</Badge>
      </div>
    </Card>
  )
}
```

### Interactive Components

```tsx
import { Modal, useConfirm, Tooltip, Button } from 'slate-ui'

function InteractiveExample() {
  const [modalOpen, setModalOpen] = useState(false)
  const { confirm } = useConfirm()

  const handleDelete = () => {
    confirm({
      title: 'Delete Item',
      description:
        'Are you sure you want to delete this item? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
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

      <Button variant="default" onClick={handleDelete}>
        Delete
      </Button>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Edit Item</h2>
          {/* Modal content */}
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="default" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button>Save Changes</Button>
          </div>
        </div>
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
- `PhoneInput` - Phone number input with formatting
- `DatePicker` - Date selection input
- `EditableText` - Inline editable text field
- `VerificationCodeInput` - Code/OTP input field

### Display Components

- `Badge` - Status indicators and labels
- `Card` - Container with preview area and optional menu
- `ImageCard` - Card optimized for image display
- `Icon` - Wrapper for Lucide React icons
- `Label` - Form labels
- `Progress` - Progress indicator
- `EmptyState` - Empty state placeholder with icon and optional action
- `Table` - Data table with sorting and pagination
- `Accordion` - Collapsible content sections

### Chart Components

- `BarChart` - Bar chart visualization
- `LineChart` - Line chart visualization
- `PieChart` - Pie chart visualization
- `ScatterPlot` - Scatter plot visualization
- `RadarChart` - Radar/spider chart visualization
- `BoxPlot` - Box plot visualization
- `DotPlot` - Dot plot visualization

### Educational Components

- `Geometry` - Geometric shape rendering
- `NumberLine` - Number line visualization
- `FractionDiagram` - Fraction visualization
- `FactorTree` - Factor tree visualization

### Navigation Components

- `Tabs` - Tab navigation
- `Menu` - Dropdown menu
- `Pagination` - Page navigation

### Overlay Components

- `Modal` - Modal dialog
- `Popover` - Popover overlay
- `Tooltip` - Hover tooltips
- `Confirm` - Confirmation dialog (also via `useConfirm` hook from SlateProvider)

### Utility Components

- `SlateProvider` - Global provider for library functionality (provides `useConfirm` hook)
- `ActionIcon` - Small icon button

## Component API Patterns

### Common Props

Most components share these common props:

```tsx
interface CommonProps {
  variant?: 'default' | 'primary' | 'secondary' | 'subtle' | 'success' | 'warning' | 'error' | 'info'
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

Slate UI uses Tailwind CSS v4's `@theme` directive for theming. Override these in your CSS:

```css
@theme {
  /* Primary colors */
  --color-primary-500: #000000;
  --color-anti-primary: #ffffff;

  /* Secondary colors */
  --color-secondary-500: #8b5cf6;
  --color-anti-secondary: #555555;

  /* Success colors */
  --color-success-500: #22c55e;
  --color-anti-success: #ffffff;

  /* Warning colors */
  --color-warning-500: #f59e0b;
  --color-anti-warning: #ffffff;

  /* Error colors */
  --color-error-500: #ef4444;
  --color-anti-error: #ffffff;

  /* Info colors */
  --color-info-500: #0ea5e9;
  --color-anti-info: #ffffff;

  /* Muted colors */
  --color-muted: var(--color-primary-300);
  --color-muted-light: var(--color-primary-50);
}
```

### Dark Mode

Override theme variables for dark mode:

```css
.dark {
  @theme {
    --color-primary-500: #60a5fa;
    --color-primary-100: #1f2937;
    --color-primary-900: #f9fafb;
  }
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

- `SlateSize` - Size variant type (`'sm' | 'md' | 'lg'`)
- `SlateVariant` - Style variant type
- `SlateId` - ID type (`string | number`)
- `SlateSide` - Side type (`'left' | 'right'`)
- `Styleable<T>` - Interface for components with `styles` prop

## Complex Component Examples

### Tabs

```tsx
import { Tabs } from 'slate-ui'
import { User, Settings, Bell } from 'lucide-react'

function TabsExample() {
  return (
    <Tabs
      defaultTab="profile"
      tabs={[
        {
          id: 'profile',
          name: 'Profile',
          iconLeft: User,
          content: <div>Profile content goes here</div>
        },
        {
          id: 'settings',
          name: 'Settings',
          iconLeft: Settings,
          content: <div>Settings content goes here</div>
        },
        {
          id: 'notifications',
          name: 'Notifications',
          iconLeft: Bell,
          padding: false, // Disable default padding
          content: <div className="p-2">Custom padded content</div>
        }
      ]}
    />
  )
}
```

### Table

```tsx
import { Table } from 'slate-ui'
import { Inbox } from 'lucide-react'

type User = { id: number; name: string; email: string; role: string }

function TableExample() {
  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
  ]

  return (
    <Table<User>
      columns={[
        { id: 'name', value: 'Name', cell: ({ row }) => row.name },
        { id: 'email', value: 'Email', cell: ({ row }) => row.email },
        { id: 'role', value: 'Role', cell: ({ row }) => row.role }
      ]}
      rows={users}
      onRowClick={(row) => console.log('Clicked:', row)}
      paginate
      pageSize={10}
      emptyState={{
        icon: Inbox,
        title: 'No users found',
        button: { children: 'Add User', onClick: () => {} }
      }}
    />
  )
}
```

### Accordion

```tsx
import { Accordion } from 'slate-ui'
import { HelpCircle } from 'lucide-react'

function AccordionExample() {
  const [openItems, setOpenItems] = useState<string[]>([])

  return (
    <Accordion
      type="multiple"
      value={openItems}
      onChange={(value) => setOpenItems(value as string[])}
      items={[
        {
          id: 'faq-1',
          title: 'How do I get started?',
          leftIcon: HelpCircle,
          badge: { children: 'Popular', variant: 'info' },
          content: <p>Follow our quickstart guide to get up and running.</p>
        },
        {
          id: 'faq-2',
          title: 'What payment methods do you accept?',
          content: <p>We accept all major credit cards and PayPal.</p>
        },
        {
          id: 'faq-3',
          title: 'Can I cancel anytime?',
          content: <p>Yes, you can cancel your subscription at any time.</p>,
          disabled: true
        }
      ]}
    />
  )
}
```

### Menu

```tsx
import { Menu, Button } from 'slate-ui'
import { MoreVertical, Edit, Trash, Copy, Settings } from 'lucide-react'

function MenuExample() {
  const [notifications, setNotifications] = useState(true)

  return (
    <Menu
      items={[
        {
          id: 'edit',
          type: 'button',
          label: 'Edit',
          iconLeft: Edit,
          onClick: () => console.log('Edit clicked')
        },
        {
          id: 'duplicate',
          type: 'button',
          label: 'Duplicate',
          iconLeft: Copy,
          onClick: () => console.log('Duplicate clicked')
        },
        {
          id: 'notifications',
          type: 'switch',
          label: 'Notifications',
          checked: notifications,
          onCheckedChange: setNotifications
        },
        {
          id: 'delete',
          type: 'button',
          label: 'Delete',
          iconLeft: Trash,
          variant: 'error',
          confirm: {
            title: 'Delete item?',
            description: 'This action cannot be undone.',
            onConfirm: () => console.log('Deleted')
          }
        }
      ]}
      align="end"
    >
      <Button iconLeft={MoreVertical} variant="subtle" />
    </Menu>
  )
}
```

### RadioGroup

```tsx
import { RadioGroup } from 'slate-ui'
import { CreditCard, Building, Wallet } from 'lucide-react'

function RadioGroupExample() {
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)

  return (
    <RadioGroup
      value={paymentMethod}
      onChange={setPaymentMethod}
      orientation="vertical"
      items={[
        {
          id: 'card',
          name: 'Credit Card',
          description: 'Pay with Visa, Mastercard, or Amex',
          iconLeft: CreditCard
        },
        {
          id: 'bank',
          name: 'Bank Transfer',
          description: 'Direct bank transfer',
          iconLeft: Building
        },
        {
          id: 'wallet',
          name: 'Digital Wallet',
          description: 'Apple Pay, Google Pay',
          iconLeft: Wallet
        }
      ]}
    />
  )
}
```

### Slider

```tsx
import { Slider } from 'slate-ui'

function SliderExample() {
  const [volume, setVolume] = useState([50])
  const [priceRange, setPriceRange] = useState([20, 80])

  return (
    <div className="space-y-6">
      {/* Single value slider */}
      <Slider
        label="Volume"
        value={volume}
        onValueChange={setVolume}
        min={0}
        max={100}
        step={1}
      />

      {/* Range slider */}
      <Slider
        label="Price Range"
        value={priceRange}
        onValueChange={setPriceRange}
        min={0}
        max={100}
        step={5}
      />
    </div>
  )
}
```

### Progress

```tsx
import { Progress } from 'slate-ui'

function ProgressExample() {
  return (
    <div className="space-y-4">
      {/* Basic progress */}
      <Progress value={65} />

      {/* With sections */}
      <Progress value={75} sections={4} size="md" gap="sm" />

      {/* Different sizes */}
      <Progress value={40} size="sm" />
      <Progress value={60} size="lg" />
    </div>
  )
}
```

### DatePicker

```tsx
import { DatePicker } from 'slate-ui'

function DatePickerExample() {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      minDate={new Date()}
      maxDate={new Date(2025, 11, 31)}
    />
  )
}
```

### FileUpload

```tsx
import { FileUpload } from 'slate-ui'
import { Upload } from 'lucide-react'

function FileUploadExample() {
  const [uploading, setUploading] = useState(false)

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setUploading(true)
    // Handle upload...
    setUploading(false)
  }

  return (
    <FileUpload
      title="Upload files"
      subText="Drag and drop or click to browse"
      icon={Upload}
      uploading={uploading}
      onChange={handleChange}
      accept="image/*,.pdf"
      multiple
    />
  )
}
```

### Popover

```tsx
import { Popover, Button } from 'slate-ui'
import { Info } from 'lucide-react'

function PopoverExample() {
  return (
    <Popover
      content={
        <div className="p-3 max-w-xs">
          <h4 className="font-semibold mb-2">More Information</h4>
          <p className="text-sm text-gray-600">
            This is additional context that appears in a popover.
          </p>
        </div>
      }
      side="bottom"
    >
      <Button iconLeft={Info} variant="subtle">
        Learn More
      </Button>
    </Popover>
  )
}
```

### Modal

```tsx
import { useState } from 'react'
import { Modal, Button, TextInput, Select } from 'slate-ui'
import { X } from 'lucide-react'

function ModalExample() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', role: null as string | null })

  const roles = [
    { id: 'admin', name: 'Admin' },
    { id: 'editor', name: 'Editor' },
    { id: 'viewer', name: 'Viewer' }
  ]

  const handleSubmit = () => {
    console.log('Submitted:', formData)
    setIsOpen(false)
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        closeOnClickOutside={true}
        closeOnEscape={true}
        className="w-[500px]"
        styles={{
          overlay: { backdropFilter: 'blur(4px)' },
          content: { borderRadius: '12px' }
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Add Team Member</h2>
          <Button
            variant="subtle"
            size="sm"
            iconLeft={X}
            onClick={() => setIsOpen(false)}
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <TextInput
            label="Name"
            placeholder="Enter name"
            value={formData.name}
            onChange={(value) => setFormData((prev) => ({ ...prev, name: value }))}
          />

          <Select
            label="Role"
            placeholder="Select a role"
            items={roles}
            value={formData.role}
            onChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-4 border-t bg-gray-50">
          <Button variant="default" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add Member
          </Button>
        </div>
      </Modal>
    </>
  )
}
```

#### Modal with Scrollable Content

```tsx
import { Modal, Button } from 'slate-ui'

function ScrollableModalExample() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      {/* Fixed header */}
      <div className="p-4 border-b sticky top-0 bg-white">
        <h2 className="text-lg font-semibold">Terms and Conditions</h2>
      </div>

      {/* Scrollable content */}
      <div className="p-4 overflow-y-auto max-h-[60vh]">
        <p className="text-sm text-gray-600">
          {/* Long content here */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>
      </div>

      {/* Fixed footer */}
      <div className="p-4 border-t sticky bottom-0 bg-white">
        <Button variant="primary" className="w-full" onClick={() => setIsOpen(false)}>
          I Accept
        </Button>
      </div>
    </Modal>
  )
}
```

#### Modal with Form Validation

```tsx
import { useState } from 'react'
import { Modal, Button, TextInput } from 'slate-ui'

function FormModalExample() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const handleSubmit = async () => {
    if (!email.includes('@')) {
      setError('Please enter a valid email')
      return
    }

    setLoading(true)
    setError(undefined)

    try {
      // API call here
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsOpen(false)
      setEmail('')
    } catch {
      setError('Failed to submit. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      open={isOpen}
      onClose={() => !loading && setIsOpen(false)}
      closeOnClickOutside={!loading}
      closeOnEscape={!loading}
    >
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Subscribe to Newsletter</h2>

        <TextInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={setEmail}
          error={error}
          disabled={loading}
        />

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="default" onClick={() => setIsOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} loading={loading}>
            Subscribe
          </Button>
        </div>
      </div>
    </Modal>
  )
}
```

### Button Variants

```tsx
import { Button } from 'slate-ui'
import { Plus, Download, Trash, Check, AlertTriangle, Info } from 'lucide-react'

function ButtonVariantsExample() {
  return (
    <div className="flex flex-wrap gap-2">
      {/* Default - outlined, low emphasis */}
      <Button variant="default">Default</Button>

      {/* Primary - solid brand color */}
      <Button variant="primary" iconLeft={Plus}>
        Primary
      </Button>

      {/* Secondary - alternative brand color */}
      <Button variant="secondary">Secondary</Button>

      {/* Subtle - minimal, transparent */}
      <Button variant="subtle">Subtle</Button>

      {/* Success - green, positive actions */}
      <Button variant="success" iconLeft={Check}>
        Success
      </Button>

      {/* Warning - amber, caution */}
      <Button variant="warning" iconLeft={AlertTriangle}>
        Warning
      </Button>

      {/* Error - red, destructive actions */}
      <Button variant="error" iconLeft={Trash}>
        Delete
      </Button>

      {/* Info - blue, informational */}
      <Button variant="info" iconLeft={Info}>
        Info
      </Button>

      {/* Sizes */}
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>

      {/* Loading state */}
      <Button loading>Loading...</Button>

      {/* Icon positions */}
      <Button iconLeft={Download}>Download</Button>
      <Button iconRight={Download}>Download</Button>
    </div>
  )
}
```

### Select with Search

```tsx
import { Select } from 'slate-ui'
import { Globe } from 'lucide-react'

type Country = { id: string; name: string }

function SelectExample() {
  const [country, setCountry] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const countries: Country[] = [
    { id: 'us', name: 'United States' },
    { id: 'ca', name: 'Canada' },
    { id: 'uk', name: 'United Kingdom' },
    { id: 'de', name: 'Germany' },
    { id: 'fr', name: 'France' }
  ]

  // Filter items based on search (for server-side search)
  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Select
      label="Country"
      placeholder="Select a country"
      items={filteredCountries}
      value={country}
      onChange={(value, item) => {
        setCountry(value)
        console.log('Selected:', item)
      }}
      searchable
      search={search}
      onSearchChange={setSearch}
      clearable
      iconLeft={Globe}
      error={!country ? 'Country is required' : undefined}
    />
  )
}
```

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
  SlateProvider
} from 'slate-ui'

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: null as string | null,
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
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>

        <div className="space-y-4">
          <TextInput
            label="Name"
            value={formData.name}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, name: value }))
            }
          />

          <TextInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, email: value }))
            }
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
          />

          <Checkbox
            checked={formData.newsletter}
            onChange={(checked) =>
              setFormData((prev) => ({ ...prev, newsletter: checked }))
            }
            label="Subscribe to our newsletter"
          />
        </div>

        <Button className="w-full mt-6">Send Message</Button>
      </div>
    </SlateProvider>
  )
}
```

This documentation provides everything needed to effectively use the Slate UI component library in React applications. The library prioritizes accessibility, type safety, and developer experience while maintaining flexibility for customization.
