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
import { Confirm } from '../Confirm'
import { Switch } from '../Switch'
import { TextInput } from '../TextInput'
import { MenuItemComponentProps } from './MenuItem.types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MenuItemComponent = forwardRef<any, MenuItemComponentProps>(
  ({ item }, ref) => {
    function getInternals() {
      switch (item.type) {
        case 'button': {
          const { variant = 'default', className, ...rest } = item

          return (
            <Button
              variant={variant}
              role="menuitem"
              className={cn('w-full hover:bg-muted-light gap-2', className)}
              ref={ref}
              {...rest}
            >
              {item.label}
            </Button>
          )
        }
        case 'checkbox': {
          const { type: _, withBody = true, className, ...rest } = item
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
        case 'subgroup': {
          const {
            variant = 'default',
            items,
            iconRight = ChevronRight,
            className,
            type: _,
            ...rest
          } = item

          return (
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="outline-none">
                <Button
                  variant={variant}
                  role="menuitem"
                  className={cn(
                    'w-full justify-between hover:bg-muted-light',
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
                    'bg-white p-1 border border-muted-light shadow-sm rounded-lg flex flex-col gap-1'
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
        }
        case 'group': {
          return (
            <DropdownMenuGroup
              key={item.id}
              className="border-b border-muted-light py-1 flex flex-col gap-1"
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
        case 'text-input': {
          const { type, className, ...rest } = item
          return (
            <TextInput
              type={type}
              className={cn('w-full p-2', className)}
              {...rest}
            />
          )
        }
      }
    }

    if (item.confirm) {
      return <Confirm {...item.confirm}>{getInternals()}</Confirm>
    }
    return getInternals()
  }
)
MenuItemComponent.displayName = 'MenuItemComponent'
