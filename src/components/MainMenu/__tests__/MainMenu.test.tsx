import * as React from 'react';
import { shallow } from 'enzyme';
import { MainMenu } from '../MainMenu';
import { Themes } from '~theme';

jest.mock('react', () => {
    const original = jest.requireActual('react');
    return {
        __esModule: true,
        ...original,
        useContext: jest.fn(),
    };
});

describe('MainMenu', () => {
    it('displays a themed main menu UI', () => {
        // @ts-ignore
        React.useContext.mockImplementationOnce(() => ({
            theme: Themes.LIGHT,
        }));
        let lightWrapper = shallow(<MainMenu />);
        expect(lightWrapper).toMatchSnapshot();

        // @ts-ignore
        React.useContext.mockImplementationOnce(() => ({
            theme: Themes.DARK,
        }));
        let darkWrapper = shallow(<MainMenu />);
        expect(darkWrapper).toMatchSnapshot();
    });
});
