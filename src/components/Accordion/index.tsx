import {
  forwardRef,
  useCallback,
  useMemo,
  useState
} from 'react'

import { ChevronDown } from 'lucide-react'

import {
  cn,
  SlateId
} from '../../utilities'
import { Icon } from '../Icon'
import {
  AccordionItemProps,
  AccordionProps
} from './Accordion.types'

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps<SlateId>>(
  (
    { item, isOpen, onToggle, disabled = false, className, styles, ...props },
    ref
  ) => {
    const handleToggle = useCallback(() => {
      if (!disabled && !item.disabled) {
        onToggle(item.id)
      }
    }, [disabled, item.disabled, item.id, onToggle])

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          handleToggle()
        }
      },
      [handleToggle]
    )

    const isItemDisabled = disabled || item.disabled

    return (
      <div
        ref={ref}
        className={cn('border-b border-gray-200 last:border-b-0', className)}
        style={styles?.item}
        {...props}
      >
        <button
          type="button"
          className={cn(
            'flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded-sm',
            'hover:bg-gray-50 transition-colors',
            isItemDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
          )}
          style={styles?.trigger}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          disabled={isItemDisabled}
          aria-expanded={isOpen}
          aria-controls={`accordion-content-${item.id}`}
          id={`accordion-trigger-${item.id}`}
        >
          <div className="flex items-center gap-2">
            {item.leftIcon && (
              <Icon
                icon={item.leftIcon}
                className="h-4 w-4"
                style={styles?.icon}
              />
            )}
            <span>{item.title}</span>
          </div>
          <Icon
            icon={ChevronDown}
            className={cn(
              'h-4 w-4 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
            style={styles?.icon}
          />
        </button>

        <div
          id={`accordion-content-${item.id}`}
          role="region"
          aria-labelledby={`accordion-trigger-${item.id}`}
          className={cn(
            'overflow-hidden transition-all duration-200 ease-in-out',
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
          style={styles?.content}
        >
          <div className="px-4 py-3 text-sm text-gray-700">{item.content}</div>
        </div>
      </div>
    )
  }
)

AccordionItem.displayName = 'AccordionItem'

export const Accordion = forwardRef<HTMLDivElement, AccordionProps<SlateId>>(
  (
    {
      items,
      type = 'single',
      collapsible = true,
      defaultValue,
      value,
      onChange,
      disabled = false,
      className,
      styles,
      ...props
    },
    ref
  ) => {
    // Handle controlled vs uncontrolled state
    const isControlled = value !== undefined

    // Initialize internal state for uncontrolled mode
    const [internalValue, setInternalValue] = useState<SlateId | SlateId[]>(
      () => {
        if (defaultValue !== undefined) {
          return defaultValue
        }
        return type === 'multiple' ? [] : ''
      }
    )

    const currentValue = isControlled ? value : internalValue

    const openItems = useMemo(() => {
      if (type === 'multiple') {
        return Array.isArray(currentValue) ? currentValue : []
      }
      return (typeof currentValue === 'string' ||
        typeof currentValue === 'number') &&
        currentValue !== '' &&
        currentValue !== 0
        ? [currentValue]
        : []
    }, [currentValue, type])

    const handleToggle = useCallback(
      (itemId: SlateId) => {
        let newValue: SlateId | SlateId[] | null

        if (type === 'multiple') {
          const currentArray = Array.isArray(currentValue) ? currentValue : []
          const isCurrentlyOpen = currentArray.includes(itemId)

          if (isCurrentlyOpen) {
            newValue = currentArray.filter((id) => id !== itemId)
          } else {
            newValue = [...currentArray, itemId]
          }
        } else {
          const isCurrentlyOpen = currentValue === itemId

          if (isCurrentlyOpen && collapsible) {
            newValue = null
          } else {
            newValue = itemId
          }
        }

        if (!isControlled) {
          setInternalValue(newValue || (type === 'multiple' ? [] : ''))
        }

        onChange?.(newValue)
      },
      [type, currentValue, collapsible, isControlled, onChange]
    )

    return (
      <div
        ref={ref}
        className={cn(
          'divide-y divide-gray-200 rounded-lg overflow-hidden border border-gray-200 bg-white',
          className
        )}
        style={styles?.root}
        {...props}
      >
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            item={item}
            isOpen={openItems.includes(item.id)}
            onToggle={handleToggle}
            disabled={disabled}
            styles={styles}
          />
        ))}
      </div>
    )
  }
)

Accordion.displayName = 'Accordion'
