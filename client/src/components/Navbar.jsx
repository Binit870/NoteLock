import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Ensure this path is correct

export default function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-purple-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo/Brand */}
      <Link
        to="/dashboard"
        className="text-xl font-bold hover:text-purple-200 transition duration-200"
      >
        🗂️ NoteLock
      </Link>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Show username if available */}
        {user?.username && (
          <span className="text-sm sm:text-base font-medium text-white">
            👤 {user.username}
          </span>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-white text-purple-500 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition transform hover:scale-105 duration-300"
        >
          🔓 Logout
        </button>
      </div>
    </nav>
  );
}
