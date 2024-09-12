import React, { forwardRef } from 'react'

import * as RTooltip from '@radix-ui/react-tooltip'

import { cn } from '../../utilities'
import { TooltipProps } from './Tooltip.types'

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      content,
      delayDuration = 300,
      styles,
      withArrow = true,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <RTooltip.Root
        delayDuration={delayDuration}
        open={disabled ? false : undefined}
      >
        <RTooltip.Trigger asChild>{children}</RTooltip.Trigger>
        <RTooltip.Portal>
          {content && (
            <RTooltip.Content
              className={cn(
                'data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade',
                'data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade',
                'data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade',
                'data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade',
                `z-50 w-[100%] select-none text-sm rounded-md bg-primary text-anti-primary`,
                'px-2 py-1',
                className
              )}
              sideOffset={5}
              ref={ref}
              style={styles?.content}
              {...props}
            >
              {content}
              {withArrow && <RTooltip.Arrow className="fill-primary" />}
            </RTooltip.Content>
          )}
        </RTooltip.Portal>
      </RTooltip.Root>
    )
  }
)
export const TooltipProvider = RTooltip.Provider
TooltipProvider.displayName = 'TooltipProvider'
Tooltip.displayName = 'Tooltip'
