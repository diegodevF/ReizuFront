import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Función para obtener el tema actual del sistema/Bootstrap
const getTheme = () => {
  if (typeof document !== "undefined") {
    return document.documentElement.getAttribute("data-bs-theme") || "light";
  }
  return "light";
};

const ComicRating = ({ onSubmit }) => {
  const [ratings, setRatings] = useState({
    originalidad: 0,
    tecnica: 0,
    dibujo: 0,
    historia: 0
  });
  const [comment, setComment] = useState('');
  const [hoverRatings, setHoverRatings] = useState({
    originalidad: 0,
    tecnica: 0,
    dibujo: 0,
    historia: 0
  });
  const [theme, setTheme] = useState(getTheme()); // Estado del tema interno

  // Detectar cambios en el tema de Bootstrap
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

  // Variable para determinar si está en modo oscuro
  const isDarkMode = theme === "dark";

  // Categorías con sus iconos y nombres
  const categories = [
    { key: 'originalidad', name: 'ORIGINALIDAD', icon: 'bi-lightbulb' },
    { key: 'tecnica', name: 'TÉCNICA', icon: 'bi-tools' },
    { key: 'dibujo', name: 'DIBUJO', icon: 'bi-palette' },
    { key: 'historia', name: 'HISTORIA', icon: 'bi-journal-text' }
  ];

  // Manejar click en estrella
  const handleStarClick = (category, rating) => {
    setRatings(prev => ({
      ...prev,
      [category]: rating
    }));
  };

  // Manejar hover en estrella
  const handleStarHover = (category, rating) => {
    setHoverRatings(prev => ({
      ...prev,
      [category]: rating
    }));
  };

  // Resetear hover
  const handleStarLeave = (category) => {
    setHoverRatings(prev => ({
      ...prev,
      [category]: 0
    }));
  };

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      ratings,
      comment,
      timestamp: new Date().toISOString(),
      totalScore: Object.values(ratings).reduce((sum, rating) => sum + rating, 0)
    };
    
    if (onSubmit) {
      onSubmit(reviewData);
    }
    
    console.log('Review enviada:', reviewData);
    
    // Resetear formulario
    setRatings({
      originalidad: 0,
      tecnica: 0,
      dibujo: 0,
      historia: 0
    });
    setComment('');
  };

  // Renderizar estrellas para una categoría
  const renderStars = (category) => {
    const currentRating = ratings[category];
    const hoverRating = hoverRatings[category];
    const displayRating = hoverRating || currentRating;

    return (
      <div className="stars-container" style={{ 
        display: 'flex', 
        gap: '6px', 
        justifyContent: 'center' 
      }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="star-button"
            onClick={() => handleStarClick(category, star)}
            onMouseEnter={() => handleStarHover(category, star)}
            onMouseLeave={() => handleStarLeave(category)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '24px',
              padding: '4px',
              color: star <= displayRating ? '#dc3545' : (isDarkMode ? '#555' : '#e9ecef'),
              transition: 'color 0.2s ease'
            }}
            title={`${star} estrella${star > 1 ? 's' : ''}`}
          >
            <i className="bi bi-star-fill"></i>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div style={{
      background: isDarkMode ? 'rgba(43,48,53,0.8)' : '#fff',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: isDarkMode 
        ? '0 4px 20px rgba(0,0,0,0.3)' 
        : '0 4px 20px rgba(0,0,0,0.1)',
      maxWidth: '1200px', // Más ancho
      width: '100%',
      margin: '0 auto',
      fontFamily: 'system-ui, sans-serif',
      transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
    }}>
      <form onSubmit={handleSubmit}>
        {/* Grid de categorías - Más espacioso */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)', // 4 columnas fijas para más ancho
          gap: '32px', // Más espacio entre elementos
          marginBottom: '32px'
        }}>
          {categories.map((category) => (
            <div key={category.key} style={{
              textAlign: 'center',
              padding: '24px 16px', // Más padding vertical
              border: `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}`,
              borderRadius: '12px',
              background: isDarkMode ? '#343a40' : '#f8f9fa',
              transition: 'all 0.3s ease'
            }}>
              {/* Icono y nombre */}
              <div style={{ marginBottom: '16px' }}>
                <i 
                  className={category.icon} 
                  style={{ 
                    fontSize: '32px', // Icono más grande
                    color: isDarkMode ? '#fff' : '#495057',
                    marginBottom: '12px',
                    display: 'block'
                  }}
                ></i>
                <div style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  color: isDarkMode ? '#fff' : '#495057',
                  letterSpacing: '0.5px'
                }}>
                  {category.name}
                </div>
              </div>
              
              {/* Estrellas */}
              {renderStars(category.key)}
              
              {/* Puntuación actual */}
              <div style={{
                marginTop: '12px',
                fontSize: '14px', // Texto más grande
                color: isDarkMode ? '#ccc' : '#6c757d',
                fontWeight: '600'
              }}>
                {ratings[category.key]}/5
              </div>
            </div>
          ))}
        </div>

        {/* Área de comentarios - Más ancha */}
        <div style={{ marginBottom: '24px' }}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Dejar un Comentario..."
            rows={5} // Más filas
            style={{
              width: '100%',
              padding: '16px 20px', // Más padding
              border: `2px solid ${isDarkMode ? '#404040' : '#e9ecef'}`,
              borderRadius: '12px',
              fontSize: '15px', // Texto más grande
              fontFamily: 'inherit',
              resize: 'vertical',
              background: isDarkMode ? '#343a40' : '#fff',
              color: isDarkMode ? '#fff' : '#495057',
              lineHeight: '1.6',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#dc3545'}
            onBlur={(e) => e.target.style.borderColor = isDarkMode ? '#404040' : '#e9ecef'}
          />
        </div>

        {/* Información adicional - Más espaciosa */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          padding: '16px 20px', // Más padding
          background: isDarkMode ? '#343a40' : '#f8f9fa',
          borderRadius: '8px',
          fontSize: '14px', // Texto más grande
          color: isDarkMode ? '#ccc' : '#6c757d',
          border: `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}`,
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span>
              <i className="bi bi-file-text me-2"></i>
              {comment.length} caracteres
            </span>
            <span>
              <i className="bi bi-star me-2"></i>
              Puntuación total: {Object.values(ratings).reduce((sum, rating) => sum + rating, 0)}/20
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={() => {
                setRatings({ originalidad: 0, tecnica: 0, dibujo: 0, historia: 0 });
                setComment('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: isDarkMode ? '#ccc' : '#6c757d',
                cursor: 'pointer',
                fontSize: '18px',
                padding: '6px'
              }}
              title="Limpiar formulario"
            >
              <i className="bi bi-arrow-clockwise"></i>
            </button>
          </div>
        </div>

        {/* Botón de envío - Más grande */}
        <div style={{ textAlign: 'right' }}>
          <button
            type="submit"
            disabled={Object.values(ratings).every(rating => rating === 0) && !comment.trim()}
            style={{
              background: Object.values(ratings).some(rating => rating > 0) || comment.trim() 
                ? 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)' 
                : (isDarkMode ? '#555' : '#6c757d'),
              color: '#fff',
              border: 'none',
              borderRadius: '25px',
              padding: '14px 32px', // Botón más grande
              fontSize: '16px', // Texto más grande
              fontWeight: '600',
              cursor: Object.values(ratings).some(rating => rating > 0) || comment.trim() ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(220, 53, 69, 0.3)',
              marginLeft: 'auto'
            }}
            onMouseOver={(e) => {
              if (!e.target.disabled) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 16px rgba(220, 53, 69, 0.4)';
              }
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(220, 53, 69, 0.3)';
            }}
          >
            <i className="bi bi-send"></i>
            Enviar
          </button>
        </div>
      </form>

      {/* Mostrar resumen si hay puntuaciones - Mejorado */}
      {Object.values(ratings).some(rating => rating > 0) && (
        <div style={{
          marginTop: '24px',
          padding: '16px 20px',
          background: isDarkMode 
            ? 'linear-gradient(135deg, rgba(220, 53, 69, 0.1) 0%, rgba(200, 35, 51, 0.1) 100%)'
            : 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)',
          borderRadius: '12px',
          borderLeft: '4px solid #dc3545',
          border: `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}`,
          transition: 'all 0.3s ease'
        }}>
          <div style={{ 
            fontSize: '14px', 
            color: isDarkMode ? '#fff' : '#495057', 
            fontWeight: '600',
            marginBottom: '12px'
          }}>
            <i className="bi bi-info-circle me-2"></i>
            Vista previa de tu puntuación:
          </div>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '12px',
            fontSize: '13px'
          }}>
            {categories.map((category) => (
              ratings[category.key] > 0 && (
                <span key={category.key} style={{
                  background: isDarkMode ? '#404040' : '#fff',
                  color: isDarkMode ? '#fff' : '#495057',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  border: `1px solid ${isDarkMode ? '#555' : '#e9ecef'}`
                }}>
                  {category.name}: {ratings[category.key]}/5 ⭐
                </span>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComicRating;
