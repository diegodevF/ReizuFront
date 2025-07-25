import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const StoreNavbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();

  // Define tus rutas aquí para que sea fácil de mantener
  const navItems = [
    { path: '/Shop', label: 'Inicio' },
    { path: '/Shop/PersonalizeSection', label: 'Artículos Personalizados' },
    { path: '/Shop/CommissionPage', label: 'Comisiones' },
    { path: '/Shop/ExchangePage', label: 'Servicios' },
    { path: '/Shop/SpecialChaptersPage', label: 'Capítulos especiales' },
    { path: '/Shop/reizu', label: 'Reizu Coins' }
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav 
      className="navbar navbar-expand-lg py-3 sticky-top"
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
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="nav-link fw-medium px-3 py-2 rounded text-center position-relative"
                  style={{
                    fontSize: '1.1rem',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    color: isActive ? 'var(--bs-danger)' : 'var(--bs-light)',
                    borderBottom: isActive ? '2px solid var(--bs-danger)' : 'none',
                    backgroundColor: isActive ? 'rgba(220,53,69,0.08)' : 'transparent'
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.target.style.backgroundColor = 'rgba(220,53,69,0.1)';
                      e.target.style.color = '#dc3545';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = 'var(--bs-light)';
                    }
                  }}
                  onClick={() => setIsCollapsed(true)}
                >
                  {item.label}
                </Link>
              );
            })}
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
