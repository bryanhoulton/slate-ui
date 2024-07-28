import { useRef } from 'react'

import { cva } from 'class-variance-authority'
import { Info } from 'lucide-react'

import { cn, useSometimesControlled } from '../../utilities'
import { Icon } from '../Icon'
import { Pagination } from '../Pagination'
import { Tooltip } from '../Tooltip'
import { RowType, TableProps } from './Table.types'

export const tableVariants = cva(['table-auto divide-y'], {
  variants: {}
})

export const tableRowVariants = cva([''], {
  variants: {
    clickable: {
      true: 'cursor-pointer hover:bg-subtle',
      false: ''
    }
  }
})

export const tableCellVariants = cva(['py-3 px-3'], {
  variants: {
    isHeader: {
      true: 'text-muted text-sm font-medium leading-none',
      false: 'text-emphasis leading-5'
    }
  }
})

export function Table<R extends RowType>({
  columns,
  className,
  styles,
  pageSize: pageSizeProp,
  paginate = false,
  showPagination = false,
  disableScroll = false,
  page: pageProp,
  rows,
  loading,
  onRowClick,
  totalRows: totalRowsProp,
  onPageChange: onPageChangeProp,
  ...props
}: TableProps<R>) {
  const pageSize = pageSizeProp ?? rows.length
  const totalRows = totalRowsProp ?? rows.length
  const [page, onPageChange] = useSometimesControlled({
    valueProp: pageProp,
    defaultValue: 0,
    onChangeProp: onPageChangeProp
  })
  const rowsToShow = paginate
    ? rows.slice(page * pageSize, (page + 1) * pageSize)
    : rows
  const tableHeadRef = useRef<HTMLTableSectionElement>(null)

  function handlePageChange(page: number) {
    onPageChange(page)
    if (!disableScroll) {
      tableHeadRef.current?.scrollIntoView(true)
    }
  }

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <table className={tableVariants({})} style={styles?.table} {...props}>
        <thead ref={tableHeadRef}>
          <tr className={tableRowVariants({ clickable: false })}>
            {columns.map(
              (column) =>
                !column.hidden && (
                  <th
                    className={tableCellVariants({ isHeader: true })}
                    align="left"
                    key={column.id}
                  >
                    <div className="flex items-center gap-2">
                      {column.icon && (
                        <Icon icon={column.icon} variant="subtle" />
                      )}
                      {column.value}
                      {column.tooltip && (
                        <Tooltip content={column.tooltip}>
                          <Icon icon={Info} variant="subtle" />
                        </Tooltip>
                      )}
                    </div>
                  </th>
                )
            )}
          </tr>
        </thead>
        <tbody className="divide-y !border-b text-sm">
          {/* Rows. */}
          {!loading &&
            rowsToShow.map((row) => (
              <tr
                className={tableRowVariants({
                  clickable: onRowClick != undefined
                })}
                onClick={() => onRowClick?.(row)}
                key={row.id}
              >
                {columns.map(
                  (column) =>
                    !column.hidden && (
                      <td
                        className={tableCellVariants({})}
                        key={column.id}
                        data-test-id={column.id}
                      >
                        {column.cell({ row })}
                      </td>
                    )
                )}
              </tr>
            ))}

          {/* Loading state. Pulsing skeleton. */}
          {loading &&
            Array.from({ length: 15 }).map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <tr key={i}>
                {columns.map((column) => (
                  <td className="px-2 py-4" key={column.id}>
                    <div className="bg-muted animate-pulse rounded-md py-2 text-base"></div>
                  </td>
                ))}
              </tr>
            ))}

          {/* Empty state. */}
          {!loading && rowsToShow.length === 0 && (
            <tr>
              <td colSpan={columns.length}>
                <div className="text-muted flex items-center justify-center py-12 text-base">
                  There are no items to display
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {rowsToShow.length != 0 && showPagination && (
        <Pagination
          pageSize={pageSize}
          maxRow={totalRows}
          page={page}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}
