import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen text-purple-600 font-semibold text-lg">
      Checking login status...
    </div>
  );
}


  return token ? children : <Navigate to="/" />;
}
