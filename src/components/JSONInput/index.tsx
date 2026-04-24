import { forwardRef, useMemo } from 'react'

import { cn, useSometimesControlled } from '../../utilities'
import { FieldRenderer } from './FieldRenderer'
import { JSONInputProps, JSONValue } from './JSONInput.types'
import { getSchemaDefault } from './schema'

export const JSONInput = forwardRef<HTMLDivElement, JSONInputProps>(
  (
    {
      schema,
      value: valueProp,
      defaultValue,
      onChange,
      errors,
      label,
      description,
      className,
      styles,
      variant = 'default',
      size = 'md',
      disabled,
      labels,
      ...rest
    },
    ref
  ) => {
    const initialDefault = useMemo<JSONValue>(
      () => defaultValue ?? getSchemaDefault(schema),
      // Only compute once on mount; schema/defaultValue changes should not
      // clobber user input in place.
      []
    )
    const [value, setValue] = useSometimesControlled<JSONValue>({
      valueProp,
      onChangeProp: onChange,
      defaultValue: initialDefault
    })

    const rootError = errors?.['']

    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-2 w-full', className)}
        style={styles?.root}
        {...rest}
      >
        <FieldRenderer
          schema={schema}
          value={value}
          onChange={setValue}
          path=""
          label={label}
          descriptionOverride={description}
          error={rootError}
          errors={errors}
          labels={labels}
          disabled={disabled}
          variant={variant}
          size={size}
          styles={styles}
          isRoot
        />
      </div>
    )
  }
)

JSONInput.displayName = 'JSONInput'

export * from './JSONInput.types'
export { getSchemaDefault, humanize } from './schema'
