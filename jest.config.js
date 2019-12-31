module.exports = {
    collectCoverage: false,
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
    coverageDirectory: '.reports/coverage',
    coverageReporters: ['text', 'cobertura'],
    moduleNameMapper: {
        '\\.(css|scss)$': '<rootDir>/jest/esModuleProxy.js',
        '\\.(jpg|jpeg|gif|png|svg|webp)$': 'identity-obj-proxy',
        '~(.*)$': '<rootDir>/src/$1',
    },
    reporters: ['default', ['jest-junit', { outputDirectory: '.reports/junit' }]],
    setupFiles: ['<rootDir>/jest/init.js'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
};
