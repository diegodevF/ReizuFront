// src/pages/Admin/ProfileEdit.jsx
import React, { useState, useRef, useEffect } from "react";
import placeholderAvatar from "../assets/authors/b3b93208f79852e20f49bf67aa42491c.jpg";
import placeholderBanner from "../assets/authors/1650010_26.jpg";
import Sidebar from "../admin/components/Sidebar";
import 'bootstrap-icons/font/bootstrap-icons.css';

// ✅ Importar React Hot Toast
import toast, { Toaster } from 'react-hot-toast';

// Importar las imágenes de marcos desde assets
import frameWhite from "../assets/Marcos/Bronce.png";
import frameBlue from "../assets/Marcos/Diamante.png";
import frameGreen from "../assets/Marcos/Marco.svg";
import frameRed from "../assets/Marcos/oro.png";
import frameYellow from "../assets/Marcos/Plata.png";
import frameCyan from "../assets/Marcos/platino.png";

const FRAME_OPTIONS = [
  { value: "border-light", label: "Bronce", color: "#cd7f32", image: frameWhite },
  { value: "border-primary", label: "Diamante", color: "#0d6efd", image: frameBlue },
  { value: "border-success", label: "Marco", color: "#198754", image: frameGreen },
  { value: "border-danger", label: "Oro", color: "#dc3545", image: frameRed },
  { value: "border-warning", label: "Plata", color: "#ffc107", image: frameYellow },
  { value: "border-info", label: "Platino", color: "#0dcaf0", image: frameCyan },
];

// Lista de países para el dropdown
const COUNTRIES = [
  { value: "", label: "Selecciona tu país" },
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

// Función para obtener el tema actual
const getTheme = () => {
  if (typeof document !== "undefined") {
    return document.documentElement.getAttribute("data-bs-theme") || "light";
  }
  return "light";
};

// Componente personalizado para el selector de marcos
const FrameSelector = ({ frameClass, setFrameClass, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedFrame = FRAME_OPTIONS.find(opt => opt.value === frameClass) || FRAME_OPTIONS[0];

  return (
    <div className="position-relative" ref={dropdownRef}>
      {/* Botón selector */}
      <button
        type="button"
        className="btn w-100 d-flex align-items-center justify-content-between"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: isDarkMode ? '#2d2d2d' : '#fff',
          color: isDarkMode ? '#fff' : '#333',
          border: `1px solid ${isDarkMode ? '#404040' : '#ced4da'}`,
          borderRadius: '8px',
          padding: '12px',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
        }}
        onFocus={e => {
          e.target.style.borderColor = '#d32f2f';
          e.target.style.boxShadow = '0 0 0 0.2rem rgba(211, 47, 47, 0.25)';
        }}
        onBlur={e => {
          e.target.style.borderColor = isDarkMode ? '#404040' : '#ced4da';
          e.target.style.boxShadow = 'none';
        }}
      >
        <div className="d-flex align-items-center">
          <img
            src={selectedFrame.image}
            alt={selectedFrame.label}
            style={{
              width: '30px',
              height: '30px',
              marginRight: '12px',
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
          <span>Marco {selectedFrame.label}</span>
        </div>
        <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'}`}></i>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="position-absolute w-100 mt-1"
          style={{
            background: isDarkMode ? '#2d2d2d' : '#fff',
            border: `1px solid ${isDarkMode ? '#404040' : '#ced4da'}`,
            borderRadius: '8px',
            boxShadow: isDarkMode 
              ? '0 4px 20px rgba(0,0,0,0.3)' 
              : '0 4px 20px rgba(0,0,0,0.15)',
            zIndex: 1000,
            maxHeight: '300px',
            overflowY: 'auto'
          }}
        >
          {FRAME_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className="btn w-100 d-flex align-items-center text-start"
              onClick={() => {
                setFrameClass(option.value);
                setIsOpen(false);
              }}
              style={{
                background: frameClass === option.value 
                  ? (isDarkMode ? '#404040' : '#f8f9fa') 
                  : 'transparent',
                color: isDarkMode ? '#fff' : '#333',
                border: 'none',
                borderRadius: '0',
                padding: '12px',
                borderBottom: `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}`
              }}
              onMouseEnter={e => {
                if (frameClass !== option.value) {
                  e.target.style.background = isDarkMode ? '#383838' : '#f1f1f1';
                }
              }}
              onMouseLeave={e => {
                if (frameClass !== option.value) {
                  e.target.style.background = 'transparent';
                }
              }}
            >
              <img
                src={option.image}
                alt={option.label}
                style={{
                  width: '40px',
                  height: '40px',
                  marginRight: '12px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: `2px solid ${option.color}`
                }}
              />
              <div>
                <div className="fw-semibold">Marco {option.label}</div>
                <small className="text-muted">{option.color}</small>
              </div>
              {frameClass === option.value && (
                <i className="bi bi-check-circle-fill ms-auto" style={{ color: '#d32f2f' }}></i>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ProfileEdit = ({ user = {}, onSave }) => {
  // Estados principales
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState(getTheme());
  
  // ✅ Nuevos campos agregados
  const [firstName, setFirstName] = useState(user.firstName || "MAMBA");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [email, setEmail] = useState(user.email || "mamba@reizucomics.com");
  const [birthDate, setBirthDate] = useState(user.birthDate || "");
  
  // Campos de contraseña
  const [currentPassword, setCurrentPassword] = useState("hola");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  
  // Estados existentes
  const [bio, setBio] = useState(user.bio || "Es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500.");
  const [country, setCountry] = useState(user.country || "Chile");
  const [avatarFile, setAvatarFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar || placeholderAvatar);
  const [bannerPreview, setBannerPreview] = useState(user.banner || placeholderBanner);
  const [emailOptIn, setEmailOptIn] = useState(!!user.emailOptIn);
  const [frameClass, setFrameClass] = useState(user.frameClass || FRAME_OPTIONS[3].value);
  const [saving, setSaving] = useState(false);

  // Referencias
  const fileInputAvatar = useRef();
  const fileInputBanner = useRef();

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

  const isDarkMode = theme === "dark";

  // ✅ Manejador de cambio de imágenes con Hot Toast
  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Por favor selecciona un archivo de imagen válido.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen debe ser menor a 5MB.');
      return;
    }

    // ✅ Toast de carga
    toast.loading(`Cargando ${type === 'avatar' ? 'foto de perfil' : 'banner'}...`);

    const reader = new FileReader();
    reader.onload = (event) => {
      if (type === 'avatar') {
        setAvatarFile(file);
        setAvatarPreview(event.target.result);
        toast.dismiss(); // Quitar el loading
        toast.success('Foto de perfil cargada correctamente ✅');
      } else {
        setBannerFile(file);
        setBannerPreview(event.target.result);
        toast.dismiss(); // Quitar el loading
        toast.success('Banner cargado correctamente ✅');
      }
    };
    reader.readAsDataURL(file);
  };

  // ✅ Manejador de envío del formulario con Hot Toast
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ✅ Nuevas validaciones
    if (firstName.trim().length < 2) {
      toast.error("El nombre debe tener al menos 2 caracteres.");
      return;
    }

    if (lastName.trim().length < 2) {
      toast.error("El apellido debe tener al menos 2 caracteres.");
      return;
    }

    if (bio.trim().length < 10) {
      toast.error("La biografía debe tener al menos 10 caracteres.");
      return;
    }

    if (!country) {
      toast.error("Por favor selecciona tu país.");
      return;
    }

    if (birthDate && new Date(birthDate) > new Date()) {
      toast.error("La fecha de nacimiento no puede ser en el futuro.");
      return;
    }

    // ✅ Validaciones de contraseña si se quiere cambiar
    if (changePassword) {
      if (!currentPassword) {
        toast.error("Ingresa tu contraseña actual.");
        return;
      }
      if (newPassword.length < 8) {
        toast.error("La nueva contraseña debe tener al menos 8 caracteres.");
        return;
      }
      if (newPassword !== confirmPassword) {
        toast.error("Las contraseñas nuevas no coinciden.");
        return;
      }
    }

    setSaving(true);
    
    // ✅ Toast de carga con promise
    const savePromise = new Promise(async (resolve, reject) => {
      try {
        const formData = new FormData();
        formData.append("firstName", firstName.trim());
        formData.append("lastName", lastName.trim());
        formData.append("bio", bio.trim());
        formData.append("country", country);
        formData.append("birthDate", birthDate);
        formData.append("emailOptIn", emailOptIn);
        formData.append("frameClass", frameClass);
        
        // ✅ Campos de contraseña si se quiere cambiar
        if (changePassword) {
          formData.append("currentPassword", currentPassword);
          formData.append("newPassword", newPassword);
        }
        
        if (avatarFile) formData.append("avatar", avatarFile);
        if (bannerFile) formData.append("banner", bannerFile);

        // Simular llamada a API
        await new Promise(resolveTimeout => setTimeout(resolveTimeout, 1500));

        if (onSave) onSave();
        
        // ✅ Limpiar campos de contraseña después del guardado exitoso
        if (changePassword) {
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setChangePassword(false);
        }
        
        resolve('¡Perfil actualizado correctamente! 🎉');
        
      } catch (err) {
        console.error(err);
        reject('Error al guardar. Inténtalo de nuevo.');
      } finally {
        setSaving(false);
      }
    });

    // ✅ Toast con promise automático
    toast.promise(savePromise, {
      loading: 'Guardando perfil...',
      success: (message) => message,
      error: (err) => err,
    });
  };

  const selectedFrameColor = FRAME_OPTIONS.find(opt => opt.value === frameClass)?.color || "#dc3545";

  // Estilos para inputs con focus rojo
  const inputStyles = {
    background: isDarkMode ? '#2d2d2d' : '#fff',
    color: isDarkMode ? '#fff' : '#333',
    border: `1px solid ${isDarkMode ? '#404040' : '#ced4da'}`,
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
  };

  const inputFocusStyles = {
    borderColor: '#d32f2f',
    boxShadow: '0 0 0 0.2rem rgba(211, 47, 47, 0.25)',
    outline: 'none'
  };

  // ✅ Estilo para campos readonly
  const readOnlyStyles = {
    ...inputStyles,
    backgroundColor: isDarkMode ? '#1a1a1a' : '#f8f9fa',
    cursor: 'not-allowed'
  };

  return (
    <div className="d-flex" style={{ 
      background: isDarkMode ? '#121212' : '#f5f7fa', 
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />

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

      {/* Contenido principal */}
      <div
        style={{
          flexGrow: 1,
          marginLeft: sidebarOpen ? 280 : 0,
          transition: "margin-left 0.3s",
          padding: '32px'
        }}
      >
        <div className="container" style={{ maxWidth: 900 }}>
          {/* Header */}
          <div className="mb-4">
            <h2 style={{
              color: isDarkMode ? '#fff' : '#2d3748',
              fontSize: '28px',
              fontWeight: '700',
              marginBottom: '8px'
            }}>
              <i className="bi bi-person-gear me-2" style={{ color: '#d32f2f' }}></i>
              Editar Perfil
            </h2>
            <p style={{ 
              color: isDarkMode ? '#adb5bd' : '#6c757d',
              fontSize: '16px',
              margin: 0
            }}>
              Personaliza tu perfil de autor en la plataforma
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Banner */}
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
                <label className="form-label fw-semibold mb-3" style={{ 
                  color: isDarkMode ? '#fff' : '#2d3748',
                  fontSize: '18px'
                }}>
                  <i className="bi bi-image me-2"></i>
                  Banner del Perfil
                </label>
                
                <div className="position-relative" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                  <img
                    src={bannerPreview}
                    alt="Banner"
                    className="w-100"
                    style={{ 
                      height: '200px', 
                      objectFit: 'cover',
                      cursor: 'pointer'
                    }}
                    onClick={() => fileInputBanner.current.click()}
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                       style={{
                         background: 'rgba(0,0,0,0.3)',
                         opacity: 0,
                         transition: 'opacity 0.3s ease'
                       }}
                       onMouseEnter={e => e.target.style.opacity = 1}
                       onMouseLeave={e => e.target.style.opacity = 0}>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => fileInputBanner.current.click()}
                    >
                      <i className="bi bi-camera me-2"></i>
                      Cambiar Banner
                    </button>
                  </div>
                </div>
                
                <input
                  ref={fileInputBanner}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="d-none"
                  onChange={(e) => handleImageChange(e, "banner")}
                />
                
                <small className="text-muted mt-2 d-block">
                  Recomendado: 1200x300px, máximo 5MB
                </small>
              </div>
            </div>

            {/* Avatar y datos básicos */}
            <div className="row mb-4">
              <div className="col-lg-4">
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
                  <label className="form-label fw-semibold mb-3" style={{ 
                    color: isDarkMode ? '#fff' : '#2d3748'
                  }}>
                    <i className="bi bi-person-circle me-2"></i>
                    Avatar y Marco
                  </label>
                  
                  <div className="position-relative d-inline-block mb-3">
                    <img
                      src={avatarPreview}
                      alt="Avatar"
                      className={`rounded-circle border-4 ${frameClass}`}
                      style={{ 
                        width: 150, 
                        height: 150, 
                        objectFit: "cover",
                        cursor: 'pointer',
                        borderColor: selectedFrameColor + ' !important'
                      }}
                      onClick={() => fileInputAvatar.current.click()}
                    />
                    <button
                      type="button"
                      className="btn btn-dark position-absolute"
                      style={{
                        bottom: '10px',
                        right: '10px',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onClick={() => fileInputAvatar.current.click()}
                      title="Cambiar foto"
                    >
                      <i className="bi bi-camera"></i>
                    </button>
                  </div>
                  
                  <input
                    ref={fileInputAvatar}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="d-none"
                    onChange={(e) => handleImageChange(e, "avatar")}
                  />
                  
                  {/* Selector visual de marcos */}
                  <div className="mb-2">
                    <FrameSelector 
                      frameClass={frameClass}
                      setFrameClass={setFrameClass}
                      isDarkMode={isDarkMode}
                    />
                  </div>
                  
                  <small className="text-muted">
                    Recomendado: 400x400px, máximo 2MB
                  </small>
                </div>
              </div>

              <div className="col-lg-8">
                <div style={{
                  background: isDarkMode ? '#1e1e1e' : '#fff',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: isDarkMode 
                    ? '0 4px 20px rgba(0,0,0,0.3)' 
                    : '0 4px 20px rgba(0,0,0,0.08)',
                  border: `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}`
                }}>
                  <h5 className="mb-4" style={{ color: isDarkMode ? '#fff' : '#2d3748' }}>
                    <i className="bi bi-info-circle me-2"></i>
                    Información Personal
                  </h5>
                  
                  {/* ✅ Nombre y Apellido */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ 
                        color: isDarkMode ? '#fff' : '#2d3748' 
                      }}>
                        Nombre
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        maxLength={30}
                        style={inputStyles}
                        onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                        onBlur={e => Object.assign(e.target.style, inputStyles)}
                      />
                      <small className="text-muted">
                        {firstName.length}/30 caracteres
                      </small>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ 
                        color: isDarkMode ? '#fff' : '#2d3748' 
                      }}>
                        Apellido
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        maxLength={30}
                        style={inputStyles}
                        onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                        onBlur={e => Object.assign(e.target.style, inputStyles)}
                      />
                      <small className="text-muted">
                        {lastName.length}/30 caracteres
                      </small>
                    </div>
                  </div>

                  {/* ✅ Email (solo lectura) */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ 
                      color: isDarkMode ? '#fff' : '#2d3748' 
                    }}>
                      <i className="bi bi-envelope me-2"></i>
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      readOnly
                      style={readOnlyStyles}
                    />
                    <small className="text-muted">
                      <i className="bi bi-lock me-1"></i>
                      Este campo no se puede modificar
                    </small>
                  </div>

                  {/* ✅ Fecha de nacimiento y País */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ 
                        color: isDarkMode ? '#fff' : '#2d3748' 
                      }}>
                        <i className="bi bi-calendar-date me-2"></i>
                        Fecha de Nacimiento
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                        style={inputStyles}
                        onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                        onBlur={e => Object.assign(e.target.style, inputStyles)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ 
                        color: isDarkMode ? '#fff' : '#2d3748' 
                      }}>
                        <i className="bi bi-geo-alt me-2"></i>
                        País
                      </label>
                      <select
                        className="form-select"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        style={inputStyles}
                        onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                        onBlur={e => Object.assign(e.target.style, inputStyles)}
                      >
                        {COUNTRIES.map(countryOption => (
                          <option key={countryOption.value} value={countryOption.value}>
                            {countryOption.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ 
                      color: isDarkMode ? '#fff' : '#2d3748' 
                    }}>
                      Biografía
                    </label>
                    <textarea
                      className="form-control"
                      rows="4"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      maxLength={500}
                      style={{
                        ...inputStyles,
                        resize: 'vertical'
                      }}
                      onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                      onBlur={e => Object.assign(e.target.style, inputStyles)}
                    />
                    <small className="text-muted">
                      {bio.length}/500 caracteres
                    </small>
                  </div>
                </div>
              </div>
            </div>

            {/* ✅ Sección de cambio de contraseña */}
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
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h5 className="mb-0" style={{ color: isDarkMode ? '#fff' : '#2d3748' }}>
                    <i className="bi bi-shield-lock me-2"></i>
                    Seguridad
                  </h5>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="changePasswordSwitch"
                      checked={changePassword}
                      onChange={(e) => setChangePassword(e.target.checked)}
                      style={{ accentColor: '#d32f2f' }}
                    />
                    <label className="form-check-label" htmlFor="changePasswordSwitch" style={{
                      color: isDarkMode ? '#fff' : '#2d3748'
                    }}>
                      Cambiar contraseña
                    </label>
                  </div>
                </div>

                {changePassword && (
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-semibold" style={{ 
                        color: isDarkMode ? '#fff' : '#2d3748' 
                      }}>
                        Contraseña Actual
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Contraseña actual"
                        style={inputStyles}
                        onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                        onBlur={e => Object.assign(e.target.style, inputStyles)}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-semibold" style={{ 
                        color: isDarkMode ? '#fff' : '#2d3748' 
                      }}>
                        Nueva Contraseña
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Nueva contraseña"
                        minLength={8}
                        style={inputStyles}
                        onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                        onBlur={e => Object.assign(e.target.style, inputStyles)}
                      />
                      <small className="text-muted">
                        Mínimo 8 caracteres
                      </small>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-semibold" style={{ 
                        color: isDarkMode ? '#fff' : '#2d3748' 
                      }}>
                        Confirmar Contraseña
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirmar contraseña"
                        style={{
                          ...inputStyles,
                          borderColor: newPassword && confirmPassword && newPassword !== confirmPassword 
                            ? '#dc3545' 
                            : (isDarkMode ? '#404040' : '#ced4da')
                        }}
                        onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                        onBlur={e => Object.assign(e.target.style, inputStyles)}
                      />
                      {newPassword && confirmPassword && newPassword !== confirmPassword && (
                        <small className="text-danger">
                          <i className="bi bi-exclamation-triangle me-1"></i>
                          Las contraseñas no coinciden
                        </small>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Configuración de notificaciones */}
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
                <h5 className="mb-3" style={{ color: isDarkMode ? '#fff' : '#2d3748' }}>
                  <i className="bi bi-bell me-2"></i>
                  Configuración de Notificaciones
                </h5>
                
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="emailOptIn"
                    checked={emailOptIn}
                    onChange={(e) => setEmailOptIn(e.target.checked)}
                    style={{
                      accentColor: '#d32f2f'
                    }}
                  />
                  <label className="form-check-label" htmlFor="emailOptIn" style={{
                    color: isDarkMode ? '#fff' : '#2d3748'
                  }}>
                    Recibir notificaciones por email sobre nuevos contenidos y actualizaciones
                  </label>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="d-flex gap-3 justify-content-end">
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                onClick={() => window.history.back()}
                style={{
                  borderColor: isDarkMode ? '#666' : '#6c757d',
                  color: isDarkMode ? '#fff' : '#6c757d'
                }}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Cancelar
              </button>
              
              <button
                type="submit"
                className="btn px-4"
                disabled={saving}
                style={{
                  background: saving 
                    ? '#aaa' 
                    : 'linear-gradient(135deg, #d32f2f 0%, #e53935 100%)',
                  color: '#fff',
                  border: 'none',
                  boxShadow: saving ? 'none' : '0 4px 15px rgba(211, 47, 47, 0.3)'
                }}
              >
                {saving ? (
                  <>
                    <div className="spinner-border spinner-border-sm me-2" role="status">
                      <span className="visually-hidden">Guardando...</span>
                    </div>
                    Guardando...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-lg me-2"></i>
                    Guardar Cambios
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ✅ Toaster para las notificaciones de react-hot-toast */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Configuración global
          className: '',
          duration: 4000,
          style: {
            background: isDarkMode ? '#2d2d2d' : '#fff',
            color: isDarkMode ? '#fff' : '#333',
            border: `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}`,
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500'
          },
          // Configuraciones por tipo
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: isDarkMode ? '#2d2d2d' : '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: isDarkMode ? '#2d2d2d' : '#fff',
            },
          },
          loading: {
            iconTheme: {
              primary: '#d32f2f',
              secondary: isDarkMode ? '#2d2d2d' : '#fff',
            },
          },
        }}
      />
    </div>
  );
};

export default ProfileEdit;
