import { CSSProperties } from 'react'

import { Styleable } from '../../utilities'
import { LabelStyles } from '../Label/Label.types'

export type AddressInputStyles = {
  root: CSSProperties
  input: CSSProperties
  content: CSSProperties
  option: CSSProperties
  label: Partial<LabelStyles>
  error: CSSProperties
}

export interface AddressValue {
  formatted: string
  lat: number
  lon: number
  city?: string
  state?: string
  postalCode?: string
  country?: string
}

export interface AddressInputProps extends Styleable<AddressInputStyles> {
  label?: string
  error?: string
  placeholder?: string
  disabled?: boolean
  value: AddressValue | null
  onChange: (value: AddressValue | null) => void
  /** Override the default suggestion source (default: OpenStreetMap Nominatim). */
  fetchSuggestions?: (query: string) => Promise<AddressValue[]>
  ref?: React.RefObject<HTMLDivElement>
}
