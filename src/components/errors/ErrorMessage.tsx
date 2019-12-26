import * as React from 'react';
import * as styles from './Error.css';

interface IErrorMessage {
    children?: any;
}
export const ErrorMessage: React.FC<IErrorMessage> = props => (
    <div className={styles.errorMessage}>{props.children}</div>
);
