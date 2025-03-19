import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['**/?(*.)+(spec|test).ts'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/singleton.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!**/[_]*.ts','!**/*.d.ts', '!src/schemas/*.ts', '!src/config/*.ts', '!src/*.ts'],
  coverageReporters: ['lcov', 'text'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
};

export default config;
