import React, { CSSProperties, HTMLProps } from 'react'

import { Styleable } from '../../utilities'
import { MenuProps } from '../Menu/Menu.types'

export type CardStyles = {
  root: CSSProperties
  preview: CSSProperties
  bar: CSSProperties
}
export interface CardProps
  extends HTMLProps<HTMLDivElement>,
    Styleable<CardStyles> {
  preview: React.ReactNode | React.ReactNode[]
  menu?: Omit<MenuProps, 'children'>
}
