import React, { useState, useEffect } from "react";
import cardsData from "../json/infoGenres.json";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import petNotFound from "../assets/petNotFound.png";

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
        <div className="d-flex gap-4 flex-wrap">
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
              className="position-relative"
              style={{
                borderRadius: "10px",
                background: isDark ? "rgba(33,33,33,0.95)" : "rgba(157, 155, 155, 0.08)",
                minHeight: "320px",
                overflow: "hidden",
                boxShadow: isDark
                  ? "0 2px 16px 0 rgba(0,0,0,0.5)"
                  : "0 2px 16px 0 rgba(25, 118, 210, 0.07)",
                border: isDark ? "1.5px solid #444" : undefined
              }}
            >
              {/* Badge superior derecha */}
              {item.badge && (
                <span
                  className="position-absolute top-0 end-0 m-2 px-2 py-1 rounded"
                  style={{
                    background: item.badgeColor || (isDark ? "#FFA726" : "#FF4E00"),
                    color: "#fff",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    zIndex: 2
                  }}
                >
                  {item.badge}
                </span>
              )}

              {/* Imagen opcional */}
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "190px",
                    objectFit: "cover",
                    display: "block",
                    background: isDark ? "#232323" : "#eee",
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                  onError={e => { e.target.onerror = null; e.target.src = petNotFound; }}
                />
              )}

              {/* Contenido inferior */}
              <div
                className="position-absolute bottom-0 w-100 p-2"
                style={{
                  background: isDark
                    ? "rgba(28,28,28, 0.95)"
                    : "rgba(255, 255, 255, 0.95)",
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8
                }}
              >
                <h6
                  className="fw-bold mb-1"
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.15",
                    color: isDark ? "#FFA726" : "#FF4E00"
                  }}
                >
                  {item.title}
                </h6>
                <div className={`small ${isDark ? "text-light" : "text-secondary"}`}>
                  {item.author}
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <div
                    className="small d-flex align-items-center"
                    style={{ color: isDark ? "#FFA726" : "#FF4E00" }}
                  >
                    <i
                      className="bi bi-heart-fill me-1"
                      style={{
                        color: "#e53935",
                        fontSize: "1rem"
                      }}
                    ></i>
                    <span className={`m-0 p-0 ${isDark ? "text-light" : "text-black"}`}>
                      {item.likes} - {item.views} vistas
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    {item.specialTag && (
                      <span
                        className="badge bg-danger me-1"
                        style={{ fontSize: "1rem" }}
                      >
                        {item.specialTag}
                      </span>
                    )}
                    <span
                      className="fw-bold"
                      style={{
                        fontSize: '1.35rem',
                        color: isDark ? "#FFA726" : "#FF4E00"
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
