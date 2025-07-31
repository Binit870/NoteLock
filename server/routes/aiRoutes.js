// routes/aiRoutes.js
import express from 'express';
import {
  generateNoteContent,
  generateFromGemini, // 👈 import the new controller function
} from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Existing OpenAI route
router.post('/generate-note', protect, generateNoteContent);

// ✅ Add Gemini route here
router.post('/ai/gemini', protect, generateFromGemini);

export default router;
