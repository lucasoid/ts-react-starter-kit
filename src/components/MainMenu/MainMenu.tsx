import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { MainMenuItem } from './MainMenuItem';
import * as styles from './MainMenu.css';
import { ThemeContext, Themes } from '~theme';

export const MainMenu: React.FC<{}> = () => {
    let { theme } = React.useContext(ThemeContext);

    return (
        <ul className={`${styles.mainMenu} ${theme === Themes.DARK ? styles.dark : styles.light}`}>
            <MainMenuItem>
                <NavLink to="/" exact={true} activeClassName={styles.active}>
                    Home
                </NavLink>
            </MainMenuItem>
            <MainMenuItem>
                <NavLink to="/settings" exact={true} activeClassName={styles.active}>
                    Settings
                </NavLink>
            </MainMenuItem>
            <MainMenuItem>
                <NavLink to="/About" exact={true} activeClassName={styles.active}>
                    About
                </NavLink>
            </MainMenuItem>
        </ul>
    );
};
