import * as React from 'react';
import { ThemeContext, Themes } from '~theme';
import * as styles from './Loading.css';

interface ILoadingProps {
    el: string;
    lines: number;
    width: string;
    children?: any;
}

export const Loading: React.FC<ILoadingProps> = props => {
    let { el, lines, width } = props;
    let display = [];
    const { theme } = React.useContext(ThemeContext);

    for (let i = 0; i < lines; i++) {
        display.push(
            React.createElement(
                el,
                { key: i, style: { width: width } },
                <span className={`${styles.loadingText} ${theme === Themes.DARK ? styles.dark : styles.light}`} />,
            ),
        );
    }
    return <>{display}</>;
};
