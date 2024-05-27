import { forwardRef } from 'react'

import { cva } from 'class-variance-authority'

import { cn } from '../../utilities'
import { SlateSize, SlateVariant, Variants } from '../../utilities/types'
import { IconProps } from './Icon.types'

const variants = cva<
  Variants<{
    size: SlateSize
    variant: SlateVariant
  }>
>([''], {
  variants: {
    size: {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-6 h-6'
    },
    variant: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      subtle: 'text-inherit'
    }
  }
})

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    { icon: Icon, className, size = 'md', variant = 'primary', ...props },
    ref
  ) => (
    <Icon
      ref={ref}
      className={cn(variants({ size, variant }), className)}
      {...props}
    />
  )
)
Icon.displayName = 'Icon'
