import { CSSProperties, HTMLProps } from 'react'

import { LucideIcon } from 'lucide-react'

import { SlateId, SlateSize, SlateVariant, Styleable } from '../../utilities'
import { BadgeStyles } from '../Badge/Badge.types'
import { LabelStyles } from '../Label/Label.types'
import { SelectItem } from '../Select/Select.types'

export type MultiSelectStyles = {
  root: CSSProperties
  input: CSSProperties
  content: CSSProperties
  option: CSSProperties
  label: Partial<LabelStyles>
  error: CSSProperties
  badge: Partial<BadgeStyles>
}

export interface MultiSelectProps<IdType extends SlateId>
  extends Omit<
      HTMLProps<HTMLDivElement>,
      'value' | 'defaultValue' | 'onChange' | 'ref' | 'size'
    >,
    Styleable<MultiSelectStyles> {
  variant?: SlateVariant
  size?: SlateSize
  error?: string

  items: SelectItem<IdType>[]
  value: IdType[]
  defaultValue?: IdType[]
  onChange: (values: IdType[], items: SelectItem<IdType>[]) => void
  clearable?: boolean

  /**
   * Limit the number of selectable items. When reached, remaining options are
   * disabled in the dropdown.
   */
  maxSelected?: number

  searchable?: boolean
  search?: string
  defaultSearch?: string
  onSearchChange?: (query: string) => void

  iconLeft?: LucideIcon

  ref?: React.RefObject<HTMLDivElement>
}
