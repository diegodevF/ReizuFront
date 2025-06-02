import React, { useState, useEffect } from 'react';
import Info from '../json/infoComics.json';
import Img from '../assets/Portadas/MD1 - dani kube (1).png'

// Datos de ejemplo (puedes cargarlos desde un archivo JSON externo)
const obras = Info;

const ITEMS_POR_PAGINA = 6;

const getTheme = () => {
  if (typeof document !== "undefined") {
    return document.documentElement.getAttribute("data-bs-theme") || "light";
  }
  return "light";
};

const ExclusiveWorks = () => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [theme, setTheme] = useState(getTheme());

  const totalPaginas = Math.ceil(obras.length / ITEMS_POR_PAGINA);

  // Detectar cambios en el tema de Bootstrap
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(getTheme());
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-bs-theme'] });
    return () => observer.disconnect();
  }, []);

  // Obtener obras para la página actual
  const indiceInicial = (paginaActual - 1) * ITEMS_POR_PAGINA;
  const obrasPaginaActual = obras.slice(indiceInicial, indiceInicial + ITEMS_POR_PAGINA);

  // Estilos adaptativos según el tema
  const isDark = theme === "dark";

  const imgStyleBig = {
    width: '100%',
    maxWidth: 240,
    aspectRatio: '3/4',
    borderRadius: 10,
    objectFit: 'cover',
    boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.15)',
    border: isDark ? '2px solid #222' : '2px solid #fff',
    background: isDark ? '#232323' : '#eee',
  };

  const genreStyle = {
    color: isDark ? '#f8d7da' : '#333',
    fontWeight: 600,
    fontSize: '1rem',
    letterSpacing: 0.5,
    marginTop: 8,
  };

  const cardBg = isDark ? "bg-dark" : "bg-white";
  const cardBorder = isDark ? "border-secondary" : "border-light";
  const cardShadow = isDark ? "" : "shadow";

  return (
    <>
      <h1 className={`fw-bold text-danger d-flex justify-content-center pt-5 fs-1`}>
        Disfruta de las obras exclusivas!
      </h1>
      <h3 className={`fw-bold d-flex justify-content-center ${isDark ? "text-light" : ""}`}>
        Que solo lo puedes encontrar en la plataforma
      </h3>
      <div
        className={`py-4 px-3 ${cardBg} ${cardBorder} ${cardShadow}`}
        style={{
          borderRadius: 16,
          maxWidth: 1050,
          margin: '40px auto',
          border: isDark ? '1.5px solid #333' : '1.5px solid #eee',
        }}
      >
        {/* Grid de obras */}
        <div className="row gx-3 gy-3">
          {obrasPaginaActual.map((obra) => (
            <div key={obra.id} className="col-6 col-sm-4 d-flex flex-column align-items-center">
              <img src={Img} alt={obra.titulo} style={imgStyleBig} />
              <div style={genreStyle}>{obra.genero}</div>
              <div style={{ color: isDark ? '#ddd' : '#666', fontSize: '0.9rem' }}>{obra.titulo}</div>
            </div>
          ))}
        </div>

        {/* Paginación */}
        <div className="d-flex justify-content-center align-items-center mt-4 gap-2">
          <button
            className="btn btn-outline-secondary"
            onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))}
            disabled={paginaActual === 1}
          >
            ANT
          </button>

          {[...Array(totalPaginas)].map((_, index) => (
            <button
              key={index + 1}
              className={`btn ${paginaActual === index + 1 ? 'btn-danger' : 'btn-outline-secondary'}`}
              onClick={() => setPaginaActual(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="btn btn-outline-secondary"
            onClick={() => setPaginaActual(prev => Math.min(prev + 1, totalPaginas))}
            disabled={paginaActual === totalPaginas}
          >
            SIG
          </button>
        </div>
      </div>
    </>
  );
};

export default ExclusiveWorks;
