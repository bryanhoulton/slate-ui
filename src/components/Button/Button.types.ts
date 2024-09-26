import { ButtonHTMLAttributes, CSSProperties } from 'react'

import { LucideIcon } from 'lucide-react'

import { SlateSize, SlateVariant, Styleable } from '../../utilities/types'

export type ButtonStyles = {
  root: CSSProperties
  icon: CSSProperties
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Styleable<ButtonStyles> {
  variant?: SlateVariant
  size?: SlateSize
  iconLeft?: LucideIcon
  iconRight?: LucideIcon
  loading?: boolean
}
