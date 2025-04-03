import "./edit_news.css"
import NavBar from "../nav_bar"
import axiosInstance from "../../tools/axios_instance"
import {useEffect, useState} from "react"
import {getTodayDate, getNews, getUsers, getUserLogged} from "../../tools/utils"
import {useParams, useNavigate} from "react-router"

import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

export default function EditNews() {
  const [authorName, setAuthorName] = useState("")
  const [loginClass, setLoginClass] = useState("")
  const [cardTitle, setCardTitle] = useState()
  const [cardDescription, setCardDescription] = useState()
  const [newsTitle, setNewsTitle] = useState()
  const [newsDescription, setNewsDescription] = useState()

  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    async function fetchNewsList() {
      const newsInformation = await getNews()
      const news = newsInformation[params.newsId]

      setCardTitle(news.card.title)
      setCardDescription(news.card.description)
      setNewsTitle(news.news.title)
      setNewsDescription(news.news.description)
    }

    async function fetchUserList() {
      const userInformation = await getUsers()
      const currentUser = getUserLogged()

      Object.keys(userInformation).forEach((key) => {
        if (key === currentUser.userKey) {
          setAuthorName(
            `${userInformation[key].name} ${userInformation[key].surname}`
          )
        }
      })
    }

    fetchNewsList()
    fetchUserList()
  }, [])

  
  // Handle input changes
  const handleChangeCardTitle = (e) => {
    setCardTitle(e.target.value)
  }
  const handleChangeCardDesc = (e) => {
    setCardDescription(e.target.value)
  }
  const handleChangeNewsTitle = (e) => {
    setNewsTitle(e.target.value)
  }
  const handleChangeNewsDesc = (e) => {
    setNewsDescription(e.target.value)
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const areYouSureCheck = window.confirm(
      "Are you sure you want to update the news?"
    )
    if (!areYouSureCheck) return

    const newsCreatedMsg = document.querySelector(".news-created-msg")
    const newsForm = document.querySelector(".news-form")
    const publishDate = getTodayDate()

    try {
      await axiosInstance
        .put("/news/edit", {
          newsId: params.newsId,
          cardTitle: cardTitle,
          cardDescription: cardDescription,
          newsTitle: newsTitle,
          newsDescription: newsDescription,
          publishDate: publishDate,
          authorName: authorName
        })
        .then((res) => {
          setLoginClass("success-msg")
          newsCreatedMsg.innerHTML = "News updated successfully!"
          newsForm.reset()

          // reset the form after 1 seconds
          setTimeout(() => {
            newsCreatedMsg.innerHTML = ""
            setLoginClass("")
            navigate("/update-news")
          }, 1000)
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
          <h2>Update news:</h2>
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
                onChange={handleChangeCardTitle}
                value={cardTitle}
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
                as="textarea"
                className="card-description-input"
                placeholder="Card news brief description"
                maxLength={150}
                onChange={handleChangeCardDesc}
                value={cardDescription}
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
                onChange={handleChangeNewsTitle}
                value={newsTitle}
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
                onChange={handleChangeNewsDesc}
                value={newsDescription}
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
