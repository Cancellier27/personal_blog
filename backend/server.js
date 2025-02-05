const express = require("express")
const cors = require("cors")
const fs = require("fs")
const db = require("./DB/db.json")
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(cors())

// to get the users list
app.get("/login", (req, res) => {
  res.json(db.users)
})

// post to change the json db to isLogged 
app.post("/login/success", (req, res) => {
  const {user, loginStatus} = req.body
  db.users[user].isLogged = loginStatus
  fs.writeFileSync("./DB/db.json", JSON.stringify(db, null, 2))
  res.status(201).json(`${user} success login!`)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
