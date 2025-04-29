import "./login.css"
import NavBar from "../nav_bar"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import axiosInstance from "../../tools/axios_instance"
import {useNavigate} from "react-router"
import {useState} from "react"

export default function LoginPage() {
  const [loginClass, setLoginClass] = useState("")
  const [isRegistering, setIsRegistering] = useState(false)
  const navigate = useNavigate()

  const loginUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData))
  }

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
    console.log(username, password)

    // Login the user with encrypted password
    try {
      await axiosInstance
        .post("/login", {
          username,
          password: password.toString()
        })
        .then((res) => {
          setLoginClass("login-success-msg")
          loginMsg.innerHTML = "Success! Redirecting..."

          // When a user logs in, store their data in local storage:
          loginUser({userKey: res.data.userKey})

          document.querySelector(".loginBtn").disabled = true

          setTimeout(() => {
            navigate("/")
            document.querySelector(".loginBtn").disabled = false
          }, 1500)
        })
    } catch (error) {
      console.error("Error while Login!:", error)
    }
  }

  const handleUpdate = async (event) => {
    event.preventDefault()

    const username = document.querySelector(".email-label").value
    const password = document.querySelector(".password-label").value
    const loginMsg = document.querySelector(".login-msg")

    // check if a password was inserted
    if (!password || !username) {
      setLoginClass("error-msg")
      loginMsg.innerHTML = "Invalid email or password. Try again."
      return
    }

    // Login the user with encrypted password
    try {
      await axiosInstance
        .post("/login/password-update", {
          username,
          password: password.toString()
        })
        .then((res) => {
          setLoginClass("success-msg")
          loginMsg.innerHTML = "Password updated!"

          setTimeout(() => {
            loginMsg.innerHTML = ""
          }, 5000)
        })
    } catch (error) {
      console.error("Error trying to update Password!:", error)
    }
  }

  return (
    <div className="App">
      <NavBar />
      <div id="main-section-outermost-container">
        <div className="login-outermost-container">
          {!isRegistering && (
            <div className="login-user-login-container">
              <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="inputPassword5">Login</Form.Label>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3 text-white"
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
                  className="mb-3 text-white"
                >
                  <Form.Control
                    className="password-label"
                    type="password"
                    placeholder="Password"
                  />
                </FloatingLabel>
                <Button type="submit" className="loginBtn" >Login</Button>
                <Button
                  variant="success"
                  className="m-2"
                  onClick={handleUpdate}
                >
                  Update Password
                </Button>
                <Button
                  variant="success"
                  onClick={() => setIsRegistering(true)}
                >
                  Register
                </Button>
              </Form>

              <p className={`login-msg ` + loginClass}> </p>
            </div>
          )}

          {isRegistering && (
            <div className="login-user-login-container">
              <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="inputPassword5">Login</Form.Label>

                <FloatingLabel
                  controlId="floatingInput"
                  label="First Name"
                  className="mb-3 text-white"
                  data-bs-theme="dark"
                >
                  <Form.Control
                    className="register-name-label"
                    type="email"
                    placeholder="name@example.com"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingInput"
                  label="Surname"
                  className="mb-3 text-white"
                  data-bs-theme="dark"
                >
                  <Form.Control
                    className="register-surname-label"
                    type="email"
                    placeholder="name@example.com"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3 text-white"
                  data-bs-theme="dark"
                >
                  <Form.Control
                    className="register-email-label"
                    type="email"
                    placeholder="name@example.com"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingPassword"
                  label="Password"
                  data-bs-theme="dark"
                  className="mb-3 text-white"
                >
                  <Form.Control
                    className="register-password-label"
                    type="password"
                    placeholder="Password"
                  />
                </FloatingLabel>

                <Form.Check // prettier-ignore
                  type="switch"
                  id="custom-switch"
                  label="Admin Privileges"
                  className="mb-3 text-white"
                />

                <Button type="submit">Register</Button>
                <Button
                  variant="warning"
                  className="m-2"
                  onClick={() => setIsRegistering(false)}
                >
                  Return
                </Button>
              </Form>

              <p className={`login-msg ` + loginClass}> </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
