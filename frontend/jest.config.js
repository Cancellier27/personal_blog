module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios)/" // 👈 allow transpiling axios
  ]
}
