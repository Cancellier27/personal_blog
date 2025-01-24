import "./App.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
  faHouse,
  faMagnifyingGlass,
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons"

function App() {
  return (
    <div className="App">
      <aside id="aside-tab-container">
        <div>
          <h1 className="main-title title-font"> FCC </h1>
          <nav className="navigation-tag">
            <ul className="nav-items-container">
              <a className="nav-item">
                <FontAwesomeIcon icon={faHouse} /> <p>Home</p>
              </a>
              <li className="nav-item">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <p>Search</p>
              </li>
              <a className="nav-item">
                <FontAwesomeIcon icon={faPaperPlane} />
                <p>News</p>
              </a>
            </ul>
          </nav>
        </div>
        <footer>All rights reserved &#169; </footer>
      </aside>
      <div id="main-section-outermost-container">
        <section id="main-section-container">Main section</section>
        <footer id="footer-tag">Footer</footer>
      </div>
    </div>
  )
}

export default App
