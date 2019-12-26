import * as React from 'react';
import * as styles from './Error.css';
import { ThemeContext, Themes } from '~theme';

interface IErrorMessage {
    children?: any;
}
export const ErrorMessage: React.FC<IErrorMessage> = props => {
    const { theme } = React.useContext(ThemeContext);

    return (
        <div className={`${styles.errorMessage} ${theme === Themes.DARK ? styles.dark : styles.light}`}>
            {props.children}
        </div>
    );
};
