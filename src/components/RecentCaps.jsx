import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../variables.css'; // Assuming you have a CSS file for variables

const chapters = [
  {
    id: 1,
    title: 'AUREUS GRAPHERS',
    series: 'The outsider',
    views: '10.567',
    number: 10,
    price: null,
    isLocked: false,
    isAdult: false,
  },
  {
    id: 2,
    title: 'MI COMPAÑERA DE OFICINA ES UNA OVEJA',
    series: 'The outsider',
    views: '10.567',
    number: 10,
    price: 150,
    isLocked: true,
    isAdult: false,
  },
  {
    id: 3,
    title: 'ZAMU',
    series: 'The outsider',
    views: '10.567',
    number: 10,
    price: 1500,
    isLocked: true,
    isAdult: true,
  },
  {
    id: 4,
    title: 'HEART CHAIN',
    series: 'The outsider',
    views: '10.567',
    number: 10,
    price: null,
    isLocked: false,
    isAdult: false,
  },
  {
    id: 5,
    title: 'ZAMU',
    series: 'The outsider',
    views: '10.567',
    number: 10,
    price: 1500,
    isLocked: true,
    isAdult: false,
  },
  {
    id: 6,
    title: 'OTRO CAPÍTULO',
    series: 'The outsider',
    views: '8.245',
    number: 11,
    price: 200,
    isLocked: false,
    isAdult: false,
  },
];

const ChapterCard = ({ chapter }) => (
  <>
  <Link to={"/ComicInfo"}>
    <div
    className="card flex-shrink-0 border-0 shadow-sm me-3"
    style={{ width: '200px', minWidth: '200px' }}
  >
    <div className="card-body p-2 justify-content-start">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <small className="text-muted">
          <i className="bi bi-eye me-1"></i>
          {chapter.views}
        </small>
        {chapter.isAdult && <span className="badge bg-danger">+18</span>}
      </div>

      <div className="position-relative mb-2">
        <div className="bg-light rounded" style={{ height: '100px' }}></div>
        {chapter.isLocked && (
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 rounded">
            <i className="bi bi-lock-fill text-white fs-3"></i>
          </div>
        )}
      </div>

      <div className="d-flex justify-content-between align-items-center small text-muted mb-1">
        <span># {chapter.number}</span>
        {chapter.isLocked ? (
          <span>
            <i className="bi bi-lock-fill text-danger me-1"></i>
            {chapter.price && (
              <>
                <i className="bi bi-coin text-warning me-1"></i>
                {chapter.price >= 1000
                  ? `${(chapter.price / 1000).toFixed(1)}K`
                  : chapter.price}
              </>
            )}
          </span>
        ) : chapter.price ? (
          <span>
            <i className="bi bi-coin text-warning me-1"></i>
            {chapter.price}
          </span>
        ) : null}
      </div>

      <p className="mb-0 small text-truncate">{chapter.series}</p>
      <h6 className="mb-0 text-truncate">{chapter.title}</h6>
    </div>
  </div>
  </Link>
  </>
);

const RecentCaps = () => {
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
    scrollContainerRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <div className="container my-5" style={{ maxWidth: '1235px' }}>
      <h5 className="fw-bold mb-3">Capítulos recientes</h5>

      <div className="position-relative">
        {/* Botón izquierdo */}
        {showLeft && (
          <button
            onClick={scrollLeft}
            className="btn btn-light btn-sm rounded-circle shadow position-absolute"
            style={{
              left: '0',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
            }}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
        )}

        {/* Botón derecho */}
        {showRight && (
          <button
            onClick={scrollRight}
            className="btn btn-light btn-sm rounded-circle shadow position-absolute"
            style={{
              right: '0',
              top: '50%',
              transform: 'translate(50%, -50%)',
              zIndex: 2,
            }}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        )}

        {/* Carrusel */}
        <div
          ref={scrollContainerRef}
          className="d-flex overflow-auto pb-3"
          onScroll={handleScroll}
          style={{ scrollBehavior: 'smooth' }}
        >
          {chapters.map((chap, idx) => (
            <ChapterCard key={`${chap.id}-${idx}`} chapter={chap} />
          ))}
        </div>
      </div>

      {/* Indicadores */}
      <div className="d-flex justify-content-center mt-3 gap-2">
        {Array.from({ length: Math.ceil(chapters.length / 3) }).map((_, i) => (
          <div
            key={i}
            className={`rounded-pill ${i === 0 ? 'bg-primary' : 'bg-secondary'}`}
            style={{ height: '4px', width: '32px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentCaps;
