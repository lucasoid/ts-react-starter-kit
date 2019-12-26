import * as React from 'react';
import { Button, ButtonTypes } from '~components/ui/Button';
import {
    fetchListItems,
    IListItem,
    subscribeToListItems,
    unsubscribeToListItems,
    IList,
    fetchLists,
    editListItem,
} from '~services/shoppingListApi';
import { E404 } from '~components/errors/ErrorTypes';
import { ThemeContext, Themes } from '~theme';
import * as styles from './List.css';

interface IListDetailsProps {
    listId: string;
}

interface IListDetailsState {
    list: IList;
    items: IListItem[];
    notFound: boolean;
}

export class ListDetails extends React.Component<IListDetailsProps, IListDetailsState> {
    state = {
        list: {
            id: null,
            name: null,
            owner: null,
            members: [],
        },
        items: [],
        notFound: false,
    };

    static contextType = ThemeContext;

    subscriber = items => {
        this.setState({ items: items });
    };

    async componentDidMount() {
        let lists = await fetchLists();
        let list = lists.find(_list => _list.id === this.props.listId);
        if (!list) {
            this.setState({
                notFound: true,
            });
        } else {
            this.setState({ list }, () => {
                subscribeToListItems(this.state.list.id, this.subscriber);
                fetchListItems(this.state.list.id);
            });
        }
    }

    componentWillUnmount() {
        unsubscribeToListItems(this.state.list.id, this.subscriber);
    }

    toggle = (item: IListItem) => {
        item.isActive = !item.isActive;
        editListItem(item);
    };

    render() {
        if (this.state.notFound) throw new E404('List not found');

        let { theme } = this.context;

        return (
            <>
                <h2>{this.state.list.name}</h2>
                <aside>Owner: {this.state.list.owner}</aside>
                <aside>Members: {this.state.list.members.join(', ')}</aside>
                {this.state.items.map((item, index) => (
                    <div
                        className={`
                            ${styles.listItem}
                            ${item.isActive ? styles.active : styles.inactive}
                            ${theme === Themes.DARK ? styles.dark : styles.light}
                        `}
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
                <Button type={ButtonTypes.PRIMARY} styles={{ marginTop: '1em' }}>
                    + New item
                </Button>
            </>
        );
    }
}
