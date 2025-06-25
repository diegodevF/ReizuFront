import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx'; // Ajusta la ruta si es necesario

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
  { id: 10, title: "CONCEPT ART", subtitle: "El Príncipe Olvidado" },
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

  // Filtro por búsqueda
  const filtered = artbooksData.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: "#ededed", minHeight: "100vh", fontFamily: "Arial, sans-serif", display: "flex" }}>
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Botón flotante para abrir la sidebar si está cerrada */}
      {!sidebarOpen && (
        <button
          className="btn btn-dark position-fixed"
          style={{
            top: 16,
            left: 0,
            zIndex: 2000,
            borderRadius: '0% 50% 50% 0%',
            width: 38,
            height: 38,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
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
        {/* Header */}
        <div style={{
          background: "#e0e0e0",
          padding: "24px 32px 0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <h2 style={{ margin: 0, fontWeight: 700, fontSize: 27, letterSpacing: 0.5 }}>Gestionar Artbooks</h2>
            <button style={{
              border: "2px solid #222",
              background: "#f8f8f8",
              fontWeight: 500,
              fontSize: 18,
              padding: "4px 22px",
              cursor: "pointer",
              borderRadius: 6
            }}>
              Nuevo Artbook
            </button>
          </div>
          <div style={{ minWidth: 160, display: "flex", alignItems: "center", gap: 4 }}>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar..."
              style={{
                height: 26,
                fontSize: 14,
                border: "none",
                outline: "none",
                background: "#fff",
                padding: "2px 8px",
                width: 90,
                borderRadius: 2
              }}
            />
            <button style={{
              background: "#222",
              color: "#fff",
              fontSize: 13,
              padding: "2px 10px",
              border: "none",
              borderRadius: 2,
              cursor: "pointer"
            }}>
              Buscar
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          background: "#fff",
          margin: "18px 32px 0 32px",
          padding: "0 0 8px 0",
          borderBottom: "2px solid #ccc"
        }}>
          <div style={{ display: "flex", gap: 34, fontSize: 18 }} >
            {TABS.map((tab, idx) => (
              <div
                key={tab.label}
                onClick={() => setActiveTab(idx)}
                style={{
                  cursor: 'pointer',
                  fontWeight: activeTab === idx ? 'bold' : 400,
                  color: "#111",
                  borderBottom: activeTab === idx ? '2.5px solid #d32f2f' : 'none',
                  paddingBottom: 2
                }}
                className='m-2 d-flex align-items-center justify-content-center'
              >
                <span className="" style={{
                  color: activeTab === idx ? "#d32f2f" : "#111"
                }}>
                  {tab.label} <span style={{ color: "#d32f2f" }}>({tab.count})</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{
          background: "#fff",
          margin: "0 32px 32px 32px",
          padding: "32px 0",
          minHeight: 600,
          borderRadius: "0px 0px 8px 8px",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 32,
            justifyItems: "center"
          }}>
            {filtered.map((item, idx) => (
              <div key={idx} style={{ textAlign: "center" }}>
                <div style={{
                  width: 210,
                  height: 230,
                  background: "#d2d2d2",
                  borderRadius: 8,
                  marginBottom: 10
                }} />
                <div style={{ fontWeight: 700, fontSize: 18, letterSpacing: 0.5 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 15, marginTop: 2 }}>
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
