import {
  Dispatch,
  SetStateAction,
  useCallback,
  useState
} from 'react'

import { twMerge } from 'tailwind-merge'

export function cn(...classNames: Array<string | boolean | undefined>): string {
  return twMerge(classNames.filter(Boolean) as string[])
}

export function gid(): string {
  return 'slate-' + Math.random().toString(36).substr(2, 9)
}

export function useSometimesControlled<T>({
  valueProp,
  onChangeProp,
  defaultValue
}: {
  valueProp?: T
  onChangeProp?: (v: T) => void
  defaultValue: T
}) {
  const [value, setValue] = useState<T>(valueProp ?? defaultValue)
  const onChange = useCallback(
    (v: T | ((v: T) => T)) => {
      if (typeof v === 'function') {
        setValue((prev) => {
          const next = (v as (v: T) => T)(prev)
          onChangeProp?.(next)
          return next
        })
        return
      } else {
        setValue(v)
        onChangeProp?.(v)
      }
    },
    [onChangeProp, setValue]
  )

  return [valueProp ?? value, onChange] as [T, Dispatch<SetStateAction<T>>]
}

export function bin<T>(data: T[], size: number): T[][] {
  const bins = data.reduce((bins, item, index) => {
    const binIndex = Math.floor(index / size)
    bins[binIndex] = [...(bins[binIndex] || []), item]
    return bins
  }, [] as T[][])
  return bins
}

export * from './types'
export * from './chart-types'
export * from './stories'
export * from './story-variants'
