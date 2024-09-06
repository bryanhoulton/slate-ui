import { createContext, PropsWithChildren, useContext, useState } from 'react'

import { Confirm } from '../Confirm'
import { ConfirmProps } from '../Confirm/Confirm.types'
import { TooltipProvider } from '../Tooltip'

type ConfirmCallbackProps = Omit<ConfirmProps, 'open' | 'onOpenChange'>
type ConfirmContextValue = {
  confirm: (args: ConfirmCallbackProps) => void
}

const ConfirmContext = createContext<ConfirmContextValue>({
  confirm: () => {}
})

export const useConfirm = () => useContext(ConfirmContext)

export const SlateProvider = ({ children }: PropsWithChildren) => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmProps, setConfirmProps] = useState<ConfirmCallbackProps>({
    title: 'Are you sure?',
    onConfirm: () => {}
  })

  return (
    <TooltipProvider>
      <Confirm
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        {...confirmProps}
      />
      <ConfirmContext.Provider
        value={{
          confirm: (args) => {
            setConfirmProps({
              ...args,
              onConfirm: () => {
                args.onConfirm?.()
                setConfirmOpen(false)
              }
            })
            setConfirmOpen(true)
          }
        }}
      >
        {children}
      </ConfirmContext.Provider>
    </TooltipProvider>
  )
}
