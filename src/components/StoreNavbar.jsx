import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const StoreNavbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav 
      className="navbar navbar-expand-lg py-3"
      style={{ 
        backgroundColor: 'var(--bs-gray-800)',
        borderBottom: '1px solid var(--bs-border-color-translucent)'
      }}
    >
      <div className="container" style={{ maxWidth: '1300px' }}>
        
        {/* Botón hamburguesa para móviles */}
        <button 
          className="navbar-toggler border-0 ms-auto" 
          type="button" 
          onClick={toggleCollapse}
          style={{ color: 'var(--bs-light)' }}
        >
          <i className={`bi ${isCollapsed ? 'bi-list' : 'bi-x'} fs-4`}></i>
        </button>

        {/* Menú colapsable */}
        <div className={`navbar-collapse ${isCollapsed ? 'collapse' : 'show'}`}>
          <div className="navbar-nav mx-auto d-flex flex-column flex-lg-row gap-2 gap-lg-4 mt-3 mt-lg-0">
            
            {/* Inicio */}
            <Link 
              to="/" 
              className="nav-link fw-medium px-3 py-2 rounded position-relative text-center"
              style={{ 
                fontSize: '1.1rem',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                borderBottom: '2px solid #dc3545',
                color: 'var(--bs-light)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(220,53,69,0.1)';
                e.target.style.color = '#dc3545';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'var(--bs-light)';
              }}
              onClick={() => setIsCollapsed(true)}
            >
              Inicio
            </Link>

            {/* Artículos Personalizados */}
            <Link 
              to="/articulos-personalizados" 
              className="nav-link fw-medium px-3 py-2 rounded text-center"
              style={{ 
                fontSize: '1.1rem',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                color: 'var(--bs-light)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(220,53,69,0.1)';
                e.target.style.color = '#dc3545';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'var(--bs-light)';
              }}
              onClick={() => setIsCollapsed(true)}
            >
              Artículos Personalizados
            </Link>

            {/* Comisiones */}
            <Link 
              to="/comisiones" 
              className="nav-link fw-medium px-3 py-2 rounded text-center"
              style={{ 
                fontSize: '1.1rem',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                color: 'var(--bs-light)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(220,53,69,0.1)';
                e.target.style.color = '#dc3545';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'var(--bs-light)';
              }}
              onClick={() => setIsCollapsed(true)}
            >
              Comisiones
            </Link>

            {/* Servicios */}
            <Link 
              to="/servicios" 
              className="nav-link fw-medium px-3 py-2 rounded text-center"
              style={{ 
                fontSize: '1.1rem',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                color: 'var(--bs-light)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(220,53,69,0.1)';
                e.target.style.color = '#dc3545';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'var(--bs-light)';
              }}
              onClick={() => setIsCollapsed(true)}
            >
              Servicios
            </Link>

            {/* Capítulos especiales */}
            <Link 
              to="/capitulos-especiales" 
              className="nav-link fw-medium px-3 py-2 rounded text-center"
              style={{ 
                fontSize: '1.1rem',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                color: 'var(--bs-light)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(220,53,69,0.1)';
                e.target.style.color = '#dc3545';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'var(--bs-light)';
              }}
              onClick={() => setIsCollapsed(true)}
            >
              Capítulos especiales
            </Link>

          </div>
        </div>
      </div>

      {/* Estilos responsive adicionales */}
      <style>
        {`
          @media (max-width: 991.98px) {
            .navbar-nav {
              background: var(--bs-gray-800);
              border-radius: 8px;
              padding: 1rem;
              margin-top: 1rem;
              box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }
            .nav-link {
              margin-bottom: 0.5rem;
              border: 1px solid var(--bs-border-color-translucent) !important;
              border-bottom: 1px solid var(--bs-border-color-translucent) !important;
            }
            .nav-link:hover {
              border-color: #dc3545 !important;
            }
          }
        `}
      </style>
    </nav>
  );
};

export default StoreNavbar;
