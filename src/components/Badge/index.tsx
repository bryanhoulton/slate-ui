import { forwardRef } from 'react'

import { cva } from 'class-variance-authority'

import {
  cn,
  SlateSize,
  SlateVariant,
  Variants
} from '../../utilities'
import { Icon } from '../Icon'
import { BadgeProps } from './Badge.types'

const variants = cva<
  Variants<{
    variant: SlateVariant
    size: SlateSize
    iconLeft: boolean
    iconRight: boolean
  }>
>(['flex gap-2 items-center w-fit px-2 rounded-full shrink-0 border bg-white'], {
  variants: {
    // Every variant shares the default look; the dot carries the color.
    variant: {
      primary: '',
      secondary: '',
      default: '',
      subtle: '',
      success: '',
      warning: '',
      error: '',
      info: ''
    },
    size: {
      sm: 'h-5 text-xs',
      md: 'h-6 text-sm',
      lg: 'h-8 text-lg px-3'
    },
    iconLeft: {},
    iconRight: {}
  },
  compoundVariants: [
    {
      size: 'sm',
      iconLeft: true,
      className: 'pl-1.5'
    },
    {
      size: 'sm',
      iconRight: true,
      className: 'pr-1.5'
    }
  ]
})

const dotVariants = cva<
  Variants<{ variant: SlateVariant; size: SlateSize }>
>(['rounded-full shrink-0'], {
  variants: {
    variant: {
      primary: 'bg-primary',
      secondary: 'bg-secondary-400',
      default: 'bg-primary-300',
      subtle: 'bg-primary-100',
      success: 'bg-success-500',
      warning: 'bg-warning-500',
      error: 'bg-error-500',
      info: 'bg-info-500'
    },
    size: {
      sm: 'h-1.5 w-1.5',
      md: 'h-2 w-2',
      lg: 'h-2.5 w-2.5'
    }
  }
})

/** When iconLeft replaces the dot, it takes over the variant color. */
const iconColorVariants = cva<Variants<{ variant: SlateVariant }>>([''], {
  variants: {
    variant: {
      primary: 'text-primary',
      secondary: 'text-secondary-400',
      default: 'text-primary-300',
      subtle: 'text-primary-100',
      success: 'text-success-500',
      warning: 'text-warning-500',
      error: 'text-error-500',
      info: 'text-info-500'
    }
  }
})

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      iconLeft,
      iconRight,
      dot = true,
      size = 'md',
      className,
      styles,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        {...rest}
        className={cn(
          variants({
            variant,
            size,
            iconLeft: Boolean(iconLeft),
            iconRight: Boolean(iconRight)
          }),
          className
        )}
        style={styles?.root}
      >
        {iconLeft ? (
          <Icon
            icon={iconLeft}
            variant="default"
            className={cn(
              size === 'sm' ? 'h-3 w-3' : 'h-4 w-4',
              iconColorVariants({ variant })
            )}
          />
        ) : (
          dot && <span className={dotVariants({ variant, size })} />
        )}
        <span className="shrink-0">{children}</span>
        {iconRight && (
          <Icon
            icon={iconRight}
            variant="default"
            className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'}
          />
        )}
      </span>
    )
  }
)
Badge.displayName = 'Badge'
