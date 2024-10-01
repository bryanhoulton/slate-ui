import { forwardRef, useEffect, useMemo } from 'react'

import { Check, ChevronDown, X } from 'lucide-react'

import {
  Combobox,
  ComboboxInput,
  ComboboxInputProps,
  ComboboxOption,
  ComboboxOptions
} from '@headlessui/react'

import { cn, gid, SlateId, useSometimesControlled } from '../../utilities'
import { ActionIcon } from '../ActionIcon'
import { Icon } from '../Icon'
import { Label } from '../Label'
import { TextInput } from '../TextInput'
import { TextInputProps } from '../TextInput/TextInput.types'
import { SelectItem, SelectProps } from './Select.types'

interface SlateComboboxInputProps
  extends Omit<ComboboxInputProps, 'size' | 'children'>,
    Pick<
      TextInputProps,
      'variant' | 'size' | 'iconLeft' | 'iconRight' | 'styles'
    > {
  onClear?: () => void
}

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
      onClear,
      value,
      size = 'md',
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('flex gap-2 items-end', className as string)}>
        <TextInput
          value={value?.toLocaleString() || ''}
          onChange={(_, e) => onChange?.(e)}
          variant={variant}
          size={size}
          className="flex-1"
          {...props}
          iconRight={ChevronDown}
          ref={ref}
        />
        {onClear && value && <ActionIcon icon={X} onClick={onClear} />}
      </div>
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
  className,
  error,
  label,
  disabled,

  // Theming.
  variant = 'primary',
  size = 'md',
  placeholder = 'Select...',

  // Component controls.
  value: valueProp,
  onChange,
  defaultValue = null,
  clearable,

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

  useEffect(() => {
    setSearch(value?.name || '')
  }, [value?.name])

  return (
    <div className={cn('flex flex-col gap-1', className)} style={styles?.root}>
      {label && <Label styles={styles?.label}>{label}</Label>}
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
          iconLeft={
            iconLeft || items.find((item) => item.id === value?.id)?.icon
          }
          iconRight={iconRight}
          placeholder={placeholder}
          styles={styles?.input}
          className={className}
          disabled={disabled}
          onClear={
            clearable
              ? () => {
                  setValue(null)
                  setSearch('')
                }
              : undefined
          }
        />
        <ComboboxOptions
          anchor="bottom"
          className={cn(
            'rounded-lg mt-1 p-1 flex flex-col gap-1 border bg-white',
            'w-[--input-width] z-50 pointer-events-auto',
            'animate-slideDownAndFade'
          )}
          style={styles?.content}
        >
          {filteredItems.slice(0, 1000).map((item) => (
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
      {error && (
        <small className="text-xs text-error ml-1" style={styles?.error}>
          {error}
        </small>
      )}
    </div>
  )
}
Select.displayName = 'Select'
