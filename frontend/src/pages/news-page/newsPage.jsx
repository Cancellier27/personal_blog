import {useEffect, useState} from "react"
import {useParams} from "react-router"
import "./newsPage.css"
import axiosInstance from "../../tools/axios_instance"
import NavBar from "../../components/nav-bar/navBar"

import One_Piece from "../../images/One_Piece.jpg"

export default function NewsPage() {
  const [newsData, setNewsData] = useState()
  const params = useParams()

  useEffect(() => {
    const getNews = async () => {
      try {
        // fetch information from the news database
        await axiosInstance.get("/newsInformation").then((res) => {
          // const newsId = newsData.card_title.split(" ").join("-") + "-" + newsData.news_id
          res.data.forEach((news) => {
            let newsId = news.card_title.split(" ").join("-") + "-" + news.news_id

            // Check if the data matches the params passed in the URL
            if (newsId === params.newsId) {
              setNewsData(news)
            }
          })
        })
      } catch (err) {
        console.error(`f. An error happened fetching the news list`, err)
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
              {newsData.news_title}
            </h1>
            <div className="news-selection-author-data">
              <p>{`BY ${newsData.author}`}</p>
              <p>{`POSTED: ${newsData.publish_date}`}</p>
            </div>
          </header>
          <main className="news-selection-text-container">
            <img src={One_Piece} alt={newsData.news_img_alt} />
            <p>{newsData.news_description}</p>
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
