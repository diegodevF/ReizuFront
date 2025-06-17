import React, { useState, useRef } from 'react';
import Sidebar from './components/Sidebar.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AddBanner = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    imagenBanner: null,
    versionMovil: null,
    enlaceRedireccion: '',
    estado: 'Borrador'
  });

  const bannerInputRef = useRef(null);
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
    <div className="d-flex">
      {/* Overlay SOLO en móviles */}
      <div 
        className="sidebar-overlay d-md-none"
        style={{
          display: sidebarOpen ? 'block' : 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.5)',
          zIndex: 1040,
          transition: 'opacity 0.3s',
          opacity: sidebarOpen ? 1 : 0,
          pointerEvents: sidebarOpen ? 'auto' : 'none'
        }}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar SIEMPRE en el DOM */}
      <Sidebar 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />

      {/* Botón flotante para abrir la sidebar si está cerrada */}
      {!sidebarOpen && (
        <button
          className="btn btn-dark position-fixed"
          style={{
            top: 10,
            left: 0,
            zIndex: 2000,
            borderRadius: '0% 50% 50% 0%',
            width: 34,
            height: 34,
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
        className="flex-grow-1"
        style={{
          marginLeft: sidebarOpen ? "280px" : "0",
          transition: "margin-left 0.3s",
          minHeight: "100vh",
          backgroundColor: '#e9ecef'
        }}
      >
        <div className="container-fluid p-4">
          {/* Header */}
          <div className="mb-4">
            <h2 className="fw-bold text-dark">NUEVO BANNER</h2>
          </div>

          <div className="row">
            {/* Columna principal */}
            <div className="col-lg-8">
              {/* Card principal */}
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  
                  {/* Imagen de Banner */}
                  <div className="mb-4">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <label className="form-label fw-medium mb-0">Imagen de Banner</label>
                      <button 
                        className="btn btn-dark btn-sm"
                        onClick={() => bannerInputRef.current?.click()}
                      >
                        Elegir Archivo
                      </button>
                      <input
                        ref={bannerInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'imagenBanner')}
                        style={{ display: 'none' }}
                      />
                    </div>
                    
                    {/* Área de preview o placeholder */}
                    <div 
                      className="border border-2 border-dashed rounded-3 d-flex align-items-center justify-content-center"
                      style={{ 
                        height: '200px',
                        backgroundColor: '#f8f9fa',
                        borderColor: '#dee2e6'
                      }}
                    >
                      {formData.imagenBanner ? (
                        <div className="text-center">
                          <i className="bi bi-file-earmark-image text-success fs-1 mb-2"></i>
                          <p className="mb-0 text-muted small">{formData.imagenBanner.name}</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <i className="bi bi-image text-muted fs-1 mb-2"></i>
                          <p className="mb-0 text-muted">Imagen de Banner</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Version de Movil */}
                  <div className="mb-4">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <label className="form-label fw-medium mb-0">Version de Movil</label>
                      <button 
                        className="btn btn-dark btn-sm"
                        onClick={() => movilInputRef.current?.click()}
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
                      className="border border-2 border-dashed rounded-3 d-flex align-items-center justify-content-center"
                      style={{ 
                        height: '200px',
                        backgroundColor: '#f8f9fa',
                        borderColor: '#dee2e6'
                      }}
                    >
                      {formData.versionMovil ? (
                        <div className="text-center">
                          <i className="bi bi-phone text-success fs-1 mb-2"></i>
                          <p className="mb-0 text-muted small">{formData.versionMovil.name}</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <i className="bi bi-phone text-muted fs-1 mb-2"></i>
                          <p className="mb-0 text-muted">Version de Movil</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Enlace de Redireccion */}
                  <div className="mb-4">
                    <label className="form-label fw-medium">Enlace de Redireccion</label>
                    <input
                      type="url"
                      className="form-control"
                      name="enlaceRedireccion"
                      value={formData.enlaceRedireccion}
                      onChange={handleInputChange}
                      placeholder="https://ejemplo.com"
                    />
                  </div>

                </div>
              </div>
            </div>

            {/* Panel lateral */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  
                  {/* Fecha */}
                  <div className="text-center mb-4">
                    <small className="text-muted">18 de May 2025 a las 15:45</small>
                  </div>

                  {/* Estado */}
                  <div className="mb-4">
                    <select
                      className="form-select"
                      name="estado"
                      value={formData.estado}
                      onChange={handleInputChange}
                    >
                      <option value="Borrador">Borrador</option>
                      <option value="Publicado">Publicado</option>
                      <option value="Programado">Programado</option>
                    </select>
                  </div>

                  {/* Botón Publicar */}
                  <div className="d-grid">
                    <button className="btn btn-danger btn-lg fw-bold">
                      Publicar
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBanner;
