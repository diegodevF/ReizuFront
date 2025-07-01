import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importamos imágenes de patrocinadores y afiliados
import XpPen from '../assets/Logos/Xp.png';
import Logo1 from '../assets/Logos/Kin.png'
import Logo2 from '../assets/Logos/wonder.png'
import Logo3 from '../assets/Logos/csp.png'

// Detectar el tema global de Bootstrap
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

  return (
    <div className="partners-section">
      {/* Sección de Patrocinadores */}
      <div
        className={isDark ? "bg-danger text-white py-5" : "bg-danger text-white py-5"}
        style={{
          transition: 'background 0.3s, color 0.3s',
          background: isDark ? '#DC3545' : '#DC3545'
        }}
      >
        <div className="container">
          <div className="row text-center">
            <div className="col">
              <h2 className="display-4 fw-bold mb-4">
                Nuestros patrocinadores
              </h2>
              <div className="row align-items-center justify-content-center">
                <div className="col-auto me-4">
                  <img 
                    src={XpPen}
                    alt="XP-Pen"
                    style={{
                      height: '60px',
                      filter: isDark ? 'brightness(0.85)' : undefined
                    }}
                  />
                </div>
                <div className="col-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Afiliados */}
      <div
        className={isDark ? "bg-dark py-5" : "bg-light py-5"}
        style={{
          transition: 'background 0.3s, color 0.3s',
          background: isDark ? '#23272b' : undefined
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col">
              {/* Títulos */}
              <div className="text-center mb-5">
                <h2
                  className="display-5 fw-bold mb-3"
                  style={{
                    color: isDark ? '#fff' : '#212529',
                    transition: 'color 0.3s'
                  }}
                >
                  Descubre nuestros afiliados y consigue descuentos
                </h2>
                <p
                  className="lead"
                  style={{
                    color: isDark ? '#adb5bd' : '#6c757d',
                    transition: 'color 0.3s'
                  }}
                >
                  Realiza compras y apoya a la plataforma
                </p>
              </div>

              {/* 3 afiliados directos sin .map */}
              <div className="row justify-content-center align-items-center">
                <div className="col-6 col-sm-4 col-md-4 col-lg-4 text-center mb-4">
                  <img 
                    src={Logo2}
                    alt="Wondershare"
                    className="img-fluid"
                    style={{
                      maxHeight: '60px',
                      maxWidth: '150px',
                      objectFit: 'contain',
                      filter: isDark ? 'brightness(0.85)' : undefined
                    }}
                  />
                </div>
                <div className="col-6 col-sm-4 col-md-4 col-lg-4 text-center mb-4">
                  <img 
                    src={Logo3}
                    alt="Clip Studio Paint"
                    className="img-fluid"
                    style={{
                      maxHeight: '60px',
                      maxWidth: '150px',
                      objectFit: 'contain',
                      filter: isDark ? 'brightness(0.85)' : undefined
                    }}
                  />
                </div>
                <div className="col-6 col-sm-4 col-md-4 col-lg-4 text-center mb-4">
                  <img 
                    src={Logo1}
                    alt="Kinguin"
                    className="img-fluid"
                    style={{
                      maxHeight: '60px',
                      maxWidth: '150px',
                      objectFit: 'contain',
                      filter: isDark ? 'brightness(0.85)' : undefined
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
