import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Datos de ejemplo para comentarios
const reviewsData = [
  {
    id: 1,
    userName: "Yuki Miyasawa",
    avatar: "https://ui-avatars.com/api/?name=Yuki+Miyasawa&background=random",
    rating: 4,
    daysAgo: 20,
    comment: "Sinceramente me sorprende el nivel de este manga latino. La narrativa es prácticamente perfecta, la trama simple y completamente interesante, y el dibujo muy original. Recién he leído el primer cap, pero creo que encontré una joya."
  },
  {
    id: 2,
    userName: "Yuki Miyasawa",
    avatar: "https://ui-avatars.com/api/?name=Yuki+Miyasawa&background=random",
    rating: 4,
    daysAgo: 20,
    comment: "Sinceramente me sorprende el nivel de este manga latino. La narrativa es prácticamente perfecta, la trama simple y completamente interesante, y el dibujo muy original. Recién he leído el primer cap, pero creo que encontré una joya."
  },
  {
    id: 3,
    userName: "Yuki Miyasawa",
    avatar: "https://ui-avatars.com/api/?name=Yuki+Miyasawa&background=random",
    rating: 4,
    daysAgo: 20,
    comment: "Sinceramente me sorprende el nivel de este manga latino. La narrativa es prácticamente perfecta, la trama simple y completamente interesante, y el dibujo muy original. Recién he leído el primer cap, pero creo que encontré una joya."
  },
  {
    id: 4,
    userName: "Yuki Miyasawa",
    avatar: "https://ui-avatars.com/api/?name=Yuki+Miyasawa&background=random",
    rating: 4,
    daysAgo: 20,
    comment: "Sinceramente me sorprende el nivel de este manga latino. La narrativa es prácticamente perfecta, la trama simple y completamente interesante, y el dibujo muy original. Recién he leído el primer cap, pero creo que encontré una joya."
  }
];

const UserReviews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 6;

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <i
        key={index}
        className={`bi ${index < rating ? 'bi-star-fill' : 'bi-star'}`}
        style={{ color: index < rating ? '#ffc107' : '#e0e0e0', fontSize: '1rem' }}
      ></i>
    ));
  };

  return (
    <div className="card border-0 shadow-lg h-100" style={{ backgroundColor: 'var(--bs-body-bg)' }}>
      <div className="card-body p-4">
        {/* Encabezado */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0">Reseñas de usuario</h5>
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted">34 Comentarios</span>
            <div className="dropdown">
              <button 
                className="btn btn-outline-secondary btn-sm dropdown-toggle" 
                data-bs-toggle="dropdown"
              >
                Más recientes
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Más recientes</a></li>
                <li><a className="dropdown-item" href="#">Más antiguos</a></li>
                <li><a className="dropdown-item" href="#">Mejor valorados</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Lista de comentarios */}
        <div className="comments-list">
          {reviewsData.map((review) => (
            <div key={review.id} className="d-flex gap-3 mb-4 pb-3 border-bottom">
              <img
                src={review.avatar}
                alt={review.userName}
                className="rounded-circle"
                style={{ width: '48px', height: '48px', objectFit: 'cover' }}
              />
              <div className="flex-grow-1">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <h6 className="mb-0 fw-bold">{review.userName}</h6>
                  <div className="d-flex gap-1">
                    {renderStars(review.rating)}
                  </div>
                  <small className="text-muted ms-2">
                    <i className="bi bi-clock me-1"></i>
                    {review.daysAgo} Días atrás
                  </small>
                </div>
                <p className="mb-0 text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>
                  {review.comment}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Paginación */}
        <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
          <button 
            className="btn btn-link text-decoration-none"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          >
            ANT
          </button>
          
          {[...Array(totalPages)].map((_, index) => {
            const pageNum = index + 1;
            if (pageNum === 1 || pageNum === totalPages || Math.abs(pageNum - currentPage) <= 1) {
              return (
                <button
                  key={pageNum}
                  className={`btn ${pageNum === currentPage ? 'btn-danger' : 'btn-link text-decoration-none'}`}
                  onClick={() => setCurrentPage(pageNum)}
                  style={{ minWidth: '32px' }}
                >
                  {pageNum}
                </button>
              );
            } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
              return <span key={pageNum}>...</span>;
            }
            return null;
          })}
          
          <button 
            className="btn btn-link text-decoration-none"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          >
            SIG
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserReviews;
