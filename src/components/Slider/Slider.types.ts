import { CSSProperties } from 'react'

import * as RSlider from '@radix-ui/react-slider'

import { Styleable } from '../../utilities'

export type SliderStyles = {
  track?: CSSProperties
  thumb?: CSSProperties
  range?: CSSProperties
  root?: CSSProperties
}

export interface SliderProps
  extends RSlider.SliderProps,
    Styleable<SliderStyles> {
  tooltip?: string
  label?: string
}
