import * as React from 'react';
import { fetchLists, IList, subscribeToLists } from '~services/shoppingListApi';

interface IShoppingListsState {
    lists: IList[];
}

export class ShoppingLists extends React.Component<{}, IShoppingListsState> {
    state = {
        lists: [],
    };

    componentDidMount() {
        subscribeToLists(lists => {
            this.setState({ lists: lists });
        });
        fetchLists();
    }

    render() {
        return (
            <div>
                {this.state.lists.map(list => (
                    <div>{list.name}</div>
                ))}
            </div>
        );
    }
}
