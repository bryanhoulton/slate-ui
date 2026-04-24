import { JSONSchema, JSONValue } from './JSONInput.types'

/**
 * Build a reasonable default value for the given schema. For objects and
 * arrays, recursively fills required properties with their defaults.
 */
export function getSchemaDefault(schema: JSONSchema): JSONValue {
  if ('default' in schema && schema.default !== undefined) {
    return schema.default as JSONValue
  }

  switch (schema.type) {
    case 'string':
      return schema.enum && schema.enum.length > 0 ? schema.enum[0] : ''
    case 'number':
    case 'integer':
      if (typeof schema.minimum === 'number') return schema.minimum
      if (typeof schema.exclusiveMinimum === 'number') {
        return schema.exclusiveMinimum + (schema.type === 'integer' ? 1 : 0)
      }
      return 0
    case 'boolean':
      return false
    case 'array':
      return []
    case 'object': {
      const result: Record<string, JSONValue> = {}
      const required = schema.required ?? []
      for (const key of required) {
        const child = schema.properties?.[key]
        if (child) {
          result[key] = getSchemaDefault(child)
        }
      }
      return result
    }
    case 'null':
      return null
  }
}

/** Humanize a camelCase or snake_case key into a Title Case label. */
export function humanize(key: string): string {
  if (!key) return ''
  const withSpaces = key
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim()
  return withSpaces
    .split(' ')
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(' ')
}

/** Join a parent path with a property key using dot notation. */
export function joinPathProperty(parent: string, key: string): string {
  if (!parent) return key
  return `${parent}.${key}`
}

/** Join a parent path with an array index using bracket notation. */
export function joinPathIndex(parent: string, index: number): string {
  return `${parent}[${index}]`
}

export function isObjectValue(
  value: JSONValue | undefined
): value is { [key: string]: JSONValue } {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value)
  )
}

export function isArrayValue(value: JSONValue | undefined): value is JSONValue[] {
  return Array.isArray(value)
}
