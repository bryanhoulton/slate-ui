import {
  BaseChartProps,
  BaseChartStyles,
  LineConfig
} from '../../utilities/chart-types'

export type LineChartStyles = BaseChartStyles

export interface LineChartProps extends BaseChartProps {
  lines?: LineConfig[]
}
