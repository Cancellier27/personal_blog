const express = require("express")
const {
  login,
  register,
  passwordUpdate,
  logout
} = require("../controllers/authController.js")

const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/login/password-update", passwordUpdate)
router.post("/logout", logout)

module.exports = router
