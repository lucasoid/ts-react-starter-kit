import React from 'react';
import { MainMenu, MainMenuItem } from '~components/MainMenu';
import mainMenu from '~components/MainMenu/data';
import * as styles from './App.css';

interface AppProps {
    title: string;
}

export const App: React.FC<AppProps> = props => (
    <div className={styles.App}>
        <header className={styles.header}>
            <h1 className={styles.title}>{props.title}</h1>
        </header>

        <MainMenu>
            {mainMenu.map(item => (
                <MainMenuItem {...item} key={item.label} />
            ))}
        </MainMenu>
    </div>
);
