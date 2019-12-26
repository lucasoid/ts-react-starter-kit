import * as React from 'react';
import { ErrorBoundary } from '~components/errors/ErrorBoundary';
import { MainMenu } from '~components/MainMenu';
import { Themes, ThemeContext } from '~theme';
import * as styles from './App.css';

interface IHeaderProps {
    title: string;
}

export const Header: React.FC<IHeaderProps> = props => {
    let { theme } = React.useContext(ThemeContext);

    return (
        <>
            <header className={`${styles.header} ${theme === Themes.DARK ? styles.dark : styles.light}`}>
                <h1 className={styles.title}>{props.title}</h1>
            </header>
            <ErrorBoundary>
                <MainMenu />
            </ErrorBoundary>
        </>
    );
};
