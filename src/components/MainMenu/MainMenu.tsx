import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { MainMenuItem } from './MainMenuItem';
import * as styles from './MainMenu.css';

export const MainMenu: React.FC<{}> = () => (
    <ul className={styles.mainMenu}>
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
