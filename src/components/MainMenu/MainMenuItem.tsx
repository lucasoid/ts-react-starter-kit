import React from 'react';
import * as styles from './MainMenu.css';

interface MainMenuItemProps {
    label: string;
    href?: string;
    children?: React.Component[];
}

export const MainMenuItem: React.FC<MainMenuItemProps> = props => (
    <li className={styles.mainMenuItem}>
        <a href={props.href}>{props.label}</a>
    </li>
);
