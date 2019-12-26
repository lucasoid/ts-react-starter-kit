import * as React from 'react';
import { ErrorBoundary } from '~components/errors/ErrorBoundary';
import * as styles from './View.css';

export const View: React.FC<{ children?: any }> = props => (
    <div className={styles.view}>
        <ErrorBoundary>{props.children}</ErrorBoundary>
    </div>
);
