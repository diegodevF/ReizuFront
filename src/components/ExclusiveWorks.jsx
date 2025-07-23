import React, { useState, useEffect } from "react";
import Info from "../json/infoComics.json";
import Img from "../assets/Portadas/MD1 - dani kube (1).png";
import BannerImg from "../assets/Portadas/1000105792.png";

const obras         = Info;
const ITEMS_POR_PAGINA = 6;               // 6 capítulos por página

/* ---------- helpers ---------- */
const getTheme = () =>
  typeof document !== "undefined"
    ? document.documentElement.getAttribute("data-bs-theme") || "light"
    : "light";

/* ---------- componente ---------- */
const ExclusiveWorks = () => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [theme, setTheme]               = useState(getTheme());
  const isDark                          = theme === "dark";

  /* detectar cambio de tema */
  useEffect(() => {
    const mo = new MutationObserver(() => setTheme(getTheme()));
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-bs-theme"],
    });
    return () => mo.disconnect();
  }, []);

  /* paginación */
  const totalPaginas     = Math.ceil(obras.length / ITEMS_POR_PAGINA);
  const indiceInicial    = (paginaActual - 1) * ITEMS_POR_PAGINA;
  const obrasPagina      = obras.slice(indiceInicial, indiceInicial + ITEMS_POR_PAGINA);

  /* estilos reutilizables */
  const cardClasses   = `${isDark ? "bg-dark border-secondary" : "bg-white border-light shadow"}`;
  const borderColor   = isDark ? "#333" : "#eee";
  const txtMuted      = isDark ? "#fff" : "#6c757d";

  const imgStyleSmall = {
    width: "100%",
    maxWidth: 150,
    aspectRatio: "3/4",
    borderRadius: 8,
    objectFit: "cover",
    boxShadow: isDark
      ? "0 2px 8px rgba(0,0,0,0.4)"
      : "0 2px 8px rgba(0,0,0,0.15)",
    border: isDark ? "2px solid #222" : "2px solid #fff",
    background: isDark ? "#232323" : "#eee",
    cursor: "pointer",
    transition: "transform .3s ease",
  };

  const bannerStyle = {
    width: "100%",
    maxWidth: 370,
    borderRadius: 12,
    objectFit: "cover",
    objectPosition: "center",
    boxShadow: isDark
      ? "0 4px 12px rgba(0,0,0,0.4)"
      : "0 4px 12px rgba(0,0,0,0.15)",
    border: isDark ? "2px solid #222" : "2px solid #fff",
    background: isDark ? "#232323" : "#eee",
    minHeight: 400,
    cursor: "pointer",
    transition: "transform .3s ease",
  };

  return (
    <>
      {/* titulares */}
      <h1 className="fw-bold text-danger text-center pt-5 fs-1">
        ¡Disfruta de las obras exclusivas!
      </h1>
      <h3 className={`fw-bold text-center ${isDark ? "text-light" : ""}`}>
        Que solo puedes encontrar en la plataforma
      </h3>

      {/* --------- layout principal --------- */}
      <div
        className="d-flex flex-wrap gap-4 justify-content-center py-4 px-3"
        style={{ maxWidth: 1250, margin: "40px auto" }}
      >
        {/* banner a la izquierda (fuera del card) */}
        <img
          src={BannerImg}
          alt="Banner exclusivo"
          style={bannerStyle}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />

        {/* cuadro con grid de 6 capítulos a la derecha */}
        <div
          className={`${cardClasses} p-4`}
          style={{
            borderRadius: 16,
            border: `1.5px solid ${borderColor}`,
            width: "100%",
            maxWidth: 760,
          }}
        >
          {/* grid de 6 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(2, 1fr)",
              gap: 12,
            }}
          >
            {obrasPagina.map((obra, i) => (
              <div
                key={i}
                className="d-flex flex-column align-items-center"
              >
                <img
                  src={Img}
                  alt={obra.titulo}
                  style={imgStyleSmall}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
                <span
                  className="fw-semibold mt-2"
                  style={{ fontSize: ".85rem", color: txtMuted }}
                >
                  {obra.genero}
                </span>
                <span
                  style={{ fontSize: ".8rem", color: txtMuted, textAlign: "center" }}
                >
                  {obra.titulo}
                </span>
              </div>
            ))}

            {/* relleno para mantener 6 celdas */}
            {Array.from({ length: 6 - obrasPagina.length }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
          </div>

          {/* paginación */}
          <div className="d-flex justify-content-center align-items-center mt-4 gap-2">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setPaginaActual((p) => Math.max(p - 1, 1))}
              disabled={paginaActual === 1}
            >
              ANT
            </button>

            {Array.from({ length: totalPaginas }).map((_, idx) => (
              <button
                key={idx + 1}
                className={`btn ${
                  paginaActual === idx + 1 ? "btn-danger" : "btn-outline-secondary"
                }`}
                onClick={() => setPaginaActual(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}

            <button
              className="btn btn-outline-secondary"
              onClick={() =>
                setPaginaActual((p) => Math.min(p + 1, totalPaginas))
              }
              disabled={paginaActual === totalPaginas}
            >
              SIG
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExclusiveWorks;
