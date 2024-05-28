import { forwardRef } from 'react'

import { ChevronRight } from 'lucide-react'

import {
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '@radix-ui/react-dropdown-menu'

import { cn } from '../../utilities'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { Switch } from '../Switch'
import { MenuItemComponentProps } from './MenuItem.types'

export const MenuItemComponent = forwardRef<any, MenuItemComponentProps>(
  ({ item }, ref) => {
    switch (item.type) {
      case 'button': {
        const { variant = 'subtle', className, ...rest } = item

        return (
          <Button
            variant={variant}
            role="menuitem"
            className={cn('w-full hover:bg-muted', className)}
            ref={ref}
            {...rest}
          >
            {item.label}
          </Button>
        )
      }
      case 'checkbox': {
        const { type, withBody = true, className, ...rest } = item
        return (
          <Checkbox
            withBody={withBody}
            role="menuitem"
            className={cn('w-full', className)}
            {...rest}
          />
        )
      }
      case 'switch': {
        const { type, withBody = true, className, ...rest } = item
        return (
          <Switch
            withBody={withBody}
            role="menuitem"
            className={cn('w-full', className)}
            {...rest}
          />
        )
      }
      case 'text': {
        return <span className="p-2 w-full text-sm">{item.label}</span>
      }
      case 'subgroup':
        const {
          variant = 'subtle',
          items,
          iconRight = ChevronRight,
          className,
          type,
          ...rest
        } = item

        return (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Button
                variant={variant}
                role="menuitem"
                className={cn(
                  'w-full justify-between hover:bg-muted',
                  className
                )}
                ref={ref}
                iconRight={iconRight}
                {...rest}
              >
                {item.label}
              </Button>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent
                className={cn(
                  'bg-white p-1 border border-muted shadow-sm rounded-lg flex flex-col gap-1'
                )}
                sideOffset={8}
                ref={ref}
              >
                {items.map((item) => (
                  <MenuItemComponent key={item.id} item={item} />
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        )
      case 'group': {
        return (
          <DropdownMenuGroup
            key={item.id}
            className="border-b border-muted py-1 flex flex-col gap-1"
          >
            <DropdownMenuLabel className="text-xs pl-2 text-muted uppercase">
              {item.label}
            </DropdownMenuLabel>
            {item.items.map((subItem) => (
              <MenuItemComponent key={subItem.id} item={subItem} />
            ))}
          </DropdownMenuGroup>
        )
      }
    }
  }
)
