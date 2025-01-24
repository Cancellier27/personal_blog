import "./App.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faF } from '@fortawesome/free-solid-svg-icons'

function App() {
  return (
    <div className="App">
      <aside id="aside-tab-container">
        <h1 className="main-title title-font"> FCC </h1>
        <nav className="navigation-tag">
          <ul className="nav-items-container">
            <li className="nav-item">Home</li>
            <li className="nav-item">Search</li>
            <li className="nav-item">News</li>
          </ul>
        </nav>
        <footer>All right reserved </footer>
      </aside>
      <div id="main-section-outermost-container">
        <section id="main-section-container">Main section</section>
        <footer id="footer-tag">Footer</footer>
      </div>
    </div>
  )
}

export default App
