import "./App.css"

function App() {
  return (
    <div className="App">
      <aside id="nav-tab-container">
        <h1 className="main-title">FCC</h1>
        <nav className="navigation-tag">
          <ul>
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

// get the idea from the IGN website, starting from the latest news format.

export default App
