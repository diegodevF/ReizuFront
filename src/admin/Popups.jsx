import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';

const popupsData = Array(27).fill(null).map((_, i) => ({
  id: i + 1,
  // Puedes agregar más campos si necesitas mostrar info real
}));

const TABS = [
  { label: "Todo", count: 105 },
  { label: "Publicados", count: 90 },
  { label: "Borradores", count: 3 },
  { label: "Papelera", count: 19 }
];

const ITEMS_PER_PAGE = 9;

const Popups = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState(0);

  const totalPages = Math.ceil(popupsData.length / ITEMS_PER_PAGE);
  const currentItems = popupsData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div style={{ background: "#ededed", minHeight: "100vh", fontFamily: "system-ui, sans-serif", display: "flex" }}>
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />

      {/* Botón flotante para abrir la sidebar si está cerrada */}
      {!sidebarOpen && (
        <button
          style={{
            position: "fixed",
            top: 16,
            left: 0,
            zIndex: 2000,
            borderRadius: '0% 50% 50% 0%',
            width: 38,
            height: 38,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: "linear-gradient(90deg, #d32f2f 0%, #e53935 100%)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(211, 47, 47, 0.3)"
          }}
          onClick={() => setSidebarOpen(true)}
        >
          <i className="bi bi-chevron-right" style={{ fontSize: 22 }}></i>
        </button>
      )}

      {/* Contenido principal */}
      <div
        style={{
          flexGrow: 1,
          marginLeft: sidebarOpen ? 280 : 0,
          transition: "margin-left 0.3s",
          minHeight: "100vh"
        }}
      >
        {/* Header y filtros */}
        <div style={{ background: "#e0e0e0", padding: "24px 24px 0 24px", borderRadius: "0 0 12px 12px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h2 style={{ fontWeight: 700, fontSize: 28, margin: 0, color: "#333" }}>Gestionar POPUPS</h2>
            <button style={{
              border: "none",
              background: "linear-gradient(90deg, #d32f2f 0%, #e53935 100%)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 16,
              padding: "10px 24px",
              borderRadius: 8,
              boxShadow: "0 4px 12px rgba(211, 47, 47, 0.3)",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
              onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              Nuevo Banner
            </button>
          </div>
          <div style={{ paddingBottom: 16 }}>
            {TABS.map((tab, idx) => (
              <span
                key={tab.label}
                onClick={() => setActiveTab(idx)}
                style={{
                  marginRight: 24,
                  fontWeight: activeTab === idx ? 700 : 500,
                  cursor: "pointer",
                  color: activeTab === idx ? "#d32f2f" : "#555",
                  borderBottom: activeTab === idx ? "3px solid #d32f2f" : "none",
                  paddingBottom: 4,
                  transition: "all 0.2s",
                  fontSize: 15
                }}
              >
                {tab.label} <span style={{ color: "#d32f2f" }}>({tab.count})</span>
              </span>
            ))}
          </div>
        </div>

        {/* Grid de popups */}
        <div style={{ padding: 24 }}>
          <div style={{ 
            background: "#fff", 
            borderRadius: 12, 
            padding: 24, 
            minHeight: 600,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
              justifyItems: "center"
            }}>
              {currentItems.map((popup, idx) => (
                <div key={popup.id} style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center",
                  width: "100%"
                }}>
                  <div
                    style={{
                      width: "100%",
                      height: 160,
                      background: "#f5f5f5",
                      borderRadius: 8,
                      marginBottom: 12,
                      border: "2px solid #e0e0e0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <i className="bi bi-image text-muted" style={{ fontSize: "2rem", color: "#bbb" }}></i>
                  </div>
                  <button style={{
                    background: "linear-gradient(90deg, #d32f2f 0%, #e53935 100%)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    padding: "8px 24px",
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                    boxShadow: "0 4px 8px rgba(211, 47, 47, 0.3)",
                    transition: "all 0.2s",
                    width: "60%"
                  }}
                    onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
                    onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
                  >
                    Editar
                  </button>
                </div>
              ))}
            </div>

            {/* Paginación */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 32 }}>
              <span style={{ color: "#666", fontSize: 15 }}>200 elementos</span>
              <nav>
                <ul style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: 8, 
                  listStyle: "none", 
                  margin: 0, 
                  padding: 0 
                }}>
                  <li>
                    <button 
                      style={{
                        background: currentPage === 1 ? "#f5f5f5" : "#fff",
                        border: "1px solid #ddd",
                        borderRadius: 6,
                        padding: "6px 12px",
                        cursor: currentPage === 1 ? "not-allowed" : "pointer",
                        color: currentPage === 1 ? "#bbb" : "#333"
                      }}
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                    >«</button>
                  </li>
                  <li>
                    <button 
                      style={{
                        background: currentPage === 1 ? "#f5f5f5" : "#fff",
                        border: "1px solid #ddd",
                        borderRadius: 6,
                        padding: "6px 12px",
                        cursor: currentPage === 1 ? "not-allowed" : "pointer",
                        color: currentPage === 1 ? "#bbb" : "#333"
                      }}
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >‹</button>
                  </li>
                  <li>
                    <span style={{
                      background: "linear-gradient(90deg, #d32f2f 0%, #e53935 100%)",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      padding: "6px 12px",
                      fontWeight: 600
                    }}>{currentPage}</span>
                  </li>
                  <li>
                    <span style={{ color: "#666", padding: "6px 12px" }}>de {totalPages}</span>
                  </li>
                  <li>
                    <button 
                      style={{
                        background: currentPage === totalPages ? "#f5f5f5" : "#fff",
                        border: "1px solid #ddd",
                        borderRadius: 6,
                        padding: "6px 12px",
                        cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                        color: currentPage === totalPages ? "#bbb" : "#333"
                      }}
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >›</button>
                  </li>
                  <li>
                    <button 
                      style={{
                        background: currentPage === totalPages ? "#f5f5f5" : "#fff",
                        border: "1px solid #ddd",
                        borderRadius: 6,
                        padding: "6px 12px",
                        cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                        color: currentPage === totalPages ? "#bbb" : "#333"
                      }}
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                    >»</button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popups;
