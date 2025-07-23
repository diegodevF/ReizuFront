import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ImageIllus from "../assets/Portadas/MD1 - dani kube (1).png"

const CommissionOptions = () => {
  const commissions = [
    {
      id: 1,
      title: "FULL COLOR",
      titleColor: "text-danger",
      description: "¿Te gusta mi forma de dibujar y pintar? ¡POR QUE NO INTENTAR HACER ALGO TUYO! Descripción: - Fondo simple, máximo 3 objetos o decoraciones para este. - Solo 1 personaje de cuerpo completo. - Cualquier otra duda por mensaje privado.",
      delivery: "3 días",
      price: 3500,
      image: ImageIllus
    },
    {
      id: 2,
      title: "BLANCO Y NEGRO",
      titleColor: "text-danger",
      description: "¿Recuerdas esos cuadernos para colorear de niño? ¿Te imaginas tener algo parecido pero de tus dibujos? Detalles: - Escala de grises y en blanco y negro. (nada de color) - Solo un personaje cuerpo completo (cuerpo medio o cabeza máximo 2)... Leer más.",
      delivery: "15 días",
      price: 3500,
      image: ImageIllus
    },
    {
      id: 3,
      title: "FULL COLOR",
      titleColor: "text-danger",
      description: "¿Te gusta mi forma de dibujar y pintar? ¡POR QUE NO INTENTAR HACER ALGO TUYO! Descripción: - Fondo simple, máximo 3 objetos o decoraciones para este. - Solo 1 personaje de cuerpo completo. - Cualquier otra duda por mensaje privado.",
      delivery: "3 días",
      price: 3500,
      image: ImageIllus
    },
    {
      id: 4,
      title: "FULL COLOR",
      titleColor: "text-danger",
      description: "¿Te gusta mi forma de dibujar y pintar? ¡POR QUE NO INTENTAR HACER ALGO TUYO! Descripción: - Fondo simple, máximo 3 objetos o decoraciones para este. - Solo 1 personaje de cuerpo completo. - Cualquier otra duda por mensaje privado.",
      delivery: "3 días",
      price: 3500,
      image: ImageIllus
    },
    {
      id: 5,
      title: "BLANCO Y NEGRO",
      titleColor: "text-danger",
      description: "¿Recuerdas esos cuadernos para colorear de niño? ¿Te imaginas tener algo parecido pero de tus dibujos? Detalles: - Escala de grises y en blanco y negro. (nada de color) - Solo un personaje cuerpo completo (cuerpo medio o cabeza máximo 2)... Leer más.",
      delivery: "15 días",
      price: 3500,
      image: ImageIllus
    },
    {
      id: 6,
      title: "FULL COLOR",
      titleColor: "text-danger",
      description: "¿Te gusta mi forma de dibujar y pintar? ¡POR QUE NO INTENTAR HACER ALGO TUYO! Descripción: - Fondo simple, máximo 3 objetos o decoraciones para este. - Solo 1 personaje de cuerpo completo. - Cualquier otra duda por mensaje privado.",
      delivery: "3 días",
      price: 3500,
      image: ImageIllus
    }
  ];

  const handleCommissionClick = (commission) => {
    console.log(`Comisión seleccionada: ${commission.title}`);
    // Aquí puedes agregar la lógica para manejar la selección
  };

  return (
    <div className="py-5" style={{ backgroundColor: 'var(--bs-body-bg)' }}>
      <div className="container" style={{ maxWidth: '1300px' }}>
        {/* Título */}
        <div className="mb-5">
          <h2 className="fw-bold" style={{ color: 'var(--bs-body-color)', fontSize: '1.8rem' }}>
            Explora opciones de comisión
          </h2>
        </div>
        
        {/* Grid de comisiones */}
        <div className="row g-4">
          {commissions.map((commission) => (
            <div key={commission.id} className="col-lg-4 col-md-6">
              <div 
                className="h-100 p-3 rounded-3 border"
                style={{ 
                  backgroundColor: 'rgb(26,26,26)',
                  borderColor: 'var(--bs-border-color)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                onClick={() => handleCommissionClick(commission)}
              >
                {/* Imagen placeholder */}
                <div 
                  className="w-100 rounded-3 mb-3 d-flex align-items-center justify-content-center"
                  style={{ 
                    height: '200px',
                    backgroundColor: '#c0c0c0',
                    overflow: 'hidden'
                  }}
                >
                  {commission.image ? (
                    <img 
                      src={commission.image} 
                      alt={commission.title}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="text-center" style={{ color: '#6c757d' }}>
                      <i className="bi bi-palette fs-1 mb-2"></i>
                      <p className="mb-0 small">Ejemplo de comisión</p>
                    </div>
                  )}
                </div>

                {/* Título */}
                <h5 className={`fw-bold mb-2 ${commission.titleColor}`}>
                  {commission.title}
                </h5>

                {/* Descripción */}
                <p 
                  className="mb-3 small"
                  style={{ 
                    color: 'var(--bs-body-color)',
                    lineHeight: '1.4',
                    fontSize: '0.9rem'
                  }}
                >
                  {commission.description}
                </p>

                {/* Información de entrega y precio */}
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="small fw-bold" style={{ color: 'var(--bs-body-color)' }}>
                      Entrega: <span className="text-muted">{commission.delivery}</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="fw-bold me-2" style={{ color: 'var(--bs-body-color)' }}>
                      Precio:
                    </span>
                    <span className="fw-bold text-warning me-1" style={{ fontSize: '1.1rem' }}>
                      {commission.price}
                    </span>
                    <i className="bi bi-coin text-warning" style={{ fontSize: '1.2rem' }}></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommissionOptions;
