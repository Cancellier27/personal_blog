import {NavLink, useNavigate} from "react-router"
import {useState, useEffect} from "react"
import "./navBar.css"
import axiosInstance from "../../tools/axios_instance"
import {getUserLogged} from "../../tools/utils"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
  faHouse,
  faMagnifyingGlass,
  faPaperPlane,
  faRightToBracket,
  faXmark,
  faUser,
  faFileLines,
  faPen
} from "@fortawesome/free-solid-svg-icons"

export default function NavBar() {
  const [isLogged, setIsLogged] = useState(["user", false])
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    let currentUser = getUserLogged()
    if (!currentUser) return

    try {
      // check if a user is logged in
      axiosInstance.get("/users/usersList").then((res) => {
        res.data.forEach((user) => {
          let key = `${user.first_name}-${user.user_id}`
          // set the is logged parameter to show more options
          if (key === currentUser) {
            setIsLogged([user.first_name, true, key])

            // Set the admin privilege to show more options
            if (user.is_admin) {
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
    
    let idNumber = Number(isLogged[2].split("-")[1])
    try {
      axiosInstance
        .post("/auth/logout", {
          id: idNumber
        })
        .then(() => {
          setIsLogged(["user", false])
          setIsAdmin(false)
          logoutUser()
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
            <NavLink to="/search-news" className="nav-item">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
              <p>Search</p>
            </NavLink>
            <NavLink to="/" className="nav-item">
              <FontAwesomeIcon icon={faPaperPlane} className="icon" />
              <p>News</p>
            </NavLink>
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
                  <p className="text-green"> {isLogged[0]} is online</p>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      <footer className="text-white"> Praise the sun! </footer>
    </aside>
  )
}
