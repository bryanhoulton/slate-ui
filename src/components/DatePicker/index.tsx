import {
  useEffect,
  useMemo,
  useState
} from 'react'

import {
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

import {
  cn,
  useSometimesControlled
} from '../../utilities'
import { ActionIcon } from '../ActionIcon'
import { Button } from '../Button'
import { DatePickerProps } from './DatePicker.types'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
] as const
const GRID_CELLS = 42

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1)
}

function addDays(date: Date, amount: number): Date {
  const next = new Date(date)
  next.setDate(next.getDate() + amount)
  return next
}

function isSameDay(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function isBeforeDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() < startOfDay(b).getTime()
}

function isAfterDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() > startOfDay(b).getTime()
}

export function DatePicker({
  disabled,
  styles,
  value: valueProp,
  defaultValue,
  onChange,
  minDate,
  maxDate,
  className
}: DatePickerProps) {
  const [value, setValue] = useSometimesControlled<Date | null>({
    valueProp,
    defaultValue: defaultValue ?? null,
    onChangeProp: onChange
  })
  const [selectedDay, setSelectedDay] = useState<Date | null>(() =>
    valueProp || defaultValue ? startOfDay(valueProp ?? defaultValue!) : null
  )
  const [visibleMonth, setVisibleMonth] = useState<Date>(() =>
    startOfMonth(valueProp ?? defaultValue ?? new Date())
  )

  const [selectionMode, setSelectionMode] = useState<'day' | 'month' | 'year'>(
    'day'
  )

  useEffect(() => {
    if (value) {
      setSelectedDay(startOfDay(value))
      setVisibleMonth(startOfMonth(value))
    }
  }, [value])

  const calendarDays = useMemo(() => {
    const firstOfMonth = startOfMonth(visibleMonth)
    const firstGridDate = addDays(firstOfMonth, -firstOfMonth.getDay())

    return Array.from({ length: GRID_CELLS }, (_, index) =>
      addDays(firstGridDate, index)
    )
  }, [visibleMonth])

  const today = useMemo(() => startOfDay(new Date()), [])

  const isDateDisabled = (day: Date): boolean => {
    if (minDate && isBeforeDay(day, minDate)) return true
    if (maxDate && isAfterDay(day, maxDate)) return true
    return false
  }

  const handleDaySelect = (day: Date) => {
    if (disabled || isDateDisabled(day)) return

    const nextDay = startOfDay(day)
    setSelectedDay(nextDay)

    const nextValue = new Date(nextDay)
    if (value) {
      nextValue.setHours(value.getHours())
      nextValue.setMinutes(value.getMinutes())
    }
    setValue(nextValue)
  }

  return (
    <div
      className={cn(
        'p-4 flex flex-col gap-6 md:flex-row md:gap-8 w-fit',
        disabled && 'opacity-60 pointer-events-none',
        className
      )}
      style={styles?.root}
    >
      <div className="flex flex-1 flex-col gap-3 relative">
        <div
          className={cn(
            'flex items-center justify-between',
            selectionMode === 'month' && 'hidden'
          )}
        >
          <ActionIcon
            icon={ChevronLeft}
            size="md"
            variant="subtle"
            onClick={() => setVisibleMonth(addMonths(visibleMonth, -1))}
            disabled={disabled}
          />
          <Button
            iconLeft={Calendar}
            variant="subtle"
            onClick={() => setSelectionMode('month')}
          >
            {visibleMonth.toLocaleDateString(undefined, {
              month: 'long',
              year: 'numeric'
            })}
          </Button>
          <ActionIcon
            icon={ChevronRight}
            size="md"
            variant="subtle"
            onClick={() => setVisibleMonth(addMonths(visibleMonth, 1))}
            disabled={disabled}
          />
        </div>

        <div className="grid grid-cols-7 gap-1 text-[11px] text-muted text-center">
          {WEEKDAYS.map((day) => (
            <div key={day} className="py-1 font-medium">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1" style={styles?.calendar}>
          {calendarDays.map((day) => {
            const outsideMonth = day.getMonth() !== visibleMonth.getMonth()
            const disabledDay = isDateDisabled(day)
            const isSelected = isSameDay(day, selectedDay)
            const isToday = isSameDay(day, today)

            return (
              <Button
                key={day.toISOString()}
                type="button"
                variant={isSelected ? 'primary' : 'subtle'}
                className={cn(
                  'w-10 h-10 text-md flex items-center justify-center',
                  'focus:outline-none focus:ring-2 focus:ring-primary',
                  outsideMonth && 'opacity-50',
                  disabledDay && 'line-through',
                  isToday &&
                    !isSelected &&
                    'bg-primary-100 hover:bg-primary-200'
                )}
                onClick={() => handleDaySelect(day)}
                disabled={disabled || disabledDay}
              >
                {day.getDate()}
              </Button>
            )
          })}
        </div>

        {selectionMode === 'month' && (
          <div className="absolute inset-0 z-10 bg-white flex flex-col gap-2">
            <div className="flex items-center justify-center">
              <span className="text-md font-medium">
                {visibleMonth.getFullYear()}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 grow">
              {MONTHS.map((month) => (
                <Button
                  key={month}
                  variant={
                    visibleMonth.getMonth() === MONTHS.indexOf(month)
                      ? 'primary'
                      : 'default'
                  }
                  onClick={() => {
                    setSelectionMode('day')
                    setVisibleMonth(
                      new Date(
                        visibleMonth.getFullYear(),
                        MONTHS.indexOf(month),
                        1
                      )
                    )
                  }}
                  className="justify-center items-center h-full"
                >
                  {month}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
