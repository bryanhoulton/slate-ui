import { forwardRef } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { cn } from '../../utilities'
import { MenuProps } from './Menu.types'
import { MenuItemComponent } from './MenuItem'

export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      items,
      children,
      align = 'start',
      autoFocus,
      side,
      alignOffset,
      collisionPadding = 4,
      ...props
    },
    ref
  ) => (
    <DropdownMenu.Root {...props}>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={cn(
            'bg-white p-1 border border-muted-test shadow-sm rounded-lg flex flex-col gap-1',
            'data-[state=open]:animate-slideDownAndFade z-40'
          )}
          sideOffset={4}
          collisionPadding={collisionPadding}
          ref={ref}
          align={align}
          alignOffset={alignOffset}
          autoFocus={autoFocus}
        >
          {items.slice(0, 1000).map((item) => (
            <MenuItemComponent key={item.id} item={item} />
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
)
Menu.displayName = 'Menu'
