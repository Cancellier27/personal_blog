import "./add_news.css"
import NavBar from "../nav_bar"
import axiosInstance from "../../tools/axios_instance"
import {useNavigate} from "react-router"
import {useEffect, useState} from "react"
import {getTodayDate, getUser} from "../../tools/utils"

import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

export default function AddNews() {
  const [authorName, setAuthorName] = useState("")
  const [loginClass, setLoginClass] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    // get current user key
    let currentUser = getUser()

    const getUserList = async () => {
      try {
        await axiosInstance.get("/userInformation").then((res) => {
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
    const newsCreatedMsg = document.querySelector(".news-created-msg")
    const newsForm = document.querySelector(".news-form")
    const cardTitle = document.querySelector(".card-title-input").value
    const cardDescription = document.querySelector(
      ".card-description-input"
    ).value
    const newsTitle = document.querySelector(".news-title-input").value
    const newsDescription = document.querySelector(
      ".news-description-input"
    ).value
    const publishDate = getTodayDate()

    try {
      await axiosInstance
        .post("/news/create", {
          cardTitle: cardTitle,
          cardDescription: cardDescription,
          newsTitle: newsTitle,
          newsDescription: newsDescription,
          publishDate: publishDate,
          authorName: authorName
        })
        .then((res) => {
          setLoginClass("success-msg")
          newsCreatedMsg.innerHTML = "New news successfully created!"

          // reset the form after 2 seconds
          setTimeout(() => {
            setLoginClass("")
            newsCreatedMsg.innerHTML = ""
            newsForm.reset()
          }, 2000)

        })
    } catch (error) {
      console.error("Error posting the news:", error)
    }

  }

  return (
    <div className="App">
      <NavBar />
      <div id="main-section-outermost-container">
        <div>
          <h2>Create a news:</h2>
          <br></br>
          <Form onSubmit={handleSubmit} className="news-form">
            <Form.Label htmlFor="inputPassword5">Card Section</Form.Label>
            <FloatingLabel
              controlId="floatingTextarea"
              label="Card Title. (max 40 char)"
              className="mb-3"
              data-bs-theme="dark"
            >
              <Form.Control
                required
                as="textarea"
                className="card-title-input"
                placeholder="Card Title (max 40 char)"
                maxLength={40}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingTextarea"
              label="Card news brief description Card Title. (max 150 char)"
              className="mb-3"
              data-bs-theme="dark"
              maxLength="10"
            >
              <Form.Control
                required
                as="input"
                className="card-description-input"
                placeholder="Card news brief description"
                maxLength={150}
              />
            </FloatingLabel>
            <Form.Group
              data-bs-theme="dark"
              controlId="formFile"
              className="mb-3 w-50"
            >
              <Form.Label>Upload thumbnail</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <hr></hr>
            <Form.Label htmlFor="inputPassword5">News Section</Form.Label>
            <FloatingLabel
              controlId="floatingTextarea"
              label="News Title. (max 100 char)"
              className="mb-3"
              data-bs-theme="dark"
            >
              <Form.Control
                required
                as="textarea"
                className="news-title-input"
                placeholder="News Title"
                maxLength={100}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingTextarea"
              label="News description"
              className="mb-3"
              data-bs-theme="dark"
            >
              <Form.Control
                required
                as="textarea"
                className="news-description-input"
                placeholder="News description"
                style={{height: "100px"}}
              />
            </FloatingLabel>
            <Form.Group
              data-bs-theme="dark"
              controlId="formFileMultiple"
              className="mb-3 w-50"
            >
              <Form.Label>Upload images</Form.Label>
              <Form.Control type="file" multiple />
            </Form.Group>
            <hr></hr>
            <Button type="Submit">Submit Form</Button>
          </Form>
          <p className={`news-created-msg ` + loginClass}> </p>
        </div>
      </div>
    </div>
  )
}
