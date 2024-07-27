import * as Dialog from '@radix-ui/react-dialog'

import { Styleable } from '../../utilities'

export interface ModalStyles {
  overlay?: React.CSSProperties
  content?: React.CSSProperties
}

export interface ModalProps extends Dialog.DialogProps, Styleable<ModalStyles> {
  closeOnClickOutside?: boolean
  closeOnEscape?: boolean
  onClose: () => void
  className?: string
}
