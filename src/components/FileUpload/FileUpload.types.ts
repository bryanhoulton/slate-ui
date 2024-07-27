import { HTMLProps } from 'react'

import { LucideIcon } from 'lucide-react'

export interface FileUploadProps
  extends Omit<HTMLProps<HTMLInputElement>, 'children'> {
  title?: string
  subText?: string
  uploading?: boolean
  icon?: LucideIcon
}
