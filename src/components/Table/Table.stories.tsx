import {
  Calendar,
  Construction,
  User,
} from 'lucide-react';

import {
  Meta,
  StoryObj,
} from '@storybook/react';

import { TooltipProvider } from '../Tooltip';
import { Table } from './';
import { TableProps } from './Table.types';

function TableStory({
  columns: _columns,
  page: _page,
  onPageChange: _onPageChange,
  ...props
}: TableProps<{ id: string; name: string; age: number }>) {
  return (
    <Table
      columns={[
        {
          id: 'name',
          value: 'Name',
          icon: User,
          cell: ({ row }) => row.name
        },
        {
          id: 'age',
          value: 'Age',
          cell: ({ row }) => row.age,
          icon: Calendar,
          tooltip: 'The age of the person'
        }
      ]}
      {...props}
    />
  )
}

const meta: Meta<typeof TableStory> = {
  title: 'Display/Table',
  component: TableStory,
  argTypes: {
    pageSize: {
      description: 'Number of rows to show per page.',
      control: {
        type: 'number'
      }
    },
    columns: {
      description: 'Array of column objects. Must have key. Can include icons.'
    },
    rows: {
      description:
        'Array of row objects. Must have key and cells. Cells must have a key that matches a column key.'
    },
    paginate: {
      description:
        'Whether to paginate (actually slice data based on the page number) the table.',
      control: {
        type: 'boolean'
      }
    },
    showPagination: {
      description: 'Whether to show pagination controls.',
      control: {
        type: 'boolean'
      }
    },
    page: {
      description: 'Current page number. Can be controlled or uncontrolled.'
    },
    onPageChange: {
      description:
        'Callback function for when the page changes. Can be controlled or uncontrolled.'
    },
    loading: {
      description: 'Whether to show a loading spinner.',
      control: {
        type: 'boolean'
      }
    },
    totalRows: {
      description:
        'Total number of rows in the table. Only set this if pagination is controlled.',
      control: {
        type: 'number'
      }
    },
    emptyState: {
      description: 'Object to show when there are no rows.'
    }
  },
  args: {
    paginate: false
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    )
  ]
}

export default meta
type Story = StoryObj<typeof TableStory>

export const Primary: Story = {
  args: {
    rows: [
      { id: '1', name: 'John Doe', age: 25 },
      { id: '2', name: 'Jane Doe', age: 30 },
      { id: '3', name: 'John Smith', age: 35 },
      { id: '4', name: 'Jane Smith', age: 40 },
      { id: '5', name: 'John Johnson', age: 45 },
      { id: '6', name: 'Jane Johnson', age: 50 },
      { id: '7', name: 'John Brown', age: 55 },
      { id: '8', name: 'Jane Brown', age: 60 },
      { id: '9', name: 'John White', age: 65 },
      { id: '10', name: 'Jane White', age: 70 },
      { id: '11', name: 'John Black', age: 75 },
      { id: '12', name: 'Jane Black', age: 80 },
      { id: '13', name: 'John Green', age: 85 },
      { id: '14', name: 'Jane Green', age: 90 },
      { id: '15', name: 'John Blue', age: 95 },
      { id: '16', name: 'Jane Blue', age: 100 }
    ]
  }
}

export const Empty: Story = {
  args: {
    rows: [],
    emptyState: {
      icon: Construction,
      title: 'Woah! No data here!',
      button: {
        iconLeft: Calendar,
        children: 'Add Row',
        onClick: () => alert('Add Row clicked!')
      }
    }
  }
}
