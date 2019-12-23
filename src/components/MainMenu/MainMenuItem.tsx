import * as React from 'react';
import * as styles from './MainMenu.css';

interface MainMenuItemProps {
    children?: any;
}

export const MainMenuItem: React.FC<MainMenuItemProps> = props => (
    <li className={styles.mainMenuItem}>{props.children}</li>
);
