import {
  cn,
  useSometimesControlled,
} from '../../utilities';
import { Button } from '../Button';
import { Select } from '../Select';
import { SelectItem } from '../Select/Select.types';
import { PaginationProps } from './Pagination.types';

export function Pagination({
  pageSize,
  maxRow,
  page: pageProp,
  onPageChange: onPageChangeProp = () => {},
  className,
  ...rest
}: PaginationProps) {
  const maxPage = Math.ceil(maxRow / (pageSize || 1))
  const [page, onPageChange] = useSometimesControlled({
    valueProp: pageProp,
    defaultValue: 0,
    onChangeProp: onPageChangeProp
  })
  const pageOptions: SelectItem<number>[] = Array.from({ length: maxPage }).map(
    (_, i) => ({
      id: i,
      name: `${pageSize * i + 1}-${Math.min(pageSize * i + pageSize, maxRow)}`
    })
  )

  return (
    <div
      className={cn('flex items-center justify-between px-3', className)}
      {...rest}
    >
      <div className="text-subtle flex items-center gap-1.5 text-sm leading-none">
        <span>Viewing</span>

        <Select
          items={pageOptions}
          value={page}
          onChange={(val) => val && onPageChange(val)}
          className="max-w-24"
        />

        <span>
          of <span className="text-default">{maxRow.toLocaleString()}</span>{' '}
          results
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          disabled={page === 0}
          onClick={() => onPageChange(page - 1)}
          variant="subtle"
        >
          Previous
        </Button>
        <Button
          disabled={page === maxPage - 1}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
