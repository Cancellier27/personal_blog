const express = require("express")
const cors = require("cors")
const fs = require("fs")
const https = require("https")
const usersDb = require("./DB/users.json")
const USERS_FILE = "./DB/users.json"
const newsDb = require("./DB/news.json")
const bcrypt = require("bcrypt")
const app = express()
const PORT = process.env.PORT || 8000
const saltRounds = 10

app.use(express.json())
app.use(cors())

// const sslOptions = {
//   key: fs.readFileSync("./key.pem"), // Load generated key
//   cert: fs.readFileSync("./cert.pem") // Load generated certificate
// }

// Middleware to force HTTPS
// app.use((req, res, next) => {
//   if (!req.secure && req.headers["x-forwarded-proto"] !== "https") {
//     return res.redirect("https://" + req.headers.host + req.url)
//   }
//   next()
// })

// connect to PorstgreSQL database connect
const db = require("./db")

app.get("/usersList", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users")
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).send("Database error")
  }
})

app.post("/login/register", async (req, res) => {
  const {firstName, surname, userEmail, isLogged, isAdmin, passwordHash} =
    req.body
  try {
    bcrypt.genSalt(saltRounds, async function (err, salt) {
      bcrypt.hash(passwordHash, salt, async function (err, hash) {
        // store new user with hashed password
        const result = await db.query(
          `INSERT INTO users (first_name, surname, user_email, is_logged, is_admin, password_hash) VALUES ('${firstName}', '${surname}', '${userEmail}', ${isLogged}, ${isAdmin}, '${hash}')`
        )
        res.status(201).json(result.rows[0])
      })
    })
  } catch (err) {
    console.error(err)
    res.status(500).send("Database error, user not created")
  }
})

const loadUsers = async () => {
  try {
    const result = await db.query("SELECT * FROM users")
    return result.rows
  } catch (err) {
    console.error(err)
    res.status(500).send("Database error")
  }
}

// // Save users to JSON file
// const saveUsers = (users) => {
//   fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
// }

// update the password the user based on the db list
app.post("/login/password-update", async (req, res) => {
  try {
    const {userEmail, password} = req.body

    if (!password || !userEmail) {
      return res.status(400).json({error: "Email or password are required"})
    }

    let users = await loadUsers()
    const user = users.find((user) => user.user_email === userEmail)

    if (!user) {
      return res.status(400).json({error: "Invalid email or password"})
    }

    bcrypt.genSalt(saltRounds, async function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        // Store new hash in your password DB.
        await db.query(
          `UPDATE users SET password_hash = '${hash}' WHERE user_email = '${userEmail}';`
        )
      })
    })

    res.status(200).json({
      message: "Password update successful!"
    })
  } catch (error) {
    res
      .status(500)
      .json({error: "Internal Server Error when updating password"})
  }
})

// Login the user based on the db list
app.post("/login", async (req, res) => {

  try {
    const {username, password} = req.body

    if (!password || !username) {
      return res.status(400).json({error: "Email or password are required"})
    }
    
    let users = await loadUsers()
    const user = users.find((user) => user.user_email === username)
    
    if (!user) {
      return res.status(400).json({error: "Invalid email or password"})
    }
    
    const isMatch = await bcrypt.compare(password, user.password_hash)
    if (!isMatch) {
      return res.status(400).json({error: "Invalid email or password"})
    }

    // update the is_logged status in the database
    await db.query(
      `UPDATE users SET is_logged = true WHERE user_id = ${user.user_id};`
    )

    res.status(200).json({
      message: "Login successful",
      userKey: `${user.first_name}-${user.user_id}`
    })
  } catch (error) {
    res.status(500).json({error: "Internal Server Error"})
  }
})

// post to change the json db to isLogged false
app.post("/login/out", async (req, res) => {
  const {id} = req.body

  if (!id) {
    // No id was send from frontend
    return res.status(400).json({error: "Error while logging out"})
  }

  // update database
  await db.query(`UPDATE users SET is_logged = false WHERE user_id = ${id};`)
  // send success response to frontend
  res.status(201).json(`User logged out successfully!`)
})

// to get the news list
app.get("/newsInformation", (req, res) => {
  res.json(newsDb)
})

// create a new news
app.post("/news/create", (req, res) => {
  const entries = Object.keys(newsDb)
  const [last] = entries.slice(-1)
  // create the new news id
  const newNewsId = `${last.split("-")[0]}-${Number(last.split("-")[1]) + 1}`

  newsDb[newNewsId] = {
    author: req.body.authorName,
    publishDate: req.body.publishDate,
    card: {
      title: req.body.cardTitle,
      description: req.body.cardDescription,
      thumbnail: "Path-to-card-image",
      alt: "One Piece Image"
    },
    news: {
      title: req.body.newsTitle,
      description: req.body.newsDescription,
      image: "Path-to-news-image",
      alt: "One Piece Image"
    }
  }

  fs.writeFileSync("./DB/news.json", JSON.stringify(newsDb, null, 2))
  res.status(201).json({message: "News created successfully!"})
})

// delete the news
app.delete("/news/delete/:id", (req, res) => {
  const newsId = req.params.id
  delete newsDb[newsId]
  console.log(newsDb)

  fs.writeFileSync("./DB/news.json", JSON.stringify(newsDb, null, 2))
  res.status(200).json({message: "News deleted successfully from backend!"})
})

app.put("/news/edit", (req, res) => {
  const newsId = req.body.newsId
  console.log(req.body)
  newsDb[newsId].card.title = req.body.cardTitle
  newsDb[newsId].card.description = req.body.cardDescription
  newsDb[newsId].news.title = req.body.newsTitle
  newsDb[newsId].news.description = req.body.newsDescription

  fs.writeFileSync("./DB/news.json", JSON.stringify(newsDb, null, 2))
  res.status(200).json({message: "News updated successfully!"})
})

// Run HTTPS Server on Port 3443
// https.createServer(sslOptions, app).listen(PORT, () => {
//   console.log(`Secure Express server running at https://localhost:${PORT}`)
// })

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
