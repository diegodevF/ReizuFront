import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CommissionTable = ({ 
  status = 'DISPONIBLE', 
  title = 'Tabla de comisiones',
  description = 'Para una comisión personalizada, ya sea con más de un personaje, fondos o diseños muy detallados, consultar con el autor antes de realizar un pedido ya que el precio puede variar dependiendo de lo que quiera agregar.'
}) => {
  const [theme, setTheme] = useState('light');

  // Función para obtener el tema actual
  const getTheme = () => {
    if (typeof document !== "undefined") {
      return document.documentElement.getAttribute("data-bs-theme") || "light";
    }
    return "light";
  };

  // Observer para detectar cambios de tema
  useEffect(() => {
    setTheme(getTheme());
    
    const observer = new MutationObserver(() => {
      setTheme(getTheme());
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-bs-theme']
    });
    
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  return (
    <div 
      className="rounded p-4 mt-3"
      style={{
        backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
        borderColor: isDark ? '#333333' : '#dee2e6',
        boxShadow: isDark ? '0 2px 10px rgba(0,0,0,0.3)' : '0 2px 10px rgba(0,0,0,0.1)',
        border: `1px solid ${isDark ? '#333333' : '#dee2e6'}`,
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
    >
      {/* Header con título y badge */}
      <div className="d-flex align-items-start justify-content-between mb-3 flex-wrap">
        <h5 
          className="mb-0 me-3"
          style={{ 
            color: isDark ? '#ffffff' : '#333333',
            fontWeight: '600',
            fontSize: '1.25rem'
          }}
        >
          {title}
        </h5>
        
        <span 
          className="badge flex-shrink-0"
          style={{
            backgroundColor: 'transparent',
            border: '2px solid #dc3545',
            color: '#dc3545',
            fontSize: '0.75rem',
            fontWeight: '600',
            padding: '4px 12px',
            borderRadius: '20px',
            letterSpacing: '0.5px'
          }}
        >
          {status}
        </span>
      </div>
      
      {/* Texto descriptivo */}
      <p 
        className="mb-0"
        style={{
          color: isDark ? '#b3b3b3' : '#6c757d',
          fontSize: '0.95rem',
          lineHeight: '1.6',
          fontWeight: '400'
        }}
      >
        {description}
      </p>
    </div>
  );
};

export default CommissionTable;
