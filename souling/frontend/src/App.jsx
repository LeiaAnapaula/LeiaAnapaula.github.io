import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import InnerChildAvatar from './components/InnerChildAvatar';
import SessionBuilder from './components/SessionBuilder';
import TherapistPortal from './components/TherapistPortal';
import PatientPortal from './components/PatientPortal';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('souling_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('souling_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('souling_user');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading Souling...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleLogin} />} />
          
          <Route
            path="/dashboard"
            element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          
          <Route
            path="/inner-child"
            element={user ? <InnerChildAvatar user={user} /> : <Navigate to="/login" />}
          />
          
          <Route
            path="/session-builder"
            element={user ? <SessionBuilder user={user} /> : <Navigate to="/login" />}
          />
          
          <Route
            path="/therapist"
            element={user?.role === 'therapist' ? <TherapistPortal user={user} /> : <Navigate to="/login" />}
          />
          
          <Route
            path="/patient"
            element={user?.role === 'patient' ? <PatientPortal user={user} /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
