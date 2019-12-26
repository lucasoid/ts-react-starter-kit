import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MainMenu } from '~components/MainMenu';
import { Home } from '~components/views/Home';
import { Settings } from '~components/views/Settings';
import { About } from '~components/views/About';
import { List } from '~components/views/List';
import { ErrorBoundary } from '~components/errors/ErrorBoundary';
import * as styles from './App.css';
import { Theme } from '~theme';

interface AppProps {
    title: string;
}

export const App: React.FC<AppProps> = props => (
    <Router>
        <Theme>
            <div className={styles.App}>
                <header className={styles.header}>
                    <h1 className={styles.title}>{props.title}</h1>
                </header>
                <ErrorBoundary>
                    <MainMenu />
                </ErrorBoundary>
                <ErrorBoundary>
                    <Switch>
                        <Route path="/settings" component={Settings} />
                        <Route path="/about" component={About} />
                        <Route path="/lists/:listId" component={List} />
                        <Route path="/" exact={true} component={Home} />
                    </Switch>
                </ErrorBoundary>
            </div>
        </Theme>
    </Router>
);
