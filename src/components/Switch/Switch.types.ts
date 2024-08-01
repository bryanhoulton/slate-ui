import { CSSProperties } from 'react';

import * as RSwitch from '@radix-ui/react-switch';

import { Styleable } from '../../utilities/types';

export type SwitchStyles = {
  root: CSSProperties
  switch: CSSProperties
  thumb: CSSProperties
  label: CSSProperties
}

export interface SwitchProps
  extends RSwitch.SwitchProps,
    Styleable<SwitchStyles> {
  withBody?: boolean
  label?: string
  side?: 'right' | 'left'
}
