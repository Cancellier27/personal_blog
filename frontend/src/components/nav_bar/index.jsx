import "./nav_bar.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
  faHouse,
  faMagnifyingGlass,
  faPaperPlane,
  faRightToBracket
} from "@fortawesome/free-solid-svg-icons"
import { NavLink } from "react-router"

export default function NavBar() {
  return (
    <aside id="aside-tab-container">
      <div>
        <h1 className="title-font nav-bar-title"> FCC </h1>
        <nav className="navigation-tag">
          <ul className="nav-items-container">
            <NavLink to="/" className="nav-item">
              <FontAwesomeIcon icon={faHouse} /> <p>Home</p>
            </NavLink>
            <li className="nav-item">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <p>Search</p>
            </li>
            <a className="nav-item">
              <FontAwesomeIcon icon={faPaperPlane} />
              <p>News</p>
            </a>
            <NavLink to="/login" className="nav-item">
            <FontAwesomeIcon icon={faRightToBracket} />
              <p>Login</p>
            </NavLink>
          </ul>
        </nav>
      </div>
      <footer>All rights reserved &#169; </footer>
    </aside>
  )
}
