import * as React from 'react';
import * as styles from './Button.css';

export enum ButtonTypes {
    PRIMARY,
    SECONDARY,
}

interface IButtonProps {
    plaintext?: boolean;
    styles?: React.CSSProperties;
    type?: ButtonTypes;
    title?: string;
    onClick?: Function;
    children?: any;
}
export const Button: React.FC<IButtonProps> = props => (
    <button
        className={`${props.plaintext ? styles.btnPlaintext : styles.btn} ${
            props.type === ButtonTypes.PRIMARY ? styles.primary : styles.secondary
        }`}
        style={{ ...props.styles }}
        onClick={evt => {
            evt.preventDefault();
            typeof props.onClick === 'function' && props.onClick();
        }}
        title={props.title}
    >
        {props.children}
    </button>
);
