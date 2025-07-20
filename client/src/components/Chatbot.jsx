// components/Chatbot.js
import React, { useState } from 'react';
import API from '../services/api'; // Your Axios instance
import { useAuth } from '../context/AuthContext';

export default function Chatbot({ onSaveNote }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await API.post(
        '/api/ai/generate-note',
        { prompt: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const aiMessage = { sender: 'ai', text: res.data.content };
      setMessages((prev) => [...prev, aiMessage]);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      const errorMessage = { sender: 'ai', text: 'Sorry, I couldn\'t generate a note right now.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white shadow-xl rounded-lg border">
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-lg ${msg.sender === 'user' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}>
              {msg.text}
              {msg.sender === 'ai' && (
                <button
                  onClick={() => onSaveNote(msg.text)}
                  className="text-xs block mt-2 text-purple-600 font-bold"
                >
                  Save as Note
                </button>
              )}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-center">Thinking...</div>}
      </div>
      <div className="border-t p-2 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask me to create a note..."
          className="flex-1 px-3 py-2 border rounded-lg"
          disabled={isLoading}
        />
        <button onClick={handleSend} disabled={isLoading} className="bg-purple-600 text-white px-4 py-2 ml-2 rounded-lg">
          Send
        </button>
      </div>
    </div>
  );
}