import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import("jest").Config} */
const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["<rootDir>/jest.setup.globals.ts", "<rootDir>/jest.setup.env.ts"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/e2e/",
  ],
  clearMocks: true,
};

const nextJestConfig = createJestConfig(customJestConfig);

const jestConfig = async (...args) => {
  const config = await nextJestConfig(...args);

  // MSW (and some of its deps like `until-async`) ship ESM, so we must allow
  // transforming those packages even when they live in node_modules.
  config.transformIgnorePatterns = [
    "/node_modules/(?!.pnpm)(?!(geist|msw|@mswjs|until-async)/)",
    "/node_modules/.pnpm/(?!(geist|msw|@mswjs|until-async)@)",
    "^.+\\.module\\.(css|sass|scss)$",
  ];

  return config;
};

export default jestConfig;