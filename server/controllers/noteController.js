import Note from '../models/Note.js';

// Get all notes for the authenticated user
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notes' });
  }
};

// Create a new note
export const createNote = async (req, res) => {
  const { title } = req.body; // Changed: Only expect 'title'

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const note = await Note.create({
      userId: req.user.userId,
      title, // Changed: Only save 'title'
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create note' });
  }
};

// Update an existing note
export const updateNote = async (req, res) => {
  const { title } = req.body; // Changed: Only expect 'title'

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.userId.toString() !== req.user.userId) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    note.title = title;
    const updatedNote = await note.save();
    
    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update note' });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.userId.toString() !== req.user.userId) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await note.deleteOne();
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete note' });
  }
};