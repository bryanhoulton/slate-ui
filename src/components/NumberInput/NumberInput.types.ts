import { TextInputProps } from '../TextInput/TextInput.types'

export interface NumberInputProps
  extends Omit<TextInputProps, 'value' | 'onChange' | 'defaultValue'> {
  min?: number
  max?: number
  value?: number
  onChange?: (value: number) => void
  defaultValue?: number
  prefix?: string
}
