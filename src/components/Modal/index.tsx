import * as Dialog from '@radix-ui/react-dialog'

import { cn } from '../../utilities'
import { ModalProps } from './Modal.types'

export function Modal({
  closeOnClickOutside = true,
  closeOnEscape = true,
  onClose,
  styles,
  children,
  className,
  ...props
}: ModalProps) {
  return (
    <Dialog.Root {...props}>
      <Dialog.Portal>
        <div
          className="fixed inset-0 z-30"
          style={{ background: 'rgba(0, 0, 0, .25)', ...styles?.overlay }}
        />
        <div className="fixed inset-0 z-30 flex items-center justify-center">
          <Dialog.Content
            className={cn(
              'max-h-[95vh] min-w-96 max-w-[95vw]',
              'bg-white overflow-hidden rounded-lg shadow',
              'flex flex-col outline-none',
              className
            )}
            onEscapeKeyDown={() => closeOnEscape && onClose()}
            onPointerDownOutside={() => closeOnClickOutside && onClose()}
            style={styles?.content}
          >
            {children}
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
