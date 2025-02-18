import {
  forwardRef,
  useState
} from 'react'

import { cva } from 'class-variance-authority'

import * as RSwitch from '@radix-ui/react-switch'

import {
  cn,
  gid
} from '../../utilities'
import { Variants } from '../../utilities/types'
import { Label } from '../Label'
import { SwitchProps } from './Switch.types'

const switchWrapperVariants = cva<
  Variants<{ withBody: boolean; side: SwitchProps['side'] }>
>(
  [
    'duration-150 w-fit rounded-lg flex items-center gap-2 select-none',
    'cursor-pointer disabled:cursor-not-allowed'
  ],
  {
    variants: {
      withBody: {
        true: 'hover:bg-muted p-1.5 disabled:bg-muted',
        false: ''
      },
      side: {
        left: 'flex-row-reverse',
        right: 'flex-row'
      }
    }
  }
)

const switchRootVariants = cva([
  'relative h-5 w-8 rounded-full duration-150 shadow-inner cursor-pointer',
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
  (
    {
      disabled,
      label,
      id = gid(),
      checked: checkedProp,
      onCheckedChange: onCheckedChangeProp,
      className,
      withBody,
      defaultChecked = false,
      styles,
      side = 'right',
      ...props
    },
    ref
  ) => {
    const [checked, setChecked] = useState(checkedProp ?? defaultChecked)

    return (
      <div
        className={cn(switchWrapperVariants({ withBody, side }), className)}
        style={styles?.root}
        onClick={() => {
          setChecked((c) => !c)
          onCheckedChangeProp?.(checked)
        }}
      >
        <RSwitch.Root
          className={cn(switchRootVariants())}
          id={id}
          style={{
            WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
            ...styles?.switch
          }}
          onCheckedChange={() => {}}
          checked={checkedProp ?? checked}
          disabled={disabled}
          ref={ref}
          type="button"
          {...props}
        >
          <RSwitch.Thumb
            className={switchThumbVariants()}
            style={styles?.thumb}
          />
        </RSwitch.Root>
        {label && (
          <Label
            className={cn('pr-3 flex-1 cursor-pointer')}
            style={styles?.label}
          >
            {label}
          </Label>
        )}
      </div>
    )
  }
)
Switch.displayName = 'Switch'
