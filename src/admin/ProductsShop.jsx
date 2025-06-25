import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

// Datos de ejemplo (puedes reemplazar por tu API)
const productsData = Array(12).fill(null).map((_, i) => ({
  id: i + 1,
  nombre: "La Noche Profunda",
  precio: "200 Reizu Coins",
  tipo: "Sticker",
  creador: "Jolty Beans",
  obra: "Horned",
  fecha: "Publico 13/02/2025 a las 20:20"
}));

const ITEMS_PER_PAGE = 7;

const ProductsShop = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [accionesPorLote, setAccionesPorLote] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("Todas las fechas");
  const [filtroObra, setFiltroObra] = useState("Todas las obras");
  const [filtroCondiciones, setFiltroCondiciones] = useState("Todas las condiciones");
  const [filtroRestricciones, setFiltroRestricciones] = useState("Todas las Restricciones");
  const [busqueda, setBusqueda] = useState("");

  // Paginación
  const totalPages = Math.ceil(productsData.length / ITEMS_PER_PAGE);
  const currentItems = productsData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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
        <div className="p-3" style={{ background: "#e0e0e0" }}>
          <div className="d-flex align-items-center gap-2 mb-2">
            <h4 className="fw-bold mb-0">Gestionar Artículos</h4>
            <Link to={"/Admin/AddProduct"} className="btn btn-outline-dark btn-sm">Nuevo Artículo</Link>
          </div>
          <div className="mb-2">
            <span className="me-3">Todo (105)</span>
            <span className="me-3">Publicados (90)</span>
            <span className="me-3">Borradores (3)</span>
            <span className="me-3">Privados (15)</span>
            <span className="me-3">Pendientes (5)</span>
            <span>Papelera (19)</span>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-white rounded-2 p-4">
            {/* Filtros y acciones */}
            <div className="d-flex flex-wrap gap-2 mb-3 align-items-center">
              <select className="form-select form-select-sm" style={{ width: 140 }} value={accionesPorLote} onChange={e => setAccionesPorLote(e.target.value)}>
                <option>Acciones por lote</option>
                <option>Eliminar</option>
                <option>Publicar</option>
                <option>Archivar</option>
              </select>
              <button className="btn btn-dark btn-sm">Aplicar</button>
              <select className="form-select form-select-sm" style={{ width: 140 }} value={filtroFecha} onChange={e => setFiltroFecha(e.target.value)}>
                <option>Todas las fechas</option>
              </select>
              <select className="form-select form-select-sm" style={{ width: 140 }} value={filtroObra} onChange={e => setFiltroObra(e.target.value)}>
                <option>Todas las obras</option>
              </select>
              <select className="form-select form-select-sm" style={{ width: 140 }} value={filtroCondiciones} onChange={e => setFiltroCondiciones(e.target.value)}>
                <option>Todas las condiciones</option>
              </select>
              <select className="form-select form-select-sm" style={{ width: 160 }} value={filtroRestricciones} onChange={e => setFiltroRestricciones(e.target.value)}>
                <option>Todas las Restricciones</option>
              </select>
              <button className="btn btn-outline-dark btn-sm">Filtrar</button>
              <input
                type="text"
                className="form-control form-control-sm"
                style={{ width: 120 }}
                placeholder=""
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
              />
              <button className="btn btn-dark btn-sm">Buscar</button>
            </div>

            {/* Tabla */}
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>
                      <input 
                        type="checkbox" 
                        className="form-check-input"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th>Artículo</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Tipo</th>
                    <th>Creador</th>
                    <th>Obra Relacionada</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((product, idx) => (
                    <tr key={product.id}>
                      <td>
                        <input 
                          type="checkbox" 
                          className="form-check-input"
                          checked={selectedItems.includes(product.id)}
                          onChange={() => handleSelectItem(product.id)}
                        />
                      </td>
                      <td>
                        <div className="d-flex flex-column align-items-center">
                          <div
                            style={{
                              width: 48,
                              height: 48,
                              background: "#d2d2d2",
                              borderRadius: 4,
                              marginBottom: 4
                            }}
                          />
                          <div className="text-muted small">
                            <span className="me-2" style={{ cursor: 'pointer' }}>Editar</span>
                            <span className="me-2" style={{ cursor: 'pointer' }}>Ver</span>
                            <span style={{ cursor: 'pointer' }}>Papelera</span>
                          </div>
                        </div>
                      </td>
                      <td>{product.nombre}</td>
                      <td>{product.precio}</td>
                      <td>{product.tipo}</td>
                      <td>{product.creador}</td>
                      <td>{product.obra}</td>
                      <td>
                        <div>
                          <span className="d-block">Publico</span>
                          <small className="text-muted">{product.fecha}</small>
                        </div>
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

export default ProductsShop;
