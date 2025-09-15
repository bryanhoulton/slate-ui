import { CSSProperties } from 'react'

import {
  SlateSize,
  SlateVariant,
  Styleable
} from '../../utilities/types'

export type VerificationCodeInputStyles = {
  root: CSSProperties
  input: CSSProperties
  error: CSSProperties
}

export interface VerificationCodeInputProps
  extends Styleable<VerificationCodeInputStyles> {
  /** Number of digits in the verification code */
  length?: number
  /** Current value of the verification code */
  value?: string
  /** Default value for uncontrolled usage */
  defaultValue?: string
  /** Callback when the value changes */
  onChange?: (value: string) => void
  /** Callback when all digits are filled */
  onComplete?: (value: string) => void
  /** Error message to display */
  error?: string
  /** Visual variant */
  variant?: SlateVariant
  /** Size of the input boxes */
  size?: SlateSize
  /** Whether the input is disabled */
  disabled?: boolean
  /** Whether to mask the input (show dots instead of numbers) */
  masked?: boolean
  /** Custom className for the root container */
  className?: string
  /** Placeholder character to show in empty boxes */
  placeholder?: string
  /** Auto focus the first input on mount */
  autoFocus?: boolean
}
