import {
  DropdownMenuContentProps,
  DropdownMenuProps
} from '@radix-ui/react-dropdown-menu'

import { Styleable } from '../../utilities/types'
import { MenuItem } from './MenuItem.types'

export type MenuStyles = Record<string, never>

export interface MenuProps
  extends DropdownMenuProps,
    Styleable<MenuStyles>,
    Pick<
      DropdownMenuContentProps,
      'align' | 'alignOffset' | 'side' | 'autoFocus' | 'collisionPadding'
    > {
  items: MenuItem[]
  children: React.ReactNode
}
