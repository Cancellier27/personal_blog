import {useState} from "react"
import {useNavigate} from "react-router"
import "./login.css"
import axiosInstance from "../../tools/axios_instance"
import NavBar from "../../components/nav-bar/navBar"

import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

export default function LoginPage() {
  const [loginClass, setLoginClass] = useState("")
  const [loginMsg, setLoginMsg] = useState("")
  const [registerMsg, setRegisterMsg] = useState("")

  const [emailLogin, setEmailLogin] = useState("")
  const [passwordLogin, setPasswordLogin] = useState("")

  const [isRegistering, setIsRegistering] = useState(false)
  const [firstNameRegister, setFirstNameRegister] = useState("")
  const [surnameRegister, setSurnameRegister] = useState("")
  const [emailRegister, setEmailRegister] = useState("")
  const [passwordRegister, setPasswordRegister] = useState("")
  const [adminRegister, setAdminRegister] = useState(false)

  const navigate = useNavigate()

  const loginUserOnLocalStorage = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const showLoginErrorMsg = () => {
    setLoginClass("error-msg")
    setLoginMsg("Invalid email or password. Try again.")
  }

  const showLoginSuccessMsg = (toNavigate, time = 1500, msg = "") => {
    setLoginClass("success-msg")
    setLoginMsg(msg ? msg : "Success, Redirecting...")

    document.querySelector(".loginBtn").disabled = true

    setTimeout(() => {
      if (toNavigate) navigate("/")
      document.querySelector(".loginBtn").disabled = false
    }, time)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // check if a password was inserted and update the login message
    if (!passwordLogin || !emailLogin) {
      showLoginErrorMsg()
      return
    }

    // Login the user with encrypted password
    try {
      await axiosInstance
        .post("/auth/login", {
          username: emailLogin,
          password: passwordLogin.toString()
        })
        .then((res) => {
          // When a user logs in, store their data in local storage:
          loginUserOnLocalStorage(res.data.userKey)
          showLoginSuccessMsg(true)
        })
    } catch (error) {
      console.error("Error while Login!:", error.response.data.error)
      showLoginErrorMsg()
    }
  }

  const handleUpdate = async (event) => {
    event.preventDefault()

    // check if a password was inserted and update the login message
    if (!passwordLogin || !emailLogin) {
      showLoginErrorMsg()
      return
    }

    // Login the user with encrypted password
    try {
      await axiosInstance
        .post("/auth/login/password-update", {
          userEmail: emailLogin,
          password: passwordLogin.toString()
        })
        .then((res) => {
          showLoginSuccessMsg(false, 0, "Password updated!")
        })
    } catch (error) {
      console.error("Error trying to update Password!:", error)
    }
  }

  const handleRegister = async (event) => {
    event.preventDefault()

    if (
      !firstNameRegister ||
      !surnameRegister ||
      !emailRegister ||
      !passwordRegister
    ) {
      setLoginClass("error-msg")
      setRegisterMsg("Please fill all the areas. Try again.")
      return
    }

    try {
      await axiosInstance
        .post("/auth/register", {
          first_name: firstNameRegister,
          surname: surnameRegister,
          user_email: emailRegister,
          is_logged: false,
          is_admin: adminRegister,
          password_hash: passwordRegister.toString()
        })
        .then((res) => {
          console.log("user added")
          // update the login message
          document.querySelector(".register-btn").disabled = true
          setLoginClass("success-msg")
          setRegisterMsg("User successfully registered!")

          setTimeout(() => {
            document.querySelector(".register-btn").disabled = false
            setIsRegistering(false)
            setRegisterMsg("")
          }, 1500)
        })
    } catch (error) {
      console.error("Error while Login!:", error)
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
                  value={emailLogin}
                  onChange={(e) => setEmailLogin(e.target.value)}
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
                  value={passwordLogin}
                  onChange={(e) => setPasswordLogin(e.target.value)}
                >
                  <Form.Control
                    className="password-label"
                    type="password"
                    placeholder="Password"
                  />
                </FloatingLabel>
                <Button type="submit" className="loginBtn">
                  Login
                </Button>
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

              <p className={`login-msg ` + loginClass}>{loginMsg}</p>
            </div>
          )}

          {isRegistering && (
            <div className="login-user-login-container">
              <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="inputPassword5">Login</Form.Label>

                <FloatingLabel
                  label="First Name"
                  className="mb-3 text-white"
                  data-bs-theme="dark"
                  value={firstNameRegister}
                  onChange={(e) => setFirstNameRegister(e.target.value)}
                >
                  <Form.Control
                    className="register-name-label"
                    type="text"
                    placeholder="name@example.com"
                  />
                </FloatingLabel>

                <FloatingLabel
                  label="Surname"
                  className="mb-3 text-white"
                  data-bs-theme="dark"
                  value={surnameRegister}
                  onChange={(e) => setSurnameRegister(e.target.value)}
                >
                  <Form.Control
                    className="register-surname-label"
                    type="text"
                    placeholder="name@example.com"
                  />
                </FloatingLabel>

                <FloatingLabel
                  label="Email address"
                  className="mb-3 text-white"
                  data-bs-theme="dark"
                  value={emailRegister}
                  onChange={(e) => setEmailRegister(e.target.value)}
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
                  value={passwordRegister}
                  onChange={(e) => setPasswordRegister(e.target.value)}
                >
                  <Form.Control
                    className="register-password-label"
                    type="password"
                    placeholder="Password"
                  />
                </FloatingLabel>

                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Admin Privileges"
                  className="mb-3 text-white register-password-switch"
                  checked={adminRegister}
                  onChange={(e) => setAdminRegister(e.target.checked)}
                />

                <Button
                  type="submit"
                  onClick={handleRegister}
                  className="register-btn"
                >
                  Register
                </Button>
                <Button
                  variant="warning"
                  className="m-2"
                  onClick={() => setIsRegistering(false)}
                >
                  Return
                </Button>
              </Form>

              <p className={`login-msg ` + loginClass}>{registerMsg}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
