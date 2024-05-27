import { CSSProperties, HTMLProps } from 'react'

import { Styleable } from '../../utilities/types'

export type LabelStyles = {
  root: CSSProperties
}
export interface LabelProps
  extends HTMLProps<HTMLLabelElement>,
    Styleable<LabelStyles> {}
