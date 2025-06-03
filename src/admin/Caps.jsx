import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Datos de ejemplo de capítulos
const capsData = [
  {
    id: 1,
    numero: "Cap. 24",
    nombre: "La Noche Profunda",
    obra: "Mi Compañera de oficina es una oveja",
    autor: "Jolly Beans",
    lectura: "Izquierda a Derecha",
    fecha: "Público 13/02/2025 a las 20:20",
    vistas: 3420,
    megustas: 40,
    comentarios: 15,
    restriccion: "Bloqueado 150 Reizu Coins"
  },
  ...Array(11).fill(null).map((_, i) => ({
    id: i + 2,
    numero: "Cap. 24",
    nombre: "La Noche Profunda",
    obra: "Mi Compañera de oficina es una oveja",
    autor: "Jolly Beans",
    lectura: "Izquierda a Derecha",
    fecha: "Público 13/02/2025 a las 20:20",
    vistas: 3420,
    megustas: 40,
    comentarios: 15,
    restriccion: "Bloqueado 150 Reizu Coins"
  }))
];

const Caps = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [accionesPorLote, setAccionesPorLote] = useState("");

  // Estados para filtros
  const [filtroFecha, setFiltroFecha] = useState("Todas las fechas");
  const [filtroLectura, setFiltroLectura] = useState("Todas las lecturas");
  const [filtroObra, setFiltroObra] = useState("Todas las Obras");
  const [filtroAutor, setFiltroAutor] = useState("Todos los autores");
  const [busqueda, setBusqueda] = useState("");

  const itemsPerPage = 12;
  const totalPages = Math.ceil(capsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = capsData.slice(startIndex, startIndex + itemsPerPage);

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
          backgroundColor: '#f8f9fa'
        }}
      >
        <div className="container-fluid p-4">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0">Gestionar Capitulo</h2>
            <button className="btn btn-outline-secondary">
              Nuevo Capitulo
            </button>
          </div>

          {/* Contadores de estado */}
          <div className="d-flex flex-wrap gap-3 mb-3">
            <span className="fw-medium">Todo (105)</span>
            <span className="text-primary" style={{ cursor: 'pointer' }}>Publicados (90)</span>
            <span className="text-muted" style={{ cursor: 'pointer' }}>Borradores (3)</span>
            <span className="text-info" style={{ cursor: 'pointer' }}>Privados (15)</span>
            <span className="text-warning" style={{ cursor: 'pointer' }}>Pendientes (5)</span>
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

          {/* Filtros */}
          <div className="row g-2 mb-3">
            <div className="col-md-2">
              <select className="form-select form-select-sm" value={filtroFecha} onChange={(e) => setFiltroFecha(e.target.value)}>
                <option>Todas las fechas</option>
                <option>Última semana</option>
                <option>Último mes</option>
              </select>
            </div>
            <div className="col-md-2">
              <select className="form-select form-select-sm" value={filtroLectura} onChange={(e) => setFiltroLectura(e.target.value)}>
                <option>Todas las lecturas</option>
                <option>Izquierda a Derecha</option>
                <option>Derecha a Izquierda</option>
              </select>
            </div>
            <div className="col-md-2">
              <select className="form-select form-select-sm" value={filtroObra} onChange={(e) => setFiltroObra(e.target.value)}>
                <option>Todas las Obras</option>
                <option>Mi Compañera de oficina es una oveja</option>
              </select>
            </div>
            <div className="col-md-2">
              <select className="form-select form-select-sm" value={filtroAutor} onChange={(e) => setFiltroAutor(e.target.value)}>
                <option>Todos los autores</option>
                <option>Jolly Beans</option>
              </select>
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary btn-sm w-100">Filtrar</button>
            </div>
            <div className="col-md-2">
              <div className="input-group input-group-sm">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Obra o Autor"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                <button className="btn btn-outline-secondary" type="button">Buscar</button>
              </div>
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
                  <th>Nro</th>
                  <th>Nombre</th>
                  <th>Obra</th>
                  <th>Autor</th>
                  <th>Lectura</th>
                  <th>Fecha <i className="bi bi-arrow-up-down small text-muted"></i></th>
                  <th>Vistas <i className="bi bi-arrow-up-down small text-muted"></i></th>
                  <th>Me Gustas <i className="bi bi-arrow-up-down small text-muted"></i></th>
                  <th>Comentarios <i className="bi bi-arrow-up-down small text-muted"></i></th>
                  <th>Restricción</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((cap) => (
                  <tr key={cap.id}>
                    <td>
                      <input 
                        type="checkbox" 
                        className="form-check-input"
                        checked={selectedItems.includes(cap.id)}
                        onChange={() => handleSelectItem(cap.id)}
                      />
                    </td>
                    <td>
                      <div>
                        <strong>{cap.numero}</strong>
                        <br />
                        <small className="text-muted">
                          <span className="text-primary" style={{ cursor: 'pointer' }}>Editar</span>
                          {' | '}
                          <span className="text-primary" style={{ cursor: 'pointer' }}>Ver</span>
                          {' | '}
                          <span className="text-primary" style={{ cursor: 'pointer' }}>Papelera</span>
                        </small>
                      </div>
                    </td>
                    <td>{cap.nombre}</td>
                    <td>{cap.obra}</td>
                    <td>{cap.autor}</td>
                    <td>{cap.lectura}</td>
                    <td>
                      <small>{cap.fecha}</small>
                    </td>
                    <td>{cap.vistas}</td>
                    <td>{cap.megustas}</td>
                    <td>{cap.comentarios}</td>
                    <td>
                      <small className="text-warning">{cap.restriccion}</small>
                    </td>
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
                  <span className="page-link">{currentPage}</span>
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

export default Caps;
