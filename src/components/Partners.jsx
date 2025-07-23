import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importamos imágenes de patrocinadores
import XpPen from '../assets/Logos/Xp.png';
import Sketchi from '../assets/Logos/Sketchi.png';
import Deword from '../assets/Logos/Deword.png';

// Importamos imágenes de afiliados
import KinBlack from '../assets/Logos/KinBlack.png';
import KinWhite from '../assets/Logos/KinWhite.png';
import WonderWhite from '../assets/Logos/WonderWhite.png';
import CSPWhite from '../assets/Logos/cspWhite.png';
import WonderBlack from '../assets/Logos/WonderBlack.png';
import CSPBlack from '../assets/Logos/cspBlack.png';

// Detectar tema
const getTheme = () => {
  if (typeof document !== "undefined") {
    return document.documentElement.getAttribute("data-bs-theme") || "light";
  }
  return "light";
};

const Partners = () => {
  const [theme, setTheme] = useState(getTheme());

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

  const isDark = theme === 'dark';

  // LÓGICA CORREGIDA: modo claro = logo oscuro, modo oscuro = logo claro
  const getLogo = (lightLogo, darkLogo) => {
    return isDark ? lightLogo : darkLogo;
  };

  // Datos simplificados
  const sponsors = [
    { name: "XP-Pen", logo: XpPen, description: "Tabletas gráficas profesionales" },
    { name: "Sketchi", logo: Sketchi, description: "Herramientas de diseño digital" },
    { name: "Deword", logo: Deword, description: "Plataforma de contenido creativo" }
  ];

  const affiliates = [
    { 
      name: "Wondershare", 
      logo: getLogo(WonderWhite, WonderBlack), 
      description: "Software creativo profesional" 
    },
    { 
      name: "Clip Studio Paint", 
      logo: getLogo(CSPWhite, CSPBlack), 
      description: "Software de ilustración y manga" 
    },
    { 
      name: "Kinguin", 
      logo: getLogo(KinBlack, KinWhite), 
      description: "Plataforma de gaming digital" 
    }
  ];

  // Estilos estandarizados para todos los cards
  const cardStyles = {
    minHeight: '200px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer'
  };

  const imageContainerStyles = {
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12px'
  };

  const imageStyles = {
    maxHeight: '600px',
    maxWidth: '170px',
    objectFit: 'contain'
  };

  return (
    <div className="partners-section">
      {/* Sección de Patrocinadores */}
      <div
        className="text-white py-5"
        style={{ background: 'linear-gradient(135deg, #DC3545 0%, #c82333 100%)' }}
      >
        <div className="container text-center">
          <h2 className="display-4 fw-bold mb-5">
            <i className="bi bi-award-fill me-3"></i>
            Nuestros Patrocinadores
          </h2>
          
          <div className="row justify-content-center g-4">
            {sponsors.map((sponsor, index) => (
              <div key={index} className="col-12 col-md-4">
                <div 
                  className="p-4 rounded d-flex flex-column justify-content-between"
                  style={{
                    ...cardStyles,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={imageContainerStyles}>
                    <img 
                      src={sponsor.logo}
                      alt={sponsor.name}
                      style={{
                        ...imageStyles,
                        filter: 'brightness(1.1)'
                      }}
                    />
                  </div>
                  <div className="text-center">
                    <small className="text-white-50">{sponsor.description}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <p className="mt-4 opacity-75">
            <i className="bi bi-heart-fill me-2"></i>
            Gracias por hacer posible nuestro contenido
          </p>
        </div>
      </div>

      {/* Sección de Afiliados */}
      <div
        className="py-5"
        style={{ backgroundColor: isDark ? '#212529' : '#f8f9fa' }}
      >
        <div className="container">
          <div className="text-center mb-5">
            <h2
              className="display-5 fw-bold mb-3"
              style={{ color: isDark ? '#fff' : '#212529' }}
            >
              <i className="bi bi-handshake-fill me-3 text-danger"></i>
              Descubre Nuestros Afiliados
            </h2>
            <p
              className="lead"
              style={{ color: isDark ? '#adb5bd' : '#6c757d' }}
            >
              Consigue descuentos exclusivos y apoya a la plataforma
            </p>
            <div 
              className="mx-auto"
              style={{
                width: '100px',
                height: '3px',
                background: 'linear-gradient(90deg, #DC3545, #c82333)'
              }}
            ></div>
          </div>

          <div className="row justify-content-center g-4">
            {affiliates.map((affiliate, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-4">
                <div 
                  className="p-4 rounded d-flex flex-column justify-content-between"
                  style={{
                    ...cardStyles,
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = isDark 
                      ? '0 15px 35px rgba(0,0,0,0.3)' 
                      : '0 15px 35px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={imageContainerStyles}>
                    <img 
                      src={affiliate.logo}
                      alt={affiliate.name}
                      style={imageStyles}
                    />
                  </div>
                  
                  <div className="text-center">
                    <h6 
                      className="fw-bold mb-2"
                      style={{ color: isDark ? '#ffffff' : '#212529' }}
                    >
                      {affiliate.name}
                    </h6>
                    <small 
                      className="d-block mb-3"
                      style={{ color: isDark ? '#adb5bd' : '#6c757d' }}
                    >
                      {affiliate.description}
                    </small>
                    <span 
                      className="badge"
                      style={{ 
                        backgroundColor: '#dc3545', 
                        color: 'white', 
                        fontSize: '0.7rem' 
                      }}
                    >
                      Descuentos disponibles
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to action simplificado */}
          <div className="text-center mt-5">
            <div 
              className="d-inline-block p-4 rounded"
              style={{
                backgroundColor: isDark ? 'rgba(220, 53, 69, 0.1)' : 'rgba(220, 53, 69, 0.05)',
                border: '2px solid rgba(220, 53, 69, 0.2)'
              }}
            >
              <h5 
                className="fw-bold mb-2"
                style={{ color: isDark ? '#ffffff' : '#212529' }}
              >
                <i className="bi bi-gift-fill text-danger me-2"></i>
                ¿Quieres ser nuestro afiliado?
              </h5>
              <p 
                className="mb-3"
                style={{ color: isDark ? '#adb5bd' : '#6c757d' }}
              >
                Únete a nuestro programa de afiliados y obtén beneficios exclusivos
              </p>
              <button 
                className="btn btn-danger px-4 py-2 fw-bold"
                style={{
                  background: 'linear-gradient(45deg, #DC3545, #c82333)',
                  border: 'none',
                  borderRadius: '25px'
                }}
              >
                <i className="bi bi-envelope-fill me-2"></i>
                Contáctanos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
