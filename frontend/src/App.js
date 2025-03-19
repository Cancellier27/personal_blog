import {useEffect, useState} from "react"
import axios from "axios"
import "./App.css"
import NavBar from "./components/nav_bar"
import NewsCard from "./components/news_card"

import One_Piece from "./images/One_Piece.jpg"

function App() {
  const [news, setNews] = useState([])

  useEffect(() => {
    // empty the news array
    setNews([])
    try {
      // check if a user is logged in
      axios.get("http://localhost:8000/newsInformation").then((res) => {
        Object.keys(res.data).forEach((key) => {
          // create a news array with the updated news from backend
          setNews([...news, res.data[key]])
        })
      })
    } catch (err) {
      console.error(`An error happened fetching the user list`, err)
    }
  }, [])

  return (
    <div className="App">
      <NavBar />
      <div id="main-section-outermost-container">
        <section id="main-section-container">
          <h1 className="main-title title-font">Latest News</h1>
          {news.map((item, index) => {
            return (
              <NewsCard
              title={item.card.title}
              text={item.card.description}
              image={One_Piece}
              imgAlt={item.card.title}
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
