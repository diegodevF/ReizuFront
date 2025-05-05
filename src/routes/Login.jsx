import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import Img from "../assets/dragon.png"

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

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

  return (
    <div className="d-flex vh-100">
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
      <div className="d-flex justify-content-center align-items-center w-100 bg-light" style={{filter:'drop-shadow(0 0 0.75rem crimson)'}}>
        <div className="bg-white p-4 rounded-4 shadow-sm" style={{ maxWidth: '600px', width: '100%', filter: 'drop-shadow(0 0.15rem 0.15rem crimson)' }}>
          <h3 className="text-center text-danger fw-bold">Iniciar sesión</h3>
          <p className="text-center text-muted small mb-4">
            Para una mayor experiencia disfrutando de buenas historias
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Usuario o Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Escribir su usuario o correo..."
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
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
                <label className="form-check-label small" htmlFor="rememberMe">
                  Recuérdame
                </label>
              </div>
              <a href="#" className="small text-danger text-decoration-none">¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit" className="btn btn-danger w-100 fw-bold">
              Ingresar
            </button>

            <div className="text-center text-muted mt-4 mb-3">O inicia sesión con</div>

            <div className="d-flex justify-content-center gap-3 mb-3">
              <button type="button" className="btn btn-outline-secondary rounded-circle" title="Facebook">
                <i className="bi bi-facebook"></i>
              </button>
              <button type="button" className="btn btn-outline-secondary rounded-circle" title="Google">
                <i className="bi bi-google"></i>
              </button>
              <button type="button" className="btn btn-outline-secondary rounded-circle" title="X">
                <i className="bi bi-twitter-x"></i>
              </button>
            </div>

            <div className="text-center small">
              ¿No tienes una Cuenta?{' '}
              <a href="#" className="text-danger fw-bold text-decoration-none">Registrarse</a>
            </div>

            <div className="text-center mt-3 small text-muted">
              Si tienes algún problema para iniciar sesión o registrarte, puedes contactarnos en nuestro servidor de{' '}
              <a href="#" className="text-primary text-decoration-none">Discord</a> o al correo{' '}
              <a href="mailto:soporte@reizucomics.com" className="text-danger text-decoration-none">
                soporte@reizucomics.com
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
