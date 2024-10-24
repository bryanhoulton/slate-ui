import { HexColorPicker } from 'react-colorful'

import * as Popover from '@radix-ui/react-popover'

import { cn, useSometimesControlled } from '../../utilities'
import { TextInput } from '../TextInput'
import { ColorPickerProps } from './ColorPicker.types'

export function ColorPicker({
  value: valueProp,
  onChange,
  className,
  side,
  ...rest
}: ColorPickerProps) {
  const [value, setValue] = useSometimesControlled({
    valueProp,
    onChangeProp: onChange,
    defaultValue: '#000000'
  })
  return (
    <div className={cn('flex gap-1 items-end', className)}>
      <TextInput
        type="text"
        className="flex-1"
        placeholder="Pick a color"
        value={value}
        onChange={setValue}
        {...rest}
      />

      {/* Cant use our popover for memo issues. */}
      <Popover.Root modal>
        <Popover.Trigger className="h-8" asChild>
          <button
            className="w-8 h-8 rounded-lg border"
            style={{ backgroundColor: value }}
          />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className="bg-white rounded border p-2 z-40 flex flex-col gap-2"
            sideOffset={4}
            autoFocus={false}
            side={side}
          >
            <HexColorPicker color={value} onChange={setValue} />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  )
}
