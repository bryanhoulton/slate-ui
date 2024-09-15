import {
  CSSProperties,
  ReactNode,
  TableHTMLAttributes,
} from 'react';

import { LucideIcon } from 'lucide-react';

import { Styleable } from '../../utilities';
import { EmptyStateProps } from '../EmptyState/EmptyState.types';
import { PaginationProps } from '../Pagination/Pagination.types';

export type TableStyles = {
  table: CSSProperties
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RowType = Record<string, any>
export type TableColumn<R extends RowType> = {
  id: string
  value: string
  icon?: LucideIcon
  tooltip?: string
  cell: (args: { row: R }) => ReactNode
  hidden?: boolean
}

export interface TableProps<R extends RowType>
  extends Omit<TableHTMLAttributes<HTMLTableElement>, 'children'>,
    Styleable<TableStyles>,
    Pick<PaginationProps, 'page' | 'onPageChange'> {
  columns: TableColumn<R>[]
  rows: R[]
  loading?: boolean
  emptyState?: EmptyStateProps

  onRowClick?: (row: R) => void

  pageSize?: number
  paginate?: boolean
  showPagination?: boolean
  disableScroll?: boolean
  totalRows?: number
}
