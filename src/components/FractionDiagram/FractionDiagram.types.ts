import {
  CSSProperties,
  HTMLProps
} from 'react'

import { Styleable } from '../../utilities'

export type FractionDiagramType = 'grid' | 'pie'

export type FractionDiagramStyles = {
  root: CSSProperties
  grid: CSSProperties
  gridCell: CSSProperties
  pie: CSSProperties
  label: CSSProperties
}

export type FractionData = {
  /** The numerator of the fraction */
  numerator: number
  /** The denominator of the fraction */
  denominator: number
  /** Custom label text (defaults to "numerator/denominator") */
  label?: string
  /** Color for the filled portions (overrides global fillColor) */
  fillColor?: string
  /** Color for the unfilled portions (overrides global emptyColor) */
  emptyColor?: string
}

export interface FractionDiagramProps
  extends Omit<HTMLProps<HTMLDivElement>, 'size'>,
    Styleable<FractionDiagramStyles> {
  /** Single fraction data or array of fractions for multiple diagrams */
  fractions: FractionData | FractionData[]
  /** The type of diagram to display */
  type?: FractionDiagramType
  /** The size of each diagram */
  size?: number
  /** Whether to show the fraction labels */
  showLabel?: boolean
  /** Default color for the filled portions */
  fillColor?: string
  /** Default color for the unfilled portions */
  emptyColor?: string
  /** Number of columns for grid type (auto-calculated if not provided) */
  gridColumns?: number
  /** Gap between grid cells in pixels */
  gridGap?: number
  /** Horizontal spacing between multiple diagrams in pixels */
  spacing?: number
}
