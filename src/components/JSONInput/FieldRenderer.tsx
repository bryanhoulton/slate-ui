import { CSSProperties, useCallback } from 'react'

import { Plus, Trash2 } from 'lucide-react'

import { cn } from '../../utilities'
import { SlateSize, SlateVariant } from '../../utilities/types'
import { ActionIcon } from '../ActionIcon'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { ColorPicker } from '../ColorPicker'
import { DatePicker } from '../DatePicker'
import { Label } from '../Label'
import { NumberInput } from '../NumberInput'
import { PhoneInput } from '../PhoneInput'
import { Select } from '../Select'
import { Slider } from '../Slider'
import { Switch } from '../Switch'
import { TextArea } from '../TextArea'
import { TextInput } from '../TextInput'
import { JSONInputStyles, JSONSchema, JSONValue } from './JSONInput.types'
import {
  getSchemaDefault,
  humanize,
  isArrayValue,
  isObjectValue,
  joinPathIndex,
  joinPathProperty
} from './schema'

interface FieldRendererProps {
  schema: JSONSchema
  value: JSONValue | undefined
  onChange: (value: JSONValue) => void
  /** Dot/bracket path to the current field. Empty string for the root. */
  path: string
  /** Label override. Falls back to `schema.title` or a humanized key. */
  label?: string
  /** Description override. Falls back to `schema.description`. */
  descriptionOverride?: string
  /** Explicit error for this field, if any. */
  error?: string
  /** All errors keyed by path. Passed down for nested fields. */
  errors?: Record<string, string>
  /** Label overrides keyed by path. */
  labels?: Record<string, string>
  required?: boolean
  disabled?: boolean
  variant?: SlateVariant
  size?: SlateSize
  styles?: Partial<JSONInputStyles>
  /** When true, this field is the root so skip outer chrome on groups. */
  isRoot?: boolean
}

/** Format a Date as an ISO "YYYY-MM-DD" string. */
function toDateString(date: Date): string {
  const y = date.getFullYear().toString().padStart(4, '0')
  const m = (date.getMonth() + 1).toString().padStart(2, '0')
  const d = date.getDate().toString().padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Parse an ISO date/date-time string into a Date, or null if invalid. */
function parseDate(value: unknown): Date | null {
  if (typeof value !== 'string' || !value) return null
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

function computeLabel(
  schema: JSONSchema,
  explicitLabel: string | undefined,
  path: string,
  labels: Record<string, string> | undefined
): string | undefined {
  if (labels && path in labels) return labels[path]
  if (explicitLabel !== undefined) return explicitLabel
  if (schema.title) return schema.title
  return undefined
}

export function FieldRenderer({
  schema,
  value,
  onChange,
  path,
  label,
  descriptionOverride,
  error,
  errors,
  labels,
  required,
  disabled,
  variant = 'default',
  size = 'md',
  styles,
  isRoot
}: FieldRendererProps) {
  const displayLabel = computeLabel(schema, label, path, labels)
  const labelSuffix = required ? ' *' : ''
  const fullLabel = displayLabel ? `${displayLabel}${labelSuffix}` : undefined
  const effectiveDescription =
    descriptionOverride !== undefined ? descriptionOverride : schema.description
  const effectiveDisabled = disabled || schema.readOnly

  switch (schema.type) {
    case 'string':
      return (
        <StringField
          schema={schema}
          value={value}
          onChange={onChange}
          label={fullLabel}
          description={effectiveDescription}
          error={error}
          disabled={effectiveDisabled}
          variant={variant}
          size={size}
          styles={styles}
        />
      )
    case 'number':
    case 'integer':
      return (
        <NumberField
          schema={schema}
          value={value}
          onChange={onChange}
          label={fullLabel}
          description={effectiveDescription}
          error={error}
          disabled={effectiveDisabled}
          variant={variant}
          size={size}
          styles={styles}
        />
      )
    case 'boolean':
      return (
        <BooleanField
          schema={schema}
          value={value}
          onChange={onChange}
          label={fullLabel}
          description={effectiveDescription}
          error={error}
          disabled={effectiveDisabled}
          styles={styles}
        />
      )
    case 'object':
      return (
        <ObjectField
          schema={schema}
          value={value}
          onChange={onChange}
          label={fullLabel}
          description={effectiveDescription}
          error={error}
          errors={errors}
          labels={labels}
          disabled={effectiveDisabled}
          variant={variant}
          size={size}
          styles={styles}
          path={path}
          isRoot={isRoot}
        />
      )
    case 'array':
      return (
        <ArrayField
          schema={schema}
          value={value}
          onChange={onChange}
          label={fullLabel}
          description={effectiveDescription}
          error={error}
          errors={errors}
          labels={labels}
          disabled={effectiveDisabled}
          variant={variant}
          size={size}
          styles={styles}
          path={path}
          isRoot={isRoot}
        />
      )
    case 'null':
      return null
  }
}

function FieldDescription({
  description,
  style
}: {
  description?: string
  style?: CSSProperties
}) {
  if (!description) return null
  return (
    <small className="text-xs text-muted" style={style}>
      {description}
    </small>
  )
}

function FieldError({
  error,
  style
}: {
  error?: string
  style?: CSSProperties
}) {
  if (!error) return null
  return (
    <small className="text-xs text-error-500 ml-1" style={style}>
      {error}
    </small>
  )
}

/* -------------------------------------------------------------------------- */
/* Primitive fields                                                           */
/* -------------------------------------------------------------------------- */

interface PrimitiveFieldProps<T extends JSONSchema> {
  schema: T
  value: JSONValue | undefined
  onChange: (value: JSONValue) => void
  label?: string
  description?: string
  error?: string
  disabled?: boolean
  variant?: SlateVariant
  size?: SlateSize
  styles?: Partial<JSONInputStyles>
}

function StringField({
  schema,
  value,
  onChange,
  label,
  description,
  error,
  disabled,
  variant,
  size,
  styles
}: PrimitiveFieldProps<Extract<JSONSchema, { type: 'string' }>>) {
  const stringValue = typeof value === 'string' ? value : ''

  if (schema.enum && schema.enum.length > 0) {
    const items = schema.enum.map((v) => ({
      id: v,
      name: schema.enumLabels?.[v] ?? humanize(v)
    }))
    return (
      <div className="flex flex-col gap-1" style={styles?.field}>
        <Select<string>
          label={label}
          items={items}
          value={stringValue || null}
          onChange={(v) => onChange(v ?? '')}
          variant={variant}
          size={size}
          disabled={disabled}
          placeholder={schema.placeholder ?? 'Select...'}
          error={error}
          clearable
        />
        <FieldDescription
          description={description}
          style={styles?.description}
        />
      </div>
    )
  }

  const common = {
    label,
    value: stringValue,
    onChange: (v: string) => onChange(v),
    variant,
    size,
    disabled,
    error,
    placeholder: schema.placeholder,
    maxLength: schema.maxLength,
    minLength: schema.minLength
  }

  let input: React.ReactNode
  switch (schema.format) {
    case 'textarea':
      input = (
        <TextArea
          label={label}
          value={stringValue}
          onChange={(v) => onChange(v)}
          variant={variant}
          disabled={disabled}
          error={error}
          placeholder={schema.placeholder}
          maxLength={schema.maxLength}
          minLength={schema.minLength}
        />
      )
      break
    case 'date':
      input = (
        <div className="flex flex-col gap-1">
          {label && <Label>{label}</Label>}
          <DatePicker
            value={parseDate(stringValue)}
            onChange={(d) => onChange(d ? toDateString(d) : '')}
            disabled={disabled}
          />
          <FieldError error={error} style={styles?.error} />
        </div>
      )
      break
    case 'date-time':
      input = (
        <div className="flex flex-col gap-1">
          {label && <Label>{label}</Label>}
          <DatePicker
            value={parseDate(stringValue)}
            onChange={(d) => onChange(d ? d.toISOString() : '')}
            disabled={disabled}
          />
          <FieldError error={error} style={styles?.error} />
        </div>
      )
      break
    case 'color':
      input = (
        <ColorPicker
          {...common}
          value={stringValue || '#000000'}
          onChange={(v) => onChange(v)}
        />
      )
      break
    case 'phone':
      input = (
        <PhoneInput
          label={label}
          value={stringValue}
          onChange={(v) => onChange(v)}
          variant={variant}
          size={size}
          disabled={disabled}
          error={error}
          placeholder={schema.placeholder}
        />
      )
      break
    case 'password':
      input = <TextInput {...common} type="password" />
      break
    case 'email':
      input = <TextInput {...common} type="email" />
      break
    case 'url':
    case 'uri':
      input = <TextInput {...common} type="url" />
      break
    default:
      input = <TextInput {...common} />
  }

  return (
    <div className="flex flex-col gap-1" style={styles?.field}>
      {input}
      <FieldDescription description={description} style={styles?.description} />
    </div>
  )
}

function NumberField({
  schema,
  value,
  onChange,
  label,
  description,
  error,
  disabled,
  variant,
  size,
  styles
}: PrimitiveFieldProps<Extract<JSONSchema, { type: 'number' | 'integer' }>>) {
  const numValue = typeof value === 'number' ? value : undefined
  const isInteger = schema.type === 'integer'
  const step = schema.multipleOf ?? (isInteger ? 1 : undefined)

  const min =
    schema.minimum ??
    (typeof schema.exclusiveMinimum === 'number'
      ? schema.exclusiveMinimum + (isInteger ? 1 : Number.EPSILON)
      : undefined)
  const max =
    schema.maximum ??
    (typeof schema.exclusiveMaximum === 'number'
      ? schema.exclusiveMaximum - (isInteger ? 1 : Number.EPSILON)
      : undefined)

  if (
    schema.format === 'slider' &&
    typeof min === 'number' &&
    typeof max === 'number'
  ) {
    const current = numValue ?? min
    return (
      <div className="flex flex-col gap-1" style={styles?.field}>
        <Slider
          label={label}
          value={[current]}
          onValueChange={(vals) => onChange(vals[0] ?? min)}
          min={min}
          max={max}
          step={step ?? 1}
          disabled={disabled}
          tooltip={String(current)}
        />
        <FieldDescription
          description={description}
          style={styles?.description}
        />
        <FieldError error={error} style={styles?.error} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1" style={styles?.field}>
      <NumberInput
        label={label}
        value={numValue}
        onChange={(v) => onChange(isInteger ? Math.trunc(v) : v)}
        variant={variant}
        size={size}
        disabled={disabled}
        error={error}
        placeholder={schema.placeholder}
        min={min}
        max={max}
        step={step}
      />
      <FieldDescription description={description} style={styles?.description} />
    </div>
  )
}

function BooleanField({
  schema,
  value,
  onChange,
  label,
  description,
  error,
  disabled,
  styles
}: PrimitiveFieldProps<Extract<JSONSchema, { type: 'boolean' }>>) {
  const checked = value === true
  const control =
    schema.format === 'checkbox' ? (
      <Checkbox
        checked={checked}
        onCheckedChange={(v) => onChange(Boolean(v))}
        label={label}
        disabled={disabled}
      />
    ) : (
      <Switch
        checked={checked}
        onCheckedChange={(v) => onChange(Boolean(v))}
        label={label}
        disabled={disabled}
      />
    )
  return (
    <div className="flex flex-col gap-1" style={styles?.field}>
      {control}
      <FieldDescription description={description} style={styles?.description} />
      <FieldError error={error} style={styles?.error} />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Composite fields                                                           */
/* -------------------------------------------------------------------------- */

interface ObjectFieldProps {
  schema: Extract<JSONSchema, { type: 'object' }>
  value: JSONValue | undefined
  onChange: (value: JSONValue) => void
  label?: string
  description?: string
  error?: string
  errors?: Record<string, string>
  labels?: Record<string, string>
  disabled?: boolean
  variant?: SlateVariant
  size?: SlateSize
  styles?: Partial<JSONInputStyles>
  path: string
  isRoot?: boolean
}

function ObjectField({
  schema,
  value,
  onChange,
  label,
  description,
  error,
  errors,
  labels,
  disabled,
  variant,
  size,
  styles,
  path,
  isRoot
}: ObjectFieldProps) {
  const objectValue = isObjectValue(value) ? value : {}
  const required = new Set(schema.required ?? [])
  const entries = Object.entries(schema.properties ?? {})

  const handleChange = useCallback(
    (key: string, next: JSONValue) => {
      onChange({ ...objectValue, [key]: next })
    },
    [objectValue, onChange]
  )

  const entriesEl = (
    <div className="flex flex-col gap-3" style={styles?.group}>
      {entries.map(([key, childSchema]) => {
        const childPath = joinPathProperty(path, key)
        return (
          <FieldRenderer
            key={key}
            schema={childSchema}
            value={objectValue[key]}
            onChange={(v) => handleChange(key, v)}
            path={childPath}
            label={humanize(key)}
            required={required.has(key)}
            disabled={disabled}
            variant={variant}
            size={size}
            styles={styles}
            errors={errors}
            labels={labels}
            error={errors?.[childPath]}
          />
        )
      })}
    </div>
  )

  if (isRoot) {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <Label className="text-base font-semibold" styles={styles?.label}>
            {label}
          </Label>
        )}
        <FieldDescription
          description={description}
          style={styles?.description}
        />
        {entriesEl}
        <FieldError error={error} style={styles?.error} />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-lg border border-gray-200 p-3 bg-white'
      )}
      style={styles?.group}
    >
      {label && (
        <Label className="font-semibold" styles={styles?.label}>
          {label}
        </Label>
      )}
      <FieldDescription description={description} style={styles?.description} />
      {entriesEl}
      <FieldError error={error} style={styles?.error} />
    </div>
  )
}

interface ArrayFieldProps {
  schema: Extract<JSONSchema, { type: 'array' }>
  value: JSONValue | undefined
  onChange: (value: JSONValue) => void
  label?: string
  description?: string
  error?: string
  errors?: Record<string, string>
  labels?: Record<string, string>
  disabled?: boolean
  variant?: SlateVariant
  size?: SlateSize
  styles?: Partial<JSONInputStyles>
  path: string
  isRoot?: boolean
}

function ArrayField({
  schema,
  value,
  onChange,
  label,
  description,
  error,
  errors,
  labels,
  disabled,
  variant,
  size,
  styles,
  path,
  isRoot
}: ArrayFieldProps) {
  const arrayValue = isArrayValue(value) ? value : []
  const minItems = schema.minItems ?? 0
  const maxItems = schema.maxItems ?? Infinity
  const canAdd = arrayValue.length < maxItems && !disabled
  const canRemove = (idx: number) =>
    arrayValue.length > minItems && !disabled && idx >= 0

  const handleItemChange = useCallback(
    (index: number, next: JSONValue) => {
      const copy = arrayValue.slice()
      copy[index] = next
      onChange(copy)
    },
    [arrayValue, onChange]
  )

  const handleAdd = useCallback(() => {
    onChange([...arrayValue, getSchemaDefault(schema.items)])
  }, [arrayValue, onChange, schema.items])

  const handleRemove = useCallback(
    (index: number) => {
      onChange(arrayValue.filter((_, i) => i !== index))
    },
    [arrayValue, onChange]
  )

  const inner = (
    <>
      {arrayValue.length === 0 && (
        <div className="text-xs text-muted italic">No items</div>
      )}
      <div className="flex flex-col gap-2">
        {arrayValue.map((item, index) => {
          const itemPath = joinPathIndex(path, index)
          const itemNeedsLabel =
            schema.items.type === 'object' || schema.items.type === 'array'
          return (
            <div
              key={index}
              className="flex items-start gap-2"
              style={styles?.arrayItem}
            >
              <div className="flex-1 min-w-0">
                <FieldRenderer
                  schema={schema.items}
                  value={item}
                  onChange={(v) => handleItemChange(index, v)}
                  path={itemPath}
                  label={itemNeedsLabel ? `Item ${index + 1}` : undefined}
                  disabled={disabled}
                  variant={variant}
                  size={size}
                  styles={styles}
                  errors={errors}
                  labels={labels}
                  error={errors?.[itemPath]}
                />
              </div>
              {canRemove(index) && (
                <ActionIcon
                  icon={Trash2}
                  variant="error"
                  size={size}
                  onClick={() => handleRemove(index)}
                  aria-label={`Remove item ${index + 1}`}
                />
              )}
            </div>
          )
        })}
      </div>
      <div>
        <Button
          type="button"
          variant="subtle"
          size={size}
          iconLeft={Plus}
          onClick={handleAdd}
          disabled={!canAdd}
        >
          {schema.addLabel ?? 'Add'}
        </Button>
      </div>
      <FieldError error={error} style={styles?.error} />
    </>
  )

  if (isRoot) {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <Label className="text-base font-semibold" styles={styles?.label}>
            {label}
          </Label>
        )}
        <FieldDescription
          description={description}
          style={styles?.description}
        />
        {inner}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-lg border border-gray-200 p-3 bg-white'
      )}
      style={styles?.group}
    >
      {label && (
        <Label className="font-semibold" styles={styles?.label}>
          {label}
        </Label>
      )}
      <FieldDescription description={description} style={styles?.description} />
      {inner}
    </div>
  )
}
