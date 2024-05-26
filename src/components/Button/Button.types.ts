import { ButtonHTMLAttributes } from 'react'

import { Styleable } from '../../utilities/types'

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Styleable<'root'> {
  variant?: SlateVariant
  size?: SlateSize
}
