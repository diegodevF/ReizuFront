import React, { useState } from 'react';
import Navbar from '../components/Navbar';         // Ajusta la ruta según tu estructura
import StoreNavbar from '../components/StoreNavbar';
import Footer from '../components/Footer';
import 'bootstrap-icons/font/bootstrap-icons.css';

const commissions = [
  {
    id: 1,
    title: "FULL COLOR",
    description: "¿Te gusta mi forma de dibujar y pintar? ¡POR QUÉ NO INTENTAR HACER ALGO TUYO! Fondo simple, máximo 3 objetos o decoraciones.",
    delivery: "3 días",
    price: 3500,
    image: null,
  },
  {
    id: 2,
    title: "BLANCO Y NEGRO",
    description: "¿Recuerdas esos cuadernos para colorear de niño? ¿Te imaginas tener algo parecido pero de tus dibujos? Escala de grises y en blanco y negro.",
    delivery: "15 días",
    price: 3500,
    image: null,
  },
  // ...agrega más comisiones aquí
  {
    id: 3,
    title: "PIXEL ART",
    description: "Revive la nostalgia de los videojuegos retro con una ilustración en pixel art. Ideal para los amantes de lo vintage.",
    delivery: "7 días",
    price: 4000,
    image: null,
  },
  {
    id: 4,
    title: "DISEÑO DE PERSONAJE",
    description: "Crea un personaje único para tu historia o juego. Incluye diseño de vestuario y accesorios.",
    delivery: "10 días",
    price: 5000,
    image: null,
  },
];

const types = ["Todos", "Ilustración", "PixelArt", "Diseño"];
const artists = ["Todos los artistas", "Suzaku", "Otro artista"];
const deliveries = ["Cualquier entrega", "3 días", "15 días"];

const CommissionPage = () => {
  const [selectedType, setSelectedType] = useState("Todos");
  const [selectedArtist, setSelectedArtist] = useState("Todos los artistas");
  const [selectedDelivery, setSelectedDelivery] = useState("Cualquier entrega");
  const [search, setSearch] = useState("");

  // Filtro por tipo, artista, entrega y búsqueda
  const filtered = commissions.filter((c) =>
    (selectedType === "Todos" || c.title.toLowerCase().includes(selectedType.toLowerCase())) &&
    (selectedArtist === "Todos los artistas" || (c.artist && c.artist === selectedArtist)) &&
    (selectedDelivery === "Cualquier entrega" || c.delivery === selectedDelivery) &&
    (c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <Navbar />
      <StoreNavbar />
      <div className="py-5" style={{ backgroundColor: 'var(--bs-body-bg)' }}>
        <div className="container" style={{ maxWidth: '1300px' }}>
          {/* Filtros y búsqueda */}
          <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-2">
            <div className="d-flex gap-2 flex-wrap">
              <select className="form-select form-select-sm"
                style={{ minWidth: 140, background: 'var(--bs-secondary-bg)', color: 'var(--bs-body-color)', border: '1.5px solid var(--bs-border-color)' }}
                value={selectedType}
                onChange={e => setSelectedType(e.target.value)}
              >
                {types.map(type => <option key={type}>{type}</option>)}
              </select>
              <select className="form-select form-select-sm"
                style={{ minWidth: 140, background: 'var(--bs-secondary-bg)', color: 'var(--bs-body-color)', border: '1.5px solid var(--bs-border-color)' }}
                value={selectedArtist}
                onChange={e => setSelectedArtist(e.target.value)}
              >
                {artists.map(artist => <option key={artist}>{artist}</option>)}
              </select>
              <select className="form-select form-select-sm"
                style={{ minWidth: 140, background: 'var(--bs-secondary-bg)', color: 'var(--bs-body-color)', border: '1.5px solid var(--bs-border-color)' }}
                value={selectedDelivery}
                onChange={e => setSelectedDelivery(e.target.value)}
              >
                {deliveries.map(delivery => <option key={delivery}>{delivery}</option>)}
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
                  style={{ color: "var(--bs-danger)", fontSize: "1.1rem", pointerEvents: "none" }}
                />
              </div>
              <button className="btn btn-danger btn-sm rounded-pill px-3" type="submit">
                Buscar
              </button>
            </form>
          </div>

          {/* Título */}
          <div className="mb-5">
            <h2 className="fw-bold" style={{ color: 'var(--bs-body-color)', fontSize: '1.8rem' }}>
              Explora opciones de comisión
            </h2>
          </div>
          
          {/* Grid de comisiones */}
          <div className="row g-4">
            {filtered.map((commission) => (
              <div key={commission.id} className="col-lg-4 col-md-6">
                <div
                  className="rounded-4 p-3 h-100"
                  style={{
                    background: "var(--bs-secondary-bg, #23272b)",
                    border: "1.5px solid var(--bs-border-color, #33384b)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                    transition: "box-shadow 0.25s, transform 0.25s",
                    cursor: "pointer"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.15)';
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = '';
                    e.currentTarget.style.transform = '';
                  }}
                >
                  {/* Imagen/placeholder */}
                  <div
                    className="rounded-3 d-flex flex-column align-items-center justify-content-center mb-3"
                    style={{
                      height: 170,
                      background: "#bfc1c4",
                      color: "#6c757d"
                    }}
                  >
                    {commission.image ? (
                      <img
                        src={commission.image}
                        alt={commission.title}
                        className="w-100 h-100"
                        style={{ objectFit: "cover", borderRadius: 12 }}
                      />
                    ) : (
                      <>
                        <i className="bi bi-palette fs-1 mb-2" />
                        <div className="small" style={{ color: "#888" }}>Ejemplo de comisión</div>
                      </>
                    )}
                  </div>
                  {/* Título */}
                  <div
                    className="fw-bold mb-2"
                    style={{
                      color: "#dc3545",
                      fontSize: "1.13rem",
                      letterSpacing: "0.5px"
                    }}
                  >
                    {commission.title}
                  </div>
                  {/* Descripción */}
                  <div className="mb-3" style={{
                    color: "var(--bs-body-color)",
                    fontSize: "0.97rem",
                    whiteSpace: "pre-line"
                  }}>
                    {commission.description}
                  </div>
                  {/* Entrega y precio */}
                  <div className="d-flex justify-content-between align-items-center mt-auto pt-2">
                    <span style={{ color: "var(--bs-body-color)", fontWeight: 700 }}>
                      Entrega: <span style={{ color: "#fff" }}>{commission.delivery}</span>
                    </span>
                    <span style={{ color: "#ffc107", fontWeight: 700, fontSize: "1.1rem" }}>
                      Precio: <span style={{ fontSize: "1.18rem" }}>{commission.price}</span> <i className="bi bi-coin" />
                    </span>
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

export default CommissionPage;
