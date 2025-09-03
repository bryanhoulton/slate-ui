import { HTMLProps } from 'react'

import {
  SlateVariant,
  Styleable
} from '../../utilities/types'

export type DotPlotData = {
  category: string
  count: number
}

export type DotPlotStyles = {
  root: React.CSSProperties
}

export interface DotPlotProps
  extends Omit<HTMLProps<HTMLDivElement>, 'size' | 'data'>,
    Styleable<DotPlotStyles> {
  data: DotPlotData[]
  label?: string
  dotSize?: number
  binSize?: number
  variant?: SlateVariant
}
