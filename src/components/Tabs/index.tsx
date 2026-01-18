import { useEffect, useState } from 'react'
import * as RTabs from '@radix-ui/react-tabs'

import { cn } from '../../utilities'
import { Icon } from '../Icon'
import { useSlateConfig } from '../SlateProvider'
import { TabsProps } from './Tabs.types'

export function Tabs({
  tabs,
  defaultTab,
  styles,
  className,
  ...props
}: TabsProps) {
  const config = useSlateConfig()
  const [activeTab, setActiveTab] = useState(defaultTab)

  useEffect(() => {
    if (config.tabsPushBrowserState && typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const tabParam = params.get('tab')
      if (tabParam && tabs.some((tab) => tab.id === tabParam)) {
        setActiveTab(tabParam)
      }
    }
  }, [config.tabsPushBrowserState, tabs])

  const handleTabChange = (value: string) => {
    setActiveTab(value)

    if (config.tabsPushBrowserState && typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      url.searchParams.set('tab', value)
      window.history.pushState({}, '', url.toString())
    }
  }

  return (
    <RTabs.Root
      className={cn('flex flex-col', className)}
      value={activeTab}
      onValueChange={handleTabChange}
      style={styles?.root}
      {...props}
    >
      <RTabs.List
        className="shrink-0 flex border-b gap-2 px-2"
        style={styles?.tabContainer}
      >
        {tabs.map((tab) => (
          <RTabs.Trigger
            key={tab.id}
            className={cn(
              'px-2 py-3 flex items-center justify-center text-sm',
              'leading-none select-none gap-2 cursor-pointer',
              'data-[state=active]:text-primary border-b-2 border-b-transparent data-[state=active]:border-b-primary',
              'hover:text-muted hover:border-b-2 hover:border-muted-light'
            )}
            value={tab.id}
            style={styles?.tab}
          >
            {tab.iconLeft && <Icon icon={tab.iconLeft} variant="default" />}
            <span>{tab.name}</span>
            {tab.iconRight && <Icon icon={tab.iconRight} variant="default" />}
          </RTabs.Trigger>
        ))}
      </RTabs.List>

      {tabs.map(({ padding = true, ...tab }) => (
        <RTabs.Content
          key={tab.id}
          className={cn(padding && 'p-5')}
          value={tab.id}
          style={styles?.contentContainer}
        >
          {tab.content}
        </RTabs.Content>
      ))}
    </RTabs.Root>
  )
}
