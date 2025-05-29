import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Simula imágenes de portada (puedes reemplazar por tus rutas reales)
const images = [
  "https://i.imgur.com/8Km9tLL.jpg",
  "https://i.imgur.com/0y0y0y0.png",
  "https://i.imgur.com/2nCt3Sbl.jpg",
  "https://i.imgur.com/0y0y0y0.png",
  "https://i.imgur.com/2nCt3Sbl.jpg",
  "https://i.imgur.com/8Km9tLL.jpg"
];

const chapters = [
  {
    id: 1,
    title: 'The outsider',
    series: 'The outsider',
    views: 450,
    number: 10,
    price: null,
    isLocked: false,
    isAdult: false,
    image: images[0],
  },
  {
    id: 2,
    title: 'The outsider',
    series: 'The outsider',
    views: 1562,
    number: 10,
    price: 150,
    isLocked: true,
    isAdult: false,
    image: images[1],
  },
  {
    id: 3,
    title: 'The outsider',
    series: 'The outsider',
    views: 600,
    number: 10,
    price: 1500,
    isLocked: true,
    isAdult: true,
    image: images[2],
  },
  {
    id: 4,
    title: 'The outsider',
    series: 'The outsider',
    views: 2500,
    number: 10,
    price: null,
    isLocked: false,
    isAdult: false,
    image: images[3],
  },
];

const ChapterCard = ({ chapter }) => (
  <div
    className="card border-0 shadow-sm flex-shrink-0 mx-2"
    style={{
      width: 200,
      minWidth: 200,
      background: "var(--bs-card-bg)",
      color: "var(--bs-body-color)",
      borderRadius: "0.9rem",
      overflow: "hidden",
      position: "relative"
    }}
  >
    {/* Imagen de portada */}
    <div className="position-relative" style={{ width: "100%", height: 120 }}>
      <img
        src={chapter.image}
        alt={chapter.title}
        className="w-100 h-100"
        style={{ objectFit: "cover", borderRadius: "0.9rem 0.9rem 0 0" }}
      />
      {/* Badge de precio */}
      {chapter.price && (
        <span
          className="position-absolute top-0 start-0 badge bg-danger d-flex align-items-center px-2 py-1"
          style={{
            fontSize: "0.95rem",
            borderTopLeftRadius: "0.7rem",
            borderBottomRightRadius: "0.7rem",
            left: 0,
            top: 0,
            zIndex: 2
          }}
        >
          <i className="bi bi-coin text-warning me-1"></i>
          {chapter.price >= 1000
            ? `${(chapter.price / 1000).toFixed(1)}K`
            : chapter.price}
        </span>
      )}
      {/* Badge +18 */}
      {chapter.isAdult && (
        <span
          className="position-absolute top-0 end-0 badge bg-danger px-2 py-1"
          style={{
            fontSize: "0.85rem",
            right: 0,
            top: 0,
            borderTopRightRadius: "0.7rem",
            borderBottomLeftRadius: "0.7rem",
            zIndex: 2
          }}
        >
          +18
        </span>
      )}
      {/* Overlay de candado */}
      {chapter.isLocked && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50"
          style={{ zIndex: 2 }}>
          <i className="bi bi-lock-fill text-danger fs-2"></i>
        </div>
      )}
      {/* Fondo degradado negro abajo */}
      <div className="position-absolute bottom-0 start-0 w-100 px-2 py-2"
        style={{
          background: "linear-gradient(0deg, rgba(0,0,0,0.92) 70%, rgba(0,0,0,0.01) 100%)",
          borderBottomLeftRadius: "0.9rem",
          borderBottomRightRadius: "0.9rem",
          zIndex: 1
        }}
      >
        <div className="d-flex justify-content-between align-items-center text-white mb-1" style={{ fontSize: "1.05rem" }}>
          <span>
            <b>#{chapter.number}</b>
            {chapter.isLocked && <i className="bi bi-lock-fill text-danger ms-1"></i>}
          </span>
          <span>
            <i className="bi bi-eye me-1"></i>
            {chapter.views}
          </span>
        </div>
      </div>
    </div>
    {/* Info inferior */}
    <div className="px-2 pt-2 pb-1 bg-transparent">
      <div className="small text-truncate">{chapter.series}</div>
      <div className="fw-bold text-truncate" style={{ fontSize: "1.08rem" }}>{chapter.title}</div>
    </div>
  </div>
);

const SpecialCaps = () => {
  const scrollContainerRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const handleScroll = () => {
    const c = scrollContainerRef.current;
    if (c) {
      setShowLeft(c.scrollLeft > 0);
      setShowRight(c.scrollLeft < c.scrollWidth - c.clientWidth - 10);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -220, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 220, behavior: 'smooth' });
  };

  return (
    <div className="container my-5" style={{ maxWidth: '1200px' }}>
      <h5 className="fw-bold mb-3 text-center">Capítulos especiales</h5>

      <div className="position-relative">
        {/* Botón izquierdo */}
        {showLeft && (
          <button
            onClick={scrollLeft}
            className="btn btn-light btn-sm rounded-circle shadow position-absolute"
            style={{
              left: '-28px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
            }}
          >
            <i className="bi bi-chevron-left text-danger fs-3"></i>
          </button>
        )}

        {/* Botón derecho */}
        {showRight && (
          <button
            onClick={scrollRight}
            className="btn btn-light btn-sm rounded-circle shadow position-absolute"
            style={{
              right: '-28px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
            }}
          >
            <i className="bi bi-chevron-right text-danger fs-3"></i>
          </button>
        )}

        {/* Carrusel */}
        <div
          ref={scrollContainerRef}
          className="d-flex flex-row flex-nowrap overflow-auto px-2 pb-3"
          onScroll={handleScroll}
          style={{ scrollBehavior: 'smooth' }}
        >
          {chapters.map((chap, idx) => (
            <ChapterCard key={`${chap.id}-${idx}`} chapter={chap} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialCaps;
