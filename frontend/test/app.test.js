const testFunc = require("../src/components/testComp")

test("Test-1: Without parameter", () => {
  expect(testFunc()).toBe("FILIPE")
})

test("Test-2: With parameter", () => {
  expect(testFunc("Hailey")).toBe("Hailey")
})

test("Test-3: With parameter", () => {
  expect(testFunc("Dyanne")).toBe("Dyanne")
})