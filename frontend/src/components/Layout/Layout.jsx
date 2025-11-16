import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className="main-content" style={{ flex: 1 }}>
        <Header />
        <main style={{ padding: '24px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}