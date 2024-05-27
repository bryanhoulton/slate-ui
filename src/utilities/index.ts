import { twMerge } from 'tailwind-merge'

export function cn(...classNames: (string | undefined)[]) {
  return twMerge(classNames.filter(Boolean) as string[])
}

export function gid() {
  return 'slate-' + Math.random().toString(36).substr(2, 9)
}
