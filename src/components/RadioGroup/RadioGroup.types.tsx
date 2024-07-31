import {
  CSSProperties,
  HTMLProps,
} from 'react';

import {
  SlateId,
  Styleable,
} from '../../utilities';

export interface RadioGroupStyles {
  root: CSSProperties
  item: CSSProperties
  title: CSSProperties
  description: CSSProperties
  dot: CSSProperties
}

export interface RadioItem<T extends SlateId> {
  id: T
  name: string
  description?: string
}
export interface RadioGroupProps<T extends SlateId>
  extends Omit<HTMLProps<HTMLDivElement>, 'onChange'>,
    Styleable<RadioGroupStyles> {
  items: RadioItem<T>[]
  value: T
  onChange: (value: T) => void
  defaultValue?: T
  orientation?: 'horizontal' | 'vertical'
}
