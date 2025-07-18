import express from 'express';
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote
} from '../controllers/noteController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Middleware to protect all routes
router.use(protect);

// GET /api/notes - Get all notes
router.get('/', getNotes);

// POST /api/notes - Create a new note
router.post('/', createNote);

// PUT /api/notes/:id - Update a note (edit/save)
router.put('/:id', updateNote);

// DELETE /api/notes/:id - Delete a note (with console log)
router.delete('/:id', (req, res, next) => {
  console.log('DELETE /api/notes/' + req.params.id);
  next();
}, deleteNote);

export default router;
