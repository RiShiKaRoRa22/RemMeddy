import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/signUp';
import Dashboard from './pages/Dashboard';
import Logs from './pages/Logs';
import Layout from './components/Layout/Layout';
import './index.css';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? <Layout>{children}</Layout> : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/dashboard" 
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/logs" 
            element={<ProtectedRoute><Logs /></ProtectedRoute>} 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;