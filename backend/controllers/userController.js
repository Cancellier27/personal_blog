const pool = require("../config/db.js")

async function getUsersList(req, res, next) {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}

module.exports = {getUsersList}
