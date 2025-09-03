import {
  CSSProperties,
  HTMLProps
} from 'react'

import {
  SlateVariant,
  Styleable
} from './types'

export type ChartData = {
  [key: string]: string | number
}

export type BaseChartStyles = {
  root: CSSProperties
  chart: CSSProperties
  tooltip: CSSProperties
  legend: CSSProperties
}

export type ChartMargin = {
  top?: number
  right?: number
  bottom?: number
  left?: number
}

export interface BaseChartProps
  extends Omit<HTMLProps<HTMLDivElement>, 'data' | 'size'>,
    Styleable<BaseChartStyles> {
  data: ChartData[]
  xKey?: string
  yKey?: string
  showGrid?: boolean
  xAxisLabel?: string
  yAxisLabel?: string
  height?: number
  width?: number
  margin?: ChartMargin
}

export type LineConfig = {
  key: string
  color?: SlateVariant
  strokeWidth?: number
  strokeDasharray?: string
}

export type BarConfig = {
  key: string
  color?: SlateVariant
  opacity?: number
}

export type PieConfig = {
  key: string
  color?: SlateVariant
  opacity?: number
}

export type SeriesConfig = LineConfig | BarConfig | PieConfig
