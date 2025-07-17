import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Pagination } from './'
import { PaginationProps } from './Pagination.types'

function PaginationStory({
  onPageChange: _onPageChange,
  page: _page,
  ...props
}: PaginationProps) {
  const [page, setPage] = useState(0)
  return <Pagination {...props} page={page} onPageChange={setPage} />
}

const meta: Meta<typeof PaginationStory> = {
  title: 'Inputs/Pagination',
  component: PaginationStory,
  argTypes: {
    pageSize: {
      control: {
        type: 'number'
      }
    },
    maxRow: {
      control: {
        type: 'number'
      }
    },
    page: {
      control: {
        type: 'number'
      }
    }
  },
  args: {
    pageSize: 25,
    maxRow: 157,
    onPageChange: () => {}
  }
}

export default meta
type Story = StoryObj<typeof PaginationStory>

export const Primary: Story = {
  args: {}
}
