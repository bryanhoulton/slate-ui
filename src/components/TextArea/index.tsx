import {
  forwardRef,
  useState
} from 'react'

import { cva } from 'class-variance-authority'

import { cn } from '../../utilities'
import {
  SlateVariant,
  Variants
} from '../../utilities/types'
import { Label } from '../Label'
import { TextAreaProps } from './TextArea.types'

export const textAreaVariants = cva<
  Variants<{
    variant: SlateVariant
    error: boolean
  }>
>(
  [
    'rounded-lg border text-sm focus:outline-none focus:ring-2 w-full h-full',
    'transition relative ring-offset-1 py-1.5 px-3 min-h-16'
  ],
  {
    variants: {
      variant: {
        primary: 'ring-primary',
        secondary: 'ring-secondary',
        default: 'bg-transparent hover:shadow-none',
        subtle: 'bg-transparent border-transparent hover:shadow-none',
        success: 'ring-success',
        warning: 'ring-warning',
        error: 'ring-error',
        info: 'ring-info'
      },
      error: {
        true: 'border-error-500'
      }
    }
  }
)

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      error,
      value: valueProp,
      defaultValue,
      onChange,
      className,
      styles,
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState<string>(valueProp ?? defaultValue ?? '')
    return (
      <div
        className={cn('flex flex-col gap-1', className)}
        style={styles?.root}
      >
        {label && <Label styles={styles?.label}>{label}</Label>}
        <textarea
          style={styles?.input}
          value={valueProp ?? value}
          className={textAreaVariants({
            variant,
            error: Boolean(error)
          })}
          onChange={(e) => {
            setValue(e.target.value)
            onChange?.(e.target.value, e)
          }}
          ref={ref}
          {...props}
        />
        {error && (
          <small className="text-xs text-error-500 ml-1" style={styles?.error}>
            {error}
          </small>
        )}
      </div>
    )
  }
)
TextArea.displayName = 'TextArea'
