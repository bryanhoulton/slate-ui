import { HTMLAttributes } from 'react'

import { LucideIcon } from 'lucide-react'

import { Styleable } from '../../utilities/types'
import { ButtonStyles } from '../Button/Button.types'
import { IconStyles } from '../Icon/Icon.types'

export type ActionIconStyles = {
  button?: ButtonStyles
  icon?: IconStyles
}

export interface ActionIconProps
  extends HTMLAttributes<HTMLButtonElement>,
    Styleable<ActionIconStyles> {
  icon: LucideIcon
  variant?: SlateVariant
  size?: SlateSize
}
