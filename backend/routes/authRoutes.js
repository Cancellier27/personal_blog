import express from 'express';
import { login, register, passwordUpdate, logout } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/login/password-update', passwordUpdate);
router.post('/login/out', logout);

export default router;
