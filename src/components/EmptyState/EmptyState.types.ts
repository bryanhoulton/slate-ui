import { CSSProperties, HTMLProps } from 'react'

import { LucideIcon } from 'lucide-react'

import { Styleable } from '../../utilities'
import { ButtonProps } from '../Button/Button.types'

export type EmptyStateStyles = {
  root: CSSProperties
  icon: CSSProperties
  title: CSSProperties
  button: CSSProperties
}

export interface EmptyStateProps
  extends Omit<HTMLProps<HTMLDivElement>, 'children'>,
    Styleable<EmptyStateStyles> {
  icon: LucideIcon
  title?: string
  button?: ButtonProps
}
