import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const PARTICIPANTS_ONESHOTS = Array(12).fill({
  title: "CONCEPT ART",
  subtitle: "El Príncipe Olvidado"
});

const PARTICIPANTS_RELATOS = Array(12).fill({
  title: "CONCEPT ART", 
  subtitle: "El Príncipe Olvidado"
});

const Participants = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");

  return (
    <div className="d-flex" style={{ background: "#f1f3f4", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />

      {/* Botón flotante para abrir la sidebar si está cerrada */}
      {!sidebarOpen && (
        <button
          className="btn position-fixed"
          style={{
            top: 16,
            left: 0,
            zIndex: 2000,
            borderRadius: '0% 50% 50% 0%',
            width: 38,
            height: 38,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: "linear-gradient(135deg, #dc3545, #c82333)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(220, 53, 69, 0.3)"
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
        <div className="container-fluid py-4">
          {/* Header moderno */}
          <div className="row mb-5">
            <div className="col-12">
              <div 
                className="d-flex justify-content-between align-items-center p-4 rounded-3"
                style={{ 
                  background: "#fff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: "1px solid #e9ecef"
                }}
              >
                <h2 className="fw-bold mb-0 text-dark" style={{ 
                  letterSpacing: 1, 
                  fontSize: "2rem",
                  background: "linear-gradient(135deg, #495057, #212529)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>
                  Participantes
                </h2>
                <div className="input-group" style={{ width: 280 }}>
                  <span className="input-group-text bg-light border-0">
                    <i className="bi bi-search text-muted"></i>
                  </span>
                  <input
                    type="text"
                    placeholder="Search participants..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="form-control border-0 bg-light"
                    style={{ 
                      fontSize: "0.95rem",
                      color: '#495057'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sección ONESHOTS - Moderna */}
          <div className="mb-5">
            <div 
              className="p-4 rounded-3"
              style={{
                background: "#fff",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                border: "1px solid #e9ecef"
              }}
            >
              <div className="d-flex align-items-center mb-4">
                <div 
                  className="px-3 py-2 rounded-pill me-3"
                  style={{
                    background: "linear-gradient(135deg, #dc3545, #c82333)",
                    color: "#fff",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    letterSpacing: 0.5
                  }}
                >
                  ONESHOTS
                </div>
                <div className="flex-grow-1" style={{ height: 2, background: "#e9ecef", borderRadius: 1 }}></div>
                <span className="text-muted ms-3" style={{ fontSize: "0.9rem" }}>
                  {PARTICIPANTS_ONESHOTS.length} participantes
                </span>
              </div>
              
              <div className="row g-4 justify-content-center">
                {PARTICIPANTS_ONESHOTS.map((item, idx) => (
                  <div key={idx} className="col-6 col-md-4 col-lg-2">
                    <div 
                      className="card h-100 border-0"
                      style={{
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
                      }}
                    >
                      <div className="card-body p-3 text-center">
                        <button
                          className="btn btn-danger btn-sm w-100 mb-3"
                          style={{
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            padding: '8px 12px',
                            borderRadius: 8,
                            background: "linear-gradient(135deg, #dc3545, #c82333)",
                            border: "none",
                            boxShadow: "0 2px 8px rgba(220, 53, 69, 0.3)"
                          }}
                        >
                          <i className="bi bi-download me-1"></i>
                          Descargar
                        </button>
                        <div
                          style={{
                            width: "100%",
                            height: 160,
                            background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
                            borderRadius: 8,
                            marginBottom: 12,
                            border: "2px dashed #dee2e6",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <i className="bi bi-image text-muted" style={{ fontSize: "1.5rem" }}></i>
                        </div>
                        <h6 className="fw-bold text-dark mb-1" style={{ fontSize: 13 }}>
                          {item.title}
                        </h6>
                        <p className="text-muted mb-0" style={{ fontSize: 12 }}>
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Separador visual */}
          <div className="row mb-5">
            <div className="col-12">
              <div className="text-center">
                <div 
                  className="d-inline-flex align-items-center px-4 py-2 rounded-pill"
                  style={{
                    background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
                    border: "2px solid #dee2e6"
                  }}
                >
                  <div style={{ width: 8, height: 8, background: "#dc3545", borderRadius: "50%", marginRight: 8 }}></div>
                  <span className="text-muted fw-medium" style={{ fontSize: "0.9rem" }}>
                    Diferentes categorías
                  </span>
                  <div style={{ width: 8, height: 8, background: "#dc3545", borderRadius: "50%", marginLeft: 8 }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Sección RELATOS - Moderna */}
          <div className="mb-4">
            <div 
              className="p-4 rounded-3"
              style={{
                background: "#fff",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                border: "1px solid #e9ecef"
              }}
            >
              <div className="d-flex align-items-center mb-4">
                <div 
                  className="px-3 py-2 rounded-pill me-3"
                  style={{
                    background: "linear-gradient(135deg, #6f42c1, #5a32a3)",
                    color: "#fff",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    letterSpacing: 0.5
                  }}
                >
                  RELATOS
                </div>
                <div className="flex-grow-1" style={{ height: 2, background: "#e9ecef", borderRadius: 1 }}></div>
                <span className="text-muted ms-3" style={{ fontSize: "0.9rem" }}>
                  {PARTICIPANTS_RELATOS.length} participantes
                </span>
              </div>
              
              <div className="row g-4 justify-content-center">
                {PARTICIPANTS_RELATOS.map((item, idx) => (
                  <div key={idx} className="col-6 col-md-4 col-lg-2">
                    <div 
                      className="card h-100 border-0"
                      style={{
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
                      }}
                    >
                      <div className="card-body p-3 text-center">
                        <button
                          className="btn btn-sm w-100 mb-3"
                          style={{
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            padding: '8px 12px',
                            borderRadius: 8,
                            background: "linear-gradient(135deg, #6f42c1, #5a32a3)",
                            border: "none",
                            color: "#fff",
                            boxShadow: "0 2px 8px rgba(111, 66, 193, 0.3)"
                          }}
                        >
                          <i className="bi bi-download me-1"></i>
                          Descargar
                        </button>
                        <div
                          style={{
                            width: "100%",
                            height: 160,
                            background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
                            borderRadius: 8,
                            marginBottom: 12,
                            border: "2px dashed #dee2e6",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <i className="bi bi-file-text text-muted" style={{ fontSize: "1.5rem" }}></i>
                        </div>
                        <h6 className="fw-bold text-dark mb-1" style={{ fontSize: 13 }}>
                          {item.title}
                        </h6>
                        <p className="text-muted mb-0" style={{ fontSize: 12 }}>
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Participants;
