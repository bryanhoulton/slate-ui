import { useSometimesControlled } from '../../utilities'
import { TextInput } from '../TextInput'
import { NumberInputProps } from './NumberInput.types'

export function NumberInput({
  min = -Infinity,
  max = Infinity,
  value: valueProp,
  onChange,
  type = 'number',
  defaultValue,
  prefix,
  ...rest
}: NumberInputProps) {
  const [value, setValue] = useSometimesControlled({
    valueProp,
    defaultValue: defaultValue ?? min,
    onChangeProp: onChange
  })
  return (
    <TextInput
      type={prefix ? 'text' : type}
      value={`${prefix || ''}${value}`}
      onChange={(v) => {
        const strippedValue = v.replace(prefix ?? '', '')
        const newValue = Number(strippedValue)
        if (newValue >= min && newValue <= max) {
          setValue(newValue)
          onChange?.(newValue)
        }
      }}
      {...rest}
    />
  )
}
