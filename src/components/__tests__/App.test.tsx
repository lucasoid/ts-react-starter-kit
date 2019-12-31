import * as React from 'react';
import { shallow } from 'enzyme';
import { App } from '../App';

describe('App', () => {
    it('renders the app', () => {
        let wrapper = shallow(<App title="Welcome" />);
        expect(wrapper).toMatchSnapshot();
    });
});
