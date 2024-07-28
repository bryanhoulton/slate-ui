import { forwardRef } from 'react'

import { cva } from 'class-variance-authority'

import { cn } from '../../utilities'
import { SlateSize, SlateVariant, Variants } from '../../utilities/types'
import { Icon } from '../Icon'
import { ButtonProps } from './Button.types'

export const buttonVariants = cva<
  Variants<{ variant: SlateVariant; size: SlateSize }>
>(
  [
    'rounded-lg border flex items-center gap-1 text-sm focus:outline-none focus:ring-2',
    '!disabled:hover:shadow-inner ring-offset-1 disabled:bg-muted disabled:text-muted',
    'disabled:cursor-not-allowed'
  ],
  {
    variants: {
      variant: {
        primary: 'bg-primary ring-primary text-anti-primary',
        secondary: 'bg-secondary text-anti-secondary ring-secondary',
        subtle:
          'bg-transparent border-transparent hover:shadow-none disabled:bg-transparent'
      },
      size: {
        sm: 'px-2 h-6',
        md: 'px-3 h-8',
        lg: 'px-4 h-10'
      }
    }
  }
)

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      className,
      children,
      styles,
      iconLeft,
      iconRight,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      style={styles?.root}
      {...props}
    >
      {iconLeft && <Icon icon={iconLeft} variant="subtle" />}
      {children}
      {iconRight && <Icon icon={iconRight} variant="subtle" />}
    </button>
  )
)

Button.displayName = 'Button'
