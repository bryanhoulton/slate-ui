import React, { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../Button'
import { Modal } from './'
import { ModalProps } from './Modal.types'

function ModalStory(props: ModalProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Modal {...props} open={open} onClose={() => setOpen(false)} />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </>
  )
}

const meta: Meta<typeof ModalStory> = {
  title: 'Display/Modal',
  component: ModalStory,
  argTypes: {},
  args: {
    closeOnClickOutside: true,
    closeOnEscape: true
  }
}

export default meta
type Story = StoryObj<typeof ModalStory>

export const Primary: Story = {
  args: {
    children: 'Hello!',
    className: 'p-5'
  }
}
