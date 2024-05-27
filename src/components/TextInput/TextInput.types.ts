import { CSSProperties, HTMLProps } from 'react'

import { Styleable } from '../../utilities/types'
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
  label: string
  variant?: SlateVariant
  size?: SlateSize
  error?: string
  value: string
  onChange: (value: string) => void
}
