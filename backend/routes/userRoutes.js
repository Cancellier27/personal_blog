const express = require("express")
const {getUsersList} = require("../controllers/userController.js")

const router = express.Router()

router.get("/usersList", getUsersList)

module.exports = router
