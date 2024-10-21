import * as RPopover from '@radix-ui/react-popover'

import { cn, useSometimesControlled } from '../../utilities'
import { PopoverProps } from './Popover.types'

export function Popover({
  children,
  content,
  className,
  side,
  collisionPadding = 4,
  open: openProp,
  onOpenChange,
  defaultOpen,
  ...props
}: PopoverProps) {
  const [open, setOpen] = useSometimesControlled<boolean>({
    valueProp: openProp,
    onChangeProp: onOpenChange,
    defaultValue: defaultOpen ?? false
  })

  return (
    <RPopover.Root open={open} onOpenChange={setOpen} {...props}>
      <RPopover.Trigger asChild>{children}</RPopover.Trigger>
      <RPopover.Portal>
        <RPopover.Content
          className={cn(
            'data-[state=open]:data-[side=bottom]:animate-slideUpAndFade',
            'data-[state=open]:data-[side=left]:animate-slideRightAndFade',
            'data-[state=open]:data-[side=right]:animate-slideLeftAndFade',
            'data-[state=open]:data-[side=top]:animate-slideDownAndFade',
            'bg-white rounded-lg border',
            className
          )}
          sideOffset={5}
          side={side}
          collisionPadding={collisionPadding}
        >
          {content}
        </RPopover.Content>
      </RPopover.Portal>
    </RPopover.Root>
  )
}
