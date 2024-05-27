import { cva } from 'class-variance-authority'

import { cn } from '../../utilities'
import { Label } from '../Label'
import { TextInputProps } from './TextInput.types'

const variants = cva<
  Variants<{ variant: SlateVariant; size: SlateSize; error: boolean }>
>(
  [
    'rounded-lg border text-sm focus:outline-none focus:ring-2',
    'focus:ring-primary hover:shadow-inner transition'
  ],
  {
    variants: {
      variant: {
        primary: '',
        secondary: '',
        subtle: 'bg-transparent border-transparent hover:shadow-none'
      },
      size: {
        sm: 'px-2 h-6',
        md: 'px-3 h-8',
        lg: 'px-4 h-10'
      },
      error: {
        true: 'border-error'
      }
    }
  }
)

export function TextInput({
  label,
  error,
  value,
  onChange,
  className,
  styles,
  variant = 'primary',
  size = 'md',
  ...props
}: TextInputProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)} style={styles?.root}>
      <Label styles={styles?.label}>{label}</Label>
      <input
        style={styles?.input}
        value={value}
        className={variants({
          variant,
          size,
          error: Boolean(error)
        })}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
      {error && (
        <small className="text-xs text-error ml-1" style={styles?.error}>
          {error}
        </small>
      )}
    </div>
  )
}
