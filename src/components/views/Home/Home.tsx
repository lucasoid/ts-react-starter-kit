import * as React from 'react';
import { Link } from 'react-router-dom';
import { View } from '~components/views/View';
import { Button, ButtonTypes } from '~components/ui/Button';
import { Modal, ModalWidth } from '~components/ui/Modal';
import { ListForm } from '~components/forms/List';
import { fetchLists, IList, subscribeToLists, unsubscribeToLists, createList } from '~services/shoppingListApi';
import { ThemeContext, Themes } from '~theme';
import * as styles from './Home.css';

interface IHomeState {
    lists: IList[];
    creating: boolean;
}

export class Home extends React.Component<{}, IHomeState> {
    state = {
        lists: [],
        creating: false,
    };

    static contextType = ThemeContext;

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
                    {this.state.lists.map(list => (
                        <div
                            className={`${styles.menuItem} ${theme === Themes.DARK ? styles.dark : styles.light}`}
                            key={list.id}
                        >
                            <Link to={`/lists/${list.id}`} title={list.name}>
                                {list.name}
                            </Link>
                            <aside>Created by {list.owner}</aside>
                        </div>
                    ))}
                    <Button type={ButtonTypes.PRIMARY} onClick={this.openCreateDialog} styles={{ marginTop: '1em' }}>
                        + New list
                    </Button>
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
