import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AddProduct = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    tipo: 'Sticker',
    creador: 'Jolty Beans',
    obraRelacionada: 'Horned',
    descripcion: '',
    estado: 'Borrador',
    restriccion: 'Sin restricción',
    contenidoAdulto: false,
    obraExclusiva: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
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
            <h2 className="fw-bold text-dark">Nuevo Producto</h2>
          </div>

          <div className="row">
            {/* Columna principal */}
            <div className="col-lg-8">
              {/* Card principal */}
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  
                  {/* Imagen del producto */}
                  <div className="mb-4">
                    <label className="form-label fw-medium mb-3">Imagen del Producto</label>
                    <div 
                      className="border border-2 border-dashed rounded-3 d-flex flex-column align-items-center justify-content-center"
                      style={{ 
                        height: '200px',
                        backgroundColor: '#f8f9fa',
                        borderColor: '#dee2e6'
                      }}
                    >
                      <i className="bi bi-image text-muted fs-1 mb-2"></i>
                      <p className="mb-0 text-muted">Haz clic o arrastra una imagen aquí</p>
                      <button className="btn btn-dark mt-3">Elegir Archivo</button>
                    </div>
                  </div>

                  {/* Campos del formulario */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label fw-medium">Nombre del Producto</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        placeholder="Ej: Sticker La Noche Profunda"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium">Precio (Reizu Coins)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="precio"
                        value={formData.precio}
                        onChange={handleInputChange}
                        placeholder="Ej: 200"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label fw-medium">Tipo de Producto</label>
                      <select
                        className="form-select"
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleInputChange}
                      >
                        <option>Sticker</option>
                        <option>Poster</option>
                        <option>Fondo de pantalla</option>
                        <option>Pack de stickers</option>
                        <option>Artbook digital</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium">Creador</label>
                      <select
                        className="form-select"
                        name="creador"
                        value={formData.creador}
                        onChange={handleInputChange}
                      >
                        <option>Jolty Beans</option>
                        <option>Thomas Oni-Sama</option>
                        <option>Kevin B.P</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-medium">Obra Relacionada</label>
                    <select
                      className="form-select"
                      name="obraRelacionada"
                      value={formData.obraRelacionada}
                      onChange={handleInputChange}
                    >
                      <option>Horned</option>
                      <option>Mi Compañera de oficina es una oveja</option>
                      <option>A veces me siento sola</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-medium">Descripción</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleInputChange}
                      placeholder="Describe el producto..."
                    ></textarea>
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
                    <label className="form-label fw-medium">Estado</label>
                    <select
                      className="form-select"
                      name="estado"
                      value={formData.estado}
                      onChange={handleInputChange}
                    >
                      <option>Borrador</option>
                      <option>Publicado</option>
                      <option>Programado</option>
                    </select>
                  </div>

                  {/* Restricción */}
                  <div className="mb-4">
                    <label className="form-label fw-medium">Restricción</label>
                    <select
                      className="form-select"
                      name="restriccion"
                      value={formData.restriccion}
                      onChange={handleInputChange}
                    >
                      <option>Sin restricción</option>
                      <option>Contenido exclusivo</option>
                      <option>Requiere verificación de edad</option>
                    </select>
                  </div>

                  {/* Opciones adicionales */}
                  <div className="mb-4">
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="contenidoAdulto"
                        checked={formData.contenidoAdulto}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Contenido Adulto (+18)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="obraExclusiva"
                        checked={formData.obraExclusiva}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Obra Exclusiva
                      </label>
                    </div>
                  </div>

                  {/* Botón Publicar */}
                  <div className="d-grid">
                    <button className="btn btn-danger btn-lg fw-bold">
                      Publicar Producto
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

export default AddProduct;
