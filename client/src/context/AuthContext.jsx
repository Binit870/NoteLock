import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the context to be shared across the application
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // State for token, user data, and initial loading status
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start as true to wait for validation

  // This effect runs once when the app loads to check for a valid session
  useEffect(() => {
    const validateToken = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      // If no token exists, no need to check; stop loading
      if (!storedToken || !storedUser) {
        setLoading(false);
        return;
      }

      try {
        // Fetch from your backend to verify the token is still valid
        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const res = await fetch(`${baseUrl}/api/auth/check`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        // If token is expired or invalid on the server, throw an error
        if (!res.ok) throw new Error('Token validation failed on server');
        
        const data = await res.json();

        // If the backend confirms authentication, update the state
        if (data.authenticated) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        } else {
          logout(); // Otherwise, log the user out
        }

      } catch (error) {
        console.error('Session validation failed:', error);
        logout(); // On any error, clear the invalid session
      } finally {
        // The check is complete, so allow the app to render
        setLoading(false);
      }
    };

    validateToken();
  }, []); // The empty dependency array ensures this runs only once on mount

  // Login function to update state and save to localStorage
  const login = (newToken, newUser) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  // Logout function to clear state and remove from localStorage
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  // The value object holds all the data and functions for the context
  const value = { token, user, login, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {/* Don't render children until the initial loading/validation is done */}
      {!loading && children}
    </AuthContext.Provider>
  );
};


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);