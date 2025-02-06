import {useEffect, useState} from "react"
import axios from "axios"
import "./App.css"
import NavBar from "./components/nav_bar"
import NewsCard from "./components/news_card"

import One_Piece from "./images/One_Piece.jpg"

function App() {


  return (
    <div className="App">
      <NavBar/>
      <div id="main-section-outermost-container">
        <section id="main-section-container">
          <h1 className="main-title title-font">Latest News</h1>
          <NewsCard
            title={"One Piece News Title"}
            text={
              "One Piece brief message about summarizing the news. One Piece brief message about summarizing the news "
            }
            image={One_Piece}
            imgAlt={"One piece anime logo"}
          />
          <NewsCard
            title={"One Piece News Title 2"}
            text={"One Piece brief message about summarizing the news"}
            image={One_Piece}
            imgAlt={"One piece anime logo"}
          />
          <NewsCard
            title={"One Piece News Title 3"}
            text={"One Piece brief message about summarizing the news"}
            image={One_Piece}
            imgAlt={"One piece anime logo"}
          />
        </section>
        <footer id="footer-tag">Footer</footer>
  
      </div>
    </div>
  )
}

export default App
