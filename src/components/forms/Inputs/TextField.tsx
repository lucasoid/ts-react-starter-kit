import * as React from 'react';
import * as styles from '~components/forms/Form.css';

interface ITextFieldProps {
    value: string;
    label: string;
    onChange: Function;
    disabled?: boolean;
}

export const TextField: React.FC<ITextFieldProps> = props => {
    return (
        <div className={styles.ctrl}>
            <label>{props.label}</label>
            <input
                disabled={props.disabled}
                type="text"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};
