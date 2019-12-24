import * as React from 'react';
import { View } from '~components/Views/View';

export const About: React.FC<{}> = () => (
    <View>
        <h2>About</h2>
        <p>
            listshare is an app that helps you stay organized. Make a list, check it twice, and share it with people who
            need it. 🎅
        </p>
        <p>Built to demonstrate features of React 16.8+ and TypeScript.</p>
    </View>
);
