import React, { useState, useRef } from 'react';
import Sidebar from './components/Sidebar.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AddPopup = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    imagenPopup: null,
    versionMovil: null,
    enlaceRedireccion: '',
    estado: 'Borrador',
    tipoPopup: 'Convocatoria'
  });

  const popupInputRef = useRef(null);
  const movilInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [type]: file
      }));
    }
  };

  return (
    <div style={{ background: "#e9ecef", minHeight: "100vh", fontFamily: "system-ui, sans-serif", display: "flex" }}>
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
        <div style={{ padding: 32, display: "flex", gap: 24 }}>
          {/* Columna principal */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Header */}
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontWeight: 700, fontSize: 28, color: "#333", margin: 0 }}>NUEVO POPUPS</h2>
            </div>

            {/* Card principal */}
            <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              
              {/* Imagen de Popup */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                  <label style={{ fontWeight: 600, fontSize: 16, margin: 0 }}>Imagen de Popup</label>
                  <button 
                    style={{
                      background: "linear-gradient(90deg, #d32f2f 0%, #e53935 100%)",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "8px 20px",
                      fontWeight: 600,
                      fontSize: 14,
                      cursor: "pointer",
                      boxShadow: "0 4px 8px rgba(211, 47, 47, 0.3)",
                      transition: "all 0.2s"
                    }}
                    onClick={() => popupInputRef.current?.click()}
                    onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
                    onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
                  >
                    Elegir Archivo
                  </button>
                  <input
                    ref={popupInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'imagenPopup')}
                    style={{ display: 'none' }}
                  />
                </div>
                
                {/* Área de preview o placeholder */}
                <div 
                  style={{ 
                    height: '200px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: 8,
                    border: "2px dashed #dee2e6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {formData.imagenPopup ? (
                    <div style={{ textAlign: "center" }}>
                      <i className="bi bi-file-earmark-image text-success" style={{ fontSize: "3rem", color: "#28a745" }}></i>
                      <p style={{ margin: "8px 0 0 0", color: "#666", fontSize: 14 }}>{formData.imagenPopup.name}</p>
                    </div>
                  ) : (
                    <div style={{ textAlign: "center" }}>
                      <i className="bi bi-image text-muted" style={{ fontSize: "3rem", color: "#999" }}></i>
                      <p style={{ margin: "8px 0 0 0", color: "#999" }}>Imagen de Popup</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Version de Movil */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                  <label style={{ fontWeight: 600, fontSize: 16, margin: 0 }}>Version de Movil</label>
                  <button 
                    style={{
                      background: "linear-gradient(90deg, #d32f2f 0%, #e53935 100%)",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "8px 20px",
                      fontWeight: 600,
                      fontSize: 14,
                      cursor: "pointer",
                      boxShadow: "0 4px 8px rgba(211, 47, 47, 0.3)",
                      transition: "all 0.2s"
                    }}
                    onClick={() => movilInputRef.current?.click()}
                    onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
                    onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
                  >
                    Elegir Archivo
                  </button>
                  <input
                    ref={movilInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'versionMovil')}
                    style={{ display: 'none' }}
                  />
                </div>
                
                {/* Área de preview o placeholder */}
                <div 
                  style={{ 
                    height: '200px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: 8,
                    border: "2px dashed #dee2e6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {formData.versionMovil ? (
                    <div style={{ textAlign: "center" }}>
                      <i className="bi bi-phone text-success" style={{ fontSize: "3rem", color: "#28a745" }}></i>
                      <p style={{ margin: "8px 0 0 0", color: "#666", fontSize: 14 }}>{formData.versionMovil.name}</p>
                    </div>
                  ) : (
                    <div style={{ textAlign: "center" }}>
                      <i className="bi bi-phone text-muted" style={{ fontSize: "3rem", color: "#999" }}></i>
                      <p style={{ margin: "8px 0 0 0", color: "#999" }}>Version de Movil</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Enlace de Redireccion */}
              <div>
                <label style={{ fontWeight: 600, fontSize: 16, display: "block", marginBottom: 8 }}>Enlace de Redireccion</label>
                <input
                  type="url"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    fontSize: 15,
                    borderRadius: 8,
                    border: "1px solid #ddd",
                    background: "#fff",
                    color: "#333",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                  }}
                  name="enlaceRedireccion"
                  value={formData.enlaceRedireccion}
                  onChange={handleInputChange}
                  placeholder="https://ejemplo.com"
                />
              </div>

            </div>
          </div>

          {/* Panel lateral */}
          <div style={{ width: 320, minWidth: 280 }}>
            <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              
              {/* Tipo de popup */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontWeight: 600, fontSize: 14, display: "block", marginBottom: 8 }}>Tipo de popup:</label>
                <select
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    fontSize: 14,
                    borderRadius: 6,
                    border: "1px solid #ddd",
                    background: "#fff",
                    color: "#333",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                  }}
                  name="tipoPopup"
                  value={formData.tipoPopup}
                  onChange={handleInputChange}
                >
                  <option>Convocatoria</option>
                  <option>Promocional</option>
                  <option>Informativo</option>
                </select>
              </div>

              {/* Fecha */}
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <small style={{ color: "#888", fontSize: 13 }}>18 de May 2025 a las 15:45</small>
              </div>

              {/* Estado */}
              <div style={{ marginBottom: 20 }}>
                <select
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    fontSize: 15,
                    borderRadius: 8,
                    border: "1px solid #ddd",
                    background: "#fff",
                    color: "#333",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                  }}
                  name="estado"
                  value={formData.estado}
                  onChange={handleInputChange}
                >
                  <option>Borrador</option>
                  <option>Publicado</option>
                  <option>Programado</option>
                </select>
              </div>

              {/* Botón Publicar */}
              <div>
                <button style={{
                  width: "100%",
                  background: "linear-gradient(90deg, #d32f2f, #e53935)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "12px 0",
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(211, 47, 47, 0.3)",
                  transition: "all 0.2s"
                }}
                  onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
                >
                  Publicar
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPopup;
