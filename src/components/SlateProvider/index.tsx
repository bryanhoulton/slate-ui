import { PropsWithChildren } from 'react'

import { TooltipProvider } from '../Tooltip'

export const SlateProvider = ({ children }: PropsWithChildren) => {
  return <TooltipProvider>{children}</TooltipProvider>
}
