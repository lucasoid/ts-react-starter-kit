import React from 'react';
import * as styles from './MainMenu.css';

interface MainMenuProps {
    children?: React.Component[];
}

export const MainMenu: React.FC<MainMenuProps> = props => <ul className={styles.mainMenu}>{props.children}</ul>;
