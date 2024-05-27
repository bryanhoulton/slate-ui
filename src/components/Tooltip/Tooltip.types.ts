import { CSSProperties } from 'react'

import { TooltipContentProps } from '@radix-ui/react-tooltip'

import { Styleable } from '../../utilities/types'

export type TooltipStyles = {
  content: CSSProperties
}
export interface TooltipProps
  extends Styleable<TooltipStyles>,
    TooltipContentProps {
  content?: string
  children: React.ReactNode
  delayDuration?: number
  withArrow?: boolean
}
