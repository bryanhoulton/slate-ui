import { cva } from 'class-variance-authority'

import { cn } from '../../utilities'
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
        subtle: 'bg-transparent'
      },
      size: {
        sm: 'px-2 h-6',
        md: 'px-3 h-8',
        lg: 'px-4 h-10'
      }
    }
  }
)

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  styles,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(variants({ variant, size }), className)}
      style={styles?.root}
    >
      Click me
    </button>
  )
}
