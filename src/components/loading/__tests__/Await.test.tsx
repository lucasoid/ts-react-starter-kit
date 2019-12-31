import * as React from 'react';
import { shallow } from 'enzyme';
import { Await } from '../Await';

describe('Await', () => {
    it('displays a fallback UI while in a loading state', () => {
        const renderFallback = () => 'My fallback';
        let wrapper = shallow(
            <Await renderFallback={renderFallback} loaded={false}>
                My content
            </Await>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('displays the complete UI when in a loaded state', () => {
        const renderFallback = () => 'My fallback';
        let wrapper = shallow(
            <Await renderFallback={renderFallback} loaded={true}>
                My content
            </Await>,
        );
        expect(wrapper).toMatchSnapshot();
    });
});
