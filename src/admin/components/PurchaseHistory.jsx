import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Datos de ejemplo de historial de compras
const purchaseData = [
  {
    id: 1,
    type: 'Service',
    date: '15/02/2025',
    name: 'XBOX GAME PASS ULTIMATE (INDIVIDUAL)',
    status: 'Completed',
    amount: '14,000 RC',
    icon: 'bi-controller',
    statusColor: '#198754'
  },
  {
    id: 2,
    type: 'Commission',
    date: '12/02/2025',
    name: 'BLANCO Y NEGRO (Walter Luna)',
    status: 'Pending',
    amount: '3,500 RC',
    icon: 'bi-palette',
    statusColor: '#ffc107'
  },
  {
    id: 3,
    type: 'Mono',
    date: '10/02/2025',
    name: 'DRAGONBORN AZUL',
    status: 'Completed',
    amount: '1,300 RC',
    icon: 'bi-person',
    statusColor: '#198754'
  },
  {
    id: 4,
    type: 'Package',
    date: '09/02/2025',
    name: '5000 REIZU COINS',
    status: 'Completed',
    amount: '49.99 $',
    icon: 'bi-box',
    statusColor: '#198754'
  },
  {
    id: 5,
    type: 'Sticker',
    date: '15/01/2025',
    name: 'INTERESANTE',
    status: 'Completed',
    amount: '300 RC',
    icon: 'bi-emoji-smile',
    statusColor: '#198754'
  },
  {
    id: 6,
    type: 'Commission',
    date: '12/01/2025',
    name: 'FULL COLOR CHIBI ESTILO ANIME (Walter Luna)',
    status: 'Cancelled',
    amount: '3,500 RC',
    icon: 'bi-palette',
    statusColor: '#dc3545'
  },
  {
    id: 7,
    type: 'Banner',
    date: '10/01/2025',
    name: 'ESQUIZOFRENIA',
    status: 'Completed',
    amount: '1,300 RC',
    icon: 'bi-flag',
    statusColor: '#198754'
  }
];

// Función para obtener el tema actual
const getTheme = () => {
  if (typeof document !== "undefined") {
    return document.documentElement.getAttribute("data-bs-theme") || "light";
  }
  return "light";
};

const PurchaseHistory = () => {
  const [theme, setTheme] = useState(getTheme());
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

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

  // Filtros disponibles
  const typeFilters = ['All', 'Service', 'Commission', 'Mono', 'Package', 'Sticker', 'Banner'];
  const statusFilters = ['All', 'Completed', 'Pending', 'Cancelled'];

  // Función para obtener el icono del tipo
  const getTypeIcon = (type) => {
    switch(type.toLowerCase()) {
      case 'service': return 'bi-gear';
      case 'commission': return 'bi-palette';
      case 'mono': return 'bi-person';
      case 'package': return 'bi-box';
      case 'sticker': return 'bi-emoji-smile';
      case 'banner': return 'bi-flag';
      default: return 'bi-bag';
    }
  };

  // Función para obtener el color del estado
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'completed': return '#198754';
      case 'pending': return '#ffc107';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  // Filtrar datos
  const filteredData = purchaseData.filter(item => {
    const matchesType = selectedFilter === 'All' || item.type === selectedFilter;
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  // Paginación
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Estilos para inputs con focus rojo
  const inputStyles = {
    background: isDarkMode ? '#2d2d2d' : '#fff',
    color: isDarkMode ? '#fff' : '#333',
    border: `2px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
  };

  const inputFocusStyles = {
    borderColor: '#d32f2f',
    boxShadow: '0 0 0 0.2rem rgba(211, 47, 47, 0.25)'
  };

  return (
    <div style={{
      background: isDarkMode ? '#121212' : '#f5f7fa',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif',
      padding: '32px',
      transition: 'background-color 0.3s ease'
    }}>
      <div className="container" style={{ maxWidth: 1400 }}>
        {/* Header */}
        <div className="mb-4">
          <h1 style={{
            color: isDarkMode ? '#fff' : '#2d3748',
            fontSize: '32px',
            fontWeight: '700',
            margin: '0 0 8px 0',
            letterSpacing: '0.5px'
          }}>
            <i className="bi bi-clock-history me-2" style={{ color: '#d32f2f' }}></i>
            PURCHASE HISTORY
          </h1>
          <p style={{ 
            color: isDarkMode ? '#adb5bd' : '#6c757d',
            fontSize: '16px',
            margin: 0
          }}>
            View and manage your purchase transactions
          </p>
        </div>

        {/* Filtros */}
        <div className="mb-4">
          <div style={{
            background: isDarkMode ? '#1e1e1e' : '#fff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: isDarkMode 
              ? '0 4px 20px rgba(0,0,0,0.3)' 
              : '0 4px 20px rgba(0,0,0,0.08)',
            border: `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}`
          }}>
            <div className="row g-3 align-items-end">
              <div className="col-md-3">
                <label className="form-label fw-semibold mb-2" style={{ 
                  color: isDarkMode ? '#fff' : '#2d3748',
                  fontSize: '14px'
                }}>
                  Bulk Actions
                </label>
                <select style={inputStyles}>
                  <option>Select action</option>
                  <option>Export selected</option>
                  <option>Mark as reviewed</option>
                </select>
              </div>
              <div className="col-md-2">
                <button style={{
                  background: 'linear-gradient(135deg, #d32f2f 0%, #e53935 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  width: '100%'
                }}>
                  Apply
                </button>
              </div>
              <div className="col-md-2">
                <label className="form-label fw-semibold mb-2" style={{ 
                  color: isDarkMode ? '#fff' : '#2d3748',
                  fontSize: '14px'
                }}>
                  Type
                </label>
                <select 
                  value={selectedFilter}
                  onChange={(e) => {
                    setSelectedFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={inputStyles}
                >
                  {typeFilters.map(filter => (
                    <option key={filter} value={filter}>{filter === 'All' ? 'All types' : filter}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-2">
                <label className="form-label fw-semibold mb-2" style={{ 
                  color: isDarkMode ? '#fff' : '#2d3748',
                  fontSize: '14px'
                }}>
                  Status
                </label>
                <select 
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={inputStyles}
                >
                  {statusFilters.map(filter => (
                    <option key={filter} value={filter}>{filter === 'All' ? 'All statuses' : filter}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-1">
                <button style={{
                  background: isDarkMode ? '#404040' : '#6c757d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  width: '100%'
                }}>
                  Filter
                </button>
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={inputStyles}
                  onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                  onBlur={e => Object.assign(e.target.style, inputStyles)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="mb-4">
          <div style={{
            background: isDarkMode ? '#1e1e1e' : '#fff',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: isDarkMode 
              ? '0 4px 20px rgba(0,0,0,0.3)' 
              : '0 4px 20px rgba(0,0,0,0.08)',
            border: `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}`
          }}>
            <div className="table-responsive">
              <table style={{
                width: '100%',
                borderCollapse: 'separate',
                borderSpacing: 0,
                fontSize: '15px'
              }}>
                <thead>
                  <tr style={{
                    background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
                    borderBottom: `2px solid ${isDarkMode ? '#404040' : '#e9ecef'}`
                  }}>
                    <th style={{ 
                      padding: '18px 20px', 
                      textAlign: 'left', 
                      width: 40,
                      color: isDarkMode ? '#fff' : '#2d3748',
                      fontWeight: '600'
                    }}>
                      <input type="checkbox" style={{ accentColor: '#d32f2f' }} />
                    </th>
                    <th style={{ 
                      padding: '18px 20px', 
                      textAlign: 'left',
                      color: isDarkMode ? '#fff' : '#2d3748',
                      fontWeight: '600',
                      minWidth: 100
                    }}>
                      TYPE
                    </th>
                    <th style={{ 
                      padding: '18px 20px', 
                      textAlign: 'left',
                      color: isDarkMode ? '#fff' : '#2d3748',
                      fontWeight: '600',
                      minWidth: 120
                    }}>
                      DATE
                    </th>
                    <th style={{ 
                      padding: '18px 20px', 
                      textAlign: 'left',
                      color: isDarkMode ? '#fff' : '#2d3748',
                      fontWeight: '600',
                      minWidth: 300
                    }}>
                      NAME
                    </th>
                    <th style={{ 
                      padding: '18px 20px', 
                      textAlign: 'left',
                      color: isDarkMode ? '#fff' : '#2d3748',
                      fontWeight: '600',
                      minWidth: 140
                    }}>
                      PURCHASE STATUS
                    </th>
                    <th style={{ 
                      padding: '18px 20px', 
                      textAlign: 'right',
                      color: isDarkMode ? '#fff' : '#2d3748',
                      fontWeight: '600',
                      minWidth: 120
                    }}>
                      AMOUNT
                    </th>
                    <th style={{ width: 20 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={item.id} style={{
                      borderBottom: index < currentItems.length - 1 
                        ? `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}` 
                        : 'none',
                      background: index % 2 === 0 
                        ? (isDarkMode ? '#1e1e1e' : '#fff')
                        : (isDarkMode ? '#252525' : '#fafbfc'),
                      transition: 'background-color 0.2s ease'
                    }}>
                      <td style={{ padding: '18px 20px', textAlign: 'center' }}>
                        <input
                          type="checkbox"
                          style={{ accentColor: '#d32f2f' }}
                        />
                      </td>
                      <td style={{ padding: '18px 20px' }}>
                        <div className="d-flex align-items-center">
                          <div style={{
                            width: 40,
                            height: 40,
                            background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '12px',
                            border: `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}`
                          }}>
                            <i className={getTypeIcon(item.type)} style={{ 
                              fontSize: 16, 
                              color: isDarkMode ? '#fff' : '#333' 
                            }}></i>
                          </div>
                          <span style={{
                            fontWeight: '600',
                            color: isDarkMode ? '#fff' : '#2d3748'
                          }}>
                            {item.type}
                          </span>
                        </div>
                      </td>
                      <td style={{ 
                        padding: '18px 20px',
                        color: isDarkMode ? '#adb5bd' : '#6c757d',
                        fontWeight: '500'
                      }}>
                        {item.date}
                      </td>
                      <td style={{ padding: '18px 20px' }}>
                        <div>
                          <div style={{ 
                            fontWeight: '600',
                            color: isDarkMode ? '#fff' : '#2d3748',
                            marginBottom: '4px'
                          }}>
                            {item.name}
                          </div>
                          <div style={{ 
                            fontSize: '13px', 
                            color: isDarkMode ? '#adb5bd' : '#6c757d',
                            display: 'flex',
                            gap: '12px'
                          }}>
                            <a href="#" style={{ color: '#0d6efd', textDecoration: 'none' }}>Edit</a>
                            <a href="#" style={{ color: '#0d6efd', textDecoration: 'none' }}>View</a>
                            <a href="#" style={{ color: '#d32f2f', textDecoration: 'none' }}>Delete</a>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '18px 20px' }}>
                        <span style={{
                          background: getStatusColor(item.status),
                          color: '#fff',
                          padding: '6px 16px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          textTransform: 'uppercase'
                        }}>
                          {item.status}
                        </span>
                      </td>
                      <td style={{ 
                        padding: '18px 20px', 
                        textAlign: 'right',
                        fontWeight: '700',
                        color: isDarkMode ? '#fff' : '#2d3748',
                        fontSize: '16px'
                      }}>
                        {item.amount}
                      </td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Paginación */}
        <div className="d-flex justify-content-between align-items-center">
          <span style={{ 
            fontSize: 16, 
            color: isDarkMode ? '#adb5bd' : '#6c757d',
            fontWeight: '500'
          }}>
            {filteredData.length} items
          </span>
          
          <div style={{
            background: isDarkMode ? '#1e1e1e' : '#fff',
            borderRadius: '12px',
            padding: '12px 16px',
            boxShadow: isDarkMode 
              ? '0 4px 20px rgba(0,0,0,0.3)' 
              : '0 4px 20px rgba(0,0,0,0.08)',
            border: `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {/* Botón anterior */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
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
                fontSize: '14px',
                opacity: currentPage === 1 ? 0.5 : 1
              }}
            >
              ANT
            </button>

            {/* Números de página */}
            {[...Array(Math.min(6, totalPages))].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  style={{
                    background: currentPage === pageNumber
                      ? 'linear-gradient(135deg, #d32f2f 0%, #e53935 100%)'
                      : 'transparent',
                    border: `2px solid ${currentPage === pageNumber ? '#d32f2f' : (isDarkMode ? '#404040' : '#e9ecef')}`,
                    borderRadius: '8px',
                    padding: '8px 14px',
                    color: currentPage === pageNumber
                      ? '#fff'
                      : (isDarkMode ? '#fff' : '#2d3748'),
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '14px',
                    minWidth: '40px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => {
                    if (currentPage !== pageNumber) {
                      e.target.style.borderColor = '#d32f2f';
                      e.target.style.color = '#d32f2f';
                    }
                  }}
                  onMouseLeave={e => {
                    if (currentPage !== pageNumber) {
                      e.target.style.borderColor = isDarkMode ? '#404040' : '#e9ecef';
                      e.target.style.color = isDarkMode ? '#fff' : '#2d3748';
                    }
                  }}
                >
                  {pageNumber}
                </button>
              );
            })}

            {/* Botón siguiente */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
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
                fontSize: '14px',
                opacity: currentPage === totalPages ? 0.5 : 1
              }}
            >
              SIG
            </button>
          </div>

          <span style={{ 
            fontSize: 16, 
            color: isDarkMode ? '#adb5bd' : '#6c757d',
            fontWeight: '500'
          }}>
            Page {currentPage} of {totalPages}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;
