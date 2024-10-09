import { MoreVertical } from 'lucide-react'

import { cn } from '../../utilities'
import { ActionIcon } from '../ActionIcon'
import { Menu } from '../Menu'
import { CardProps } from './Card.types'

export function Card({
  className,
  children,
  preview,
  menu,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'border rounded-lg min-w-48 flex flex-col cursor-pointer bg-white transition',
        className
      )}
      {...props}
    >
      <div className="min-h-48 h-1">{preview}</div>

      <div className="p-2 flex items-center justify-between border-t">
        {children}
        {menu && (
          <Menu {...menu}>
            <ActionIcon icon={MoreVertical} />
          </Menu>
        )}
      </div>
    </div>
  )
}
