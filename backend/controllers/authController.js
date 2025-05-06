const pool = require("../config/db.js")
const bcrypt = require("bcrypt")
const saltRounds = 10

const loadUsers = async () => {
  try {
    const result = await pool.query("SELECT * FROM users")
    return result.rows
  } catch (err) {
    console.error(err)
    res.status(500).send("Database error")
  }
}

async function login(req, res, next) {
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
    await pool.query(
      `UPDATE users SET is_logged = true WHERE user_id = ${user.user_id};`
    )

    res.status(200).json({
      message: "Login successful",
      userKey: `${user.first_name}-${user.user_id}`
    })
  } catch (error) {
    next(error)
  }
}

async function register(req, res, next) {
  try {
    const user = req.body
    bcrypt.genSalt(saltRounds, async function (err, salt) {
      bcrypt.hash(user.password_hash, salt, async function (err, hash) {
        // store new user with hashed password
        const result = await pool.query(
          `INSERT INTO users (
            first_name, surname, user_email, is_logged, is_admin, password_hash
            ) VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            user.first_name,
            user.surname,
            user.user_email,
            user.is_logged,
            user.is_admin,
            hash
          ]
        )

        res.status(200).json({message: "User registered successfully!"})
      })
    })
  } catch (err) {
    next(err)
  }
}

async function passwordUpdate(req, res, next) {
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
        await pool.query(
          `UPDATE users SET password_hash = '${hash}' WHERE user_email = '${userEmail}';`
        )
      })
    })

    res.status(200).json({
      message: "Password update successful!"
    })
  } catch (error) {
    next(error)
  }
}

async function logout(req, res, next) {
  try {
    const {id} = req.body

    if (!id) {
      // No id was send from frontend
      return res.status(400).json({error: "Error while logging out"})
    }

    // update database
    await pool.query(
      `UPDATE users SET is_logged = false WHERE user_id = ${id};`
    )
    // send success response to frontend
    res.status(201).json(`User logged out successfully!`)
  } catch (err) {
    next(err)
  }
}

module.exports = {login, register, passwordUpdate, logout}
