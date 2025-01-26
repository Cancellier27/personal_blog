import "./news_page.css"
import One_Piece from "../../images/One_Piece.jpg"
import NavBar from "../nav_bar"

export default function NewsPage() {
  return (
    <div className="App">
      <NavBar />
      <div id="main-section-outermost-container">
        <header className="news-selection-header">
          <h1 className="news-selection-title news-title">
            One Piece new arc starts! Elbaf, land of giants!
          </h1>
          <div className="news-selection-author-data">
            <p>BY FILIPE COSTA</p>
            <p>POSTED: JAN 26 2025</p>
          </div>
        </header>
        <main className="news-selection-text-container">
          <img src={One_Piece} alt="One piece logo image" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
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
