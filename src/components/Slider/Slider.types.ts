import { CSSProperties } from 'react'

import * as RSlider from '@radix-ui/react-slider'

export type SliderStyles = {
  track?: CSSProperties
  thumb?: CSSProperties
}

export interface SliderProps extends RSlider.SliderProps {
  tooltip?: string
}
