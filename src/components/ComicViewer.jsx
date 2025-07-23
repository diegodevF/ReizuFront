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

const ComicViewer = ({ title = "RPGS' TALES", Ep = "EP 22" }) => {
  // Array de páginas del comic
  const comicPages = [
    { src: page1, alt: "Página 1" },
    { src: page2, alt: "Página 2" },
    { src: page3, alt: "Página 3" },
    { src: page4, alt: "Página 4" },
    { src: page5, alt: "Página 5" }
  ];

  const [viewMode, setViewMode] = useState('paginated');
  const [currentPage, setCurrentPage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [theme, setTheme] = useState(getTheme());
  const [isLiked, setIsLiked] = useState(false);

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
           background: isDarkMode ? '#1a1a1a' : '#000000',
           color: isDarkMode ? '#ffffff' : '#ffffff',
           minHeight: '100vh',
           marginBottom: '60px', // ✅ Espaciado agregado aquí
           transition: 'background-color 0.3s ease, color 0.3s ease'
         }}>
      
      {/* Header superior unificado para ambas vistas */}
      <div style={{
        background: isDarkMode ? 'rgba(43,48,53,0.9)' : 'rgba(0,0,0,0.8)',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Título a la izquierda */}
        <h3 style={{
          color: '#ffffff',
          margin: 0,
          fontSize: '1.2rem',
          fontWeight: '700'
        }}>
          {title} - {Ep}
        </h3>

        {/* Controles de navegación en el centro - Solo para vista paginada */}
        {viewMode === 'paginated' && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <button 
              type="button"
              onClick={prevPage}
              disabled={currentPage === 0}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#ffffff',
                borderRadius: '4px',
                padding: '8px 12px',
                cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                opacity: currentPage === 0 ? 0.5 : 1
              }}
            >
              <i className="bi bi-chevron-left" style={{ fontSize: '1.2rem' }}></i>
            </button>

            <div style={{
              color: '#ffffff',
              fontSize: '0.9rem',
              fontWeight: '500',
              textAlign: 'center'
            }}>
              <div>Página {currentPage + 1} de {comicPages.length}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                {Math.round(progress)}%
              </div>
            </div>

            <button 
              type="button"
              onClick={nextPage}
              disabled={currentPage === comicPages.length - 1}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#ffffff',
                borderRadius: '4px',
                padding: '8px 12px',
                cursor: currentPage === comicPages.length - 1 ? 'not-allowed' : 'pointer',
                opacity: currentPage === comicPages.length - 1 ? 0.5 : 1
              }}
            >
              <i className="bi bi-chevron-right" style={{ fontSize: '1.2rem' }}></i>
            </button>
          </div>
        )}

        {/* Info de progreso para vista cascada - centrado */}
        {viewMode === 'cascade' && (
          <div style={{
            color: '#ffffff',
            fontSize: '0.9rem',
            fontWeight: '500',
            textAlign: 'center'
          }}>
            <div>Lectura en cascada</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
              {Math.round(progress)}% completado
            </div>
          </div>
        )}

        {/* Botones de control a la derecha */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Botón de corazón separado */}
          <button 
            onClick={() => setIsLiked(!isLiked)}
            style={{
              background: isLiked ? '#d32f2f' : 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#ffffff',
              borderRadius: '4px',
              padding: '6px 8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <i className={`bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'}`} style={{ fontSize: '1rem' }}></i>
          </button>

          {/* Botón de Apoyar separado */}
          <button style={{
            background: '#d32f2f',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            padding: '6px 12px',
            fontSize: '0.8rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Apoyar
          </button>

          <div className="btn-group" role="group">
            <button 
              type="button"
              onClick={() => setViewMode('cascade')}
              style={{
                background: viewMode === 'cascade' ? '#d32f2f' : 'rgba(255,255,255,0.1)',
                borderColor: viewMode === 'cascade' ? '#d32f2f' : 'rgba(255,255,255,0.3)',
                color: '#ffffff',
                fontSize: '0.8rem',
                padding: '6px 10px'
              }}
            >
              Cascada
            </button>
            <button 
              type="button"
              onClick={() => setViewMode('paginated')}
              style={{
                background: viewMode === 'paginated' ? '#d32f2f' : 'rgba(255,255,255,0.1)',
                borderColor: viewMode === 'paginated' ? '#d32f2f' : 'rgba(255,255,255,0.3)',
                color: '#ffffff',
                fontSize: '0.8rem',
                padding: '6px 10px'
              }}
            >
              Páginas
            </button>
          </div>

          <button 
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#ffffff',
              borderRadius: '4px',
              padding: '6px 8px',
              cursor: 'pointer'
            }}
          >
            <i className={`bi ${isFullscreen ? 'bi-fullscreen-exit' : 'bi-arrows-fullscreen'}`}></i>
          </button>
        </div>
      </div>

      {/* Barra de progreso de ancho completo para ambas vistas */}
      <div style={{
        width: '100%',
        height: '3px',
        background: 'rgba(255,255,255,0.2)'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #d32f2f, #e53935)',
          transition: 'width 0.3s ease'
        }}></div>
      </div>

      {viewMode === 'paginated' ? (
        // Vista Paginada
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 60px)',
          padding: '20px',
          position: 'relative'
        }}>
          <img 
            src={comicPages[currentPage]?.src} 
            alt={comicPages[currentPage]?.alt}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.6)'
            }}
          />

          {/* Contador flotante en la esquina */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(0,0,0,0.7)',
            color: '#ffffff',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.8rem',
            fontWeight: '600'
          }}>
            {currentPage + 1} / {comicPages.length}
          </div>
        </div>
      ) : (
        // Vista Cascada con el mismo diseño de header
        <div style={{
          height: 'calc(100vh - 60px)',
          padding: '0'
        }}>
          <div 
            ref={cascadeRef}
            style={{
              height: '100%',
              overflowY: 'auto',
              padding: '20px',
              background: '#000000'
            }}
          >
            {comicPages.map((page, index) => (
              <div key={index} style={{
                marginBottom: '2rem',
                textAlign: 'center',
                position: 'relative'
              }}>
                <img 
                  src={page.src} 
                  alt={page.alt}
                  loading="lazy"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'rgba(0,0,0,0.8)',
                  color: '#ffffff',
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
        </div>
      )}
    </div>
  );
};

export default ComicViewer;
