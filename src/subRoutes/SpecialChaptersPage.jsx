import React, { useState } from 'react';
import Navbar from '../components/Navbar';         // Ajusta la ruta según tu estructura
import StoreNavbar from '../components/StoreNavbar';
import Footer from '../components/Footer';
import 'bootstrap-icons/font/bootstrap-icons.css';

const chapters = [
  {
    id: 1,
    title: "AUREUS GRAPHERS",
    author: "Suzaku",
    genres: "Ciencia Ficción - Aventura",
    type: "Serie",
    typeColor: "danger",
    score: 54,
    ex: false,
    image: null,
  },
  {
    id: 2,
    title: "EL AMOR DURA LO QUE DURA PARA SIEMPRE TE CONOZCO",
    author: "Suzaku",
    genres: "Drama - Romance",
    type: "Novela",
    typeColor: "primary",
    score: 3,
    ex: false,
    image: null,
  },
  {
    id: 3,
    title: "AUREUS GRAPHERS",
    author: "Suzaku",
    genres: "Drama - Aventura",
    type: "Oneshot",
    typeColor: "success",
    score: 20,
    ex: false,
    image: null,
  },
  {
    id: 4,
    title: "AUREUS GRAPHERS",
    author: "Suzaku",
    genres: "Aventura - Drama",
    type: "Serie",
    typeColor: "danger",
    score: 150,
    ex: true,
    image: null,
  },
  {
    id: 5,
    title: "AUREUS GRAPHERS",
    author: "Suzaku",
    genres: "Ciencia Ficción - Aventura",
    type: "Serie",
    typeColor: "danger",
    score: 54,
    ex: false,
    image: null,
  },
  {
    id: 6,
    title: "EL AMOR DURA LO QUE DURA PARA SIEMPRE TE CONOZCO",
    author: "Suzaku",
    genres: "Drama - Romance",
    type: "Novela",
    typeColor: "primary",
    score: 3,
    ex: false,
    image: null,
  },
  {
    id: 7,
    title: "AUREUS GRAPHERS",
    author: "Suzaku",
    genres: "Drama - Aventura",
    type: "Oneshot",
    typeColor: "success",
    score: 20,
    ex: false,
    image: null,
  },
  {
    id: 8,
    title: "AUREUS GRAPHERS",
    author: "Suzaku",
    genres: "Aventura - Drama",
    type: "Serie",
    typeColor: "danger",
    score: 150,
    ex: true,
    image: null,
  }
];

const works = ["Todas las obras", "Aureus Graphers", "El Amor Dura"];
const artists = ["Todos los Artistas", "Suzaku"];

const SpecialChaptersPage = () => {
  const [selectedWork, setSelectedWork] = useState("Todas las obras");
  const [selectedArtist, setSelectedArtist] = useState("Todos los Artistas");
  const [search, setSearch] = useState("");

  const filtered = chapters.filter(ch =>
    (selectedWork === "Todas las obras" || ch.title.toLowerCase().includes(selectedWork.toLowerCase())) &&
    (selectedArtist === "Todos los Artistas" || ch.author === selectedArtist) &&
    (ch.title.toLowerCase().includes(search.toLowerCase()) ||
     ch.genres.toLowerCase().includes(search.toLowerCase()) ||
     ch.author.toLowerCase().includes(search.toLowerCase()))
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
              CAPITULOS ESPECIALES
            </h1>
            <div className="mb-4" style={{ color: "var(--bs-body-color)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
              Úsalos como quieras, canjea tus reizu coins en diferentes productos o servicios, capítulos especiales o comisiones de artistas.
            </div>
          </div>

          {/* Filtros y búsqueda */}
          <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-2">
            <div className="d-flex gap-2 flex-wrap">
              <select className="form-select form-select-sm" 
                style={{ minWidth: 140, background: 'var(--bs-secondary-bg)', color: 'var(--bs-body-color)', border: '1.5px solid var(--bs-border-color)' }} 
                value={selectedWork} 
                onChange={e => setSelectedWork(e.target.value)}
              >
                {works.map(work => (
                  <option key={work}>{work}</option>
                ))}
              </select>
              <select className="form-select form-select-sm" 
                style={{ minWidth: 140, background: 'var(--bs-secondary-bg)', color: 'var(--bs-body-color)', border: '1.5px solid var(--bs-border-color)' }} 
                value={selectedArtist} 
                onChange={e => setSelectedArtist(e.target.value)}
              >
                {artists.map(artist => (
                  <option key={artist}>{artist}</option>
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

          {/* Grid de capítulos */}
          <div className="row g-4">
            {filtered.map((ch) => (
              <div key={ch.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div
                  className="position-relative"
                  style={{
                    background: "var(--bs-secondary-bg, #c0c0c0)",
                    borderRadius: 8,
                    minHeight: 320,
                    height: 340,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    overflow: "hidden",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.05)"
                  }}
                >
                  {/* Badge tipo */}
                  <span
                    className={`badge bg-${ch.typeColor} position-absolute top-0 end-0 m-2`}
                    style={{ fontSize: 13, zIndex: 2 }}
                  >
                    {ch.type}
                  </span>

                  {/* Imagen de fondo si existe */}
                  {ch.image && (
                    <img
                      src={ch.image}
                      alt={ch.title}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: 0.2,
                        zIndex: 1
                      }}
                    />
                  )}

                  {/* Info inferior con fondo gris semi-transparente */}
                  <div
                    className="w-100"
                    style={{
                      position: "relative",
                      zIndex: 2,
                      background: "rgba(128, 128, 128, 0.85)",
                      borderBottomLeftRadius: 8,
                      borderBottomRightRadius: 8,
                      borderTop: "1.5px solid #222",
                      padding: "12px 12px 8px 12px"
                    }}
                  >
                    <div
                      className="fw-bold mb-0"
                      style={{
                        fontSize: 16,
                        borderBottom: "1.5px solid #222",
                        lineHeight: 1.15,
                        textTransform: "uppercase",
                        color: "#fff"
                      }}
                    >
                      {ch.title}
                    </div>
                    <div style={{ fontSize: 13, color: "#fff" }}>{ch.author}</div>
                    <div style={{ fontSize: 13, color: "#e0e0e0", marginBottom: 6 }}>
                      {ch.genres}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                      {ch.ex && (
                        <span
                          className="badge bg-danger me-2"
                          style={{ fontWeight: 700, fontSize: 15 }}
                        >
                          EX
                        </span>
                      )}
                      <span className="fw-bold" style={{ fontSize: 20, color: "#fff" }}>
                        {ch.score}
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

export default SpecialChaptersPage;
