import express from 'express';
import { getNotes, createNote, deleteNote } from '../controllers/noteController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getNotes);
router.post('/', createNote);
router.delete('/:id', (req, res, next) => {
  console.log('DELETE /api/notes/' + req.params.id);
  next();
}, deleteNote);
  // ✅ New route for deleting a note by ID

export default router;
