import * as React from 'react';
import { shallow } from 'enzyme';
import { ListItem } from '../ListItem';
import { IListItem } from '~services/shoppingListApi';
import { Themes } from '~theme';

jest.mock('react', () => {
    const original = jest.requireActual('react');
    return {
        __esModule: true,
        ...original,
        useContext: jest.fn(),
    };
});

describe('ListItem', () => {
    it('displays a themed ListItem entry', () => {
        let listItem: IListItem = {
            id: '1',
            listId: '1',
            name: 'My cool item',
            category: 'hardware',
            quantity: 99,
            isActive: true,
        };
        const onClick = jest.fn();
        // @ts-ignore
        React.useContext.mockImplementationOnce(() => ({ theme: Themes.LIGHT }));
        let wrapper = shallow(<ListItem item={listItem} onClick={onClick} />);
        expect(wrapper).toMatchSnapshot();

        // @ts-ignore
        React.useContext.mockImplementationOnce(() => ({ theme: Themes.DARK }));
        wrapper = shallow(<ListItem item={listItem} onClick={onClick} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('styles an inactive item', () => {
        let listItem: IListItem = {
            id: '1',
            listId: '1',
            name: 'My cool item',
            category: 'hardware',
            quantity: 99,
            isActive: false,
        };
        const onClick = jest.fn();
        // @ts-ignore
        React.useContext.mockImplementationOnce(() => ({ theme: Themes.LIGHT }));
        let wrapper = shallow(<ListItem item={listItem} onClick={onClick} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('displays a themed loading UI if no list item data is provided', () => {
        let listItem = null;
        const onClick = jest.fn();
        // @ts-ignore
        React.useContext.mockImplementationOnce(() => ({ theme: Themes.LIGHT }));
        let wrapper = shallow(<ListItem item={listItem} onClick={onClick} />);
        expect(wrapper).toMatchSnapshot();

        // @ts-ignore
        React.useContext.mockImplementationOnce(() => ({ theme: Themes.DARK }));
        wrapper = shallow(<ListItem item={listItem} onClick={onClick} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('invokes the onClick prop when clicked', () => {
        let listItem: IListItem = {
            id: '1',
            listId: '1',
            name: 'My cool item',
            category: 'hardware',
            quantity: 99,
            isActive: true,
        };
        const onClick = jest.fn();
        // @ts-ignore
        React.useContext.mockImplementationOnce(() => ({ theme: Themes.LIGHT }));
        let wrapper = shallow(<ListItem item={listItem} onClick={onClick} />);
        wrapper.find('div.listItem').simulate('click');
        expect(onClick).toBeCalled();
    });
});
