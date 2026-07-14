import { useState } from 'react'

import { TooltipProvider } from '@radix-ui/react-tooltip'
import type {
  Meta,
  StoryObj
} from '@storybook/react-vite'

import { FileUpload } from './'

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
