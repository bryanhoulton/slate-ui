import {
  DragEvent,
  forwardRef,
  useRef,
  useState
} from 'react'

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

function readEntries(
  reader: FileSystemDirectoryReader
): Promise<FileSystemEntry[]> {
  return new Promise((resolve, reject) => reader.readEntries(resolve, reject))
}

async function walkEntry(entry: FileSystemEntry): Promise<File[]> {
  if (entry.isFile) {
    return new Promise((resolve) =>
      (entry as FileSystemFileEntry).file(
        (file) => resolve([file]),
        () => resolve([])
      )
    )
  }
  if (entry.isDirectory) {
    const reader = (entry as FileSystemDirectoryEntry).createReader()
    const files: File[] = []
    // readEntries only returns up to 100 entries per call; drain it.
    let batch: FileSystemEntry[]
    do {
      batch = await readEntries(reader)
      for (const child of batch) {
        files.push(...(await walkEntry(child)))
      }
    } while (batch.length > 0)
    return files
  }
  return []
}

async function extractDroppedFiles(
  dataTransfer: DataTransfer
): Promise<File[]> {
  const items = Array.from(dataTransfer.items ?? [])
  if (items.length > 0) {
    // Capture entries/files synchronously; the DataTransfer is cleared once
    // we await anything.
    const captured = items
      .filter((item) => item.kind === 'file')
      .map((item) => ({
        entry:
          typeof item.webkitGetAsEntry === 'function'
            ? item.webkitGetAsEntry()
            : null,
        file: item.getAsFile()
      }))
    const files: File[] = []
    for (const { entry, file } of captured) {
      if (entry) {
        files.push(...(await walkEntry(entry)))
      } else if (file) {
        files.push(file)
      }
    }
    return files
  }
  return Array.from(dataTransfer.files)
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
    const internalRef = useRef<HTMLInputElement | null>(null)
    const [dragActive, setDragActive] = useState(false)

    const addFiles = (newFiles: File[]) => {
      if (newFiles.length === 0 || !onFilesChange) return
      if (multiple) {
        onFilesChange([...(files ?? []), ...newFiles])
      } else {
        onFilesChange(newFiles.slice(0, 1))
      }
    }

    const removeFile = (index: number) => {
      if (onRemoveFile) {
        onRemoveFile(index)
        return
      }
      onFilesChange?.((files ?? []).filter((_, i) => i !== index))
    }

    const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
      e.preventDefault()
      setDragActive(false)
      if (uploading) return
      void extractDroppedFiles(e.dataTransfer).then(addFiles)
    }

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
          onDrop={handleDrop}
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
                {!files && internalRef?.current?.files?.[0] ? (
                  <div>{internalRef.current.files[0].name}</div>
                ) : (
                  <p className="mb-2 text-sm">
                    {title || (
                      <>
                        <span className="font-semibold">Click to upload</span>{' '}
                        or drag and drop
                      </>
                    )}
                  </p>
                )}
                {subText && <p>{subText}</p>}
              </div>
              <Button
                className="w-fit"
                iconLeft={FileIcon}
                type="button"
                onClick={() => internalRef.current?.click()}
              >
                Browse
              </Button>
              {/* https://stackoverflow.com/a/65877297 */}
              <input
                ref={(element) => {
                  internalRef.current = element
                  if (ref === null) return
                  if (typeof ref === 'function') {
                    ref(element)
                  } else {
                    ref.current = element
                  }
                }}
                id="dropzone-file"
                type="file"
                className="hidden"
                multiple={multiple}
                onChange={(e) => {
                  onChange?.(e)
                  addFiles(Array.from(e.target.files ?? []))
                }}
                {...(directory ? { webkitdirectory: '' } : {})}
                {...props}
              />
            </>
          )}
        </label>

        {files && files.length > 0 && (
          <ul className="flex flex-col gap-1">
            {files.map((file, index) => (
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
                  onClick={() => removeFile(index)}
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
