import pool from '../config/db.js';

export async function getNewsInformation(req, res, next) {
  try {
    const result = await pool.query('SELECT * FROM news');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}

export async function createNews(req, res, next) {
  try {
    const { title, content } = req.body;
    const result = await pool.query(
      'INSERT INTO news (title, content) VALUES ($1, $2) RETURNING *',
      [title, content]
    );
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function deleteNews(req, res, next) {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM news WHERE id = $1', [id]);
    res.send('News deleted');
  } catch (err) {
    next(err);
  }
}

export async function searchNews(req, res, next) {
  try {
    const { search } = req.query;
    const result = await pool.query(
      'SELECT * FROM news WHERE title ILIKE $1',
      [`%${search}%`]
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}
