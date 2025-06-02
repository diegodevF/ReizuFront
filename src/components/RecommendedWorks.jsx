import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Datos de ejemplo para obras recomendadas
const worksData = [
  {
    id: 1,
    title: "AUREUS GRAPHERS",
    author: "Patricio Estrella",
    image: "https://picsum.photos/200/280?random=1",
    genres: ["Acción", "Drama"]
  },
  {
    id: 2,
    title: "AUREUS GRAPHERS",
    author: "Patricio Estrella",
    image: "https://picsum.photos/200/280?random=2",
    genres: ["Acción", "Drama"]
  },
  {
    id: 3,
    title: "AUREUS GRAPHERS",
    author: "Patricio Estrella",
    image: "https://picsum.photos/200/280?random=3",
    genres: ["Acción", "Drama"]
  }
];

const RecommendedWorks = () => {
  const getGenreBadgeColor = (genre) => {
    switch (genre.toLowerCase()) {
      case 'acción':
        return 'bg-danger';
      case 'drama':
        return 'bg-primary';
      case 'comedia':
        return 'bg-warning text-dark';
      case 'romance':
        return 'bg-success';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="card border-0 shadow-lg h-100" style={{ backgroundColor: 'var(--bs-body-bg)' }}>
      <div className="card-body p-4">
        {/* Encabezado */}
        <h5 className="fw-bold mb-4 text-center">Obras que quizás te puedan Interesar</h5>

        {/* Lista de obras */}
        <div className="works-list">
          {worksData.map((work) => (
            <div key={work.id} className="d-flex gap-3 mb-4 p-3 rounded" style={{ backgroundColor: 'var(--bs-secondary-bg)' }}>
              <img
                src={work.image}
                alt={work.title}
                className="rounded"
                style={{ 
                  width: '80px', 
                  height: '110px', 
                  objectFit: 'cover',
                  flexShrink: 0
                }}
              />
              <div className="flex-grow-1 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex flex-wrap gap-1 mb-2">
                    {work.genres.map((genre, index) => (
                      <span
                        key={index}
                        className={`badge ${getGenreBadgeColor(genre)} px-2 py-1`}
                        style={{ fontSize: '0.75rem' }}
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                  <h6 className="fw-bold mb-1" style={{ fontSize: '1rem' }}>
                    {work.title}
                  </h6>
                  <p className="text-muted small mb-0">
                    {work.author}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedWorks;
