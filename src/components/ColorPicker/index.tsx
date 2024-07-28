import { HexColorPicker } from 'react-colorful';

import * as Popover from '@radix-ui/react-popover';

import { useSometimesControlled } from '../../utilities';
import { Button } from '../Button';
import { ColorPickerProps } from './ColorPicker.types';

export function ColorPicker({
  value: valueProp,
  onChange,
  text = 'Pick a color',
  ...rest
}: ColorPickerProps) {
  const [value, setValue] = useSometimesControlled({
    valueProp,
    onChangeProp: onChange,
    defaultValue: '#000000'
  })
  return (
    <Popover.Root modal>
      <Popover.Trigger>
        <div className="flex gap-2 items-center">
          <Button {...rest}>{text}</Button>
          <div
            className="w-6 h-6 rounded-full border"
            style={{ backgroundColor: value }}
          />
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="bg-white rounded border p-2" sideOffset={4}>
          <HexColorPicker color={value} onChange={setValue} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
