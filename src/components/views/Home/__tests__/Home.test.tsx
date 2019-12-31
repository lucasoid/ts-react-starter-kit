import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { Home } from '../Home';
// imported for mocking
import { fetchLists, IList, subscribeToLists, unsubscribeToLists, createList } from '~services/shoppingListApi';

jest.mock('~services/shoppingListApi', () => ({
    fetchLists: jest.fn(),
    subscribeToLists: jest.fn(),
    createList: jest.fn(),
    unsubscribeToLists: jest.fn(),
}));

describe('Home', () => {
    it('renders a list of lists', () => {
        // @ts-ignore
        subscribeToLists.mockImplementationOnce(cb =>
            cb([
                { id: '1', name: 'My List', owner: 'me@domain.com', members: [] },
                { id: '2', name: 'My other list', owner: 'me@domain.com', members: ['you@domain.com'] },
            ]),
        );
        let wrapper = shallow(<Home />);
        expect(wrapper).toMatchSnapshot();
    });

    it('unsubscribes from the data source on unmount', () => {
        // @ts-ignore
        subscribeToLists.mockImplementationOnce(cb => cb([]));
        let wrapper = shallow(<Home />);
        wrapper.unmount();
        expect(unsubscribeToLists).toBeCalled();
    });

    it('renders a loading UI', () => {
        // @ts-ignore
        subscribeToLists.mockImplementationOnce(cb => null); // cb doesn't get called
        let wrapper = mount(<Home />);
        expect(wrapper).toMatchSnapshot();
    });

    it('allows for opening and closing the create dialog', () => {
        // @ts-ignore
        subscribeToLists.mockImplementationOnce(cb =>
            cb([
                { id: '1', name: 'My List', owner: 'me@domain.com', members: [] },
                { id: '2', name: 'My other list', owner: 'me@domain.com', members: ['you@domain.com'] },
            ]),
        );
        let wrapper = shallow(<Home />);
        wrapper.instance().openCreateDialog();
        expect(wrapper).toMatchSnapshot();

        wrapper.instance().closeCreateDialog();
        expect(wrapper).toMatchSnapshot();
    });

    it('provides for creating a new list', () => {
        // @ts-ignore
        subscribeToLists.mockImplementationOnce(cb => cb([]));
        let wrapper = shallow(<Home />);
        wrapper.instance().openCreateDialog();
        let list = { id: '3', name: 'My new list', owner: 'me@domain.com', members: [] };
        // @ts-ignore
        subscribeToLists.mockImplementationOnce(cb => cb([list]));
        wrapper.instance().createList(list);
        expect(createList).toBeCalled();
        // expect dialog to be closed and lists updated
        expect(wrapper).toMatchSnapshot();
    });
});
