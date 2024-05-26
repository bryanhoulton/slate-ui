type SlateVariant = 'primary' | 'secondary' | 'subtle'
type SlateSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
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
