import { TextInputProps } from '../TextInput/TextInput.types'

export interface ColorPickerProps
  extends Omit<TextInputProps, 'onChange' | 'children'> {
  value?: string
  onChange?: (value: string) => void
  text?: string
  label?: string
}
