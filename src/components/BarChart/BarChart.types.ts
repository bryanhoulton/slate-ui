import {
  BarConfig,
  BaseChartProps,
  BaseChartStyles
} from '../../utilities/chart-types'

export type BarChartStyles = BaseChartStyles

export interface BarChartProps extends BaseChartProps {
  bars?: BarConfig[]
  barGap?: number
  categoryGap?: number
}
