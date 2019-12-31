import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import { ListDetails } from '../ListDetails';
import { ErrorBoundary } from '~components/errors/ErrorBoundary';
// imported for mocking
import { Modal } from '~components/ui/Modal';
import { ListItemForm } from '~components/forms/ListItem/ListItemForm';

import {
    fetchListItems,
    IListItem,
    subscribeToListItems,
    unsubscribeToListItems,
    IList,
    fetchLists,
    editListItem,
    createListItem,
} from '~services/shoppingListApi';

jest.mock('~components/ui/Modal', () => ({
    Modal: props => (
        <div>
            <button title="close" onClick={props.onDismiss}>
                X
            </button>
            {props.children}
        </div>
    ),
    ModalWidth: { SMALL: 'small', MEDIUM: 'MEDIUM', LARGE: 'large' },
}));

jest.mock('~components/forms/ListItem/ListItemForm', () => ({
    ListItemForm: props => (
        <form>
            <button
                title={'submit'}
                onClick={() => {
                    // simulating a form submission.
                    // i'm not crazy about this, but there doesn't seem to be another way to access the onSubmit functionality.
                    props.onSubmit({
                        id: 'new',
                        name: 'new item',
                        category: '',
                        quantity: 100,
                        isActive: true,
                    });
                }}
            >
                Submit
            </button>
            <button title="cancel" onClick={props.onCancel}>
                Cancel
            </button>
        </form>
    ),
}));

jest.mock('~services/shoppingListApi', () => ({
    fetchLists: jest.fn(),
    fetchListItems: jest.fn(),
    subscribeToListItems: jest.fn(),
    unsubscribeToListItems: jest.fn(),
    editListItem: jest.fn(),
    createListItem: jest.fn(),
}));

describe('ListDetails', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('shows a loading UI before data is loaded', () => {
        // @ts-ignore
        fetchLists.mockImplementationOnce(() => new Promise(resolve => null)); // never completes
        let wrapper = mount(<ListDetails listId={'1'} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('shows a list details view once data is loaded', async () => {
        let list: IList = { id: '1', name: 'My Cool List', owner: 'me@domain.com', members: [] };
        let items: IListItem[] = [
            { listId: '1', id: '1', name: 'Eggs - dozen', category: 'dairy', quantity: 1, isActive: true },
            { listId: '1', id: '2', name: 'Milk - gallon', category: 'dairy', quantity: 3, isActive: false },
        ];
        // @ts-ignore
        fetchLists.mockImplementationOnce(() => new Promise(resolve => resolve([list])));
        // @ts-ignore
        subscribeToListItems.mockImplementationOnce((id, cb) => cb(items));

        let wrapper = mount(<ListDetails listId={'1'} />);
        // act() allows the component's state to be updated after the effect.
        // awaiting a Promise ensures that the async code in useEffect is run.
        await act(async () => new Promise(setImmediate));
        // tell Enzyme to re-render after the state was updated.
        wrapper.update();
        expect(wrapper).toMatchSnapshot();
        wrapper.unmount();
    });

    it('throws an E404 error if the list is not found', async () => {
        let list: IList = { id: '1', name: 'My Cool List', owner: 'me@domain.com', members: [] };
        // @ts-ignore
        fetchLists.mockImplementationOnce(() => new Promise(resolve => resolve([list])));
        let wrapper = mount(
            <ErrorBoundary>
                <ListDetails listId={'2'} />
            </ErrorBoundary>,
        );
        await act(async () => new Promise(setImmediate));
        wrapper.update();
        expect(wrapper).toMatchSnapshot();
    });

    it('allows for opening and closing the create dialog', async () => {
        let list: IList = { id: '1', name: 'My Cool List', owner: 'me@domain.com', members: [] };
        let items: IListItem[] = [];
        // @ts-ignore
        fetchLists.mockImplementationOnce(() => new Promise(resolve => resolve([list])));
        // @ts-ignore
        subscribeToListItems.mockImplementationOnce((id, cb) => cb(items));
        let wrapper = mount(<ListDetails listId={'1'} />);
        await act(async () => new Promise(setImmediate));
        wrapper.update();
        wrapper
            .find('button')
            .first()
            .simulate('click');
        expect(wrapper).toMatchSnapshot();
        // target the button in the mocked Modal:
        wrapper
            .find('button[title="close"]')
            .first()
            .simulate('click');
        expect(wrapper).toMatchSnapshot();
    });

    it('allows for toggling items between active and inactive', async () => {
        let list: IList = { id: '1', name: 'My Cool List', owner: 'me@domain.com', members: [] };
        let items: IListItem[] = [
            { listId: '1', id: '1', name: 'Eggs - dozen', category: 'dairy', quantity: 1, isActive: true },
            { listId: '1', id: '2', name: 'Milk - gallon', category: 'dairy', quantity: 3, isActive: false },
        ];
        // @ts-ignore
        fetchLists.mockImplementationOnce(() => new Promise(resolve => resolve([list])));
        // @ts-ignore
        subscribeToListItems.mockImplementationOnce((id, cb) => cb(items));
        let wrapper = mount(<ListDetails listId={'1'} />);
        await act(async () => new Promise(setImmediate));
        wrapper.update();

        wrapper
            .find('.listItem')
            .first()
            .simulate('click');
        expect(wrapper).toMatchSnapshot();
        wrapper
            .find('.listItem')
            .first()
            .simulate('click');
        expect(wrapper).toMatchSnapshot();
    });

    it('allows for creating items', async () => {
        let list: IList = { id: '1', name: 'My Cool List', owner: 'me@domain.com', members: [] };
        let items: IListItem[] = [];
        // @ts-ignore
        fetchLists.mockImplementationOnce(() => new Promise(resolve => resolve([list])));
        // @ts-ignore
        subscribeToListItems.mockImplementationOnce((id, cb) => cb(items));
        let wrapper = mount(<ListDetails listId={'1'} />);
        await act(async () => new Promise(setImmediate));
        wrapper.update();
        // open the modal
        wrapper
            .find('button')
            .first()
            .simulate('click');
        // submit the mocked form
        wrapper
            .find('button[title="submit"]')
            .first()
            .simulate('click');
        await act(async () => new Promise(setImmediate));
        wrapper.update();
        // the component should now show one item in the list
        expect(wrapper).toMatchSnapshot();
        expect(createListItem).toBeCalled();
    });

    it('allows for dismissing the create form', async () => {
        let list: IList = { id: '1', name: 'My Cool List', owner: 'me@domain.com', members: [] };
        let items: IListItem[] = [];
        // @ts-ignore
        fetchLists.mockImplementationOnce(() => new Promise(resolve => resolve([list])));
        // @ts-ignore
        subscribeToListItems.mockImplementationOnce((id, cb) => cb(items));
        let wrapper = mount(<ListDetails listId={'1'} />);
        await act(async () => new Promise(setImmediate));
        wrapper.update();
        // open the modal
        wrapper
            .find('button')
            .first()
            .simulate('click');
        // cancel the mocked form
        wrapper
            .find('button[title="cancel"]')
            .first()
            .simulate('click');
        expect(wrapper).toMatchSnapshot();
    });
});
