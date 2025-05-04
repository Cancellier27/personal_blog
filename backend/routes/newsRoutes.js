const express = require("express")
const {
  getNewsInformation,
  createNews,
  deleteNews,
  searchNews,
  updateNews
} = require("../controllers/newsController.js")

const router = express.Router()

router.get("/newsInformation", getNewsInformation)
router.post("/create", createNews)
router.delete("/delete/:id", deleteNews)
router.put("/update", updateNews)
router.get("/searchNews", searchNews)

module.exports = router
