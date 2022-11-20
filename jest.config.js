module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/coverage",
    "<rootDir>/dist",
  ],
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "components/**/*.{js,jsx,ts,tsx}",
    "lib/**/*.{js,jsx,ts,tsx}",
    "pages/**/*.{js,jsx,ts,tsx}",
  ],
  moduleNameMapper: {
    "@lib/(.*)": "<rootDir>/lib/$1",
    "@components/(.*)": "<rootDir>/components/$1",
    "@pages/(.*)": "<rootDir>/pages/$1",
    "@styles/(.*)": "<rootDir>/styles/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};
