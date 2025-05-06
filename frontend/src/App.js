import {useEffect, useState} from "react"
import axiosInstance from "./tools/axios_instance"
import "./App.css"
import NavBar from "./components/nav-bar/navBar.jsx"
import NewsCard from "./components/news-card/newsCard.jsx"

import One_Piece from "./images/One_Piece.jpg"
import Oblivion from "./images/oblivion.jpg"
import GTA6 from "./images/gta6.jpg"

function App() {
  const [news, setNews] = useState([])

  useEffect(() => {
    try {
      // check if a user is logged in
      axiosInstance.get("/news/newsInformation").then((res) => {
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
            let imageToUse
            if(newsData.card_img === "gta6") imageToUse = GTA6
            else if(newsData.card_img === "oblivion") imageToUse = Oblivion
            else if(newsData.card_img === "one_piece") imageToUse = One_Piece

            return (
              <NewsCard
                title={newsData.card_title}
                text={newsData.card_description}
                image={imageToUse}
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
