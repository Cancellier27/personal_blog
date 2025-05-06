import axiosInstance from "./axios_instance"

export function getTodayDate() {
  let today = new Date()

  return today
    .toLocaleDateString("en-GB", {
      month: "short",
      day: "2-digit",
      year: "numeric"
    })
    .replace(",", "")
}

export function formatDate(date) {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]
  const year = date.slice(0, 4)
  const month = months[Number(date.slice(5, 7)) - 1]
  const day = date.slice(8, 10)

  return `${day} ${month} ${year}`
}

export function getUserLogged() {
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}

// get users
export async function getUsers() {
  try {
    const usersInformation = await axiosInstance.get("/users/usersList")
    return usersInformation.data
  } catch (error) {
    console.error("Error fetching the user list:", error)
  }
}

// get news
export async function getNews() {
  try {
    const newsInformation = await axiosInstance.get("/news/newsInformation")
    return newsInformation.data
  } catch (error) {
    console.error("Error fetching the news list:", error)
  }
}
