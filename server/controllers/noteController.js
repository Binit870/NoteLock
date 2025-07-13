import Note from '../models/Note.js';

export const getNotes = async (req, res) => {
  const notes = await Note.find({ userId: req.user.userId });
  res.json(notes);
};

export const createNote = async (req, res) => {
  const { title, encryptedContent } = req.body;
  const note = await Note.create({
    userId: req.user.userId,
    title,
    encryptedContent
  });
  res.status(201).json(note);
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Check ownership
    if (note.userId.toString() !== req.user.userId) {
      return res.status(401).json({ message: 'Not authorized to delete this note' });
    }

    await note.deleteOne();
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
