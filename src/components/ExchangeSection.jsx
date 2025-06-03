import React, { useState } from "react";

const products = [
  {
    id: 1,
    title: "SUSCRIPCION 1 MES CRUNCHYROLL MEGA FAN",
    value: "1.100 Reizu Coins",
    valueColor: "#e53935",
    subtitle: "",
    image: "https://via.placeholder.com/300x330?text=Crunchyroll+Mega+Fan"
  },
  {
    id: 2,
    title: "SUSCRIPCION 1 MES CRUNCHYROLL FAN",
    value: "1.200 Reizu Coins",
    valueColor: "#e53935",
    subtitle: "",
    image: "https://via.placeholder.com/300x330?text=Crunchyroll+Fan"
  },
  {
    id: 3,
    title: "SUSCRIPCION 1 MES NITRO (DISCORD)",
    value: "1.400 Reizu Coins",
    valueColor: "#e53935",
    subtitle: "",
    image: "https://via.placeholder.com/300x330?text=Discord+Nitro"
  },
  {
    id: 4,
    title: "SUSCRIPCION 1 MES CRUNCHYROLL MEGA FAN",
    value: "1.600 Reizu Coins",
    valueColor: "#e53935",
    subtitle: "",
    image: "https://via.placeholder.com/300x330?text=Crunchyroll+Mega+Fan"
  },
  {
    id: 5,
    title: "SUSCRIPCION 1 MES XBOX GAME PASS ULTIMATE",
    value: "1.800 Reizu Coins",
    valueColor: "#e53935",
    subtitle: "",
    image: "https://via.placeholder.com/300x330?text=Xbox+Game+Pass"
  },
  {
    id: 6,
    title: "SUSCRIPCION 3 MES CRUNCHYROLL MEGA FAN",
    value: "1.900 Reizu Coins",
    valueColor: "#e53935",
    subtitle: "",
    image: "https://via.placeholder.com/300x330?text=Crunchyroll+Mega+Fan"
  },
  {
    id: 7,
    title: "SUSCRIPCION 1 MES XBOX GAME PASS ULTIMATE",
    value: "2.000 Reizu Coins",
    valueColor: "#e53935",
    subtitle: "",
    image: "https://via.placeholder.com/300x330?text=Xbox+Game+Pass"
  },
  {
    id: 8,
    title: "SUSCRIPCION 3 MESES CRUNCHYROLL FAN",
    value: "2.400 Reizu Coins",
    valueColor: "#e53935",
    subtitle: "",
    image: "https://via.placeholder.com/300x330?text=Crunchyroll+Fan"
  },
];

const ExchangeSection = () => {
  const [hovered, setHovered] = useState(null);

  // Detectar dark mode de Bootstrap (usa data-bs-theme)
  const isDark = document.documentElement.getAttribute("data-bs-theme") === "dark";

  return (
    <div className="container" style={{ maxWidth: 1300 }}>
      <h4 className="fw-bold mt-4 mb-4" style={{ color: "var(--bs-body-color)" }}>
        Canjea tus Reizu Coins por Productos o Servicios Externos
      </h4>
      <div className="row g-4">
        {products.map((product, idx) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-3">
            <div
              className="position-relative d-flex flex-column align-items-center"
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Imagen de fondo */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1/1.1",
                  background: product.image
                    ? `url(${product.image}) center center/cover no-repeat`
                    : isDark ? "#444" : "#d3d3d3",
                  borderRadius: 6,
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  transition: "box-shadow 0.2s",
                  boxShadow:
                    hovered === idx
                      ? "0 4px 16px 0 rgba(0,0,0,0.12)"
                      : "none",
                }}
              >
                {/* Overlay para mejorar legibilidad del botón */}
                {product.image && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(34,34,34,0.55) 60%, rgba(34,34,34,0.05) 100%)",
                      zIndex: 1,
                    }}
                  />
                )}

                {/* Botón CANJEAR solo en hover */}
                <span
                  className={`exchange-canjear-btn${hovered === idx ? " show" : ""}`}
                  style={{
                    width: "100%",
                    background: "#333",
                    color: "#fff",
                    fontSize: "1.15rem",
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
                  }}
                >
                  CANJEAR
                </span>
                <style>
                  {`
                    .exchange-canjear-btn.show {
                      opacity: 1 !important;
                      transform: translateY(0) !important;
                    }
                  `}
                </style>
              </div>
              {/* Info */}
              <div className="text-center mt-2" style={{ minHeight: 80 }}>
                <div
                  className="fw-bold"
                  style={{
                    fontSize: "0.98rem",
                    textTransform: "uppercase",
                    color: isDark ? "#fafafa" : "#222",
                  }}
                >
                  {product.title}
                </div>
                {product.subtitle && (
                  <div className="small">{product.subtitle}</div>
                )}
                <div className="small" style={{ color: isDark ? "#bbb" : "#888" }}>
                  Valor de Canje:{" "}
                  <span style={{ color: product.valueColor, fontWeight: "bold" }}>
                    {product.value}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExchangeSection;
