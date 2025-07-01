// components/ComicViewer.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import '../variables.css';

// Importar las imágenes del comic
import page1 from '../assets/Portadas/1000105792.png';
import page2 from '../assets/Portadas/1000111521.jpg';
import page3 from '../assets/Portadas/18 sin título_20250408160024 - meloshvtvp.jpg';
import page4 from '../assets/Portadas/2 - Nicolas Ramirez (1).jpg';
import page5 from '../assets/Portadas/IMG_20250221_180604-1.png';

// Función para obtener el tema actual del sistema/Bootstrap
const getTheme = () => {
  if (typeof document !== "undefined") {
    return document.documentElement.getAttribute("data-bs-theme") || "light";
  }
  return "light";
};

const ComicViewer = ({ title = "Mi Comic" }) => {
  // Array de páginas del comic
  const comicPages = [
    { src: page1, alt: "Página 1" },
    { src: page2, alt: "Página 2" },
    { src: page3, alt: "Página 3" },
    { src: page4, alt: "Página 4" },
    { src: page5, alt: "Página 5" }
  ];

  const [viewMode, setViewMode] = useState('cascade');
  const [currentPage, setCurrentPage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [theme, setTheme] = useState(getTheme()); // Estado del tema interno

  const cascadeRef = useRef(null);

  // Detectar cambios en el tema de Bootstrap
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

  // Variable para determinar si está en modo oscuro
  const isDarkMode = theme === "dark";

  // Calcular progreso
  const calculateProgress = useCallback(() => {
    if (viewMode === 'paginated') {
      return ((currentPage + 1) / comicPages.length) * 100;
    } else {
      return scrollProgress;
    }
  }, [viewMode, currentPage, comicPages.length, scrollProgress]);

  // Manejar scroll en cascada
  const handleScroll = useCallback(() => {
    if (viewMode === 'cascade' && cascadeRef.current) {
      const container = cascadeRef.current;
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
    }
  }, [viewMode]);

  // Navegación
  const nextPage = useCallback(() => {
    if (currentPage < comicPages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, comicPages.length]);

  const prevPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  // Navegación con teclado
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (viewMode === 'paginated') {
        if (event.key === 'ArrowRight') nextPage();
        if (event.key === 'ArrowLeft') prevPage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [viewMode, nextPage, prevPage]);

  // Configurar scroll listener
  useEffect(() => {
    const cascadeContainer = cascadeRef.current;
    if (viewMode === 'cascade' && cascadeContainer) {
      cascadeContainer.addEventListener('scroll', handleScroll);
      return () => cascadeContainer.removeEventListener('scroll', handleScroll);
    }
  }, [viewMode, handleScroll]);

  const progress = calculateProgress();

  return (
    <div className={`comic-viewer ${isFullscreen ? 'fullscreen' : ''} ${isDarkMode ? 'dark-theme' : 'light-theme'}`} 
         style={{
           background: isDarkMode ? '' : '#ffffff',
           color: isDarkMode ? '#ffffff' : '#000000',
           minHeight: '100vh',
           transition: 'background-color 0.3s ease, color 0.3s ease'
         }}>
      
      {/* Controles del Visualizador */}
      <div className="viewer-controls" style={{
        background: isDarkMode ? 'rgba(43,48,53)' : '#f8f9fa',
        padding: '1rem',
        borderBottom: `1px solid ${isDarkMode ? '#404040' : '#dee2e6'}`,
        transition: 'background-color 0.3s ease, border-color 0.3s ease'
      }}>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-3">
              <h3 className="comic-title" style={{
                color: isDarkMode ? '#ffffff' : '#333333',
                margin: 0,
                fontSize: '1.5rem',
                fontWeight: '600'
              }}>
                {title}
              </h3>
            </div>
            
            <div className="col-md-4 text-center">
              <div className="progress-info">
                <small className="progress-text d-block mb-2" style={{
                  color: isDarkMode ? '#cccccc' : '#666666'
                }}>
                  {viewMode === 'paginated' 
                    ? `Página ${currentPage + 1} de ${comicPages.length}` 
                    : 'Progreso de lectura'
                  }
                </small>
                <div className="progress" style={{ 
                  height: '8px',
                  background: isDarkMode ? '#404040' : '#e9ecef',
                  borderRadius: '4px'
                }}>
                  <div 
                    className="progress-bar" 
                    role="progressbar" 
                    style={{ 
                      width: `${progress}%`,
                      background: 'linear-gradient(90deg, #d32f2f, #e53935)',
                      borderRadius: '4px',
                      transition: 'width 0.3s ease'
                    }}
                    aria-valuenow={progress} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  >
                  </div>
                </div>
                <small style={{ color: isDarkMode ? '#cccccc' : '#666666' }}>
                  {Math.round(progress)}%
                </small>
              </div>
            </div>
            
            <div className="col-md-5 text-end">
              <div className="btn-group me-3" role="group">
                <button 
                  type="button"
                  className={`btn btn-sm ${viewMode === 'cascade' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setViewMode('cascade')}
                  style={{
                    background: viewMode === 'cascade' ? '#d32f2f' : 'transparent',
                    borderColor: '#d32f2f',
                    color: viewMode === 'cascade' ? '#fff' : (isDarkMode ? '#d32f2f' : '#d32f2f')
                  }}
                >
                  <i className="bi bi-file-text me-1"></i>
                  Cascada
                </button>
                <button 
                  type="button"
                  className={`btn btn-sm ${viewMode === 'paginated' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setViewMode('paginated')}
                  style={{
                    background: viewMode === 'paginated' ? '#d32f2f' : 'transparent',
                    borderColor: '#d32f2f',
                    color: viewMode === 'paginated' ? '#fff' : (isDarkMode ? '#d32f2f' : '#d32f2f')
                  }}
                >
                  <i className="bi bi-book me-1"></i>
                  Páginas
                </button>
              </div>
              
              <div className="btn-group" role="group">
                <button 
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
                  style={{
                    borderColor: isDarkMode ? '#666666' : '#6c757d',
                    color: isDarkMode ? '#ffffff' : '#6c757d',
                    background: 'transparent'
                  }}
                >
                  <i className={`bi ${isFullscreen ? 'bi-fullscreen-exit' : 'bi-arrows-fullscreen'}`}></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenedor del Comic */}
      <div className={`comic-container ${viewMode}`} style={{
        background: isDarkMode ? '' : '#ffffff',
        minHeight: 'calc(100vh - 120px)',
        padding: '1rem'
      }}>
        {viewMode === 'cascade' ? (
          // Vista en Cascada
          <div 
            ref={cascadeRef}
            className="cascade-view"
            style={{
              maxHeight: 'calc(100vh - 200px)',
              overflowY: 'auto',
              padding: '1rem',
              background: isDarkMode ? '#222222' : '#f8f9fa',
              borderRadius: '8px'
            }}
          >
            {comicPages.map((page, index) => (
              <div key={index} className="comic-page cascade-page" style={{
                marginBottom: '2rem',
                textAlign: 'center',
                position: 'relative'
              }}>
                <img 
                  src={page.src} 
                  alt={page.alt}
                  className="img-fluid page-image"
                  loading="lazy"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    boxShadow: isDarkMode 
                      ? '0 4px 20px rgba(0,0,0,0.5)' 
                      : '0 4px 20px rgba(0,0,0,0.1)'
                  }}
                />
                <div className="page-number" style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: isDarkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)',
                  color: isDarkMode ? '#ffffff' : '#333333',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Vista Paginada
          <div className="paginated-view" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}>
            <div className="row align-items-center w-100" style={{ height: 'calc(100vh - 250px)' }}>
              <div className="col-1 text-center">
                <button 
                  type="button"
                  className="btn btn-outline-secondary nav-button"
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  style={{
                    borderColor: isDarkMode ? '#666666' : '#6c757d',
                    color: isDarkMode ? '#ffffff' : '#6c757d',
                    background: 'transparent',
                    fontSize: '1.5rem',
                    padding: '0.5rem 0.75rem'
                  }}
                >
                  ‹
                </button>
              </div>
              
              <div className="col-10 text-center">
                <div className="page-container">
                  <img 
                    src={comicPages[currentPage]?.src} 
                    alt={comicPages[currentPage]?.alt}
                    className="current-page img-fluid"
                    style={{
                      maxHeight: 'calc(100vh - 300px)',
                      maxWidth: '100%',
                      borderRadius: '8px',
                      boxShadow: isDarkMode 
                        ? '0 8px 32px rgba(0,0,0,0.6)' 
                        : '0 8px 32px rgba(0,0,0,0.15)'
                    }}
                  />
                </div>
              </div>
              
              <div className="col-1 text-center">
                <button 
                  type="button"
                  className="btn btn-outline-secondary nav-button"
                  onClick={nextPage}
                  disabled={currentPage === comicPages.length - 1}
                  style={{
                    borderColor: isDarkMode ? '#666666' : '#6c757d',
                    color: isDarkMode ? '#ffffff' : '#6c757d',
                    background: 'transparent',
                    fontSize: '1.5rem',
                    padding: '0.5rem 0.75rem'
                  }}
                >
                  ›
                </button>
              </div>
            </div>
            
            {/* Navegación por puntos */}
            <div className="page-navigation mt-3">
              <div className="page-dots d-flex justify-content-center">
                {comicPages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`page-dot ${index === currentPage ? 'active' : ''}`}
                    onClick={() => setCurrentPage(index)}
                    title={`Ir a página ${index + 1}`}
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      border: 'none',
                      margin: '0 4px',
                      background: index === currentPage 
                        ? '#d32f2f' 
                        : (isDarkMode ? '#666666' : '#cccccc'),
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contador flotante */}
      {viewMode === 'paginated' && (
        <div className="floating-controls" style={{
          position: '',
          bottom: '20px',
          right: '20px',
          background: isDarkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)',
          color: isDarkMode ? '#ffffff' : '#333333',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '0.9rem',
          fontWeight: '600',
          boxShadow: isDarkMode 
            ? '0 4px 20px rgba(0,0,0,0.6)' 
            : '0 4px 20px rgba(0,0,0,0.15)',
          backdropFilter: 'blur(10px)'
        }}>
          <div className="page-counter">
            {currentPage + 1} / {comicPages.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComicViewer;
