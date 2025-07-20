import React, { useEffect, useState, useCallback } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import bgImage from '../assets/note_bg.png';
import Chatbot from '../components/Chatbot'; // 👈 1. Import the Chatbot component

export default function Dashboard() {
  const { token } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State for adding a new note
  const [newNote, setNewNote] = useState('');

  // State for editing an existing note
  const [editId, setEditId] = useState(null);
  const [editedText, setEditedText] = useState('');

  // 👇 2. Add state to manage chatbot visibility
  const [showChatbot, setShowChatbot] = useState(false);

  // Centralized function to fetch notes
  const fetchNotes = useCallback(async () => {
    try {
      setError('');
      const res = await API.get('/api/notes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch notes.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchNotes();
    }
  }, [token, fetchNotes]);

  // 👇 3. Create a handler to receive content from the chatbot
  const handleSaveFromChatbot = (content) => {
    setNewNote(content); // Pre-fill the input field
    setShowChatbot(false); // Close the chatbot window
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    try {
      await API.post(
        '/api/notes',
        { title: newNote },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewNote('');
      fetchNotes();
    } catch (err) {
      setError('Failed to add note: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await API.delete(`/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotes();
    } catch (err) {
      setError('Failed to delete note: ' + (err.response?.data?.message || err.message));
    }
  };

  const startEdit = (id, currentTitle) => {
    setEditId(id);
    setEditedText(currentTitle);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditedText('');
  };

  const saveEdit = async (id) => {
    if (!editedText.trim()) return;
    try {
      await API.put(
        `/api/notes/${id}`,
        { title: editedText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditId(null);
      setEditedText('');
      fetchNotes();
    } catch (err) {
      setError('Failed to update note: ' + (err.response?.data?.message || err.message));
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
              className="bg-purple-50 border border-purple-300 p-4 sm:p-6 rounded-2xl shadow-md hover:bg-purple-100 transition-all"
            >
              {editId === note._id ? (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <input
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-lg"
                  />
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => saveEdit(note._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-400 text-white px-3 py-1 rounded-lg hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-purple-800 text-lg break-all mr-4">{note.title}</h3>
                  <div className="flex flex-shrink-0 gap-2">
                    <button
                      onClick={() => startEdit(note._id, note.title)}
                      className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note._id)}
                      className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* 👇 4. Add the Chatbot UI to the page */}
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-6 right-6 bg-purple-700 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-3xl hover:bg-purple-800 transition-transform transform hover:scale-110"
        aria-label="Toggle Chatbot"
      >
        🤖
      </button>

      {showChatbot && <Chatbot onSaveNote={handleSaveFromChatbot} />}
    </div>
  );
}