import axiosInstance from "./axios_instance"

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

export function getUserLogged() {
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}

// get users
export async function getUsers() {
  try {
    const usersInformation = await axiosInstance.get("/userInformation")
    return usersInformation.data
  } catch (error) {
    console.error("Error fetching the user list:", error)
  }
}

// get news
export async function getNews() {
  try {
    const newsInformation = await axiosInstance.get("/newsInformation")
    return newsInformation.data
  } catch (error) {
    console.error("Error fetching the news list:", error)
  }
}
