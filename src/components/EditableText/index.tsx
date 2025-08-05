import { useRef } from 'react'

import { Edit } from 'lucide-react'

import {
  cn,
  useSometimesControlled
} from '../../utilities'
import { Icon } from '../Icon'
import { EditableTextProps } from './EditableText.types'

export function EditableText({
  value: valueProp,
  onChange: onChangeProp,
  placeholder = 'Edit this text',
  defaultValue,
  className,
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
      className={cn(
        'hover:focus-within:bg-muted-light hover:bg-muted-light focus-within:bg-muted-light flex gap-2 items-center transition rounded-lg p-1 px-2 w-fit',
        className
      )}
      onClick={() => {
        if (ref.current) {
          ref.current.focus()
        }
      }}
    >
      <input
        ref={ref}
        value={value}
        className="focus:outline-none flex-1 min-w-0"
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
