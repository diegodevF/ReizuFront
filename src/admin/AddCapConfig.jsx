import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AddCapConfig = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    numero: '',
    titulo: '',
    estado: 'Borrador',
    bloquearCapitulo: false,
    agregarPaginaBlanco: false,
    palabrasAutor: '',
    capituloEspecial: false,
    precioReizuCoins: '',
    contenidoAdulto: false
  });

  const [cascadaFiles, setCascadaFiles] = useState([]);
  const [paginadaFiles, setPaginadaFiles] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Generar placeholders de páginas (simulando páginas subidas)
  const generatePlaceholders = (count) => {
    return Array(count).fill(null).map((_, index) => (
      <div
        key={index}
        className="bg-light border rounded"
        style={{
          width: '80px',
          height: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <i className="bi bi-image text-muted"></i>
      </div>
    ));
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
          <div className="row">
            {/* Columna principal */}
            <div className="col-lg-8">
              {/* Header */}
              <div className="mb-4">
                <h2 className="fw-bold text-dark mb-3">Nuevo Capítulo</h2>
                
                {/* Campos básicos */}
                <div className="row mb-3">
                  <div className="col-md-2">
                    <label className="form-label">Nro:</label>
                    <input
                      type="number"
                      className="form-control"
                      name="numero"
                      value={formData.numero}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-7">
                    <label className="form-label">Título:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Escribe título del capítulo..."
                      name="titulo"
                      value={formData.titulo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Estado:</label>
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
                </div>
              </div>

              {/* Versión de lectura Cascada */}
              <div className="card mb-4">
                <div className="card-body">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <h5 className="mb-0">Versión de lectura Cascada</h5>
                    <button className="btn btn-dark btn-sm">Elegir Archivo</button>
                  </div>
                  
                  <div className="text-danger small mb-3">
                    Tamaño recomendado 800x1500 La cantidad total de páginas debe pesar menos de 50MB
                  </div>

                  {/* Grid de páginas cascada */}
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {generatePlaceholders(16)}
                  </div>

                  <div className="small text-muted">
                    Sube las páginas del capítulo en formato imagen (si tiene páginas dobles subir las páginas completas sin cortar y eliminar las páginas dobles cortadas)
                  </div>
                </div>
              </div>

              {/* Versión de lectura Paginada */}
              <div className="card mb-4">
                <div className="card-body">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <h5 className="mb-0">Versión de lectura Paginada</h5>
                    <button className="btn btn-dark btn-sm">Elegir Archivo</button>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="agregarPaginaBlanco"
                        checked={formData.agregarPaginaBlanco}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Agregar una página en blanco al inicio.
                      </label>
                    </div>
                  </div>
                  
                  <div className="text-danger small mb-3">
                    Tamaño recomendado 800x1500 La cantidad total de páginas debe pesar menos de 50MB
                  </div>

                  {/* Grid de páginas paginada */}
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {generatePlaceholders(16)}
                  </div>

                  <div className="small text-muted">
                    Sube las páginas del capítulo en formato imagen (si tiene páginas dobles subir las páginas dobles cortadas y eliminar las páginas dobles completas, como también la orientación es automática, ya sea de forma occidental u oriental por lo que se puede ordenar de forma normal)
                  </div>
                </div>
              </div>

              {/* Palabras del Autor */}
              <div className="card">
                <div className="card-body">
                  <h5 className="mb-3">Palabras del Autor</h5>
                  <textarea
                    className="form-control"
                    rows="6"
                    name="palabrasAutor"
                    value={formData.palabrasAutor}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Panel lateral */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  {/* Visitas y Vista previa */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span>Visitas: <strong>0</strong></span>
                    <button className="btn btn-outline-secondary btn-sm">Vista previa</button>
                  </div>

                  {/* Bloquear Capítulo */}
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="bloquearCapitulo"
                      checked={formData.bloquearCapitulo}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label">
                      Bloquear Capítulo
                    </label>
                  </div>
                  
                  <div className="text-danger small mb-3">
                    Al bloquear el capítulo lo cambiarás para desbloquearlo será de 150 Reizu Coins
                  </div>

                  {/* Fecha */}
                  <div className="text-center mb-3">
                    <small className="text-muted">18 de May 2025 a las 15:45</small>
                  </div>

                  {/* Botones de acción */}
                  <div className="d-flex gap-2 mb-4">
                    <button className="btn btn-dark flex-fill">Programar</button>
                    <button className="btn btn-danger flex-fill">Publicar</button>
                  </div>

                  {/* Miniatura del capítulo */}
                  <div className="mb-4">
                    <h6 className="fw-bold text-center mb-2">Miniatura del capítulo</h6>
                    <div 
                      className="bg-light border rounded d-flex align-items-center justify-content-center"
                      style={{ height: '150px' }}
                    >
                      <i className="bi bi-image text-muted fs-1"></i>
                    </div>
                    <div className="text-center mt-2">
                      <button className="btn btn-dark btn-sm">Elegir Archivo</button>
                    </div>
                  </div>

                  {/* MÁS OPCIONES */}
                  <div>
                    <h6 className="fw-bold text-center text-muted mb-3">MÁS OPCIONES</h6>
                    
                    {/* Capítulo especial */}
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="capituloEspecial"
                        checked={formData.capituloEspecial}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Capítulo especial
                      </label>
                    </div>

                    {/* Precio de Reizu Coins */}
                    <div className="mb-3">
                      <label className="form-label small">Precio de Reizu Coins</label>
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          name="precioReizuCoins"
                          value={formData.precioReizuCoins}
                          onChange={handleInputChange}
                        />
                        <span className="input-group-text">
                          <i className="bi bi-coin text-warning"></i>
                        </span>
                      </div>
                    </div>

                    {/* Contenido +18 */}
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="contenidoAdulto"
                        checked={formData.contenidoAdulto}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Contenido +18
                      </label>
                    </div>

                    {/* Términos de uso */}
                    <div className="small text-muted">
                      <strong>Términos de Uso:</strong> Para los Capítulos especiales se puede subir contenido explícito como desnudos y gore mucho más gráfico, siempre marcar esta casilla si el capítulo contiene lo anteriormente mencionado, la plataforma está al tanto.
                      <br/><br/>
                      <span className="text-danger">Advertencia:</span> Aunque los capítulos especiales sirven para subir contenido mucho más explícito del permitido en la plataforma no se puede subir hentai o alguna filia.
                    </div>
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

export default AddCapConfig;
