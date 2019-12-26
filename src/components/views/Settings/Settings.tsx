import * as React from 'react';
import { ThemeContext, Themes } from '~theme';
import { View } from '~components/Views/View';
import { Button } from '~components/ui/Button';

export const Settings: React.FC<{}> = () => (
    <ThemeContext.Consumer>
        {({ theme, selectTheme }) => (
            <View>
                <h2>Settings</h2>
                <h3>Theme</h3>
                {Object.keys(Themes).map(key => (
                    <p key={key}>
                        <Button
                            plaintext={true}
                            onClick={() => selectTheme(Themes[key])}
                            styles={{ marginRight: '1em' }}
                        >
                            {Themes[key] === theme ? '☑' : '☐'}
                        </Button>
                        {Themes[key]}
                    </p>
                ))}
            </View>
        )}
    </ThemeContext.Consumer>
);
