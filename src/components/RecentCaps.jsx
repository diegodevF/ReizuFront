import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

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
    isAdult: true,
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
];

const ChapterCard = ({ chapter }) => (
  <div className="card flex-shrink-0 border-0 shadow-sm me-3" style={{ width: '200px', minWidth: '200px' }}>
    <div className="card-body p-2">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <small className="text-muted">
          <i className="bi bi-eye me-1"></i>{chapter.views}
        </small>
        {chapter.isAdult && (
          <span className="badge bg-danger">+18</span>
        )}
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

      <p className="mb-0 small text-muted text-truncate">{chapter.series}</p>
      <h6 className="mb-0 text-truncate">{chapter.title}</h6>
    </div>
  </div>
);

const RecentCaps = () => {
  const scrollContainerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftButton(container.scrollLeft > 0);
      setShowRightButton(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
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
    <div className="container my-5 mx-auto " style={{ width: '1200px' }}>
      <h5 className="fw-bold mb-3">Capítulos recientes</h5>

      {showLeftButton && (
        <button
          onClick={scrollLeft}
          className="btn btn-light btn-sm rounded-circle shadow position-absolute"
          style={{ left: '0.5rem', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
      )}

      {showRightButton && (
        <button
          onClick={scrollRight}
          className="btn btn-light btn-sm rounded-circle shadow position-absolute"
          style={{ right: '0.5rem', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      )}

      <div
        ref={scrollContainerRef}
        className="d-flex overflow-auto px-2 pb-3"
        onScroll={handleScroll}
        style={{ scrollBehavior: 'smooth' }}
      >
        {chapters.map((chapter) => (
          <ChapterCard key={chapter.id} chapter={chapter} />
        ))}
      </div>

      <div className="d-flex justify-content-center mt-3 gap-2">
        {Array.from({ length: Math.ceil(chapters.length / 3) }).map((_, index) => (
          <div
            key={index}
            className={`rounded-pill ${index === 0 ? 'bg-primary' : 'bg-secondary'}`}
            style={{ height: '4px', width: '32px' }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default RecentCaps;
