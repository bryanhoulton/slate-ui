import { CSSProperties } from 'react'

import * as RCheckbox from '@radix-ui/react-checkbox'

export type CheckboxStyles = {
  root: CSSProperties
}

export interface CheckboxProps extends RCheckbox.CheckboxProps {
  withBody?: boolean
  label?: string
}
