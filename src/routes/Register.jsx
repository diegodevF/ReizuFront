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

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    alias: '',
    password: '',
    repeatPassword: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  const theme = useBootstrapTheme();
  const isDark = theme === "dark";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Requerido";
    if (!formData.alias) newErrors.alias = "Requerido";
    if (!formData.password) newErrors.password = "Requerido";
    if (!formData.repeatPassword) newErrors.repeatPassword = "Requerido";
    if (formData.password !== formData.repeatPassword) newErrors.repeatPassword = "Las contraseñas no coinciden";
    if (!formData.email) newErrors.email = "Requerido";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Lógica de registro aquí
      console.log('Datos enviados:', formData);
    }
  };

  // Paleta de colores para dark mode
  const darkBg = "#121212";
  const darkCard = "#181818";
  const darkInput = "#232323";
  const darkText = "#fff";
  const accentRed = "#FF2323";
  const accentRedHover = "#ff4e4e";
  const mutedText = "#bdbdbd";

  return (
    <>
      <Navbar />
      <div
        className="d-flex vh-100"
        style={{
          background: isDark ? darkBg : "#e0e0e0",
        }}
      >
        {/* Formulario */}
        <div className="d-flex justify-content-center align-items-center w-100 w-md-50" style={{ minHeight: "100vh" }}>
          <div
            className="p-4 rounded-4 shadow-sm"
            style={{
              maxWidth: '700px',
              width: '100%',
              background: isDark ? darkCard : "#fff",
              color: isDark ? darkText : "#222",
              borderRadius: "18px",
              boxShadow: isDark ? "0 4px 24px #000a" : "0 4px 24px #0001"
            }}
          >
            <h2
              className="text-center fw-bold mb-0"
              style={{
                color: accentRed,
                letterSpacing: "1px"
              }}
            >
              Registrarse
            </h2>
            <p className="text-center mb-4 mt-1" style={{ color: isDark ? "#fff" : "#222" }}>
              Bienvenido a la mejor experiencia de lectura de Obras en español
            </p>

            <form onSubmit={handleSubmit}>
              <div className="row g-2">
                <div className="col-12 col-md-6 mb-2">
                  <label className="form-label small" style={{ color: isDark ? darkText : "#222" }}>
                    Usuario <span style={{ color: accentRed }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    className={`form-control ${errors.username ? "is-invalid" : ""}`}
                    style={{
                      background: isDark ? darkInput : "#fff",
                      color: isDark ? "#fff" : "#222",
                      borderColor: isDark ? "#333" : "#ced4da"
                    }}
                    placeholder="Escribir un nombre de usuario"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                  {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                </div>
                <div className="col-12 col-md-6 mb-2">
                  <label className="form-label small" style={{ color: isDark ? darkText : "#222" }}>
                    Alias / Seudonimo
                  </label>
                  <input
                    type="text"
                    name="alias"
                    className={`form-control ${errors.alias ? "is-invalid" : ""}`}
                    style={{
                      background: isDark ? darkInput : "#fff",
                      color: isDark ? "#fff" : "#222",
                      borderColor: isDark ? "#333" : "#ced4da"
                    }}
                    placeholder="Nombre de autor o alias"
                    value={formData.alias}
                    onChange={handleChange}
                    required
                  />
                  {errors.alias && <div className="invalid-feedback">{errors.alias}</div>}
                </div>
                <div className="col-12 col-md-6 mb-2">
                  <label className="form-label small" style={{ color: isDark ? darkText : "#222" }}>
                    Contraseña <span style={{ color: accentRed }}>*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    style={{
                      background: isDark ? darkInput : "#fff",
                      color: isDark ? "#fff" : "#222",
                      borderColor: isDark ? "#333" : "#ced4da"
                    }}
                    placeholder="Ingresa tu contraseña..."
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <div className="col-12 col-md-6 mb-2">
                  <label className="form-label small" style={{ color: isDark ? darkText : "#222" }}>
                    Repetir contraseña <span style={{ color: accentRed }}>*</span>
                  </label>
                  <input
                    type="password"
                    name="repeatPassword"
                    className={`form-control ${errors.repeatPassword ? "is-invalid" : ""}`}
                    style={{
                      background: isDark ? darkInput : "#fff",
                      color: isDark ? "#fff" : "#222",
                      borderColor: isDark ? "#333" : "#ced4da"
                    }}
                    placeholder="Ingresa tu contraseña nuevamente..."
                    value={formData.repeatPassword}
                    onChange={handleChange}
                    required
                  />
                  {errors.repeatPassword && <div className="invalid-feedback">{errors.repeatPassword}</div>}
                </div>
                <div className="col-12 mb-2">
                  <label className="form-label small" style={{ color: isDark ? darkText : "#222" }}>
                    Correo electrónico <span style={{ color: accentRed }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    style={{
                      background: isDark ? darkInput : "#fff",
                      color: isDark ? "#fff" : "#222",
                      borderColor: isDark ? "#333" : "#ced4da"
                    }}
                    placeholder="Escribe tu correo electrónico..."
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
              </div>

              <button
                type="submit"
                className="btn w-100 fw-bold mt-3 mb-2"
                style={{
                  fontSize: "1.1rem",
                  background: accentRed,
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  boxShadow: isDark ? "0 2px 8px #ff232340" : "none",
                  transition: "background 0.2s"
                }}
                onMouseOver={e => { if (isDark) e.target.style.background = accentRedHover }}
                onMouseOut={e => { if (isDark) e.target.style.background = accentRed }}
              >
                Registrarse
              </button>
            </form>

            <div className="text-center mt-3 mb-2" style={{ color: isDark ? mutedText : "#888" }}>
              O regístrate usando
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

            <div className="text-center small mb-2" style={{ color: isDark ? darkText : "#222" }}>
              ¿Ya tienes una cuenta?{' '}
              <a href="#" className="fw-bold text-decoration-none" style={{ color: accentRed }}>
                Inicia Sesión
              </a>
            </div>

            <div className="text-center mt-2 small" style={{ color: isDark ? mutedText : "#888" }}>
              Al registrarme estoy aceptando los{' '}
              <a href="#" className="text-decoration-none" style={{ color: accentRed }}>
                Términos y condiciones
              </a>{' '}
              como las{' '}
              <a href="#" className="text-decoration-none" style={{ color: accentRed }}>
                Políticas de privacidad
              </a>{' '}
              de la plataforma.
            </div>
          </div>
        </div>

        {/* Imagen derecha */}
        <div className="d-none d-md-block w-50">
          <img
            src={Img}
            alt="Arte de registro"
            className="w-100 h-100"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </>
  );
};

export default Register;
