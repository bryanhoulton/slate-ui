import { forwardRef } from 'react'

import { cva } from 'class-variance-authority'

import { cn } from '../../utilities'
import { SlateSize, SlateVariant, Variants } from '../../utilities/types'
import { ButtonProps } from './Button.types'

const variants = cva<Variants<{ variant: SlateVariant; size: SlateSize }>>(
  [
    'rounded-lg border text-sm focus:outline-none focus:ring-2',
    'focus:ring-primary hover:shadow-inner'
  ],
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white',
        secondary: 'bg-secondary text-white',
        subtle: 'bg-transparent border-transparent hover:shadow-none'
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
  ({ variant = 'primary', size = 'md', className, styles, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(variants({ variant, size }), className)}
      style={styles?.root}
      {...props}
    />
  )
)

Button.displayName = 'Button'
