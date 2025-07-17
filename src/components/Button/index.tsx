import { forwardRef } from 'react'

import { cva } from 'class-variance-authority'
import { LoaderCircle } from 'lucide-react'

import { cn } from '../../utilities'
import {
  SlateSize,
  SlateVariant,
  Variants
} from '../../utilities/types'
import { Icon } from '../Icon'
import { ButtonProps } from './Button.types'

export const buttonVariants = cva<
  Variants<{ variant: SlateVariant; size: SlateSize; loading: boolean }>
>(
  [
    'rounded-lg border text-sm focus:outline-none focus:ring-2 flex items-center gap-1',
    '!disabled:hover:shadow-inner ring-offset-1 disabled:bg-muted-test disabled:text-muted',
    'disabled:cursor-not-allowed shrink-0 relative justify-between'
  ],
  {
    variants: {
      variant: {
        primary: 'bg-primary ring-primary text-anti-primary',
        secondary: 'bg-secondary text-anti-secondary ring-secondary',
        subtle:
          'bg-transparent border-transparent hover:shadow-none disabled:bg-transparent'
      },
      size: {
        sm: 'px-2 h-6 text-sm',
        md: 'px-3 h-8',
        lg: 'px-4 h-10 text-lg'
      },
      loading: {
        true: 'cursor-not-allowed !text-transparent',
        false: 'active:enabled:scale-[98%]'
      }
    }
  }
)

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      className,
      children,
      styles,
      iconLeft,
      iconRight,
      loading,
      disabled,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, loading }), className)}
      style={styles?.root}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 visible flex items-center justify-center text-muted">
          <Icon icon={LoaderCircle} variant="subtle" className="animate-spin" />
        </div>
      )}

      {iconLeft && (
        <Icon icon={iconLeft} variant="subtle" style={styles?.icon} />
      )}
      {children}
      {iconRight && (
        <Icon icon={iconRight} variant="subtle" style={styles?.icon} />
      )}
    </button>
  )
)

Button.displayName = 'Button'
