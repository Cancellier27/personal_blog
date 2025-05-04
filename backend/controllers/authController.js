import pool from "../config/db.js"
// const bcrypt = require("bcrypt")
import bcrypt from "bcrypt"

export async function login(req, res, next) {
  const {firstName, surname, userEmail, isLogged, isAdmin, passwordHash} =
    req.body
  try {
    bcrypt.genSalt(saltRounds, async function (err, salt) {
      bcrypt.hash(passwordHash, salt, async function (err, hash) {
        // store new user with hashed password
        const result = await pool.query(
          `INSERT INTO users (first_name, surname, user_email, is_logged, is_admin, password_hash) VALUES ('${firstName}', '${surname}', '${userEmail}', ${isLogged}, ${isAdmin}, '${hash}')`
        )
        res.status(201).json(result.rows[0])
      })
    })
  } catch (err) {
    next(err)
  }
}

export async function register(req, res, next) {
  const {firstName, surname, userEmail, isLogged, isAdmin, passwordHash} =
    req.body
  try {
    bcrypt.genSalt(saltRounds, async function (err, salt) {
      bcrypt.hash(passwordHash, salt, async function (err, hash) {
        // store new user with hashed password
        const result = await pool.query(
          `INSERT INTO users (first_name, surname, user_email, is_logged, is_admin, password_hash) VALUES ('${firstName}', '${surname}', '${userEmail}', ${isLogged}, ${isAdmin}, '${hash}')`
        )
        res.status(201).json(result.rows[0])
      })
    })
  } catch (err) {
    next(err)
  }
}

export async function passwordUpdate(req, res, next) {
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

export async function logout(req, res, next) {
  try {
    const {id} = req.body

    if (!id) {
      // No id was send from frontend
      return res.status(400).json({error: "Error while logging out"})
    }

    // update database
    await pool.query(`UPDATE users SET is_logged = false WHERE user_id = ${id};`)
    // send success response to frontend
    res.status(201).json(`User logged out successfully!`)
  } catch (err) {
    next(err)
  }
}
