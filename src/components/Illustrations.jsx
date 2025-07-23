import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Img from "../assets/authors/1650010_26.jpg"

const Illustrations = ({ illustrations = [] }) => {
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

  // Datos por defecto si no se proporcionan ilustraciones
  const defaultIllustrations = illustrations.length > 0 ? illustrations : [
    { id: 1, title: 'Concept Art 1', image: Img, likes: 245, isAdult: false },
    { id: 2, title: 'Character Design', image: Img, likes: 189, isAdult: false },
    { id: 3, title: 'Background Art', image: Img, likes: 156, isAdult: true },
    { id: 4, title: 'Color Study', image: Img, likes: 298, isAdult: false },
    { id: 5, title: 'Digital Painting', image: Img, likes: 167, isAdult: false },
    { id: 6, title: 'Sketch Collection', image: Img, likes: 234, isAdult: false },
    { id: 7, title: 'Fantasy Art', image: Img, likes: 312, isAdult: true },
    { id: 8, title: 'Portrait Study', image: Img, likes: 198, isAdult: false }
  ];

  return (
    <div 
      className="rounded-2 p-4 mt-3"
      style={{
        backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
        borderColor: isDark ? '#333333' : '#dee2e6',
        boxShadow: isDark 
          ? '0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)' 
          : '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
        border: `2px solid ${isDark ? '#333333' : '#e0e0e0'}`,
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
        background: isDark 
          ? 'linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 100%)' 
          : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
        backdropFilter: 'blur(10px)'
      }}
    >
      {/* Título mejorado */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center me-3"
            style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #d32f2f, #e53935)',
              boxShadow: '0 4px 12px rgba(211, 47, 47, 0.3)'
            }}
          >
            <i className="bi bi-palette-fill text-white" style={{ fontSize: '1.2rem' }}></i>
          </div>
          <div>
            <h5 
              className="fw-bold mb-0"
              style={{ 
                color: isDark ? '#ffffff' : '#212529',
                fontSize: '1.4rem',
                letterSpacing: '-0.5px'
              }}
            >
              Ilustraciones
            </h5>
            <small 
              style={{ 
                color: isDark ? '#8a8a8a' : '#6c757d',
                fontSize: '0.85rem'
              }}
            >
              Galería de arte digital
            </small>
          </div>
        </div>
        
        <Link 
          to="/author/illustrations"
          className="btn btn-outline-danger"
          style={{
            borderColor: '#d32f2f',
            color: isDark ? '#e53935' : '#d32f2f',
            fontSize: '0.9rem',
            borderWidth: '2px',
            borderRadius: '12px',
            padding: '8px 20px',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            background: 'transparent'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #d32f2f, #e53935)';
            e.target.style.color = 'white';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 25px rgba(211, 47, 47, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = isDark ? '#e53935' : '#d32f2f';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          Ver todas
          <i className="bi bi-arrow-right ms-2"></i>
        </Link>
      </div>
      
      {/* Grilla de ilustraciones mejorada */}
      <div className="row g-4">
        {defaultIllustrations.map((illustration) => (
          <div key={illustration.id} className="col-6 col-md-3">
            <div 
              className="position-relative illustration-card"
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: isDark 
                  ? '0 4px 20px rgba(0,0,0,0.3)' 
                  : '0 4px 20px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = isDark 
                  ? '0 12px 40px rgba(0,0,0,0.4)' 
                  : '0 12px 40px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = isDark 
                  ? '0 4px 20px rgba(0,0,0,0.3)' 
                  : '0 4px 20px rgba(0,0,0,0.1)';
              }}
            >
              <Link to={`/illustration/${illustration.id}`}>
                <div
                  style={{
                    width: '100%',
                    height: '180px',
                    backgroundColor: isDark ? '#2a2a2a' : '#f8f9fa',
                    backgroundImage: `url(${illustration.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                  }}
                >
                  {/* Overlay gradiente */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, rgba(211, 47, 47, 0.1) 0%, rgba(229, 57, 53, 0.05) 100%)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease'
                    }}
                    className="illustration-overlay"
                  ></div>
                  
                  {/* Badge +18 mejorado */}
                  {illustration.isAdult && (
                    <div
                      className="position-absolute top-0 end-0 px-3 py-2"
                      style={{
                        background: 'linear-gradient(135deg, #dc3545, #c82333)',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        borderBottomLeftRadius: '12px',
                        boxShadow: '0 2px 8px rgba(220, 53, 69, 0.3)',
                        border: '2px solid rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      +18
                    </div>
                  )}
                  
                  {/* Overlay con información mejorado */}
                  <div 
                    className="position-absolute bottom-0 start-0 w-100 p-3"
                    style={{
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                      color: 'white',
                      backdropFilter: 'blur(5px)'
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="flex-grow-1 me-2">
                        <h6 
                          className="fw-bold mb-0 text-truncate"
                          style={{ 
                            fontSize: '0.9rem',
                            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                          }}
                        >
                          {illustration.title}
                        </h6>
                      </div>
                      <div 
                        className="d-flex align-items-center px-2 py-1 rounded-pill"
                        style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          backdropFilter: 'blur(10px)'
                        }}
                      >
                        <i className="bi bi-heart-fill text-danger me-1" style={{ fontSize: '0.8rem' }}></i>
                        <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>
                          {illustration.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {/* Footer mejorado */}
      <div 
        className="text-center mt-4 p-3 rounded-3"
        style={{
          background: isDark 
            ? 'linear-gradient(135deg, rgba(42, 42, 42, 0.5), rgba(26, 26, 26, 0.5))' 
            : 'linear-gradient(135deg, rgba(248, 249, 250, 0.8), rgba(233, 236, 239, 0.5))',
          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
          backdropFilter: 'blur(10px)'
        }}
      >
        <div className="d-flex align-items-center justify-content-center">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center me-2"
            style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #d32f2f, #e53935)',
              boxShadow: '0 2px 8px rgba(211, 47, 47, 0.2)'
            }}
          >
            <i className="bi bi-images text-white" style={{ fontSize: '0.8rem' }}></i>
          </div>
          <span 
            className="fw-medium"
            style={{ 
              color: isDark ? '#ffffff' : '#212529',
              fontSize: '0.95rem'
            }}
          >
            {defaultIllustrations.length} ilustraciones disponibles
          </span>
        </div>
      </div>
      
      {/* CSS adicional */}
      <style jsx>{`
        .illustration-card:hover .illustration-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default Illustrations;
