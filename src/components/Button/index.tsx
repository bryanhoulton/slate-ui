import { cva } from 'class-variance-authority'

import { cn } from '../../utilities'
import { ButtonProps } from './Button.types'

const variants = cva<Variants<{ variant: SlateVariant; size: SlateSize }>>([], {
  variants: {
    variant: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-500 text-white',
      subtle: 'bg-gray-100 text-gray-500'
    },
    size: {
      xs: 'text-xs',
      sm: 'px-2 py-1 text-sm',
      md: 'px-3 py-2 text-base',
      lg: 'px-4 py-3 text-lg',
      xl: 'px-5 py-4 text-xl'
    }
  }
})

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
