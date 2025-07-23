import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const NotFound = () => {
  const [theme, setTheme] = useState('light');
  const [floatingElements, setFloatingElements] = useState([]);

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

  // Crear elementos flotantes decorativos
  useEffect(() => {
    const elements = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      icon: ['bi-palette', 'bi-brush', 'bi-pencil', 'bi-pen', 'bi-paint-bucket', 'bi-rainbow', 'bi-stars', 'bi-heart'][i],
      delay: i * 0.5,
      duration: 3 + (i % 3),
      left: 10 + (i % 4) * 20,
      opacity: 0.1 + (i % 3) * 0.1
    }));
    setFloatingElements(elements);
  }, []);

  const isDark = theme === 'dark';

  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)'
          : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)'
      }}
    >
      {/* Elementos flotantes decorativos */}
      {floatingElements.map((element) => (
        <i
          key={element.id}
          className={`bi ${element.icon} position-absolute`}
          style={{
            fontSize: '2rem',
            color: '#d32f2f',
            left: `${element.left}%`,
            top: `${20 + (element.id % 3) * 20}%`,
            opacity: element.opacity,
            animation: `float ${element.duration}s ease-in-out infinite ${element.delay}s`
          }}
        />
      ))}

      {/* Contenido principal */}
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            
            {/* Logo/Título 404 */}
            <div className="mb-4">
              <h1 
                className="display-1 fw-bold mb-0"
                style={{
                  fontSize: '8rem',
                  background: 'linear-gradient(45deg, #d32f2f, #e53935, #f44336)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: isDark ? '0 0 30px rgba(211, 47, 47, 0.3)' : 'none',
                  animation: 'pulse 2s ease-in-out infinite alternate'
                }}
              >
                404
              </h1>
            </div>

            {/* Ilustración creativa */}
            <div className="mb-4 position-relative">
              <div 
                className="d-inline-block p-4 rounded-circle"
                style={{
                  backgroundColor: isDark ? 'rgba(211, 47, 47, 0.1)' : 'rgba(211, 47, 47, 0.05)',
                  border: `3px solid ${isDark ? 'rgba(211, 47, 47, 0.3)' : 'rgba(211, 47, 47, 0.2)'}`,
                  animation: 'bounce 3s ease-in-out infinite'
                }}
              >
                <i 
                  className="bi bi-easel"
                  style={{
                    fontSize: '4rem',
                    color: '#d32f2f'
                  }}
                />
              </div>
              
              {/* Elementos decorativos alrededor */}
              <i 
                className="bi bi-stars position-absolute"
                style={{
                  top: '10%',
                  right: '20%',
                  fontSize: '1.5rem',
                  color: '#ffc107',
                  animation: 'twinkle 2s ease-in-out infinite alternate'
                }}
              />
              <i 
                className="bi bi-heart-fill position-absolute"
                style={{
                  bottom: '10%',
                  left: '15%',
                  fontSize: '1.2rem',
                  color: '#e91e63',
                  animation: 'twinkle 2.5s ease-in-out infinite alternate'
                }}
              />
            </div>

            {/* Mensaje principal */}
            <h2 
              className="fw-bold mb-3"
              style={{ 
                color: isDark ? '#ffffff' : '#212529',
                fontSize: '2rem'
              }}
            >
              ¡Oops! Esta página se perdió en el lienzo
            </h2>

            <p 
              className="lead mb-4"
              style={{ 
                color: isDark ? '#b3b3b3' : '#6c757d',
                fontSize: '1.1rem',
                maxWidth: '500px',
                margin: '0 auto'
              }}
            >
              Parece que el pincel se desvió del camino. La página que buscas no existe 
              o fue movida a otra galería.
            </p>

            {/* Botones de acción */}
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-5">
              <Link 
                to="/"
                className="btn btn-lg px-4"
                style={{
                  background: 'linear-gradient(45deg, #d32f2f, #e53935)',
                  border: 'none',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  borderRadius: '25px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(211, 47, 47, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(211, 47, 47, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(211, 47, 47, 0.3)';
                }}
              >
                <i className="bi bi-house-fill me-2"></i>
                Volver al Inicio
              </Link>

              <Link 
                to="/Exclusives"
                className="btn btn-outline-danger btn-lg px-4"
                style={{
                  borderColor: '#d32f2f',
                  color: isDark ? '#e53935' : '#d32f2f',
                  fontWeight: 'bold',
                  borderRadius: '25px',
                  borderWidth: '2px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#d32f2f';
                  e.target.style.color = '#ffffff';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = isDark ? '#e53935' : '#d32f2f';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <i className="bi bi-compass me-2"></i>
                Explorar Obras
              </Link>
            </div>

            {/* Enlaces útiles */}
            <div 
              className="p-4 rounded"
              style={{
                backgroundColor: isDark ? 'rgba(42, 42, 42, 0.5)' : 'rgba(248, 249, 250, 0.8)',
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
                backdropFilter: 'blur(10px)'
              }}
            >
              <h6 
                className="fw-bold mb-3"
                style={{ color: isDark ? '#ffffff' : '#212529' }}
              >
                ¿Necesitas ayuda? Prueba estos enlaces:
              </h6>
              
              <div className="row g-2">
                <div className="col-6 col-sm-3">
                  <Link 
                    to="/artworks"
                    className="btn btn-sm w-100"
                    style={{
                      backgroundColor: 'transparent',
                      border: `1px solid ${isDark ? '#555555' : '#dee2e6'}`,
                      color: isDark ? '#ffffff' : '#495057',
                      fontSize: '0.85rem'
                    }}
                  >
                    <i className="bi bi-palette me-1"></i>
                    Artworks
                  </Link>
                </div>
                <div className="col-6 col-sm-3">
                  <Link 
                    to="/authors"
                    className="btn btn-sm w-100"
                    style={{
                      backgroundColor: 'transparent',
                      border: `1px solid ${isDark ? '#555555' : '#dee2e6'}`,
                      color: isDark ? '#ffffff' : '#495057',
                      fontSize: '0.85rem'
                    }}
                  >
                    <i className="bi bi-people me-1"></i>
                    Autores
                  </Link>
                </div>
                <div className="col-6 col-sm-3">
                  <Link 
                    to="/community"
                    className="btn btn-sm w-100"
                    style={{
                      backgroundColor: 'transparent',
                      border: `1px solid ${isDark ? '#555555' : '#dee2e6'}`,
                      color: isDark ? '#ffffff' : '#495057',
                      fontSize: '0.85rem'
                    }}
                  >
                    <i className="bi bi-chat-dots me-1"></i>
                    Comunidad
                  </Link>
                </div>
                <div className="col-6 col-sm-3">
                  <Link 
                    to="/support"
                    className="btn btn-sm w-100"
                    style={{
                      backgroundColor: 'transparent',
                      border: `1px solid ${isDark ? '#555555' : '#dee2e6'}`,
                      color: isDark ? '#ffffff' : '#495057',
                      fontSize: '0.85rem'
                    }}
                  >
                    <i className="bi bi-question-circle me-1"></i>
                    Ayuda
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* CSS personalizado para animaciones */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes twinkle {
          0% { opacity: 0.5; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
