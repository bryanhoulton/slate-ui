import {
  ChangeEvent,
  ClipboardEvent,
  forwardRef,
  KeyboardEvent,
  useEffect,
  useRef,
  useState
} from 'react'

import { cva } from 'class-variance-authority'

import { cn } from '../../utilities'
import { SlateSize, SlateVariant, Variants } from '../../utilities/types'
import { VerificationCodeInputProps } from './VerificationCodeInput.types'

export const verificationCodeInputVariants = cva<
  Variants<{
    variant: SlateVariant
    size: SlateSize
    error: boolean
  }>
>(
  [
    'rounded-lg border text-center font-mono font-semibold',
    'focus:outline-none focus:ring-2 transition bg-white',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  ],
  {
    variants: {
      variant: {
        primary:
          'border-gray-300 focus:border-primary-500 focus:ring-primary-200',
        secondary:
          'border-gray-300 focus:border-secondary-500 focus:ring-secondary-200',
        default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-200',
        subtle: 'border-gray-200 focus:border-gray-400 focus:ring-gray-100',
        success:
          'border-success-300 focus:border-success-500 focus:ring-success-200',
        warning:
          'border-warning-300 focus:border-warning-500 focus:ring-warning-200',
        error: 'border-error-300 focus:border-error-500 focus:ring-error-200',
        info: 'border-info-300 focus:border-info-500 focus:ring-info-200'
      },
      size: {
        sm: 'w-8 h-8 text-sm',
        md: 'w-12 h-12 text-lg',
        lg: 'w-16 h-16 text-xl'
      },
      error: {
        true: 'border-error-500'
      }
    }
  }
)

export const VerificationCodeInput = forwardRef<
  HTMLDivElement,
  VerificationCodeInputProps
>(
  (
    {
      length = 6,
      value: valueProp,
      defaultValue = '',
      onChange,
      onComplete,
      error,
      variant = 'default',
      size = 'md',
      disabled = false,
      masked = false,
      className,
      styles,
      placeholder = '',
      autoFocus = false,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState<string>(
      valueProp ?? defaultValue
    )
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const value = valueProp ?? internalValue
    const digits = value.padEnd(length, '').split('').slice(0, length)

    useEffect(() => {
      if (autoFocus && inputRefs.current[0]) {
        inputRefs.current[0].focus()
      }
    }, [autoFocus])

    useEffect(() => {
      if (valueProp !== undefined) {
        setInternalValue(valueProp)
      }
    }, [valueProp])

    const handleChange = (index: number, newValue: string) => {
      // Extract only digits from the input
      const cleanValue = newValue.replace(/\D/g, '')

      // Check if this is a full code paste (more than 1 digit)
      if (cleanValue.length > 1) {
        // Handle full code input (from autofill or paste)
        const fullCode = cleanValue.slice(0, length)

        if (valueProp === undefined) {
          setInternalValue(fullCode)
        }

        onChange?.(fullCode)

        // Focus the next empty input or the last input
        const nextEmptyIndex = Math.min(fullCode.length, length - 1)
        inputRefs.current[nextEmptyIndex]?.focus()

        if (fullCode.length === length) {
          onComplete?.(fullCode)
        }

        return
      }

      // Handle single digit input
      const digit = cleanValue.slice(-1)
      const newDigits = [...digits]
      newDigits[index] = digit

      const newCode = newDigits.join('').replace(/\s+$/, '') // Remove trailing spaces

      if (valueProp === undefined) {
        setInternalValue(newCode)
      }

      onChange?.(newCode)

      // Auto-focus next input
      if (digit && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }

      // Call onComplete if all digits are filled
      if (newCode.length === length) {
        onComplete?.(newCode)
      }
    }

    const handleKeyDown = (
      index: number,
      event: KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key === 'Backspace') {
        if (!digits[index] && index > 0) {
          // If current input is empty, move to previous input and clear it
          inputRefs.current[index - 1]?.focus()
          handleChange(index - 1, '')
        } else {
          // Clear current input
          handleChange(index, '')
        }
      } else if (event.key === 'ArrowLeft' && index > 0) {
        inputRefs.current[index - 1]?.focus()
      } else if (event.key === 'ArrowRight' && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }

    const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault()
      const pastedData = event.clipboardData
        .getData('text')
        .replace(/\D/g, '')
        .slice(0, length)

      if (pastedData.length > 0) {
        if (valueProp === undefined) {
          setInternalValue(pastedData)
        }

        onChange?.(pastedData)

        // Focus the next empty input or the last input
        const nextEmptyIndex = Math.min(pastedData.length, length - 1)
        inputRefs.current[nextEmptyIndex]?.focus()

        if (pastedData.length === length) {
          onComplete?.(pastedData)
        }
      }
    }

    return (
      <div
        ref={ref}
        className={cn('flex gap-2', className)}
        style={styles?.root}
        {...props}
      >
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el
            }}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={length} // Allow full code length to handle autofill
            autoComplete={index === 0 ? 'one-time-code' : 'off'} // Enable autofill on first input
            value={masked && digits[index] ? '•' : digits[index]}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChange(index, event.target.value)
            }
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
            disabled={disabled}
            placeholder={placeholder}
            className={verificationCodeInputVariants({
              variant,
              size,
              error: Boolean(error)
            })}
            style={styles?.input}
            aria-label={`Digit ${index + 1} of ${length}`}
          />
        ))}
        {error && (
          <div className="absolute top-full left-0 mt-1">
            <small className="text-xs text-error-500" style={styles?.error}>
              {error}
            </small>
          </div>
        )}
      </div>
    )
  }
)

VerificationCodeInput.displayName = 'VerificationCodeInput'
