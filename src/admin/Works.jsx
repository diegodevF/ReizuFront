import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

// Datos de ejemplo
const obrasData = [
  {
    id: 1,
    titulo: "A veces me siento sola",
    artista: "Thomas Oni- Sama",
    tipo: "Oneshot",
    periodicidad: "Bimestral",
    generos: "Acción, Fantasía",
    fecha: "Público 13/02/2025 a las 20:20",
    visitas: 3420,
    megustas: 300,
    favoritos: 30,
    comentarios: 50
  },
  ...Array(11).fill(null).map((_, i) => ({
    id: i + 2,
    titulo: "A veces me siento sola",
    artista: "Thomas Oni- Sama",
    tipo: "Oneshot",
    periodicidad: "Bimestral",
    generos: "Acción, Fantasía",
    fecha: "Público 13/02/2025 a las 20:20",
    visitas: 3420,
    megustas: 300,
    favoritos: 30,
    comentarios: 50
  }))
];

const Works = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState('light');
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [accionesPorLote, setAccionesPorLote] = useState("");

  // Estados para filtros
  const [filtroFecha, setFiltroFecha] = useState("Todas las fechas");
  const [filtroEstado, setFiltroEstado] = useState("Todos los estados");
  const [filtroCondiciones, setFiltroCondiciones] = useState("Todas las condiciones");
  const [filtroOrientaciones, setFiltroOrientaciones] = useState("Todas las Orientaciones");
  const [filtroFormatos, setFiltroFormatos] = useState("Todos los formatos");
  const [filtroPeriodicidad, setFiltroPeriodicidad] = useState("Todas las Periodicidad");
  const [filtroGeneros, setFiltroGeneros] = useState("Todos los géneros");

  // Función para obtener el tema actual
  const getTheme = () => {
    if (typeof document !== "undefined") {
      return document.documentElement.getAttribute("data-bs-theme") || "light";
    }
    return "light";
  };

  // Observer para detectar cambios de tema
  useEffect(() => {
    setTheme(getTheme());
    
    const observer = new MutationObserver(() => {
      setTheme(getTheme());
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-bs-theme']
    });
    
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  const itemsPerPage = 12;
  const totalPages = Math.ceil(obrasData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = obrasData.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      setSelectedItems(currentItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Estilos adaptativos
  const selectStyles = {
    backgroundColor: isDark ? '#3a3a3a' : '#ffffff',
    borderColor: isDark ? '#555555' : '#ced4da',
    color: isDark ? '#ffffff' : '#000000'
  };

  const buttonOutlineStyles = {
    borderColor: isDark ? '#555555' : '#6c757d',
    color: isDark ? '#ffffff' : '#6c757d',
    backgroundColor: 'transparent'
  };

  const tableStyles = {
    backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
    color: isDark ? '#ffffff' : '#000000'
  };

  const theadStyles = {
    backgroundColor: isDark ? '#3a3a3a' : '#f8f9fa',
    color: isDark ? '#ffffff' : '#000000'
  };

  const linkStyles = {
    color: isDark ? '#4da6ff' : '#0d6efd'
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
          backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa'
        }}
      >
        <div className="container-fluid p-4">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 
              className="fw-bold mb-0"
              style={{ color: isDark ? '#ffffff' : '#212529' }}
            >
              Gestionar Obras
            </h2>
            <Link 
              to="/admin/AddWork" 
              className="btn btn-outline-secondary"
              style={buttonOutlineStyles}
            >
              Nueva obra
            </Link>
          </div>

          {/* Filtros de estado con contadores */}
          <div className="d-flex flex-wrap gap-3 mb-3">
            <span 
              className="fw-medium"
              style={{ color: isDark ? '#ffffff' : '#212529' }}
            >
              Todo (105)
            </span>
            <span 
              style={{ 
                cursor: 'pointer', 
                color: linkStyles.color 
              }}
            >
              Publicados (90)
            </span>
            <span 
              style={{ 
                cursor: 'pointer', 
                color: isDark ? '#8a8a8a' : '#6c757d' 
              }}
            >
              Privadas (15)
            </span>
            <span 
              className="text-warning" 
              style={{ cursor: 'pointer' }}
            >
              Pendientes (5)
            </span>
            <span 
              className="text-info" 
              style={{ cursor: 'pointer' }}
            >
              Archivadas (10)
            </span>
            <span 
              className="text-danger" 
              style={{ cursor: 'pointer' }}
            >
              Papelera (19)
            </span>
          </div>

          {/* Acciones por lote */}
          <div className="d-flex align-items-center gap-3 mb-3">
            <div className="d-flex align-items-center gap-2">
              <select 
                className="form-select form-select-sm" 
                style={{ ...selectStyles, width: 'auto' }}
                value={accionesPorLote}
                onChange={(e) => setAccionesPorLote(e.target.value)}
              >
                <option value="">Acciones por lote</option>
                <option value="eliminar">Eliminar</option>
                <option value="archivar">Archivar</option>
                <option value="publicar">Publicar</option>
              </select>
              <button 
                className="btn btn-outline-secondary btn-sm"
                style={buttonOutlineStyles}
              >
                Aplicar
              </button>
            </div>
          </div>

          {/* Filtros adicionales */}
          <div className="row g-2 mb-3">
            <div className="col-md-2">
              <select 
                className="form-select form-select-sm" 
                value={filtroFecha} 
                onChange={(e) => setFiltroFecha(e.target.value)}
                style={selectStyles}
              >
                <option>Todas las fechas</option>
              </select>
            </div>
            <div className="col-md-2">
              <select 
                className="form-select form-select-sm" 
                value={filtroEstado} 
                onChange={(e) => setFiltroEstado(e.target.value)}
                style={selectStyles}
              >
                <option>Todos los estados</option>
              </select>
            </div>
            <div className="col-md-2">
              <select 
                className="form-select form-select-sm" 
                value={filtroCondiciones} 
                onChange={(e) => setFiltroCondiciones(e.target.value)}
                style={selectStyles}
              >
                <option>Todas las condiciones</option>
              </select>
            </div>
            <div className="col-md-2">
              <select 
                className="form-select form-select-sm" 
                value={filtroOrientaciones} 
                onChange={(e) => setFiltroOrientaciones(e.target.value)}
                style={selectStyles}
              >
                <option>Todas las Orientaciones</option>
              </select>
            </div>
            <div className="col-md-2">
              <select 
                className="form-select form-select-sm" 
                value={filtroFormatos} 
                onChange={(e) => setFiltroFormatos(e.target.value)}
                style={selectStyles}
              >
                <option>Todos los formatos</option>
              </select>
            </div>
            <div className="col-md-2">
              <select 
                className="form-select form-select-sm" 
                value={filtroPeriodicidad} 
                onChange={(e) => setFiltroPeriodicidad(e.target.value)}
                style={selectStyles}
              >
                <option>Todas las Periodicidad</option>
              </select>
            </div>
          </div>

          <div className="row g-2 mb-4">
            <div className="col-md-2">
              <select 
                className="form-select form-select-sm" 
                value={filtroGeneros} 
                onChange={(e) => setFiltroGeneros(e.target.value)}
                style={selectStyles}
              >
                <option>Todos los géneros</option>
              </select>
            </div>
            <div className="col-md-8"></div>
            <div className="col-md-2 d-flex gap-2">
              <button 
                className="btn btn-primary btn-sm"
                style={{
                  background: 'linear-gradient(45deg, #0d6efd, #0b5ed7)',
                  border: 'none'
                }}
              >
                Filtrar
              </button>
              <button 
                className="btn btn-outline-secondary btn-sm"
                style={buttonOutlineStyles}
              >
                Buscar
              </button>
            </div>
          </div>

          {/* Tabla */}
          <div 
            className="table-responsive rounded"
            style={{
              backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
              border: `1px solid ${isDark ? '#444444' : '#dee2e6'}`
            }}
          >
            <table 
              className="table table-hover mb-0"
              style={tableStyles}
            >
              <thead style={theadStyles}>
                <tr>
                  <th style={{ width: '40px', borderColor: isDark ? '#555555' : '#dee2e6' }}>
                    <input 
                      type="checkbox" 
                      className="form-check-input"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th style={{ borderColor: isDark ? '#555555' : '#dee2e6' }}>
                    Título <i className="bi bi-arrow-up-down small text-muted"></i>
                  </th>
                  <th style={{ borderColor: isDark ? '#555555' : '#dee2e6' }}>Artista(s)</th>
                  <th style={{ borderColor: isDark ? '#555555' : '#dee2e6' }}>Tipo</th>
                  <th style={{ borderColor: isDark ? '#555555' : '#dee2e6' }}>Periodicidad</th>
                  <th style={{ borderColor: isDark ? '#555555' : '#dee2e6' }}>Géneros</th>
                  <th style={{ borderColor: isDark ? '#555555' : '#dee2e6' }}>
                    Fecha <i className="bi bi-arrow-up-down small text-muted"></i>
                  </th>
                  <th style={{ borderColor: isDark ? '#555555' : '#dee2e6' }}>
                    Visitas <i className="bi bi-arrow-up-down small text-muted"></i>
                  </th>
                  <th style={{ borderColor: isDark ? '#555555' : '#dee2e6' }}>
                    Me gustas <i className="bi bi-arrow-up-down small text-muted"></i>
                  </th>
                  <th style={{ borderColor: isDark ? '#555555' : '#dee2e6' }}>
                    Favoritos <i className="bi bi-arrow-up-down small text-muted"></i>
                  </th>
                  <th style={{ borderColor: isDark ? '#555555' : '#dee2e6' }}>
                    Comentarios <i className="bi bi-arrow-up-down small text-muted"></i>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((obra) => (
                  <tr 
                    key={obra.id}
                    style={{
                      backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
                      borderColor: isDark ? '#444444' : '#dee2e6'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = isDark ? '#3a3a3a' : '#f5f5f5';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = isDark ? '#2a2a2a' : '#ffffff';
                    }}
                  >
                    <td style={{ borderColor: isDark ? '#444444' : '#dee2e6' }}>
                      <input 
                        type="checkbox" 
                        className="form-check-input"
                        checked={selectedItems.includes(obra.id)}
                        onChange={() => handleSelectItem(obra.id)}
                      />
                    </td>
                    <td style={{ borderColor: isDark ? '#444444' : '#dee2e6' }}>
                      <div>
                        <strong style={{ color: isDark ? '#ffffff' : '#212529' }}>
                          {obra.titulo}
                        </strong>
                        <br />
                        <small>
                          <span 
                            style={{ 
                              cursor: 'pointer',
                              color: linkStyles.color 
                            }}
                          >
                            Editar
                          </span>
                          <span style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}> | </span>
                          <Link
                            to={`/admin/ViewCaps`}
                            style={{ 
                              cursor: 'pointer',
                              color: linkStyles.color 
                            }}
                          >
                            Ver
                          </Link>
                          <span style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}> | </span>
                          <span 
                            className="text-danger" 
                            style={{ cursor: 'pointer' }}
                          >
                            Papelera
                          </span>
                        </small>
                      </div>
                    </td>
                    <td style={{ color: isDark ? '#ffffff' : '#212529', borderColor: isDark ? '#444444' : '#dee2e6' }}>
                      {obra.artista}
                    </td>
                    <td style={{ color: isDark ? '#ffffff' : '#212529', borderColor: isDark ? '#444444' : '#dee2e6' }}>
                      {obra.tipo}
                    </td>
                    <td style={{ color: isDark ? '#ffffff' : '#212529', borderColor: isDark ? '#444444' : '#dee2e6' }}>
                      {obra.periodicidad}
                    </td>
                    <td style={{ color: isDark ? '#ffffff' : '#212529', borderColor: isDark ? '#444444' : '#dee2e6' }}>
                      {obra.generos}
                    </td>
                    <td style={{ borderColor: isDark ? '#444444' : '#dee2e6' }}>
                      <small style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}>
                        {obra.fecha}
                      </small>
                    </td>
                    <td style={{ color: isDark ? '#ffffff' : '#212529', borderColor: isDark ? '#444444' : '#dee2e6' }}>
                      {obra.visitas}
                    </td>
                    <td style={{ color: isDark ? '#ffffff' : '#212529', borderColor: isDark ? '#444444' : '#dee2e6' }}>
                      {obra.megustas}
                    </td>
                    <td style={{ color: isDark ? '#ffffff' : '#212529', borderColor: isDark ? '#444444' : '#dee2e6' }}>
                      {obra.favoritos}
                    </td>
                    <td style={{ color: isDark ? '#ffffff' : '#212529', borderColor: isDark ? '#444444' : '#dee2e6' }}>
                      {obra.comentarios}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <span style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}>
              200 elementos
            </span>
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    style={{
                      backgroundColor: isDark ? '#3a3a3a' : '#ffffff',
                      borderColor: isDark ? '#555555' : '#dee2e6',
                      color: isDark ? '#ffffff' : '#212529'
                    }}
                  >
                    «
                  </button>
                </li>
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    style={{
                      backgroundColor: isDark ? '#3a3a3a' : '#ffffff',
                      borderColor: isDark ? '#555555' : '#dee2e6',
                      color: isDark ? '#ffffff' : '#212529'
                    }}
                  >
                    ‹
                  </button>
                </li>
                <li className="page-item active">
                  <span 
                    className="page-link"
                    style={{
                      backgroundColor: '#0d6efd',
                      borderColor: '#0d6efd',
                      color: '#ffffff'
                    }}
                  >
                    1
                  </span>
                </li>
                <li className="page-item">
                  <span 
                    style={{ 
                      color: isDark ? '#8a8a8a' : '#6c757d',
                      padding: '0.375rem 0.75rem'
                    }}
                  >
                    de {totalPages}
                  </span>
                </li>
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    style={{
                      backgroundColor: isDark ? '#3a3a3a' : '#ffffff',
                      borderColor: isDark ? '#555555' : '#dee2e6',
                      color: isDark ? '#ffffff' : '#212529'
                    }}
                  >
                    ›
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Works;
