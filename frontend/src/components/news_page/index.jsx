import "./news_page.css"
import One_Piece from "../../images/One_Piece.jpg"
import NavBar from "../nav_bar"
import {useParams} from "react-router"
import {useEffect, useState} from "react"
import axios from "axios"

export default function NewsPage() {
  const [newsData, setNewsData] = useState("")
  const params = useParams()

  useEffect(() => {
    try {
      // fetch information from the news database
      axios.get("http://localhost:8000/newsInformation").then((res) => {
        Object.keys(res.data).forEach((key) => {
          let formattedTitle = res.data[key].card.title.split(" ").join("-")
          
          // Check if the data matches the params passes in the URL
          if (formattedTitle === params.newsId) {
            setNewsData(res.data[key].news)
          }
        })
      })
    } catch (err) {
      console.error(`An error happened fetching the news list`, err)
    }
  }, [])

  return (
    <div className="App">
      <NavBar />
      <div id="main-section-outermost-container">
        <header className="news-selection-header">
          <h1 className="news-selection-title news-title">
            {newsData.title}
          </h1>
          <div className="news-selection-author-data">
            <p>BY FILIPE COSTA</p>
            <p>POSTED: JAN 26 2025</p>
          </div>
        </header>
        <main className="news-selection-text-container">
          <img src={One_Piece} alt="One piece logo image" />
          <p>
            {newsData.description}
          </p>
        </main>
        <footer className="news-selection-footer-container">
          <h1 className="title-font">FCC</h1>
          <p>All rights reserved &#169;</p>
        </footer>
      </div>
    </div>
  )
}
