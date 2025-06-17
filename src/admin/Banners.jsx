import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

const bannersData = Array(27).fill(null).map((_, i) => ({
  id: i + 1,
  // Puedes agregar más campos si luego quieres mostrar info real
}));

const ITEMS_PER_PAGE = 9;

const Banners = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(bannersData.length / ITEMS_PER_PAGE);
  const currentItems = bannersData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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
        {/* Header y filtros */}
        <div className="p-3" style={{ background: "#e0e0e0" }}>
          <div className="d-flex align-items-center gap-2 mb-2">
            <h4 className="fw-bold mb-0">Gestionar Banners</h4>
            <Link to="/Admin/AddBanner" className="btn btn-outline-dark btn-sm">Nuevo Banner</Link>
          </div>
          <div className="mb-2">
            <span className="me-3">Todo (105)</span>
            <span className="me-3">Publicados (90)</span>
            <span className="me-3">Borradores (3)</span>
            <span>Papelera (19)</span>
          </div>
        </div>

        {/* Grid de banners */}
        <div className="p-4">
          <div className="bg-white rounded-2 p-4" style={{ minHeight: 600 }}>
            <div className="row g-4">
              {currentItems.map((banner, idx) => (
                <div key={banner.id} className="col-md-4">
                  <div className="d-flex flex-column align-items-center">
                    <div
                      style={{
                        width: "100%",
                        height: 120,
                        background: "#d2d2d2",
                        borderRadius: 8,
                        marginBottom: 12
                      }}
                    />
                    <button className="btn btn-dark w-50">Editar</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Paginación */}
            <div className="d-flex justify-content-between align-items-center mt-5">
              <span className="text-muted">{currentItems.length} elementos</span>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                    >«</button>
                  </li>
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >‹</button>
                  </li>
                  <li className="page-item active">
                    <span className="page-link">{currentPage}</span>
                  </li>
                  <li className="page-item">
                    <span className="page-link bg-white border-0 text-muted">de {totalPages}</span>
                  </li>
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >›</button>
                  </li>
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                    >»</button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banners;
