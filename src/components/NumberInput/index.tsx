import { useSometimesControlled } from '../../utilities';
import { TextInput } from '../TextInput';
import { NumberInputProps } from './NumberInput.types';

export function NumberInput({
  min = -Infinity,
  max = Infinity,
  value: valueProp,
  onChange,
  type = 'number',
  defaultValue,
  ...rest
}: NumberInputProps) {
  const [value, setValue] = useSometimesControlled({
    valueProp,
    defaultValue: defaultValue ?? min,
    onChangeProp: onChange
  })
  return (
    <TextInput
      type={type}
      value={value.toString()}
      onChange={(v) => {
        const newValue = Number(v)
        if (newValue >= min && newValue <= max) {
          setValue(newValue)
          onChange?.(newValue)
        }
      }}
      {...rest}
    />
  )
}
