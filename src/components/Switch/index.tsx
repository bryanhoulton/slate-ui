import {
  forwardRef,
  memo
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
        true: 'hover:bg-muted-test p-1.5 disabled:bg-muted-test',
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

function SwitchRootWrapper(props: React.ComponentProps<typeof RSwitch.Root>) {
  const MemoizedRoot = memo(RSwitch.Root)
  return <MemoizedRoot {...props} />
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      disabled,
      label,
      id = gid(),
      className,
      withBody,
      styles,
      onClick,
      side = 'right',
      ...props
    },
    ref
  ) => (
    <div
      className={cn(switchWrapperVariants({ withBody, side }), className)}
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
      <SwitchRootWrapper
        className={cn(switchRootVariants())}
        id={id}
        style={{
          WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
          ...styles?.switch
        }}
        disabled={disabled}
        ref={ref}
        type="button"
        {...props}
      >
        <RSwitch.Thumb
          className={switchThumbVariants()}
          style={styles?.thumb}
        />
      </SwitchRootWrapper>
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
)
Switch.displayName = 'Switch'
