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
    'active:scale-[98%]'
  ],
  {
    variants: {
      size: {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
      },
      variant: {
        primary: 'text-default bg-white',
        secondary: 'text-anti-primary bg-primary',
        subtle:
          'text-default bg-transparent border-transparent border-transparent hover:shadow-none'
      }
    }
  }
)

export const ActionIcon = forwardRef<HTMLButtonElement, ActionIconProps>(
  (
    {
      icon,
      variant = 'primary',
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
        className={cn(variants({ size, variant }), className)}
        disabled={disabled}
        {...props}
      >
        <Icon icon={icon} size={size} variant="subtle" className={className} />
      </button>
    </Tooltip>
  )
)
ActionIcon.displayName = 'ActionIcon'
