import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import Img from "../assets/dragon.png";
import Navbar from '../components/Navbar';

// Hook para detectar el tema Bootstrap
function useBootstrapTheme() {
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-bs-theme") || "light"
  );
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-bs-theme") || "light");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-bs-theme'] });
    return () => observer.disconnect();
  }, []);
  return theme;
}

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const theme = useBootstrapTheme();
  const isDark = theme === "dark";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
  };

  // Paleta para dark mode
  const darkBg = "#121212";
  const darkCard = "#181818";
  const darkInput = "#232323";
  const darkText = "#fff";
  const accentRed = "#FF2323";
  const mutedText = "#bdbdbd";

  return (
    <>
      <Navbar />
      <div className="d-flex vh-100" style={{ background: isDark ? darkBg : "#f8f9fa" }}>
        {/* Imagen izquierda */}
        <div className="d-none d-md-block w-50">
          <img
            src={Img}
            alt="Arte de inicio"
            className="w-100 h-100"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Formulario derecho */}
        <div
          className={`d-flex justify-content-center align-items-center w-100`}
          style={{
            background: isDark ? darkBg : "#f8f9fa",
            filter: isDark ? "drop-shadow(0 0 0.75rem #FF2323)" : "drop-shadow(0 0 0.75rem crimson)"
          }}
        >
          <div
            className="p-4 rounded-4 shadow-sm"
            style={{
              maxWidth: '600px',
              width: '100%',
              background: isDark ? darkCard : "#fff",
              color: isDark ? darkText : "#222",
              borderRadius: "18px",
              boxShadow: isDark ? "0 4px 24px #000a" : "0 4px 24px #0001"
            }}
          >
            <h3
              className="text-center fw-bold"
              style={{ color: accentRed, letterSpacing: "1px" }}
            >
              Iniciar sesión
            </h3>
            <p className={`text-center small mb-4 ${isDark ? "text-light" : "text-muted"}`}>
              Para una mayor experiencia disfrutando de buenas historias
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label" style={{ color: isDark ? darkText : "#222" }}>
                  Usuario o Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  style={{
                    background: isDark ? darkInput : "#fff",
                    color: isDark ? "#fff" : "#222",
                    borderColor: isDark ? "#333" : "#ced4da"
                  }}
                  placeholder="Escribir su usuario o correo..."
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-2">
                <label htmlFor="password" className="form-label" style={{ color: isDark ? darkText : "#222" }}>
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  style={{
                    background: isDark ? darkInput : "#fff",
                    color: isDark ? "#fff" : "#222",
                    borderColor: isDark ? "#333" : "#ced4da"
                  }}
                  placeholder="Ingresa tu contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <label className="form-check-label small" htmlFor="rememberMe" style={{ color: isDark ? mutedText : "#222" }}>
                    Recuérdame
                  </label>
                </div>
                <a href="#" className="small text-decoration-none" style={{ color: accentRed }}>
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button
                type="submit"
                className="btn w-100 fw-bold"
                style={{
                  background: accentRed,
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "1.1rem",
                  boxShadow: isDark ? "0 2px 8px #ff232340" : "none"
                }}
              >
                Ingresar
              </button>

              <div className="text-center mt-4 mb-3" style={{ color: isDark ? mutedText : "#888" }}>
                O inicia sesión con
              </div>

              <div className="d-flex justify-content-center gap-3 mb-3">
                <button type="button" className="btn btn-outline-secondary rounded-circle" style={{
                  borderColor: isDark ? "#444" : "#ced4da", color: isDark ? "#fff" : "#222"
                }} title="Facebook">
                  <i className="bi bi-facebook"></i>
                </button>
                <button type="button" className="btn btn-outline-secondary rounded-circle" style={{
                  borderColor: isDark ? "#444" : "#ced4da", color: isDark ? "#fff" : "#222"
                }} title="Google">
                  <i className="bi bi-google"></i>
                </button>
                <button type="button" className="btn btn-outline-secondary rounded-circle" style={{
                  borderColor: isDark ? "#444" : "#ced4da", color: isDark ? "#fff" : "#222"
                }} title="X">
                  <i className="bi bi-twitter-x"></i>
                </button>
              </div>

              <div className="text-center small" style={{ color: isDark ? darkText : "#222" }}>
                ¿No tienes una Cuenta?{' '}
                <a href="#" className="fw-bold text-decoration-none" style={{ color: accentRed }}>
                  Registrarse
                </a>
              </div>

              <div className="text-center mt-3 small" style={{ color: isDark ? mutedText : "#888" }}>
                Si tienes algún problema para iniciar sesión o registrarte, puedes contactarnos en nuestro servidor de{' '}
                <a href="#" className="text-primary text-decoration-none">Discord</a> o al correo{' '}
                <a href="mailto:soporte@reizucomics.com" className="text-decoration-none" style={{ color: accentRed }}>
                  soporte@reizucomics.com
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
