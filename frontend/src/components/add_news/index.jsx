import "./add_news.css"
import NavBar from "../nav_bar"
import axios from "axios"
import {useNavigate} from "react-router"
import {useEffect, useState} from "react"
import {getTodayDate, getUser} from "../../tools/utils"

import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

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
          <h2>Create a news:</h2>
          <br></br>
          <Form onSubmit={handleSubmit}>
            <Form.Label htmlFor="inputPassword5">Card Section</Form.Label>
            <FloatingLabel
              controlId="floatingTextarea"
              label="Card Title. (max 40 char)"
              className="mb-3"
              data-bs-theme="dark"
              
            >
              <Form.Control as="textarea" placeholder="Card Title (max 40 char)" maxLength={40}/>
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingTextarea"
              label="Card news brief description Card Title. (max 150 char)"
              className="mb-3"
              data-bs-theme="dark"
              maxLength="10"
            >
              <Form.Control
                as="input"
                placeholder="Card news brief description"
                maxLength={150}
              />
            </FloatingLabel>
            <Button type="">Upload Thumbnail</Button>
            <br></br>
            <br></br>
            <Form.Label htmlFor="inputPassword5">News Section</Form.Label>
            <FloatingLabel
              controlId="floatingTextarea"
              label="News Title. (max 100 char)"
              className="mb-3"
              data-bs-theme="dark"
            >
              <Form.Control as="textarea" placeholder="News Title" maxLength={100}/>
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingTextarea"
              label="News description"
              className="mb-3"
              data-bs-theme="dark"
            >
              <Form.Control
                as="textarea"
                placeholder="News description"
                style={{height: "100px"}}
              />
            </FloatingLabel>
            <Button type="">Upload Images</Button>
            <br></br>
            <br></br>
            <Button type="Submit">Submit Form</Button>
          </Form>
        </div>
      </div>
    </div>
  )
}
