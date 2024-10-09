import { forwardRef } from 'react'

import { cva } from 'class-variance-authority'
import { Check } from 'lucide-react'

import * as RCheckbox from '@radix-ui/react-checkbox'

import { cn, gid, useSometimesControlled } from '../../utilities'
import { Variants } from '../../utilities/types'
import { Icon } from '../Icon'
import { Label } from '../Label'
import { CheckboxProps } from './Checbox.types'

const checkboxWrapperVariants = cva<
  Variants<{ withBody: boolean; disabled: boolean }>
>(['duration-150 w-fit rounded-lg flex items-center gap-2 select-none'], {
  variants: {
    withBody: {
      true: 'hover:bg-muted p-1.5',
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
      className: 'bg-muted'
    }
  ]
})

const checkboxRootVariants = cva<Variants<Record<string, never>>>([
  'items-center justify-center flex h-5 w-5 rounded duration-150 shadow-inner',
  'focus:outline-black disabled:cursor-not-allowed disabled:pointer-events-none',
  'data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-200'
])

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      disabled,
      label,
      id = gid(),
      checked: checkedProp,
      onCheckedChange: onCheckedChangeProp,
      className,
      styles,
      withBody,
      onClick,
      defaultChecked = false,
      ...props
    },
    ref
  ) => {
    const [checked, setChecked] = useSometimesControlled({
      valueProp: checkedProp,
      defaultValue: defaultChecked,
      onChangeProp: onCheckedChangeProp
    })

    return (
      <div
        className={cn(
          checkboxWrapperVariants({ disabled, withBody }),
          className
        )}
        onClick={() => setChecked((c) => (c === false ? true : false))}
        style={styles?.root}
      >
        <RCheckbox.Root
          className={cn(checkboxRootVariants())}
          id={id}
          style={{
            WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
            ...styles?.checkbox
          }}
          disabled={disabled}
          ref={ref}
          checked={checked}
          {...props}
        >
          <RCheckbox.Indicator style={styles?.indicator}>
            <Icon icon={Check} className="text-anti-primary" />
          </RCheckbox.Indicator>
        </RCheckbox.Root>
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
