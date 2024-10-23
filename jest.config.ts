import type { Config } from 'jest';

const config: Config = {
  setupFiles: ['<rootDir>/jest.setup.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['./node_modules/', './lists/', './dist/'],
  collectCoverageFrom: ['./src/**'],
  coveragePathIgnorePatterns: ['./src/index.tsx'],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100
    }
  },
  clearMocks: true
};

export default {
  projects: [
    {
      ...config,
      displayName: 'unit',
      testMatch: ['<rootDir>/src/**/__tests__/*.{ts,jsx,tsx}']
    },
    {
      ...config,
      displayName: 'integration',
      testMatch: ['<rootDir>/src/**/__integration__/**/*.test.{ts,jsx,tsx}']
    }
  ],
  clearMocks: true
};
