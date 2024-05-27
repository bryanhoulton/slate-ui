export type Styleable<T> = {
  styles?: T
}

export type SlateVariant = 'primary' | 'secondary' | 'subtle'
export type SlateSize = 'sm' | 'md' | 'lg'
export type SlateColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'

export type Variants<T extends Record<string, any>> = {
  [K in keyof T]: {
    [V in T[K]]: string
  }
}
