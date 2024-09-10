import { HTMLProps } from 'react';

export interface EditableTextProps
  extends Omit<HTMLProps<HTMLInputElement>, 'onChange' | 'defaultValue'> {
  value: string
  onChange: (value: string) => void
  defaultValue?: string
}
