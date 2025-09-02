import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'

import { cn, gid, useSometimesControlled } from '../../utilities'
import { Button } from '../Button'
import { Label } from '../Label'
import { Menu } from '../Menu'
import { MenuItem } from '../Menu/MenuItem.types'
import { TextInput } from '../TextInput'
import { CountryCode, PhoneInputProps } from './PhoneInput.types'

// Default country data with major countries
const DEFAULT_COUNTRIES: CountryCode[] = [
  {
    id: 'us',
    name: 'United States',
    code: 'US',
    dialCode: '+1',
    flag: '🇺🇸',
    format: '(###) ###-####',
    priority: 1
  },
  {
    id: 'ca',
    name: 'Canada',
    code: 'CA',
    dialCode: '+1',
    flag: '🇨🇦',
    format: '(###) ###-####',
    priority: 2
  },
  {
    id: 'gb',
    name: 'United Kingdom',
    code: 'GB',
    dialCode: '+44',
    flag: '🇬🇧',
    format: '#### ### ####',
    priority: 3
  },
  {
    id: 'au',
    name: 'Australia',
    code: 'AU',
    dialCode: '+61',
    flag: '🇦🇺',
    format: '#### ### ###',
    priority: 4
  },
  {
    id: 'de',
    name: 'Germany',
    code: 'DE',
    dialCode: '+49',
    flag: '🇩🇪',
    format: '#### #######',
    priority: 5
  },
  {
    id: 'fr',
    name: 'France',
    code: 'FR',
    dialCode: '+33',
    flag: '🇫🇷',
    format: '## ## ## ## ##',
    priority: 6
  },
  {
    id: 'jp',
    name: 'Japan',
    code: 'JP',
    dialCode: '+81',
    flag: '🇯🇵',
    format: '##-####-####',
    priority: 7
  },
  {
    id: 'cn',
    name: 'China',
    code: 'CN',
    dialCode: '+86',
    flag: '🇨🇳',
    format: '### #### ####',
    priority: 8
  },
  {
    id: 'in',
    name: 'India',
    code: 'IN',
    dialCode: '+91',
    flag: '🇮🇳',
    format: '##### #####',
    priority: 9
  },
  {
    id: 'br',
    name: 'Brazil',
    code: 'BR',
    dialCode: '+55',
    flag: '🇧🇷',
    format: '(##) #####-####',
    priority: 10
  },
  {
    id: 'mx',
    name: 'Mexico',
    code: 'MX',
    dialCode: '+52',
    flag: '🇲🇽',
    format: '### ### ####',
    priority: 11
  },
  {
    id: 'es',
    name: 'Spain',
    code: 'ES',
    dialCode: '+34',
    flag: '🇪🇸',
    format: '### ### ###',
    priority: 12
  },
  {
    id: 'it',
    name: 'Italy',
    code: 'IT',
    dialCode: '+39',
    flag: '🇮🇹',
    format: '### ### ####',
    priority: 13
  },
  {
    id: 'ru',
    name: 'Russia',
    code: 'RU',
    dialCode: '+7',
    flag: '🇷🇺',
    format: '### ###-##-##',
    priority: 14
  },
  {
    id: 'kr',
    name: 'South Korea',
    code: 'KR',
    dialCode: '+82',
    flag: '🇰🇷',
    format: '##-####-####',
    priority: 15
  },
  {
    id: 'nl',
    name: 'Netherlands',
    code: 'NL',
    dialCode: '+31',
    flag: '🇳🇱',
    format: '##-########',
    priority: 16
  },
  {
    id: 'se',
    name: 'Sweden',
    code: 'SE',
    dialCode: '+46',
    flag: '🇸🇪',
    format: '##-### ## ##',
    priority: 17
  },
  {
    id: 'ch',
    name: 'Switzerland',
    code: 'CH',
    dialCode: '+41',
    flag: '🇨🇭',
    format: '## ### ## ##',
    priority: 18
  },
  {
    id: 'no',
    name: 'Norway',
    code: 'NO',
    dialCode: '+47',
    flag: '🇳🇴',
    format: '### ## ###',
    priority: 19
  },
  {
    id: 'dk',
    name: 'Denmark',
    code: 'DK',
    dialCode: '+45',
    flag: '🇩🇰',
    format: '## ## ## ##',
    priority: 20
  }
]

// Phone number formatting functions
const formatPhoneNumber = (number: string, format?: string): string => {
  if (!format) return number

  const cleaned = number.replace(/\D/g, '')

  // If no digits, return empty string to show placeholder
  if (cleaned.length === 0) return ''

  let formatted = format

  for (let i = 0; i < cleaned.length; i++) {
    formatted = formatted.replace('#', cleaned[i])
  }

  return formatted.replace(/#/g, '')
}

const validatePhoneNumber = (number: string, country: CountryCode): boolean => {
  const cleaned = number.replace(/\D/g, '')

  // Basic validation - should have at least 7 digits and not exceed 15
  if (cleaned.length < 7 || cleaned.length > 15) {
    return false
  }

  // Country-specific validation can be added here
  switch (country.code) {
    case 'US':
    case 'CA':
      return cleaned.length === 10
    case 'GB':
      return cleaned.length >= 10 && cleaned.length <= 11
    case 'AU':
      return cleaned.length >= 9 && cleaned.length <= 10
    default:
      return cleaned.length >= 7 && cleaned.length <= 15
  }
}

const parsePhoneNumber = (input: string): string => {
  // Remove all non-digit characters except +
  return input.replace(/[^\d+]/g, '')
}

// Enhanced phone number handling with better cursor management
const smartFormatPhoneNumber = (
  newValue: string,
  oldValue: string,
  format?: string,
  cursorPosition?: number
): { formatted: string; newCursorPosition: number } => {
  if (!format) {
    return {
      formatted: newValue,
      newCursorPosition: cursorPosition || newValue.length
    }
  }

  const cleanedNew = newValue.replace(/\D/g, '')
  const cleanedOld = oldValue.replace(/\D/g, '')

  // If no digits, return empty string to show placeholder
  if (cleanedNew.length === 0) {
    return { formatted: '', newCursorPosition: 0 }
  }

  // If we're transitioning from empty to having content, put cursor at end
  if (cleanedOld.length === 0 && cleanedNew.length > 0) {
    const formatted = formatPhoneNumber(cleanedNew, format)
    return { formatted, newCursorPosition: formatted.length }
  }

  // Detect if user is deleting
  const isDeleting =
    cleanedNew.length < cleanedOld.length || newValue.length < oldValue.length

  // If deleting, be more permissive about when to avoid reformatting
  if (isDeleting) {
    // If the user deleted digits (not just formatting), reformat with new digit count
    if (cleanedNew.length < cleanedOld.length) {
      // User deleted actual digits, reformat with new digit count
      const formatted = formatPhoneNumber(cleanedNew, format)
      return {
        formatted,
        newCursorPosition: cursorPosition || formatted.length
      }
    } else {
      // User only deleted formatting characters, allow it temporarily
      // This gives users the ability to delete through formatting characters
      return {
        formatted: newValue,
        newCursorPosition: cursorPosition || newValue.length
      }
    }
  }

  // Apply formatting
  const formatted = formatPhoneNumber(cleanedNew, format)

  // Calculate new cursor position
  let newCursorPosition = cursorPosition || formatted.length

  // Adjust cursor position if we're in the middle of the input
  if (cursorPosition !== undefined && cursorPosition < newValue.length) {
    const digitsBeforeCursor = newValue
      .slice(0, cursorPosition)
      .replace(/\D/g, '').length
    let digitCount = 0

    for (let i = 0; i < formatted.length; i++) {
      if (/\d/.test(formatted[i])) {
        digitCount++
        if (digitCount > digitsBeforeCursor) {
          newCursorPosition = i
          break
        }
      }
    }

    if (digitCount <= digitsBeforeCursor) {
      newCursorPosition = formatted.length
    }
  }

  return { formatted, newCursorPosition }
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      label,
      error,
      value,
      defaultValue,
      onChange,
      countries = DEFAULT_COUNTRIES,
      defaultCountry = 'us',
      onCountryChange,
      autoFormat = true,
      validatePhoneNumber: enableValidation = true,
      className,
      styles,
      size,
      required,
      ...props
    },
    ref
  ) => {
    const componentId = gid()
    const inputRef = useRef<HTMLInputElement>(null)

    // Find default country
    const defaultCountryData = useMemo(() => {
      return countries.find((c) => c.id === defaultCountry) || countries[0]
    }, [countries, defaultCountry])

    // State management
    const [selectedCountry, setSelectedCountry] =
      useState<CountryCode>(defaultCountryData)
    const [displayValue, setDisplayValue] = useState(() => {
      const initialValue = value || defaultValue || ''
      if (!initialValue) return ''
      return autoFormat
        ? formatPhoneNumber(initialValue, defaultCountryData.format)
        : initialValue
    })

    const [phoneNumber, setPhoneNumber] = useSometimesControlled({
      valueProp: value,
      onChangeProp:
        onChange &&
        ((newValue: string) => {
          const cleaned = parsePhoneNumber(newValue)
          const formatted = autoFormat
            ? formatPhoneNumber(cleaned, selectedCountry.format)
            : cleaned
          onChange(cleaned, formatted, selectedCountry)
        }),
      defaultValue: defaultValue || ''
    })

    // Update display value when phone number changes externally
    useEffect(() => {
      if (value !== undefined) {
        const formatted = autoFormat
          ? formatPhoneNumber(value, selectedCountry.format)
          : value
        setDisplayValue(formatted)
      }
    }, [value, selectedCountry.format, autoFormat])

    // Validation state
    const isValidNumber = useMemo(() => {
      if (!enableValidation || !phoneNumber) return true
      return validatePhoneNumber(phoneNumber, selectedCountry)
    }, [phoneNumber, selectedCountry, enableValidation])

    // Convert countries to SelectItem format
    const countryItems: MenuItem[] = useMemo(() => {
      return countries
        .sort((a, b) => (a.priority || 999) - (b.priority || 999))
        .map((country) => ({
          id: country.id,
          label:
            country.flag + ' ' + country.name + ' (' + country.dialCode + ')',
          type: 'button',
          onClick: () => handleCountryChange(country.id)
        }))
    }, [countries])

    // Handle country change
    const handleCountryChange = (countryId: string | null) => {
      if (!countryId) return

      const country = countries.find((c) => c.id === countryId)
      if (country) {
        setSelectedCountry(country)
        onCountryChange?.(country)

        // Reformat the current number with the new country format
        if (autoFormat && phoneNumber) {
          const newFormatted = formatPhoneNumber(phoneNumber, country.format)
          setDisplayValue(newFormatted)
        }
      }
    }

    // Handle phone number change with smart formatting
    const handlePhoneChange = (newValue: string) => {
      const currentCursorPosition = inputRef.current?.selectionStart || 0

      if (autoFormat) {
        const { formatted, newCursorPosition } = smartFormatPhoneNumber(
          newValue,
          displayValue,
          selectedCountry.format,
          currentCursorPosition
        )

        setDisplayValue(formatted)

        // Update the underlying phone number (digits only)
        const cleaned = parsePhoneNumber(formatted)
        setPhoneNumber(cleaned)

        // Set cursor position after the component updates
        // Use a slightly longer delay to ensure the DOM has updated
        setTimeout(() => {
          if (inputRef.current && document.activeElement === inputRef.current) {
            inputRef.current.setSelectionRange(
              newCursorPosition,
              newCursorPosition
            )
          }
        }, 10)
      } else {
        setDisplayValue(newValue)
        const cleaned = parsePhoneNumber(newValue)
        setPhoneNumber(cleaned)
      }
    }

    // Display error if validation fails
    const displayError =
      error ||
      (enableValidation && phoneNumber && !isValidNumber
        ? 'Invalid phone number'
        : undefined)

    // Combine refs
    const combinedRef = (node: HTMLInputElement) => {
      inputRef.current = node
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    }

    return (
      <div
        className={cn('relative flex flex-col w-full', className)}
        style={styles?.root}
      >
        {label && (
          <Label
            htmlFor={componentId}
            styles={styles?.label}
            required={required}
          >
            {label}
          </Label>
        )}

        <div className="flex gap-2 w-full">
          {/* Country Select */}
          <Menu items={countryItems}>
            <Button
              className={cn(
                'p-0 flex items-center justify-center',
                size === 'sm' && 'w-6 h-6',
                size === 'md' && 'w-8 h-8',
                size === 'lg' && 'w-10 h-10'
              )}
              variant={props.variant}
              styles={styles?.countrySelect}
            >
              {selectedCountry.flag}
            </Button>
          </Menu>

          {/* Phone Number Input */}
          <TextInput
            id={componentId}
            type="tel"
            ref={combinedRef}
            value={displayValue}
            onChange={handlePhoneChange}
            error={displayError}
            size={size}
            style={styles?.input?.input}
            className={cn('flex-1 relative')}
            {...props}
          />
        </div>
      </div>
    )
  }
)

PhoneInput.displayName = 'PhoneInput'
