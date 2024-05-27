import { CSSProperties } from 'react';
import { LucideIcon } from 'lucide-react';
import { SlateSize, SlateVariant, Styleable } from '../../utilities/types';
export type IconStyles = {
    root: CSSProperties;
};
export interface IconProps extends React.SVGProps<SVGSVGElement>, Styleable<IconStyles> {
    icon: LucideIcon;
    size?: SlateSize;
    variant?: SlateVariant;
}
