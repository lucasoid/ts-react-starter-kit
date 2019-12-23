import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MainMenu } from '~components/MainMenu';
import { ShoppingListMenu } from '~components/views/ShoppingListMenu';
import * as styles from './App.css';

interface AppProps {
    title: string;
}

export const App: React.FC<AppProps> = props => (
    <Router>
        <div className={styles.App}>
            <header className={styles.header}>
                <h1 className={styles.title}>{props.title}</h1>
            </header>
            <MainMenu />
            <Switch>
                <Route path="/settings">Settings controlled here.</Route>
                <Route path="/help">Help provided here.</Route>
                <Route path="/">
                    <ShoppingListMenu />
                </Route>
            </Switch>
        </div>
    </Router>
);
