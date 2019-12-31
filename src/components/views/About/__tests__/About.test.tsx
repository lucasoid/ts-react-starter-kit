import * as React from 'react';
import { shallow } from 'enzyme';
import { About } from '../About';

describe('About', () => {
    it('renders an About page', () => {
        expect(shallow(<About />)).toMatchSnapshot();
    });
});
