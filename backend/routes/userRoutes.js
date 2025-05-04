import express from 'express';
import { getUsersList } from '../controllers/userController.js';

const router = express.Router();

router.get('/usersList', getUsersList);

export default router;
