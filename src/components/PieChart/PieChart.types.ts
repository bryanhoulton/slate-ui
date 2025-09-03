import {
  BaseChartProps,
  BaseChartStyles
} from '../../utilities/chart-types'

export type PieChartStyles = BaseChartStyles & {
  cell?: React.CSSProperties
  label?: React.CSSProperties
}

export type PieSliceConfig = {
  key: string
  color?: string
  opacity?: number
}

export interface PieChartProps
  extends Omit<
    BaseChartProps,
    'xKey' | 'yKey' | 'showGrid' | 'xAxisLabel' | 'yAxisLabel' | 'styles'
  > {
  nameKey?: string
  valueKey?: string
  innerRadius?: number
  outerRadius?: number
  showLabels?: boolean
  showTooltip?: boolean
  showLegend?: boolean
  labelLine?: boolean
  startAngle?: number
  endAngle?: number
  slices?: PieSliceConfig[]
  styles?: Partial<PieChartStyles>
}
