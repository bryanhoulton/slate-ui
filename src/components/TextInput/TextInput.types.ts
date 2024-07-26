import { ChangeEvent, CSSProperties, HTMLProps } from 'react'

import { LucideIcon } from 'lucide-react'

import { SlateSize, SlateVariant, Styleable } from '../../utilities/types'
import { LabelStyles } from '../Label/Label.types'

export type TextInputStyles = {
  label: LabelStyles
  input: CSSProperties
  error: CSSProperties
  root: CSSProperties
}

export interface TextInputProps
  extends Omit<HTMLProps<HTMLInputElement>, 'onChange' | 'size'>,
    Styleable<TextInputStyles> {
  label?: string
  variant?: SlateVariant
  size?: SlateSize
  error?: string
  value?: string
<<<<<<< Updated upstream
  defaultValue?: string
=======
>>>>>>> Stashed changes
  iconLeft?: LucideIcon
  iconRight?: LucideIcon
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void
}
