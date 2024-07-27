import { HTMLProps } from 'react';

export interface FileUploadProps
  extends Omit<HTMLProps<HTMLInputElement>, 'children'> {
  subText?: string
  uploading?: boolean
}
