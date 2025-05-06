const pool = require("../config/db.js")

async function getNewsInformation(req, res, next) {
  try {
    const result = await pool.query("SELECT * FROM news")
    res.json(result.rows)
    return result.rows
  } catch (err) {
    next(err)
  }
}

async function createNews(req, res, next) {
  try {
    const news = req.body

    // update the is_logged status in the database
    await pool.query(
      `INSERT INTO news (
        author, card_title, card_description, card_img, card_img_alt,
        news_title, news_description, news_img, news_img_alt,
        fk_user_id, publish_date
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        news.author,
        news.card_title,
        news.card_description,
        news.card_img,
        news.card_img_alt,
        news.news_title,
        news.news_description,
        news.news_img,
        news.news_img_alt,
        news.fk_user_id,
        news.publish_date
      ]
    )

    res.status(200).json({
      message: "News successfully created"
    })
  } catch (err) {
    next(err)
  }
}

async function deleteNews(req, res, next) {
  try {
    const newsId = Number(req.params.id)

    await pool.query(`DELETE FROM news WHERE news_id = ${newsId};`)

    res
      .status(200)
      .json({message: "b. News deleted successfully from backend!"})
  } catch (err) {
    next(err)
  }
}

async function searchNews(req, res, next) {
  try {
    const {search = "", sort = ""} = req.query
    const searchTerm = search.split("-").join(" ").trim()
    const sortBy = sort.split("-").join(" ").trim()
    const values = [`%${searchTerm}%`]

    let query = "SELECT * FROM news"
    if (searchTerm && sortBy) {
      query += " WHERE news_title LIKE $1 ORDER BY " + sortBy
    } else if (searchTerm) {
      query += " WHERE news_title LIKE $1"
    } else if (sortBy) {
      query += " ORDER BY " + sortBy
    }

    const result = await pool.query(query, searchTerm ? values : [])
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).send("Database error while getting news list")
  }
}

async function updateNews(req, res, next) {
  try {
    const {
      news_id,
      card_title,
      card_description,
      news_title,
      news_description,
      publish_date
    } = req.body

    await pool.query(`UPDATE news 
      SET card_title = '${card_title}', card_description = '${card_description}', news_title = '${news_title}', news_description = '${news_description}', publish_date = '${publish_date}' 
      WHERE news_id = ${news_id};`)

    res.status(200).json({message: "b. News updated successfully!"})
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getNewsInformation,
  createNews,
  deleteNews,
  searchNews,
  updateNews
}
