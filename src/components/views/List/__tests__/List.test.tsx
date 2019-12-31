import * as React from 'react';
import { shallow } from 'enzyme';
import { List } from '../List';
// imported for mocking
import { Link, useParams } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    Link: props => <a>{props.children}</a>,
    useParams: () => ({ listId: '1' }),
}));

describe('ListItem', () => {
    it('renders a view of a list page', () => {
        let wrapper = shallow(<List />);
        expect(wrapper).toMatchSnapshot();
    });
});
