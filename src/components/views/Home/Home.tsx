import * as React from 'react';
import { Link } from 'react-router-dom';
import { View } from '~components/views/View';
import { Button } from '~components/ui/Button';
import { Modal, ModalWidth } from '~components/ui/Modal';
import { fetchLists, IList, subscribeToLists, unsubscribeToLists } from '~services/shoppingListApi';
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

    render() {
        return (
            <>
                <View>
                    <h2>My lists</h2>
                    {this.state.lists.map(list => (
                        <div className={styles.menuItem} key={list.id}>
                            <Link to={`/lists/${list.id}`} title={list.name}>
                                {list.name}
                            </Link>
                            <aside>Created by {list.owner}</aside>
                        </div>
                    ))}
                    <Button onClick={this.openCreateDialog} styles={{ marginTop: '1em', backgroundColor: 'teal' }}>
                        + New list
                    </Button>
                </View>
                {/* demonstrates React.Portal. In real life I'd rather use inline editing. */}
                {this.state.creating && (
                    <Modal width={ModalWidth.MEDIUM} onDismiss={this.closeCreateDialog}>
                        Create form here.
                    </Modal>
                )}
            </>
        );
    }
}
