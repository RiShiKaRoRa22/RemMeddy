import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, saveToken, clearToken, authHeader } from '../utils/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    const token = getToken();
    if (token) {
      verifyToken();
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async () => {
    try {
      // Make a request to verify token (any protected endpoint)
      const response = await fetch('http://localhost:5000/medicines', {
        headers: authHeader()
      });
      
      if (response.ok) {
        // Token is valid
        setUser({ id: 'user-id', name: 'User' });
      } else {
        clearToken(); // Clear invalid token
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      clearToken();
    } finally {
      setLoading(false);
    }
  };

  const login = async (phone, password) => {
  try {
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }
    
    const userData = await response.json();
    setUser({ id: userData.id, name: userData.name, phone: userData.phone });
    saveToken(userData.token);
    return userData;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

  const signup = async (userData) => {
    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }
      
      const newUser = await response.json();
      setUser({ id: newUser.id, name: newUser.name, phone: newUser.phone });
      saveToken(newUser.token);
      return newUser;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    clearToken();
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};