import * as React from 'react';
import { shallow } from 'enzyme';
import { ErrorMessage } from '../ErrorMessage';
import { ThemeContext, Themes } from '~theme';

// mocking React's useContext. Ugly, but effective.
jest.mock('react', () => {
    const original = jest.requireActual('react');
    return {
        __esModule: true,
        ...original,
        useContext: jest.fn(),
    };
});

describe('ErrorMessage', () => {
    it('displays a themed error message', () => {
        // @ts-ignore  <-- tell the IDE to be cool about using mockImplementationOnce
        React.useContext.mockImplementationOnce(() => ({ theme: Themes.LIGHT }));
        let lightWrapper = shallow(<ErrorMessage>Oops</ErrorMessage>);
        expect(lightWrapper).toMatchSnapshot();

        // @ts-ignore
        React.useContext.mockImplementationOnce(() => ({ theme: Themes.DARK }));
        let darkWrapper = shallow(<ErrorMessage>Oops</ErrorMessage>);
        expect(darkWrapper).toMatchSnapshot();
    });
});
