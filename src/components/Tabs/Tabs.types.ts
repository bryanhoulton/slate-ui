import {
  CSSProperties,
  ReactNode,
} from 'react';

import { LucideIcon } from 'lucide-react';

import { TabsProps as RTabsProps } from '@radix-ui/react-tabs';

import { Styleable } from '../../utilities/types';
import { BadgeProps } from '../Badge/Badge.types';

export type TabsStyles = {
  tab: CSSProperties
  tabContainer: CSSProperties
  contentContainer: CSSProperties
  root: CSSProperties
}

export type Tab = {
  id: string
  name: string
  content: ReactNode
  iconLeft?: LucideIcon
  iconRight?: LucideIcon
  badge?: BadgeProps
  padding?: boolean
}
export interface TabsProps
  extends Omit<RTabsProps, 'defaultValue' | 'orientation'>,
    Styleable<TabsStyles> {
  tabs: Tab[]
  defaultTab: string
}
