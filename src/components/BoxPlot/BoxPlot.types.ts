import { HTMLProps } from 'react'

import {
  SlateSize,
  SlateVariant,
  Styleable
} from '../../utilities/types'

export type BoxPlotStyles = {
  root: React.CSSProperties
}

export interface BoxPlotProps
  extends Omit<HTMLProps<HTMLDivElement>, 'size'>,
    Styleable<BoxPlotStyles> {
  min: number
  q1: number
  median: number
  q3: number
  max: number
  outliers?: number[]
  label?: string
  variant?: SlateVariant
  size?: SlateSize
  height?: number
}
