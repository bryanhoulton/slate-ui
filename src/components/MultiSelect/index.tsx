import {
  KeyboardEvent,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { createPortal } from 'react-dom'

import {
  Check,
  ChevronDown,
  Plus,
  X
} from 'lucide-react'

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions
} from '@headlessui/react'

import {
  cn,
  gid,
  SlateId,
  useSometimesControlled
} from '../../utilities'
import { ActionIcon } from '../ActionIcon'
import { Badge } from '../Badge'
import { Icon } from '../Icon'
import { Label } from '../Label'
import { SELECT_CREATE_OPTION_ID } from '../Select'
import { SelectItem } from '../Select/Select.types'
import { MultiSelectProps } from './MultiSelect.types'

export function MultiSelect<IdType extends SlateId>({
  items,
  id = gid(),
  iconLeft,
  styles,
  className,
  error,
  label,
  disabled,

  variant = 'default',
  size = 'md',
  placeholder = 'Select...',

  value: valueProp,
  onChange,
  defaultValue = [],
  clearable,
  maxSelected,
  creatable,
  onCreate,

  searchable = true,
  defaultSearch = '',
  search: searchProp,
  onSearchChange,
  ref
}: MultiSelectProps<IdType>) {
  const [value, setValue] = useSometimesControlled<IdType[]>({
    valueProp,
    onChangeProp: (ids) => {
      const selectedItems = ids
        .map((selectedId) => items.find((i) => i.id === selectedId))
        .filter((i): i is SelectItem<IdType> => Boolean(i))
      onChange(ids, selectedItems)
    },
    defaultValue
  })
  const [search, setSearch] = useSometimesControlled<string>({
    valueProp: searchProp,
    onChangeProp: onSearchChange,
    defaultValue: defaultSearch
  })

  const selectedItems = useMemo(
    () =>
      value
        .map((selectedId) => items.find((i) => i.id === selectedId))
        .filter((i): i is SelectItem<IdType> => Boolean(i)),
    [value, items]
  )

  const filteredItems: SelectItem<IdType>[] = useMemo(
    () =>
      search === ''
        ? items
        : items.filter(
            (item) =>
              item.name.toLowerCase().includes(search.toLowerCase()) ||
              item.id.toString().toLowerCase().includes(search.toLowerCase())
          ),
    [search, items]
  )

  const inputRef = useRef<HTMLInputElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const [triggerRect, setTriggerRect] = useState<DOMRect>()

  useLayoutEffect(() => {
    const el = triggerRef.current
    if (!el) return
    const update = () => setTriggerRect(el.getBoundingClientRect())
    update()
    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null
    resizeObserver?.observe(el)
    window.addEventListener('scroll', update, true)
    window.addEventListener('resize', update)
    return () => {
      resizeObserver?.disconnect()
      window.removeEventListener('scroll', update, true)
      window.removeEventListener('resize', update)
    }
  }, [])

  const sizeClasses = {
    sm: 'min-h-6 px-1 text-xs gap-1',
    md: 'min-h-8 px-1.5 text-sm gap-1.5',
    lg: 'min-h-10 px-2 text-base gap-2'
  }[size]

  const variantRingClasses = {
    default: '',
    primary: 'ring-primary',
    secondary: 'ring-secondary',
    subtle: 'border-transparent',
    success: 'ring-success',
    warning: 'ring-warning',
    error: 'ring-error',
    info: 'ring-info'
  }[variant]

  const removeItem = (itemId: IdType) => {
    setValue(value.filter((v) => v !== itemId))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && search === '' && value.length > 0) {
      e.preventDefault()
      setValue(value.slice(0, -1))
    }
  }

  const atLimit =
    typeof maxSelected === 'number' && value.length >= maxSelected

  const showCreate =
    Boolean(creatable) &&
    !items.some((item) => item.name.toLowerCase() === search.toLowerCase())

  return (
    <div className={cn('flex flex-col gap-1', className)} style={styles?.root}>
      {label && <Label styles={styles?.label}>{label}</Label>}
      <Combobox
        multiple
        value={value}
        onChange={(newValues: IdType[]) => {
          if (
            newValues.some(
              (v) => (v as SlateId) === SELECT_CREATE_OPTION_ID
            )
          ) {
            if (search.trim() === '') {
              inputRef.current?.focus()
              return
            }
            onCreate?.(search)
            setSearch('')
            return
          }
          setValue(newValues)
          setSearch('')
        }}
        immediate
        ref={ref}
        disabled={disabled}
      >
        <div className="relative">
          <div
            ref={triggerRef}
            className={cn(
              'rounded-lg border flex flex-wrap items-center w-full cursor-text',
              'transition focus-within:outline-none focus-within:ring-2 ring-offset-1',
              'py-1 pr-8',
              sizeClasses,
              variantRingClasses,
              error && 'border-error-500',
              disabled && 'bg-muted-light text-muted cursor-not-allowed'
            )}
            style={styles?.input}
            onClick={() => inputRef.current?.focus()}
          >
            {iconLeft && (
              <Icon
                icon={iconLeft}
                variant={variant}
                className="ml-1 shrink-0"
              />
            )}

            {selectedItems.map((item) => (
              <Badge
                key={item.id}
                variant="secondary"
                size='md'
                iconLeft={item.icon}
                styles={styles?.badge}
                className="max-w-full rounded-lg pr-0.5"
              >
                <span className="flex items-center gap-1 truncate">
                  <span className="truncate">{item.name}</span>
                  {!disabled && (
                    <button
                      type="button"
                      aria-label={`Remove ${item.name}`}
                      className={cn(
                        'rounded-[6px] hover:bg-primary/10 p-0.5',
                        'transition cursor-pointer'
                      )}
                      onClick={(e) => {
                        e.stopPropagation()
                        removeItem(item.id)
                      }}
                    >
                      <Icon
                        icon={X}
                        variant="default"
                        className="w-3.5 h-3.5"
                      />
                    </button>
                  )}
                </span>
              </Badge>
            ))}

            <ComboboxInput
              id={id}
              ref={inputRef}
              aria-label={id}
              value={search}
              placeholder={selectedItems.length === 0 ? placeholder : ''}
              className={cn(
                'flex-1 min-w-[60px] bg-transparent outline-none border-none',
                'text-sm disabled:text-muted disabled:cursor-not-allowed',
                size === 'sm' && 'h-5',
                size === 'md' && 'h-6',
                size === 'lg' && 'h-8'
              )}
              onChange={(e) => {
                if (!searchable) return
                setSearch(e.target.value)
              }}
              onKeyDown={handleKeyDown}
              readOnly={!searchable}
              disabled={disabled}
            />
          </div>

          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {clearable && value.length > 0 && !disabled && (
              <ActionIcon
                icon={X}
                size="sm"
                variant="subtle"
                onClick={(e) => {
                  e.stopPropagation()
                  setValue([])
                  setSearch('')
                }}
              />
            )}
            <Icon
              icon={ChevronDown}
              variant={variant}
              className="pointer-events-none"
            />
          </div>

        </div>

        {typeof document !== 'undefined' &&
          triggerRect &&
          createPortal(
            <div
              className="fixed z-50 pointer-events-none"
              style={{
                top: triggerRect.bottom + 4,
                left: triggerRect.left,
                width: triggerRect.width
              }}
            >
              <ComboboxOptions
                className={cn(
                  'w-full rounded-lg p-1 flex flex-col gap-1 border bg-white',
                  'pointer-events-auto shadow-sm',
                  'animate-slideDownAndFade max-h-72 overflow-auto'
                )}
                style={styles?.content}
              >
                {filteredItems.slice(0, 1000).map((item) => {
                  const isSelected = value.includes(item.id)
                  const isDisabled = !isSelected && atLimit
                  return (
                    <ComboboxOption
                      key={item.id}
                      value={item.id}
                      disabled={isDisabled}
                      className={cn(
                        'flex items-center justify-between rounded-lg text-sm p-2 gap-2',
                        'bg-white data-[focus]:bg-muted-light cursor-pointer',
                        'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
                        isSelected && 'bg-muted-light'
                      )}
                      as="button"
                      type="button"
                      style={styles?.option}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon && <Icon icon={item.icon} />}
                        {item.name}
                      </div>

                      {isSelected && <Icon icon={Check} />}
                    </ComboboxOption>
                  )
                })}

                {showCreate && (
                  <ComboboxOption
                    value={SELECT_CREATE_OPTION_ID as unknown as IdType}
                    className={cn(
                      'flex items-center rounded-lg text-sm p-2 gap-2',
                      'bg-white data-[focus]:bg-muted-light cursor-pointer'
                    )}
                    as="button"
                    type="button"
                    style={styles?.option}
                  >
                    <Icon icon={Plus} />
                    {search.trim() === ''
                      ? 'Create your own'
                      : `Create "${search}"`}
                  </ComboboxOption>
                )}

                {filteredItems.length === 0 && !showCreate && (
                  <div className="text-muted text-center py-2">
                    No results found!
                  </div>
                )}
              </ComboboxOptions>
            </div>,
            document.body
          )}
      </Combobox>
      {error && (
        <small className="text-xs text-error-500 ml-1" style={styles?.error}>
          {error}
        </small>
      )}
    </div>
  )
}
MultiSelect.displayName = 'MultiSelect'
