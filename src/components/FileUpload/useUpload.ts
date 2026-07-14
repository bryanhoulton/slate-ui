import {
  ChangeEvent,
  DragEvent,
  useRef
} from 'react'

import { useSometimesControlled } from '../../utilities'

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

export async function extractDroppedFiles(
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

export interface UseUploadOptions {
  multiple?: boolean
  disabled?: boolean
  /**
   * Controlled list of selected files. New selections/drops append when
   * `multiple` is set, replace otherwise.
   */
  files?: File[]
  defaultFiles?: File[]
  onFilesChange?: (files: File[]) => void
  /** Called with the index of the file to remove. Falls back to onFilesChange. */
  onRemoveFile?: (index: number) => void
}

export interface UseUploadHiddenInputProps {
  ref: React.RefObject<HTMLInputElement | null>
  type: 'file'
  multiple?: boolean
  disabled?: boolean
  className: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  webkitdirectory?: string
}

export interface UseUploadResult {
  files: File[]
  addFiles: (files: File[]) => void
  removeFile: (index: number) => void
  /** Opens the native file picker in file-selection mode. */
  open: () => void
  /** Opens the native file picker in folder-selection mode. */
  openDirectory: () => void
  /** Spread onto a drop target's `onDrop`/`onDragOver` handlers. */
  onDrop: (e: DragEvent<HTMLElement>) => void
  /** Spread onto a hidden `<input type="file" />` for file selection. */
  inputProps: UseUploadHiddenInputProps
  /** Spread onto a hidden `<input type="file" />` for folder selection. */
  directoryInputProps: UseUploadHiddenInputProps
}

/**
 * Headless hook for wiring up file/folder uploads to any trigger element
 * (a `Button`, `ActionIcon`, custom drop area, etc). Renders no UI itself:
 * spread `inputProps`/`directoryInputProps` onto hidden `<input>` elements
 * and call `open`/`openDirectory` from whatever trigger you like.
 *
 * @example
 * const upload = useUpload({ multiple: true, onFilesChange: setFiles })
 * return (
 *   <>
 *     <ActionIcon icon={FileIcon} onClick={upload.open} />
 *     <ActionIcon icon={FolderIcon} onClick={upload.openDirectory} />
 *     <input {...upload.inputProps} />
 *     <input {...upload.directoryInputProps} />
 *   </>
 * )
 */
export function useUpload({
  multiple,
  disabled,
  files: filesProp,
  defaultFiles = [],
  onFilesChange,
  onRemoveFile
}: UseUploadOptions = {}): UseUploadResult {
  const [files, setFiles] = useSometimesControlled<File[]>({
    valueProp: filesProp,
    onChangeProp: onFilesChange,
    defaultValue: defaultFiles
  })

  const inputRef = useRef<HTMLInputElement | null>(null)
  const directoryInputRef = useRef<HTMLInputElement | null>(null)

  const addFiles = (newFiles: File[]) => {
    if (newFiles.length === 0) return
    if (multiple) {
      setFiles([...files, ...newFiles])
    } else {
      setFiles(newFiles.slice(0, 1))
    }
  }

  const removeFile = (index: number) => {
    if (onRemoveFile) {
      onRemoveFile(index)
      return
    }
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    addFiles(Array.from(e.target.files ?? []))
    // Reset so re-selecting the same file(s)/folder fires onChange again.
    e.target.value = ''
  }

  const onDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    if (disabled) return
    void extractDroppedFiles(e.dataTransfer).then(addFiles)
  }

  return {
    files,
    addFiles,
    removeFile,
    open: () => inputRef.current?.click(),
    openDirectory: () => directoryInputRef.current?.click(),
    onDrop,
    inputProps: {
      ref: inputRef,
      type: 'file',
      multiple,
      disabled,
      className: 'hidden',
      onChange: handleChange
    },
    directoryInputProps: {
      ref: directoryInputRef,
      type: 'file',
      multiple: multiple ?? true,
      disabled,
      className: 'hidden',
      onChange: handleChange,
      webkitdirectory: ''
    }
  }
}
