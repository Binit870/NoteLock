// routes/aiRoutes.js
import express from 'express';
import { generateNoteContent } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/generate-note', protect, generateNoteContent);

export default router;