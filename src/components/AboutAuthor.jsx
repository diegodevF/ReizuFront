import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Importa la imagen del autor
import AuthorImage from '../assets/authors/b3b93208f79852e20f49bf67aa42491c.jpg'; // Ajusta la ruta según tu estructura

const AboutAuthor = () => {
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
      {/* Título */}
      <h4 
        className="fw-bold mb-4 pb-2"
        style={{ 
          color: isDark ? '#ffffff' : '#212529',
          borderBottom: `3px solid #d32f2f`,
          display: 'inline-block'
        }}
      >
        <i className="bi bi-person-circle me-2 text-danger"></i>
        Acerca de
      </h4>

      {/* Sección principal con foto y datos */}
      <div className="row mb-4">
        {/* Foto del autor */}
        <div className="col-12 col-md-4 text-center mb-3 mb-md-0">
          <div 
            className="rounded-circle mx-auto"
            style={{
              width: '200px',
              height: '200px',
              backgroundColor: isDark ? '#2a2a2a' : '#f8f9fa',
              backgroundImage: `url(${AuthorImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '4px solid #d32f2f',
              boxShadow: isDark ? '0 8px 20px rgba(0,0,0,0.3)' : '0 8px 20px rgba(0,0,0,0.1)'
            }}
          ></div>
        </div>

        {/* Información del autor */}
        <div className="col-12 col-md-8">
          <div className="h-100 d-flex flex-column justify-content-center">
            {/* Nombre del autor */}
            <h2 
              className="fw-bold mb-3"
              style={{ 
                color: isDark ? '#ffffff' : '#212529',
                fontSize: '2.2rem'
              }}
            >
              MAMBA
              <span 
                className="ms-2"
                style={{ fontSize: '1.5rem' }}
              >
                ❤️
              </span>
            </h2>

            {/* Información básica */}
            <div className="mb-3">
              <div className="row">
                <div className="col-6 mb-2">
                  <strong 
                    style={{ color: isDark ? '#ffffff' : '#212529' }}
                  >
                    Edad:
                  </strong>
                  <span 
                    className="ms-2"
                    style={{ color: isDark ? '#cccccc' : '#6c757d' }}
                  >
                    25 años
                  </span>
                </div>
                <div className="col-6 mb-2">
                  <strong 
                    style={{ color: isDark ? '#ffffff' : '#212529' }}
                  >
                    País:
                  </strong>
                  <span 
                    className="ms-2"
                    style={{ color: isDark ? '#cccccc' : '#6c757d' }}
                  >
                    <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                    Chile
                  </span>
                </div>
                <div className="col-6 mb-2">
                  <strong 
                    style={{ color: isDark ? '#ffffff' : '#212529' }}
                  >
                    Género:
                  </strong>
                  <span 
                    className="ms-2"
                    style={{ color: isDark ? '#cccccc' : '#6c757d' }}
                  >
                    Masculino
                  </span>
                </div>
                <div className="col-6 mb-2">
                  <strong 
                    style={{ color: isDark ? '#ffffff' : '#212529' }}
                  >
                    Se unió:
                  </strong>
                  <span 
                    className="ms-2"
                    style={{ color: isDark ? '#cccccc' : '#6c757d' }}
                  >
                    Enero 2020
                  </span>
                </div>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="mb-3">
              <h6 
                className="fw-bold mb-2"
                style={{ color: isDark ? '#ffffff' : '#212529' }}
              >
                Redes Sociales:
              </h6>
              <div className="d-flex flex-wrap gap-2">
                <a 
                  href="#" 
                  className="btn btn-outline-primary btn-sm"
                  style={{
                    borderColor: '#1877f2',
                    color: '#1877f2',
                    fontSize: '0.85rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#1877f2';
                    e.target.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#1877f2';
                  }}
                >
                  <i className="bi bi-facebook me-1"></i>
                  Facebook
                </a>
                <a 
                  href="#" 
                  className="btn btn-outline-dark btn-sm"
                  style={{
                    borderColor: isDark ? '#ffffff' : '#000000',
                    color: isDark ? '#ffffff' : '#000000',
                    fontSize: '0.85rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = isDark ? '#ffffff' : '#000000';
                    e.target.style.color = isDark ? '#000000' : '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = isDark ? '#ffffff' : '#000000';
                  }}
                >
                  <i className="bi bi-twitter-x me-1"></i>
                  Twitter
                </a>
                <a 
                  href="#" 
                  className="btn btn-outline-danger btn-sm"
                  style={{
                    borderColor: '#e4405f',
                    color: '#e4405f',
                    fontSize: '0.85rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#e4405f';
                    e.target.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#e4405f';
                  }}
                >
                  <i className="bi bi-instagram me-1"></i>
                  Instagram
                </a>
                <a 
                  href="#" 
                  className="btn btn-outline-success btn-sm"
                  style={{
                    borderColor: '#25d366',
                    color: '#25d366',
                    fontSize: '0.85rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#25d366';
                    e.target.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#25d366';
                  }}
                >
                  <i className="bi bi-whatsapp me-1"></i>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Separador */}
      <hr 
        className="my-4"
        style={{ 
          borderColor: isDark ? '#444444' : '#dee2e6',
          borderWidth: '2px'
        }}
      />

      {/* Sección de biografía */}
      <div className="mb-4">
        <h5 
          className="fw-bold mb-3"
          style={{ color: isDark ? '#ffffff' : '#212529' }}
        >
          <i className="bi bi-journal-text me-2 text-warning"></i>
          Biografía
        </h5>
        <div 
          className="p-3 rounded"
          style={{
            backgroundColor: isDark ? 'rgba(42, 42, 42, 0.5)' : 'rgba(248, 249, 250, 0.8)',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`
          }}
        >
          <p 
            className="mb-3"
            style={{ 
              color: isDark ? '#cccccc' : '#495057',
              fontSize: '1rem',
              lineHeight: '1.7'
            }}
          >
            ¡Hola! Soy MAMBA, un artista digital apasionado por crear historias visuales que conecten con las emociones. 
            Desde que era pequeño, siempre me fascinó el mundo del arte y la narrativa gráfica.
          </p>
          <p 
            className="mb-3"
            style={{ 
              color: isDark ? '#cccccc' : '#495057',
              fontSize: '1rem',
              lineHeight: '1.7'
            }}
          >
            Mi trabajo se centra en explorar temas profundos a través de personajes complejos y situaciones 
            que invitan a la reflexión. Me encanta experimentar con diferentes estilos y técnicas para 
            crear experiencias visuales únicas.
          </p>
          <p 
            className="mb-0"
            style={{ 
              color: isDark ? '#cccccc' : '#495057',
              fontSize: '1rem',
              lineHeight: '1.7'
            }}
          >
            Cuando no estoy dibujando, disfruto de la música, los videojuegos y explorar nuevas culturas. 
            ¡Siempre estoy abierto a nuevas colaboraciones y proyectos creativos!
          </p>
        </div>
      </div>

      {/* Estadísticas adicionales */}
      <div className="row text-center">
        <div className="col-6 col-md-3 mb-3">
          <div 
            className="p-3 rounded"
            style={{
              backgroundColor: isDark ? '#2a2a2a' : '#f8f9fa',
              border: `1px solid ${isDark ? '#444444' : '#e9ecef'}`
            }}
          >
            <div 
              className="fw-bold"
              style={{ 
                fontSize: '1.5rem',
                color: '#d32f2f'
              }}
            >
              50+
            </div>
            <small style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}>
              Obras publicadas
            </small>
          </div>
        </div>
        <div className="col-6 col-md-3 mb-3">
          <div 
            className="p-3 rounded"
            style={{
              backgroundColor: isDark ? '#2a2a2a' : '#f8f9fa',
              border: `1px solid ${isDark ? '#444444' : '#e9ecef'}`
            }}
          >
            <div 
              className="fw-bold"
              style={{ 
                fontSize: '1.5rem',
                color: '#d32f2f'
              }}
            >
              2.5K
            </div>
            <small style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}>
              Seguidores
            </small>
          </div>
        </div>
        <div className="col-6 col-md-3 mb-3">
          <div 
            className="p-3 rounded"
            style={{
              backgroundColor: isDark ? '#2a2a2a' : '#f8f9fa',
              border: `1px solid ${isDark ? '#444444' : '#e9ecef'}`
            }}
          >
            <div 
              className="fw-bold"
              style={{ 
                fontSize: '1.5rem',
                color: '#d32f2f'
              }}
            >
              15K
            </div>
            <small style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}>
              Likes totales
            </small>
          </div>
        </div>
        <div className="col-6 col-md-3 mb-3">
          <div 
            className="p-3 rounded"
            style={{
              backgroundColor: isDark ? '#2a2a2a' : '#f8f9fa',
              border: `1px solid ${isDark ? '#444444' : '#e9ecef'}`
            }}
          >
            <div 
              className="fw-bold"
              style={{ 
                fontSize: '1.5rem',
                color: '#d32f2f'
              }}
            >
              4.2
            </div>
            <small style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}>
              Rating promedio
            </small>
          </div>
        </div>
      </div>

      {/* Separador */}
      <hr 
        className="my-4"
        style={{ 
          borderColor: isDark ? '#444444' : '#dee2e6',
          borderWidth: '2px'
        }}
      />

      {/* Sección de Acordeón con Lorem Ipsum */}
      <div className="mb-4">
        <h5 
          className="fw-bold mb-3"
          style={{ color: isDark ? '#ffffff' : '#212529' }}
        >
          <i className="bi bi-question-circle me-2 text-info"></i>
          Preguntas Frecuentes
        </h5>
        
        <div className="accordion" id="accordionExample">
          <div 
            className="accordion-item"
            style={{
              backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
              border: `1px solid ${isDark ? '#444444' : '#dee2e6'}`
            }}
          >
            <h2 className="accordion-header">
              <button 
                className="accordion-button"
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#collapseOne" 
                aria-expanded="true" 
                aria-controls="collapseOne"
                style={{
                  backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
                  color: isDark ? '#ffffff' : '#212529',
                  border: 'none'
                }}
              >
                ¿Cuál es tu proceso creativo?
              </button>
            </h2>
            <div 
              id="collapseOne" 
              className="accordion-collapse collapse show" 
              data-bs-parent="#accordionExample"
            >
              <div 
                className="accordion-body"
                style={{
                  backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa',
                  color: isDark ? '#cccccc' : '#495057'
                }}
              >
                <strong>Lorem ipsum dolor sit amet consectetur adipisicing elit.</strong> Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
            </div>
          </div>
          
          <div 
            className="accordion-item"
            style={{
              backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
              border: `1px solid ${isDark ? '#444444' : '#dee2e6'}`
            }}
          >
            <h2 className="accordion-header">
              <button 
                className="accordion-button collapsed" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#collapseTwo" 
                aria-expanded="false" 
                aria-controls="collapseTwo"
                style={{
                  backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
                  color: isDark ? '#ffffff' : '#212529',
                  border: 'none'
                }}
              >
                ¿Qué herramientas utilizas para crear?
              </button>
            </h2>
            <div 
              id="collapseTwo" 
              className="accordion-collapse collapse" 
              data-bs-parent="#accordionExample"
            >
              <div 
                className="accordion-body"
                style={{
                  backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa',
                  color: isDark ? '#cccccc' : '#495057'
                }}
              >
                <strong>Consectetur adipiscing elit pellentesque habitant morbi.</strong> Tristique senectus et netus et malesuada fames ac turpis egestas. Vel pharetra vel turpis nunc eget lorem dolor sed viverra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas maecenas pharetra convallis posuere morbi leo urna molestie at elementum eu facilisis sed odio morbi quis commodo odio.
              </div>
            </div>
          </div>
          
          <div 
            className="accordion-item"
            style={{
              backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
              border: `1px solid ${isDark ? '#444444' : '#dee2e6'}`
            }}
          >
            <h2 className="accordion-header">
              <button 
                className="accordion-button collapsed" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#collapseThree" 
                aria-expanded="false" 
                aria-controls="collapseThree"
                style={{
                  backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
                  color: isDark ? '#ffffff' : '#212529',
                  border: 'none'
                }}
              >
                ¿Aceptas comisiones personalizadas?
              </button>
            </h2>
            <div 
              id="collapseThree" 
              className="accordion-collapse collapse" 
              data-bs-parent="#accordionExample"
            >
              <div 
                className="accordion-body"
                style={{
                  backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa',
                  color: isDark ? '#cccccc' : '#495057'
                }}
              >
                <strong>Mauris blandit aliquet elit eget tincidunt nibh pulvinar.</strong> Vivamus magna justo lacinia eget consectetur sed convallis at tellus. Donec rutrum congue leo eget malesuada. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec velit neque auctor sit amet aliquam vel ullamcorper sit amet ligula curabitur arcu erat accumsan id imperdiet et porttitor at sem.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer con botón de contacto */}
      <div className="text-center mt-4">
        <button 
          className="btn btn-danger px-5 py-2"
          style={{
            background: 'linear-gradient(45deg, #d32f2f, #e53935)',
            border: 'none',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            borderRadius: '25px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 20px rgba(211, 47, 47, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          <i className="bi bi-envelope-fill me-2"></i>
          Contactar al Autor
        </button>
      </div>
    </div>
  );
};

export default AboutAuthor;
