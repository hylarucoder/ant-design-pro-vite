export default {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost:8000',
  },
  setupFiles: ['./tests/setupTests.jsx'],
  globals: {
    localStorage: null,
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
