import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Datos de ejemplo en español
const achievementsData = Array(47).fill().map((_, i) => ({
  id: i + 1,
  image: null,
  name: i % 4 === 0 ? 'Logro de Mucho Texto' 
       : i % 4 === 1 ? 'Mi Momento Ha Llegado' 
       : i % 4 === 2 ? 'Primeros Pasos Completados'
       : 'Explorador Maestro',
  type: i % 3 === 0 ? 'Comentarios' : i % 3 === 1 ? 'Cuenta' : 'Lectura',
  action: i % 3 === 0 ? 'Hacer 100 comentarios en cualquier capítulo.' 
        : i % 3 === 1 ? 'Registrarse en el sitio y completar perfil' 
        : 'Leer 50 capítulos de cualquier cómic',
  reward: i % 3 === 0 ? '200 Monedas Reizu' 
        : i % 3 === 1 ? '150 Monedas Reizu' 
        : '300 Monedas Reizu',
  timesWon: Math.floor(Math.random() * 100) + 1,
  visibility: i % 4 === 0 ? 'Privado' : 'Público',
  date: `${Math.floor(Math.random() * 28) + 1}/02/2025 a las ${Math.floor(Math.random() * 12) + 10}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`
}));

const getTheme = () => {
  if (typeof document !== "undefined") {
    return document.documentElement.getAttribute("data-bs-theme") || "light";
  }
  return "light";
};

const ITEMS_PER_PAGE = 8;

const Achievements = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
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

  // Datos filtrados
  const filteredData = useMemo(() => {
    let data = achievementsData;
    
    // Filtrar por búsqueda
    if (search.trim()) {
      data = data.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.type.toLowerCase().includes(search.toLowerCase()) ||
        item.action.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Filtrar por tipo
    if (filter !== 'all') {
      const typeMap = {
        'comentarios': 'Comentarios',
        'cuenta': 'Cuenta', 
        'lectura': 'Lectura'
      };
      data = data.filter(item => item.type === typeMap[filter]);
    }
    
    return data;
  }, [search, filter]);

  // Reset página cuando cambian los filtros
  useEffect(() => {
    setPage(1);
    setSelected([]);
  }, [search, filter]);

  // Cálculos de paginación
  const totalItems = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentPageData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Funciones de selección
  const handleSelect = (id) => {
    setSelected(prev => 
      prev.includes(id) 
        ? prev.filter(s => s !== id) 
        : [...prev, id]
    );
  };

  const currentPageIds = currentPageData.map(item => item.id);
  const isAllPageSelected = currentPageIds.length > 0 && currentPageIds.every(id => selected.includes(id));

  const handleSelectAll = () => {
    if (isAllPageSelected) {
      setSelected(prev => prev.filter(id => !currentPageIds.includes(id)));
    } else {
      setSelected(prev => [...new Set([...prev, ...currentPageIds])]);
    }
  };

  // Navegación de páginas
  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Generar números de página para mostrar
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="d-flex" style={{
      background: isDark ? '#1a1a1a' : '#f5f5f5',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      transition: 'all 0.3s ease'
    }}>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Botón flotante para abrir sidebar - CON ROJO */}
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
      <div style={{
        flexGrow:1,
        marginLeft: sidebarOpen ? 280 : 0,
        transition: 'margin-left 0.3s ease',
        minHeight: '100vh'
      }}>
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
                Logros
              </h1>
              <p style={{
                color: isDark ? '#aaa' : '#666',
                margin: '0.5rem 0 0 0',
                fontSize: '1.1rem'
              }}>
                Gestionar y hacer seguimiento de los logros de usuarios
              </p>
            </div>
            {/* Botón principal con ROJO */}
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
              Nuevo Logro
            </button>
          </div>

          {/* Stats mejoradas con ROJO para filtro activo */}
          <div style={{
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            {[
              { label: 'Todos', value: 'all', count: totalItems, active: filter === 'all' },
              { label: 'Comentarios', value: 'comentarios', count: achievementsData.filter(a => a.type === 'Comentarios').length, active: filter === 'comentarios' },
              { label: 'Cuenta', value: 'cuenta', count: achievementsData.filter(a => a.type === 'Cuenta').length, active: filter === 'cuenta' },
              { label: 'Lectura', value: 'lectura', count: achievementsData.filter(a => a.type === 'Lectura').length, active: filter === 'lectura' }
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
              disabled={selected.length === 0}
            >
              <option>Acciones por lotes</option>
              <option>Eliminar seleccionados</option>
              <option>Ocultar seleccionados</option>
            </select>
            {/* Botón Aplicar con ROJO cuando hay selecciones */}
            <button
              disabled={selected.length === 0}
              style={{
                background: selected.length > 0 
                  ? 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)'
                  : (isDark ? '#333' : '#e5e5e5'),
                color: selected.length > 0 ? '#fff' : (isDark ? '#888' : '#999'),
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '0.9rem',
                cursor: selected.length > 0 ? 'pointer' : 'not-allowed',
                fontWeight: 500,
                boxShadow: selected.length > 0 ? '0 1px 3px rgba(220, 53, 69, 0.25)' : 'none'
              }}
            >
              Aplicar ({selected.length})
            </button>
          </div>

          <div style={{ marginLeft: 'auto', maxWidth: '300px', width: '100%' }}>
            <div style={{ position: 'relative' }}>
              <i className="bi bi-search" style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: isDark ? '#888' : '#666',
                fontSize: '0.9rem'
              }}></i>
              <input
                type="text"
                placeholder="Buscar logros..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  paddingLeft: '2.5rem',
                  paddingRight: '1rem',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  borderRadius: '6px',
                  border: search ? '1px solid #dc3545' : (isDark ? '1px solid #444' : '1px solid #ccc'),
                  background: isDark ? '#2d2d2d' : '#ffffff',
                  color: isDark ? '#f0f0f0' : '#333',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
              />
            </div>
          </div>
        </div>

        {/* Tabla mejorada */}
        <div style={{ padding: '2rem 3rem' }}>
          {currentPageData.length === 0 ? (
            <div style={{
              background: isDark ? '#2d2d2d' : '#ffffff',
              border: isDark ? '1px solid #444' : '1px solid #ddd',
              borderRadius: '12px',
              padding: '3rem',
              textAlign: 'center'
            }}>
              <i className="bi bi-search" style={{
                fontSize: '3rem',
                color: isDark ? '#888' : '#666',
                marginBottom: '1rem'
              }}></i>
              <h3 style={{
                color: isDark ? '#f0f0f0' : '#333',
                marginBottom: '0.5rem'
              }}>
                No se encontraron logros
              </h3>
              <p style={{
                color: isDark ? '#888' : '#666',
                margin: 0
              }}>
                Intenta ajustar tu búsqueda o criterios de filtro
              </p>
            </div>
          ) : (
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
                        checked={isAllPageSelected}
                        onChange={handleSelectAll}
                        style={{ 
                          cursor: 'pointer',
                          accentColor: '#dc3545' // Color ROJO para checkbox
                        }}
                      />
                    </th>
                    <th style={{ padding: '1rem', width: '80px', textAlign: 'left', color: isDark ? '#f0f0f0' : '#333' }}>Imagen</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: isDark ? '#f0f0f0' : '#333' }}>Nombre</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: isDark ? '#f0f0f0' : '#333' }}>Tipo</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: isDark ? '#f0f0f0' : '#333' }}>Acción</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: isDark ? '#f0f0f0' : '#333' }}>Recompensa</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: isDark ? '#f0f0f0' : '#333' }}>Ganados</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: isDark ? '#f0f0f0' : '#333' }}>Estado</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: isDark ? '#f0f0f0' : '#333' }}>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageData.map((item, index) => (
                    <tr key={item.id} style={{
                      borderBottom: index < currentPageData.length - 1 
                        ? (isDark ? '1px solid #333' : '1px solid #eee')
                        : 'none',
                      transition: 'background-color 0.2s ease',
                      backgroundColor: selected.includes(item.id) 
                        ? (isDark ? 'rgba(220, 53, 69, 0.1)' : 'rgba(220, 53, 69, 0.05)')
                        : 'transparent'
                    }}>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <input
                          type="checkbox"
                          checked={selected.includes(item.id)}
                          onChange={() => handleSelect(item.id)}
                          style={{ 
                            cursor: 'pointer',
                            accentColor: '#dc3545' // Color ROJO para checkbox
                          }}
                        />
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          background: selected.includes(item.id) 
                            ? 'rgba(220, 53, 69, 0.1)'
                            : (isDark ? '#444' : '#e5e5e5'),
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: selected.includes(item.id) ? '2px solid #dc3545' : 'none'
                        }}>
                          <i className="bi bi-award" style={{
                            fontSize: '1.5rem',
                            color: selected.includes(item.id) 
                              ? '#dc3545'
                              : (isDark ? '#aaa' : '#666')
                          }}></i>
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div>
                          <div style={{
                            fontWeight: 600,
                            color: isDark ? '#f0f0f0' : '#333',
                            marginBottom: '4px'
                          }}>
                            {item.name}
                          </div>
                          <div style={{
                            fontSize: '0.8rem',
                            display: 'flex',
                            gap: '1rem'
                          }}>
                            <a href="#" style={{ color: isDark ? '#aaa' : '#666', textDecoration: 'none' }}>Editar</a>
                            <a href="#" style={{ color: isDark ? '#aaa' : '#666', textDecoration: 'none' }}>Ver</a>
                            {/* Link de eliminar en ROJO */}
                            <a href="#" style={{ color: '#dc3545', textDecoration: 'none', fontWeight: 500 }}>Eliminar</a>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          background: item.type === 'Comentarios' 
                            ? 'rgba(220, 53, 69, 0.1)'
                            : (isDark ? '#444' : '#e5e5e5'),
                          color: item.type === 'Comentarios' 
                            ? '#dc3545'
                            : (isDark ? '#ccc' : '#555'),
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 500,
                          border: item.type === 'Comentarios' ? '1px solid rgba(220, 53, 69, 0.3)' : 'none'
                        }}>
                          {item.type}
                        </span>
                      </td>
                      <td style={{ 
                        padding: '1rem', 
                        color: isDark ? '#aaa' : '#666',
                        fontSize: '0.9rem',
                        maxWidth: '200px'
                      }}>
                        {item.action}
                      </td>
                      <td style={{ 
                        padding: '1rem',
                        fontWeight: 600,
                        color: isDark ? '#f0f0f0' : '#333'
                      }}>
                        <span style={{ color: '#dc3545', fontWeight: 'bold' }}>
                          {item.reward}
                        </span>
                      </td>
                      <td style={{ 
                        padding: '1rem',
                        color: isDark ? '#aaa' : '#666'
                      }}>
                        {item.timesWon}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          background: item.visibility === 'Público' 
                            ? 'rgba(40, 167, 69, 0.1)'
                            : 'rgba(220, 53, 69, 0.1)',
                          color: item.visibility === 'Público' 
                            ? '#28a745'
                            : '#dc3545',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 500,
                          border: item.visibility === 'Público' 
                            ? '1px solid rgba(40, 167, 69, 0.3)'
                            : '1px solid rgba(220, 53, 69, 0.3)'
                        }}>
                          {item.visibility}
                        </span>
                      </td>
                      <td style={{ 
                        padding: '1rem',
                        color: isDark ? '#aaa' : '#666',
                        fontSize: '0.85rem'
                      }}>
                        {item.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
              Mostrando {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, totalItems)} de {totalItems} resultados
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                style={{
                  padding: '8px 12px',
                  border: isDark ? '1px solid #444' : '1px solid #ccc',
                  background: isDark ? '#333' : '#f5f5f5',
                  color: isDark ? '#f0f0f0' : '#333',
                  borderRadius: '6px',
                  cursor: page === 1 ? 'not-allowed' : 'pointer',
                  opacity: page === 1 ? 0.5 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}
              >
                <i className="bi bi-chevron-left"></i>
                Anterior
              </button>

              {getPageNumbers().map((pageNum, idx) => (
                pageNum === '...' ? (
                  <span key={`dots-${idx}`} style={{
                    padding: '8px 4px',
                    color: isDark ? '#888' : '#666'
                  }}>
                    ...
                  </span>
                ) : (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    style={{
                      padding: '8px 12px',
                      border: pageNum === page 
                        ? 'none'
                        : (isDark ? '1px solid #444' : '1px solid #ccc'),
                      background: pageNum === page
                        ? 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)'
                        : (isDark ? '#333' : '#f5f5f5'),
                      color: pageNum === page 
                        ? '#ffffff'
                        : (isDark ? '#f0f0f0' : '#333'),
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: pageNum === page ? 600 : 400,
                      minWidth: '40px',
                      boxShadow: pageNum === page ? '0 2px 8px rgba(220, 53, 69, 0.25)' : 'none'
                    }}
                  >
                    {pageNum}
                  </button>
                )
              ))}

              <button
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
                style={{
                  padding: '8px 12px',
                  border: isDark ? '1px solid #444' : '1px solid #ccc',
                  background: isDark ? '#333' : '#f5f5f5',
                  color: isDark ? '#f0f0f0' : '#333',
                  borderRadius: '6px',
                  cursor: page === totalPages ? 'not-allowed' : 'pointer',
                  opacity: page === totalPages ? 0.5 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}
              >
                Siguiente
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievements;
