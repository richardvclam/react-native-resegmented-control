const jestPreset = require('@testing-library/react-native/jest-preset');
const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  preset: '@testing-library/react-native',
  ...tsjPreset,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: [
    ...jestPreset.setupFiles,
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  setupFilesAfterEnv: ['@testing-library/react-native/cleanup-after-each'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    '\\.(ts|tsx)$': 'ts-jest',
  },
};
