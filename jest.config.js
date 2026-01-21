module.exports = {
  preset: "react-native",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: ["**/__tests__/**/*.test.(ts|tsx|js|jsx)"],
  testPathIgnorePatterns: ["/node_modules/", "/app-example/"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@react-navigation|@gorhom|expo|expo-*|@expo|react-native-paper|@callstack/react-theme-provider)/)",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^@localization/(.*)$": "<rootDir>/localization/$1",
    "^@hooks/(.*)$": "<rootDir>/hooks/$1",
    "^@contexts/(.*)$": "<rootDir>/contexts/$1",
    "^@services/(.*)$": "<rootDir>/services/$1",
    "^@components/(.*)$": "<rootDir>/components/$1",
    "^@screens/(.*)$": "<rootDir>/screens/$1",
    "^@assets/(.*)$": "<rootDir>/assets/$1",
  },
  collectCoverageFrom: [
    "screens/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/app-example/**",
    "!**/*.d.ts",
  ],
  globals: {
    "ts-jest": {
      tsconfig: {
        jsx: "react",
      },
    },
  },
};
