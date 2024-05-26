import { twMerge } from 'tailwind-merge'

export function cn(...classNames: (string | undefined)[]) {
  return twMerge(classNames.filter(Boolean) as string[])
}
