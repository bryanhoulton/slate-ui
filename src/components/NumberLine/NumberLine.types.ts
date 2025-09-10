import {
  CSSProperties,
  HTMLProps
} from 'react'

import { Styleable } from '../../utilities/types'

export type NumberLineMark = {
  value: number
  label?: string
  color?: string
  size?: 'sm' | 'md' | 'lg'
}

export type NumberLineSegment = {
  start: number
  end: number
  label?: string
  color?: string
  startType?: 'open' | 'closed' // open = < (hollow dot), closed = <= (filled dot)
  endType?: 'open' | 'closed'
}

export type NumberLineRay = {
  value: number
  direction: 'left' | 'right' // left = x < value, right = x > value
  label?: string
  color?: string
  type?: 'open' | 'closed' // open = < (hollow dot), closed = <= (filled dot)
}

export type NumberLineStyles = {
  root: CSSProperties
  line: CSSProperties
  mark: CSSProperties
  label: CSSProperties
  axis: CSSProperties
  tick: CSSProperties
}

export interface NumberLineProps
  extends Omit<HTMLProps<HTMLDivElement>, 'size'>,
    Styleable<NumberLineStyles> {
  /** Minimum value on the number line */
  min: number
  /** Maximum value on the number line */
  max: number
  /** Step size for tick marks */
  step?: number
  /** Marks/points to display on the number line */
  marks?: NumberLineMark[]
  /** Line segments to display (e.g., 2 < x < 5) */
  segments?: NumberLineSegment[]
  /** Rays to display (e.g., x < 5 or x > 2) */
  rays?: NumberLineRay[]
  /** Whether to show tick marks */
  showTicks?: boolean
  /** Whether to show axis labels */
  showLabels?: boolean
  /** Height of the number line */
  height?: number
  /** Width of the number line */
  width?: number | string
  /** Custom tick values to display */
  customTicks?: number[]
  /** Whether to show arrows at the ends */
  showArrows?: boolean
  /** Title/label for the number line */
  title?: string
}
