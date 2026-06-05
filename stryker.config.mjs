// // @ts-check
// /** @type {import('@stryker-mutator/core').PartialStrykerOptions} */
// export default {
//   testRunner: "vitest",
//   coverageAnalysis: "perTest",
//   mutate: [
//     "utils/validators.ts",
//     "utils/session.ts"
//   ],
//   vitest: {
//     configFile: "vitest.config.ts"
//   },
//   reporters: ["html", "clear-text", "progress"],
//   htmlReporter: {
//     fileName: "reports/mutation/index.html"
//   }
// };

// @ts-check
export default {
  testRunner: "vitest",
  coverageAnalysis: "perTest",
  mutate: [
    "utils/validators.ts",
    "utils/session.ts"
  ],
  vitest: {
    configFile: "vitest.config.ts"
  },
  reporters: ["html", "clear-text", "progress"],
  htmlReporter: {
    fileName: "reports/mutation/index.html"
  }
};