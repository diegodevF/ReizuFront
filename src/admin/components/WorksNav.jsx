import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const WorksNav = () => {
  const tabs = [
    { id: 'capitulos', label: 'Capítulos', path: '/Admin/ViewCaps' },
    { id: 'resenas',  label: 'Reseñas',   path: '/works/reviews' },
    { id: 'me-gusta', label: 'Me Gusta',   path: '/works/likes' },
    { id: 'favoritos',label: 'Favoritos',  path: '/works/favorites' },
    { id: 'estadisticas', label: 'Estadísticas', path: '/works/stats' },
  ];

  const [theme, setTheme] = useState('light');
  const getTheme = () =>
    document.documentElement.getAttribute('data-bs-theme') || 'light';

  useEffect(() => {
    setTheme(getTheme());
    const obs = new MutationObserver(() => setTheme(getTheme()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-bs-theme'] });
    return () => obs.disconnect();
  }, []);

  const isDark = theme === 'dark';

  return (
    <nav
      className="d-flex justify-content-center"
      style={{
        backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
        borderBottom: `1px solid ${isDark ? '#333' : '#dee2e6'}`,
        padding: '0.5rem'
      }}
    >
      {tabs.map(tab => (
        <NavLink
          key={tab.id}
          to={tab.path}
          className="text-center px-3 py-2 mx-1 text-decoration-none"
          style={({ isActive }) => ({
            color: isActive
              ? isDark ? '#ffffff' : '#d32f2f'
              : isDark ? '#888' : '#6c757d',
            borderBottom: isActive
              ? `3px solid ${isDark ? '#d32f2f' : '#d32f2f'}`
              : '3px solid transparent',
            fontWeight: isActive ? '600' : '500',
            transition: 'color 0.2s, border-bottom 0.2s'
          })}
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default WorksNav;
