/// <reference types="react" />
import * as react from 'react';
import react__default, { ButtonHTMLAttributes, CSSProperties, HTMLProps, HTMLAttributes } from 'react';
import * as RSwitch from '@radix-ui/react-switch';
import { LucideIcon } from 'lucide-react';
import * as RTooltip from '@radix-ui/react-tooltip';
import { TooltipContentProps } from '@radix-ui/react-tooltip';

type Styleable<T> = {
    styles?: T;
};
type SlateVariant = 'primary' | 'secondary' | 'subtle';
type SlateSize = 'sm' | 'md' | 'lg';

type ButtonStyles = {
    root: CSSProperties;
};
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, Styleable<ButtonStyles> {
    variant?: SlateVariant;
    size?: SlateSize;
}

declare const Button: react.ForwardRefExoticComponent<ButtonProps & react.RefAttributes<HTMLButtonElement>>;

type SwitchStyles = {
    root: CSSProperties;
    switch: CSSProperties;
    thumb: CSSProperties;
    label: CSSProperties;
};
interface SwitchProps extends RSwitch.SwitchProps, Styleable<SwitchStyles> {
    withBody?: boolean;
    label?: string;
}

declare const Switch: react.ForwardRefExoticComponent<SwitchProps & react.RefAttributes<HTMLButtonElement>>;

type LabelStyles = {
    root: CSSProperties;
};
interface LabelProps extends HTMLProps<HTMLLabelElement>, Styleable<LabelStyles> {
}

type TextInputStyles = {
    label: LabelStyles;
    input: CSSProperties;
    error: CSSProperties;
    root: CSSProperties;
};
interface TextInputProps extends Omit<HTMLProps<HTMLInputElement>, 'onChange' | 'size'>, Styleable<TextInputStyles> {
    label: string;
    variant?: SlateVariant;
    size?: SlateSize;
    error?: string;
    value: string;
    iconLeft?: LucideIcon;
    iconRight?: LucideIcon;
    onChange: (value: string) => void;
}

declare const TextInput: react.ForwardRefExoticComponent<Omit<TextInputProps, "ref"> & react.RefAttributes<HTMLInputElement>>;

type IconStyles = {
    root: CSSProperties;
};
interface IconProps extends React.SVGProps<SVGSVGElement>, Styleable<IconStyles> {
    icon: LucideIcon;
    size?: SlateSize;
    variant?: SlateVariant;
}

type ActionIconStyles = {
    button?: ButtonStyles;
    icon?: IconStyles;
};
interface ActionIconProps extends HTMLAttributes<HTMLButtonElement>, Styleable<ActionIconStyles> {
    icon: LucideIcon;
    variant?: SlateVariant;
    size?: SlateSize;
    tooltip?: string;
}

declare const ActionIcon: react.ForwardRefExoticComponent<ActionIconProps & react.RefAttributes<HTMLButtonElement>>;

declare const Icon: react.ForwardRefExoticComponent<Omit<IconProps, "ref"> & react.RefAttributes<SVGSVGElement>>;

declare const Label: react.ForwardRefExoticComponent<Omit<LabelProps, "ref"> & react.RefAttributes<HTMLLabelElement>>;

type TooltipStyles = {
    content: CSSProperties;
};
interface TooltipProps extends Styleable<TooltipStyles>, TooltipContentProps {
    content?: string;
    children: React.ReactNode;
    delayDuration?: number;
    withArrow?: boolean;
}

declare const Tooltip: react__default.ForwardRefExoticComponent<TooltipProps & react__default.RefAttributes<HTMLDivElement>>;
declare const TooltipProvider: react__default.FC<RTooltip.TooltipProviderProps>;

declare function cn(...classNames: (string | undefined)[]): string;
declare function gid(): string;

export { ActionIcon, Button, Icon, Label, Switch, TextInput, Tooltip, TooltipProvider, cn, gid };
