import * as React from 'react';
import { View } from '~components/views/View';
import { fetchLists, IList, subscribeToLists, unsubscribeToLists } from '~services/shoppingListApi';
import * as styles from './ShoppingListMenu.css';

interface IShoppingListMenuState {
    lists: IList[];
}

export class ShoppingListMenu extends React.Component<{}, IShoppingListMenuState> {
    state = {
        lists: [],
    };

    subscriber = lists => {
        this.setState({ lists: lists });
    };

    componentDidMount() {
        subscribeToLists(this.subscriber);
        fetchLists();
    }

    componentWillUnmount() {
        unsubscribeToLists(this.subscriber);
    }

    render() {
        return (
            <View>
                {this.state.lists.map(list => (
                    <div className={styles.menuItem} key={list.id}>
                        {list.name}
                    </div>
                ))}
            </View>
        );
    }
}
