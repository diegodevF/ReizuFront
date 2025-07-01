import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import BgImg from '../assets/pixel-bg.jpg'; // Usa aquí tu fondo pixel art
import CoverImg from '../assets/dragon.png'; // Portada de la obra
import { Link } from 'react-router-dom';

const FeaturedComics = () => (
  <div
    className="w-100 d-flex align-items-end"
    style={{
      minHeight: 340,
      height: '60vh',
      background: `url(${CoverImg}) center center / cover no-repeat`,
      boxShadow: '0 6px 24px rgba(0,0,0,0.10)',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Card de la obra */}
    <div
      className="d-flex flex-row align-items-end ms-4 mb-4 flex-md-row flex-column align-items-center"
      style={{
        background: 'rgba(30,30,30,0.92)',
        borderRadius: '1.1rem',
        boxShadow: '0 4px 24px #0006',
        maxWidth: 620,
        minWidth: 320,
        padding: '1.2rem 2rem 1.2rem 1.2rem',
        width: '100%',
      }}
    >
      <img
        src={CoverImg}
        alt="Aureus Graphers"
        className="rounded shadow-sm mb-3 mb-md-0"
        style={{
          width: '240px',
          height: '240px',
          objectFit: 'cover',
          border: '3px solid #fff',
          boxShadow: '0 2px 16px #0008',
          position: 'sticky',
          maxWidth: '90vw',
        }}
      />
      <div
        className="ms-3 text-center text-md-start"
        style={{
          color: "#fff",
          minWidth: 0,
          width: '100%',
          paddingLeft: '0',
          paddingRight: '0',
        }}
      >
        <h5 className="mb-1 fw-bold text-white text-truncate" style={{letterSpacing: '1px'}}>AUREUS GRAPHERS</h5>
        <div className="mb-1 small text-white-50 text-truncate">
          Suzaku · Mamba · DestroyerAss · Mas
        </div>
        <div className="mb-1 small text-white-50">
          Acción · Aventura
        </div>
        <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-2 mt-2">
          <button className="btn btn-outline-light btn-sm d-flex align-items-center px-3">
            <i className="bi bi-bookmark me-1"></i> Favoritos
          </button>
          <button className="btn btn-outline-light btn-sm d-flex align-items-center px-3">
            <i className="bi bi-heart me-1"></i> Me gusta
          </button>
          <Link to="/ViewComic" className="btn btn-danger btn-sm fw-bold px-3">
            Ver primer episodio
          </Link>
        </div>
      </div>
      <style>
        {`
          @media (max-width: 767.98px) {
            .ms-4 { margin-left: 0 !important; }
            .mb-4 { margin-bottom: 0 !important; }
            .rounded { border-radius: 0.8rem !important; }
            .shadow-sm { box-shadow: 0 2px 12px #0004 !important; }
            .flex-md-row { flex-direction: column !important; }
            img[alt="Aureus Graphers"] {
              width: 140px !important;
              height: 140px !important;
              margin-bottom: 1rem !important;
            }
            .card-content-mobile {
              padding: 0 0.5rem !important;
            }
          }
        `}
      </style>
    </div>
  </div>
);

export default FeaturedComics;
