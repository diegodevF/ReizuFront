import React, { useState } from 'react';
import Navbar from '../components/Navbar';         // Ajusta la ruta según tu estructura
import StoreNavbar from '../components/StoreNavbar';
import Footer from '../components/Footer';
import 'bootstrap-icons/font/bootstrap-icons.css';

const products = [
  {
    id: 1,
    title: "SUSCRIPCION 1 MES CRUNCHYROLL MEGA FAN",
    value: "1.100 Reizu Coins",
    category: "Streaming",
    image: null
  },
  {
    id: 2,
    title: "SUSCRIPCION 1 MES CRUNCHYROLL FAN",
    value: "1.200 Reizu Coins",
    category: "Streaming",
    image: null
  },
  {
    id: 3,
    title: "SUSCRIPCION 1 MES NITRO (DISCORD)",
    value: "1.400 Reizu Coins",
    category: "Gaming",
    image: null
  },
  {
    id: 4,
    title: "SUSCRIPCION 1 MES CRUNCHYROLL MEGA FAN",
    value: "1.600 Reizu Coins",
    category: "Streaming",
    image: null
  },
  {
    id: 5,
    title: "SUSCRIPCION 1 MES XBOX GAME PASS ULTIMATE",
    value: "1.800 Reizu Coins",
    category: "Gaming",
    image: null
  },
  {
    id: 6,
    title: "SUSCRIPCION 3 MES CRUNCHYROLL MEGA FAN",
    value: "1.900 Reizu Coins",
    category: "Streaming",
    image: null
  },
  {
    id: 7,
    title: "SUSCRIPCION 1 MES XBOX GAME PASS ULTIMATE",
    value: "2.000 Reizu Coins",
    category: "Gaming",
    image: null
  },
  {
    id: 8,
    title: "SUSCRIPCION 3 MESES CRUNCHYROLL FAN",
    value: "2.400 Reizu Coins",
    category: "Streaming",
    image: null
  },
];

const categories = ["Todas las categorías", "Streaming", "Gaming", "Software"];

const ExchangePage = () => {
  const [search, setSearch] = useState("");
  const [filter1, setFilter1] = useState("Filtrar cosa");
  const [selectedCategory, setSelectedCategory] = useState("Todas las categorías");
  const [hovered, setHovered] = useState(null);

  const filtered = products.filter(p =>
    (selectedCategory === "Todas las categorías" || p.category === selectedCategory) &&
    (p.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <Navbar />
      <StoreNavbar />
      <div className="py-5" style={{ background: 'var(--bs-body-bg)' }}>
        <div className="container" style={{ maxWidth: 1300 }}>
          {/* Título y subtítulo */}
          <div className="text-center mb-4">
            <h1 className="fw-bold mb-3" style={{ color: "#dc3545", letterSpacing: "1px", fontSize: "2.5rem" }}>
              SERVICIOS
            </h1>
            <div className="mb-4" style={{ color: "var(--bs-body-color)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
              Úsalos como quieras. Canjea tus reizu coins en diferentes productos o servicios, capítulos especiales o comisiones de artistas.
            </div>
          </div>

          {/* Filtros y búsqueda */}
          <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-2">
            <div className="d-flex gap-2 flex-wrap">
              <select className="form-select form-select-sm" 
                style={{ minWidth: 140, background: 'var(--bs-secondary-bg)', color: 'var(--bs-body-color)', border: '1.5px solid var(--bs-border-color)' }} 
                value={filter1} 
                onChange={e => setFilter1(e.target.value)}
              >
                <option>Filtrar cosa</option>
              </select>
              <select className="form-select form-select-sm" 
                style={{ minWidth: 160, background: 'var(--bs-secondary-bg)', color: 'var(--bs-body-color)', border: '1.5px solid var(--bs-border-color)' }} 
                value={selectedCategory} 
                onChange={e => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </div>
            <form className="d-flex align-items-center gap-2" onSubmit={e => e.preventDefault()} style={{ minWidth: 200 }}>
              <div style={{ position: "relative", width: 180 }}>
                <input
                  className="form-control form-control-sm ps-5 rounded-pill border-0 shadow-sm"
                  type="search"
                  placeholder="Buscar"
                  style={{
                    background: "var(--bs-secondary-bg, #23272b)",
                    color: "var(--bs-body-color)",
                    border: "1.5px solid var(--bs-border-color)",
                    boxShadow: "none"
                  }}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <i
                  className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3"
                  style={{ color: "#dc3545", fontSize: "1.1rem", pointerEvents: "none" }}
                />
              </div>
              <button className="btn btn-danger btn-sm rounded-pill px-3" type="submit">
                Buscar
              </button>
            </form>
          </div>

          {/* Grid de productos */}
          <div className="row g-4">
            {filtered.map((product, idx) => (
              <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div
                  className="d-flex flex-column align-items-center"
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Imagen/placeholder */}
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "1/1.1",
                      background: "var(--bs-secondary-bg, #c0c0c0)",
                      borderRadius: 6,
                      position: "relative",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                      marginBottom: 12,
                      border: "1px solid var(--bs-border-color, #dee2e6)"
                    }}
                  >
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div className="d-flex align-items-center justify-content-center h-100">
                        <div className="text-center" style={{ color: 'var(--bs-secondary-color, #6c757d)' }}>
                          <i className="bi bi-image fs-1 mb-2"></i>
                          <p className="mb-0 small">Servicio</p>
                        </div>
                      </div>
                    )}

                    {/* Botón CANJEAR con animación suave */}
                    <span
                      className={`exchange-canjear-btn${hovered === idx ? " show" : ""}`}
                      style={{
                        width: "100%",
                        background: "#333",
                        color: "#fff",
                        fontSize: "1.1rem",
                        padding: "0.7rem 0",
                        letterSpacing: "1px",
                        borderRadius: 0,
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        opacity: 0,
                        transform: "translateY(100%)",
                        transition: "opacity 0.4s cubic-bezier(.4,0,.2,1), transform 0.4s cubic-bezier(.4,0,.2,1)",
                        border: "none",
                        textAlign: "center",
                        zIndex: 2,
                        fontWeight: "bold",
                        textTransform: "uppercase"
                      }}
                    >
                      CANJEAR
                    </span>
                    {/* Clase .show activa el botón */}
                    <style>
                      {`
                        .exchange-canjear-btn.show {
                          opacity: 1 !important;
                          transform: translateY(0) !important;
                        }
                      `}
                    </style>
                  </div>
                  
                  {/* Info del producto */}
                  <div className="text-center" style={{ minHeight: 80 }}>
                    <div
                      className="fw-bold mb-2"
                      style={{
                        fontSize: "0.95rem",
                        textTransform: "uppercase",
                        color: "var(--bs-body-color)",
                        lineHeight: "1.3"
                      }}
                    >
                      {product.title}
                    </div>
                    <div className="small" style={{ color: "var(--bs-secondary-color, #6c757d)" }}>
                      Valor de Canje:{" "}
                      <span style={{ color: "#e53935", fontWeight: "bold" }}>
                        {product.value}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-12 text-center py-5 text-muted">
                No hay resultados para esta búsqueda.
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ExchangePage;
