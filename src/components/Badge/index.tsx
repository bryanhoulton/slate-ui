import { forwardRef } from 'react';

import { cva } from 'class-variance-authority';

import {
  cn,
  SlateSize,
  SlateVariant,
  Variants,
} from '../../utilities';
import { Icon } from '../Icon';
import { BadgeProps } from './Badge.types';

const variants = cva<Variants<{ variant: SlateVariant; size: SlateSize }>>(
  ['flex gap-1 items-center w-fit px-2 rounded-full'],
  {
    variants: {
      variant: {
        primary: 'bg-primary text-anti-primary',
        secondary: 'bg-secondary text-anti-secondary',
        subtle: 'border'
      },
      size: {
        sm: 'h-4 text-xs',
        md: 'h-6 text-sm',
        lg: 'h-8 text-lg'
      }
    }
  }
)

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'primary',
      iconLeft,
      iconRight,
      size = 'md',
      label,
      className,
      styles,
      ...rest
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        {...rest}
        className={cn(
          variants({
            variant,
            size
          }),
          className
        )}
        style={styles?.root}
      >
        {iconLeft && <Icon icon={iconLeft} variant="subtle" />}
        {label}
        {iconRight && <Icon icon={iconRight} variant="subtle" />}
      </span>
    )
  }
)
Badge.displayName = 'Badge'
