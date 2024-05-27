import { cn } from '../../utilities'
import { LabelProps } from './Label.types'

export function Label({ className, styles, ...props }: LabelProps) {
  return (
    <label
      className={cn('text-sm', className)}
      style={styles?.root}
      {...props}
    />
  )
}
