import {
  forwardRef,
  useState
} from 'react'

import { cva } from 'class-variance-authority'

import { cn } from '../../utilities'
import {
  SlateSize,
  SlateVariant,
  Variants
} from '../../utilities/types'
import { Label } from '../Label'
import { TextAreaProps } from './TextArea.types'

export const textAreaVariants = cva<
  Variants<{
    variant: SlateVariant
    size: SlateSize
    error: boolean
  }>
>(
  [
    'rounded-lg border text-sm focus:outline-none focus:ring-2 w-full h-full',
    'transition relative ring-offset-1 py-1.5 min-h-16'
  ],
  {
    variants: {
      variant: {
        primary: 'ring-primary',
        secondary: 'ring-secondary',
        subtle: 'bg-transparent border-transparent hover:shadow-none'
      },
      size: {
        sm: 'px-2 h-6',
        md: 'px-3 h-8',
        lg: 'px-4 h-10'
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
      variant = 'primary',
      size = 'md',
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
            size,
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
