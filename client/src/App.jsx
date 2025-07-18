import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext'; // 👈 import your context

export default function App() {
  const location = useLocation();
  const { loading } = useAuth(); // 👈 use loading state
  const showFooter = location.pathname === '/dashboard';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
