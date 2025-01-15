import { CSSProperties, HTMLProps } from 'react'

import { SlateId, Styleable } from '../../utilities'
import { LabelStyles } from '../Label/Label.types'

export interface RadioGroupStyles {
  root: CSSProperties
  wrapper: CSSProperties
  item: CSSProperties
  title: CSSProperties
  description: CSSProperties
  dot: CSSProperties
  label: LabelStyles
}

export interface RadioItem<T extends SlateId> {
  id: T
  name: string
  description?: string
}
export interface RadioGroupProps<T extends SlateId>
  extends Omit<HTMLProps<HTMLDivElement>, 'onChange' | 'value'>,
    Styleable<RadioGroupStyles> {
  items: RadioItem<T>[]
  value: T | null
  onChange: (value: T | null) => void
  defaultValue?: T
  orientation?: 'horizontal' | 'vertical'
}
