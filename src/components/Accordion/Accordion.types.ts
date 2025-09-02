import React, {
  CSSProperties,
  HTMLProps
} from 'react'

import { LucideIcon } from 'lucide-react'

import {
  SlateId,
  Styleable
} from '../../utilities'
import { BadgeProps } from '../Badge/Badge.types'

export type AccordionStyles = {
  root: CSSProperties
  item: CSSProperties
  trigger: CSSProperties
  content: CSSProperties
  icon: CSSProperties
}

export interface AccordionItemData<IdType extends SlateId> {
  id: IdType
  title: React.ReactNode
  content: React.ReactNode
  leftIcon?: LucideIcon
  badge?: BadgeProps
  disabled?: boolean
}

export interface AccordionProps<IdType extends SlateId = SlateId>
  extends Omit<
      HTMLProps<HTMLDivElement>,
      'onChange' | 'value' | 'defaultValue'
    >,
    Styleable<AccordionStyles> {
  items: AccordionItemData<IdType>[]
  type?: 'single' | 'multiple'
  collapsible?: boolean
  defaultValue?: IdType | IdType[]
  value?: IdType | IdType[]
  onChange?: (value: IdType | IdType[] | null) => void
  disabled?: boolean
}

export interface AccordionItemProps<IdType extends SlateId = SlateId>
  extends Omit<HTMLProps<HTMLDivElement>, 'onChange' | 'onToggle'>,
    Styleable<Pick<AccordionStyles, 'item' | 'trigger' | 'content' | 'icon'>> {
  item: AccordionItemData<IdType>
  isOpen: boolean
  badge?: BadgeProps
  onToggle: (id: IdType) => void
  disabled?: boolean
}
