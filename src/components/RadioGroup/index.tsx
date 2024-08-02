import {
  cn,
  SlateId,
  useSometimesControlled,
} from '../../utilities';
import { RadioGroupProps } from './RadioGroup.types';

export function RadioGroup<T extends SlateId>({
  items,
  value: valueProp,
  onChange: onChangeProp,
  defaultValue,
  className,
  styles,
  orientation = 'vertical',
  ...props
}: RadioGroupProps<T>) {
  const [value, setValue] = useSometimesControlled({
    valueProp,
    onChangeProp,
    defaultValue: defaultValue ?? items[0].id
  })

  return (
    <div
      className={cn(
        'flex gap-1',
        orientation === 'vertical' && 'flex-col',
        className
      )}
      style={styles?.root}
      {...props}
    >
      {items.map((item) => (
        <div
          className={cn(
            'flex items-center gap-2 cursor-pointer w-fit py-2 pl-3 pr-4 rounded-lg duration-150 border',
            item.id === value ? 'bg-primary text-white' : 'hover:bg-muted'
          )}
          key={item.id}
          onClick={() => setValue(item.id)}
          style={styles?.item}
        >
          <button
            className={cn(
              'w-3 h-3 rounded-full',
              item.id === value ? 'bg-white' : 'border'
            )}
            style={styles?.dot}
          />
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
        </div>
      ))}
    </div>
  )
}
