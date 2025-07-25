import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import PerfilPhoto from '../assets/authors/b3b93208f79852e20f49bf67aa42491c.jpg'
import Banner from '../assets/authors/1650010_26.jpg'
import marco1 from '../assets/Marcos/Diamante.png';




const AuthorProfile = () => {
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
      className="rounded" 
      style={{
        backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
        borderColor: isDark ? '#333333' : '#dee2e6',
        boxShadow: isDark ? '0 2px 10px rgba(0,0,0,0.3)' : '0 2px 10px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}
    >
      {/* Banner superior */}
      <div style={{
        height: '450px',
        position: 'relative',
        backgroundImage: `url(${Banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        {/* Overlay para dark mode */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDark 
            ? 'linear-gradient(135deg, rgba(42, 42, 42, 0.7) 0%, rgba(26, 26, 26, 0.7) 100%)' 
            : 'linear-gradient(135deg, rgba(76, 76, 76, 0.3) 0%, rgba(58, 58, 58, 0.3) 100%)',
          zIndex: 1
        }}></div>

        {/* Imagen de perfil */}
        <div
          className="rounded-circle"
          style={{
            width: '230px',
            height: '230px',
            position: 'absolute',
            bottom: '-155px',
            left: '62px',
            zIndex: 2,
            // border: '4px solid #d32f2f',
            boxShadow: isDark ? '0 4px 8px rgba(0,0,0,0.4)' : '0 4px 8px rgba(0,0,0,0.2)',
          }}
        >

          <img 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -53%)',
              width: '130%',
              height: '130%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          src={marco1} alt="Perfil" />

          <img 
            src={PerfilPhoto} 
            alt="Perfil" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              borderRadius:"999px"
            }}
          />
        </div>
      </div>

      {/* Sección inferior */}
      <div className="pt-5 px-5 pb-4">
        {/* Layout responsive */}
        <div className="row align-items-start">
          {/* Info principal */}
          <div className="col-12 col-lg-8">
            <div 
              className="d-flex flex-column flex-md-row align-items-start"
              style={{ 
                marginLeft: '300px'
              }}
            >
              {/* Contenido principal */}
              <div className="flex-grow-1 mb-3 mb-md-0">
                <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center mb-2">
                  <h4 
                    className="mb-2 mb-sm-0 me-3 fw-bold" 
                    style={{ 
                      color: isDark ? '#ffffff' : '#212529',
                      fontSize: '1.5rem'
                    }}
                  >
                    MAMBA
                  </h4>
                  
                  {/* Íconos de redes sociales */}
                  <div className="d-flex flex-wrap">
                    <i 
                      className="bi bi-facebook me-2 mb-1" 
                      style={{
                        fontSize: '1.2rem',
                        color: isDark ? '#8a8a8a' : '#6c757d',
                        cursor: 'pointer',
                        transition: 'color 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#1877f2'}
                      onMouseLeave={(e) => e.target.style.color = isDark ? '#8a8a8a' : '#6c757d'}
                    ></i>
                    <i 
                      className="bi bi-twitter-x me-2 mb-1" 
                      style={{
                        fontSize: '1.2rem',
                        color: isDark ? '#8a8a8a' : '#6c757d',
                        cursor: 'pointer',
                        transition: 'color 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.color = isDark ? '#ffffff' : '#000000'}
                      onMouseLeave={(e) => e.target.style.color = isDark ? '#8a8a8a' : '#6c757d'}
                    ></i>
                    <i 
                      className="bi bi-instagram me-2 mb-1" 
                      style={{
                        fontSize: '1.2rem',
                        color: isDark ? '#8a8a8a' : '#6c757d',
                        cursor: 'pointer',
                        transition: 'color 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#e4405f'}
                      onMouseLeave={(e) => e.target.style.color = isDark ? '#8a8a8a' : '#6c757d'}
                    ></i>
                    <i 
                      className="bi bi-tiktok me-2 mb-1" 
                      style={{
                        fontSize: '1.2rem',
                        color: isDark ? '#8a8a8a' : '#6c757d',
                        cursor: 'pointer',
                        transition: 'color 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.color = isDark ? '#ffffff' : '#000000'}
                      onMouseLeave={(e) => e.target.style.color = isDark ? '#8a8a8a' : '#6c757d'}
                    ></i>
                    <i 
                      className="bi bi-youtube me-2 mb-1" 
                      style={{
                        fontSize: '1.2rem',
                        color: isDark ? '#8a8a8a' : '#6c757d',
                        cursor: 'pointer',
                        transition: 'color 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#ff0000'}
                      onMouseLeave={(e) => e.target.style.color = isDark ? '#8a8a8a' : '#6c757d'}
                    ></i>
                    <i 
                      className="bi bi-twitch me-2 mb-1" 
                      style={{
                        fontSize: '1.2rem',
                        color: isDark ? '#8a8a8a' : '#6c757d',
                        cursor: 'pointer',
                        transition: 'color 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#9146ff'}
                      onMouseLeave={(e) => e.target.style.color = isDark ? '#8a8a8a' : '#6c757d'}
                    ></i>
                  </div>
                </div>

                {/* Descripción */}
                <p 
                  className="mb-2 lh-base" 
                  style={{ 
                    maxWidth: '600px',
                    color: isDark ? '#cccccc' : '#6c757d',
                    fontSize: '0.95rem'
                  }}
                >
                  Es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor.
                </p>

                {/* Edad y país */}
                <div className="d-flex align-items-center flex-wrap">
                  <span className="badge bg-danger me-2 mb-1">25 años</span>
                  <span 
                    className="fw-medium d-flex align-items-center"
                    style={{ color: isDark ? '#ffffff' : '#212529' }}
                  >
                    <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                    Chile
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="col-12 col-lg-4">
            <div className="d-flex flex-column flex-sm-row flex-lg-column align-items-stretch align-items-sm-center align-items-lg-end mt-3 mt-lg-0">
            
              <div className='d-flex gap-3'>
            
              <button 
                className="btn btn-danger mb-2 mb-sm-0 mb-lg-2 me-sm-2 me-lg-0 px-4"
                style={{
                  background: 'linear-gradient(45deg, #d32f2f, #e53935)',
                  border: 'none',
                  fontWeight: 'bold',
                  transition: 'transform 0.2s ease',
                  minWidth: '120px'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <i className="bi bi-heart-fill me-2"></i>
                Apoyar
              </button>
              
              <button 
                className="btn btn-outline-danger mb-2 mb-sm-0 mb-lg-2 me-sm-2 me-lg-0 px-4"
                style={{
                  borderColor: '#d32f2f',
                  color: isDark ? '#e53935' : '#d32f2f',
                  backgroundColor: 'transparent',
                  minWidth: '120px'
                }}
              >
                <i className="bi bi-person-plus me-1"></i> 
                Seguir
              </button>

              </div>
              
              <button 
                className="btn btn-link text-decoration-none px-2"
                style={{
                  color: isDark ? '#8a8a8a' : '#6c757d',
                  minWidth: '120px'
                }}
              >
                <i className="bi bi-envelope-fill me-2"></i> 
                Contactar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos responsive adicionales */}
      <style jsx>{`
        @media (max-width: 768px) {
          .rounded-circle {
            width: 150px !important;
            height: 150px !important;
            bottom: -75px !important;
            left: 20px !important;
          }
          
          .pt-5 {
            padding-top: 5rem !important;
          }
          
          div[style*="marginLeft: 250px"] {
            margin-left: 0 !important;
            padding-left: 0 !important;
          }
        }
        
        @media (max-width: 576px) {
          .rounded-circle {
            width: 120px !important;
            height: 120px !important;
            bottom: -60px !important;
            left: 15px !important;
          }
          
          .pt-5 {
            padding-top: 4rem !important;
          }
          
          h4 {
            font-size: 1.25rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AuthorProfile;
