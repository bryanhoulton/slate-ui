import { useRef } from 'react';

import { Edit } from 'lucide-react';

import { useSometimesControlled } from '../../utilities';
import { Icon } from '../Icon';
import { EditableTextProps } from './EditableText.types';

export function EditableText({
  value: valueProp,
  onChange: onChangeProp,
  placeholder = 'Edit this text',
  defaultValue,
  ...props
}: EditableTextProps) {
  const [value, setValue] = useSometimesControlled({
    valueProp,
    onChangeProp,
    defaultValue: defaultValue ?? ''
  })
  const ref = useRef<HTMLInputElement>(null)

  return (
    <div
      className="hover:focus-within:bg-muted hover:bg-muted focus-within:bg-muted flex gap-2 items-center transition rounded-lg p-1 px-2 w-fit"
      onClick={() => {
        if (ref.current) {
          ref.current.focus()
        }
      }}
    >
      <input
        ref={ref}
        value={value}
        className="focus:outline-none"
        onChange={(e) => setValue(e.target.value)}
        size={value.length || placeholder.length}
        placeholder={placeholder}
        style={{
          background: 'none'
        }}
        {...props}
      />
      <Icon icon={Edit} className="text-muted" />
    </div>
  )
}
