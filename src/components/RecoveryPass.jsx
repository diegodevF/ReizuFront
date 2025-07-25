import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import MascotaTriste from '../assets/Emotes/14.png';

const RecoveryPass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  // Validar email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Por favor ingresa tu correo electrónico');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Por favor ingresa un correo electrónico válido');
      return;
    }

    setIsLoading(true);

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('¡Enlace enviado! Revisa tu correo electrónico');
      
      // Opcional: redirigir después del éxito
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (error) {
      toast.error('Error al enviar el enlace. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center p-3"
      style={{
        backgroundColor: isDark ? '#212529' : '', // Fondo adaptativo
        }}
    >
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-5">
            
            {/* Card principal con fondo adaptativo */}
            <div 
              className="rounded-4 p-4 p-md-5 shadow-lg"
              style={{
                backgroundColor: isDark ? '#343a40' : '#ffffff', // Fondo adaptativo
                border: `1px solid ${isDark ? '#333333' : '#e9ecef'}`,
                backdropFilter: 'blur(10px)'
              }}
            >
              
              {/* Header */}
              <div className="text-center mb-4">
                <h1 
                  className="fw-bold mb-3"
                  style={{ 
                    color: '#d32f2f',
                    fontSize: '2rem'
                  }}
                >
                  Restablecer contraseña
                </h1>
                
                <p 
                  className="mb-4"
                  style={{ 
                    color: isDark ? '#ffffff' : '#495057', // Texto adaptativo
                    fontSize: '1.1rem',
                    lineHeight: '1.5'
                  }}
                >
                  Oh no ¿has perdido tu contraseña o se te olvido cual era?
                </p>

                {/* Ilustración de la mascota */}
                <div 
                  className="mx-auto mb-4"
                  style={{
                    width: '120px',
                    height: '120px',
                    backgroundColor: isDark ? '#333333' : '#f8f9fa', // Fondo adaptativo
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `3px solid ${isDark ? '#555555' : '#e9ecef'}` // Borde adaptativo
                  }}
                >
                  <img
                    src={MascotaTriste}
                    alt="Mascota triste - Contraseña olvidada"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      filter: isDark ? 'brightness(1.1)' : 'brightness(1)' // Brillo adaptativo
                    }}
                    onError={(e) => {
                      // Fallback si la imagen no carga
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  
                  {/* Fallback emoji si la imagen no carga */}
                  <div 
                    style={{ 
                      fontSize: '4rem',
                      display: 'none',
                      width: '120px',
                      height: '120px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: isDark ? '#333333' : '#f8f9fa',
                      borderRadius: '50%',
                      border: `3px solid ${isDark ? '#555555' : '#e9ecef'}`
                    }}
                  >
                    😰
                  </div>
                </div>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label 
                    htmlFor="email"
                    className="form-label fw-semibold mb-2"
                    style={{ color: isDark ? '#ffffff' : '#212529' }} // Label adaptativo
                  >
                    Ingrese el correo con el que se registró:
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control form-control-lg"
                    placeholder="ejemplo@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    style={{
                      backgroundColor: isDark ? '#333333' : '#ffffff', // Input adaptativo
                      borderColor: isDark ? '#555555' : '#ced4da',
                      color: isDark ? '#ffffff' : '#212529',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                {/* Botón de envío */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-lg w-100 fw-bold mb-4"
                  style={{
                    backgroundColor: '#d32f2f',
                    borderColor: '#d32f2f',
                    color: '#ffffff',
                    borderRadius: '12px',
                    padding: '12px',
                    fontSize: '1.1rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading) {
                      e.target.style.backgroundColor = '#b71c1c';
                      e.target.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#d32f2f';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-envelope me-2"></i>
                      Enviar contraseña
                    </>
                  )}
                </button>

                {/* Información adicional */}
                <div 
                  className="text-center p-3 rounded-3"
                  style={{
                    backgroundColor: isDark ? '#333333' : '#f8f9fa', // Fondo adaptativo
                    border: `1px solid ${isDark ? '#555555' : '#e9ecef'}` // Borde adaptativo
                  }}
                >
                  <small 
                    style={{ 
                      color: isDark ? '#cccccc' : '#6c757d', // Texto adaptativo
                      lineHeight: '1.4'
                    }}
                  >
                    En unos minutos le estara llegando a su correo el enlace para 
                    restablecer contraseña, si no le llega ningun correo puedes 
                    contactarnos en nuestro servidor de Discord o a nuestro correo 
                    de contacto{' '}
                    <a 
                      href="mailto:soporte@reizuchuu.com"
                      style={{ 
                        color: '#d32f2f',
                        textDecoration: 'none',
                        fontWeight: '600'
                      }}
                    >
                      soporte@reizuchuu.com
                    </a>
                  </small>
                </div>
              </form>

              {/* Enlaces adicionales */}
              <div className="text-center mt-4">
                <Link
                  to="/login"
                  className="text-decoration-none"
                  style={{ 
                    color: isDark ? '#ffffff' : '#495057', // Link adaptativo
                    fontSize: '0.95rem'
                  }}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Volver al inicio de sesión
                </Link>
              </div>
            </div>

            {/* Enlaces de soporte adicionales */}
            <div className="text-center mt-4">
              <div className="row g-3">
                <div className="col-6">
                  <a
                    href="#"
                    className={`btn ${isDark ? 'btn-outline-light' : 'btn-outline-secondary'} w-100`} // Clase adaptativa
                    style={{
                      borderColor: isDark ? '#ffffff' : '#6c757d', // Borde adaptativo
                      color: isDark ? '#ffffff' : '#6c757d', // Color adaptativo
                      borderRadius: '10px'
                    }}
                  >
                    <i className="bi bi-discord me-2"></i>
                    Discord
                  </a>
                </div>
                <div className="col-6">
                  <a
                    href="mailto:soporte@reizuchuu.com"
                    className={`btn ${isDark ? 'btn-outline-light' : 'btn-outline-secondary'} w-100`} // Clase adaptativa
                    style={{
                      borderColor: isDark ? '#ffffff' : '#6c757d', // Borde adaptativo
                      color: isDark ? '#ffffff' : '#6c757d', // Color adaptativo
                      borderRadius: '10px'
                    }}
                  >
                    <i className="bi bi-envelope me-2"></i>
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: isDark ? '#333' : '#fff', // Toast adaptativo
            color: isDark ? '#fff' : '#333',
          },
          success: {
            iconTheme: {
              primary: '#d32f2f',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#dc3545',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
};

export default RecoveryPass;
