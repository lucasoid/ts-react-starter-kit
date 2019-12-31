import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { Theme, Themes, ThemeContext } from '../Theme';

const ThemeConsumer: React.FC<{}> = () => {
    const { theme, selectTheme } = React.useContext(ThemeContext);
    return (
        <div>
            {theme}
            <button onClick={() => selectTheme(Themes.DARK)}>Toggle theme</button>
        </div>
    );
};

describe('Theme', () => {
    it('exposes a context provider that sets the theme', () => {
        let wrapper = mount(
            <Theme>
                <ThemeConsumer />
            </Theme>,
        );
        expect(wrapper.text()).toContain('light');
        wrapper.find('button').simulate('click');
        expect(wrapper.text()).toContain('dark');
    });
});
