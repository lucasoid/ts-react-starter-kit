import * as React from 'react';
import { View } from '~components/views/View';
import { Button, ButtonTypes } from '~components/ui/Button';
import { Modal, ModalWidth } from '~components/ui/Modal';
import { ListForm } from '~components/forms/List';
import { List } from './List';
import { fetchLists, IList, subscribeToLists, unsubscribeToLists, createList } from '~services/shoppingListApi';
import { ThemeContext } from '~theme';

interface IHomeState {
    lists: IList[];
    creating: boolean;
    listsLoaded: boolean;
}

export class Home extends React.Component<{}, IHomeState> {
    state = {
        lists: [],
        creating: false,
        listsLoaded: false,
    };

    static contextType = ThemeContext;

    subscriber = lists => {
        this.setState({ lists: lists, listsLoaded: true });
    };

    componentDidMount() {
        subscribeToLists(this.subscriber);
        fetchLists();
    }

    componentWillUnmount() {
        unsubscribeToLists(this.subscriber);
    }

    openCreateDialog = () => {
        this.setState({ creating: true });
    };

    closeCreateDialog = () => {
        this.setState({ creating: false });
    };

    createList = (item: IList) => {
        createList(item);
        this.closeCreateDialog();
    };

    render() {
        let { theme } = this.context;

        return (
            <>
                <View>
                    <h2>My lists</h2>
                    {!this.state.listsLoaded ? (
                        <>
                            <List key={1} list={null} />
                            <List key={2} list={null} />
                            <List key={3} list={null} />
                        </>
                    ) : (
                        <>
                            {this.state.lists.map(list => (
                                <List key={list.id} list={list} />
                            ))}
                            <Button
                                type={ButtonTypes.PRIMARY}
                                onClick={this.openCreateDialog}
                                styles={{ marginTop: '1em' }}
                            >
                                + New list
                            </Button>
                        </>
                    )}
                </View>
                {/* demonstrates React.Portal. In real life I'd rather use inline editing. */}
                {this.state.creating && (
                    <Modal width={ModalWidth.MEDIUM} onDismiss={this.closeCreateDialog}>
                        <ListForm onSubmit={this.createList} onCancel={this.closeCreateDialog} />
                    </Modal>
                )}
            </>
        );
    }
}
