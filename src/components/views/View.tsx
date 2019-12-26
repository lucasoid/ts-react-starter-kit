import * as React from 'react';
import { ErrorBoundary } from '~components/errors/ErrorBoundary';
import { ThemeContext, Themes } from '~theme';
import * as styles from './View.css';

export const View: React.FC<{ children?: any }> = props => {
    const { theme } = React.useContext(ThemeContext);

    return (
        <div className={`${styles.view} ${theme === Themes.DARK ? styles.dark : styles.light}`}>
            <ErrorBoundary>{props.children}</ErrorBoundary>
        </div>
    );
};
