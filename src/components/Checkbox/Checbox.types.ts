import { CSSProperties } from 'react'

import * as RCheckbox from '@radix-ui/react-checkbox'

import { Styleable } from '../../utilities/types'

export type CheckboxStyles = {
  root: CSSProperties
  checkbox: CSSProperties
  indicator: CSSProperties
  label: CSSProperties
}

export interface CheckboxProps
  extends RCheckbox.CheckboxProps,
    Styleable<CheckboxStyles> {
  withBody?: boolean
  label?: string
  onCheckedChange?: (value: boolean) => void
}
