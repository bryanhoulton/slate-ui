import React, { useState } from 'react'

import { ArrowRight, Plus } from 'lucide-react'

import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../Button'
import { Icon } from '../Icon'
import { Select } from '../Select'
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

export const WithSelect: Story = {
  args: {
    children: (
      <>
        <div className="flex flex-col p-4 gap-2">
          <h3 className="text-lg">Add Field Mapping</h3>
          <span className="text-muted">
            Map a Voyage property to a HubSpot property.
          </span>
          <div className="flex gap-2 mt-4 items-center">
            <Select
              items={[
                {
                  id: '1',
                  name: 'First Name'
                },
                {
                  id: '2',
                  name: 'Last Name'
                },
                {
                  id: '3',
                  name: 'Email'
                }
              ]}
              value={null}
              onChange={() => {}}
              className="flex-1"
              placeholder="Select a Voyage property..."
            />
            <Icon icon={ArrowRight} />
            <Select
              items={[
                {
                  id: '1',
                  name: 'First Name'
                },
                {
                  id: '2',
                  name: 'Last Name'
                },
                {
                  id: '3',
                  name: 'Email'
                }
              ]}
              value={null}
              onChange={() => {}}
              className="flex-1"
              placeholder="Select a HubSpot property..."
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4 border-t p-4">
          <Button variant="secondary">Cancel</Button>
          <Button iconLeft={Plus} onClick={async () => {}}>
            Add Field Mapping
          </Button>
        </div>
      </>
    )
  }
}
