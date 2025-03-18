const express = require("express")
const cors = require("cors")
const fs = require("fs")
const db = require("./DB/db.json")
const USERS_FILE = "./DB/db.json"

const bcrypt = require("bcrypt")

const app = express()
const PORT = process.env.PORT || 8000
const saltRounds = 10

app.use(express.json())
app.use(cors())

const loadUsers = () => {
  try {
    if (!fs.existsSync(USERS_FILE)) {
      // Create an empty file if it doesn't exist
      fs.writeFileSync(USERS_FILE, JSON.stringify([]))
    }
    const data = fs.readFileSync(USERS_FILE)
    return JSON.parse(data)
  } catch (error) {
    console.error("Error loading users:", error)
    return [] // Return empty array on error
  }
}

// Save users to JSON file
const saveUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
}

// to get the users list
app.get("/information", (req, res) => {
  res.json(db)
})

// Login the user based on the db list
app.post("/login", async (req, res) => {
  try {
    const {username, password} = req.body

    if (!password || !username) {
      return res.status(400).json({error: "Email or password are required"})
    }

    let users = loadUsers()
    const userKey = Object.keys(users).find(
      (key) => users[key].email === username
    )
    if (!userKey) {
      return res.status(400).json({error: "Invalid email or password"})
    }

    const user = users[userKey]
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({error: "Invalid email or password"})
    }

    users[userKey].isLogged = true
    saveUsers(users)

    res
      .status(200)
      .json({
        message: "Login successful",
        user: {name: user.name, email: user.email}
      })
  } catch (error) {
    res.status(500).json({error: "Internal Server Error"})
  }
})

// post to change the json db to isLogged false
app.post("/login/out", (req, res) => {
  const {user, loginStatus} = req.body

  let users = loadUsers()
  users[user].isLogged = loginStatus
  
  saveUsers(users)

  res.status(201).json(`${user} logged out successfully!`)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
