import {useEffect, useState} from "react"
import "./addNews.css"
import axiosInstance from "../../tools/axios_instance"
import {getTodayDate, getUserLogged} from "../../tools/utils"
import NavBar from "../../components/nav-bar/navBar"

import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

export default function AddNews() {
  const [authorName, setAuthorName] = useState("")
  const [loginClass, setLoginClass] = useState("")
  const [newsMessage, setNewsMessage] = useState("")

  const [cardTitle, setCardTitle] = useState("")
  const [cardDescription, setCardDescription] = useState("")
  const [newsTitle, setNewsTitle] = useState("")
  const [newsDescription, setNewsDescription] = useState("")

  useEffect(() => {
    const getUserList = async () => {
      // get current user key
      let currentUser = getUserLogged()

      try {
        await axiosInstance.get("/users/usersList").then((res) => {
          res.data.forEach((user) => {
            const key = `${user.first_name}-${user.user_id}`
            if (key === currentUser) {
              // get the current logged user name and surname
              setAuthorName(`${user.first_name} ${user.surname}`)
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
    const newsForm = document.querySelector(".news-form")
    let currentUser = getUserLogged()
    const publishDate = getTodayDate()
    try {
      await axiosInstance
        .post("/news/create", {
          card_title: cardTitle,
          card_description: cardDescription,
          card_img: "Path-to-card-image",
          card_img_alt: "card image alt",
          news_title: newsTitle,
          news_description: newsDescription,
          news_img: "Path-to-news-image",
          news_img_alt: "news image alt",
          publish_date: publishDate,
          author: authorName,
          fk_user_id: Number(currentUser.split("-")[1]),
        })
        .then((res) => {
          // show success message
          setLoginClass("success-msg")
          setNewsMessage("New news successfully created!")

          document.querySelector(".addNewsBtn").disabled = true

          // reset the form after 2 seconds
          setTimeout(() => {
            document.querySelector(".addNewsBtn").disabled = false
            setLoginClass("")
            setNewsMessage("")
            newsForm.reset()
          }, 1000)
        })
    } catch (error) {
      console.error("f.  Error posting the news:", error)
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
              onChange={(e) => setCardTitle(e.target.value)}
              value={cardTitle}
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
              onChange={(e) => setCardDescription(e.target.value)}
              value={cardDescription}
            >
              <Form.Control
                required
                as="textarea"
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
              onChange={(e) => setNewsTitle(e.target.value)}
              value={newsTitle}
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
              onChange={(e) => setNewsDescription(e.target.value)}
              value={newsDescription}
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
            <Button type="Submit" className="addNewsBtn">Submit Form</Button>
          </Form>
          <p className={`news-created-msg ` + loginClass}>{newsMessage}</p>
        </div>
      </div>
    </div>
  )
}
