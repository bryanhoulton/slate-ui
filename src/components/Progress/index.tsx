import { cva } from 'class-variance-authority'

import {
  cn,
  SlateSize,
  Variants
} from '../../utilities'
import { ProgressProps } from './Progress.types'

const variants = cva<
  Variants<{
    gap: SlateSize
    size: SlateSize
  }>
>(['flex justify-between w-48'], {
  variants: {
    gap: {
      sm: 'gap-x-1',
      md: 'gap-x-2',
      lg: 'gap-x-4'
    },
    size: {
      sm: 'h-0.5',
      md: 'h-1',
      lg: 'h-2'
    }
  }
})

export function Progress({
  sections = 1,
  max = 100,
  min = 0,
  value,
  className,
  styles,
  gap = 'md',
  size = 'md',
  ...rest
}: ProgressProps) {
  const stepSize = (max - min) / sections

  return (
    <div
      className={cn(variants({ gap, size }), className)}
      style={{ ...styles?.root }}
      {...rest}
    >
      {Array.from({ length: sections }).map((_, i) => {
        const valueLeft = Math.max(value - (min + i * stepSize), 0)
        return (
          <div
            key={i}
            className={cn('overflow-hidden rounded bg-muted-test')}
            style={{
              width: `${100 / sections}%`
            }}
          >
            <div
              className={cn('h-full rounded bg-primary')}
              style={{
                width: Math.min(valueLeft / stepSize, 1) * 100 + '%',
                transition: 'width 0.3s linear',
                ...styles?.bar
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
