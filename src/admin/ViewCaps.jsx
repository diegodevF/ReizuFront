import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/Sidebar';
import WorksNav from './components/WorksNav';
import WorkInfo from './components/WorkInfo'; // componente unificado

// imágenes
import bannerImg from '../assets/Portadas/IMG_20250221_180604-1.png';
import coverImg  from '../assets/Portadas/IMG_20250221_180604-1.png';

const ViewCaps = ({ onEdit }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState('light');
  const isDark = theme === 'dark';

  // detectar tema
  const getTheme = () =>
    document?.documentElement.getAttribute('data-bs-theme') || 'light';

  useEffect(() => {
    setTheme(getTheme());
    const obs = new MutationObserver(() => setTheme(getTheme()));
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-bs-theme']
    });
    return () => obs.disconnect();
  }, []);

  // datos de la obra
  const workData = {
    title: 'Mi Obra Maestra',
    author: 'Reizu',
    status: 'En progreso',
    chapters: 12,
    views: 15_420,
    likes: 892,
    followers: 234,
    rating: 4.8,
    description:
      'Una historia fascinante que combina elementos de fantasía y aventura. Siguiendo las aventuras de nuestro protagonista en un mundo lleno de magia y misterio.',
    genres: ['Fantasía', 'Aventura', 'Romance'],
    lastUpdate: 'Hace 2 días'
  };

  return (
    <div className="d-flex">
      {/* overlay móvil */}
      <div
        className="d-md-none"
        style={{
          display: sidebarOpen ? 'block' : 'none',
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 1040
        }}
        onClick={() => setSidebarOpen(false)}
      />

      {/* sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* botón para abrir sidebar */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="btn btn-dark position-fixed d-md-none"
          style={{
            top: 12,
            left: 0,
            zIndex: 2000,
            borderRadius: '0 50% 50% 0',
            width: 36,
            height: 36,
            padding: 0
          }}
        >
          <i className="bi bi-chevron-right fs-5" />
        </button>
      )}

      {/* contenido */}
      <main
        className="flex-grow-1"
        style={{
          marginLeft: sidebarOpen ? 280 : 0,
          transition: 'margin-left 0.3s',
          minHeight: '100vh',
          backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa'
        }}
      >
        {/* banner + detalles unificados */}
        <WorkInfo
          bannerImg={bannerImg}
          coverImg={coverImg}
          workData={workData}
          isDark={isDark}
          onEdit={onEdit}
        />

        {/* navegación de capítulos, etc. */}
        <WorksNav />
      </main>
    </div>
  );
};

export default ViewCaps;
