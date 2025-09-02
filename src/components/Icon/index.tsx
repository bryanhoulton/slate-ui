import { forwardRef } from 'react'

import { cva } from 'class-variance-authority'

import { cn } from '../../utilities'
import {
  SlateSize,
  SlateVariant,
  Variants
} from '../../utilities/types'
import { IconProps } from './Icon.types'

const variants = cva<
  Variants<{
    size: SlateSize
    variant: SlateVariant
    spin: boolean
  }>
>(['shrink-0'], {
  variants: {
    size: {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-6 h-6'
    },
    spin: {
      true: 'animate-spin'
    },
    variant: {
      primary: 'text-default',
      secondary: 'text-secondary',
      subtle: 'text-inherit',
      error: 'text-error',
      info: 'text-blue-700',
      success: 'text-green-700'
    }
  }
})

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      icon: Icon,
      className,
      size = 'md',
      variant = 'primary',
      spin = false,
      ...props
    },
    ref
  ) => (
    <Icon
      ref={ref}
      className={cn(variants({ size, spin, variant }), className)}
      {...props}
    />
  )
)
Icon.displayName = 'Icon'
