import "./news_page.css"
import One_Piece from "../../images/One_Piece.jpg"
import NavBar from "../nav_bar"
import {useParams} from "react-router"
import {useEffect, useState} from "react"
import axios from "axios"

export default function NewsPage() {
  const [newsData, setNewsData] = useState(false)
  const params = useParams()

  useEffect(() => {
    const getNews = async () => {
      try {
        // fetch information from the news database
        await axios.get("http://localhost:8000/newsInformation").then((res) => {
          Object.keys(res.data).forEach((key) => {
            let formattedTitle = res.data[key].card.title.split(" ").join("-")

            // Check if the data matches the params passed in the URL
            if (formattedTitle === params.newsId) {
              setNewsData(res.data[key])
            }
          })
        })
      } catch (err) {
        console.error(`An error happened fetching the news list`, err)
      }
    }

    // Calls the async function
    getNews()
  }, [])

  return (
    <div className="App">
      <NavBar />
      {newsData && (
        <div id="main-section-outermost-container">
          <header className="news-selection-header">
            <h1 className="news-selection-title news-title">
              {newsData.news.title}
            </h1>
            <div className="news-selection-author-data">
              <p>{`BY ${newsData.author}`}</p>
              <p>{`POSTED: ${newsData.publishDate}`}</p>
            </div>
          </header>
          <main className="news-selection-text-container">
            <img src={One_Piece} alt={newsData.news.alt} />
            <p>{newsData.news.description}</p>
          </main>
          <footer className="news-selection-footer-container">
            <h1 className="title-font">FCC</h1>
            <p>All rights reserved &#169;</p>
          </footer>
        </div>
      )}
    </div>
  )
}
