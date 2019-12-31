import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { Modal, ModalWidth } from '../Modal';
import { modalRootId } from '../';
import { Themes } from '~theme';

jest.mock('react', () => {
    const original = jest.requireActual('react');
    return {
        __esModule: true,
        ...original,
        useContext: jest.fn(() => ({ theme: 'light' })),
    };
});

describe('Modal', () => {
    beforeEach(() => {
        let el = document.getElementById(modalRootId);
        if (!el) {
            let node = document.createElement('div');
            node.setAttribute('id', modalRootId);
            document.body.appendChild(node);
        }
    });

    it('renders a modal dialog in various widths', () => {
        const onDismiss = jest.fn();
        let wrapper = shallow(
            <Modal onDismiss={onDismiss} width={ModalWidth.SMALL}>
                Some content
            </Modal>,
        );
        expect(wrapper).toMatchSnapshot();

        wrapper = shallow(
            <Modal onDismiss={onDismiss} width={ModalWidth.MEDIUM}>
                Some content
            </Modal>,
        );
        expect(wrapper).toMatchSnapshot();

        wrapper = shallow(
            <Modal onDismiss={onDismiss} width={ModalWidth.LARGE}>
                Some content
            </Modal>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('renders a themed modal', () => {
        const onDismiss = jest.fn();
        // @ts-ignore
        React.useContext.mockImplementationOnce(() => ({ theme: Themes.LIGHT }));
        let wrapper = shallow(
            <Modal onDismiss={onDismiss} width={ModalWidth.MEDIUM}>
                Some content
            </Modal>,
        );
        expect(wrapper).toMatchSnapshot();

        // @ts-ignore
        React.useContext.mockImplementationOnce(() => ({ theme: Themes.DARK }));
        wrapper = shallow(
            <Modal onDismiss={onDismiss} width={ModalWidth.MEDIUM}>
                Some content
            </Modal>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('closes a modal dialog with the close button', () => {
        const onDismiss = jest.fn();
        let wrapper = mount(
            <Modal onDismiss={onDismiss} width={ModalWidth.MEDIUM}>
                Some content
            </Modal>,
        );
        wrapper.find('button[title="Close"]').simulate('click');
        expect(onDismiss).toBeCalled();
    });

    it('closes a modal dialog with the escape key', () => {
        const onDismiss = jest.fn();
        let wrapper = mount(
            <Modal onDismiss={onDismiss} width={ModalWidth.MEDIUM}>
                Some content
            </Modal>,
        );
        window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
        expect(onDismiss).not.toBeCalled();
        window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }));
        expect(onDismiss).toBeCalled();
    });

    it('cleans up on unmount', () => {
        const onDismiss = jest.fn();
        let wrapper = mount(
            <Modal onDismiss={onDismiss} width={ModalWidth.MEDIUM}>
                Some content
            </Modal>,
        );
        let domCleanupSpy = jest.spyOn(Node.prototype, 'removeChild');
        let eventCleanupSpy = jest.spyOn(window, 'removeEventListener');
        wrapper.unmount();
        expect(domCleanupSpy).toBeCalled();
        expect(eventCleanupSpy).toBeCalled();
    });
});
