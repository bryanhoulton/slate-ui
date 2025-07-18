import { CSSProperties } from 'react'

import { Styleable } from '../../utilities'
import { ButtonStyles } from '../Button/Button.types'
import { LabelStyles } from '../Label/Label.types'
import {
  TextInputProps,
  TextInputStyles
} from '../TextInput/TextInput.types'

export type CountryCode = {
  id: string
  name: string
  code: string
  dialCode: string
  flag: string
  format?: string
  priority?: number
}

export type PhoneInputStyles = {
  label: Partial<LabelStyles>
  input: TextInputStyles
  countrySelect: ButtonStyles
  root: CSSProperties
  error: CSSProperties
  flagIcon: CSSProperties
  dialCode: CSSProperties
}

export interface PhoneInputProps
  extends Omit<
      TextInputProps,
      'onChange' | 'value' | 'defaultValue' | 'styles'
    >,
    Styleable<PhoneInputStyles> {
  label?: string
  error?: string
  value?: string
  defaultValue?: string
  onChange?: (
    value: string,
    formattedValue: string,
    country: CountryCode
  ) => void

  // Country selection
  countries?: CountryCode[]
  defaultCountry?: string
  onCountryChange?: (country: CountryCode) => void

  // Validation
  autoFormat?: boolean
  validatePhoneNumber?: boolean
}

export interface PhoneInputState {
  selectedCountry: CountryCode
  phoneNumber: string
  formattedNumber: string
  isValidNumber: boolean
}
