import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { Form } from '../Form';

describe('Form', () => {
    it('renders a form element conditionally with save and cancel buttons', () => {
        const onSubmit = jest.fn();
        const onCancel = jest.fn();

        // if onSubmit and onCancel are undefined, the buttons are not shown
        let wrapper = shallow(<Form>Form content here</Form>);
        expect(wrapper).toMatchSnapshot();

        wrapper = shallow(
            <Form onSubmit={onSubmit} onCancel={onCancel}>
                Form content here
            </Form>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('renders customized button text', () => {
        const props = {
            onSubmit: jest.fn(),
            onCancel: jest.fn(),
            submitText: 'My custom submit text',
            cancelText: 'My custom cancel text',
        };
        let wrapper = shallow(<Form {...props}>Form content here</Form>);
        expect(wrapper).toMatchSnapshot();
    });

    it('invokes the onSubmit prop when the form is submitted', () => {
        const onSubmit = jest.fn();
        let wrapper = mount(<Form onSubmit={onSubmit} />);
        wrapper.find('form').simulate('submit', { preventDefault: () => {} });
        expect(onSubmit.mock.calls.length).toBe(1);
    });

    it('invokes the onCancel prop when the cancel button is clicked', () => {
        const onCancel = jest.fn();
        let wrapper = mount(<Form onCancel={onCancel} />);
        wrapper.find('button').simulate('click', { preventDefault: () => {} });
        expect(onCancel.mock.calls.length).toBe(1);
    });

    it('gracefully handles a missing onSubmit prop', () => {
        let wrapper = mount(<Form />);
        expect(() => wrapper.find('form').simulate('submit', { preventDefault: () => {} })).not.toThrow();
    });
});
