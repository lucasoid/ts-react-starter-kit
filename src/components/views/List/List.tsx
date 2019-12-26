import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { View } from '~components/views/View';
import { ListDetails } from './ListDetails';

interface IListProps {
    match?: any;
}

export const List: React.FC<IListProps> = props => {
    let { listId } = useParams();
    return (
        <View>
            <Link to="/">← All lists</Link>
            <ListDetails listId={listId} />
        </View>
    );
};
