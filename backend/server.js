import express from "express"
import cors from "cors"
import bcrypt from "bcrypt"
const app = express()
const PORT = process.env.PORT || 8000
const saltRounds = 10

app.use(express.json())
app.use(cors())

import db from "./postgres_connect.js"

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
app.get("/newsInformation", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM news")
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).send("b. Database error while getting news list")
  }
})

// create a new news
app.post("/news/create", async (req, res) => {
  try {
    const news = req.body

    // update the is_logged status in the database
    await db.query(
      `INSERT INTO news (author, card_title, card_description, card_img, card_img_alt, news_title, news_description, news_img, news_img_alt, fk_user_id, publish_date)
      VALUES ('${news.author}', '${news.card_title}', '${news.card_description}', '${news.card_img}', '${news.card_img_alt}', '${news.news_title}','${news.news_description}','${news.news_img}', '${news.news_img_alt}', ${news.fk_user_id}, '${news.publish_date}');`
    )

    res.status(200).json({
      message: "News successfully created"
    })
  } catch (error) {
    res
      .status(500)
      .json({error: "Internal server error while creating new message .b"})
  }
})

// delete the news
app.delete("/news/delete/:id", async (req, res) => {
  const newsId = Number(req.params.id)

  await db.query(`DELETE FROM news WHERE news_id = ${newsId};`)

  res.status(200).json({message: "b. News deleted successfully from backend!"})
})

app.put("/news/edit", async (req, res) => {
  const {
    news_id,
    card_title,
    card_description,
    news_title,
    news_description,
    publish_date
  } = req.body

  await db.query(`UPDATE news 
    SET card_title = '${card_title}', card_description = '${card_description}', news_title = '${news_title}', news_description = '${news_description}', publish_date = '${publish_date}' 
    WHERE news_id = ${news_id};`)

  res.status(200).json({message: "b. News updated successfully!"})
})

// ------------- Search news and sort
app.get("/searchNews", async (req, res) => {
  const {search = "", sort = ""} = req.query
  const searchTerm = search.split("-").join(" ").trim()
  const sortBy = sort.split("-").join(" ").trim()
  const values = [`%${searchTerm}%`]
  console.log("sort 0")

  let query = "SELECT * FROM news"
  if (searchTerm && sortBy) {
    query += " WHERE news_title LIKE $1 ORDER BY " + sortBy
    console.log("sort 1")
  } else if (searchTerm) {
    query += " WHERE news_title LIKE $1"
    console.log("sort 2")
  } else if (sortBy) {
    query += " ORDER BY " + sortBy
    console.log("sort 3")
  }

  try {
    const result = await db.query(query, searchTerm ? values : [])
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).send("Database error while getting news list")
  }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
