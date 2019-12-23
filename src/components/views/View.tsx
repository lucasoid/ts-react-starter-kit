import * as React from 'react';
import * as styles from './View.css';

export const View: React.FC<{ children?: any }> = props => <div className={styles.view}>{props.children}</div>;
