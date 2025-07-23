import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AuthorNav = () => {
  const [theme, setTheme] = useState('light');
  const location = useLocation();

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

  const tabs = [
    { id: 'muro', label: 'Muro', path: `/Profile` },
    { id: 'portafolio', label: 'Portafolio', path: `/Portfolio` },
    { id: 'productos', label: 'Productos', path: `/Products` },
    { id: 'suscripciones', label: 'Suscripciones', path: `/Subscriptions` },
    { id: 'sobre-mi', label: 'Sobre mí', path: `/About` }

    // { id: 'sobre-mi', label: 'Sobre mí', path: `/author/${authorId}/about` } Ejemplo para la API
  ];

  // Determinar tab activo basado en la URL actual
  const getActiveTab = () => {
    const currentPath = location.pathname;
    const activeTab = tabs.find(tab => tab.path === currentPath);
    return activeTab ? activeTab.id : 'muro';
  };

  const activeTab = getActiveTab();

  return (
    <div 
      className="border-bottom"
      style={{
        backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
        borderColor: isDark ? '#333333' : '#dee2e6'
      }}
    >
      {/* Barra de navegación */}
      <div className="px-4 justify-content-center d-flex">
        <nav className="d-flex">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              to={tab.path}
              className="text-decoration-none"
              style={{
                color: activeTab === tab.id 
                  ? '#d32f2f' 
                  : isDark ? '#8a8a8a' : '#6c757d',
                borderBottom: activeTab === tab.id ? '2px solid #d32f2f' : '2px solid transparent',
                padding: '1rem 1.5rem',
                fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                transition: 'all 0.3s ease',
                display: 'block'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.target.style.color = '#d32f2f';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.target.style.color = isDark ? '#8a8a8a' : '#6c757d';
                }
              }}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default AuthorNav;
