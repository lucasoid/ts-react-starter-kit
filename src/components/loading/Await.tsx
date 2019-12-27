import * as React from 'react';

interface IAwaitProps {
    loaded: boolean;
    renderFallback: Function;
    children?: any;
}

export const Await: React.FC<IAwaitProps> = props => {
    return props.loaded ? props.children : props.renderFallback();
};
