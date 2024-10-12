import { CSSProperties, HTMLProps } from 'react'

import { LucideIcon } from 'lucide-react'

import { SlateId, SlateSize, SlateVariant, Styleable } from '../../utilities'
import { LabelStyles } from '../Label/Label.types'
import { TextInputStyles } from '../TextInput/TextInput.types'

export type SelectStyles = {
  input: Partial<TextInputStyles>
  content: CSSProperties
  option: CSSProperties
  root: CSSProperties
  label: Partial<LabelStyles>
  error: CSSProperties
}

export type SelectItem<IdType extends SlateId> = {
  id: IdType
  name: string
  icon?: LucideIcon
}

export interface SelectProps<IdType extends SlateId>
  extends Omit<
      HTMLProps<HTMLDivElement>,
      'value' | 'defaultValue' | 'onChange' | 'ref' | 'size'
    >,
    Styleable<SelectStyles> {
  variant?: SlateVariant
  size?: SlateSize
  error?: string

  items: SelectItem<IdType>[]
  value: IdType | null
  defaultValue?: IdType | null
  onChange: (value: IdType | null, item: SelectItem<IdType> | null) => void
  clearable?: boolean

  searchable?: boolean
  search?: string
  defaultSearch?: string
  onSearchChange?: (query: string) => void

  iconLeft?: LucideIcon
  iconRight?: LucideIcon

  ref?: React.RefObject<HTMLDivElement>
}
