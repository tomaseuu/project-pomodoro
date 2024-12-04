export default {

  testEnvironment: "node",

  transform: {
    "^.+\\.js$": "babel-jest",
  },

  clearMocks: true,

  testTimeout: 10000,

  testMatch: ["**/*.test.js"],
};