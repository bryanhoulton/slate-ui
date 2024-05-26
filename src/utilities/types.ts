import { CSSProperties } from 'react'

export type Styleable<T extends string> = {
  styles?: {
    [K in T]: CSSProperties
  }
}
