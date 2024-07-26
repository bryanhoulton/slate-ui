import { HTMLProps } from 'react'

import { LucideIcon } from 'lucide-react'

import { Styleable } from '../../utilities'

export type SelectItemStyles = {}

export interface SelectItemProps
  extends HTMLProps<HTMLDivElement>,
    Styleable<SelectItemStyles> {
  icon?: LucideIcon
  id: string
  name: string
  selected: boolean
}
