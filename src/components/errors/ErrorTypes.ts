export enum ErrorTypes {
    'Error' = 'Error',
    'E404' = 'E404',
    'E500' = 'E500',
}

export class E404 extends Error {
    constructor(message) {
        super(message);
        this.name = ErrorTypes.E404;
    }
}

export class E500 extends Error {
    constructor(message) {
        super(message);
        this.name = ErrorTypes.E500;
    }
}
