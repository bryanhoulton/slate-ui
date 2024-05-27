import { forwardRef } from 'react'

import { cva } from 'class-variance-authority'

import { cn } from '../../utilities'
import { Icon } from '../Icon'
import { Label } from '../Label'
import { TextInputProps } from './TextInput.types'

const variants = cva<
  Variants<{
    variant: SlateVariant
    size: SlateSize
    error: boolean
    iconLeft: boolean
    iconRight: boolean
  }>
>(
  [
    'rounded-lg border text-sm focus:outline-none focus:ring-2 w-full',
    'focus:ring-primary hover:shadow-inner transition relative'
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
      },
      iconLeft: {
        true: 'pl-8'
      },
      iconRight: {
        true: 'pr-8'
      }
    }
  }
)

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      error,
      value,
      onChange,
      className,
      styles,
      variant = 'primary',
      size = 'md',
      iconLeft,
      iconRight,
      ...props
    },
    ref
  ) => (
    <div className={cn('flex flex-col gap-1', className)} style={styles?.root}>
      <Label styles={styles?.label}>{label}</Label>
      <div className={cn('relative')}>
        {iconLeft && (
          <Icon
            variant="secondary"
            icon={iconLeft}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10"
          />
        )}
        <input
          style={styles?.input}
          value={value}
          className={variants({
            variant,
            size,
            error: Boolean(error),
            iconLeft: Boolean(iconLeft),
            iconRight: Boolean(iconRight)
          })}
          onChange={(e) => onChange(e.target.value)}
          ref={ref}
          {...props}
        />
        {iconRight && (
          <Icon
            variant="secondary"
            icon={iconRight}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10"
          />
        )}
      </div>
      {error && (
        <small className="text-xs text-error ml-1" style={styles?.error}>
          {error}
        </small>
      )}
    </div>
  )
)
