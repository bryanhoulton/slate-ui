import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import { FileUpload } from './';

const meta: Meta<typeof FileUpload> = {
  title: 'Inputs/FileUpload',
  component: FileUpload,
  argTypes: {
    uploading: {
      control: 'boolean'
    }
  },
  args: {}
}

export default meta
type Story = StoryObj<typeof FileUpload>

export const Primary: Story = {
  args: {
    subText: 'Max file size: 10MB'
  }
}
