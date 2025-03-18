import "./login.css"
import NavBar from "../nav_bar"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import axios from "axios"
import {useNavigate} from "react-router"


export default function LoginPage() {

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    // event.preventDefault()

    const username = document.querySelector(".email-label").value
    const password = document.querySelector(".password-label").value
    

    if (!password) {
      alert("Please enter a password!");
      return; 
    }

    // Login the user with encrypted password
    try {
      await axios.post("http://localhost:8000/login", {username, password: password.toString()})
      .then((res) => {
        navigate("/")
      })

    } catch (error) {
      console.error("Error!!:", error);
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
          </div>
        </div>
      </div>
    </div>
  )
}
