import { forwardRef, useMemo } from 'react'

import { Check } from 'lucide-react'

import {
  Combobox,
  ComboboxInput,
  ComboboxInputProps,
  ComboboxOption,
  ComboboxOptions
} from '@headlessui/react'

import { cn, gid, SlateId, useSometimesControlled } from '../../utilities'
import { Icon } from '../Icon'
import { TextInput } from '../TextInput'
import { TextInputProps } from '../TextInput/TextInput.types'
import { SelectItem, SelectProps } from './Select.types'

interface SlateComboboxInputProps
  extends Omit<ComboboxInputProps, 'size' | 'children'>,
    Pick<
      TextInputProps,
      'variant' | 'size' | 'iconLeft' | 'iconRight' | 'styles'
    > {}

const SlateComboboxInput = forwardRef<
  HTMLInputElement,
  SlateComboboxInputProps
>(
  (
    {
      variant = 'primary',
      className,
      onChange,
      displayValue,
      value,
      size = 'md',
      ...props
    },
    ref
  ) => {
    return (
      <TextInput
        value={value?.toLocaleString() || ''}
        onChange={(_, e) => onChange?.(e)}
        variant={variant}
        size={size}
        {...props}
        ref={ref}
      />
    )
  }
)
SlateComboboxInput.displayName = 'SlateComboboxInput'

export function Select<IdType extends SlateId>({
  items,
  id = gid(),
  iconRight,
  iconLeft,
  styles,

  // Theming.
  variant = 'primary',
  size = 'md',

  // Component controls.
  value: valueProp,
  onChange,
  defaultValue = null,

  // Search controls.
  searchable = true,
  defaultSearch = '',
  search: searchProp,
  onSearchChange,
  ref
}: SelectProps<IdType>) {
  const [value, setValue] = useSometimesControlled<SelectItem<IdType> | null>({
    valueProp: items.find((item) => item.id === valueProp),
    onChangeProp: (v) => onChange?.(v?.id || null, v || null),
    defaultValue: items.find((item) => item.id === defaultValue) ?? null
  })
  const [search, setSearch] = useSometimesControlled<string>({
    valueProp: searchProp,
    onChangeProp: onSearchChange,
    defaultValue: defaultSearch
  })

  const filteredItems: SelectItem<IdType>[] = useMemo(
    () =>
      search === '' || search === value?.name
        ? items
        : items.filter((item) => {
            return (
              item.name.toLowerCase().includes(search.toLowerCase()) ||
              item.id.toString().toLowerCase().includes(search.toLowerCase())
            )
          }),
    [search, items]
  )

  return (
    <Combobox
      value={value}
      onChange={(v: SelectItem<IdType> | null) => {
        setValue(v)
        setSearch(v?.name || '')
      }}
      immediate
      ref={ref}
    >
      <ComboboxInput
        id={id}
        as={SlateComboboxInput}
        variant={variant}
        size={size}
        value={search}
        aria-label={id}
        onChange={(e) => {
          if (!searchable) return
          setSearch(e.target.value)
        }}
        iconLeft={iconLeft}
        iconRight={iconRight}
        placeholder="Search..."
        styles={styles?.input}
      />
      <ComboboxOptions
        anchor="bottom"
        className={cn(
          'rounded-lg mt-1 p-1 flex flex-col gap-1 border bg-white',
          'w-[--input-width]'
        )}
        style={styles?.content}
      >
        {filteredItems.map((item) => (
          <ComboboxOption
            key={item.id}
            value={item}
            className={cn(
              'flex items-center justify-between rounded-lg text-sm p-2 gap-2',
              'bg-white data-[focus]:bg-muted',
              value?.id === item.id && 'bg-muted'
            )}
            as="button"
            style={styles?.option}
          >
            <div className="flex items-center gap-2">
              {item.icon && <Icon icon={item.icon} />}
              {item.name}
            </div>

            {value?.id === item.id && <Icon icon={Check} />}
          </ComboboxOption>
        ))}

        {filteredItems.length === 0 && (
          <div className="text-muted text-center py-2">No results found!</div>
        )}
      </ComboboxOptions>
    </Combobox>
  )
}
Select.displayName = 'Select'
