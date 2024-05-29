import { CSSProperties } from 'react'

import { AlertDialogProps } from '@radix-ui/react-alert-dialog'

import { Styleable } from '../../utilities'
import { ButtonStyles } from '../Button/Button.types'

export type ConfirmStyles = {
  overlay: CSSProperties
  content: CSSProperties
  title: CSSProperties
  description: CSSProperties
  cancelButton: ButtonStyles
  confirmButton: ButtonStyles
}

export interface ConfirmProps
  extends Styleable<ConfirmStyles>,
    AlertDialogProps {
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
}
