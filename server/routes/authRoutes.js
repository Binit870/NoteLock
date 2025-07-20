import express from 'express';
import { register, login, checkToken } from '../controllers/authController.js';
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/check', protect, checkToken); // frontend checks this to persist login

export default router;
