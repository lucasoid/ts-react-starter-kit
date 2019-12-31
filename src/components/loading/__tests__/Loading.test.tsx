import * as React from 'react';
import { shallow } from 'enzyme';
import { Loading } from '../Loading';
import { Themes } from '~theme';

jest.mock('react', () => {
    const original = jest.requireActual('react');
    return {
        __esModule: true,
        ...original,
        useContext: jest.fn(),
    };
});

describe('Loading', () => {
    it('displays a themed placeholder UI', () => {
        // @ts-ignore
        React.useContext.mockImplementationOnce(() => ({
            theme: Themes.LIGHT,
        }));
        let lightWrapper = shallow(<Loading width={'50%'} lines={3} el={'p'} />);
        expect(lightWrapper).toMatchSnapshot();

        // @ts-ignore
        React.useContext.mockImplementationOnce(() => ({
            theme: Themes.DARK,
        }));
        let darkWrapper = shallow(<Loading width={'100px'} lines={1} el={'h1'} />);
        expect(darkWrapper).toMatchSnapshot();
    });
});
