import * as React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../Header';
import { Themes } from '~theme';

jest.mock('react', () => {
    const original = jest.requireActual('react');
    return {
        __esModule: true,
        ...original,
        useContext: jest.fn(),
    };
});

describe('Header', () => {
    it('displays a themed header', () => {
        // @ts-ignore
        React.useContext.mockImplementationOnce(() => ({ theme: Themes.LIGHT }));
        let lightWrapper = shallow(<Header title="Welcome" />);
        expect(lightWrapper).toMatchSnapshot();

        // @ts-ignore
        React.useContext.mockImplementationOnce(() => ({ theme: Themes.DARK }));
        let darkWrapper = shallow(<Header title="Welcome" />);
        expect(darkWrapper).toMatchSnapshot();
    });
});
