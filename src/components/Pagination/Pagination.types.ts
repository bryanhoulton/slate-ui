import { HTMLProps } from 'react'

export interface PaginationProps extends HTMLProps<HTMLDivElement> {
  pageSize: number
  maxRow: number
  page?: number
  onPageChange?: (page: number) => void
}
