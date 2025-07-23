import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../admin/components/Sidebar'; // Asegúrate de que la ruta sea correcta
import { Link } from 'react-router-dom';

const Subscriptions = () => {
  const [theme, setTheme] = useState('light');
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

  // Datos exactos de la imagen
  const subscriptionPlans = [
    {
      id: 1,
      title: "Eres un pepinillo",
      price: "3 USD",
      period: "por mes",
      members: "Atoli 200 horas Coins",
      features: [
        "Tip jar!",
        "Clothed (or at least mostly) NSFW animations",
        "High resolution files",
        "High Resolution Files",
        "Discord access"
      ]
    },
    {
      id: 2,
      title: "Eres un pepinillo",
      price: "5 USD",
      period: "por mes",
      members: "2200 Miembros",
      features: [
        "Tip jar!",
        "Clothed (or at least mostly) NSFW animations",
        "High resolution files",
        "High Resolution Files",
        "Discord access"
      ]
    },
    {
      id: 3,
      title: "Eres un pepinillo",
      price: "10 USD",
      period: "por mes",
      members: "",
      features: [
        "Tip jar!",
        "Clothed (or at least mostly) NSFW animations",
        "High resolution files",
        "High Resolution Files",
        "Discord access"
      ]
    },
    {
      id: 4,
      title: "Eres un pepinillo",
      price: "10 USD",
      period: "por mes",
      members: "",
      features: [
        "Tip jar!",
        "Clothed (or at least mostly) NSFW animations",
        "High resolution files",
        "High Resolution Files",
        "Discord access"
      ]
    }
  ];

  return (
    <div className="d-flex">
      {/* Overlay SOLO en móviles */}
      <div 
        className="sidebar-overlay d-md-none"
        style={{
          display: sidebarOpen ? 'block' : 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.5)',
          zIndex: 1040,
          transition: 'opacity 0.3s',
          opacity: sidebarOpen ? 1 : 0,
          pointerEvents: sidebarOpen ? 'auto' : 'none'
        }}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />

      {/* Botón flotante para abrir la sidebar si está cerrada */}
      {!sidebarOpen && (
        <button
          className="btn btn-dark position-fixed"
          style={{
            top: 10,
            left: 0,
            zIndex: 2000,
            borderRadius: '0% 50% 50% 0%',
            width: 34,
            height: 34,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => setSidebarOpen(true)}
        >
          <i className="bi bi-chevron-right" style={{ fontSize: 22 }}></i>
        </button>
      )}

      {/* Contenido principal */}
      <div
        className="flex-grow-1"
        style={{
          marginLeft: sidebarOpen ? "280px" : "0",
          transition: "margin-left 0.3s",
          minHeight: "100vh",
          background: "#ededed"
        }}
      >
        {/* Contenido de Subscriptions */}
        <div 
          className="container-fluid p-4"
          style={{
            backgroundColor: isDark ? '#2a2a2a' : '#d5d5d5',
            minHeight: '100vh'
          }}
        >
          {/* Header exacto de la imagen */}
          <div className="d-flex align-items-center justify-content-start mb-4">
            <h2 
              className="fw-bold me-4 mb-0"
              style={{ 
                color: isDark ? '#ffffff' : '#333333',
                fontSize: '1.5rem'
              }}
            >
              Gestionar Suscripciones
            </h2>
            
            <Link 
              to="/Admin/AddSubscription"
              className="btn"
              style={{
                backgroundColor: 'transparent',
                border: '2px solid #333333',
                color: isDark ? '#ffffff' : '#333333',
                fontSize: '1rem',
                padding: '8px 24px',
                fontWeight: '400'
              }}
            >
              Nueva Suscripción
            </Link>
          </div>

          {/* Grid de 4 tarjetas */}
          <div className="row g-3">
            {subscriptionPlans.map((plan) => (
              <div key={plan.id} className="col-12 col-md-6 col-lg-3">
                <div 
                  className="card h-100"
                  style={{
                    backgroundColor: isDark ? '#3a3a3a' : '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  {/* Rectángulo gris placeholder */}
                  <div 
                    style={{
                      height: '100px',
                      backgroundColor: '#808080',
                      borderTopLeftRadius: '8px',
                      borderTopRightRadius: '8px'
                    }}
                  ></div>

                  <div className="card-body p-3">
                    {/* Título rojo */}
                    <h5 
                      className="card-title mb-1"
                      style={{ 
                        color: '#dc3545',
                        fontSize: '1rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {plan.title}
                    </h5>

                    {/* Precio y período */}
                    <div className="mb-1">
                      <span 
                        className="fw-bold"
                        style={{ 
                          fontSize: '1.1rem',
                          color: isDark ? '#ffffff' : '#000000'
                        }}
                      >
                        {plan.price}
                      </span>
                      <small 
                        className="ms-2"
                        style={{ color: isDark ? '#cccccc' : '#666666' }}
                      >
                        {plan.period}
                      </small>
                    </div>

                    {/* Información de miembros */}
                    {plan.members && (
                      <small 
                        className="d-block mb-2"
                        style={{ color: isDark ? '#cccccc' : '#666666' }}
                      >
                        {plan.members}
                      </small>
                    )}

                    {/* Lista de características con bullets */}
                    <ul 
                      className="list-unstyled mb-3"
                      style={{ fontSize: '0.85rem' }}
                    >
                      {plan.features.map((feature, index) => (
                        <li 
                          key={index}
                          className="mb-1"
                          style={{ color: isDark ? '#cccccc' : '#333333' }}
                        >
                          <span 
                            className="me-2"
                            style={{ 
                              color: isDark ? '#ffffff' : '#000000',
                              fontWeight: 'bold'
                            }}
                          >
                            •
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Botón Gestionar rojo */}
                    <Link
                      to="/Admin/AddSubscription"
                      className="btn w-100"
                      style={{
                        backgroundColor: '#dc3545',
                        borderColor: '#dc3545',
                        color: '#ffffff',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        padding: '8px',
                        borderRadius: '4px'
                      }}
                    >
                      Gestionar
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
