import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Datos de ejemplo de transacciones
const transactionsData = [
  {
    id: 1,
    type: 'visit',
    action: 'obtención',
    amount: 2,
    description: '2 Reizu coins por visitar cualquier capítulo una vez al día.',
    date: 'enero 17, 2025',
    icon: 'bi-eye',
    color: '#198754'
  },
  {
    id: 2,
    type: 'comment',
    action: 'obtención',
    amount: 10,
    currency: 'Partners Rc\'s',
    description: '10 Partners Rc\'s por recibir un comentario al día en cualquier capítulo.',
    date: 'enero 17, 2025',
    icon: 'bi-chat-dots',
    color: '#0d6efd'
  },
  {
    id: 3,
    type: 'delete',
    action: 'deducción',
    amount: -200,
    description: '-200 Reizu coins por eliminar cualquier capítulo.',
    date: 'enero 17, 2025',
    icon: 'bi-trash',
    color: '#dc3545'
  },
  {
    id: 4,
    type: 'achievement',
    action: 'logro',
    amount: 500,
    description: '500 Reizu coins por logro "Erudito Maestro de reizu" - Lee un total de 300 Capítulos.',
    date: 'enero 17, 2025',
    icon: 'bi-award',
    color: '#ffc107'
  },
  {
    id: 5,
    type: 'transfer',
    action: 'donación',
    amount: -1500,
    description: '-1500 Reizu coins por transferencia a Thomas Ont-sama.',
    date: 'enero 17, 2025',
    icon: 'bi-arrow-up-right',
    color: '#fd7e14'
  },
  {
    id: 6,
    type: 'received',
    action: 'recibido',
    amount: 200,
    description: '200 Reizu coins recibidos por AkayaMasters.',
    date: 'enero 15, 2025',
    icon: 'bi-arrow-down-left',
    color: '#20c997'
  },
  {
    id: 7,
    type: 'reading',
    action: 'obtención',
    amount: 100,
    description: '100 Reizu Coins por leer un capítulo de El Príncipe Olvidado....(MISIÓN ESPECIAL):...',
    date: 'enero 17, 2025',
    icon: 'bi-book',
    color: '#6f42c1'
  },
  {
    id: 8,
    type: 'visit',
    action: 'obtención',
    amount: 2,
    description: '2 Reizu coins por visitar cualquier capítulo una vez al día.',
    date: 'enero 15, 2025',
    icon: 'bi-eye',
    color: '#198754'
  }
];

// Función para obtener el tema actual
const getTheme = () => {
  if (typeof document !== "undefined") {
    return document.documentElement.getAttribute("data-bs-theme") || "light";
  }
  return "light";
};

const CoinsResume = () => {
  const [theme, setTheme] = useState(getTheme());
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('Todas');

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

  // Estadísticas de monedas
  const coinStats = {
    reizuCoins: 34549,
    partnersRcs: 15633
  };

  // Filtros disponibles
  const filters = ['Todas', 'Obtención', 'Deducción', 'Logro', 'Donación', 'Recibido'];

  // Filtrar transacciones
  const filteredTransactions = selectedFilter === 'Todas' 
    ? transactionsData 
    : transactionsData.filter(t => 
        t.action.toLowerCase() === selectedFilter.toLowerCase()
      );

  // Paginación
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div style={{
      background: isDarkMode ? '#121212' : '#f5f7fa',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif',
      padding: '32px',
      transition: 'background-color 0.3s ease'
    }}>
      <div className="container" style={{ maxWidth: 1200 }}>
        {/* Header con estadísticas */}
        <div className="mb-4">
          <div style={{
            background: isDarkMode ? '#1e1e1e' : '#fff',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: isDarkMode 
              ? '0 8px 32px rgba(0,0,0,0.3)' 
              : '0 8px 32px rgba(0,0,0,0.1)',
            border: `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}`,
            marginBottom: '24px'
          }}>
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-3">
                  <div style={{
                    background: 'linear-gradient(135deg, #d32f2f 0%, #e53935 100%)',
                    borderRadius: '16px',
                    padding: '16px',
                    marginRight: '20px'
                  }}>
                    <i className="bi bi-coin" style={{ fontSize: 32, color: '#fff' }}></i>
                  </div>
                  <div>
                    <h1 style={{
                      color: isDarkMode ? '#fff' : '#2d3748',
                      fontSize: '32px',
                      fontWeight: '700',
                      margin: '0 0 8px 0'
                    }}>
                      REIZU COINS
                    </h1>
                    <div style={{
                      fontSize: '48px',
                      fontWeight: '800',
                      color: '#d32f2f',
                      lineHeight: 1
                    }}>
                      {coinStats.reizuCoins.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center justify-content-md-end">
                  <div style={{
                    background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
                    borderRadius: '16px',
                    padding: '20px 24px',
                    border: `2px solid ${isDarkMode ? '#404040' : '#e9ecef'}`,
                    textAlign: 'center'
                  }}>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: isDarkMode ? '#adb5bd' : '#6c757d',
                      marginBottom: '8px'
                    }}>
                      Partners Rc's
                    </div>
                    <div style={{
                      fontSize: '28px',
                      fontWeight: '700',
                      color: '#0d6efd'
                    }}>
                      {coinStats.partnersRcs.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="mb-4">
          <div style={{
            background: isDarkMode ? '#1e1e1e' : '#fff',
            borderRadius: '16px',
            padding: '20px 24px',
            boxShadow: isDarkMode 
              ? '0 4px 20px rgba(0,0,0,0.3)' 
              : '0 4px 20px rgba(0,0,0,0.08)',
            border: `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}`
          }}>
            <div className="d-flex flex-wrap gap-2 align-items-center">
              <span style={{
                color: isDarkMode ? '#fff' : '#2d3748',
                fontWeight: '600',
                marginRight: '16px'
              }}>
                Filtrar por:
              </span>
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => {
                    setSelectedFilter(filter);
                    setCurrentPage(1);
                  }}
                  style={{
                    background: selectedFilter === filter
                      ? 'linear-gradient(135deg, #d32f2f 0%, #e53935 100%)'
                      : (isDarkMode ? '#2d2d2d' : '#f8f9fa'),
                    color: selectedFilter === filter
                      ? '#fff'
                      : (isDarkMode ? '#adb5bd' : '#6c757d'),
                    border: `2px solid ${selectedFilter === filter ? '#d32f2f' : (isDarkMode ? '#404040' : '#e9ecef')}`,
                    borderRadius: '25px',
                    padding: '8px 20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={e => {
                    if (selectedFilter !== filter) {
                      e.target.style.borderColor = '#d32f2f';
                      e.target.style.color = '#d32f2f';
                    }
                  }}
                  onMouseLeave={e => {
                    if (selectedFilter !== filter) {
                      e.target.style.borderColor = isDarkMode ? '#404040' : '#e9ecef';
                      e.target.style.color = isDarkMode ? '#adb5bd' : '#6c757d';
                    }
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Lista de transacciones */}
        <div className="mb-4">
          <div style={{
            background: isDarkMode ? '#1e1e1e' : '#fff',
            borderRadius: '16px',
            boxShadow: isDarkMode 
              ? '0 4px 20px rgba(0,0,0,0.3)' 
              : '0 4px 20px rgba(0,0,0,0.08)',
            border: `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}`,
            overflow: 'hidden'
          }}>
            {currentTransactions.map((transaction, index) => (
              <div
                key={transaction.id}
                style={{
                  padding: '20px 24px',
                  borderBottom: index < currentTransactions.length - 1 
                    ? `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}` 
                    : 'none',
                  background: index % 2 === 0 
                    ? (isDarkMode ? '#1e1e1e' : '#fff')
                    : (isDarkMode ? '#252525' : '#f8f9fa'),
                  transition: 'background-color 0.2s ease'
                }}
              >
                <div className="d-flex align-items-start justify-content-between">
                  <div className="d-flex align-items-start">
                    {/* Icono */}
                    <div style={{
                      background: transaction.color,
                      borderRadius: '12px',
                      padding: '12px',
                      marginRight: '16px',
                      minWidth: '48px',
                      height: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <i className={transaction.icon} style={{ fontSize: 20, color: '#fff' }}></i>
                    </div>

                    {/* Contenido */}
                    <div style={{ flex: 1 }}>
                      <div className="d-flex align-items-center mb-1">
                        <span style={{
                          background: transaction.color,
                          color: '#fff',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          marginRight: '12px'
                        }}>
                          {transaction.action}
                        </span>
                        <span style={{
                          color: isDarkMode ? '#adb5bd' : '#6c757d',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}>
                          {transaction.date}
                        </span>
                      </div>
                      <p style={{
                        color: isDarkMode ? '#fff' : '#2d3748',
                        fontSize: '16px',
                        fontWeight: '500',
                        margin: '8px 0 0 0',
                        lineHeight: 1.5
                      }}>
                        {transaction.description}
                      </p>
                    </div>
                  </div>

                  {/* Cantidad */}
                  <div style={{
                    textAlign: 'right',
                    marginLeft: '16px'
                  }}>
                    <div style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: transaction.amount > 0 ? '#198754' : '#dc3545',
                      lineHeight: 1
                    }}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: isDarkMode ? '#adb5bd' : '#6c757d',
                      fontWeight: '500',
                      marginTop: '4px'
                    }}>
                      {transaction.currency || 'Reizu Coins'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Paginación */}
        <div className="d-flex justify-content-center">
          <div style={{
            background: isDarkMode ? '#1e1e1e' : '#fff',
            borderRadius: '16px',
            padding: '16px 24px',
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
                    padding: '8px 16px',
                    color: currentPage === pageNumber
                      ? '#fff'
                      : (isDarkMode ? '#fff' : '#2d3748'),
                    cursor: 'pointer',
                    fontWeight: '600',
                    minWidth: '44px',
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
                opacity: currentPage === totalPages ? 0.5 : 1
              }}
            >
              SIG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinsResume;
