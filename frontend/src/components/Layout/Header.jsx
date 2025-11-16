import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">Hello, {user?.name}</span>
          <button
            onClick={logout}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}