import {useEffect, useState} from "react"
import axiosInstance from "./tools/axios_instance"
import "./App.css"
import NavBar from "./components/nav_bar"
import NewsCard from "./components/news_card"

import One_Piece from "./images/One_Piece.jpg"

function App() {
  const [news, setNews] = useState([])

  useEffect(() => {
    try {
      // check if a user is logged in
      axiosInstance.get("/newsInformation").then((res) => {
        setNews([...res.data])
      })
    } catch (err) {
      console.error(`F. An error happened fetching the news list`, err)
    }
  }, [])

  return (
    <div className="App">
      <NavBar />
      <div id="main-section-outermost-container">
        <section id="main-section-container">
          <h1 className="main-title title-font">Latest News</h1>
          {news.map((newsData, index) => {
            const newsId = newsData.card_title.split(" ").join("-") + "-" + newsData.news_id

            return (
              <NewsCard
                title={newsData.card_title}
                text={newsData.card_description}
                image={One_Piece}
                imgAlt={newsData.card_img_alt}
                newsId={newsId}
                key={index}
              />
            )
          })}
        </section>
        <footer id="footer-tag">Footer</footer>
      </div>
    </div>
  )
}

export default App
