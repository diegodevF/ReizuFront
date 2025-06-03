import React, { useState } from 'react';
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
        }}
      >
        <div className="container-fluid p-4">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0">Gestionar Obras</h2>
            <Link to="/admin/AddWork" className="btn btn-outline-secondary">
              Nueva obra
            </Link>
          </div>

          {/* Filtros de estado con contadores */}
          <div className="d-flex flex-wrap gap-3 mb-3">
            <span className="fw-medium">Todo (105)</span>
            <span className="text-primary" style={{ cursor: 'pointer' }}>Publicados (90)</span>
            <span className="text-muted" style={{ cursor: 'pointer' }}>Privadas (15)</span>
            <span className="text-warning" style={{ cursor: 'pointer' }}>Pendientes (5)</span>
            <span className="text-info" style={{ cursor: 'pointer' }}>Archivadas (10)</span>
            <span className="text-danger" style={{ cursor: 'pointer' }}>Papelera (19)</span>
          </div>

          {/* Acciones por lote */}
          <div className="d-flex align-items-center gap-3 mb-3">
            <div className="d-flex align-items-center gap-2">
              <select 
                className="form-select form-select-sm" 
                style={{ width: 'auto' }}
                value={accionesPorLote}
                onChange={(e) => setAccionesPorLote(e.target.value)}
              >
                <option value="">Acciones por lote</option>
                <option value="eliminar">Eliminar</option>
                <option value="archivar">Archivar</option>
                <option value="publicar">Publicar</option>
              </select>
              <button className="btn btn-outline-secondary btn-sm">Aplicar</button>
            </div>
          </div>

          {/* Filtros adicionales */}
          <div className="row g-2 mb-3">
            <div className="col-md-2">
              <select className="form-select form-select-sm" value={filtroFecha} onChange={(e) => setFiltroFecha(e.target.value)}>
                <option>Todas las fechas</option>
              </select>
            </div>
            <div className="col-md-2">
              <select className="form-select form-select-sm" value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
                <option>Todos los estados</option>
              </select>
            </div>
            <div className="col-md-2">
              <select className="form-select form-select-sm" value={filtroCondiciones} onChange={(e) => setFiltroCondiciones(e.target.value)}>
                <option>Todas las condiciones</option>
              </select>
            </div>
            <div className="col-md-2">
              <select className="form-select form-select-sm" value={filtroOrientaciones} onChange={(e) => setFiltroOrientaciones(e.target.value)}>
                <option>Todas las Orientaciones</option>
              </select>
            </div>
            <div className="col-md-2">
              <select className="form-select form-select-sm" value={filtroFormatos} onChange={(e) => setFiltroFormatos(e.target.value)}>
                <option>Todos los formatos</option>
              </select>
            </div>
            <div className="col-md-2">
              <select className="form-select form-select-sm" value={filtroPeriodicidad} onChange={(e) => setFiltroPeriodicidad(e.target.value)}>
                <option>Todas las Periodicidad</option>
              </select>
            </div>
          </div>

          <div className="row g-2 mb-4">
            <div className="col-md-2">
              <select className="form-select form-select-sm" value={filtroGeneros} onChange={(e) => setFiltroGeneros(e.target.value)}>
                <option>Todos los géneros</option>
              </select>
            </div>
            <div className="col-md-8"></div>
            <div className="col-md-2 d-flex gap-2">
              <button className="btn btn-primary btn-sm">Filtrar</button>
              <button className="btn btn-outline-secondary btn-sm">Buscar</button>
            </div>
          </div>

          {/* Tabla */}
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-light">
                <tr>
                  <th style={{ width: '40px' }}>
                    <input 
                      type="checkbox" 
                      className="form-check-input"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>Título <i className="bi bi-arrow-up-down small text-muted"></i></th>
                  <th>Artista(s)</th>
                  <th>Tipo</th>
                  <th>Periodicidad</th>
                  <th>Géneros</th>
                  <th>Fecha <i className="bi bi-arrow-up-down small text-muted"></i></th>
                  <th>Visitas <i className="bi bi-arrow-up-down small text-muted"></i></th>
                  <th>Me gustas <i className="bi bi-arrow-up-down small text-muted"></i></th>
                  <th>Favoritos <i className="bi bi-arrow-up-down small text-muted"></i></th>
                  <th>Comentarios <i className="bi bi-arrow-up-down small text-muted"></i></th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((obra) => (
                  <tr key={obra.id}>
                    <td>
                      <input 
                        type="checkbox" 
                        className="form-check-input"
                        checked={selectedItems.includes(obra.id)}
                        onChange={() => handleSelectItem(obra.id)}
                      />
                    </td>
                    <td>
                      <div>
                        <strong>{obra.titulo}</strong>
                        <br />
                        <small className="text-muted">
                          <span className="text-primary" style={{ cursor: 'pointer' }}>Editar</span>
                          {' | '}
                          <span className="text-primary" style={{ cursor: 'pointer' }}>Ver</span>
                          {' | '}
                          <span className="text-danger" style={{ cursor: 'pointer' }}>Papelera</span>
                        </small>
                      </div>
                    </td>
                    <td>{obra.artista}</td>
                    <td>{obra.tipo}</td>
                    <td>{obra.periodicidad}</td>
                    <td>{obra.generos}</td>
                    <td>
                      <small>{obra.fecha}</small>
                    </td>
                    <td>{obra.visitas}</td>
                    <td>{obra.megustas}</td>
                    <td>{obra.favoritos}</td>
                    <td>{obra.comentarios}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <span className="text-muted">200 elementos</span>
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    «
                  </button>
                </li>
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    ‹
                  </button>
                </li>
                <li className="page-item active">
                  <span className="page-link">1</span>
                </li>
                <li className="page-item">
                  <span className="text-muted">de {totalPages}</span>
                </li>
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
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
