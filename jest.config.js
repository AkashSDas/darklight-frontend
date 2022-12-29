// jest.config.js
module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleNameMapper: {
    "\\.(scss|sass|css)$": "identity-obj-proxy",
  },
};

// NextJS test config file
// https://github.com/vercel/next.js/blob/canary/examples/with-jest/jest.config.js
