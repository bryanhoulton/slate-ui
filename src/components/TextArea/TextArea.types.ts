import { ChangeEvent, CSSProperties, HTMLProps } from 'react'

import { SlateSize, SlateVariant, Styleable } from '../../utilities/types'
import { LabelStyles } from '../Label/Label.types'

export type TextAreaStyles = {
  label: LabelStyles
  input: CSSProperties
  error: CSSProperties
  root: CSSProperties
}

export interface TextAreaProps
  extends Omit<HTMLProps<HTMLTextAreaElement>, 'onChange' | 'size'>,
    Styleable<TextAreaStyles> {
  label?: string
  variant?: SlateVariant
  size?: SlateSize
  error?: string
  value?: string
  defaultValue?: string
  onChange?: (value: string, event: ChangeEvent<HTMLTextAreaElement>) => void
}
