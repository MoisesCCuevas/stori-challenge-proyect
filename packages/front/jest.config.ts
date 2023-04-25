import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  modulePaths: ["<rootDir>/src"],
  moduleNameMapper: {
    '\\.(scss)$': 'identity-obj-proxy'
  },
  testPathIgnorePatterns: [
    '<rootDiv>/src/redux/reducers/'
  ]
}

export default config;
