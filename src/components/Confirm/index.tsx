import React, {
  forwardRef,
  useState,
} from 'react';

import { Loader2 } from 'lucide-react';

import * as Dialog from '@radix-ui/react-dialog';

import {
  cn,
  useSometimesControlled,
} from '../../utilities';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { ConfirmProps } from './Confirm.types';

export const Confirm = forwardRef<HTMLDivElement, ConfirmProps>(
  (
    {
      title,
      description,
      children,
      confirmText = 'Confirm',
      cancelText = 'Cancel',
      onConfirm: onSubmit,
      styles,
      open: openProp,
      onOpenChange: onOpenChangeProp,
      defaultOpen: defaultOpenProp = false,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useSometimesControlled({
      valueProp: openProp,
      onChangeProp: onOpenChangeProp,
      defaultValue: defaultOpenProp
    })
    const [loading, setLoading] = useState(false)

    return (
      <Dialog.Root open={open} onOpenChange={setOpen} {...props}>
        <Dialog.Trigger asChild>{children}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay
            style={styles?.overlay}
            className="fixed inset-0 bg-[rgba(0,0,0,.3)] data-[state=open]:animate-overlayShow"
          />
          <Dialog.Content
            ref={ref}
            className={cn(
              'data-[state=open]:animate-contentShow fixed top-[50%] left-[50%]',
              'max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%]',
              'rounded-lg bg-white focus:outline-none p-4'
            )}
            style={styles?.content}
          >
            <Dialog.Title
              className="m-0 text-md font-medium"
              style={styles?.title}
            >
              {title}
            </Dialog.Title>
            {description && (
              <Dialog.Description
                className="mt-1 mb-5 text-sm leading-normal"
                style={styles?.description}
              >
                {description}
              </Dialog.Description>
            )}
            <div className="flex justify-end gap-2">
              <Dialog.Close asChild>
                <Button
                  variant="subtle"
                  styles={styles?.cancelButton}
                  disabled={loading}
                >
                  {cancelText}
                </Button>
              </Dialog.Close>

              <Button
                onClick={async () => {
                  setLoading(true)
                  await onSubmit?.()
                  setOpen(false)
                }}
                styles={styles?.cancelButton}
                disabled={loading}
              >
                {loading ? (
                  <Icon icon={Loader2} className="animate-spin" />
                ) : (
                  confirmText
                )}
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    )
  }
)
Confirm.displayName = 'Confirm'
