import { forwardRef } from 'react'

import { cva } from 'class-variance-authority'
import { Check } from 'lucide-react'

import * as RCheckbox from '@radix-ui/react-checkbox'

import { cn, gid } from '../../utilities'
import { Icon } from '../Icon'
import { Label } from '../Label'
import { CheckboxProps } from './Checbox.types'

const checkboxWrapperVariants = cva(
  ['duration-150 w-fit rounded-lg flex items-center gap-2 select-none'],
  {
    variants: {
      withBody: {
        true: 'hover:bg-muted p-1.5',
        false: ''
      },
      disabled: {
        true: 'cursor-not-allowed',
        false: 'cursor-pointer'
      }
    },
    compoundVariants: [
      {
        withBody: true,
        disabled: true,
        className: 'bg-muted'
      }
    ]
  }
)

const checkboxRootVariants = cva([
  'items-center justify-center flex h-5 w-5 rounded duration-150 shadow-inner',
  'focus:outline-black disabled:cursor-not-allowed disabled:pointer-events-none',
  'data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-200'
])

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ disabled, label, id = gid(), withBody, ...props }, ref) => {
    return (
      <div className={checkboxWrapperVariants({ disabled, withBody })}>
        <RCheckbox.Root
          className={cn(checkboxRootVariants())}
          id={id}
          style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}
          disabled={disabled}
          ref={ref}
          {...props}
        >
          <RCheckbox.Indicator>
            <Icon icon={Check} className="text-white" />
          </RCheckbox.Indicator>
        </RCheckbox.Root>
        {label && (
          <Label
            className={cn(disabled ? 'cursor-not-allowed' : 'cursor-pointer')}
            htmlFor={id}
          >
            {label}
          </Label>
        )}
      </div>
    )
  }
)
Checkbox.displayName = 'Switch'
