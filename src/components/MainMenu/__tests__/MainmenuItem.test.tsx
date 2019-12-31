import * as React from 'react';
import { shallow } from 'enzyme';
import { MainMenuItem } from '../MainMenuItem';

describe('MainMenuItem', () => {
    it('displays a main menu item', () => {
        let wrapper = shallow(
            <MainMenuItem>
                <a href="/faq">FAQ</a>
            </MainMenuItem>,
        );
        expect(wrapper).toMatchSnapshot();
    });
});
