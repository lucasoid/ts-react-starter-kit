import * as React from 'react';

export enum Themes {
    DARK = 'dark',
    LIGHT = 'light',
}

interface IThemeContext {
    theme: string;
    selectTheme?: Function;
}

export const ThemeContext = React.createContext<IThemeContext>({
    theme: Themes.LIGHT,
});

interface IThemeState {
    theme: Themes;
}

export class Theme extends React.Component<{}, IThemeState> {
    state = {
        theme: Themes.LIGHT,
    };

    selectTheme = (theme: Themes) => {
        this.setState({ theme });
    };

    render() {
        return (
            <ThemeContext.Provider value={{ theme: this.state.theme, selectTheme: this.selectTheme }}>
                {this.props.children}
            </ThemeContext.Provider>
        );
    }
}
