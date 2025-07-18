import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) return null; // ✅ Wait until token is checked

  return token ? children : <Navigate to="/" />;
}
