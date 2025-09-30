import { BaseChartProps, BaseChartStyles } from '../../utilities/chart-types'

export type RadarChartStyles = BaseChartStyles

export type RadarDataPoint = {
  axis: string
  value: number
}

export interface RadarChartProps
  extends Omit<
    BaseChartProps,
    | 'data'
    | 'xKey'
    | 'yKey'
    | 'showGrid'
    | 'xAxisLabel'
    | 'yAxisLabel'
    | 'styles'
  > {
  data: RadarDataPoint[]
  color?: string
  fillOpacity?: number
  styles?: Partial<RadarChartStyles>
}
