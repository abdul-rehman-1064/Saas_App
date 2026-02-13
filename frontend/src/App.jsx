import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';

// New Dashboard Pages
import Settings from './pages/dashboard/Settings';
import Integration from './pages/dashboard/Integration';
import Analytics from './pages/dashboard/Analytics';

// Protected Route Component (Aapka Purana Logic - Best Practice)
function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('token');
  const location = useLocation();
  
  if (!isAuthenticated) {
    // Redirect to login but save the location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
}

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard Routes */}
        
        {/* 1. Main Dashboard (Settings) */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } 
        />

        {/* 2. Integration Page */}
        <Route 
          path="/dashboard/integration" 
          element={
            <ProtectedRoute>
              <Integration />
            </ProtectedRoute>
          } 
        />

        {/* 3. Analytics Page */}
        <Route 
          path="/dashboard/analytics" 
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          } 
        />

      </Routes>
    </>
  );
}

export default App;