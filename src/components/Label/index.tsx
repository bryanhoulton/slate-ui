import { forwardRef } from 'react'

import { cn } from '../../utilities'
import { LabelProps } from './Label.types'

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, styles, ...props }, ref) => (
    <label
      ref={ref}
      className={cn('text-sm', className)}
      style={styles?.root}
      {...props}
    />
  )
)
