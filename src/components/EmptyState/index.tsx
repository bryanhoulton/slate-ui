import { cn } from '../../utilities'
import { Button } from '../Button'
import { Icon } from '../Icon'
import { EmptyStateProps } from './EmptyState.types'

export function EmptyState({
  title,
  icon,
  button,
  className,
  styles
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'text-muted flex flex-col items-center justify-center gap-2 py-12 text-base',
        className
      )}
      style={styles?.root}
    >
      <Icon
        icon={icon}
        variant="default"
        strokeWidth={1.5}
        className="w-12 h-12"
        style={styles?.icon}
      />
      <div style={styles?.title}>
        {title || 'There are no items to display'}
      </div>
      {button && (
        <Button {...button} styles={{ ...button.styles, ...styles?.button }} />
      )}
    </div>
  )
}
