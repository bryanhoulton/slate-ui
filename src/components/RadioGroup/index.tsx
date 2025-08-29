import {
  cn,
  SlateId,
  useSometimesControlled
} from '../../utilities'
import { Icon } from '../Icon'
import { Label } from '../Label'
import { RadioGroupProps } from './RadioGroup.types'

export function RadioGroup<T extends SlateId>({
  items,
  value: valueProp,
  onChange: onChangeProp,
  defaultValue,
  className,
  styles,
  label,
  orientation = 'vertical',
  disabled,
  ...props
}: RadioGroupProps<T>) {
  const [value, setValue] = useSometimesControlled<T | null>({
    valueProp: valueProp,
    onChangeProp,
    defaultValue: defaultValue ?? null
  })

  return (
    <div className="flex flex-col gap-2" style={styles?.root} {...props}>
      {label && <Label styles={styles?.label}>{label}</Label>}

      <div
        className={cn(
          'flex gap-1 items-stretch w-fit',
          orientation === 'vertical' && 'flex-col',
          className
        )}
        style={styles?.wrapper}
      >
        {items.map((item) => (
          <div
            className={cn(
              'flex items-center gap-2 cursor-pointer py-2 pl-3 pr-4 rounded-lg duration-150 border',
              item.id === value
                ? 'bg-primary text-white'
                : 'bg-white hover:bg-muted-light',
              disabled && 'cursor-not-allowed opacity-60'
            )}
            key={item.id}
            onClick={() => !disabled && setValue(item.id)}
            style={styles?.item}
          >
            <button
              className={cn(
                'w-3 h-3 shrink-0 rounded-full',
                item.id === value ? 'bg-white' : 'border'
              )}
              style={styles?.dot}
            />
            {item.iconLeft && (
              <Icon
                icon={item.iconLeft}
                styles={styles?.iconLeft}
                className="w-4 h-4"
                variant="subtle"
              />
            )}
            <div className="flex flex-col">
              <span className="text-sm" style={styles?.title}>
                {item.name}
              </span>
              {item.description && (
                <span
                  className={cn('text-xs', item.id !== value && 'text-muted')}
                  style={styles?.description}
                >
                  {item.description}
                </span>
              )}
            </div>
            {item.iconRight && (
              <Icon
                icon={item.iconRight}
                styles={styles?.iconRight}
                className="w-4 h-4 ml-auto"
                variant="subtle"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
