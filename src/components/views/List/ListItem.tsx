import * as React from 'react';
import { Button } from '~components/ui/Button';
import { Loading } from '~components/Loading';
import * as styles from './List.css';
import { ThemeContext, Themes } from '~theme';
import { IListItem } from '~services/shoppingListApi';

interface IListItemProps {
    item: IListItem;
    onClick: Function;
}
export const ListItem: React.FC<IListItemProps> = props => {
    let { item } = props;
    let { theme } = React.useContext(ThemeContext);

    return !item ? (
        <div className={`${styles.listItem} ${styles.active} ${theme === Themes.DARK ? styles.dark : styles.light}`}>
            <div className={styles.checkbox}>
                <Button plaintext={true} styles={{ outline: 'none' }}>
                    ☐
                </Button>
            </div>
            <div className={styles.name}>
                <Loading width={'100%'} lines={1} el={'span'} />
            </div>
            <div className={styles.category}>
                <Loading width={'100%'} lines={1} el={'span'} />
            </div>
            <div className={styles.quantity}>
                <Loading width={'100%'} lines={1} el={'span'} />
            </div>
        </div>
    ) : (
        <div
            className={`
                ${styles.listItem}
                ${item.isActive ? styles.active : styles.inactive}
                ${theme === Themes.DARK ? styles.dark : styles.light}
            `}
            onClick={() => props.onClick(item)}
        >
            <div className={styles.checkbox}>
                <Button plaintext={true} styles={{ outline: 'none' }}>
                    {item.isActive ? '☐' : '☑'}
                </Button>
            </div>
            <div className={styles.name}>{item.name}</div>
            <div className={styles.category}>{item.category}</div>
            <div className={styles.quantity}>{item.quantity}</div>
        </div>
    );
};
