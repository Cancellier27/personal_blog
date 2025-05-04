import {useEffect, useState} from "react"
import {useNavigate} from "react-router"
import "./searchNews.css"
import axiosInstance from "../../tools/axios_instance"
import NavBar from "../../components/nav-bar/navBar"

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"

function SearchNews() {
  const [newsSearch, setNewsSearch] = useState("")
  const [filteredNews, setFilteredNews] = useState([])
  const [sortNews, setSortNews] = useState("")
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

  useEffect(() => {
    async function getInitialNews() {
      try {
        await axiosInstance.get("./newsInformation").then((res) => {
          setFilteredNews([...res.data])
        })
      } catch (err) {
        console.error("f. error while fetching the news data", err)
      }
    }

    getInitialNews()
  }, [])

  async function handleSearch() {
    try {
      const params = {}
      if (newsSearch) params.search = newsSearch.split(" ").join("-")
      if (sortNews) params.sort = sortNews

      const res = await axiosInstance.get("/searchNews", {params})
      setFilteredNews([...res.data])
    } catch (error) {
      console.error("Error while searching news", error)
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
            onChange={(e) => setSortNews(e.target.value)}
            value={sortNews}
            multiple={false}
          >
            <option value="">Sort by</option>
            <option value="publish_date-DESC">Newest</option>
            <option value="publish_date-ASC">Oldest</option>
            <option value="news_title-ASC">A - Z</option>
            <option value="news_title-DESC">Z - A</option>
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
