import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import bgImage from '../assets/note_bg.png'
export default function Dashboard() {
  const { token } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await API.get('/api/notes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [token]);

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    try {
      const res = await API.post(
        '/api/notes',
        { title: newNote },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes([res.data, ...notes]);
      setNewNote('');
    } catch (err) {
      setError('Failed to add note: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await API.delete(`/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter(note => note._id !== id));
    } catch (err) {
      setError('Failed to delete note: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div
      className="min-h-[calc(100vh-150px)] px-4 pt-8"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">📝 Your Notes</h1>

        <div className="flex gap-2 mb-6">
          <input
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a new note..."
            className="flex-1 px-3 py-2 border rounded-lg"
          />
          <button
            onClick={handleAddNote}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Add
          </button>
        </div>

        {loading && <p className="text-center text-gray-500 animate-pulse">Loading notes...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}
        {!loading && !error && notes.length === 0 && (
          <p className="text-center text-gray-500">You have no notes yet.</p>
        )}

        <ul className="space-y-3 mt-4">
          {notes.map(note => (
            <li
              key={note._id}
              className="bg-purple-50 border border-purple-200 p-4 rounded-lg shadow-sm hover:bg-purple-100 transition flex justify-between items-center"
            >
              <h3 className="font-semibold text-purple-800 text-lg">{note.title}</h3>
              <button
                onClick={() => handleDeleteNote(note._id)}
                className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg ml-4"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
