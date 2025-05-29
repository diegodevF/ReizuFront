import React, { useEffect, useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import ImgComic from "../assets/Portadas/1000105792.png";

const EpisodeList = ({ episodes = [] }) => {
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
      className="card border-0 shadow-sm p-4 w-100 episode-list-responsive"
      style={{
        minWidth: 320,
        maxWidth: 700,
        fontSize: "1.1rem",
        background: isDark ? darkCard : "#fff",
        color: isDark ? darkText : "#222",
        borderRadius: "22px",
        transition: "background 0.3s, color 0.3s"
      }}
    >
      {/* Etiquetas superiores */}
      <div className="mb-3 d-flex flex-wrap gap-2">
        <span className="badge bg-primary px-3 py-2" style={{fontSize: "1rem"}}>Bimestral</span>
        <span className="badge bg-danger px-3 py-2" style={{fontSize: "1rem"}}>Adulto</span>
        <span className="badge bg-danger px-3 py-2" style={{fontSize: "1rem"}}>Exclusivo</span>
        <span className="badge bg-dark px-3 py-2" style={{fontSize: "1rem"}}>EP+</span>
      </div>
      {/* Lista de episodios */}
      <div>
        {episodes.map((ep, idx) => (
          <div key={idx} className="pb-4 border-bottom mb-3">
            <div className="d-flex align-items-center flex-row flex-nowrap gap-3 flex-md-nowrap flex-wrap">
              {/* Imagen episodio */}
              <img
                src={ImgComic}
                alt=""
                width={70}
                height={70}
                className="rounded-3 border"
                style={{ objectFit: "cover", minWidth: 56, minHeight: 56, background: "#fff" }}
              />
              {/* Info episodio y acciones */}
              <div className="flex-grow-1 ms-2 w-100">
                <div className="d-flex align-items-center justify-content-between flex-nowrap flex-wrap flex-md-nowrap">
                  {/* Título y subtítulo */}
                  <div className="min-w-0">
                    <span className="fw-bold" style={{ color: accentRed, fontSize: "1.1rem" }}>#{ep.number}</span>
                    {ep.locked && <i className="bi bi-lock-fill" style={{ color: accentRed, fontSize: "1.1rem", marginLeft: 4, marginRight: 4 }}></i>}
                    <span className="fw-bold ms-1 text-truncate" style={{ fontSize: "1.1rem", maxWidth: 130, display: "inline-block", verticalAlign: "bottom" }}>{ep.title}</span>
                    <div className="small" style={{ color: isDark ? mutedText : "#888" }}>{ep.date}</div>
                  </div>
                  {/* Métricas y badge leído */}
                  <div className="d-flex align-items-center gap-3 ms-3 flex-nowrap flex-wrap">
                    <span className="d-flex align-items-center"><i className="bi bi-heart me-1"></i>{ep.likes}</span>
                    <span className="d-flex align-items-center"><i className="bi bi-chat-left-text me-1"></i>{ep.comments}</span>
                    <span className="d-flex align-items-center"><i className="bi bi-eye me-1"></i>{ep.views}</span>
                    {ep.read && (
                      <span className="badge bg-danger ms-2 fs-6">Leído</span>
                    )}
                  </div>
                </div>
                {/* Botón desbloquear */}
                {ep.locked && (
                  <button
                    className="btn fw-bold mt-2"
                    style={{
                      background: accentRed,
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "1rem",
                      border: "none",
                      borderRadius: "6px",
                      padding: "0.45rem 1.5rem"
                    }}
                  >
                    Desbloquear por {ep.price} <i className="bi bi-coin"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Estilos responsivos para mobile */}
      <style>
        {`
          @media (max-width: 575.98px) {
            .episode-list-responsive {
              font-size: 0.98rem !important;
              border-radius: 14px !important;
              max-width: 99vw !important;
              min-width: 0 !important;
              padding-left: 0.5rem !important;
              padding-right: 0.5rem !important;
            }
            .episode-list-responsive img.rounded-3 {
              width: 54px !important;
              height: 54px !important;
            }
            .episode-list-responsive .btn {
              font-size: 0.95rem !important;
              padding-left: 1rem !important;
              padding-right: 1rem !important;
            }
            .episode-list-responsive .gap-3 {
              gap: 0.7rem !important;
            }
            .episode-list-responsive .text-truncate {
              max-width: 80vw !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default EpisodeList;
