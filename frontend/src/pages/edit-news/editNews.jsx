import {useEffect, useState} from "react"
import {useParams, useNavigate} from "react-router"
import "./editNews.css"
import axiosInstance from "../../tools/axios_instance"
import {getTodayDate, getNews} from "../../tools/utils"
import NavBar from "../../components/nav-bar/navBar"

import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

export default function EditNews() {
  const [authorName, setAuthorName] = useState("")
  const [loginClass, setLoginClass] = useState("")
  const [updateMsg, setUpdateMsg] = useState("")

  const [cardTitle, setCardTitle] = useState()
  const [cardDescription, setCardDescription] = useState()
  const [newsTitle, setNewsTitle] = useState()
  const [newsDescription, setNewsDescription] = useState()

  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    async function fetchNewsList() {
      const newsInformation = await getNews()
      const news = newsInformation.filter((news) => news.news_id === Number(params.newsId))[0]

      setCardTitle(news.card_title)
      setCardDescription(news.card_description)
      setNewsTitle(news.news_title)
      setNewsDescription(news.news_description)
      setAuthorName(news.author)
    }

    fetchNewsList()
  }, [])


  async function handleSubmit(event) {
    event.preventDefault()

    const areYouSureCheck = window.confirm(
      "Are you sure you want to update the news?"
    )
    if (!areYouSureCheck) return

    const newsForm = document.querySelector(".news-form")
    const publishDate = getTodayDate()

    try {
      await axiosInstance
        .put("/news/edit", {
          news_id: params.newsId,
          card_title: cardTitle,
          card_description: cardDescription,
          news_title: newsTitle,
          news_description: newsDescription,
          publish_date: publishDate,
          author: authorName
        })
        .then((res) => {
          setLoginClass("success-msg")
          setUpdateMsg("News updated successfully!")
          newsForm.reset()

          document.querySelector(".updateNewsBtn").disabled = true
          // reset the form after 1 seconds
          setTimeout(() => {
            document.querySelector(".updateNewsBtn").disabled = false
            setUpdateMsg("")
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
                onChange={(e) => setCardTitle(e.target.value)}
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
                onChange={(e) => setCardDescription(e.target.value)}
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
                onChange={(e) => setNewsTitle(e.target.value)}
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
                onChange={(e) => setNewsDescription(e.target.value)}
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
            <Button type="Submit" className="updateNewsBtn">Submit Form</Button>
          </Form>
          <p className={`news-created-msg ` + loginClass}> </p>
        </div>
      </div>
    </div>
  )
}
