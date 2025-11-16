import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavItem({ to, icon, label }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className="nav-item"
      style={{
        backgroundColor: isActive ? '#dbeafe' : 'transparent',
        color: isActive ? '#1e40af' : '#374151'
      }}
    >
      <span style={{ marginRight: '12px' }}>{icon}</span>
      {label}
    </Link>
  );
}

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div style={{ padding: '24px 16px', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
          MedReminder
        </h2>
      </div>
      <nav style={{ padding: '16px 0' }}>
        <NavItem to="/dashboard" icon="💊" label="Medicines" />
        <NavItem to="/logs" icon="📋" label="Reminder Logs" />
      </nav>
    </div>
  );
}