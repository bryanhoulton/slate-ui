import * as react_jsx_runtime from 'react/jsx-runtime';
import { CSSProperties, ButtonHTMLAttributes } from 'react';

type Styleable<T extends string> = {
    styles?: {
        [K in T]: CSSProperties;
    };
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, Styleable<'root'> {
    variant?: SlateVariant;
    size?: SlateSize;
}

declare function Button({ variant, size, className, styles, ...props }: ButtonProps): react_jsx_runtime.JSX.Element;

declare function cn(...classNames: (string | undefined)[]): string;

export { Button, cn };
