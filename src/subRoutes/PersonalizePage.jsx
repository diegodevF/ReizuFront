import React, { useState } from 'react';
import Navbar from '../components/Navbar';         // Ajusta la ruta según tu estructura
import StoreNavbar from '../components/StoreNavbar'; // Ajusta la ruta según tu estructura
import Footer from '../components/Footer';         // Ajusta la ruta según tu estructura
import 'bootstrap-icons/font/bootstrap-icons.css';

const products = [
  {
    id: 1,
    name: "¡Alto!",
    type: "Sticker",
    price: 300,
    image: null,
  },
  {
    id: 2,
    name: "Interesante",
    type: "Sticker",
    price: 300,
    image: null,
  },
  {
    id: 3,
    name: "Drangocito azul",
    type: "Marco",
    price: 1300,
    image: null,
  },
  {
    id: 4,
    name: "Esquizofrenia",
    type: "Banner",
    price: 1300,
    image: null,
  },
  {
    id: 5,
    name: "¡Alto!",
    type: "Sticker",
    price: 300,
    image: null,
  },
  {
    id: 6,
    name: "Interesante",
    type: "Comisión",
    price: 1300,
    image: null,
  },
  {
    id: 7,
    name: "Drangocito azul",
    type: "Marco",
    price: 1300,
    image: null,
  },
  {
    id: 8,
    name: "Esquizofrenia",
    type: "Banner",
    price: 1300,
    image: null,
  }
];

const types = ["Todos", "Sticker", "Banner", "Marco", "Comisión"];

const PersonalizePage = () => {
  const [selectedType, setSelectedType] = useState("Todos");
  const [search, setSearch] = useState("");

  // Filtro por tipo y búsqueda
  const filtered = products.filter((p) =>
    (selectedType === "Todos" || p.type.toLowerCase() === selectedType.toLowerCase()) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.type.toLowerCase().includes(search.toLowerCase()))
  );

  // Colores de badge adaptados a dark mode usando Bootstrap variables
  const getTypeColor = (type) => {
    switch (type) {
      case 'Sticker': return 'bg-success';
      case 'Banner': return 'bg-danger';
      case 'Marco': return 'bg-primary';
      case 'Comisión': return 'bg-warning text-dark';
      default: return 'bg-secondary';
    }
  };

  const handlePurchase = (product) => {
    console.log(`Comprando ${product.name} por ${product.price} monedas`);
    // Aquí puedes agregar la lógica de compra
  };

  return (
    <>
      <Navbar />
      <StoreNavbar />
      <div className="py-5" style={{ background: 'var(--bs-body-bg)' }}>
        <div className="container" style={{ maxWidth: '1300px' }}>
          <div className="text-center mb-5">
            <h2 className="fw-bold"
              style={{
                color: 'var(--bs-body-color)',
                fontSize: '2rem',
                letterSpacing: '1px'
              }}>
              Artículos Personalizados
            </h2>
          </div>

          {/* Filtros y búsqueda */}
          <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-2">
            <div className="d-flex flex-wrap gap-3 align-items-center">
              {types.map((type) => (
                <button
                  key={type}
                  className="btn btn-link p-0 fw-bold"
                  style={{
                    color: selectedType === type ? "var(--bs-danger)" : "var(--bs-body-color)",
                    textDecoration: selectedType === type ? "underline" : "none",
                    fontWeight: selectedType === type ? 700 : 500,
                    fontSize: "1rem"
                  }}
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
            {/* Input de búsqueda moderno */}
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

          <div className="row g-4">
            {filtered.map((product) => (
              <div key={product.id} className="col-lg-3 col-md-6 col-sm-6">
                <div className="text-center position-relative">
                  {/* Etiqueta tipo arriba */}
                  <span
                    className={`position-absolute top-0 start-50 translate-middle-x badge ${getTypeColor(product.type)} px-3 py-1 rounded-pill fw-bold`}
                    style={{ zIndex: 4, fontSize: '0.85rem', marginTop: '-12px' }}
                  >
                    {product.type}
                  </span>

                  <div 
                    className="rounded-3 mb-3 mx-auto d-flex align-items-center justify-content-center"
                    style={{ 
                      height: '180px', 
                      width: '180px',
                      backgroundColor: 'var(--bs-secondary-bg, #23272b)',
                      border: '2px solid var(--bs-border-color)',
                      overflow: 'hidden'
                    }}
                  >
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-100 h-100"
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="text-center" style={{ color: 'var(--bs-secondary-color)' }}>
                        <i className="bi bi-image fs-1 mb-2"></i>
                        <p className="mb-0 small">Imagen del producto</p>
                      </div>
                    )}
                  </div>
                  
                  <h6 className="fw-bold mb-3" style={{ color: 'var(--bs-body-color)' }}>
                    {product.name}
                  </h6>
                  
                  <button 
                    className="btn btn-danger w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                    onClick={() => handlePurchase(product)}
                    style={{ fontSize: '0.95rem' }}
                  >
                    <i className="bi bi-coin text-warning"></i>
                    <span className="fw-bold">{product.price}</span>
                    <i className="bi bi-bag-fill"></i>
                    <span className="fw-bold">COMPRAR</span>
                  </button>
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

export default PersonalizePage;
