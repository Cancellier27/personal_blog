export function getTodayDate() {
  let today = new Date()

  return today
    .toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric"
    })
    .replace(",", "")
}


export function getUser() {
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}