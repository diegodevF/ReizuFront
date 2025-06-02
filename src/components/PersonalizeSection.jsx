import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const PersonalizeSection = () => {
  const products = [
    // Primera fila
    {
      id: 1,
      name: "¡Alto!",
      price: 300,
      type: "Sticker",
      image: null // Aquí puedes poner la ruta de la imagen
    },
    {
      id: 2,
      name: "Interesante",
      price: 300,
      type: "Sticker",
      image: null
    },
    {
      id: 3,
      name: "Drangocito azul",
      price: 1300,
      type: "Marco",
      image: null
    },
    {
      id: 4,
      name: "Esquizofrenia",
      price: 1300,
      type: "Banner",
      image: null
    },
    // Segunda fila
    {
      id: 5,
      name: "¡Alto!",
      price: 300,
      type: "Sticker",
      image: null
    },
    {
      id: 6,
      name: "Interesante",
      price: 1300,
      type: "Comisión",
      image: null
    },
    {
      id: 7,
      name: "Drangocito azul",
      price: 1300,
      type: "Marco",
      image: null
    },
    {
      id: 8,
      name: "Esquizofrenia",
      price: 1300,
      type: "Banner",
      image: null
    }
  ];

  const handlePurchase = (product) => {
    console.log(`Comprando ${product.name} por ${product.price} monedas`);
    // Aquí puedes agregar la lógica de compra
  };

  // Función para asignar colores según el tipo
  const getTypeColor = (type) => {
    switch (type) {
      case 'Sticker': return 'bg-success';
      case 'Banner': return 'bg-danger';
      case 'Marco': return 'bg-primary';
      case 'Comisión': return 'bg-warning text-dark';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="py-5" style={{ backgroundColor: 'var(--bs-body-bg)' }}>
      <div className="container" style={{ maxWidth: '1300px' }}>
        <div className="text-center mb-5">
          <h2 className="fw-bold" style={{ color: 'var(--bs-body-color)', fontSize: '2rem' }}>
            Personaliza tu experiencia
          </h2>
        </div>
        
        <div className="row g-4">
          {products.map((product) => (
            <div key={product.id} className="col-lg-3 col-md-6 col-sm-6">
              <div className="text-center position-relative">
                {/* Etiqueta tipo arriba */}
                <span
                  className={`position-absolute top-0 start-50 translate-middle-x badge ${getTypeColor(product.type)} text-white px-3 py-1 rounded-pill fw-bold`}
                  style={{ zIndex: 4, fontSize: '0.85rem', marginTop: '-12px' }}
                >
                  {product.type}
                </span>

                <div 
                  className="rounded-3 mb-3 mx-auto d-flex align-items-center justify-content-center"
                  style={{ 
                    height: '180px', 
                    width: '180px',
                    backgroundColor: '#f8f9fa',
                    border: '2px solid #e9ecef',
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
                    <div className="text-center" style={{ color: '#6c757d' }}>
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
        </div>
      </div>
    </div>
  );
};

export default PersonalizeSection;
