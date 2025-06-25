import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx'; // Ajusta la ruta si es necesario

const commissionsData = Array(5).fill({
  name: "La Noche Profunda",
  price: "200 Reizu Coins",
  views: "1.000",
  orders: 10,
  canceled: 50,
  completed: 50,
  date: "Publico 13/02/2025 a las 20:20"
});

const TABS = [
  { label: "Todo", count: 105 },
  { label: "Publicados", count: 90 },
  { label: "Borradores", count: 3 },
  { label: "Privados", count: 15 },
  { label: "Pendientes", count: 5 },
  { label: "Papelera", count: 19 }
];

const Commissions = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    setSelected(e.target.checked ? commissionsData.map((_, i) => i) : []);
  };

  const handleSelect = (idx) => {
    setSelected(selected.includes(idx)
      ? selected.filter(i => i !== idx)
      : [...selected, idx]);
  };

  return (
    <div style={{ background: "#e0e0e0", minHeight: "100vh", fontFamily: "system-ui, sans-serif", display: "flex" }}>
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
        {/* Header */}
        <div style={{
          padding: "24px 24px 0 24px",
          background: "#d3d3d3",
          borderRadius: "0 0 12px 12px"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ fontWeight: 700, fontSize: 28, margin: 0, color: "#333" }}>Gestionar Comisiones</h2>
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
              Nuevo Comision
            </button>
          </div>
          <div style={{ marginTop: 16, fontSize: 15, paddingBottom: 16 }}>
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
                  transition: "all 0.2s"
                }}
              >
                {tab.label} <span style={{ color: "#d32f2f" }}>({tab.count})</span>
              </span>
            ))}
          </div>
        </div>

        {/* Filtros y buscador */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "20px 24px",
          background: "#f5f5f5",
          flexWrap: "wrap"
        }}>
          <select style={{ 
            fontSize: 15, 
            padding: "8px 12px", 
            borderRadius: 8, 
            border: "1px solid #ddd",
            background: "#fff",
            color: "#333",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
          }}>
            <option>Acciones por lote</option>
          </select>
          <button style={{
            padding: "8px 20px",
            fontSize: 15,
            border: "none",
            borderRadius: 8,
            background: "linear-gradient(90deg, #d32f2f 0%, #e53935 100%)",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(211, 47, 47, 0.3)",
            transition: "all 0.2s"
          }}>Aplicar</button>
          <select style={{ 
            fontSize: 15, 
            padding: "8px 12px", 
            borderRadius: 8, 
            border: "1px solid #ddd",
            background: "#fff",
            color: "#333",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
          }}>
            <option>Todas las fechas</option>
          </select>
          <select style={{ 
            fontSize: 15, 
            padding: "8px 12px", 
            borderRadius: 8, 
            border: "1px solid #ddd",
            background: "#fff",
            color: "#333",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
          }}>
            <option>Todos los autores</option>
          </select>
          <button style={{
            padding: "8px 20px",
            fontSize: 15,
            border: "2px solid #d32f2f",
            borderRadius: 8,
            background: "#fff",
            color: "#d32f2f",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
          }}>Filtrar</button>
          <div style={{ flex: 1 }}></div>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              height: 36,
              fontSize: 14,
              border: "1px solid #ddd",
              background: "#fff",
              color: "#333",
              padding: "8px 12px",
              width: 140,
              borderRadius: 8,
              marginRight: 8,
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
            }}
            placeholder="Buscar..."
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
          }}>
            Buscar
          </button>
        </div>

        {/* Tabla */}
        <div style={{
          margin: "0 24px 24px 24px",
          background: "#fff",
          borderRadius: 12,
          minHeight: 400,
          padding: "0 0 20px 0",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #f0f0f0", fontSize: 16 }}>
                <th style={{ width: 50, padding: "16px 12px", textAlign: "center" }}>
                  <input 
                    type="checkbox" 
                    checked={selectAll} 
                    onChange={handleSelectAll}
                    style={{ accentColor: "#d32f2f" }}
                  />
                </th>
                <th style={{ textAlign: "left", padding: "16px 12px", fontWeight: 600, color: "#333" }}>Artículo</th>
                <th style={{ textAlign: "left", padding: "16px 12px", fontWeight: 600, color: "#333" }}>Nombre</th>
                <th style={{ textAlign: "left", padding: "16px 12px", fontWeight: 600, color: "#333" }}>Precio</th>
                <th style={{ textAlign: "left", padding: "16px 12px", fontWeight: 600, color: "#333" }}>Vistas</th>
                <th style={{ textAlign: "left", padding: "16px 12px", fontWeight: 600, color: "#333" }}>Ordenes</th>
                <th style={{ textAlign: "left", padding: "16px 12px", fontWeight: 600, color: "#333" }}>Canceladas</th>
                <th style={{ textAlign: "left", padding: "16px 12px", fontWeight: 600, color: "#333" }}>Completadas</th>
                <th style={{ textAlign: "left", padding: "16px 12px", fontWeight: 600, color: "#333" }}>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {commissionsData.map((item, idx) => (
                <tr key={idx} style={{ 
                  borderBottom: "1px solid #f5f5f5", 
                  fontSize: 15,
                  transition: "background-color 0.2s"
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = "#fafafa"}
                onMouseOut={e => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <td style={{ textAlign: "center", padding: "16px 12px" }}>
                    <input 
                      type="checkbox" 
                      checked={selected.includes(idx)} 
                      onChange={() => handleSelect(idx)}
                      style={{ accentColor: "#d32f2f" }}
                    />
                  </td>
                  <td style={{ padding: "16px 12px" }}>
                    <div style={{
                      width: 52,
                      height: 52,
                      background: "#f5f5f5",
                      borderRadius: 8,
                      marginBottom: 8,
                      border: "2px solid #e0e0e0"
                    }} />
                    <div style={{ color: "#888", fontSize: 13, display: "flex", gap: 8 }}>
                      <button style={{
                        background: "#fff",
                        border: "2px solid #1976d2",
                        color: "#1976d2",
                        borderRadius: 6,
                        padding: "4px 12px",
                        fontWeight: 500,
                        cursor: "pointer",
                        fontSize: 12,
                        transition: "all 0.2s"
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.background = "#1976d2";
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.background = "#fff";
                        e.currentTarget.style.color = "#1976d2";
                      }}
                      >Editar</button>
                      <button style={{
                        background: "#fff",
                        border: "2px solid #43a047",
                        color: "#43a047",
                        borderRadius: 6,
                        padding: "4px 12px",
                        fontWeight: 500,
                        cursor: "pointer",
                        fontSize: 12,
                        transition: "all 0.2s"
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.background = "#43a047";
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.background = "#fff";
                        e.currentTarget.style.color = "#43a047";
                      }}
                      >Ver</button>
                      <button style={{
                        background: "#fff",
                        border: "2px solid #d32f2f",
                        color: "#d32f2f",
                        borderRadius: 6,
                        padding: "4px 12px",
                        fontWeight: 500,
                        cursor: "pointer",
                        fontSize: 12,
                        transition: "all 0.2s"
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.background = "#d32f2f";
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.background = "#fff";
                        e.currentTarget.style.color = "#d32f2f";
                      }}
                      >Eliminar</button>
                    </div>
                  </td>
                  <td style={{ padding: "16px 12px", fontWeight: 500, color: "#333" }}>{item.name}</td>
                  <td style={{ padding: "16px 12px", color: "#d32f2f", fontWeight: 600 }}>{item.price}</td>
                  <td style={{ padding: "16px 12px", color: "#555" }}>{item.views}</td>
                  <td style={{ padding: "16px 12px", color: "#555" }}>{item.orders}</td>
                  <td style={{ padding: "16px 12px", color: "#555" }}>{item.canceled}</td>
                  <td style={{ padding: "16px 12px", color: "#555" }}>{item.completed}</td>
                  <td style={{ padding: "16px 12px" }}>
                    <div>
                      <span style={{ fontWeight: 500, color: "#333" }}>Publico</span>
                      <br />
                      <span style={{ fontSize: 13, color: "#888" }}>{item.date}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Commissions;