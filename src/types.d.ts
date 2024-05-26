type SlateVariant = 'primary' | 'secondary' | 'subtle'
type SlateSize = 'sm' | 'md' | 'lg'
type SlateColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'

type Variants<T> = {
  [K in keyof T]: {
    [V in T[K]]: string
  }
}
