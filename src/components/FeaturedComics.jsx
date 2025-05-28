import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importa esto una sola vez en tu app
import Img1 from '../assets/dragon.png';

const FeaturedComics = () => (
  <div className="container-fluid py-4" style={{
    background: 'linear-gradient(135deg, #ffe0e9 0%, #fffbe6 100%)',
    borderRadius: '1.5rem',
    boxShadow: '0 6px 24px rgba(0,0,0,0.10)',
    position: 'relative',
    overflow: 'hidden',
    width: '100vw',
    maxWidth: '100%',
    height: '50vh',
  }}>
    {/* Fondo decorativo con imagen personalizada */}
    <div style={{
      position: 'absolute',
      top: 0, left: 0, width: '100%', height: '100%',
      background: `url(${Img1}) center center / cover no-repeat`,
      opacity: 0.3,
      pointerEvents: 'none',
      zIndex: 1
    }} />
    <div className="row align-items-center h-100" style={{ position: 'relative', zIndex: 2 }}>
      <div className="col-auto d-flex align-items-center">
        <img
          src={Img1}
          alt="Aureus Graphers"
          className="rounded shadow-sm me-4"
          style={{ width: 160, height: 220, objectFit: 'cover', border: '4px solid #fff' }}
        />
        <div style={{ textAlign: 'left' }}>
          <h2 className="mb-2 fw-bold" style={{ letterSpacing: '1px' }}>AUREUS GRAPHERS</h2>
          <div className="mb-2 text-muted">
            <strong>Autores:</strong> Suzaku · Mamba · DestroyerAss · Más
          </div>
          <div className="mb-3">
            <span className="badge bg-primary me-2">Acción</span>
            <span className="badge bg-warning text-dark">Aventura</span>
          </div>
          <div className="d-flex gap-2 mb-2">
            <button className="btn btn-outline-secondary btn-sm">
              <i className="bi bi-star me-1"></i> Favoritos
            </button>
            <button className="btn btn-outline-danger btn-sm">
              <i className="bi bi-heart me-1"></i> Me gusta
            </button>
            <button className="btn btn-primary btn-sm">
              Ver primer episodio
            </button>
          </div>
        </div>
      </div>
      <div className="col" /> {/* Espacio vacío para balancear el layout */}
    </div>
  </div>
);

export default FeaturedComics;
