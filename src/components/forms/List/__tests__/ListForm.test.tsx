import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { ListForm } from '../ListForm';

jest.mock('react', () => {
    const original = jest.requireActual('react');
    return {
        __esModule: true,
        ...original,
        useState: jest.fn(),
    };
});

describe('ListForm', () => {
    it('renders a form for creating a list', () => {
        const onSubmit = jest.fn();
        const onCancel = jest.fn();
        const setter = jest.fn();
        // @ts-ignore
        React.useState.mockImplementation(() => ['value', setter]);
        let wrapper = shallow(<ListForm onSubmit={onSubmit} onCancel={onCancel} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('invokes onSubmit with some default values populated upon creation', () => {
        const onSubmit = jest.fn();
        const onCancel = jest.fn();
        const setter = jest.fn();
        // @ts-ignore
        React.useState.mockImplementation(() => ['value', setter]);
        let wrapper = mount(<ListForm onSubmit={onSubmit} onCancel={onCancel} />);
        wrapper.find('form').simulate('submit', { e: { preventDefault: () => {} } });
        expect(onSubmit.mock.calls[0][0].id).toBeTruthy();
        expect(onSubmit.mock.calls[0][0].name).toBe('value');
        expect(onSubmit.mock.calls[0][0].owner).toBeTruthy();
        expect(onSubmit.mock.calls[0][0].members).toEqual(['value']);
    });
});
