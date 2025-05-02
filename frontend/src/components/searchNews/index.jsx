import {useEffect, useState} from "react"
import "./searchNews.css"
import NavBar from "../nav_bar"
import axiosInstance from "../../tools/axios_instance"
import {useNavigate} from "react-router"

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"

function SearchNews() {
  const [newsSearch, setNewsSearch] = useState("")
  const [filteredNews, setFilteredNews] = useState([])
  const navigate = useNavigate()

  const SearchCard = ({news_title, news_author, news_date, newsId}) => {
    return (
      <div
        className="search-card"
        news-id={1}
        onClick={() => navigate(`/news/${newsId}`)}
      >
        <div className="search-card-news">
          <p>{news_title}</p>
        </div>
        <div className="search-card-author">
          <p>{news_author}</p>
        </div>
        <div className="search-card-publish-date">
          <p>{news_date}</p>
        </div>
      </div>
    )
  }

  async function handleSearch() {
    try {
      await axiosInstance.get("/newsInformation").then((res, req) => {
        setFilteredNews([...res.data])
      })
    } catch (error) {
      console.error("f. Error while searching news", error)
    }
  }

  return (
    <div className="App">
      <NavBar />
      <div id="main-section-outermost-container">
        <section id="main-section-container">
          <h1 className="main-title title-font">Search</h1>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Keyword"
              aria-label="Keyword"
              aria-describedby="basic-addon2"
              data-bs-theme="dark"
              onChange={(e) => setNewsSearch(e.target.value)}
              value={newsSearch}
            />
            <Button
              variant="secondary"
              id="button-addon2"
              onClick={handleSearch}
            >
              Search
            </Button>
          </InputGroup>

          <Form.Select
            aria-label="Default select example"
            data-bs-theme="dark"
            style={{width: "150px"}}
          >
            <option>Sort</option>
            <option value="1">Newest</option>
            <option value="2">Oldest</option>
            <option value="3">A - Z</option>
            <option value="4">Z - A</option>
          </Form.Select>

          <div className="search-container">
            <div className="search-card-title">
              <div className="search-card-news">
                <p>News Title</p>
              </div>
              <div className="search-card-author">
                <p>Author</p>
              </div>
              <div className="search-card-publish-date">
                <p>Date</p>
              </div>
            </div>

            {filteredNews.map((news) => {
              let newsId = `${news.card_title.split(" ").join("-")}-${
                news.news_id
              }`
              return (
                <SearchCard
                  news_title={news.news_title}
                  news_author={news.author}
                  news_date={news.publish_date}
                  newsId={newsId}
                  key={news.news_id}
                />
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

export default SearchNews
