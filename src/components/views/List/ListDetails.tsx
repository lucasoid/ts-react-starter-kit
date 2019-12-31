import * as React from 'react';
import { Button, ButtonTypes } from '~components/ui/Button';
import { Loading, Await } from '~components/Loading';
import { ListItem } from './ListItem';
import { Modal, ModalWidth } from '~components/ui/Modal';
import { ListItemForm } from '~components/forms/ListItem';
import {
    fetchListItems,
    IListItem,
    subscribeToListItems,
    unsubscribeToListItems,
    IList,
    fetchLists,
    editListItem,
    createListItem,
} from '~services/shoppingListApi';
import { E404 } from '~components/errors/ErrorTypes';

interface IListDetailsProps {
    listId: string;
}

export const ListDetails: React.FC<IListDetailsProps> = props => {
    let [list, setList] = React.useState({ id: null, name: null, owner: null, members: [] } as IList);
    let [loading, setLoading] = React.useState(true);
    let [items, setItems] = React.useState([]);
    let [notFound, setNotFound] = React.useState(false);
    let [showCreateDialog, setShowCreateDialog] = React.useState(false);
    React.useEffect(() => {
        const subscriber = function(items) {
            setItems(items);
            setLoading(false);
        };
        fetchLists().then(lists => {
            let list = lists.find(_list => _list.id === props.listId);
            if (!list) {
                setNotFound(true);
            } else {
                setList(list);
                subscribeToListItems(props.listId, subscriber);
                fetchListItems(list.id);
            }
        });
        return () => unsubscribeToListItems(props.listId, subscriber);
    }, [props.listId]);

    function toggle(item: IListItem) {
        item.isActive = !item.isActive;
        // update the API, which will trigger the subscriber when it completes
        editListItem(item);
        // update state optimistically while we wait
        let _items = [...items];
        _items.splice(
            items.findIndex(_item => _item.id === item.id),
            1,
            item,
        );
        setItems(_items);
    }

    function handleCreate(item: IListItem) {
        item.listId = props.listId;
        createListItem(item);
        let _items = [...items];
        _items.push(item);
        setItems(_items);
        setShowCreateDialog(false);
    }

    if (notFound) throw new E404('List not found');

    return (
        <Await
            loaded={!loading}
            renderFallback={() => (
                <>
                    <Loading el={'h2'} width={'25%'} lines={1}></Loading>
                    <Loading el={'aside'} width={'25%'} lines={1}></Loading>
                    <Loading el={'aside'} width={'25%'} lines={1}></Loading>
                    <ListItem item={null} key={1} onClick={() => {}} />
                    <ListItem item={null} key={2} onClick={() => {}} />
                    <ListItem item={null} key={3} onClick={() => {}} />
                </>
            )}
        >
            <h2>{list.name}</h2>
            <aside>Owner: {list.owner}</aside>
            <aside>Members: {list.members.join(', ')}</aside>
            {items.map((item, index) => (
                <ListItem item={item} key={item.id} onClick={toggle} />
            ))}
            <Button onClick={() => setShowCreateDialog(true)} type={ButtonTypes.PRIMARY} styles={{ marginTop: '1em' }}>
                + New item
            </Button>
            {showCreateDialog && (
                <Modal width={ModalWidth.MEDIUM} onDismiss={() => setShowCreateDialog(false)}>
                    <ListItemForm onSubmit={handleCreate} onCancel={() => setShowCreateDialog(false)} />
                </Modal>
            )}
        </Await>
    );
};
