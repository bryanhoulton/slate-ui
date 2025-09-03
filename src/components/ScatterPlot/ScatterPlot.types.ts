import { SlateVariant } from '../../utilities'
import {
  BaseChartProps,
  BaseChartStyles
} from '../../utilities/chart-types'

export type ScatterPlotStyles = BaseChartStyles

export type ScatterConfig = {
  key: string
  color?: SlateVariant
  size?: number
  opacity?: number
}

export interface ScatterPlotProps extends BaseChartProps {
  scatters?: ScatterConfig[]
  dotSize?: number
}
