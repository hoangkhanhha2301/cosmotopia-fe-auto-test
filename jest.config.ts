import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        useESM: true
      }
    ]
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|svg|webp|gif|bmp|ico)$':
      '<rootDir>/src/test/__mocks__/fileMock.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)\\.jsx$': '<rootDir>/src/$1.tsx',
    '^@/(.*)\\.js$': '<rootDir>/src/$1.tsx',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: [
    '**/src/test/**/*.(spec|test).[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ]
};

export default config;
