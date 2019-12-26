import * as React from 'react';
import { ErrorMessage } from './ErrorMessage';
import { ErrorTypes } from './ErrorTypes';

interface IErrorBoundaryProps {
    children?: any;
}

interface IErrorBoundaryState {
    hasError: boolean;
    errorName: string;
}

export class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
    state = {
        hasError: false,
        errorName: '',
    };

    constructor(props) {
        super(props);
    }

    static getDerivedStateFromError(error) {
        let name = ErrorTypes[error.name] || ErrorTypes.Error;
        return { hasError: true, errorName: name };
    }

    componentDidCatch(error, errorInfo) {
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            switch (this.state.errorName) {
                case ErrorTypes.E404:
                    return <ErrorMessage>⚠ Not found</ErrorMessage>;
                case ErrorTypes.E500:
                case ErrorTypes.Error:
                default:
                    return <ErrorMessage>⚠ Something went wrong</ErrorMessage>;
            }
        } else return this.props.children;
    }
}
