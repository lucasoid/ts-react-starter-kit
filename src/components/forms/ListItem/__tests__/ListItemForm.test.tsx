import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { ListItemForm } from '../ListItemForm';

jest.mock('react', () => {
    const original = jest.requireActual('react');
    return {
        __esModule: true,
        ...original,
        useState: jest.fn(),
    };
});

describe('ListItemForm', () => {
    it('renders a form for creating a list', () => {
        const onSubmit = jest.fn();
        const onCancel = jest.fn();
        const setter = jest.fn();
        // @ts-ignore
        React.useState.mockImplementation(initialState => {
            if (typeof initialState === 'string') {
                return ['value', setter];
            }
            if (typeof initialState === 'number') {
                return [10, setter];
            }
        });
        let wrapper = shallow(<ListItemForm onSubmit={onSubmit} onCancel={onCancel} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('invokes onSubmit with some default values populated upon creation', () => {
        const onSubmit = jest.fn();
        const onCancel = jest.fn();
        const setter = jest.fn();
        // @ts-ignore
        React.useState.mockImplementation(initialState => {
            if (typeof initialState === 'string') {
                return ['value', setter];
            }
            if (typeof initialState === 'number') {
                return [10, setter];
            }
        });
        let wrapper = mount(<ListItemForm onSubmit={onSubmit} onCancel={onCancel} />);
        wrapper.find('form').simulate('submit', { e: { preventDefault: () => {} } });
        expect(onSubmit.mock.calls[0][0].id).toBeTruthy();
        expect(onSubmit.mock.calls[0][0].name).toBe('value');
        expect(onSubmit.mock.calls[0][0].category).toBe('value');
        expect(onSubmit.mock.calls[0][0].quantity).toBe(10);
        expect(onSubmit.mock.calls[0][0].isActive).toBe(true);
    });
});
