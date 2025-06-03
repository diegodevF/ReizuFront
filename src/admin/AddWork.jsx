import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AddWork = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    titulo: '',
    sinopsis: '',
    autorPrincipal: 'Kevin B.P',
    masAutores: '',
    estado: 'Emisión',
    periodicidad: 'Mensual',
    tipoObra: 'Novela',
    formato: 'Manga/comics',
    orientacion: 'Izquierda a Derecha',
    linkPVTrailer: '',
    obraExclusiva: false,
    contenidoAdulto: false
  });

  const [selectedGenres, setSelectedGenres] = useState([]);

  const genres = [
    'ACCION', 'AVENTURA', 'BL', 'CIENCIA FICCION', 'COMEDIA', 'DEPORTE', 'DRAMA', 'FANTASIA', 'GL',
    'HISTORICO', 'HORROR', 'MISTERIO', 'PSICOLOGICO', 'ROMANCE', 'TERROR', 'THRILLER', 'VIDA COTIDIANA'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleGenreChange = (genre) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
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
      
      <div 
        className="flex-grow-1"
        style={{ 
          marginLeft: sidebarOpen ? '280px' : '0',
          transition: 'margin-left 0.3s ease-in-out',
          minHeight: '100vh',
          backgroundColor: '#e9ecef'
        }}
      >
        <div className="container-fluid p-4">
          {/* Header */}
          <div className="mb-4">
            <h2 className="fw-bold mb-3">Añadir una Nueva Obra</h2>
            
            {/* Título y Borrador */}
            <div className="d-flex gap-3 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Escribe título de la obra..."
                name="titulo"
                value={formData.titulo}
                onChange={handleInputChange}
                style={{ flex: 1 }}
              />
              <div className="dropdown">
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  Borrador
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Borrador</a></li>
                  <li><a className="dropdown-item" href="#">Publicado</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Columna principal */}
            <div className="col-lg-8">
              {/* Imágenes */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="text-center p-4 border rounded" style={{ backgroundColor: '#c0c0c0', height: '200px' }}>
                    <div className="d-flex flex-column justify-content-center h-100">
                      <h3 className="text-white fw-bold">IMAGEN PORTADA</h3>
                      <button className="btn btn-dark mt-3">Elegir Archivo</button>
                    </div>
                  </div>
                  <small className="text-muted">Tamaño recomendado: 300 x 300 | Tamaño Máximo de 1MB</small>
                </div>
                <div className="col-md-6">
                  <div className="text-center p-4 border rounded" style={{ backgroundColor: '#c0c0c0', height: '200px' }}>
                    <div className="d-flex flex-column justify-content-center h-100">
                      <h3 className="text-white fw-bold">IMAGEN BANNER</h3>
                      <button className="btn btn-dark mt-3">Elegir Archivo</button>
                    </div>
                  </div>
                  <small className="text-muted">Tamaño recomendado: 1024 x 1024 y Peso Máximo de 15MB</small>
                </div>
              </div>

              {/* Sinopsis */}
              <div className="mb-4">
                <label className="form-label fw-bold">Sinopsis:</label>
                <textarea
                  className="form-control"
                  rows="4"
                  name="sinopsis"
                  value={formData.sinopsis}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              {/* Autores */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Autor Principal:</label>
                  <select 
                    className="form-select"
                    name="autorPrincipal"
                    value={formData.autorPrincipal}
                    onChange={handleInputChange}
                  >
                    <option>Kevin B.P</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Más Autores/Colaboradores</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Escribir la lista de autores, asistentes y colaboradores de la obra"
                    name="masAutores"
                    value={formData.masAutores}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Más opciones */}
              <div className="mb-4">
                <h5 className="fw-bold text-muted mb-3">MAS OPCIONES</h5>
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        name="obraExclusiva"
                        checked={formData.obraExclusiva}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">Obra Exclusiva</label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="checkbox"
                        name="contenidoAdulto"
                        checked={formData.contenidoAdulto}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">Contenido Adulto</label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label small">Música de fondo</label>
                    <button className="btn btn-dark btn-sm d-block">Elegir Archivo</button>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label small">Link de PV/Trailer</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="linkPVTrailer"
                      value={formData.linkPVTrailer}
                      onChange={handleInputChange}
                    />
                    <small className="text-muted">Link de la letra de reproducción de youtube de los PV o Trailers de la obra.</small>
                  </div>
                </div>
              </div>

              {/* Gestionar visualización de logros */}
              <div className="mb-4">
                <label className="form-label fw-bold">Gestionar Visualización de logros</label>
                <div className="d-flex align-items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="rounded-circle bg-secondary"
                      style={{ width: '50px', height: '50px' }}
                    ></div>
                  ))}
                  <button className="btn btn-dark">Elegir Logros</button>
                </div>
              </div>
            </div>

            {/* Panel lateral */}
            <div className="col-lg-4">
              <div className="border rounded p-3" style={{ backgroundColor: 'white' }}>
                {/* Visitas y Vista previa */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span>Visitas: <strong>0</strong></span>
                  <button className="btn btn-outline-secondary btn-sm">Vista previa</button>
                </div>

                {/* Campos de configuración */}
                <div className="mb-3">
                  <label className="form-label small">Estado:</label>
                  <select 
                    className="form-select form-select-sm"
                    name="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                  >
                    <option>Emisión</option>
                    <option>Finalizado</option>
                    <option>Hiatus</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label small">Periodicidad</label>
                  <select 
                    className="form-select form-select-sm"
                    name="periodicidad"
                    value={formData.periodicidad}
                    onChange={handleInputChange}
                  >
                    <option>Mensual</option>
                    <option>Semanal</option>
                    <option>Quincenal</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label small">Tipo de Obra</label>
                  <select 
                    className="form-select form-select-sm"
                    name="tipoObra"
                    value={formData.tipoObra}
                    onChange={handleInputChange}
                  >
                    <option>Novela</option>
                    <option>Manga</option>
                    <option>Comic</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label small">Formato</label>
                  <select 
                    className="form-select form-select-sm"
                    name="formato"
                    value={formData.formato}
                    onChange={handleInputChange}
                  >
                    <option>Manga/comics</option>
                    <option>Novela</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label small">Orientación</label>
                  <select 
                    className="form-select form-select-sm"
                    name="orientacion"
                    value={formData.orientacion}
                    onChange={handleInputChange}
                  >
                    <option>Izquierda a Derecha</option>
                    <option>Derecha a Izquierda</option>
                  </select>
                </div>

                {/* Fecha */}
                <div className="text-center mb-3">
                  <small className="text-muted">{new Date().toLocaleString()}</small>
                </div>

                {/* Botones de acción */}
                <div className="d-flex gap-2 mb-4">
                  <button className="btn btn-dark flex-fill">Programar</button>
                  <button className="btn btn-danger flex-fill">Publicar</button>
                </div>

                {/* Géneros */}
                <div>
                  <h6 className="fw-bold text-center mb-2">GÉNEROS:</h6>
                  <small className="text-muted d-block text-center mb-3">Seleccionar hasta dos (2) géneros</small>
                  
                  <div className="row g-1">
                    {genres.map((genre) => (
                      <div key={genre} className="col-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={genre}
                            checked={selectedGenres.includes(genre)}
                            onChange={() => handleGenreChange(genre)}
                            disabled={!selectedGenres.includes(genre) && selectedGenres.length >= 2}
                          />
                          <label className="form-check-label small" htmlFor={genre}>
                            {genre}
                          </label>
                        </div>
                      </div>
                    ))}
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

export default AddWork;
