import { HTMLProps } from 'react'

import { LucideIcon } from 'lucide-react'

export interface FileUploadProps
  extends Omit<HTMLProps<HTMLInputElement>, 'children'> {
  title?: string
  subText?: string
  uploading?: boolean
  icon?: LucideIcon
  /** Sets webkitdirectory on the hidden input so browsing picks a folder. */
  directory?: boolean
  /**
   * Controlled list of selected files. When provided, the list is rendered
   * under the dropzone. New selections/drops append when `multiple` is set,
   * replace otherwise.
   */
  files?: File[]
  onFilesChange?: (files: File[]) => void
  /** Called with the index of the file to remove. Falls back to onFilesChange. */
  onRemoveFile?: (index: number) => void
}
