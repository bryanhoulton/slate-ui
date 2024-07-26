import { forwardRef } from 'react'

import { Check } from 'lucide-react'

import { cn } from '../../utilities'
import { Icon } from '../Icon'
import { SelectItemProps } from './SelectItem.types'

export const SelectItemComponent = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ name, icon, selected, ...props }, forwardedRef) => {
    return (
      <div
        className={cn(
          'leading-none text-sm rounded-lg flex items-center justify-between relative px-2 py-1 cursor-pointer',
          'select-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none',
          'hover:bg-muted',
          selected && 'text-primary'
        )}
        {...props}
        ref={forwardedRef}
      >
        <div className="flex gap-1 items-center">
          {icon && <Icon icon={icon} variant="subtle" />}
          <span>{name}</span>
        </div>
        {selected && <Icon icon={Check} variant="subtle" />}
      </div>
    )
  }
)
