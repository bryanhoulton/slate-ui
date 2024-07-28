import { ButtonProps } from '../Button/Button.types'

export interface ColorPickerProps
  extends Omit<ButtonProps, 'onChange' | 'children'> {
  value?: string
  onChange?: (value: string) => void
  text?: string
}
