import React, {
  CSSProperties,
  HTMLProps
} from 'react'

import { LucideIcon } from 'lucide-react'

import { Styleable } from '../../utilities'

export type AccordionStyles = {
  root: CSSProperties
  item: CSSProperties
  trigger: CSSProperties
  content: CSSProperties
  icon: CSSProperties
}

export interface AccordionItemData {
  id: string
  title: React.ReactNode
  content: React.ReactNode
  leftIcon?: LucideIcon
  disabled?: boolean
}

export interface AccordionProps
  extends Omit<HTMLProps<HTMLDivElement>, 'onChange'>,
    Styleable<AccordionStyles> {
  items: AccordionItemData[]
  type?: 'single' | 'multiple'
  collapsible?: boolean
  defaultValue?: string | string[]
  value?: string | string[]
  onChange?: (value: string | string[] | null) => void
  disabled?: boolean
}

export interface AccordionItemProps
  extends Omit<HTMLProps<HTMLDivElement>, 'onChange' | 'onToggle'>,
    Styleable<Pick<AccordionStyles, 'item' | 'trigger' | 'content' | 'icon'>> {
  item: AccordionItemData
  isOpen: boolean
  onToggle: (id: string) => void
  disabled?: boolean
}
