import * as React from 'react';
import { mount } from 'enzyme';
import { ErrorBoundary } from '../ErrorBoundary';
import { E404, E500 } from '../ErrorTypes';

describe('ErrorBoundary', () => {
    it('displays a Not Found error if the error is of type E404', () => {
        let Child: React.FC<{}> = () => {
            throw new E404('is a 404');
        };
        let wrapper = mount(
            <ErrorBoundary>
                <Child />
            </ErrorBoundary>,
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.text().toLowerCase()).toContain('not found');
    });

    it('displays a 500 error if the error is of type E500 or anything else', () => {
        let Child: React.FC<{}> = () => {
            throw new E500('is a 500');
        };
        let wrapper = mount(
            <ErrorBoundary>
                <Child />
            </ErrorBoundary>,
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.text().toLowerCase()).toContain('something went wrong');

        class CustomError extends Error {
            constructor(msg) {
                super(msg);
                this.name = 'CustomError';
            }
        }
        Child = () => {
            throw new CustomError('is a custom error');
        };
        wrapper = mount(
            <ErrorBoundary>
                <Child />
            </ErrorBoundary>,
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.text().toLowerCase()).toContain('something went wrong');
    });

    it('renders the child tree if no errors are caught', () => {
        let Child: React.FC<{}> = () => <div>OK</div>;
        let wrapper = mount(
            <ErrorBoundary>
                <Child />
            </ErrorBoundary>,
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.text().toLowerCase()).toContain('ok');
    });
});
