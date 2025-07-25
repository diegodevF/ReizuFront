import React, { useState, useEffect } from 'react';
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
  ...Array(20).fill(null).map((_, i) => ({
    id: i + 2,
    usuario: ["FedArt", "MangaLover", "ComicFan", "Otaku123"][i % 4],
    email: [`user${i + 2}@gmail.com`],
    ip: `177.23.232.${Math.floor(Math.random() * 255)}`,
    comentario: "Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
    hechoEn: ["Zamu Capitulo 20", "Dragon Ball Capitulo 15", "Naruto Capitulo 8", "One Piece Capitulo 33"][i % 4],
    verCapitulo: "Ver Capitulo",
    fecha: `Publico ${Math.floor(Math.random() * 28) + 1}/02/2025 a las ${Math.floor(Math.random() * 12) + 10}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    estado: ["publico", "spam", "pendiente", "rechazado"][i % 4]
  }))
];

const getTheme = () => {
  if (typeof document !== "undefined") {
    return document.documentElement.getAttribute("data-bs-theme") || "light";
  }
  return "light";
};

const Comments = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [accionesPorLote, setAccionesPorLote] = useState("");
  const [theme, setTheme] = useState(getTheme());
  const [filter, setFilter] = useState('all');

  const isDark = theme === 'dark';

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

  const itemsPerPage = 8;
  
  // Filtrar datos según el filtro seleccionado
  const filteredData = commentsData.filter(comment => {
    if (filter === 'all') return true;
    if (filter === 'spam') return comment.estado === 'spam';
    if (filter === 'pendiente') return comment.estado === 'pendiente';
    if (filter === 'rechazado') return comment.estado === 'rechazado';
    if (filter === 'publico') return comment.estado === 'publico';
    return true;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Reset página cuando cambia filtro
  useEffect(() => {
    setCurrentPage(1);
    setSelectedItems([]);
    setSelectAll(false);
  }, [filter]);

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

  const getEstadoBadge = (estado) => {
    const styles = {
      publico: {
        background: 'rgba(40, 167, 69, 0.1)',
        color: '#28a745',
        border: '1px solid rgba(40, 167, 69, 0.3)'
      },
      spam: {
        background: 'rgba(220, 53, 69, 0.1)',
        color: '#dc3545',
        border: '1px solid rgba(220, 53, 69, 0.3)'
      },
      pendiente: {
        background: 'rgba(255, 193, 7, 0.1)',
        color: '#ffc107',
        border: '1px solid rgba(255, 193, 7, 0.3)'
      },
      rechazado: {
        background: 'rgba(108, 117, 125, 0.1)',
        color: '#6c757d',
        border: '1px solid rgba(108, 117, 125, 0.3)'
      }
    };

    return styles[estado] || styles.publico;
  };

  return (
    <div className="d-flex" style={{
      background: isDark ? '#1a1a1a' : '#f5f5f5',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      transition: 'all 0.3s ease'
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

      <Sidebar 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />

      {/* Botón flotante con ROJO */}
      {!sidebarOpen && (
        <button
          className="btn position-fixed"
          style={{
            top: 20,
            left: 20,
            zIndex: 2000,
            borderRadius: '50%',
            width: 50,
            height: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(220, 53, 69, 0.4)',
            transition: 'all 0.3s ease'
          }}
          onClick={() => setSidebarOpen(true)}
        >
          <i className="bi bi-list" style={{ fontSize: 20 }}></i>
        </button>
      )}
      
      {/* Contenido principal */}
      <div
        style={{
          flexGrow: 1,
          marginLeft: sidebarOpen ? 280 : 0,
          transition: 'margin-left 0.3s ease',
          minHeight: '100vh'
        }}
      >
        {/* Header mejorado */}
        <div style={{
          background: isDark ? '#2d2d2d' : '#ffffff',
          padding: '2rem 3rem',
          borderBottom: isDark ? '1px solid #444' : '1px solid #ddd',
          boxShadow: isDark ? '0 1px 3px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div>
              <h1 style={{
                fontWeight: 800,
                fontSize: '2rem',
                color: isDark ? '#f0f0f0' : '#333',
                margin: 0,
                letterSpacing: '-0.5px'
              }}>
                Gestionar Comentarios
              </h1>
              <p style={{
                color: isDark ? '#aaa' : '#666',
                margin: '0.5rem 0 0 0',
                fontSize: '1.1rem'
              }}>
                Moderar y administrar comentarios de usuarios
              </p>
            </div>
            <button style={{
              background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 8px rgba(220, 53, 69, 0.25)',
              transition: 'all 0.2s ease'
            }}>
              <i className="bi bi-plus-lg"></i>
              Acciones Rápidas
            </button>
          </div>

          {/* Stats de comentarios con ROJO para activo */}
          <div style={{
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            {[
              { label: 'Todos', value: 'all', count: commentsData.length, active: filter === 'all' },
              { label: 'Spam', value: 'spam', count: commentsData.filter(c => c.estado === 'spam').length, active: filter === 'spam' },
              { label: 'Rechazados', value: 'rechazado', count: commentsData.filter(c => c.estado === 'rechazado').length, active: filter === 'rechazado' },
              { label: 'Pendientes', value: 'pendiente', count: commentsData.filter(c => c.estado === 'pendiente').length, active: filter === 'pendiente' },
              { label: 'Públicos', value: 'publico', count: commentsData.filter(c => c.estado === 'publico').length, active: filter === 'publico' }
            ].map((stat) => (
              <button
                key={stat.label}
                onClick={() => setFilter(stat.value)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: stat.active 
                    ? '#dc3545' 
                    : (isDark ? '#888' : '#777'),
                  fontWeight: stat.active ? 700 : 500,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  padding: '4px 0',
                  borderBottom: stat.active ? '2px solid #dc3545' : '2px solid transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                <strong>{stat.label}</strong> ({stat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Filtros mejorados */}
        <div style={{
          background: isDark ? '#1a1a1a' : '#f5f5f5',
          padding: '1.5rem 3rem',
          borderBottom: isDark ? '1px solid #333' : '1px solid #ddd',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <select 
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                border: isDark ? '1px solid #444' : '1px solid #ccc',
                background: isDark ? '#2d2d2d' : '#ffffff',
                color: isDark ? '#f0f0f0' : '#333',
                fontSize: '0.9rem'
              }}
              value={accionesPorLote}
              onChange={(e) => setAccionesPorLote(e.target.value)}
              disabled={selectedItems.length === 0}
            >
              <option value="">Acciones por lote</option>
              <option value="aprobar">Aprobar</option>
              <option value="rechazar">Rechazar</option>
              <option value="spam">Marcar como Spam</option>
              <option value="eliminar">Eliminar</option>
            </select>
            <button
              disabled={selectedItems.length === 0}
              style={{
                background: selectedItems.length > 0 
                  ? 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)'
                  : (isDark ? '#333' : '#e5e5e5'),
                color: selectedItems.length > 0 ? '#fff' : (isDark ? '#888' : '#999'),
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '0.9rem',
                cursor: selectedItems.length > 0 ? 'pointer' : 'not-allowed',
                fontWeight: 500,
                boxShadow: selectedItems.length > 0 ? '0 1px 3px rgba(220, 53, 69, 0.25)' : 'none'
              }}
            >
              Aplicar ({selectedItems.length})
            </button>
          </div>
        </div>

        {/* Tabla mejorada */}
        <div style={{ padding: '2rem 3rem' }}>
          <div style={{
            background: isDark ? '#2d2d2d' : '#ffffff',
            border: isDark ? '1px solid #444' : '1px solid #ddd',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: isDark 
              ? '0 3px 10px rgba(0,0,0,0.3)' 
              : '0 3px 10px rgba(0,0,0,0.1)'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse'
            }}>
              <thead>
                <tr style={{
                  background: isDark ? '#1a1a1a' : '#f5f5f5',
                  borderBottom: isDark ? '1px solid #444' : '1px solid #ddd'
                }}>
                  <th style={{ padding: '1rem', width: '50px' }}>
                    <input 
                      type="checkbox" 
                      checked={selectAll}
                      onChange={handleSelectAll}
                      style={{ 
                        cursor: 'pointer',
                        accentColor: '#dc3545'
                      }}
                    />
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: isDark ? '#f0f0f0' : '#333' }}>Usuario</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: isDark ? '#f0f0f0' : '#333' }}>Comentario</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: isDark ? '#f0f0f0' : '#333' }}>Hecho en</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: isDark ? '#f0f0f0' : '#333' }}>
                    Fecha <i className="bi bi-arrow-up-down" style={{ fontSize: '0.8rem', color: isDark ? '#888' : '#666' }}></i>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((comment, index) => (
                  <tr key={comment.id} style={{
                    borderBottom: index < currentItems.length - 1 
                      ? (isDark ? '1px solid #333' : '1px solid #eee')
                      : 'none',
                    transition: 'background-color 0.2s ease',
                    backgroundColor: selectedItems.includes(comment.id) 
                      ? (isDark ? 'rgba(220, 53, 69, 0.1)' : 'rgba(220, 53, 69, 0.05)')
                      : 'transparent'
                  }}>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <input 
                        type="checkbox" 
                        checked={selectedItems.includes(comment.id)}
                        onChange={() => handleSelectItem(comment.id)}
                        style={{ 
                          cursor: 'pointer',
                          accentColor: '#dc3545'
                        }}
                      />
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div>
                        <div style={{
                          fontWeight: 600,
                          color: isDark ? '#f0f0f0' : '#333',
                          marginBottom: '4px'
                        }}>
                          {comment.usuario}
                        </div>
                        <div style={{
                          fontSize: '0.85rem',
                          color: isDark ? '#aaa' : '#666',
                          marginBottom: '2px'
                        }}>
                          {comment.email}
                        </div>
                        <div style={{
                          fontSize: '0.8rem',
                          color: isDark ? '#888' : '#777'
                        }}>
                          {comment.ip}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', maxWidth: '400px' }}>
                      <div style={{ marginBottom: '8px' }}>
                        {comment.comentario.includes("En Respuesta a") && (
                          <span style={{ color: '#dc3545', fontWeight: 500 }}>En Respuesta a </span>
                        )}
                        <span style={{ color: isDark ? '#f0f0f0' : '#333' }}>
                          {comment.comentario.replace("En Respuesta a Akumano", "").replace("En Respuesta a ", "")}
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        gap: '12px',
                        flexWrap: 'wrap'
                      }}>
                        <button style={{ 
                          background: 'none', 
                          border: 'none', 
                          color: isDark ? '#aaa' : '#666', 
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          padding: 0
                        }}>
                          Responder
                        </button>
                        <button style={{ 
                          background: 'none', 
                          border: 'none', 
                          color: isDark ? '#aaa' : '#666', 
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          padding: 0
                        }}>
                          Rechazar
                        </button>
                        <button style={{ 
                          background: 'none', 
                          border: 'none', 
                          color: '#dc3545', 
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          padding: 0,
                          fontWeight: 500
                        }}>
                          Spam
                        </button>
                        <button style={{ 
                          background: 'none', 
                          border: 'none', 
                          color: '#dc3545', 
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          padding: 0,
                          fontWeight: 500
                        }}>
                          Eliminar
                        </button>
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div>
                        <div style={{
                          color: isDark ? '#f0f0f0' : '#333',
                          marginBottom: '4px',
                          fontWeight: 500
                        }}>
                          {comment.hechoEn}
                        </div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <a 
                            href="#" 
                            style={{ 
                              color: '#dc3545', 
                              textDecoration: 'none',
                              fontSize: '0.85rem',
                              fontWeight: 500
                            }}
                          >
                            {comment.verCapitulo}
                          </a>
                          <span style={{
                            ...getEstadoBadge(comment.estado),
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            textTransform: 'capitalize'
                          }}>
                            {comment.estado}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td style={{ 
                      padding: '1rem',
                      color: isDark ? '#aaa' : '#666',
                      fontSize: '0.85rem'
                    }}>
                      {comment.fecha}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Paginación mejorada con ROJO */}
        {totalPages > 1 && (
          <div style={{
            background: isDark ? '#2d2d2d' : '#ffffff',
            padding: '1.5rem 3rem',
            borderTop: isDark ? '1px solid #444' : '1px solid #ddd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{
              color: isDark ? '#aaa' : '#666',
              fontSize: '0.9rem'
            }}>
              Mostrando {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredData.length)} de {filteredData.length} comentarios
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                style={{
                  padding: '8px 12px',
                  border: isDark ? '1px solid #444' : '1px solid #ccc',
                  background: isDark ? '#333' : '#f5f5f5',
                  color: isDark ? '#f0f0f0' : '#333',
                  borderRadius: '6px',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  opacity: currentPage === 1 ? 0.5 : 1,
                  fontSize: '0.9rem'
                }}
              >
                ««
              </button>
              
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                style={{
                  padding: '8px 12px',
                  border: isDark ? '1px solid #444' : '1px solid #ccc',
                  background: isDark ? '#333' : '#f5f5f5',
                  color: isDark ? '#f0f0f0' : '#333',
                  borderRadius: '6px',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  opacity: currentPage === 1 ? 0.5 : 1,
                  fontSize: '0.9rem'
                }}
              >
                ‹
              </button>

              <span style={{
                padding: '8px 12px',
                background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                color: '#ffffff',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: 600,
                minWidth: '40px',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(220, 53, 69, 0.25)'
              }}>
                {currentPage}
              </span>

              <span style={{
                padding: '8px 4px',
                color: isDark ? '#888' : '#666',
                fontSize: '0.9rem'
              }}>
                de {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                style={{
                  padding: '8px 12px',
                  border: isDark ? '1px solid #444' : '1px solid #ccc',
                  background: isDark ? '#333' : '#f5f5f5',
                  color: isDark ? '#f0f0f0' : '#333',
                  borderRadius: '6px',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  fontSize: '0.9rem'
                }}
              >
                ›
              </button>

              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                style={{
                  padding: '8px 12px',
                  border: isDark ? '1px solid #444' : '1px solid #ccc',
                  background: isDark ? '#333' : '#f5f5f5',
                  color: isDark ? '#f0f0f0' : '#333',
                  borderRadius: '6px',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  fontSize: '0.9rem'
                }}
              >
                »»
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
