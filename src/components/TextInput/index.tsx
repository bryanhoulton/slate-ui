import {
  forwardRef,
  useState,
} from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '../../utilities';
import {
  SlateSize,
  SlateVariant,
  Variants,
} from '../../utilities/types';
import { Icon } from '../Icon';
import { Label } from '../Label';
import { TextInputProps } from './TextInput.types';

export const textInputVariants = cva<
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
    'hover:shadow-inner transition relative ring-offset-1 disabled:text-muted'
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
      value: valueProp,
      defaultValue,
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
  ) => {
    const [value, setValue] = useState<string>(valueProp ?? defaultValue ?? '')
    return (
      <div
        className={cn('flex flex-col gap-1', className)}
        style={styles?.root}
      >
        {label && <Label styles={styles?.label}>{label}</Label>}
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
            value={valueProp ?? value}
            className={textInputVariants({
              variant,
              size,
              error: Boolean(error),
              iconLeft: Boolean(iconLeft),
              iconRight: Boolean(iconRight)
            })}
            onChange={(e) => {
              setValue(e.target.value)
              onChange?.(e.target.value, e)
            }}
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
  }
)
TextInput.displayName = 'TextInput'
