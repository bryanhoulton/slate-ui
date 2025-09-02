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
>(['flex gap-1 items-center w-fit px-2 rounded-full shrink-0'], {
  variants: {
    variant: {
      primary: 'bg-primary text-anti-primary',
      secondary: 'bg-secondary text-anti-secondary border',
      subtle: ''
    },
    size: {
      sm: 'h-5 text-xs',
      md: 'h-6 text-sm',
      lg: 'h-8 text-lg'
    }
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

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'primary',
      iconLeft,
      iconRight,
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
        {iconLeft && (
          <Icon
            icon={iconLeft}
            variant="subtle"
            className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'}
          />
        )}
        <span className="shrink-0">{children}</span>
        {iconRight && (
          <Icon
            icon={iconRight}
            variant="subtle"
            className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'}
          />
        )}
      </span>
    )
  }
)
Badge.displayName = 'Badge'
