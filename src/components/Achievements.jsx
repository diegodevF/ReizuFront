import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Achievements = ({ achievements = [] }) => {
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

  // Logros por defecto si no se proporcionan
  const defaultAchievements = [
    { id: 1, name: 'Artista Novato', icon: 'bi-award', earned: true, description: 'Publicó su primer cómic' },
    { id: 2, name: 'Popular', icon: 'bi-heart-fill', earned: true, description: 'Obtuvo 1K likes' },
    { id: 3, name: 'Prolífico', icon: 'bi-book', earned: true, description: 'Publicó 10 cómics' },
    { id: 4, name: 'Influencer', icon: 'bi-people-fill', earned: false, description: 'Obtén 10K seguidores' },
    { id: 5, name: 'Leyenda', icon: 'bi-star-fill', earned: false, description: 'Mantén trending por 30 días' },
    { id: 6, name: 'Mentor', icon: 'bi-mortarboard', earned: false, description: 'Ayuda a 5 artistas novatos' }
  ];

  const achievementList = achievements.length > 0 ? achievements : defaultAchievements;

  return (
    <div 
      className="rounded p-4"
      style={{
        backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
        borderColor: isDark ? '#333333' : '#dee2e6',
        boxShadow: isDark ? '0 2px 10px rgba(0,0,0,0.3)' : '0 2px 10px rgba(0,0,0,0.1)',
        border: `1px solid ${isDark ? '#333333' : '#dee2e6'}`
      }}
    >
      <h6 
        className="fw-bold mb-3"
        style={{ color: isDark ? '#ffffff' : '#212529' }}
      >
        <i className="bi bi-trophy-fill text-warning me-2"></i>
        Logros
      </h6>

      <div className="row g-3">
        {achievementList.map((achievement) => (
          <div key={achievement.id} className="col-6 col-md-4">
            <div 
              className="text-center p-2 rounded"
              style={{
                backgroundColor: isDark ? '#2a2a2a' : '#f8f9fa',
                border: `1px solid ${isDark ? '#333333' : '#e9ecef'}`,
                opacity: achievement.earned ? 1 : 0.5,
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                if (achievement.earned) {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.backgroundColor = isDark ? '#333333' : '#e9ecef';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = isDark ? '#2a2a2a' : '#f8f9fa';
              }}
              title={achievement.description}
            >
              <div
                className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: achievement.earned ? '#d32f2f' : (isDark ? '#555555' : '#dee2e6'),
                  color: achievement.earned ? '#ffffff' : (isDark ? '#8a8a8a' : '#6c757d')
                }}
              >
                <i className={`${achievement.icon}`} style={{ fontSize: '1.2rem' }}></i>
              </div>
              
              <small 
                className="fw-medium"
                style={{ 
                  color: achievement.earned 
                    ? (isDark ? '#ffffff' : '#212529')
                    : (isDark ? '#8a8a8a' : '#6c757d'),
                  fontSize: '0.75rem',
                  lineHeight: '1.2'
                }}
              >
                {achievement.name}
              </small>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 text-center">
        <small 
          style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}
        >
          {achievementList.filter(a => a.earned).length} de {achievementList.length} logros obtenidos
        </small>
      </div>
    </div>
  );
};

export default Achievements;
