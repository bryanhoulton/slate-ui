import { forwardRef } from 'react'

import { cva } from 'class-variance-authority'

import * as RSwitch from '@radix-ui/react-switch'

import { cn, gid } from '../../utilities'
import { Label } from '../Label'
import { SwitchProps } from './Switch.types'

const switchWrapperVariants = cva(
  ['duration-150 w-fit rounded-lg flex items-center gap-2 select-none'],
  {
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
  }
)

const switchRootVariants = cva([
  'relative h-5 w-8 rounded-full duration-150 shadow-inner',
  'focus:outline-black disabled:cursor-not-allowed disabled:pointer-events-none',
  'data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-200'
])

const switchThumbVariants = cva([
  'block h-3.5 w-3.5 rounded-full bg-white shadow',
  'transition-transform duration-150 will-change-transform',
  'data-[state=checked]:translate-x-[14px] data-[state=checked]:disabled:bg-emphasis',
  'data-[state=unchecked]:translate-x-1'
])

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ disabled, label, id = gid(), withBody, ...props }, ref) => {
    return (
      <div className={switchWrapperVariants({ disabled, withBody })}>
        <RSwitch.Root
          className={cn(switchRootVariants())}
          id={id}
          style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}
          disabled={disabled}
          ref={ref}
          {...props}
        >
          <RSwitch.Thumb className={switchThumbVariants()} />
        </RSwitch.Root>
        {label && (
          <Label
            className={cn(disabled ? 'cursor-not-allowed' : 'cursor-pointer')}
            htmlFor={id}
          >
            {label}
          </Label>
        )}
      </div>
    )
  }
)
Switch.displayName = 'Switch'
