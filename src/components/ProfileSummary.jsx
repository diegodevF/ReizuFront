import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfileSummary = ({ authorData }) => {
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
      className="rounded p-4"
      style={{
        backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
        borderColor: isDark ? '#333333' : '#dee2e6',
        boxShadow: isDark ? '0 2px 10px rgba(0,0,0,0.3)' : '0 2px 10px rgba(0,0,0,0.1)',
        border: `1px solid ${isDark ? '#333333' : '#dee2e6'}`
      }}
    >
      <div className="text-center mb-3">
        <div
          className="rounded-circle mx-auto mb-3"
          style={{
            width: '80px',
            height: '80px',
            backgroundColor: isDark ? '#2a2a2a' : '#f8f9fa',
            border: '2px solid #d32f2f',
            backgroundImage: authorData?.avatar ? `url(${authorData.avatar})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <h6 
          className="fw-bold mb-1"
          style={{ color: isDark ? '#ffffff' : '#212529' }}
        >
          {authorData?.name || 'MAMBA'}
        </h6>
        
        <small 
          className="text-muted"
          style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}
        >
          @{authorData?.username || 'mamba_artist'}
        </small>
      </div>

      <div className="row text-center">
        <div className="col-4">
          <div 
            className="fw-bold"
            style={{ 
              color: '#d32f2f',
              fontSize: '1.2rem'
            }}
          >
            {authorData?.comicsCount || '12'}
          </div>
          <small 
            style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}
          >
            Cómics
          </small>
        </div>
        
        <div className="col-4">
          <div 
            className="fw-bold"
            style={{ 
              color: '#d32f2f',
              fontSize: '1.2rem'
            }}
          >
            {authorData?.followersCount || '1.2K'}
          </div>
          <small 
            style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}
          >
            Seguidores
          </small>
        </div>
        
        <div className="col-4">
          <div 
            className="fw-bold"
            style={{ 
              color: '#d32f2f',
              fontSize: '1.2rem'
            }}
          >
            {authorData?.likesCount || '8.5K'}
          </div>
          <small 
            style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}
          >
            Likes
          </small>
        </div>
      </div>

      <hr 
        className="my-3"
        style={{ borderColor: isDark ? '#333333' : '#dee2e6' }}
      />

      <div className="d-grid">
        <button 
          className="btn btn-danger mb-2"
          style={{
            background: 'linear-gradient(45deg, #d32f2f, #e53935)',
            border: 'none',
            fontSize: '0.9rem'
          }}
        >
          <i className="bi bi-heart-fill me-2"></i>
          Seguir
        </button>
        
        <button 
          className="btn btn-outline-secondary"
          style={{
            fontSize: '0.9rem',
            borderColor: isDark ? '#555555' : '#6c757d',
            color: isDark ? '#8a8a8a' : '#6c757d'
          }}
        >
          <i className="bi bi-envelope me-2"></i>
          Mensaje
        </button>
      </div>
    </div>
  );
};

export default ProfileSummary;
