import type { Config } from "jest";

const config: Config = {
  verbose: true,
  projects: [
    {
      displayName: "Backend",
      cache: true,
      rootDir: "./apps/server/src",
      transform: {
        "^.+\\.(t|j)s$": "ts-jest",
      },
      testRegex: ".*\\.spec\\.ts$",
      moduleFileExtensions: ["js", "json", "ts"],
      collectCoverageFrom: ["**/*.(t|j)s"],
      coverageDirectory: "../coverage",
      testEnvironment: "node",
    },
    {
      displayName: "Backend e2e",
      cache: true,
      moduleFileExtensions: ["js", "json", "ts"],
      rootDir: "./apps/server/test",
      testEnvironment: "node",
      testRegex: ".e2e-spec.ts$",
      transform: {
        "^.+\\.(t|j)s$": "ts-jest",
      },
    },
  ],
};

export default config;
