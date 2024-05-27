import { ButtonHTMLAttributes, CSSProperties } from 'react';
import { Styleable } from '../../utilities/types';
export type ButtonStyles = {
    root: CSSProperties;
};
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, Styleable<ButtonStyles> {
    variant?: SlateVariant;
    size?: SlateSize;
}
