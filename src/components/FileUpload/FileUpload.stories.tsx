import { useState } from 'react'

import { File as FileIcon, Folder as FolderIcon } from 'lucide-react'

import { TooltipProvider } from '@radix-ui/react-tooltip'
import type {
  Meta,
  StoryObj
} from '@storybook/react-vite'

import { ActionIcon } from '../ActionIcon'
import { FileUpload } from './'
import { useUpload } from './useUpload'

const meta: Meta<typeof FileUpload> = {
  title: 'Inputs/FileUpload',
  component: FileUpload,
  argTypes: {
    uploading: {
      control: 'boolean'
    },
    directory: {
      control: 'boolean'
    },
    multiple: {
      control: 'boolean'
    }
  },
  args: {},
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    )
  ]
}

export default meta
type Story = StoryObj<typeof FileUpload>

export const Primary: Story = {
  args: {
    subText: 'Max file size: 10MB'
  }
}

const MultipleWithFileListExample = () => {
  const [files, setFiles] = useState<File[]>([])
  return (
    <FileUpload
      multiple
      files={files}
      onFilesChange={setFiles}
      subText="Drop files or a whole folder here"
    />
  )
}

/**
 * Controlled file list: drops and selections append to the list, and each
 * file can be removed. Dropping a folder recursively adds its files.
 */
export const MultipleWithFileList: Story = {
  render: () => <MultipleWithFileListExample />
}

const DirectoryExample = () => {
  const [files, setFiles] = useState<File[]>([])
  return (
    <FileUpload
      directory
      multiple
      files={files}
      onFilesChange={setFiles}
      title="Upload a folder"
      subText="Browsing opens a folder picker"
    />
  )
}

export const Directory: Story = {
  render: () => <DirectoryExample />
}

export const Uploading: Story = {
  args: {
    uploading: true
  }
}

const UseUploadActionIconsExample = () => {
  const [files, setFiles] = useState<File[]>([])
  const upload = useUpload({ multiple: true, files, onFilesChange: setFiles })

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <ActionIcon
          icon={FileIcon}
          tooltip="Upload files"
          onClick={upload.open}
        />
        <ActionIcon
          icon={FolderIcon}
          tooltip="Upload folder"
          onClick={upload.openDirectory}
        />
        <input {...upload.inputProps} />
        <input {...upload.directoryInputProps} />
      </div>

      {upload.files.length > 0 && (
        <ul className="flex flex-col gap-1 text-sm">
          {upload.files.map((file, index) => (
            <li key={`${file.name}-${index}`}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

/**
 * `useUpload` is a headless hook that can drive any trigger element. Here,
 * two `ActionIcon`s open a file picker and a folder picker respectively,
 * both feeding into the same controlled file list.
 */
export const UseUploadActionIcons: Story = {
  render: () => <UseUploadActionIconsExample />
}
