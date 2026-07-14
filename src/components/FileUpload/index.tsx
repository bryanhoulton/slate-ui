import { forwardRef, useState } from 'react'

import {
  File as FileIcon,
  Loader,
  Upload,
  X
} from 'lucide-react'

import { cn } from '../../utilities'
import { ActionIcon } from '../ActionIcon'
import { Button } from '../Button'
import { Icon } from '../Icon'
import { FileUploadProps } from './FileUpload.types'
import { useUpload } from './useUpload'

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  const units = ['KB', 'MB', 'GB', 'TB']
  let size = bytes / 1024
  let unit = 0
  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024
    unit++
  }
  return `${size.toFixed(1)} ${units[unit]}`
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      className,
      uploading,
      subText,
      icon = Upload,
      title,
      directory,
      files,
      onFilesChange,
      onRemoveFile,
      onChange,
      multiple,
      ...props
    },
    ref
  ) => {
    const [dragActive, setDragActive] = useState(false)

    const upload = useUpload({
      multiple,
      files,
      onFilesChange,
      onRemoveFile,
      disabled: uploading
    })

    const hiddenInputProps = directory
      ? upload.directoryInputProps
      : upload.inputProps

    return (
      <div
        className={cn(
          'flex w-full flex-col gap-2 text-sm text-black',
          className
        )}
      >
        <label
          className={cn(
            'border-gray-200 bg-gray-50 flex h-64 w-full cursor-pointer flex-col',
            'items-center justify-center rounded-lg border-2 border-dashed',
            'transition-colors',
            dragActive && 'border-primary-500 bg-primary-50'
          )}
          onDragOver={(e) => {
            e.preventDefault()
            if (!uploading) setDragActive(true)
          }}
          onDragLeave={(e) => {
            if (
              e.relatedTarget &&
              e.currentTarget.contains(e.relatedTarget as Node)
            ) {
              return
            }
            setDragActive(false)
          }}
          onDrop={(e) => {
            setDragActive(false)
            upload.onDrop(e)
          }}
        >
          {uploading ? (
            <>
              <Icon icon={Loader} spin />
              <p className="text-md mt-2">Uploading...</p>
            </>
          ) : (
            <>
              <div className="pointer-events-none flex flex-col items-center justify-center pb-3 pt-5">
                <Icon icon={icon} size="lg" className="mb-2 h-10 w-10" />
                <p className="mb-2 text-sm">
                  {title || (
                    <>
                      <span className="font-semibold">Click to upload</span>{' '}
                      or drag and drop
                    </>
                  )}
                </p>
                {subText && <p>{subText}</p>}
              </div>
              <Button
                className="w-fit"
                variant="primary"
                iconLeft={FileIcon}
                type="button"
                onClick={directory ? upload.openDirectory : upload.open}
              >
                Browse
              </Button>
              {/* https://stackoverflow.com/a/65877297 */}
              <input
                {...hiddenInputProps}
                id="dropzone-file"
                ref={(element) => {
                  hiddenInputProps.ref.current = element
                  if (ref === null) return
                  if (typeof ref === 'function') {
                    ref(element)
                  } else {
                    ref.current = element
                  }
                }}
                onChange={(e) => {
                  onChange?.(e)
                  hiddenInputProps.onChange(e)
                }}
                {...props}
              />
            </>
          )}
        </label>

        {upload.files.length > 0 && (
          <ul className="flex flex-col gap-1">
            {upload.files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center gap-2 rounded-lg border px-3 py-2"
              >
                <Icon icon={FileIcon} className="shrink-0 text-muted" />
                <span className="min-w-0 flex-1 truncate">{file.name}</span>
                <span className="shrink-0 text-xs text-muted">
                  {formatFileSize(file.size)}
                </span>
                <ActionIcon
                  icon={X}
                  variant="subtle"
                  aria-label={`Remove ${file.name}`}
                  onClick={() => upload.removeFile(index)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
)

FileUpload.displayName = 'FileUpload'

export { useUpload } from './useUpload'
export type {
  UseUploadHiddenInputProps,
  UseUploadOptions,
  UseUploadResult
} from './useUpload'
