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
