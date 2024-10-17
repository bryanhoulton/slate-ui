import { CSSProperties } from 'react'

import * as RPopover from '@radix-ui/react-popover'

import { Styleable } from '../../utilities'

export type PopoverStyles = {
  content: CSSProperties
}

export interface PopoverProps
  extends RPopover.PopoverProps,
    Styleable<PopoverStyles> {
  content: React.ReactNode
  side: RPopover.PopoverContentProps['side']
  className?: string
}
