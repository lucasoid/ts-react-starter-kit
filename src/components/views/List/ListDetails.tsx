import * as React from 'react';
import { Button, ButtonTypes } from '~components/ui/Button';
import { Loading } from '~components/Loading';
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
import { ListItem } from './ListItem';

interface IListDetailsProps {
    listId: string;
}

export const ListDetails: React.FC<IListDetailsProps> = props => {
    let [list, setList] = React.useState({ id: null, name: null, owner: null, members: [] } as IList);
    let [loading, setLoading] = React.useState(true);
    let [items, setItems] = React.useState([]);
    let [notFound, setNotFound] = React.useState(false);

    React.useEffect(() => {
        this.subscriber = function(items) {
            setItems(items);
            setLoading(false);
        };
        fetchLists().then(lists => {
            let list = lists.find(_list => _list.id === props.listId);
            if (!list) {
                setNotFound(true);
            } else {
                setList(list);
                subscribeToListItems(props.listId, this.subscriber);
                fetchListItems(list.id);
            }
        });
        return () => unsubscribeToListItems(props.listId, this.subscriber);
    }, [props.listId]);

    function toggle(item: IListItem) {
        item.isActive = !item.isActive;
        editListItem(item);
    }

    if (notFound) throw new E404('List not found');

    return (
        <>
            {loading ? <Loading el={'h2'} width={'25%'} lines={1}></Loading> : <h2>{list.name}</h2>}
            {loading ? <Loading el={'aside'} width={'25%'} lines={1}></Loading> : <aside>Owner: {list.owner}</aside>}
            {loading ? (
                <Loading el={'aside'} width={'25%'} lines={1}></Loading>
            ) : (
                <aside>Members: {list.members.join(', ')}</aside>
            )}
            {loading ? (
                <>
                    <ListItem item={null} key={1} onClick={() => {}} />
                    <ListItem item={null} key={2} onClick={() => {}} />
                    <ListItem item={null} key={3} onClick={() => {}} />
                </>
            ) : (
                <>
                    {items.map((item, index) => (
                        <ListItem item={item} key={item.id} onClick={toggle} />
                    ))}
                    <Button type={ButtonTypes.PRIMARY} styles={{ marginTop: '1em' }}>
                        + New item
                    </Button>
                </>
            )}
        </>
    );
};
