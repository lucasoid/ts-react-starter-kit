import * as React from 'react';
import { Link } from 'react-router-dom';
import { Loading } from '~components/loading';
import * as styles from './Home.css';
import { ThemeContext, Themes } from '~theme';
import { IList } from '~services/shoppingListApi';

interface IListProps {
    list: IList;
}
export const List: React.FC<IListProps> = props => {
    let { theme } = React.useContext(ThemeContext);

    return (
        <div className={`${styles.menuItem} ${theme === Themes.DARK ? styles.dark : styles.light}`}>
            {!props.list ? (
                <>
                    <Loading el={'a'} lines={1} width={'35%'} />
                    <Loading el={'aside'} lines={1} width={'25%'} />
                </>
            ) : (
                <>
                    <Link to={`/lists/${props.list.id}`} title={props.list.name}>
                        {props.list.name}
                    </Link>
                    <aside>Created by {props.list.owner}</aside>
                </>
            )}
        </div>
    );
};
