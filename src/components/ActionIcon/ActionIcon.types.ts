import { HTMLProps } from 'react'

import { LucideIcon } from 'lucide-react'

import { SlateSize, SlateVariant, Styleable } from '../../utilities/types'
import { ButtonStyles } from '../Button/Button.types'
import { IconStyles } from '../Icon/Icon.types'

export type ActionIconStyles = {
  button?: ButtonStyles
  icon?: IconStyles
}

export interface ActionIconProps
  extends Omit<HTMLProps<HTMLButtonElement>, 'size'>,
    Styleable<ActionIconStyles> {
  icon: LucideIcon
  variant?: SlateVariant
  size?: SlateSize
  tooltip?: string
  disabled?: boolean
}
