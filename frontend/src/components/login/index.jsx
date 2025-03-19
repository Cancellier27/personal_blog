import "./login.css"
import NavBar from "../nav_bar"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import axios from "axios"
import {useNavigate} from "react-router"
import {useState} from "react"

export default function LoginPage() {
  const [LoginStatus, setLoginStatus] = useState(false)
  const [loginClass, setLoginClass] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const username = document.querySelector(".email-label").value
    const password = document.querySelector(".password-label").value
    const loginMsg = document.querySelector(".login-msg")

    // check if a password was inserted
    if (!password || !username) {
      setLoginClass("login-bad-msg")
      loginMsg.innerHTML = "Invalid email or password. Try again."
      return
    }

    // Login the user with encrypted password
    try {
      await axios
        .post("http://localhost:8000/login", {
          username,
          password: password.toString()
        })
        .then((res) => {
          setLoginStatus(true)
          setLoginClass("login-success-msg")
          loginMsg.innerHTML = "Success! Redirecting..."

          setTimeout(() => {
            navigate("/")
          }, 1500);
        })
    } catch (error) {
      console.error("Error!!:", error)
    }
  }

  return (
    <div className="App">
      <NavBar />
      <div id="main-section-outermost-container">
        <div className="login-outermost-container">
          <div className="login-user-login-container">
            <Form onSubmit={handleSubmit}>
              <Form.Label htmlFor="inputPassword5">Login</Form.Label>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
                data-bs-theme="dark"
              >
                <Form.Control
                  className="email-label"
                  type="email"
                  placeholder="name@example.com"
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
                data-bs-theme="dark"
                className="mb-3"
              >
                <Form.Control
                  className="password-label"
                  type="password"
                  placeholder="Password"
                />
              </FloatingLabel>
              <Button type="submit">Submit form</Button>
            </Form>

            
              <p className={`login-msg ` + loginClass}> </p>
            
          </div>
        </div>
      </div>
    </div>
  )
}
