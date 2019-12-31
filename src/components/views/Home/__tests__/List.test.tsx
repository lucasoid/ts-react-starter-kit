import * as React from 'react';
import { shallow } from 'enzyme';
import { List } from '../List';
import { IList } from '~services/shoppingListApi';
import { Themes } from '~theme';

jest.mock('react', () => {
    const original = jest.requireActual('react');
    return {
        __esModule: true,
        ...original,
        useContext: jest.fn(),
    };
});

describe('List', () => {
    it('displays a themed List item', () => {
        let list: IList = { id: '1', name: 'My cool list', owner: 'me@domain.com', members: [] };
        // @ts-ignore
        React.useContext.mockImplementationOnce(() => ({ theme: Themes.LIGHT }));
        let wrapper = shallow(<List list={list} />);
        expect(wrapper).toMatchSnapshot();

        // @ts-ignore
        React.useContext.mockImplementationOnce(() => ({ theme: Themes.DARK }));
        wrapper = shallow(<List list={list} />);
        expect(wrapper).toMatchSnapshot();
    });
});
