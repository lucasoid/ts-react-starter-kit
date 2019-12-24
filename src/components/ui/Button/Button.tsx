import * as React from 'react';
import * as styles from './Button.css';

interface IButtonProps {
    styles?: React.CSSProperties;
    onClick?: Function;
    children?: any;
}
export const Button: React.FC<IButtonProps> = props => (
    <button
        className={styles.btn}
        style={{ ...props.styles }}
        onClick={evt => {
            evt.preventDefault();
            typeof props.onClick === 'function' && props.onClick();
        }}
    >
        {props.children}
    </button>
);
