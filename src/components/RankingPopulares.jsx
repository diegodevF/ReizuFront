import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import '../variables.css';

const rankingItems = [
  {
    id: 1,
    rank: '#01',
    title: 'AUREUS GRAPHERS',
    author: 'Suzaku',
    views: '7.19k',
    likes: '50',
    tag: 'Seri',
    tagColor: 'danger',
    specialTag: 'EX',
    score: '54'
  },
  {
    id: 2,
    rank: '#02',
    title: 'MI COMPAÑERA DE OFICINA ES UNA OVEJA',
    author: 'Suzaku',
    views: '7.19k',
    likes: '50',
    tag: 'Novela',
    tagColor: 'primary',
    specialTag: '',
    score: '03'
  },
  {
    id: 3,
    rank: '#03',
    title: 'EL DESTINO DE UNA ESTRELLA',
    author: 'Suzaku',
    views: '7.19k',
    likes: '50',
    tag: 'Oneshot',
    tagColor: 'success',
    specialTag: '',
    score: '20'
  },
  {
    id: 4,
    rank: '#04',
    title: 'EL DESTINO DE UNA ESTRELLA',
    author: 'Suzaku',
    views: '7.19k',
    likes: '50',
    tag: 'Oneshot',
    tagColor: 'success',
    specialTag: '',
    score: '20'
  },
  {
    id: 5,
    rank: '#05',
    title: 'AUREUS GRAPHERS',
    author: 'Suzaku',
    views: '7.19k',
    likes: '50',
    tag: 'Seri',
    tagColor: 'danger',
    specialTag: 'EX',
    score: '150'
  },
  {
    id: 6,
    rank: '#06',
    title: 'NUEVO COMIC',
    author: 'Suzaku',
    views: '7.19k',
    likes: '50',
    tag: 'Seri',
    tagColor: 'danger',
    specialTag: 'EX',
    score: '150'
  },
];

const ComicsMasVisitados = () => {
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
    return () => {
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      // Scroll exactamente 4 cards (289px * 4 + gaps)
      container.scrollBy({ left: -1200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      // Scroll exactamente 4 cards (289px * 4 + gaps)
      container.scrollBy({ left: 1200, behavior: 'smooth' });
    }
  };

  return (
    <div className="container my-4 position-relative p-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">Ranking: Más Populares</h5>
        <button className="btn btn-danger btn-sm rounded-pill">Ver completo</button>
      </div>

      {/* Botón izquierda */}
      <button
        onClick={scrollLeft}
        className={`btn btn-light border-0 position-absolute start-0 top-50 translate-middle-y rounded-circle shadow-sm ${!showLeftButton ? 'd-none' : ''}`}
        style={{ zIndex: 2, width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <i className="bi bi-chevron-left text-danger fs-5"></i>
      </button>

      {/* Botón derecha */}
      <button
        onClick={scrollRight}
        className={`btn btn-light border-0 position-absolute end-0 top-50 translate-middle-y rounded-circle shadow-sm ${!showRightButton ? 'd-none' : ''}`}
        style={{ zIndex: 2, width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <i className="bi bi-chevron-right text-danger fs-5"></i>
      </button>

      {/* Contenedor scroll horizontal */}
      <div
        ref={scrollContainerRef}
        className="d-flex overflow-auto gap-3 pb-3"
        onScroll={handleScroll}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {rankingItems.map((item) => (
          <div key={item.id} className="flex-shrink-0" style={{ width: '289px', minWidth: '289px' }}>
            {/* Header de ranking con colores de podio */}
            <div
              className={`text-white text-center py-2 fw-bold rounded-top-3 ${
                item.id === 1
                  ? 'bg-warning text-dark'     // Oro
                  : item.id === 2
                  ? 'bg-secondary'             // Plata
                  : item.id === 3
                  ? 'bronce' // Bronce
                  : 'bg-secondary'
              }`}
            >
              TOP {item.rank}
            </div>

            {/* Contenido del ranking */}
            <div className="position-relative bg-light rounded-bottom-3" style={{ height: '340px' }}>
              <span className={`position-absolute top-0 end-0 badge bg-${item.tagColor} m-2`}>
                {item.tag}
              </span>

              <div className="position-absolute bottom-0 w-100 p-2">
                <h6 className="fw-bold mb-1">{item.title}</h6>
                <div className="small text-muted">{item.author}</div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <div className="small">
                    <i className="bi bi-heart-fill me-1 text-danger"></i>
                    {item.likes} - {item.views} vistas
                  </div>
                  <div className="d-flex align-items-center">
                    {item.specialTag && (
                      <span className="badge bg-danger me-1">{item.specialTag}</span>
                    )}
                    <span className="fw-bold" style={{ fontSize: '1.1rem' }}>{item.score}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComicsMasVisitados;
