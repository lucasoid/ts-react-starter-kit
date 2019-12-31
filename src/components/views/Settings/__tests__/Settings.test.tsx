import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { Settings } from '../Settings';
import { Theme } from '~theme';

describe('Settings', () => {
    it('displays a settings page', () => {
        let wrapper = shallow(
            <Theme>
                <Settings />
            </Theme>,
        ).dive();
        expect(wrapper).toMatchSnapshot();
    });

    it('allows for selecting a theme', () => {
        let wrapper = mount(
            <Theme>
                <Settings />
            </Theme>,
        );
        wrapper
            .find('button')
            .first()
            .simulate('click');
        expect(wrapper).toMatchSnapshot();
        wrapper
            .find('button')
            .at(1)
            .simulate('click');
        expect(wrapper).toMatchSnapshot();
    });
});
