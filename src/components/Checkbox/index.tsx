import {
  forwardRef,
  memo
} from 'react'

import { cva } from 'class-variance-authority'
import { Check } from 'lucide-react'

import * as RCheckbox from '@radix-ui/react-checkbox'

import {
  cn,
  gid
} from '../../utilities'
import { Variants } from '../../utilities/types'
import { Icon } from '../Icon'
import { Label } from '../Label'
import { CheckboxProps } from './Checbox.types'

const checkboxWrapperVariants = cva<
  Variants<{ withBody: boolean; disabled: boolean }>
>(['duration-150 w-fit rounded-lg flex items-center gap-2 select-none'], {
  variants: {
    withBody: {
      true: 'hover:bg-muted-light p-1.5',
      false: ''
    },
    disabled: {
      true: 'cursor-not-allowed',
      false: 'cursor-pointer'
    }
  },
  compoundVariants: [
    {
      withBody: true,
      disabled: true,
      className: 'bg-muted-light'
    }
  ]
})

const checkboxRootVariants = cva<Variants<Record<string, never>>>([
  'items-center justify-center flex h-5 w-5 rounded duration-150 shadow-inner',
  'focus:outline-black disabled:cursor-not-allowed disabled:pointer-events-none',
  'data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-200'
])

/* IMPORTANT: This specific implementation is required to work around a Radix-UI bug
 * Issue: https://github.com/radix-ui/primitives/issues/3192
 *
 * The bug causes the app to crash due to infinite state updates.
 * This wrapper ensures that:
 * - The memo is recreated on each render
 * - The component maintains its stability and interactivity
 */
function CheckboxRootWrapper(
  props: React.ComponentProps<typeof RCheckbox.Root>
) {
  const MemoizedRoot = memo(RCheckbox.Root)
  return <MemoizedRoot {...props} />
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      disabled,
      label,
      id = gid(),
      className,
      styles,
      withBody,
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          checkboxWrapperVariants({ disabled, withBody }),
          className
        )}
        style={styles?.root}
        onClick={(e) => {
          if (!disabled && props.onCheckedChange) {
            // Only trigger if not clicking the switch itself to avoid double triggers
            if (!(e.target as HTMLElement).closest('[role="switch"]')) {
              props.onCheckedChange(!props.checked)
            }
          }
        }}
      >
        <CheckboxRootWrapper
          className={cn(checkboxRootVariants())}
          id={id}
          style={{
            WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
            ...styles?.checkbox
          }}
          disabled={disabled}
          ref={ref}
          {...props}
        >
          <RCheckbox.Indicator style={styles?.indicator}>
            <Icon icon={Check} className="text-anti-primary" />
          </RCheckbox.Indicator>
        </CheckboxRootWrapper>
        {label && (
          <Label
            className={cn(
              disabled ? 'cursor-not-allowed' : 'cursor-pointer',
              'pr-3'
            )}
            style={styles?.label}
          >
            {label}
          </Label>
        )}
      </div>
    )
  }
)
Checkbox.displayName = 'Checkbox'
