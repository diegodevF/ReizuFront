import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Datos de ejemplo de métodos de pago
const paymentMethods = [
  {
    id: 1,
    type: 'card',
    cardType: 'debit',
    holderName: 'Federico Perez',
    cardNumber: '**** **** **** 5454',
    expiryDate: '9/38',
    isDefault: false,
    brand: 'visa'
  },
  {
    id: 2,
    type: 'paypal',
    email: 'g*******4@gmail.com',
    isDefault: true,
    accountName: 'PayPal'
  }
];

// Función para obtener el tema actual
const getTheme = () => {
  if (typeof document !== "undefined") {
    return document.documentElement.getAttribute("data-bs-theme") || "light";
  }
  return "light";
};

const DataPayment = () => {
  const [theme, setTheme] = useState(getTheme());
  const [methods, setMethods] = useState(paymentMethods);
  const [showAddForm, setShowAddForm] = useState(false);

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

  // Establecer método por defecto
  const setAsDefault = (id) => {
    setMethods(prev =>
      prev.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  // Eliminar método de pago
  const removeMethod = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este método de pago?')) {
      setMethods(prev => prev.filter(method => method.id !== id));
    }
  };

  // Obtener icono según el tipo de tarjeta
  const getCardIcon = (brand) => {
    switch(brand?.toLowerCase()) {
      case 'visa': return 'bi-credit-card';
      case 'mastercard': return 'bi-credit-card-2-front';
      case 'amex': return 'bi-credit-card-2-back';
      default: return 'bi-credit-card';
    }
  };

  return (
    <div className="d-flex" style={{
      background: isDarkMode ? '#121212' : '#f5f7fa',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif',
      transition: 'background-color 0.3s ease'
    }}>
      {/* Contenido principal */}
      <div style={{
        flexGrow: 1,
        transition: "margin-left 0.3s",
        padding: '32px'
      }}>
        <div className="container" style={{ maxWidth: 800 }}>
          {/* Header */}
          <div className="mb-4">
            <h2 style={{
              color: isDarkMode ? '#fff' : '#2d3748',
              fontSize: '28px',
              fontWeight: '700',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              <i className="bi bi-credit-card me-2" style={{ color: '#d32f2f' }}></i>
              DATOS DE FACTURACIÓN
            </h2>
            <p style={{ 
              color: isDarkMode ? '#adb5bd' : '#6c757d',
              fontSize: '16px',
              margin: 0
            }}>
              Gestiona tus métodos de pago y facturación
            </p>
          </div>

          {/* Métodos de pago */}
          <div className="row g-4 mb-4">
            {methods.map((method) => (
              <div key={method.id} className="col-12">
                <div style={{
                  background: isDarkMode ? '#1e1e1e' : '#fff',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: isDarkMode 
                    ? '0 4px 20px rgba(0,0,0,0.3)' 
                    : '0 4px 20px rgba(0,0,0,0.08)',
                  border: `2px solid ${method.isDefault ? '#d32f2f' : (isDarkMode ? '#404040' : '#e9ecef')}`,
                  position: 'relative',
                  transition: 'all 0.3s ease'
                }}>
                  {/* Badge de predeterminado */}
                  {method.isDefault && (
                    <div style={{
                      position: 'absolute',
                      top: -1,
                      right: 20,
                      background: 'linear-gradient(135deg, #d32f2f 0%, #e53935 100%)',
                      color: '#fff',
                      padding: '6px 16px',
                      borderRadius: '0 0 12px 12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      <i className="bi bi-star-fill me-1"></i>
                      Predeterminado
                    </div>
                  )}

                  <div className="d-flex align-items-center justify-content-between">
                    {/* Información del método */}
                    <div className="d-flex align-items-center">
                      {method.type === 'card' ? (
                        <>
                          {/* Icono de tarjeta */}
                          <div style={{
                            width: 50,
                            height: 35,
                            background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '16px',
                            border: `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}`
                          }}>
                            <i className={`${getCardIcon(method.brand)}`} style={{ 
                              fontSize: 18, 
                              color: isDarkMode ? '#fff' : '#333' 
                            }}></i>
                          </div>
                          
                          {/* Detalles de tarjeta */}
                          <div>
                            <div style={{
                              color: isDarkMode ? '#fff' : '#2d3748',
                              fontWeight: '600',
                              fontSize: '16px',
                              marginBottom: '4px'
                            }}>
                              {method.holderName}
                            </div>
                            <div style={{
                              color: isDarkMode ? '#adb5bd' : '#6c757d',
                              fontSize: '14px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px'
                            }}>
                              <span>{method.cardNumber}</span>
                              <span>•</span>
                              <span>Caduca el: {method.expiryDate}</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Icono de PayPal */}
                          <div style={{
                            width: 50,
                            height: 35,
                            background: '#0070ba',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '16px'
                          }}>
                            <i className="bi bi-paypal" style={{ 
                              fontSize: 18, 
                              color: '#fff' 
                            }}></i>
                          </div>
                          
                          {/* Detalles de PayPal */}
                          <div>
                            <div style={{
                              color: isDarkMode ? '#fff' : '#2d3748',
                              fontWeight: '600',
                              fontSize: '16px',
                              marginBottom: '4px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              <span style={{ color: '#0070ba' }}>PayPal</span>
                            </div>
                            <div style={{
                              color: isDarkMode ? '#adb5bd' : '#6c757d',
                              fontSize: '14px'
                            }}>
                              {method.email}
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Acciones */}
                    <div className="d-flex align-items-center gap-3">
                      {!method.isDefault && (
                        <button
                          onClick={() => setAsDefault(method.id)}
                          style={{
                            background: 'transparent',
                            border: `2px solid ${isDarkMode ? '#555' : '#ced4da'}`,
                            borderRadius: '8px',
                            padding: '8px 16px',
                            color: isDarkMode ? '#adb5bd' : '#6c757d',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={e => {
                            e.target.style.borderColor = '#d32f2f';
                            e.target.style.color = '#d32f2f';
                          }}
                          onMouseLeave={e => {
                            e.target.style.borderColor = isDarkMode ? '#555' : '#ced4da';
                            e.target.style.color = isDarkMode ? '#adb5bd' : '#6c757d';
                          }}
                        >
                          Predeterminar
                        </button>
                      )}
                      
                      <div className="dropdown">
                        <button
                          className="btn"
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: isDarkMode ? '#adb5bd' : '#6c757d',
                            padding: '8px',
                            borderRadius: '8px'
                          }}
                          onMouseEnter={e => e.target.style.color = '#d32f2f'}
                          onMouseLeave={e => e.target.style.color = isDarkMode ? '#adb5bd' : '#6c757d'}
                        >
                          <i className="bi bi-three-dots-vertical"></i>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <button className="dropdown-item" onClick={() => removeMethod(method.id)}>
                              <i className="bi bi-trash me-2"></i>
                              Eliminar
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botón agregar nuevo método */}
          <div className="text-center">
            <button
              onClick={() => setShowAddForm(true)}
              style={{
                background: 'transparent',
                border: `2px dashed ${isDarkMode ? '#555' : '#ced4da'}`,
                borderRadius: '16px',
                padding: '24px 32px',
                color: isDarkMode ? '#adb5bd' : '#6c757d',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px'
              }}
              onMouseEnter={e => {
                e.target.style.borderColor = '#d32f2f';
                e.target.style.color = '#d32f2f';
                e.target.style.background = isDarkMode ? 'rgba(211, 47, 47, 0.05)' : 'rgba(211, 47, 47, 0.02)';
              }}
              onMouseLeave={e => {
                e.target.style.borderColor = isDarkMode ? '#555' : '#ced4da';
                e.target.style.color = isDarkMode ? '#adb5bd' : '#6c757d';
                e.target.style.background = 'transparent';
              }}
            >
              <i className="bi bi-plus-circle" style={{ fontSize: 20 }}></i>
              Agregar un nuevo método de pago
            </button>
          </div>

          {/* Modal/Form para agregar nuevo método (placeholder) */}
          {showAddForm && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1050
            }}>
              <div style={{
                background: isDarkMode ? '#1e1e1e' : '#fff',
                borderRadius: '16px',
                padding: '32px',
                maxWidth: '500px',
                width: '90%',
                maxHeight: '80vh',
                overflowY: 'auto'
              }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 style={{ 
                    color: isDarkMode ? '#fff' : '#2d3748',
                    margin: 0
                  }}>
                    <i className="bi bi-plus-circle me-2" style={{ color: '#d32f2f' }}></i>
                    Nuevo Método de Pago
                  </h4>
                  <button
                    onClick={() => setShowAddForm(false)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: isDarkMode ? '#adb5bd' : '#6c757d',
                      fontSize: 24,
                      cursor: 'pointer'
                    }}
                  >
                    <i className="bi bi-x"></i>
                  </button>
                </div>
                
                <div className="text-center py-5">
                  <div style={{
                    color: isDarkMode ? '#adb5bd' : '#6c757d',
                    fontSize: '16px'
                  }}>
                    <i className="bi bi-credit-card" style={{ fontSize: 48, display: 'block', marginBottom: 16 }}></i>
                    Formulario para agregar<br />nuevo método de pago
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => setShowAddForm(false)}
                      style={{
                        background: 'linear-gradient(135deg, #d32f2f 0%, #e53935 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px 24px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataPayment;
