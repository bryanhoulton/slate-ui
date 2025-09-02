import type {
  SlateSize,
  SlateVariant
} from './types'

/**
 * Standard variant options used across all component stories
 */
export const STORY_VARIANTS: SlateVariant[] = [
  'primary',
  'secondary',
  'default',
  'subtle',
  'success',
  'warning',
  'error',
  'info'
] as const

/**
 * Standard size options used across all component stories
 */
export const STORY_SIZES: SlateSize[] = ['sm', 'md', 'lg'] as const

/**
 * Special variant arrays for components that use different sets
 */
export const ACCORDION_TYPE_OPTIONS = ['single', 'multiple'] as const

export const RADIO_ORIENTATION_OPTIONS = ['horizontal', 'vertical'] as const
