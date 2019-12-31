import * as React from 'react';
import { shallow } from 'enzyme';
import { Button, ButtonTypes } from '../Button';

describe('Button', () => {
    it('renders a primary button', () => {
        let wrapper = shallow(<Button>Click here</Button>);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders a secondary button', () => {
        let wrapper = shallow(<Button type={ButtonTypes.SECONDARY}>Click here</Button>);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders a plaintext button', () => {
        let wrapper = shallow(<Button plaintext={true}>Click here</Button>);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders the title attribute', () => {
        let wrapper = shallow(<Button title={'Alt text here'}>Click here</Button>);
        expect(wrapper).toMatchSnapshot();
    });

    it('accepts additional styles', () => {
        let wrapper = shallow(<Button styles={{ marginTop: '22px' }}>Click here</Button>);
        expect(wrapper).toMatchSnapshot();
    });

    it('invokes the onClick prop', () => {
        const onClick = jest.fn();
        let wrapper = shallow(<Button onClick={onClick}>Click here</Button>);
        wrapper.find('button').simulate('click', { preventDefault: () => {} });
        expect(onClick).toBeCalled();
    });

    it('gracefully handles a missing onClick prop', () => {
        const onClick = null;
        let wrapper = shallow(<Button onClick={onClick}>Click here</Button>);
        expect(() => wrapper.find('button').simulate('click', { preventDefault: () => {} })).not.toThrow();
    });
});
