import { CSSProperties, HTMLProps } from 'react'

import { SlateSize, SlateVariant, Styleable } from '../../utilities/types'
import { LabelStyles } from '../Label/Label.types'

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue }

/**
 * A subset of the JSON Schema specification that covers the common cases
 * for building forms. See https://json-schema.org for the full spec.
 */
export interface JSONSchemaBase {
  title?: string
  description?: string
  nullable?: boolean
  readOnly?: boolean
}

export type JSONStringFormat =
  | 'email'
  | 'uri'
  | 'url'
  | 'password'
  | 'date'
  | 'date-time'
  | 'time'
  | 'color'
  | 'phone'
  | 'textarea'

export interface JSONStringSchema extends JSONSchemaBase {
  type: 'string'
  /** Restrict the value to one of these options. Rendered as a Select. */
  enum?: string[]
  /** Optional pretty labels to show for enum values. Keyed by the enum value. */
  enumLabels?: Record<string, string>
  format?: JSONStringFormat
  minLength?: number
  maxLength?: number
  pattern?: string
  default?: string
  placeholder?: string
}

export interface JSONNumberSchema extends JSONSchemaBase {
  type: 'number' | 'integer'
  minimum?: number
  maximum?: number
  exclusiveMinimum?: number
  exclusiveMaximum?: number
  multipleOf?: number
  /** When set, renders a slider instead of a number input. Requires min+max. */
  format?: 'slider'
  default?: number
  placeholder?: string
}

export interface JSONBooleanSchema extends JSONSchemaBase {
  type: 'boolean'
  /** Choose between a switch (default) and a checkbox. */
  format?: 'switch' | 'checkbox'
  default?: boolean
}

export interface JSONObjectSchema extends JSONSchemaBase {
  type: 'object'
  properties: Record<string, JSONSchema>
  required?: string[]
  /** Render nested object inside a collapsible accordion. */
  collapsible?: boolean
  default?: { [key: string]: JSONValue }
}

export interface JSONArraySchema extends JSONSchemaBase {
  type: 'array'
  items: JSONSchema
  minItems?: number
  maxItems?: number
  /** Label for the add item button. Defaults to "Add". */
  addLabel?: string
  default?: JSONValue[]
}

export interface JSONNullSchema extends JSONSchemaBase {
  type: 'null'
}

export type JSONSchema =
  | JSONStringSchema
  | JSONNumberSchema
  | JSONBooleanSchema
  | JSONObjectSchema
  | JSONArraySchema
  | JSONNullSchema

export type JSONInputStyles = {
  root: CSSProperties
  label: Partial<LabelStyles>
  description: CSSProperties
  error: CSSProperties
  field: CSSProperties
  group: CSSProperties
  arrayItem: CSSProperties
}

export interface JSONInputProps
  extends Omit<
      HTMLProps<HTMLDivElement>,
      'onChange' | 'value' | 'defaultValue' | 'size'
    >,
    Styleable<JSONInputStyles> {
  schema: JSONSchema
  value?: JSONValue
  defaultValue?: JSONValue
  onChange?: (value: JSONValue) => void
  /**
   * Map from field path to error message. Paths use dot/bracket notation,
   * e.g. `address.city`, `tags[0]`, or `users[2].email`. Use the empty string
   * `''` to set an error on the root value.
   */
  errors?: Record<string, string>
  label?: string
  description?: string
  variant?: SlateVariant
  size?: SlateSize
  disabled?: boolean
  /**
   * Override the label for a field. The key is the field path, the value
   * is the label to display. Useful for localization.
   */
  labels?: Record<string, string>
}
