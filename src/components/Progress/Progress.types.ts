import { CSSProperties, HTMLProps } from 'react'

import { SlateSize, Styleable } from '../../utilities'

export interface ProgressStyles {
  root?: CSSProperties
  bar?: CSSProperties
}

export interface ProgressProps
  extends Omit<HTMLProps<HTMLDivElement>, 'size'>,
    Styleable<ProgressStyles> {
  value: number
  min?: number
  max?: number

  sections?: number
  size?: SlateSize
  gap?: SlateSize
}
