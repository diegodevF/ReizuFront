import React, { useEffect, useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import Perfil from "../assets/authors/perro.jpeg";

const SerieCard = ({
  status = "Emisión",
  type = "Serie",
  format = "Manga/Comic",
  direction = "Derecha a Izquierda",
  chapter = 30,
  likes = 40,
  views = "10.567",
  comments = 30,
  rating = 4.5,
  votes = 40,
  description,
  publishDate = "febrero 11, 2022",
  author = "Suzaku",
  authorImg,
  gallery = [],
}) => {
  // Detectar dark mode de Bootstrap
  const [isDark, setIsDark] = useState(
    document.documentElement.getAttribute("data-bs-theme") === "dark"
  );
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute("data-bs-theme") === "dark");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-bs-theme'] });
    return () => observer.disconnect();
  }, []);

  // Paleta para dark mode
  const darkCard = "#18191A";
  const darkText = "#fff";
  const accentRed = "#FF2323";
  const mutedText = "#bdbdbd";

  return (
    <div
      className="card border-0 shadow-sm w-100 serie-card-responsive"
      style={{
        maxWidth: 700,
        minWidth: 280,
        fontSize: "1.1rem",
        background: isDark ? darkCard : "#fff",
        color: isDark ? darkText : "#222",
        borderRadius: "22px",
        transition: "background 0.3s, color 0.3s"
      }}
    >
      <div className="card-body pb-3">
        {/* Etiquetas superiores */}
        <div className="mb-3 d-flex flex-wrap gap-2">
          <span className="badge bg-success px-3 py-2" style={{fontSize: "1rem"}}>{status}</span>
          <span className="badge bg-secondary px-3 py-2" style={{fontSize: "1rem"}}>{type}</span>
          <span className="badge bg-dark px-3 py-2" style={{fontSize: "1rem"}}>{format}</span>
          <span className={`badge px-3 py-2 ${isDark ? "bg-secondary text-light" : "bg-light text-dark border"}`} style={{fontSize: "1rem"}}>{direction}</span>
        </div>
        {/* Métricas y rating */}
        <div className="d-flex align-items-center flex-wrap mb-3 gap-3 fs-5 border-bottom pb-2">
          <span><i className="bi bi-bookmark"></i> {comments}</span>
          <span><i className="bi bi-eye"></i> {views}</span>
          <span><i className="bi bi-heart"></i> {likes}</span>
          <span className="fw-bold" style={{color: accentRed}}>
            {rating}
            <i className="bi bi-star-fill ms-1" style={{color: "#FF2323"}}></i>
            <span className="text-muted ms-1" style={{ fontSize: "1rem" }}>({votes})</span>
          </span>
          <button className="btn btn-danger btn-sm ms-2 fw-bold px-3 py-1" style={{fontSize: "1rem"}}>Calificar</button>
        </div>
        {/* Capítulo y descripción */}
        <div className="mb-2 mt-3">
          <strong className="fs-5">Capitulo: {chapter}</strong>
        </div>
        <div className="mb-3" style={{ color: isDark ? mutedText : "#222", fontSize: "1.1rem" }}>
          {description || "En un mundo donde algunos poseen habilidades únicas, dos jóvenes descubren una verdad inquietante sobre su futuro y se resignan a lo que parece ser un final trágico. Sin embargo el destino tiene otros planes y sus caminos se cruzan inesperadamente. ¿Qué sucederá ahora que se han encontrado?"}
        </div>
        <div className="mb-3" style={{ fontSize: "1.06rem", color: isDark ? mutedText : "#222" }}>
          Fecha de publicación : <b>{publishDate}</b>
        </div>
        {/* Autor y acciones */}
        <div className="d-flex align-items-center mb-3 gap-3 flex-wrap">
          <img src={authorImg || Perfil} alt={author} width={48} height={48} className="rounded-circle border" />
          <span className="fw-bold fs-5">{author}</span>
          <span className="ms-2 fs-4">
            <i className="bi bi-facebook me-1"></i>
            <i className="bi bi-twitter-x me-1"></i>
            <i className="bi bi-instagram"></i>
          </span>
        </div>
        {/* Botones rojos */}
        <div className="d-flex gap-3 mb-3 flex-wrap justify-content-center justify-content-md-start">
          <button className="btn btn-danger fw-bold px-4" style={{fontSize: "1.05rem"}}>Seguir</button>
          <button className="btn btn-danger fw-bold px-4" style={{fontSize: "1.05rem"}}>Apoyar</button>
          <button className="btn btn-danger fw-bold px-4" style={{fontSize: "1.05rem"}}>Compartir</button>
        </div>
        {/* Galería inferior */}
        <div className="d-flex align-items-end gap-4 mt-4 flex-wrap justify-content-between">
          <div className="d-flex gap-4 flex-wrap justify-content-center justify-content-md-start">
            {gallery.slice(0, 4).map((img, idx) => (
              <img key={idx} src={img} alt="" width={90} height={90} className="rounded-3 border" style={{objectFit: "contain", background: "#fff"}} />
            ))}
          </div>
          <span className="fw-bold small text-secondary fs-5 mt-3 mt-md-0" style={{borderBottom: "3px solid #222", letterSpacing: "1px"}}>MAS</span>
        </div>
      </div>
      {/* Estilos responsivos para mobile */}
      <style>
        {`
          @media (max-width: 575.98px) {
            .serie-card-responsive {
              font-size: 0.98rem !important;
              border-radius: 14px !important;
              max-width: 99vw !important;
              min-width: 0 !important;
              padding-left: 0.5rem !important;
              padding-right: 0.5rem !important;
            }
            .serie-card-responsive img.rounded-3 {
              width: 60px !important;
              height: 60px !important;
            }
            .serie-card-responsive .btn {
              font-size: 0.95rem !important;
              padding-left: 1rem !important;
              padding-right: 1rem !important;
            }
            .serie-card-responsive .gap-4 {
              gap: 1rem !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SerieCard;
