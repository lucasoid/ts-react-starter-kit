import * as React from 'react';
import * as styles from './Button.css';

interface IButtonProps {
    plaintext?: boolean;
    styles?: React.CSSProperties;
    onClick?: Function;
    children?: any;
}
export const Button: React.FC<IButtonProps> = props => (
    <button
        className={props.plaintext ? styles.btnPlaintext : styles.btn}
        style={{ ...props.styles }}
        onClick={evt => {
            evt.preventDefault();
            typeof props.onClick === 'function' && props.onClick();
        }}
    >
        {props.children}
    </button>
);
