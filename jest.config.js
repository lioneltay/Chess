// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  // An array of file extensions your modules use
  moduleFileExtensions: ["ts", "tsx", "js"],
  // The regexp pattern Jest uses to detect test files
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
}
