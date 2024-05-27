import { CSSProperties } from 'react';
import * as RSwitch from '@radix-ui/react-switch';
export type SwitchStyles = {
    root: CSSProperties;
};
export interface SwitchProps extends RSwitch.SwitchProps {
    withBody?: boolean;
    label?: string;
}
