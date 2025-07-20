import express from 'express';
import { verifyToken } from '../controllers/tokenController.js';

const router = express.Router();

router.get('/verify-token', verifyToken); // fallback/extra endpoint

export default router;
