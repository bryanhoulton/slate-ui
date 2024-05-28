import { ButtonProps } from '../Button/Button.types'
import { CheckboxProps } from '../Checkbox/Checbox.types'
import { SwitchProps } from '../Switch/Switch.types'

type __MenuItemProps = {
  id: string
  label: string
}

type TypedMenuItem<T, K extends string> = Omit<T, 'type'> & {
  type: K
} & __MenuItemProps

export type CheckboxItem = TypedMenuItem<CheckboxProps, 'checkbox'>
export type ButtonItem = TypedMenuItem<ButtonProps, 'button'>
export type TextItem = TypedMenuItem<{ value: string }, 'text'>
export type SwitchItem = TypedMenuItem<SwitchProps, 'switch'>
export type GroupItem = TypedMenuItem<
  {
    items: MenuItem[]
  },
  'group'
>
export type SubGroupItem = TypedMenuItem<
  {
    items: MenuItem[]
  } & ButtonProps,
  'subgroup'
>

export type MenuItem =
  | SwitchItem
  | GroupItem
  | ButtonItem
  | TextItem
  | CheckboxItem
  | SubGroupItem

export type MenuItemComponentProps = {
  item: MenuItem
}
