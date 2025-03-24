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
  faTrash,
  faPen
} from "@fortawesome/free-solid-svg-icons"
import {NavLink, useNavigate} from "react-router"
import {useState, useEffect} from "react"
import axiosInstance from "../../tools/axios_instance"
import {getUser} from "../../tools/utils"

export default function NavBar() {
  const [isLogged, setIsLogged] = useState(["user", false])
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    let currentUser = getUser()
    if (!currentUser) return

    try {
      // check if a user is logged in
      axiosInstance.get("/userInformation").then((res) => {
        Object.keys(res.data).forEach((key) => {
          // set the is logged parameter to show more options
          if (key === currentUser.userKey) {
            setIsLogged([res.data[key].name, true, key])

            // Set the admin privilege to show more options
            if (res.data[key].isAdmin) {
              setIsAdmin(true)
            }
          }
        })
      })
    } catch (err) {
      console.error(`An error happened fetching the user list`, err)
    }
  }, [])

  const logoutUser = () => {
    localStorage.removeItem("user")
  }

  function handleLogOut() {
    try {
      axiosInstance
        .post("/login/out", {
          user: isLogged[2],
          loginStatus: false
        })
        .then(() => {
          setIsLogged(["user", false])
          setIsAdmin(false)

          // When the user logs out, clear the storage:
          logoutUser()
          navigate("/")
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
              <FontAwesomeIcon className="icon" icon={faHouse} /> <p>Home</p>
            </NavLink>
            <li className="nav-item">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
              <p>Search</p>
            </li>
            <a className="nav-item">
              <FontAwesomeIcon icon={faPaperPlane} className="icon" />
              <p>News</p>
            </a>
            <NavLink to="/login" className="nav-item">
              <FontAwesomeIcon icon={faRightToBracket} className="icon" />
              <p>Login</p>
            </NavLink>

            {isLogged[1] && isAdmin && (
              <>
                <NavLink to="/add-news" className="nav-item">
                  <FontAwesomeIcon icon={faFileLines} className="icon" />
                  <p> Add news</p>
                </NavLink>
                <NavLink to="/update-news" className="nav-item">
                  <FontAwesomeIcon icon={faPen} className="icon" />
                  <p> Update news</p>
                </NavLink>
              </>
            )}

            {isLogged[1] && (
              <>
                <li
                  className="nav-item log-out-container"
                  onClick={handleLogOut}
                >
                  <FontAwesomeIcon icon={faXmark} className="log-out-icon" />
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
