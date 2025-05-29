import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';


//importamos imagenes de portada
import img1 from"../assets/Portadas/1000105792.png";
import img2 from"../assets/Portadas/1000111521.jpg";
import img3 from"../assets/Portadas/IMG_20250221_180604-1.png"

// Datos de ejemplo que coinciden con tu imagen
const chaptersData = [
  {
    id: 1,
    image: img1,
    number: 10,
    title: "The outsider",
    views: 450,
    price: 150,
    isLocked: false,
    isAdult: false
  },
  {
    id: 2,
    image: img2,
    number: 10,
    title: "The outsider",
    views: 1562,
    price: null,
    isLocked: true,
    isAdult: false
  },
  {
    id: 3,
    image: img3,
    number: 10,
    title: "The outsider",
    views: 600,
    price: 1500,
    isLocked: false,
    isAdult: true
  },
  {
    id: 4,
    image: "https://picsum.photos/200/160?random=4",
    number: 10,
    title: "The outsider",
    views: 2500,
    price: null,
    isLocked: false,
    isAdult: false
  },
  {
    id: 5,
    image: "https://picsum.photos/200/160?random=5",
    number: 10,
    title: "The outsider",
    views: 890,
    price: 200,
    isLocked: true,
    isAdult: false
  },
{  
    id: 6,
    image: "https://picsum.photos/200/160?random=6",
    number: 10,
    title: "The outsider",
    views: 3200,
    price: null,
    isLocked: false,
    isAdult: true
  },
  {
    id: 7,
    image: "https://picsum.photos/200/160?random=7",
    number: 10,
    title: "The outsider",
    views: 1800,
    price: 500,
    isLocked: false,
    isAdult: false
  },
  {
    id: 8,
    image: "https://picsum.photos/200/160?random=8",
    number: 10,
    title: "The outsider",
    views: 1200,
    price: null,
    isLocked: true,
    isAdult: true
  }

];

const ChapterCard = ({ chapter }) => {
  const formatPrice = (price) =>
    price >= 1000 ? `${(price / 1000).toFixed(1)}K` : price;

  return (
    <div
      className="flex-shrink-0 me-3"
      style={{ width: '200px', minWidth: '200px' }}
    >
      <div className="position-relative" style={{ borderRadius: '8px', overflow: 'hidden' }}>
        {/* Imagen de portada */}
        <img
          src={chapter.image}
          alt={chapter.title}
          className="w-100"
          style={{ height: '160px', objectFit: 'cover' }}
        />
        
        {/* Badge de precio en esquina superior izquierda */}
        {chapter.price && (
          <div
            className="position-absolute top-0 start-0 bg-warning text-dark px-2 py-1 d-flex align-items-center fw-bold"
            style={{
              fontSize: '0.85rem',
              borderTopLeftRadius: '8px',
              borderBottomRightRadius: '8px'
            }}
          >
            <i className="bi bi-coin me-1"></i>
            {formatPrice(chapter.price)}
          </div>
        )}
        
        {/* Badge +18 en esquina superior derecha */}
        {chapter.isAdult && (
          <div
            className="position-absolute top-0 end-0 bg-danger text-white px-2 py-1 fw-bold"
            style={{
              fontSize: '0.75rem',
              borderTopRightRadius: '8px',
              borderBottomLeftRadius: '8px'
            }}
          >
            +18
          </div>
        )}
        
        {/* Overlay de candado si está bloqueado */}
        {chapter.isLocked && (
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
            <i className="bi bi-lock-fill text-white" style={{ fontSize: '2.5rem' }}></i>
          </div>
        )}
        
        {/* Información en la parte inferior */}
        <div className="position-absolute bottom-0 start-0 w-100 d-flex justify-content-between align-items-end p-2">
          {/* Número de capítulo */}
          <span className="text-white fw-bold" style={{ 
            fontSize: '1.1rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)'
          }}>
            # {chapter.number}
          </span>
          
          {/* Vistas */}
          <span className="text-white d-flex align-items-center" style={{ 
            fontSize: '0.9rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)'
          }}>
            <i className="bi bi-eye me-1"></i>
            {chapter.views}
          </span>
        </div>
      </div>
      
      {/* Título debajo de la imagen */}
      <div className="mt-2">
        <p className="mb-0 fw-bold text-truncate" style={{ fontSize: '0.9rem' }}>
          {chapter.title}
        </p>
      </div>
    </div>
  );
};

const SpecialCaps = () => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkArrowsVisibility = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    checkArrowsVisibility();
    window.addEventListener('resize', checkArrowsVisibility);
    return () => window.removeEventListener('resize', checkArrowsVisibility);
  }, []);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -220, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 220, behavior: 'smooth' });
  };

  return (
    <div className="container my-5">
      {/* Título centrado */}
      <h2 className="text-center fw-bold mb-4">Capítulos especiales</h2>
      
      <div className="position-relative">
        {/* Flecha izquierda */}
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="position-absolute start-0 top-50 translate-middle-y btn btn-danger rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: '40px',
              height: '40px',
              zIndex: 2,
              left: '-20px',
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            <i className="bi bi-chevron-left text-white fw-bold"></i>
          </button>
        )}
        
        {/* Flecha derecha */}
        {showRightArrow && (
          <button
            onClick={scrollRight}
            className="position-absolute end-0 top-50 translate-middle-y btn btn-danger rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: '40px',
              height: '40px',
              zIndex: 2,
              right: '-20px',
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            <i className="bi bi-chevron-right text-white fw-bold"></i>
          </button>
        )}
        
        {/* Carrusel de capítulos */}
        <div
          ref={scrollContainerRef}
          className="d-flex overflow-auto pb-3"
          onScroll={checkArrowsVisibility}
          style={{
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {chaptersData.map((chapter) => (
            <ChapterCard key={chapter.id} chapter={chapter} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialCaps;
