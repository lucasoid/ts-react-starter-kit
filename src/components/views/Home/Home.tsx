import * as React from 'react';
import { Link } from 'react-router-dom';
import { View } from '~components/views/View';
import { Button } from '~components/ui/Button';
import { fetchLists, IList, subscribeToLists, unsubscribeToLists } from '~services/shoppingListApi';
import * as styles from './Home.css';

interface IHomeState {
    lists: IList[];
}

export class Home extends React.Component<{}, IHomeState> {
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
                <h2>My lists</h2>
                {this.state.lists.map(list => (
                    <div className={styles.menuItem} key={list.id}>
                        <Link to={`/lists/${list.id}`} title={list.name}>
                            {list.name}
                        </Link>
                        <aside>Created by {list.owner}</aside>
                    </div>
                ))}
                <Button styles={{ marginTop: '1em', backgroundColor: 'teal' }}>+ New list</Button>
            </View>
        );
    }
}
