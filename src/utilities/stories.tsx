import { type ArgTypes } from '@storybook/react/*'

export function args<T>(obj: Partial<ArgTypes<T>>): Partial<ArgTypes<T>> {
  return {
    ...obj,
    styles: {
      table: {
        disable: true
      }
    },
    children: {
      table: {
        disable: true
      }
    }
  }
}
