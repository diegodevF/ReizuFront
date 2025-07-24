import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const AddWork = () => {
  const navigate = useNavigate();

  // Estados existentes
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState('light');
  const [selectedGenres, setSelectedGenres] = useState([]);
  
  // Nuevo estado para programación
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const [formData, setFormData] = useState({
    titulo: '',
    sinopsis: '',
    autorPrincipal: 'Kevin B.P',
    masAutores: '',
    estado: 'Emisión',
    periodicidad: 'Mensual',
    tipoObra: 'Novela',
    formato: 'Manga/comics',
    orientacion: 'Izquierda a Derecha',
    linkPVTrailer: '',
    obraExclusiva: false,
    contenidoAdulto: false
  });

  // Función para obtener fecha mínima (hoy)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Función para obtener hora actual
  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  };

  const handlePublish = () => {
    toast.success('Obra publicada correctamente!');
    setTimeout(() => {
      navigate('/Admin/Works');
    }, 2000);
  };

  const handleSchedule = () => {
    setShowScheduleForm(true);
    // Pre-llenar con fecha y hora actuales
    if (!scheduledDate) setScheduledDate(getMinDate());
    if (!scheduledTime) setScheduledTime(getCurrentTime());
  };

  const handleConfirmSchedule = () => {
    if (!scheduledDate || !scheduledTime) {
      toast.error('Por favor, selecciona fecha y hora de publicación');
      return;
    }

    const scheduleDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
    const now = new Date();

    if (scheduleDateTime <= now) {
      toast.error('La fecha de publicación debe ser en el futuro');
      return;
    }

    // Formatear fecha para mostrar
    const formatDate = scheduleDateTime.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    toast.success(`Obra programada para: ${formatDate}`);
    
    setTimeout(() => {
      navigate('/Admin/Works');
    }, 3000);
  };

  const handleCancelSchedule = () => {
    setShowScheduleForm(false);
    setScheduledDate('');
    setScheduledTime('');
  };

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

  const genres = [
    'ACCION', 'AVENTURA', 'BL', 'CIENCIA FICCION', 'COMEDIA', 'DEPORTE', 'DRAMA', 'FANTASIA', 'GL',
    'HISTORICO', 'HORROR', 'MISTERIO', 'PSICOLOGICO', 'ROMANCE', 'TERROR', 'THRILLER', 'VIDA COTIDIANA'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleGenreChange = (genre) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  // Estilos adaptativos
  const inputStyles = {
    backgroundColor: isDark ? '#3a3a3a' : '#ffffff',
    borderColor: isDark ? '#555555' : '#ced4da',
    color: isDark ? '#ffffff' : '#000000'
  };

  const cardStyles = {
    backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
    borderColor: isDark ? '#444444' : '#dee2e6',
    color: isDark ? '#ffffff' : '#000000'
  };

  const scheduleCardStyles = {
    backgroundColor: isDark ? '#3a3a3a' : '#f8f9fa',
    borderColor: isDark ? '#555555' : '#dee2e6',
    color: isDark ? '#ffffff' : '#000000'
  };

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

      {/* Sidebar SIEMPRE en el DOM */}
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
      
      <div 
        className="flex-grow-1"
        style={{ 
          marginLeft: sidebarOpen ? '280px' : '0',
          transition: 'margin-left 0.3s ease-in-out',
          minHeight: '100vh',
          backgroundColor: isDark ? '#1a1a1a' : '#e9ecef'
        }}
      >
        <div className="container-fluid p-4">
          {/* Header */}
          <div className="mb-4">
            <h2 
              className="fw-bold mb-3"
              style={{ color: isDark ? '#ffffff' : '#212529' }}
            >
              Añadir una Nueva Obra
            </h2>
            
            {/* Título y Borrador */}
            <div className="d-flex gap-3 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Escribe título de la obra..."
                name="titulo"
                value={formData.titulo}
                onChange={handleInputChange}
                style={{ ...inputStyles, flex: 1 }}
              />
              <div className="dropdown">
                <button 
                  className="btn btn-outline-secondary dropdown-toggle" 
                  type="button" 
                  data-bs-toggle="dropdown"
                  style={{
                    borderColor: isDark ? '#555555' : '#6c757d',
                    color: isDark ? '#ffffff' : '#6c757d',
                    backgroundColor: isDark ? '#3a3a3a' : 'transparent'
                  }}
                >
                  Borrador
                </button>
                <ul 
                  className="dropdown-menu"
                  style={{
                    backgroundColor: isDark ? '#3a3a3a' : '#ffffff',
                    borderColor: isDark ? '#555555' : '#dee2e6'
                  }}
                >
                  <li>
                    <a 
                      className="dropdown-item" 
                      href="#"
                      style={{ color: isDark ? '#ffffff' : '#212529' }}
                    >
                      Borrador
                    </a>
                  </li>
                  <li>
                    <a 
                      className="dropdown-item" 
                      href="#"
                      style={{ color: isDark ? '#ffffff' : '#212529' }}
                    >
                      Publicado
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Columna principal */}
            <div className="col-lg-8">
              {/* Imágenes */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <div 
                    className="text-center p-4 border rounded" 
                    style={{ 
                      backgroundColor: isDark ? '#555555' : '#c0c0c0', 
                      height: '200px',
                      borderColor: isDark ? '#666666' : '#dee2e6'
                    }}
                  >
                    <div className="d-flex flex-column justify-content-center h-100">
                      <h3 className="text-white fw-bold">IMAGEN PORTADA</h3>
                      <button 
                        className="btn mt-3"
                        style={{
                          backgroundColor: isDark ? '#212529' : '#343a40',
                          borderColor: isDark ? '#212529' : '#343a40',
                          color: '#ffffff'
                        }}
                      >
                        Elegir Archivo
                      </button>
                    </div>
                  </div>
                  <small style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}>
                    Tamaño recomendado: 300 x 300 | Tamaño Máximo de 1MB
                  </small>
                </div>
                <div className="col-md-6">
                  <div 
                    className="text-center p-4 border rounded" 
                    style={{ 
                      backgroundColor: isDark ? '#555555' : '#c0c0c0', 
                      height: '200px',
                      borderColor: isDark ? '#666666' : '#dee2e6'
                    }}
                  >
                    <div className="d-flex flex-column justify-content-center h-100">
                      <h3 className="text-white fw-bold">IMAGEN BANNER</h3>
                      <button 
                        className="btn mt-3"
                        style={{
                          backgroundColor: isDark ? '#212529' : '#343a40',
                          borderColor: isDark ? '#212529' : '#343a40',
                          color: '#ffffff'
                        }}
                      >
                        Elegir Archivo
                      </button>
                    </div>
                  </div>
                  <small style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}>
                    Tamaño recomendado: 1024 x 1024 y Peso Máximo de 15MB
                  </small>
                </div>
              </div>

              {/* Sinopsis */}
              <div className="mb-4">
                <label 
                  className="form-label fw-bold"
                  style={{ color: isDark ? '#ffffff' : '#212529' }}
                >
                  Sinopsis:
                </label>
                <textarea
                  className="form-control"
                  rows="4"
                  name="sinopsis"
                  value={formData.sinopsis}
                  onChange={handleInputChange}
                  style={inputStyles}
                ></textarea>
              </div>

              {/* Autores */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <label 
                    className="form-label fw-bold"
                    style={{ color: isDark ? '#ffffff' : '#212529' }}
                  >
                    Autor Principal:
                  </label>
                  <select 
                    className="form-select"
                    name="autorPrincipal"
                    value={formData.autorPrincipal}
                    onChange={handleInputChange}
                    style={inputStyles}
                  >
                    <option>Kevin B.P</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label 
                    className="form-label fw-bold"
                    style={{ color: isDark ? '#ffffff' : '#212529' }}
                  >
                    Más Autores/Colaboradores
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Escribir la lista de autores, asistentes y colaboradores de la obra"
                    name="masAutores"
                    value={formData.masAutores}
                    onChange={handleInputChange}
                    style={inputStyles}
                  />
                </div>
              </div>

              {/* Más opciones */}
              <div className="mb-4">
                <h5 
                  className="fw-bold mb-3"
                  style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}
                >
                  MAS OPCIONES
                </h5>
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        name="obraExclusiva"
                        checked={formData.obraExclusiva}
                        onChange={handleInputChange}
                      />
                      <label 
                        className="form-check-label"
                        style={{ color: isDark ? '#ffffff' : '#212529' }}
                      >
                        Obra Exclusiva
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="checkbox"
                        name="contenidoAdulto"
                        checked={formData.contenidoAdulto}
                        onChange={handleInputChange}
                      />
                      <label 
                        className="form-check-label"
                        style={{ color: isDark ? '#ffffff' : '#212529' }}
                      >
                        Contenido Adulto
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label 
                      className="form-label small"
                      style={{ color: isDark ? '#ffffff' : '#212529' }}
                    >
                      Música de fondo
                    </label>
                    <button 
                      className="btn btn-sm d-block"
                      style={{
                        backgroundColor: isDark ? '#212529' : '#343a40',
                        borderColor: isDark ? '#212529' : '#343a40',
                        color: '#ffffff'
                      }}
                    >
                      Elegir Archivo
                    </button>
                  </div>
                  <div className="col-md-3">
                    <label 
                      className="form-label small"
                      style={{ color: isDark ? '#ffffff' : '#212529' }}
                    >
                      Link de PV/Trailer
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="linkPVTrailer"
                      value={formData.linkPVTrailer}
                      onChange={handleInputChange}
                      style={inputStyles}
                    />
                    <small style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}>
                      Link de la letra de reproducción de youtube de los PV o Trailers de la obra.
                    </small>
                  </div>
                </div>
              </div>

              {/* Gestionar visualización de logros */}
              <div className="mb-4">
                <label 
                  className="form-label fw-bold"
                  style={{ color: isDark ? '#ffffff' : '#212529' }}
                >
                  Gestionar Visualización de logros
                </label>
                <div className="d-flex align-items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="rounded-circle"
                      style={{ 
                        width: '50px', 
                        height: '50px',
                        backgroundColor: isDark ? '#555555' : '#6c757d'
                      }}
                    ></div>
                  ))}
                  <button 
                    className="btn"
                    style={{
                      backgroundColor: isDark ? '#212529' : '#343a40',
                      borderColor: isDark ? '#212529' : '#343a40',
                      color: '#ffffff'
                    }}
                  >
                    Elegir Logros
                  </button>
                </div>
              </div>
            </div>

            {/* Panel lateral */}
            <div className="col-lg-4">
              <div 
                className="border rounded p-3" 
                style={cardStyles}
              >
                {/* Visitas y Vista previa */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span style={{ color: isDark ? '#ffffff' : '#212529' }}>
                    Visitas: <strong>0</strong>
                  </span>
                  <button 
                    className="btn btn-outline-secondary btn-sm"
                    style={{
                      borderColor: isDark ? '#555555' : '#6c757d',
                      color: isDark ? '#ffffff' : '#6c757d'
                    }}
                  >
                    Vista previa
                  </button>
                </div>

                {/* Campos de configuración */}
                <div className="mb-3">
                  <label 
                    className="form-label small"
                    style={{ color: isDark ? '#ffffff' : '#212529' }}
                  >
                    Estado:
                  </label>
                  <select 
                    className="form-select form-select-sm"
                    name="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                    style={inputStyles}
                  >
                    <option>Emisión</option>
                    <option>Finalizado</option>
                    <option>Hiatus</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label 
                    className="form-label small"
                    style={{ color: isDark ? '#ffffff' : '#212529' }}
                  >
                    Periodicidad
                  </label>
                  <select 
                    className="form-select form-select-sm"
                    name="periodicidad"
                    value={formData.periodicidad}
                    onChange={handleInputChange}
                    style={inputStyles}
                  >
                    <option>Mensual</option>
                    <option>Semanal</option>
                    <option>Quincenal</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label 
                    className="form-label small"
                    style={{ color: isDark ? '#ffffff' : '#212529' }}
                  >
                    Tipo de Obra
                  </label>
                  <select 
                    className="form-select form-select-sm"
                    name="tipoObra"
                    value={formData.tipoObra}
                    onChange={handleInputChange}
                    style={inputStyles}
                  >
                    <option>Novela</option>
                    <option>Manga</option>
                    <option>Comic</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label 
                    className="form-label small"
                    style={{ color: isDark ? '#ffffff' : '#212529' }}
                  >
                    Formato
                  </label>
                  <select 
                    className="form-select form-select-sm"
                    name="formato"
                    value={formData.formato}
                    onChange={handleInputChange}
                    style={inputStyles}
                  >
                    <option>Manga/comics</option>
                    <option>Novela</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label 
                    className="form-label small"
                    style={{ color: isDark ? '#ffffff' : '#212529' }}
                  >
                    Orientación
                  </label>
                  <select 
                    className="form-select form-select-sm"
                    name="orientacion"
                    value={formData.orientacion}
                    onChange={handleInputChange}
                    style={inputStyles}
                  >
                    <option>Izquierda a Derecha</option>
                    <option>Derecha a Izquierda</option>
                  </select>
                </div>

                {/* Fecha */}
                <div className="text-center mb-3">
                  <small style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}>
                    {new Date().toLocaleString()}
                  </small>
                </div>

                {/* Botones de acción */}
                <div className="d-flex gap-2 mb-4">
                  <button 
                    className="btn flex-fill"
                    style={{
                      backgroundColor: isDark ? '#212529' : '#343a40',
                      borderColor: isDark ? '#212529' : '#343a40',
                      color: '#ffffff'
                    }}
                    onClick={handleSchedule}
                  >
                    <i className="bi bi-calendar-event me-1"></i>
                    Programar
                  </button>
                  <button
                    className="btn btn-danger flex-fill"
                    style={{
                      background: 'linear-gradient(45deg, #dc3545, #c82333)',
                      border: 'none'
                    }}
                    onClick={handlePublish}
                  >
                    <i className="bi bi-upload me-1"></i>
                    Publicar
                  </button>
                </div>

                {/* Formulario de programación */}
                {showScheduleForm && (
                  <div 
                    className="p-3 rounded mb-4"
                    style={{
                      ...scheduleCardStyles,
                      border: `2px solid ${isDark ? '#ffc107' : '#fd7e14'}`,
                      animation: 'fadeIn 0.3s ease-in-out'
                    }}
                  >
                    <h6 
                      className="fw-bold mb-3 text-center"
                      style={{ color: isDark ? '#ffc107' : '#fd7e14' }}
                    >
                      <i className="bi bi-clock me-2"></i>
                      Programar Publicación
                    </h6>
                    
                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <label 
                          className="form-label small mb-1"
                          style={{ color: isDark ? '#ffffff' : '#212529' }}
                        >
                          Fecha:
                        </label>
                        <input
                          type="date"
                          className="form-control form-control-sm"
                          value={scheduledDate}
                          min={getMinDate()}
                          onChange={(e) => setScheduledDate(e.target.value)}
                          style={inputStyles}
                        />
                      </div>
                      <div className="col-6">
                        <label 
                          className="form-label small mb-1"
                          style={{ color: isDark ? '#ffffff' : '#212529' }}
                        >
                          Hora:
                        </label>
                        <input
                          type="time"
                          className="form-control form-control-sm"
                          value={scheduledTime}
                          onChange={(e) => setScheduledTime(e.target.value)}
                          style={inputStyles}
                        />
                      </div>
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-success btn-sm flex-fill"
                        onClick={handleConfirmSchedule}
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}
                      >
                        <i className="bi bi-check-circle me-1"></i>
                        Confirmar
                      </button>
                      <button
                        className="btn btn-secondary btn-sm flex-fill"
                        onClick={handleCancelSchedule}
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}
                      >
                        <i className="bi bi-x-circle me-1"></i>
                        Cancelar
                      </button>
                    </div>

                    <small 
                      className="d-block text-center mt-2"
                      style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}
                    >
                      La obra se publicará automáticamente
                    </small>
                  </div>
                )}

                {/* Géneros */}
                <div>
                  <h6 
                    className="fw-bold text-center mb-2"
                    style={{ color: isDark ? '#ffffff' : '#212529' }}
                  >
                    GÉNEROS:
                  </h6>
                  <small 
                    className="d-block text-center mb-3"
                    style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}
                  >
                    Seleccionar hasta dos (2) géneros
                  </small>
                  
                  <div className="row g-1">
                    {genres.map((genre) => (
                      <div key={genre} className="col-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={genre}
                            checked={selectedGenres.includes(genre)}
                            onChange={() => handleGenreChange(genre)}
                            disabled={!selectedGenres.includes(genre) && selectedGenres.length >= 2}
                          />
                          <label 
                            className="form-check-label small" 
                            htmlFor={genre}
                            style={{ color: isDark ? '#ffffff' : '#212529' }}
                          >
                            {genre}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: isDark ? '#333' : '#fff',
            color: isDark ? '#fff' : '#333',
          },
        }}
      />

      {/* CSS para animación */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AddWork;
