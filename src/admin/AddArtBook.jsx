import React, { useState, useRef } from 'react';
import Sidebar from './components/Sidebar.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';

const GRID_ROWS = 5;
const GRID_COLS = 7;

const AddArtBook = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    titulo: '',
    estado: 'Borrador',
    agregarBlanco: false,
    bloquear: false,
    tipo: 'Mixto',
    portada: null,
    especial: false,
    precio: '',
    contenido18: false,
    palabrasAutor: '',
    obraRelacionada: 'Horned',
    autorPrincipal: 'Kevin B.P'
  });
  const [paginas, setPaginas] = useState([]);
  const fileInputRef = useRef(null);
  const portadaInputRef = useRef(null);

  // Manejar inputs generales
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Manejar carga de páginas (simulado)
  const handlePaginasChange = (e) => {
    const files = Array.from(e.target.files);
    setPaginas(files.slice(0, GRID_ROWS * GRID_COLS)); // Máximo 35
  };

  // Manejar carga de portada
  const handlePortadaChange = (e) => {
    const file = e.target.files[0];
    if (file) setFormData(prev => ({ ...prev, portada: file }));
  };

  // Renderizar grid de páginas
  const renderGrid = () => {
    const total = GRID_ROWS * GRID_COLS;
    let items = [];
    for (let i = 0; i < total; i++) {
      const file = paginas[i];
      items.push(
        <div
          key={i}
          style={{
            width: 80,
            height: 100,
            background: '#d2d2d2',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {file ? (
            <img
              src={URL.createObjectURL(file)}
              alt={`página ${i + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : null}
        </div>
      );
    }
    return items;
  };

  return (
    <div className="d-flex" style={{ background: "#ededed" }}>
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
          background: "#ededed"
        }}
      >
        <div className="container-fluid p-4">
          <div className="row">
            {/* Columna principal */}
            <div className="col-lg-9">
              <h4 className="fw-bold mt-2 mb-3">NUEVO / EDITAR ARTBOOK</h4>
              <div className="d-flex align-items-center gap-2 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Escribe título del capítulo.."
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  style={{ maxWidth: 600 }}
                />
                <select
                  className="form-select"
                  name="estado"
                  value={formData.estado}
                  onChange={handleInputChange}
                  style={{ width: 120 }}
                >
                  <option>Borrador</option>
                  <option>Publicado</option>
                  <option>Programado</option>
                </select>
              </div>

              {/* Version de lectura paginada */}
              <div className="mb-2">
                <span className="fw-bold" style={{ fontSize: "1.1rem" }}>
                  Versión de lectura Paginada
                </span>
                <button
                  className="btn btn-dark btn-sm ms-3 me-2"
                  onClick={() => fileInputRef.current.click()}
                >
                  Elegir Archivo
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: 'none' }}
                  onChange={handlePaginasChange}
                />
                <input
                  type="checkbox"
                  className="form-check-input ms-2"
                  id="agregarBlanco"
                  name="agregarBlanco"
                  checked={formData.agregarBlanco}
                  onChange={handleInputChange}
                />
                <label htmlFor="agregarBlanco" className="form-check-label ms-2">
                  Agregar una página en blanco al inicio.
                </label>
                <div className="text-danger small mt-1" style={{ marginLeft: 2 }}>
                  Tamaño recomendado 800x1500. La cantidad total de páginas debe pesar menos de 80MB
                </div>
              </div>

              {/* Grid de páginas */}
              <div
                className="mb-3"
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
                  gap: 10,
                  background: "#fff",
                  padding: 10,
                  borderRadius: 4
                }}
              >
                {renderGrid()}
              </div>

              <div className="text-muted small mb-2">
                Sube las páginas del capítulo en formato imagen (si tiene páginas dobles subir las páginas dobles cortadas y eliminar las páginas dobles completas, como también la orientación es automática, ya sea de forma occidental u oriental por lo que se puede ordenar de forma normal)
              </div>

              {/* Palabras del autor */}
              <div className="mb-3">
                <label className="fw-medium mb-1">Palabras del Autor</label>
                <textarea
                  className="form-control"
                  rows={2}
                  name="palabrasAutor"
                  value={formData.palabrasAutor}
                  onChange={handleInputChange}
                />
              </div>

              {/* Obra Relacionada y Autor Principal */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="fw-medium mb-1">Obra Relacionada</label>
                  <select
                    className="form-select"
                    name="obraRelacionada"
                    value={formData.obraRelacionada}
                    onChange={handleInputChange}
                  >
                    <option>Horned</option>
                    <option>Mi Compañera de oficina es una oveja</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="fw-medium mb-1">Autor Principal:</label>
                  <select
                    className="form-select"
                    name="autorPrincipal"
                    value={formData.autorPrincipal}
                    onChange={handleInputChange}
                  >
                    <option>Kevin B.P</option>
                    <option>Thomas Oni-Sama</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Panel lateral */}
            <div className="col-lg-3">
              <div className="bg-light border rounded p-3 mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Visitas: 0</span>
                  <button className="btn btn-outline-dark btn-sm">Vista previa</button>
                </div>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="bloquear"
                    id="bloquear"
                    checked={formData.bloquear}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="bloquear">
                    Bloquear Artbook
                  </label>
                </div>
                <div className="text-danger small mb-2">
                  Al bloquear el Artbook la cantidad para desbloquear será de 151 Reizu Coins
                </div>
                <div className="mb-2">
                  <label className="form-label">Tipo de Artbook</label>
                  <select
                    className="form-select"
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleInputChange}
                  >
                    <option>Mixto</option>
                    <option>Ilustraciones</option>
                    <option>Bocetos</option>
                  </select>
                </div>
                <div className="mb-2 text-center">
                  <small className="text-muted">18 de May 2025 a las 15:45</small>
                </div>
                <div className="d-flex gap-2 mb-2">
                  <button className="btn btn-dark flex-fill">Programar</button>
                  <button className="btn btn-danger flex-fill">Publicar</button>
                </div>
              </div>

              {/* Portada del Artbook */}
              <div className="bg-light border rounded p-3 mb-3 text-center">
                <div className="mb-2 fw-bold">PORTADA DEL ARTBOOK</div>
                <div
                  className="mx-auto mb-2"
                  style={{
                    width: 160,
                    height: 180,
                    background: "#d2d2d2",
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}
                >
                  {formData.portada ? (
                    <img
                      src={URL.createObjectURL(formData.portada)}
                      alt="Portada"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : null}
                </div>
                <button
                  className="btn btn-dark btn-sm"
                  onClick={() => portadaInputRef.current.click()}
                >
                  Elegir Archivo
                </button>
                <input
                  ref={portadaInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handlePortadaChange}
                />
              </div>

              {/* Más opciones */}
              <div className="bg-light border rounded p-3">
                <div className="fw-bold text-muted mb-2" style={{ fontSize: "1.1rem" }}>
                  MÁS OPCIONES
                </div>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="especial"
                    id="especial"
                    checked={formData.especial}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="especial">
                    Artbook especial
                  </label>
                </div>
                <div className="mb-2">
                  <label className="form-label">Precio de Reizu Coins</label>
                  <div className="input-group input-group-sm">
                    <input
                      type="number"
                      className="form-control"
                      name="precio"
                      value={formData.precio}
                      onChange={handleInputChange}
                    />
                    <span className="input-group-text">
                      <i className="bi bi-coin text-warning"></i>
                    </span>
                  </div>
                </div>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="contenido18"
                    id="contenido18"
                    checked={formData.contenido18}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="contenido18">
                    Contenido +18
                  </label>
                </div>
                <div className="small text-muted mt-2">
                  <strong>Términos de uso:</strong> Para los Artbooks especiales se puede subir contenido explícito como desnudos y gore mucho más gráfico, siempre marcar esta opción si el artbook especial pertenece ese tipo de contenido.<br />
                  <span className="text-danger">Advertencia:</span> Aunque los capítulos especiales sirven para subir contenido mucho más explícito del permitido en la plataforma no se puede subir hentai o alguna filia.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddArtBook;
