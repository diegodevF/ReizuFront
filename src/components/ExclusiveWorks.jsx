import React, { useState, useEffect } from 'react';
import Info from '../json/infoComics.json';
import Img from '../assets/Portadas/MD1 - dani kube (1).png';
import BannerImg from '../assets/Portadas/1000105792.png';

// Datos de ejemplo (conservando el tamaño original)
const obras = Info;

const ITEMS_POR_PAGINA = 6; // ✅ Vuelve al tamaño original

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

  // Obtener obras para la página actual - pero solo mostrar 4 (2 los ocupa el banner)
  const indiceInicial = (paginaActual - 1) * ITEMS_POR_PAGINA;
  const obrasPaginaActual = obras.slice(indiceInicial, indiceInicial + 4); // Solo 4 comics visibles

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

  // ✅ Banner que ocupa exactamente el espacio de 2 comics
  const bannerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    objectFit: 'cover',
    objectPosition: 'center',
    boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.4)' : '0 4px 12px rgba(0,0,0,0.15)',
    border: isDark ? '2px solid #222' : '2px solid #fff',
    background: isDark ? '#232323' : '#eee',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    display: 'block',
  };

  // ✅ CSS Grid para layout perfecto
  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // 3 columnas iguales
    gridTemplateRows: 'repeat(2, 1fr)',    // 2 filas iguales
    gap: '12px',
    width: '100%',
    minHeight: '500px',
  };

  // ✅ Banner ocupa 2 filas (span 2)
  const bannerContainerStyle = {
    gridColumn: '1',      // Primera columna
    gridRow: '1 / 3',     // Desde fila 1 hasta fila 3 (ocupa 2 filas)
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
        {/* ✅ CSS Grid Layout - Banner + 4 Comics */}
        <div style={gridContainerStyle}>
          {/* Banner - Ocupa exactamente 2 filas */}
          <div style={bannerContainerStyle}>
            <img 
              src={BannerImg} 
              alt="Banner Exclusivo" 
              style={bannerStyle}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            />
          </div>

          {/* Comic 1 - Columna 2, Fila 1 */}
          {obrasPaginaActual[0] && (
            <div style={{ 
              gridColumn: '2', 
              gridRow: '1',
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center' 
            }}>
              <img src={Img} alt={obrasPaginaActual[0].titulo} style={imgStyleBig} />
              <div style={genreStyle}>{obrasPaginaActual[0].genero}</div>
              <div style={{ color: isDark ? '#ddd' : '#666', fontSize: '0.9rem' }}>
                {obrasPaginaActual[0].titulo}
              </div>
            </div>
          )}

          {/* Comic 2 - Columna 3, Fila 1 */}
          {obrasPaginaActual[1] && (
            <div style={{ 
              gridColumn: '3', 
              gridRow: '1',
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center' 
            }}>
              <img src={Img} alt={obrasPaginaActual[1].titulo} style={imgStyleBig} />
              <div style={genreStyle}>{obrasPaginaActual[1].genero}</div>
              <div style={{ color: isDark ? '#ddd' : '#666', fontSize: '0.9rem' }}>
                {obrasPaginaActual[1].titulo}
              </div>
            </div>
          )}

          {/* Comic 3 - Columna 2, Fila 2 */}
          {obrasPaginaActual[2] && (
            <div style={{ 
              gridColumn: '2', 
              gridRow: '2',
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center' 
            }}>
              <img src={Img} alt={obrasPaginaActual[2].titulo} style={imgStyleBig} />
              <div style={genreStyle}>{obrasPaginaActual[2].genero}</div>
              <div style={{ color: isDark ? '#ddd' : '#666', fontSize: '0.9rem' }}>
                {obrasPaginaActual[2].titulo}
              </div>
            </div>
          )}

          {/* Comic 4 - Columna 3, Fila 2 */}
          {obrasPaginaActual[3] && (
            <div style={{ 
              gridColumn: '3', 
              gridRow: '2',
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center' 
            }}>
              <img src={Img} alt={obrasPaginaActual[3].titulo} style={imgStyleBig} />
              <div style={genreStyle}>{obrasPaginaActual[3].genero}</div>
              <div style={{ color: isDark ? '#ddd' : '#666', fontSize: '0.9rem' }}>
                {obrasPaginaActual[3].titulo}
              </div>
            </div>
          )}
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
