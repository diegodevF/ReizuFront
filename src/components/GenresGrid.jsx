import React, { useState, useEffect } from "react";
import cardsData from "../json/infoGenres.json";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import petNotFound from "../assets/petNotFound.png";
import Img1 from "../assets/Portadas/PORTADA-HEART-CHAIN-REIZU-irving-valdes-1.jpg";
import "../variables.css";

const genres = [
  { key: "accion", label: "ACCION" },
  { key: "aventura", label: "AVENTURA" },
  { key: "bl", label: "BL" },
  { key: "ciencia_ficcion", label: "CIENCIA FICCION" },
  { key: "comedia", label: "COMEDIA" },
  { key: "deporte", label: "DEPORTE" },
  { key: "drama", label: "DRAMA" },
  { key: "fantasia", label: "FANTASIA" },
  { key: "gl", label: "GL" },
  { key: "historico", label: "HISTORICO" },
  { key: "horror", label: "HORROR" },
  { key: "misterio", label: "MISTERIO" },
  { key: "psicologico", label: "PSICOLOGICO" },
  { key: "romance", label: "ROMANCE" },
  { key: "terror", label: "TERROR" },
  { key: "thriller", label: "THRILLER" },
  { key: "vida_cotidiana", label: "VIDA COTIDIANA" }
];

// Helper para detectar el tema Bootstrap
function useBootstrapTheme() {
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-bs-theme") || "light"
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-bs-theme") || "light");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-bs-theme'] });
    return () => observer.disconnect();
  }, []);

  return theme;
}

const GenresGrid = () => {
  const [selectedGenre, setSelectedGenre] = useState(genres[0].key);
  const theme = useBootstrapTheme();
  const isDark = theme === "dark";

  const filteredCards = cardsData.filter(card =>
    card.genres && card.genres.includes(selectedGenre)
  );

  return (
    <div className="container py-4">
      {/* Barra de géneros */}
      <div
        className={`mb-4 px-3 py-3 rounded-4 border shadow-sm ${isDark ? "bg-dark" : "bg-white"}`}
        style={{
          overflowX: "auto",
          whiteSpace: "nowrap"
        }}
      >
        <div className="d-flex gap-4 flex-wrap justify-content-center">
          {genres.map(genre => (
            <button
              key={genre.key}
              onClick={() => setSelectedGenre(genre.key)}
              className="btn p-0 border-0 bg-transparent"
              style={{
                fontWeight: 'bold',
                fontSize: '1rem',
                color: selectedGenre === genre.key
                  ? (isDark ? "#FFA726" : "#FF4E00")
                  : (isDark ? "#888" : "#BDBDBD"),
                background: 'transparent',
                boxShadow: 'none',
                position: 'relative',
                outline: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s'
              }}
            >
              <span
                style={{
                  borderBottom: selectedGenre === genre.key
                    ? `7px solid ${isDark ? "#FF9100" : "#FF2D00"}`
                    : 'none',
                  display: 'inline-block',
                  paddingBottom: '2px',
                  lineHeight: '1'
                }}
              >
                {genre.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid de tarjetas */}
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-3">
        {filteredCards.map(item => (
          <div key={item.id} className="col">
            <div
              className="position-relative animation-card"
              style={{
                borderRadius: "10px",
                minHeight: "320px",
                overflow: "hidden",
                boxShadow: isDark
                  ? "0 2px 16px 0 rgba(0,0,0,0.5)"
                  : "0 2px 16px 0 rgba(25, 118, 210, 0.07)",
                cursor: "pointer",
                transition: "transform 0.3s ease"
              }}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            >
              {/* Imagen que ocupa todo el card */}
              <img
                src={item.image || Img1}
                alt={item.title}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  zIndex: 1,
                  borderRadius: "10px"
                }}
                onError={e => { 
                  e.target.onerror = null; 
                  e.target.src = Img1;
                }}
              />

              {/* Badge superior derecha */}
              {item.badge && (
                <span
                  className="position-absolute top-0 end-0 m-2 px-2 py-1 rounded"
                  style={{
                    background: item.badgeColor || (isDark ? "#FFA726" : "#FF4E00"),
                    color: "#fff",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    zIndex: 3
                  }}
                >
                  {item.badge}
                </span>
              )}

              {/* Contenido inferior con fondo gris transparente más visible */}
              <div
                className="position-absolute bottom-0 w-100 p-3 text-white"
                style={{
                  zIndex: 3,
                  backgroundColor: 'rgba(64, 64, 64, 0.75)', // Gris más oscuro y más opaco
                  backdropFilter: 'blur(0.5px)', // Efecto blur para mejor legibilidad
                  borderBottomLeftRadius: '10px',
                  borderBottomRightRadius: '10px',
                  borderTop: '1px solid rgba(255,255,255,0.1)' // Sutil borde superior
                }}
              >
                <h6
                  className="fw-bold mb-1"
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.15",
                    color: "#fff",
                    textShadow: "0 1px 3px rgba(0,0,0,0.8)"
                  }}
                >
                  {item.title}
                </h6>
                <div 
                  className="small mb-2" 
                  style={{ 
                    color: "rgba(255,255,255,0.9)",
                    textShadow: "0 1px 2px rgba(0,0,0,0.8)"
                  }}
                >
                  {item.author}
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div
                    className="small d-flex align-items-center"
                    style={{ 
                      color: "rgba(255,255,255,0.9)",
                      textShadow: "0 1px 2px rgba(0,0,0,0.8)"
                    }}
                  >
                    <i
                      className="bi bi-heart-fill me-1"
                      style={{
                        color: "#ff4757",
                        fontSize: "1rem"
                      }}
                    ></i>
                    <span>
                      {item.likes} - {item.views} vistas
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    {item.specialTag && (
                      <span
                        className="badge bg-danger me-2"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {item.specialTag}
                      </span>
                    )}
                    <span
                      className="fw-bold"
                      style={{
                        fontSize: '1.5rem',
                        color: "#fff",
                        textShadow: "0 2px 4px rgba(0,0,0,0.8)"
                      }}
                    >
                      {item.chapter}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredCards.length === 0 && (
          <div className="col-12 text-center text-muted py-5 mx-auto fs-1 w-75">
            No hay resultados para este género. <hr />
            <img src={petNotFound} alt="No encontrado" width="100px"/>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenresGrid;
