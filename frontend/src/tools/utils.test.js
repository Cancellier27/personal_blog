import {getTodayDate} from "./utils"

test("Test-1: get date", () => {
  expect(getTodayDate()).toBe("01 May 2025")
})

test("Test-2: typeof return", () => {
  const date = getTodayDate()
  expect(typeof date).toBe("string")
})

