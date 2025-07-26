import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';
import DataPayment from './components/DataPayment.jsx';
import CoinsResume from './components/CoinsResume.jsx';
import PurchaseHistory from './components/PurchaseHistory.jsx';
import UserInfo from './components/UserInfo.jsx';

// Lista de países para el dropdown
const COUNTRIES = [
  { value: "", label: "Selecciona país" },
  { value: "Argentina", label: "Argentina" },
  { value: "Bolivia", label: "Bolivia" },
  { value: "Brasil", label: "Brasil" },
  { value: "Chile", label: "Chile" },
  { value: "Colombia", label: "Colombia" },
  { value: "Costa Rica", label: "Costa Rica" },
  { value: "Cuba", label: "Cuba" },
  { value: "Ecuador", label: "Ecuador" },
  { value: "El Salvador", label: "El Salvador" },
  { value: "España", label: "España" },
  { value: "Estados Unidos", label: "Estados Unidos" },
  { value: "Guatemala", label: "Guatemala" },
  { value: "Honduras", label: "Honduras" },
  { value: "México", label: "México" },
  { value: "Nicaragua", label: "Nicaragua" },
  { value: "Panamá", label: "Panamá" },
  { value: "Paraguay", label: "Paraguay" },
  { value: "Perú", label: "Perú" },
  { value: "Puerto Rico", label: "Puerto Rico" },
  { value: "República Dominicana", label: "República Dominicana" },
  { value: "Uruguay", label: "Uruguay" },
  { value: "Venezuela", label: "Venezuela" },
  { value: "Otro", label: "Otro" }
];

// Roles disponibles
const USER_ROLES = [
  { value: "user", label: "Usuario", color: "#6c757d" },
  { value: "author", label: "Autor", color: "#198754" },
  { value: "editor", label: "Editor", color: "#0d6efd" },
  { value: "admin", label: "Administrador", color: "#d32f2f" },
  { value: "moderator", label: "Moderador", color: "#fd7e14" },
  { value: "subscriber", label: "Suscriptor", color: "#6f42c1" }
];

// Función para obtener el tema actual
const getTheme = () => {
  if (typeof document !== "undefined") {
    return document.documentElement.getAttribute("data-bs-theme") || "light";
  }
  return "light";
};

// Configuración de tabs
const TABS_CONFIG = [
  { 
    id: 'addUser', 
    label: 'Agregar Usuario', 
    icon: 'bi-person-plus',
    component: 'AddUserForm'
  },
  { 
    id: 'dataPayment', 
    label: 'Datos de Pago', 
    icon: 'bi-credit-card',
    component: 'DataPayment'
  },
  { 
    id: 'coinsResume', 
    label: 'Resumen de Monedas', 
    icon: 'bi-coin',
    component: 'CoinsResume'
  },
  { 
    id: 'purchaseHistory', 
    label: 'Historial de Compras', 
    icon: 'bi-clock-history',
    component: 'PurchaseHistory'
  },
  { 
    id: 'userInfo', 
    label: 'Información de Usuario', 
    icon: 'bi-person-gear',
    component: 'UserInfo'
  }
];

const AddUser = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState(getTheme());
  const [activeTab, setActiveTab] = useState('addUser');
  
  // Estados del formulario
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    country: '',
    birthDate: '',
    bio: '',
    sendWelcomeEmail: true,
    requirePasswordChange: false,
    isActive: true
  });
  
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  
  const fileInputRef = useRef(null);

  // Detectar cambios en el tema
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(getTheme());
    });
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['data-bs-theme'] 
    });
    return () => observer.disconnect();
  }, []);

  const isDarkMode = theme === 'dark';

  // Manejar cambios en el formulario
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Manejar carga de avatar
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, avatar: 'Por favor selecciona un archivo de imagen válido.' }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, avatar: 'La imagen debe ser menor a 5MB.' }));
      return;
    }

    setAvatar(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setAvatarPreview(event.target.result);
    };
    reader.readAsDataURL(file);
    
    // Limpiar error de avatar
    setErrors(prev => ({ ...prev, avatar: '' }));
  };

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es obligatorio';
    if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es obligatorio';
    if (!formData.username.trim()) newErrors.username = 'El nombre de usuario es obligatorio';
    if (formData.username.length < 3) newErrors.username = 'El nombre de usuario debe tener al menos 3 caracteres';
    
    if (!formData.email.trim()) newErrors.email = 'El correo electrónico es obligatorio';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'El correo electrónico no es válido';
    
    if (!formData.password) newErrors.password = 'La contraseña es obligatoria';
    if (formData.password.length < 8) newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (formData.birthDate && new Date(formData.birthDate) > new Date()) {
      newErrors.birthDate = 'La fecha de nacimiento no puede ser en el futuro';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSaving(true);
    
    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });
      
      if (avatar) {
        submitData.append('avatar', avatar);
      }

      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Usuario creado correctamente ✅');
      
      // Resetear formulario
      setFormData({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user',
        country: '',
        birthDate: '',
        bio: '',
        sendWelcomeEmail: true,
        requirePasswordChange: false,
        isActive: true
      });
      setAvatar(null);
      setAvatarPreview(null);
      
    } catch (error) {
      console.error(error);
      alert('Error al crear usuario. Inténtalo de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  // Estilos para inputs con focus rojo
  const inputStyles = {
    background: isDarkMode ? '#2d2d2d' : '#fff',
    color: isDarkMode ? '#fff' : '#333',
    border: `2px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '15px',
    fontWeight: '500',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    width: '100%'
  };

  const inputFocusStyles = {
    borderColor: '#d32f2f',
    boxShadow: '0 0 0 0.2rem rgba(211, 47, 47, 0.25)'
  };

  const errorInputStyles = {
    ...inputStyles,
    borderColor: '#dc3545'
  };

  const selectedRole = USER_ROLES.find(role => role.value === formData.role);

  // Componente del formulario de agregar usuario
  const AddUserForm = () => (
    <div className="container" style={{ maxWidth: 1000 }}>
      {/* Header */}
      <div className="mb-4">
        <h2 style={{
          color: isDarkMode ? '#fff' : '#2d3748',
          fontSize: '28px',
          fontWeight: '700',
          marginBottom: '8px'
        }}>
          <i className="bi bi-person-plus me-2" style={{ color: '#d32f2f' }}></i>
          Agregar Nuevo Usuario
        </h2>
        <p style={{ 
          color: isDarkMode ? '#adb5bd' : '#6c757d',
          fontSize: '16px',
          margin: 0
        }}>
          Crea una nueva cuenta de usuario en la plataforma
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Columna principal */}
          <div className="col-lg-8">
            {/* Información personal */}
            <div className="mb-4">
              <div style={{
                background: isDarkMode ? '#1e1e1e' : '#fff',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: isDarkMode 
                  ? '0 4px 20px rgba(0,0,0,0.3)' 
                  : '0 4px 20px rgba(0,0,0,0.08)',
                border: `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}`
              }}>
                <h4 className="mb-4" style={{ 
                  color: isDarkMode ? '#fff' : '#2d3748',
                  fontSize: '20px',
                  fontWeight: '600'
                }}>
                  <i className="bi bi-person me-2" style={{ color: '#d32f2f' }}></i>
                  Información Personal
                </h4>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold mb-2" style={{ 
                      color: isDarkMode ? '#fff' : '#2d3748' 
                    }}>
                      Nombre *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      style={errors.firstName ? errorInputStyles : inputStyles}
                      onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                      onBlur={e => Object.assign(e.target.style, 
                        errors.firstName ? errorInputStyles : inputStyles
                      )}
                      placeholder="Ingresa el nombre"
                    />
                    {errors.firstName && (
                      <small className="text-danger mt-1 d-block">
                        <i className="bi bi-exclamation-triangle me-1"></i>
                        {errors.firstName}
                      </small>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold mb-2" style={{ 
                      color: isDarkMode ? '#fff' : '#2d3748' 
                    }}>
                      Apellido *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      style={errors.lastName ? errorInputStyles : inputStyles}
                      onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                      onBlur={e => Object.assign(e.target.style, 
                        errors.lastName ? errorInputStyles : inputStyles
                      )}
                      placeholder="Ingresa el apellido"
                    />
                    {errors.lastName && (
                      <small className="text-danger mt-1 d-block">
                        <i className="bi bi-exclamation-triangle me-1"></i>
                        {errors.lastName}
                      </small>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold mb-2" style={{ 
                      color: isDarkMode ? '#fff' : '#2d3748' 
                    }}>
                      Nombre de Usuario *
                    </label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value.toLowerCase())}
                      style={errors.username ? errorInputStyles : inputStyles}
                      onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                      onBlur={e => Object.assign(e.target.style, 
                        errors.username ? errorInputStyles : inputStyles
                      )}
                      placeholder="ej: usuario123"
                    />
                    {errors.username && (
                      <small className="text-danger mt-1 d-block">
                        <i className="bi bi-exclamation-triangle me-1"></i>
                        {errors.username}
                      </small>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold mb-2" style={{ 
                      color: isDarkMode ? '#fff' : '#2d3748' 
                    }}>
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      style={errors.email ? errorInputStyles : inputStyles}
                      onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                      onBlur={e => Object.assign(e.target.style, 
                        errors.email ? errorInputStyles : inputStyles
                      )}
                      placeholder="usuario@ejemplo.com"
                    />
                    {errors.email && (
                      <small className="text-danger mt-1 d-block">
                        <i className="bi bi-exclamation-triangle me-1"></i>
                        {errors.email}
                      </small>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold mb-2" style={{ 
                      color: isDarkMode ? '#fff' : '#2d3748' 
                    }}>
                      Fecha de Nacimiento
                    </label>
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      style={errors.birthDate ? errorInputStyles : inputStyles}
                      onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                      onBlur={e => Object.assign(e.target.style, 
                        errors.birthDate ? errorInputStyles : inputStyles
                      )}
                    />
                    {errors.birthDate && (
                      <small className="text-danger mt-1 d-block">
                        <i className="bi bi-exclamation-triangle me-1"></i>
                        {errors.birthDate}
                      </small>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold mb-2" style={{ 
                      color: isDarkMode ? '#fff' : '#2d3748' 
                    }}>
                      País
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      style={inputStyles}
                      onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                      onBlur={e => Object.assign(e.target.style, inputStyles)}
                    >
                      {COUNTRIES.map(country => (
                        <option key={country.value} value={country.value}>
                          {country.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold mb-2" style={{ 
                    color: isDarkMode ? '#fff' : '#2d3748' 
                  }}>
                    Biografía
                  </label>
                  <textarea
                    rows="4"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    style={{
                      ...inputStyles,
                      resize: 'vertical'
                    }}
                    onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                    onBlur={e => Object.assign(e.target.style, inputStyles)}
                    placeholder="Una breve descripción del usuario..."
                    maxLength={500}
                  />
                  <small className="text-muted mt-1 d-block">
                    {formData.bio.length}/500 caracteres
                  </small>
                </div>
              </div>
            </div>

            {/* Credenciales */}
            <div className="mb-4">
              <div style={{
                background: isDarkMode ? '#1e1e1e' : '#fff',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: isDarkMode 
                  ? '0 4px 20px rgba(0,0,0,0.3)' 
                  : '0 4px 20px rgba(0,0,0,0.08)',
                border: `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}`
              }}>
                <h4 className="mb-4" style={{ 
                  color: isDarkMode ? '#fff' : '#2d3748',
                  fontSize: '20px',
                  fontWeight: '600'
                }}>
                  <i className="bi bi-shield-lock me-2" style={{ color: '#d32f2f' }}></i>
                  Credenciales de Acceso
                </h4>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold mb-2" style={{ 
                      color: isDarkMode ? '#fff' : '#2d3748' 
                    }}>
                      Contraseña *
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      style={errors.password ? errorInputStyles : inputStyles}
                      onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                      onBlur={e => Object.assign(e.target.style, 
                        errors.password ? errorInputStyles : inputStyles
                      )}
                      placeholder="Mínimo 8 caracteres"
                    />
                    {errors.password && (
                      <small className="text-danger mt-1 d-block">
                        <i className="bi bi-exclamation-triangle me-1"></i>
                        {errors.password}
                      </small>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold mb-2" style={{ 
                      color: isDarkMode ? '#fff' : '#2d3748' 
                    }}>
                      Confirmar Contraseña *
                    </label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      style={errors.confirmPassword ? errorInputStyles : inputStyles}
                      onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                      onBlur={e => Object.assign(e.target.style, 
                        errors.confirmPassword ? errorInputStyles : inputStyles
                      )}
                      placeholder="Repita la contraseña"
                    />
                    {errors.confirmPassword && (
                      <small className="text-danger mt-1 d-block">
                        <i className="bi bi-exclamation-triangle me-1"></i>
                        {errors.confirmPassword}
                      </small>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="requirePasswordChange"
                        checked={formData.requirePasswordChange}
                        onChange={(e) => handleInputChange('requirePasswordChange', e.target.checked)}
                        style={{ accentColor: '#d32f2f' }}
                      />
                      <label className="form-check-label" htmlFor="requirePasswordChange" style={{
                        color: isDarkMode ? '#fff' : '#2d3748'
                      }}>
                        Requerir cambio de contraseña en el primer login
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="sendWelcomeEmail"
                        checked={formData.sendWelcomeEmail}
                        onChange={(e) => handleInputChange('sendWelcomeEmail', e.target.checked)}
                        style={{ accentColor: '#d32f2f' }}
                      />
                      <label className="form-check-label" htmlFor="sendWelcomeEmail" style={{
                        color: isDarkMode ? '#fff' : '#2d3748'
                      }}>
                        Enviar email de bienvenida
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel lateral */}
          <div className="col-lg-4">
            {/* Avatar */}
            <div className="mb-4">
              <div style={{
                background: isDarkMode ? '#1e1e1e' : '#fff',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: isDarkMode 
                  ? '0 4px 20px rgba(0,0,0,0.3)' 
                  : '0 4px 20px rgba(0,0,0,0.08)',
                border: `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}`,
                textAlign: 'center'
              }}>
                <h5 className="mb-3" style={{ 
                  color: isDarkMode ? '#fff' : '#2d3748',
                  fontSize: '18px',
                  fontWeight: '600'
                }}>
                  <i className="bi bi-person-circle me-2" style={{ color: '#d32f2f' }}></i>
                  Foto de Perfil
                </h5>

                <div 
                  className="mb-3"
                  style={{
                    width: 150,
                    height: 150,
                    background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
                    border: `2px dashed ${isDarkMode ? '#555' : '#ced4da'}`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    transition: 'border-color 0.3s ease'
                  }}
                  onClick={() => fileInputRef.current.click()}
                  onMouseEnter={e => e.target.style.borderColor = '#d32f2f'}
                  onMouseLeave={e => e.target.style.borderColor = isDarkMode ? '#555' : '#ced4da'}
                >
                  {avatarPreview ? (
                    <img 
                      src={avatarPreview} 
                      alt="Avatar" 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' 
                      }} 
                    />
                  ) : (
                    <div style={{ 
                      color: isDarkMode ? '#666' : '#999',
                      textAlign: 'center'
                    }}>
                      <i className="bi bi-person" style={{ fontSize: 40, display: 'block', marginBottom: 8 }}></i>
                      <small>Subir foto</small>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  style={{
                    background: 'linear-gradient(135deg, #d32f2f 0%, #e53935 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '10px 20px',
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(211, 47, 47, 0.3)'
                  }}
                  onClick={() => fileInputRef.current.click()}
                >
                  <i className="bi bi-upload me-2"></i>
                  {avatarPreview ? 'Cambiar Foto' : 'Subir Foto'}
                </button>

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleAvatarChange}
                />

                {errors.avatar && (
                  <small className="text-danger mt-2 d-block">
                    <i className="bi bi-exclamation-triangle me-1"></i>
                    {errors.avatar}
                  </small>
                )}

                <small className="text-muted mt-2 d-block">
                  JPG, PNG hasta 5MB
                </small>
              </div>
            </div>

            {/* Rol y configuración */}
            <div className="mb-4">
              <div style={{
                background: isDarkMode ? '#1e1e1e' : '#fff',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: isDarkMode 
                  ? '0 4px 20px rgba(0,0,0,0.3)' 
                  : '0 4px 20px rgba(0,0,0,0.08)',
                border: `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}`
              }}>
                <h5 className="mb-3" style={{ 
                  color: isDarkMode ? '#fff' : '#2d3748',
                  fontSize: '18px',
                  fontWeight: '600'
                }}>
                  <i className="bi bi-shield-check me-2" style={{ color: '#d32f2f' }}></i>
                  Rol y Permisos
                </h5>

                <div className="mb-3">
                  <label className="form-label fw-semibold mb-2" style={{ 
                    color: isDarkMode ? '#fff' : '#2d3748' 
                  }}>
                    Rol del Usuario
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    style={inputStyles}
                    onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                    onBlur={e => Object.assign(e.target.style, inputStyles)}
                  >
                    {USER_ROLES.map(role => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                  
                  <div className="mt-2">
                    <span style={{
                      background: selectedRole?.color,
                      color: '#fff',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: 12,
                      fontWeight: 600
                    }}>
                      {selectedRole?.label}
                    </span>
                  </div>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                    style={{ accentColor: '#d32f2f' }}
                  />
                  <label className="form-check-label" htmlFor="isActive" style={{
                    color: isDarkMode ? '#fff' : '#2d3748'
                  }}>
                    Cuenta activa
                  </label>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="d-flex flex-column gap-3">
              <button
                type="submit"
                disabled={saving}
                style={{
                  background: saving 
                    ? '#aaa' 
                    : 'linear-gradient(135deg, #d32f2f 0%, #e53935 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  padding: '14px 24px',
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: saving ? 'not-allowed' : 'pointer',
                  boxShadow: saving ? 'none' : '0 4px 15px rgba(211, 47, 47, 0.3)',
                  transition: 'all 0.2s ease'
                }}
              >
                {saving ? (
                  <>
                    <div className="spinner-border spinner-border-sm me-2" role="status">
                      <span className="visually-hidden">Guardando...</span>
                    </div>
                    Creando Usuario...
                  </>
                ) : (
                  <>
                    <i className="bi bi-person-plus me-2"></i>
                    Crear Usuario
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => window.history.back()}
                style={{
                  background: 'transparent',
                  color: isDarkMode ? '#adb5bd' : '#6c757d',
                  border: `2px solid ${isDarkMode ? '#555' : '#ced4da'}`,
                  borderRadius: 12,
                  padding: '12px 24px',
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.target.style.borderColor = '#d32f2f';
                  e.target.style.color = '#d32f2f';
                }}
                onMouseLeave={e => {
                  e.target.style.borderColor = isDarkMode ? '#555' : '#ced4da';
                  e.target.style.color = isDarkMode ? '#adb5bd' : '#6c757d';
                }}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );

  return (
    <div className="d-flex" style={{
      background: isDarkMode ? '#121212' : '#f5f7fa',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif',
      transition: 'background-color 0.3s ease'
    }}>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Botón flotante para abrir sidebar */}
      {!sidebarOpen && (
        <button
          className="btn position-fixed"
          style={{
            top: 16,
            left: 0,
            zIndex: 2000,
            borderRadius: '0% 50% 50% 0%',
            width: 38,
            height: 38,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: "#d32f2f",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(211, 47, 47, 0.3)"
          }}
          onClick={() => setSidebarOpen(true)}
        >
          <i className="bi bi-chevron-right" style={{ fontSize: 22 }}></i>
        </button>
      )}

      {/* Contenido principal con tabs */}
      <div style={{
        flexGrow: 1,
        marginLeft: sidebarOpen ? 280 : 0,
        transition: "margin-left 0.3s",
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Navigation Tabs */}
        <div style={{
          background: isDarkMode ? '#1e1e1e' : '#fff',
          borderBottom: `2px solid ${isDarkMode ? '#404040' : '#e9ecef'}`,
          padding: '0 32px',
          overflowX: 'auto'
        }}>
          <div className="d-flex">
            {TABS_CONFIG.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '16px 24px',
                  color: activeTab === tab.id 
                    ? '#d32f2f' 
                    : (isDarkMode ? '#adb5bd' : '#6c757d'),
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  borderBottom: activeTab === tab.id 
                    ? '3px solid #d32f2f' 
                    : '3px solid transparent',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={e => {
                  if (activeTab !== tab.id) {
                    e.target.style.color = '#d32f2f';
                  }
                }}
                onMouseLeave={e => {
                  if (activeTab !== tab.id) {
                    e.target.style.color = isDarkMode ? '#adb5bd' : '#6c757d';
                  }
                }}
              >
                <i className={`${tab.icon} me-2`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div style={{
          flex: 1,
          padding: '32px',
          overflow: 'auto'
        }}>
          {activeTab === 'addUser' && <AddUserForm />}
          {activeTab === 'dataPayment' && <DataPayment />}
          {activeTab === 'coinsResume' && <CoinsResume />}
          {activeTab === 'purchaseHistory' && <PurchaseHistory />}
          {activeTab === 'userInfo' && <UserInfo />}
        </div>
      </div>
    </div>
  );
};

export default AddUser;
