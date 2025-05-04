import pool from '../config/db.js';

export async function getUsersList(req, res, next) {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}
