import {
  CSSProperties,
  HTMLProps
} from 'react'

import { Styleable } from '../../utilities/types'

export type DatePickerStyles = {
  root: CSSProperties
  calendar: CSSProperties
}

export interface DatePickerProps
  extends Omit<
      HTMLProps<HTMLDivElement>,
      'onChange' | 'value' | 'defaultValue'
    >,
    Styleable<DatePickerStyles> {
  disabled?: boolean
  value?: Date | null
  defaultValue?: Date | null
  onChange?: (value: Date | null) => void
  minDate?: Date
  maxDate?: Date
}
