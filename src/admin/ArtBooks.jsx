import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';

const artbooksData = [
  { id: 1, title: "CONCEPT ART", subtitle: "El Príncipe Olvidado" },
  { id: 2, title: "CONCEPT ART", subtitle: "El Príncipe Olvidado" },
  { id: 3, title: "CONCEPT ART", subtitle: "El Príncipe Olvidado" },
  { id: 4, title: "CONCEPT ART", subtitle: "El Príncipe Olvidado" },
  { id: 5, title: "CONCEPT ART", subtitle: "El Príncipe Olvidado" },
  { id: 6, title: "CONCEPT ART", subtitle: "El Príncipe Olvidado" },
  { id: 7, title: "CONCEPT ART", subtitle: "El Príncipe Olvidado" },
  { id: 8, title: "CONCEPT ART", subtitle: "El Príncipe Olvidado" },
  { id: 9, title: "CONCEPT ART", subtitle: "El Príncipe Olvidado" },
  { id: 10, title: "CONCEPT ART", subtitle: "El Príncipe Olvidado" }
];

const TABS = [
  { label: "Todo", count: 10 },
  { label: "Publicados", count: 4 },
  { label: "Borradores", count: 6 }
];

const ArtBooks = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");

  const filtered = artbooksData.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(search.toLowerCase())
  );

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
      <div style={{
        flexGrow: 1,
        marginLeft: sidebarOpen ? 280 : 0,
        transition: "margin-left 0.3s",
        minHeight: "100vh"
      }}>
        {/* Header */}
        <div style={{ 
          background: "#e0e0e0", 
          padding: "24px 24px 0 24px",
          borderRadius: "0 0 12px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <h2 style={{ margin: 0, fontWeight: 700, fontSize: 28, color: "#333" }}>Gestionar Artbooks</h2>
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
              Nuevo Artbook
            </button>
          </div>
          <div style={{ minWidth: 180, display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar artbooks..."
              style={{
                height: 36,
                fontSize: 14,
                border: "1px solid #ddd",
                background: "#fff",
                color: "#333",
                padding: "8px 12px",
                width: 120,
                borderRadius: 8,
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
              }}
            />
            <button style={{
              background: "linear-gradient(90deg, #d32f2f 0%, #e53935 100%)",
              color: "#fff",
              fontSize: 14,
              padding: "8px 16px",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 600,
              boxShadow: "0 4px 8px rgba(211, 47, 47, 0.3)",
              transition: "all 0.2s"
            }}
              onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          background: "#fff",
          margin: "20px 24px 0 24px",
          padding: "16px 0 12px 0",
          borderRadius: "8px 8px 0 0",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
        }}>
          <div style={{ display: "flex", gap: 32, fontSize: 16, paddingLeft: 20 }}>
            {TABS.map((tab, idx) => (
              <span
                key={tab.label}
                onClick={() => setActiveTab(idx)}
                style={{
                  cursor: 'pointer',
                  fontWeight: activeTab === idx ? 700 : 500,
                  color: activeTab === idx ? "#d32f2f" : "#555",
                  borderBottom: activeTab === idx ? '3px solid #d32f2f' : 'none',
                  paddingBottom: 8,
                  transition: "all 0.2s"
                }}
              >
                {tab.label} <span style={{ color: "#d32f2f", fontWeight: 600 }}>({tab.count})</span>
              </span>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{
          background: "#fff",
          margin: "0 24px 24px 24px",
          padding: "32px 24px",
          minHeight: 600,
          borderRadius: "0 0 12px 12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 24,
            justifyItems: "center"
          }}>
            {filtered.map((item, idx) => (
              <div key={idx} style={{ 
                textAlign: "center", 
                width: "100%",
                transition: "transform 0.2s",
                cursor: "pointer"
              }}
                onMouseOver={e => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{
                  width: "100%",
                  height: 160,
                  background: "#f5f5f5",
                  borderRadius: 12,
                  marginBottom: 12,
                  border: "2px solid #e0e0e0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
                  maxWidth: 180,
                  transition: "all 0.2s"
                }}>
                  <i className="bi bi-image text-muted" style={{ fontSize: "2.5rem", color: "#bbb" }}></i>
                </div>
                <div style={{ 
                  fontWeight: 700, 
                  fontSize: 16, 
                  color: "#333",
                  marginBottom: 4
                }}>
                  {item.title}
                </div>
                <div style={{ 
                  fontSize: 14, 
                  color: "#666",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: 180
                }}>
                  {item.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtBooks;
