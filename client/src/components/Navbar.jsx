import React from 'react';
// Make sure useLocation is imported
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import siteIcon from '../assets/notelock_icon.png';

export default function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  // This hook is the key to the solution
  const location = useLocation();

  // Styles for the two states
  const activeButton = "bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg shadow-md transition-colors";
  const inactiveButton = "font-semibold px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors";

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-purple-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
      
      <Link
        to={user ? "/dashboard" : "/"}
        className="flex items-center gap-3 text-xl font-bold hover:text-purple-200 transition duration-200"
      >
        <img src={siteIcon} alt="NoteLock Logo" className="h-9 w-9" />
        <span>NoteLock</span>
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          // --- Logged-in View ---
          <>
            <span className="text-sm sm:text-base font-medium text-white">
              👤 {user.username}
            </span>
            <button
              onClick={handleLogout}
              className="bg-white text-purple-500 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition transform hover:scale-105 duration-300"
            >
              🔓 Logout
            </button>
          </>
        ) : (
          // --- Logged-out View with the "Shifting" Style ---
          <>
            <Link 
              to="/" // CORRECTED: Was "/", now correctly points to "/login"
              className={location.pathname === '/' ? activeButton : inactiveButton}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className={location.pathname === '/register' ? activeButton : inactiveButton}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}