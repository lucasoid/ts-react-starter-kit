import * as React from 'react';
import { Link, /*useParams,*/ withRouter } from 'react-router-dom';
import { View } from '~components/views/View';
import { Button } from '~components/ui/Button';
import {
    fetchListItems,
    IListItem,
    subscribeToListItems,
    unsubscribeToListItems,
    IList,
    fetchLists,
    editListItem,
} from '~services/shoppingListApi';
import * as styles from './List.css';

interface IListProps {
    match?: any;
}

interface IListState {
    list: IList;
    items: IListItem[];
}

class InertList extends React.Component<IListProps, IListState> {
    state = {
        list: {
            id: null,
            name: null,
            owner: null,
            members: [],
        },
        items: [],
    };

    subscriber = items => {
        this.setState({ items: items });
    };

    async componentDidMount() {
        const { listId } = this.props.match.params;
        let lists = await fetchLists();
        let list = lists.find(_list => _list.id === listId);
        this.setState({ list }, () => {
            subscribeToListItems(this.state.list.id, this.subscriber);
            fetchListItems(this.state.list.id);
        });
    }

    componentWillUnmount() {
        unsubscribeToListItems(this.state.list.id, this.subscriber);
    }

    toggle = (item: IListItem) => {
        item.isActive = !item.isActive;
        editListItem(item);
    };

    render() {
        return (
            <View>
                <Link to="/">← All lists</Link>
                <h2>{this.state.list.name}</h2>
                <aside>Owner: {this.state.list.owner}</aside>
                <aside>Members: {this.state.list.members.join(', ')}</aside>
                {this.state.items.map((item, index) => (
                    <div
                        className={`${styles.listItem} ${item.isActive ? styles.active : styles.inactive}`}
                        key={item.id + index}
                        onClick={() => this.toggle(item)}
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
                ))}
                <Button styles={{ marginTop: '1em', backgroundColor: 'teal' }}>+ New item</Button>
            </View>
        );
    }
}

export const List = withRouter(InertList);
