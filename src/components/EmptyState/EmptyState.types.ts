import { HTMLProps } from 'react';

import { LucideIcon } from 'lucide-react';

import { ButtonProps } from '../Button/Button.types';

export interface EmptyStateProps
  extends Omit<HTMLProps<HTMLDivElement>, 'children'> {
  icon: LucideIcon
  title?: string
  button?: ButtonProps
}
