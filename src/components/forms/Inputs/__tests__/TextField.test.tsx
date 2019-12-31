import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { TextField } from '../TextField';

describe('TextField', () => {
    it('renders a styled text input', () => {
        const onChange = jest.fn();
        let wrapper = shallow(<TextField label="My test field" value="ABC" onChange={onChange} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders a disabled text input', () => {
        const onChange = jest.fn();
        let wrapper = shallow(<TextField label="My test field" value="ABC" onChange={onChange} disabled={true} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('passes input changes to the onChange handler', () => {
        const onChange = jest.fn();
        let wrapper = mount(<TextField label="My test field" value="ABC" onChange={onChange} />);
        wrapper.find('input').simulate('change', { target: { value: 'DEF' } });
        expect(onChange.mock.calls[0][0]).toBe('DEF');
    });
});
