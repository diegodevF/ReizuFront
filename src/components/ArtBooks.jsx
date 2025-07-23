import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Img from "../assets/Portadas/IMG_20250221_180604-1.png"

const Artbooks = ({ artbooks = [] }) => {
  const [theme, setTheme] = useState('light');
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

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

  // Datos por defecto si no se proporcionan artbooks
  const defaultArtbooks = artbooks.length > 0 ? artbooks : [
    { id: 1, image: Img },
    { id: 2, image: Img },
    { id: 3, image: Img },
    { id: 4, image: Img },
    { id: 5, image: Img }
  ];

  const checkArrowsVisibility = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    checkArrowsVisibility();
    window.addEventListener('resize', checkArrowsVisibility);
    return () => window.removeEventListener('resize', checkArrowsVisibility);
  }, []);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -250, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 250, behavior: 'smooth' });
  };

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
            <i className="bi bi-book-fill text-white" style={{ fontSize: '1.2rem' }}></i>
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
              Artbooks
            </h5>
            <small 
              style={{ 
                color: isDark ? '#8a8a8a' : '#6c757d',
                fontSize: '0.85rem'
              }}
            >
              Colección de arte premium
            </small>
          </div>
        </div>
        
        <Link 
          to="/author/artbooks"
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
          Ver catálogo
          <i className="bi bi-arrow-right ms-2"></i>
        </Link>
      </div>
      
      <div className="position-relative">
        {/* Flecha izquierda */}
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="position-absolute start-0 top-50 translate-middle-y btn rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: '50px',
              height: '50px',
              zIndex: 2,
              left: '-25px',
              border: 'none',
              boxShadow: isDark 
                ? '0 8px 25px rgba(0,0,0,0.4)' 
                : '0 8px 25px rgba(0,0,0,0.15)',
              background: 'linear-gradient(135deg, #d32f2f, #e53935)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)';
              e.target.style.boxShadow = isDark 
                ? '0 12px 35px rgba(0,0,0,0.5)' 
                : '0 12px 35px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = isDark 
                ? '0 8px 25px rgba(0,0,0,0.4)' 
                : '0 8px 25px rgba(0,0,0,0.15)';
            }}
          >
            <i className="bi bi-chevron-left text-white fw-bold" style={{ fontSize: '1.2rem' }}></i>
          </button>
        )}
        
        {/* Flecha derecha */}
        {showRightArrow && (
          <button
            onClick={scrollRight}
            className="position-absolute end-0 top-50 translate-middle-y btn rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: '50px',
              height: '50px',
              zIndex: 2,
              right: '-25px',
              border: 'none',
              boxShadow: isDark 
                ? '0 8px 25px rgba(0,0,0,0.4)' 
                : '0 8px 25px rgba(0,0,0,0.15)',
              background: 'linear-gradient(135deg, #d32f2f, #e53935)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)';
              e.target.style.boxShadow = isDark 
                ? '0 12px 35px rgba(0,0,0,0.5)' 
                : '0 12px 35px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = isDark 
                ? '0 8px 25px rgba(0,0,0,0.4)' 
                : '0 8px 25px rgba(0,0,0,0.15)';
            }}
          >
            <i className="bi bi-chevron-right text-white fw-bold" style={{ fontSize: '1.2rem' }}></i>
          </button>
        )}
        
        {/* Carrusel solo con imágenes */}
        <div
          ref={scrollContainerRef}
          className="d-flex overflow-auto pb-3"
          onScroll={checkArrowsVisibility}
          style={{
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            justifyContent: 'flex-start',
            padding: '0 15px'
          }}
        >
          {defaultArtbooks.map((artbook) => (
            <div
              key={artbook.id}
              className="flex-shrink-0 me-4"
              style={{ width: '200px', minWidth: '200px' }}
            >
              <Link to={`/artbook/${artbook.id}`} style={{ textDecoration: 'none' }}>
                <div 
                  className="position-relative artbook-card"
                  style={{
                    borderRadius: '20px',
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    cursor: 'pointer',
                    boxShadow: isDark 
                      ? '0 8px 25px rgba(0,0,0,0.3)' 
                      : '0 8px 25px rgba(0,0,0,0.12)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.03)';
                    e.currentTarget.style.boxShadow = isDark 
                      ? '0 20px 50px rgba(0,0,0,0.4)' 
                      : '0 20px 50px rgba(0,0,0,0.18)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = isDark 
                      ? '0 8px 25px rgba(0,0,0,0.3)' 
                      : '0 8px 25px rgba(0,0,0,0.12)';
                  }}
                >
                  {/* Solo la imagen */}
                  <div
                    style={{
                      width: '100%',
                      height: '280px',
                      backgroundColor: isDark ? '#2a2a2a' : '#f8f9fa',
                      backgroundImage: `url(${artbook.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative'
                    }}
                  >
                    {/* Overlay gradiente sutil al hover */}
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
                      className="artbook-overlay"
                    ></div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Footer simplificado */}
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
            <i className="bi bi-arrow-left-right text-white" style={{ fontSize: '0.8rem' }}></i>
          </div>
          <span 
            className="fw-medium"
            style={{ 
              color: isDark ? '#ffffff' : '#212529',
              fontSize: '0.95rem'
            }}
          >
            {defaultArtbooks.length} artbooks disponibles
          </span>
        </div>
      </div>
      
      {/* CSS adicional */}
      <style jsx>{`
        .artbook-card:hover .artbook-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default Artbooks;
