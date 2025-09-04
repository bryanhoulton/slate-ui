import {
  CSSProperties,
  HTMLProps
} from 'react'

import {
  SlateSide,
  Styleable
} from '../../'

export type ImageCardStyles = {
  root: CSSProperties
  image: CSSProperties
  title: CSSProperties
  description: CSSProperties
}

export interface ImageCardProps
  extends Styleable<ImageCardStyles>,
    HTMLProps<HTMLButtonElement> {
  image: string
  title: string
  description: string
  side?: SlateSide
  onClick?: () => void
}
