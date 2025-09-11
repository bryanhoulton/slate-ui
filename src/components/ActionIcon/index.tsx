import { forwardRef } from 'react'

import { cva } from 'class-variance-authority'

import { cn } from '../../utilities'
import {
  SlateSize,
  SlateVariant,
  Variants
} from '../../utilities/types'
import { Icon } from '../Icon'
import { Tooltip } from '../Tooltip'
import { ActionIconProps } from './ActionIcon.types'

const variants = cva<
  Variants<{
    size: SlateSize
    variant: SlateVariant
  }>
>(
  [
    'flex items-center justify-center rounded-lg border focus:outline-none',
    'focus:ring-2 focus:ring-primary not:disabled:hover:shadow-inner shrink-0',
    'disabled:bg-muted-light disabled:text-muted disabled:cursor-not-allowed',
    'active:scale-[98%] cursor-pointer'
  ],
  {
    variants: {
      size: {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
      },
      variant: {
        primary: 'bg-primary text-anti-primary',
        secondary: 'bg-secondary text-anti-secondary border',
        default: 'bg-transparent hover:shadow-none',
        subtle:
          'bg-transparent border-transparent hover:shadow-none hover:bg-muted-light',
        success: 'text-success-700 bg-success-100 border-transparent',
        warning: 'text-warning-700 bg-warning-100 border-transparent',
        error: 'text-error-700 bg-error-100 border-transparent',
        info: 'text-info-700 bg-info-100 border-transparent'
      }
    }
  }
)

export const ActionIcon = forwardRef<HTMLButtonElement, ActionIconProps>(
  (
    {
      icon,
      variant = 'default',
      size = 'md',
      className,
      tooltip,
      disabled,
      ...props
    },
    ref
  ) => (
    <Tooltip content={tooltip} disabled={disabled}>
      <button
        ref={ref}
        type="button"
        className={cn(variants({ size, variant }), className)}
        disabled={disabled}
        {...props}
      >
        <Icon icon={icon} size={size} variant="default" className={className} />
      </button>
    </Tooltip>
  )
)
ActionIcon.displayName = 'ActionIcon'
