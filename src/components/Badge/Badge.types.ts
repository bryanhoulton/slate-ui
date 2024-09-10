import {
  CSSProperties,
  HTMLProps,
} from 'react';

import { LucideIcon } from 'lucide-react';

import {
  SlateSize,
  SlateVariant,
  Styleable,
} from '../../utilities';

export type BadgeStyles = {
  root: CSSProperties
}

export interface BadgeProps
  extends Omit<HTMLProps<HTMLSpanElement>, 'size'>,
    Styleable<BadgeStyles> {
  variant?: SlateVariant
  size?: SlateSize
  iconLeft?: LucideIcon
  iconRight?: LucideIcon
}
