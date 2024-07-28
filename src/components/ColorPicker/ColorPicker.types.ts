import { ButtonProps } from '../Button/Button.types';

export interface ColorPickerProps extends Omit<ButtonProps, 'onChange'> {
  value?: string
  onChange?: (value: string) => void
}
