import "./nav_bar.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
  faHouse,
  faMagnifyingGlass,
  faPaperPlane,
  faRightToBracket,
  faXmark,
  faUser,
  faFileLines,
  faTrash
} from "@fortawesome/free-solid-svg-icons"
import {NavLink} from "react-router"
import {useState, useEffect} from "react"
import axios from "axios"

export default function NavBar() {
  const [isLogged, setIsLogged] = useState(["user", false])

  useEffect(() => {
    try {
      // check if a user is logged in
      axios.get("http://localhost:8000/login").then((res) => {
        Object.entries(res.data).forEach(([user, value]) => {
          if (value.isLogged) {
            setIsLogged([value.name, true, user])
          }
        })
      })
    } catch (err) {
      console.error(`An error happened fetching the user list`, err)
    }
  }, [])

  function handleLogOut() {
    try {
      axios.post("http://localhost:8000/login/out", {
        user: isLogged[2],
        loginStatus: false
      }).then(() => {
        setIsLogged(["user", false])
      })

    } catch (err) {
      console.error(`An error happened posting the log out`, err)
    }
  }

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

            {isLogged[1] && (
              <>
                <li className="nav-item">
                <FontAwesomeIcon icon={faFileLines} />
                  <p> Add news</p>
                </li>
                <li className="nav-item">
                <FontAwesomeIcon icon={faTrash} />
                  <p> Delete news</p>
                </li>
                <li className="nav-item log-out-container" onClick={handleLogOut}>
                  <FontAwesomeIcon icon={faXmark} />
                  <p> Log out</p>
                </li>
                <li className="nav-item">
                  <FontAwesomeIcon icon={faUser} className="text-green" />
                  <p className="text-green"> {isLogged[0]} logged in</p>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      <footer>All rights reserved &#169; </footer>
    </aside>
  )
}
