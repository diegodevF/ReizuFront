import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SubscriptionPlans = () => {
  const [theme, setTheme] = useState('light');

  // Función para obtener el tema actual
  const getTheme = () => {
    if (typeof document !== "undefined") {
      return document.documentElement.getAttribute("data-bs-theme") || "light";
    }
    return "light";
  };

  // Observer para detectar cambios de tema
  useEffect(() => {
    setTheme(getTheme());
    
    const observer = new MutationObserver(() => {
      setTheme(getTheme());
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-bs-theme']
    });
    
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  // Datos de los planes de suscripción
  const subscriptionPlans = [
    {
      id: 1,
      title: "Eres un pepinillo",
      price: 3,
      currency: "USD",
      period: "por mes",
      features: [
        "Tip jar!",
        "Clothed (or at least mostly) NSFW animations",
        "High resolution files",
        "Discord access"
      ],
      isPopular: false
    },
    {
      id: 2,
      title: "Eres un pepinillo",
      price: 5,
      currency: "USD", 
      period: "por mes",
      features: [
        "Tip jar!",
        "Clothed (or at least mostly) NSFW animations", 
        "High resolution files",
        "High Resolution Files",
        "Discord access"
      ],
      isPopular: true
    },
    {
      id: 3,
      title: "Eres un pepinillo",
      price: 10,
      currency: "USD",
      period: "por mes", 
      features: [
        "Tip jar!",
        "Clothed (or at least mostly) NSFW animations",
        "High resolution files", 
        "High Resolution Files",
        "Discord access"
      ],
      isPopular: false
    }
  ];

  const PlanCard = ({ plan }) => (
    <div className="col-12 col-md-4 mb-4">
      <div 
        className="card h-100 position-relative"
        style={{
          backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
          border: plan.isPopular 
            ? '3px solid #d32f2f' 
            : `1px solid ${isDark ? '#444444' : '#e0e0e0'}`,
          borderRadius: '16px',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = isDark 
            ? '0 12px 30px rgba(0,0,0,0.4)' 
            : '0 12px 30px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = isDark 
            ? '0 4px 15px rgba(0,0,0,0.2)' 
            : '0 4px 15px rgba(0,0,0,0.1)';
        }}
      >
        {/* Badge "Más Popular" */}
        {plan.isPopular && (
          <div 
            className="position-absolute top-0 start-50 translate-middle"
            style={{
              backgroundColor: '#d32f2f',
              color: '#ffffff',
              padding: '6px 20px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              zIndex: 1
            }}
          >
            MÁS POPULAR
          </div>
        )}

        {/* Imagen placeholder */}
        <div 
          style={{
            height: '120px',
            backgroundColor: isDark ? '#404040' : '#8a8a8a',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            marginTop: plan.isPopular ? '15px' : '0'
          }}
        ></div>

        <div className="card-body p-4 d-flex flex-column">
          {/* Título del plan */}
          <h5 
            className="card-title fw-bold text-center mb-3"
            style={{ 
              color: plan.isPopular ? '#d32f2f' : (isDark ? '#ffffff' : '#212529'),
              fontSize: '1.2rem'
            }}
          >
            {plan.title}
          </h5>

          {/* Precio */}
          <div className="text-center mb-4">
            <div 
              className="fw-bold"
              style={{ 
                fontSize: '2rem',
                color: isDark ? '#ffffff' : '#212529'
              }}
            >
              {plan.price} {plan.currency}
            </div>
            <small 
              style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}
            >
              {plan.period}
            </small>
          </div>

          {/* Lista de características */}
          <ul 
            className="list-unstyled mb-4 flex-grow-1"
            style={{ fontSize: '0.9rem' }}
          >
            {plan.features.map((feature, index) => (
              <li 
                key={index}
                className="d-flex align-items-start mb-2"
                style={{ color: isDark ? '#cccccc' : '#495057' }}
              >
                <i 
                  className="bi bi-check-circle-fill me-2 flex-shrink-0"
                  style={{ 
                    color: '#28a745',
                    fontSize: '1rem',
                    marginTop: '2px'
                  }}
                ></i>
                {feature}
              </li>
            ))}
          </ul>

          {/* Botón de suscripción */}
          <button 
            className="btn btn-danger w-100 fw-bold"
            style={{
              background: plan.isPopular 
                ? 'linear-gradient(45deg, #d32f2f, #e53935)'
                : '#d32f2f',
              border: 'none',
              fontSize: '1rem',
              padding: '12px',
              borderRadius: '12px',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 20px rgba(211, 47, 47, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Obtener
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className="rounded p-4 mt-3"
      style={{
        backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
        borderColor: isDark ? '#333333' : '#dee2e6',
        boxShadow: isDark ? '0 2px 10px rgba(0,0,0,0.3)' : '0 2px 10px rgba(0,0,0,0.1)',
        border: `1px solid ${isDark ? '#333333' : '#dee2e6'}`,
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
    >
      {/* Header */}
      <div className="text-center mb-5">
        <h4 
          className="fw-bold mb-3"
          style={{ 
            color: isDark ? '#ffffff' : '#212529',
            fontSize: '1.8rem'
          }}
        >
          <i className="bi bi-star-fill text-warning me-2"></i>
          Planes de Suscripción
        </h4>
        <p 
          className="mb-0"
          style={{ 
            color: isDark ? '#b3b3b3' : '#6c757d',
            fontSize: '1rem',
            maxWidth: '600px',
            margin: '0 auto'
          }}
        >
          Apoya al creador y obtén acceso exclusivo a contenido premium, 
          archivos de alta resolución y beneficios especiales.
        </p>
      </div>

      {/* Grid de planes */}
      <div className="row justify-content-center">
        {subscriptionPlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>

      {/* Footer informativo */}
      <div 
        className="text-center mt-4 p-3 rounded"
        style={{
          backgroundColor: isDark 
            ? 'rgba(42, 42, 42, 0.5)' 
            : 'rgba(248, 249, 250, 0.8)',
          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`
        }}
      >
        <small 
          style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}
        >
          <i className="bi bi-shield-check me-1"></i>
          Pagos seguros • Cancela en cualquier momento • Soporte 24/7
        </small>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
