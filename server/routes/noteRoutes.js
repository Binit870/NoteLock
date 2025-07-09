import express from 'express';
import { getNotes, createNote } from '../controllers/noteController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.use(protect);
router.get('/', getNotes);
router.post('/', createNote);
export default router;
