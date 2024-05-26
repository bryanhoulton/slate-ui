import { cva } from 'class-variance-authority'

import { cn } from '../../utilities'
import { ButtonProps } from './Button.types'

const variants = cva<Variants<{ variant: SlateVariant }>>([], {
  variants: {
    variant: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-500 text-white',
      subtle: 'bg-gray-100 text-gray-500'
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
    <button className={cn()} style={styles?.root}>
      Click me
    </button>
  )
}
