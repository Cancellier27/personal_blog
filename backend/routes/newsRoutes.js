import express from 'express';
import {
  getNewsInformation,
  createNews,
  deleteNews,
  searchNews
} from '../controllers/newsController.js';

const router = express.Router();

router.get('/newsInformation', getNewsInformation);
router.post('/news/create', createNews);
router.delete('/news/delete/:id', deleteNews);
router.get('/searchNews', searchNews);

export default router;
