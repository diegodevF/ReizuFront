import React, { useState, useEffect } from 'react';
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
  fecha: "13/02/2025 a las 20:20",
  estado: i % 4 === 0 ? 'Borrador' : i % 4 === 1 ? 'Privado' : i % 4 === 2 ? 'Pendiente' : 'Publicado'
}));

const ITEMS_PER_PAGE = 7;

// Función para obtener el tema actual
const getTheme = () => {
  if (typeof document !== "undefined") {
    return document.documentElement.getAttribute("data-bs-theme") || "light";
  }
  return "light";
};

const ProductsShop = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState(getTheme());
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [accionesPorLote, setAccionesPorLote] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("Todas las fechas");
  const [filtroObra, setFiltroObra] = useState("Todas las obras");
  const [filtroCondiciones, setFiltroCondiciones] = useState("Todas las condiciones");
  const [filtroRestricciones, setFiltroRestricciones] = useState("Todas las Restricciones");
  const [busqueda, setBusqueda] = useState("");

  // Detectar cambios en el tema
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(getTheme());
    });
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['data-bs-theme'] 
    });
    return () => observer.disconnect();
  }, []);

  const isDarkMode = theme === 'dark';

  // Estadísticas
  const stats = {
    total: 105,
    publicados: 90,
    borradores: 3,
    privados: 15,
    pendientes: 5,
    papelera: 19
  };

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

  // Estilos para inputs con focus rojo
  const inputStyles = {
    background: isDarkMode ? '#2d2d2d' : '#fff',
    color: isDarkMode ? '#fff' : '#333',
    border: `1px solid ${isDarkMode ? '#404040' : '#ced4da'}`,
    borderRadius: '8px',
    padding: '8px 12px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
  };

  const inputFocusStyles = {
    borderColor: '#d32f2f',
    boxShadow: '0 0 0 0.2rem rgba(211, 47, 47, 0.25)'
  };

  // Obtener color según el estado
  const getStatusColor = (estado) => {
    switch(estado) {
      case 'Publicado': return '#198754';
      case 'Borrador': return '#6c757d';
      case 'Privado': return '#0d6efd';
      case 'Pendiente': return '#ffc107';
      default: return '#6c757d';
    }
  };

  return (
    <div className="d-flex" style={{
      background: isDarkMode ? '#121212' : '#f5f7fa',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif',
      transition: 'background-color 0.3s ease'
    }}>
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
          className="btn position-fixed"
          style={{
            top: 16,
            left: 0,
            zIndex: 2000,
            borderRadius: '0% 50% 50% 0%',
            width: 38,
            height: 38,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: "#d32f2f",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(211, 47, 47, 0.3)"
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
          minHeight: "100vh"
        }}
      >
        {/* Header */}
        <div style={{ 
          background: isDarkMode ? '#1e1e1e' : '#fff',
          padding: '32px 48px 24px 48px',
          borderBottom: `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}`,
          boxShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <h2 style={{
                fontWeight: 700,
                fontSize: 28,
                color: isDarkMode ? '#fff' : '#2d3748',
                margin: 0,
                marginBottom: 8
              }}>
                <i className="bi bi-shop me-2" style={{ color: '#d32f2f' }}></i>
                Gestionar Artículos
              </h2>
              <p style={{ 
                color: isDarkMode ? '#adb5bd' : '#6c757d',
                fontSize: '16px',
                margin: 0
              }}>
                Administra todos los productos de la tienda
              </p>
            </div>
            <Link 
              to={"/Admin/AddProduct"} 
              style={{
                background: 'linear-gradient(135deg, #d32f2f 0%, #e53935 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '14px 28px',
                fontWeight: 600,
                fontSize: 16,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 4px 15px rgba(211, 47, 47, 0.3)',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={e => e.target.style.transform = 'translateY(-1px)'}
              onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Nuevo Artículo
            </Link>
          </div>

          {/* Estadísticas */}
          <div style={{ 
            fontSize: 16, 
            color: isDarkMode ? '#adb5bd' : '#6c757d', 
            fontWeight: 500,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <span><strong style={{ color: isDarkMode ? '#fff' : '#2d3748' }}>Todo</strong> ({stats.total})</span>
            <span>Publicados ({stats.publicados})</span>
            <span>Borradores ({stats.borradores})</span>
            <span>Privados ({stats.privados})</span>
            <span>Pendientes ({stats.pendientes})</span>
            <span>Papelera ({stats.papelera})</span>
          </div>
        </div>

        <div className="p-4">
          <div style={{
            background: isDarkMode ? '#1e1e1e' : '#fff',
            borderRadius: 16,
            padding: 32,
            boxShadow: isDarkMode 
              ? '0 4px 20px rgba(0,0,0,0.3)' 
              : '0 4px 20px rgba(0,0,0,0.08)',
            border: `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}`
          }}>
            {/* Filtros y acciones */}
            <div className="d-flex flex-wrap gap-3 mb-4 align-items-center">
              <select 
                style={{
                  ...inputStyles,
                  minWidth: 160
                }}
                value={accionesPorLote} 
                onChange={e => setAccionesPorLote(e.target.value)}
                onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                onBlur={e => Object.assign(e.target.style, inputStyles)}
              >
                <option>Acciones por lote</option>
                <option>Eliminar</option>
                <option>Publicar</option>
                <option>Archivar</option>
              </select>
              
              <button style={{
                background: 'linear-gradient(135deg, #d32f2f 0%, #e53935 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '8px 20px',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer'
              }}>
                Aplicar
              </button>

              <select 
                style={{
                  ...inputStyles,
                  minWidth: 140
                }}
                value={filtroFecha} 
                onChange={e => setFiltroFecha(e.target.value)}
                onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                onBlur={e => Object.assign(e.target.style, inputStyles)}
              >
                <option>Todas las fechas</option>
                <option>Hoy</option>
                <option>Esta semana</option>
                <option>Este mes</option>
              </select>

              <select 
                style={{
                  ...inputStyles,
                  minWidth: 140
                }}
                value={filtroObra} 
                onChange={e => setFiltroObra(e.target.value)}
                onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                onBlur={e => Object.assign(e.target.style, inputStyles)}
              >
                <option>Todas las obras</option>
                <option>Horned</option>
                <option>Mystic Tales</option>
              </select>

              <select 
                style={{
                  ...inputStyles,
                  minWidth: 160
                }}
                value={filtroCondiciones} 
                onChange={e => setFiltroCondiciones(e.target.value)}
                onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                onBlur={e => Object.assign(e.target.style, inputStyles)}
              >
                <option>Todas las condiciones</option>
                <option>Disponible</option>
                <option>Agotado</option>
              </select>

              <select 
                style={{
                  ...inputStyles,
                  minWidth: 180
                }}
                value={filtroRestricciones} 
                onChange={e => setFiltroRestricciones(e.target.value)}
                onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                onBlur={e => Object.assign(e.target.style, inputStyles)}
              >
                <option>Todas las Restricciones</option>
                <option>Sin restricciones</option>
                <option>Contenido adulto</option>
              </select>

              <button style={{
                background: isDarkMode ? '#404040' : '#6c757d',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '8px 20px',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer'
              }}>
                Filtrar
              </button>

              <input
                type="text"
                style={{
                  ...inputStyles,
                  minWidth: 200
                }}
                placeholder="Buscar productos..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                onBlur={e => Object.assign(e.target.style, inputStyles)}
              />

              <button style={{
                background: 'linear-gradient(135deg, #d32f2f 0%, #e53935 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '8px 20px',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer'
              }}>
                <i className="bi bi-search me-1"></i>
                Buscar
              </button>
            </div>

            {/* Tabla */}
            <div className="table-responsive">
              <table style={{
                width: '100%',
                borderCollapse: 'separate',
                borderSpacing: 0,
                fontSize: 14
              }}>
                <thead>
                  <tr style={{
                    background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
                    borderBottom: `2px solid ${isDarkMode ? '#404040' : '#e9ecef'}`
                  }}>
                    <th style={{ 
                      padding: '16px 20px', 
                      textAlign: 'left', 
                      width: 40
                    }}>
                      <input 
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        style={{ accentColor: '#d32f2f' }}
                      />
                    </th>
                    <th style={{ 
                      padding: '16px 20px', 
                      textAlign: 'left',
                      color: isDarkMode ? '#fff' : '#2d3748',
                      fontWeight: 600,
                      minWidth: 120
                    }}>
                      Artículo
                    </th>
                    <th style={{ 
                      padding: '16px 20px', 
                      textAlign: 'left',
                      color: isDarkMode ? '#fff' : '#2d3748',
                      fontWeight: 600,
                      minWidth: 200
                    }}>
                      Nombre
                    </th>
                    <th style={{ 
                      padding: '16px 20px', 
                      textAlign: 'left',
                      color: isDarkMode ? '#fff' : '#2d3748',
                      fontWeight: 600,
                      minWidth: 140
                    }}>
                      Precio
                    </th>
                    <th style={{ 
                      padding: '16px 20px', 
                      textAlign: 'left',
                      color: isDarkMode ? '#fff' : '#2d3748',
                      fontWeight: 600,
                      minWidth: 100
                    }}>
                      Tipo
                    </th>
                    <th style={{ 
                      padding: '16px 20px', 
                      textAlign: 'left',
                      color: isDarkMode ? '#fff' : '#2d3748',
                      fontWeight: 600,
                      minWidth: 140
                    }}>
                      Creador
                    </th>
                    <th style={{ 
                      padding: '16px 20px', 
                      textAlign: 'left',
                      color: isDarkMode ? '#fff' : '#2d3748',
                      fontWeight: 600,
                      minWidth: 140
                    }}>
                      Obra Relacionada
                    </th>
                    <th style={{ 
                      padding: '16px 20px', 
                      textAlign: 'left',
                      color: isDarkMode ? '#fff' : '#2d3748',
                      fontWeight: 600,
                      minWidth: 160
                    }}>
                      Fecha
                    </th>
                    <th style={{ width: 20 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((product, idx) => (
                    <tr key={product.id} style={{
                      borderBottom: `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}`,
                      background: idx % 2 === 0 
                        ? (isDarkMode ? '#1e1e1e' : '#fff') 
                        : (isDarkMode ? '#252525' : '#fafbfc'),
                      transition: 'background-color 0.2s ease'
                    }}>
                      <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                        <input 
                          type="checkbox"
                          checked={selectedItems.includes(product.id)}
                          onChange={() => handleSelectItem(product.id)}
                          style={{ accentColor: '#d32f2f' }}
                        />
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <div className="d-flex flex-column align-items-center">
                          <div
                            style={{
                              width: 50,
                              height: 50,
                              background: isDarkMode ? '#404040' : '#e9ecef',
                              borderRadius: 8,
                              marginBottom: 8,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: `1px solid ${isDarkMode ? '#555' : '#dee2e6'}`
                            }}
                          >
                            <i className="bi bi-image" style={{ 
                              fontSize: 20, 
                              color: isDarkMode ? '#666' : '#999' 
                            }}></i>
                          </div>
                          <div style={{ 
                            fontSize: 12,
                            display: 'flex',
                            gap: 8
                          }}>
                            <span style={{ 
                              cursor: 'pointer',
                              color: '#0d6efd',
                              fontWeight: 500
                            }}>
                              Editar
                            </span>
                            <span style={{ 
                              cursor: 'pointer',
                              color: '#0d6efd',
                              fontWeight: 500
                            }}>
                              Ver
                            </span>
                            <span style={{ 
                              cursor: 'pointer',
                              color: '#d32f2f',
                              fontWeight: 500
                            }}>
                              Eliminar
                            </span>
                          </div>
                        </div>
                      </td>
                      <td style={{ 
                        padding: '16px 20px',
                        fontWeight: 600,
                        color: isDarkMode ? '#fff' : '#2d3748'
                      }}>
                        {product.nombre}
                      </td>
                      <td style={{ 
                        padding: '16px 20px',
                        fontWeight: 600,
                        color: '#d32f2f'
                      }}>
                        {product.precio}
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{
                          background: '#0d6efd',
                          color: '#fff',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: 12,
                          fontWeight: 600
                        }}>
                          {product.tipo}
                        </span>
                      </td>
                      <td style={{ 
                        padding: '16px 20px',
                        color: isDarkMode ? '#adb5bd' : '#6c757d',
                        fontWeight: 500
                      }}>
                        {product.creador}
                      </td>
                      <td style={{ 
                        padding: '16px 20px',
                        color: isDarkMode ? '#adb5bd' : '#6c757d',
                        fontWeight: 500
                      }}>
                        {product.obra}
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <div>
                          <span style={{
                            background: getStatusColor(product.estado),
                            color: '#fff',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: 12,
                            fontWeight: 600,
                            display: 'inline-block',
                            marginBottom: 4
                          }}>
                            {product.estado}
                          </span>
                          <div style={{ 
                            fontSize: 13,
                            color: isDarkMode ? '#adb5bd' : '#6c757d'
                          }}>
                            {product.fecha}
                          </div>
                        </div>
                      </td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            <div className="d-flex justify-content-between align-items-center mt-4">
              <span style={{ 
                fontSize: 16, 
                color: isDarkMode ? '#adb5bd' : '#6c757d',
                fontWeight: 500
              }}>
                {productsData.length} elementos
              </span>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                {/* Botón primera página */}
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  style={{
                    background: 'transparent',
                    border: `2px solid ${isDarkMode ? '#404040' : '#e9ecef'}`,
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: currentPage === 1 
                      ? (isDarkMode ? '#666' : '#ccc')
                      : (isDarkMode ? '#fff' : '#2d3748'),
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontWeight: '600',
                    opacity: currentPage === 1 ? 0.5 : 1
                  }}
                >
                  «
                </button>

                {/* Botón anterior */}
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{
                    background: 'transparent',
                    border: `2px solid ${isDarkMode ? '#404040' : '#e9ecef'}`,
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: currentPage === 1 
                      ? (isDarkMode ? '#666' : '#ccc')
                      : (isDarkMode ? '#fff' : '#2d3748'),
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontWeight: '600',
                    opacity: currentPage === 1 ? 0.5 : 1
                  }}
                >
                  ‹
                </button>

                {/* Página actual */}
                <span style={{
                  background: 'linear-gradient(135deg, #d32f2f 0%, #e53935 100%)',
                  color: '#fff',
                  border: '2px solid #d32f2f',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontWeight: '600',
                  minWidth: '44px',
                  textAlign: 'center'
                }}>
                  {currentPage}
                </span>

                <span style={{ 
                  color: isDarkMode ? '#adb5bd' : '#6c757d',
                  fontWeight: 500,
                  padding: '0 8px'
                }}>
                  de {totalPages}
                </span>

                {/* Botón siguiente */}
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{
                    background: 'transparent',
                    border: `2px solid ${isDarkMode ? '#404040' : '#e9ecef'}`,
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: currentPage === totalPages 
                      ? (isDarkMode ? '#666' : '#ccc')
                      : (isDarkMode ? '#fff' : '#2d3748'),
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    fontWeight: '600',
                    opacity: currentPage === totalPages ? 0.5 : 1
                  }}
                >
                  ›
                </button>

                {/* Botón última página */}
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  style={{
                    background: 'transparent',
                    border: `2px solid ${isDarkMode ? '#404040' : '#e9ecef'}`,
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: currentPage === totalPages 
                      ? (isDarkMode ? '#666' : '#ccc')
                      : (isDarkMode ? '#fff' : '#2d3748'),
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    fontWeight: '600',
                    opacity: currentPage === totalPages ? 0.5 : 1
                  }}
                >
                  »
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsShop;
