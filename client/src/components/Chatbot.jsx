import React, { useState, useEffect, useRef } from 'react';
import API from '../services/api'; // Your Axios instance
import { useAuth } from '../context/AuthContext';

export default function Chatbot({ onSaveNote, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


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
    // Added z-index to ensure it floats on top of other content
    <div className="fixed bottom-24 right-4 w-full max-w-md bg-white shadow-2xl rounded-lg border border-gray-300 z-50 flex flex-col">
      {/* Chatbot Header with Title and Close Button */}
      <div className="flex justify-between items-center p-3 border-b bg-purple-600 text-white rounded-t-lg">
        <h3 className="font-bold text-lg">AI Assistant</h3>
        <button
          onClick={onClose}
          className="text-white hover:text-purple-200 text-2xl font-bold leading-none"
          aria-label="Close chat"
        >
          &times;
        </button>
      </div>

      {/* Messages container */}
      <div className="flex-1 h-80 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-lg max-w-xs break-words ${msg.sender === 'user' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}>
              <p>{msg.text}</p>
              {msg.sender === 'ai' && !isLoading && (
                <button
                  onClick={() => onSaveNote(msg.text)}
                  className="text-xs block mt-2 text-purple-700 font-bold hover:underline"
                >
                  Save as Note
                </button>
              )}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-center text-gray-500">Thinking...</div>}
        {/* Empty div to help with scrolling to the bottom */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t p-2 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask me to create a note..."
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          disabled={isLoading}
        />
        <button onClick={handleSend} disabled={isLoading} className="bg-purple-600 text-white px-4 py-2 ml-2 rounded-lg hover:bg-purple-700 disabled:bg-purple-300">
          Send
        </button>
      </div>
    </div>
  );
}