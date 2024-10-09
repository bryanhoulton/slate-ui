import React, { HTMLProps } from 'react'

import { MenuProps } from '../Menu/Menu.types'

export interface CardProps extends HTMLProps<HTMLDivElement> {
  preview: React.ReactNode | React.ReactNode[]
  menu?: Omit<MenuProps, 'children'>
}
