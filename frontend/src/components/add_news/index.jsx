import "./add_news.css"
import NavBar from "../nav_bar"
import axios from "axios"
import {useNavigate} from "react-router"
import {useEffect, useState} from "react"
import {getTodayDate, getUser} from "../../tools/utils"

export default function AddNews() {
  const [authorName, setAuthorName] = useState("")

  useEffect(() => {
    // get current user key 
    let currentUser = getUser()

    const getUserList = async () => {
      try {
        await axios.get("http://localhost:8000/userInformation").then((res) => {
          Object.keys(res.data).forEach((key) => {
            if (key === currentUser.userKey) {
              // get the current logged user name and surname
              setAuthorName(`${res.data[key].name} ${res.data[key].surname}`)
            }
          })
        })
      } catch (error) {
        console.error("Error fetching the user list:", error)
      }
    }

    // call async function
    getUserList()
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()

    let cardTitle = document.querySelector("#cardTitle").value
    let cardDescription = document.querySelector("#cardDescription").value
    let newsTitle = document.querySelector("#newsTitle").value
    let newsDescription = document.querySelector("#newsContent").value
    let publishDate = getTodayDate()

    // Create some safety measures in case a field is not populated.
    // post the information to the backend
  }

  return (
    <div className="App">
      <NavBar />
      <div id="main-section-outermost-container">
        <div>
          <form action="" className="add-news-form" onSubmit={handleSubmit}>
            <label htmlFor="cardTitle">Card Title</label>
            <input type="text" id="cardTitle" name="cardTitle" />
            <label htmlFor="cardDescription">Card news description</label>
            <textarea type="text" id="cardDescription" name="cardDescription" />
            <button type="button">Upload thumbnail</button>
            <br />
            <br />
            <label htmlFor="newsTitle">News Title</label>
            <input type="text" id="newsTitle" name="newsTitle" />
            <label htmlFor="newsContent">News Title</label>
            <textarea type="text" id="newsContent" name="newsContent" />
            <button type="button">Upload image</button>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}
