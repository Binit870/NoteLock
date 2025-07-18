import React, { useState } from 'react';
import API from '../services/api';

import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ✅ Import useAuth

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Destructure login from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await API.post('/api/auth/login', form);


      // ✅ Save token & user (used in Navbar)
      login(res.data.token, res.data.user); // Make sure your backend sends user info!

      setSuccess('✅ Login successful! Redirecting to dashboard...');

      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-white to-blue-200 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-6 animate-pulse">
          Welcome Back 👋
        </h2>

        {error && (
          <p className="mb-4 text-red-600 text-sm text-center animate-bounce">
            {error}
          </p>
        )}

        {success && (
          <p className="mb-4 text-green-600 text-sm text-center animate-pulse">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transform transition hover:scale-105 duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="text-purple-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
