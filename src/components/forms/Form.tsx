import * as React from 'react';
import { Button, ButtonTypes } from '~components/ui/Button';
import * as styles from './Form.css';

interface IFormProps {
    onSubmit?: Function;
    onCancel?: Function;
    submitText?: string;
    cancelText?: string;
    children?: any;
}

export const Form: React.FC<IFormProps> = props => {
    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                if (props.onSubmit !== undefined) props.onSubmit();
            }}
        >
            {props.children}
            <div className={styles.btnGroup}>
                {props.onCancel !== undefined && (
                    <Button type={ButtonTypes.SECONDARY} onClick={props.onCancel}>
                        {props.cancelText}
                    </Button>
                )}
                {props.onSubmit !== undefined && (
                    <Button type={ButtonTypes.PRIMARY} onClick={props.onSubmit}>
                        {props.submitText}
                    </Button>
                )}
            </div>
        </form>
    );
};
