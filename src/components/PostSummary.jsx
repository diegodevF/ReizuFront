import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostSummary = ({ pinnedPost, popularPosts = [] }) => {
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

  // Datos por defecto
  const defaultPinnedPost = pinnedPost || {
    id: 1,
    title: 'Mi nuevo proyecto de cómic',
    excerpt: 'Estoy trabajando en una nueva serie que combina elementos de fantasía y ciencia ficción...',
    likes: 234,
    comments: 18,
    date: '2024-01-15'
  };

  const defaultPopularPosts = popularPosts.length > 0 ? popularPosts : [
    { id: 2, title: 'Técnicas de sombreado', likes: 156, comments: 12 },
    { id: 3, title: 'Diseño de personajes', likes: 142, comments: 8 },
    { id: 4, title: 'Paletas de colores', likes: 98, comments: 15 }
  ];

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
        <i className="bi bi-pin-angle-fill text-danger me-2"></i>
        Resumen de Publicaciones
      </h6>

      {/* Publicación Fijada */}
      <div 
        className="rounded p-3 mb-3"
        style={{
          backgroundColor: isDark ? '#2a2a2a' : '#f8f9fa',
          border: `1px solid ${isDark ? '#444444' : '#e9ecef'}`
        }}
      >
        <div className="d-flex align-items-start justify-content-between mb-2">
          <small 
            className="badge"
            style={{
              backgroundColor: '#d32f2f',
              color: '#ffffff'
            }}
          >
            <i className="bi bi-pin-fill me-1"></i>
            Fijada
          </small>
          <small 
            style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}
          >
            {new Date(defaultPinnedPost.date).toLocaleDateString()}
          </small>
        </div>
        
        <h6 
          className="fw-bold mb-2"
          style={{ 
            color: isDark ? '#ffffff' : '#212529',
            fontSize: '0.95rem'
          }}
        >
          {defaultPinnedPost.title}
        </h6>
        
        <p 
          className="mb-2"
          style={{ 
            color: isDark ? '#cccccc' : '#6c757d',
            fontSize: '0.85rem',
            lineHeight: '1.4'
          }}
        >
          {defaultPinnedPost.excerpt}
        </p>
        
        <div className="d-flex align-items-center">
          <small 
            className="me-3"
            style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}
          >
            <i className="bi bi-heart-fill text-danger me-1"></i>
            {defaultPinnedPost.likes}
          </small>
          <small 
            style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}
          >
            <i className="bi bi-chat-fill me-1"></i>
            {defaultPinnedPost.comments}
          </small>
        </div>
      </div>

      {/* Publicaciones Populares */}
      <div>
        <h6 
          className="fw-bold mb-2"
          style={{ 
            color: isDark ? '#ffffff' : '#212529',
            fontSize: '0.9rem'
          }}
        >
          <i className="bi bi-fire text-warning me-2"></i>
          Populares
        </h6>
        
        {defaultPopularPosts.map((post) => (
          <div 
            key={post.id}
            className="d-flex align-items-center justify-content-between py-2"
            style={{
              borderBottom: `1px solid ${isDark ? '#333333' : '#e9ecef'}`,
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? '#2a2a2a' : '#f8f9fa';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <div className="flex-grow-1">
              <small 
                className="fw-medium"
                style={{ 
                  color: isDark ? '#ffffff' : '#212529',
                  fontSize: '0.85rem'
                }}
              >
                {post.title}
              </small>
            </div>
            
            <div className="d-flex align-items-center">
              <small 
                className="me-2"
                style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}
              >
                <i className="bi bi-heart-fill text-danger me-1"></i>
                {post.likes}
              </small>
              <small 
                style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}
              >
                <i className="bi bi-chat-fill me-1"></i>
                {post.comments}
              </small>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 text-center">
        <button 
          className="btn btn-outline-danger btn-sm"
          style={{
            borderColor: '#d32f2f',
            color: isDark ? '#e53935' : '#d32f2f',
            fontSize: '0.8rem'
          }}
        >
          Ver todas las publicaciones
        </button>
      </div>
    </div>
  );
};

export default PostSummary;
