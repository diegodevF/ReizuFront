import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import AnalyticsDashboard from './components/AnalyticsDashboard.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="d-flex" style={{ 
      background: '#121212', 
      minHeight: '100vh', 
      fontFamily: 'system-ui, sans-serif' 
    }}>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Botón flotante para abrir sidebar si está cerrada */}
      {!sidebarOpen && (
        <button
          className="btn position-fixed"
          style={{
            top: 16,
            left: 0,
            zIndex: 2000,
            borderRadius: '0% 50% 50% 0%',
            width: 42,
            height: 42,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: "#d32f2f",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(211, 47, 47, 0.4)",
            transition: "all 0.3s ease"
          }}
          onClick={() => setSidebarOpen(true)}
          onMouseOver={e => e.target.style.transform = "scale(1.05)"}
          onMouseOut={e => e.target.style.transform = "scale(1)"}
        >
          <i className="bi bi-chevron-right" style={{ fontSize: 22 }}></i>
        </button>
      )}

      {/* Contenido principal */}
      <div
        style={{
          flexGrow: 1,
          marginLeft: sidebarOpen ? 280 : 0,
          transition: "margin-left 0.3s ease",
          minHeight: "100vh",
          padding: 0
        }}
      >
        <AnalyticsDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
