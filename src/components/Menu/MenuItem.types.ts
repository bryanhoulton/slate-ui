import { ButtonProps } from '../Button/Button.types'
import { CheckboxProps } from '../Checkbox/Checbox.types'
import { ConfirmProps } from '../Confirm/Confirm.types'
import { SwitchProps } from '../Switch/Switch.types'
import { TextInputProps } from '../TextInput/TextInput.types'

type __MenuItemProps = {
  id: string
  label: string
  confirm?: ConfirmProps
}

type TypedMenuItem<T, K extends string> = Omit<T, 'type'> & {
  type: K
} & __MenuItemProps

export type CheckboxItem = TypedMenuItem<CheckboxProps, 'checkbox'>
export type ButtonItem = TypedMenuItem<ButtonProps, 'button'>
export type TextItem = TypedMenuItem<{ value: string }, 'text'>
export type SwitchItem = TypedMenuItem<SwitchProps, 'switch'>
export type TextInputItem = TypedMenuItem<TextInputProps, 'text-input'>
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
  | TextInputItem
  | TextItem
  | CheckboxItem
  | SubGroupItem

export type MenuItemComponentProps = {
  item: MenuItem
}
