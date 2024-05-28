import {
  DropdownMenuContentProps,
  DropdownMenuProps
} from '@radix-ui/react-dropdown-menu'

import { Styleable } from '../../utilities/types'
import { MenuItem } from './MenuItem.types'

export type MenuStyles = {}

export interface MenuProps
  extends DropdownMenuProps,
    Styleable<MenuStyles>,
    Pick<
      DropdownMenuContentProps,
      'align' | 'alignOffset' | 'side' | 'autoFocus'
    > {
  items: MenuItem[]
  children: React.ReactNode
}
