import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Datos de ejemplo de comentarios
const commentsData = [
  {
    id: 1,
    usuario: "FedArt",
    email: "FedArt@gmail.com",
    ip: "177.23.232.56",
    comentario: "En Respuesta a Akumano is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
    hechoEn: "Zamu Capitulo 20",
    verCapitulo: "Ver Capitulo",
    fecha: "Publico 13/02/2025 a las 20:20",
    estado: "publico"
  },
  ...Array(6).fill(null).map((_, i) => ({
    id: i + 2,
    usuario: "FedArt",
    email: "FedArt@gmail.com",
    ip: "177.23.232.56",
    comentario: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
    hechoEn: "Zamu Capitulo 20",
    verCapitulo: "Ver Capitulo",
    fecha: "Publico 13/02/2025 a las 20:20",
    estado: "publico"
  }))
];

const Comments = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [accionesPorLote, setAccionesPorLote] = useState("");

  const itemsPerPage = 7;
  const totalPages = Math.ceil(commentsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = commentsData.slice(startIndex, startIndex + itemsPerPage);

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
          <div className="mb-4">
            <h2 className="fw-bold mb-0">Gestionar Comentarios</h2>
          </div>

          {/* Contadores de estado */}
          <div className="d-flex flex-wrap gap-3 mb-3">
            <span className="fw-medium">Todo (105)</span>
            <span className="text-primary" style={{ cursor: 'pointer' }}>Spam (90)</span>
            <span className="text-muted" style={{ cursor: 'pointer' }}>Rechazado (3)</span>
            <span className="text-warning" style={{ cursor: 'pointer' }}>Pendientes (5)</span>
            <span className="text-danger" style={{ cursor: 'pointer' }}>Papelera (19)</span>
          </div>

          {/* Acciones por lote */}
          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="d-flex align-items-center gap-2">
              <select 
                className="form-select form-select-sm" 
                style={{ width: 'auto' }}
                value={accionesPorLote}
                onChange={(e) => setAccionesPorLote(e.target.value)}
              >
                <option value="">Acciones por lote</option>
                <option value="aprobar">Aprobar</option>
                <option value="rechazar">Rechazar</option>
                <option value="spam">Marcar como Spam</option>
                <option value="eliminar">Eliminar</option>
              </select>
              <button className="btn btn-dark btn-sm">Aplicar</button>
            </div>
          </div>

          {/* Tabla */}
          <div className="table-responsive">
            <table className="table table-hover" style={{ backgroundColor: 'white' }}>
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
                  <th>Usuario</th>
                  <th>Comentario</th>
                  <th>Hecho en</th>
                  <th>Fecha <i className="bi bi-arrow-up-down small text-muted"></i></th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((comment) => (
                  <tr key={comment.id}>
                    <td>
                      <input 
                        type="checkbox" 
                        className="form-check-input"
                        checked={selectedItems.includes(comment.id)}
                        onChange={() => handleSelectItem(comment.id)}
                      />
                    </td>
                    <td>
                      <div>
                        <strong>{comment.usuario}</strong>
                        <br />
                        <small className="text-muted">{comment.email}</small>
                        <br />
                        <small className="text-muted">{comment.ip}</small>
                      </div>
                    </td>
                    <td style={{ maxWidth: '400px' }}>
                      <div className="mb-2">
                        {comment.comentario.includes("En Respuesta a") && (
                          <span className="text-primary">En Respuesta a </span>
                        )}
                        {comment.comentario.replace("En Respuesta a Akumano", "").replace("En Respuesta a ", "")}
                      </div>
                      <div className="d-flex gap-2 flex-wrap">
                        <button className="btn btn-link btn-sm p-0 text-primary">Responder</button>
                        <button className="btn btn-link btn-sm p-0 text-primary">Rechazar</button>
                        <button className="btn btn-link btn-sm p-0 text-primary">Spam</button>
                        <button className="btn btn-link btn-sm p-0 text-primary">Eliminar</button>
                      </div>
                    </td>
                    <td>
                      <div>
                        {comment.hechoEn}
                        <br />
                        <small>
                          <a href="#" className="text-primary text-decoration-none">
                            {comment.verCapitulo}
                          </a>
                        </small>
                      </div>
                    </td>
                    <td>
                      <small>{comment.fecha}</small>
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
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                  >
                    ««
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
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    »»
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

export default Comments;
