import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Sidebar from '../admin/components/Sidebar';

const AddSubscription = () => {
  const [theme, setTheme] = useState('light');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'borrador',
    benefits: ['Acceso total al contenido del muro'],
    limitMembers: false,
    memberLimit: '',
    monthlyPrice: '',
    payWithCoins: false,
    coverImage: null
  });

  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Funciones del editor de texto
  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const formatText = (command) => {
    execCommand(command);
  };

  const insertLink = () => {
    const url = prompt('Ingresa la URL del enlace:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const insertList = (type) => {
    execCommand(type === 'ordered' ? 'insertOrderedList' : 'insertUnorderedList');
  };

  const alignText = (alignment) => {
    execCommand(`justify${alignment}`);
  };

  const insertImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageInsert = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        execCommand('insertImage', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const insertQuote = () => {
    execCommand('formatBlock', 'blockquote');
  };

  const handleEditorInput = () => {
    const content = editorRef.current?.innerHTML || '';
    const textContent = editorRef.current?.textContent || '';
    setFormData(prev => ({
      ...prev,
      description: content
    }));
  };

  const addBenefit = () => {
    setFormData(prev => ({
      ...prev,
      benefits: [...prev.benefits, '']
    }));
  };

  const updateBenefit = (index, value) => {
    const newBenefits = [...formData.benefits];
    newBenefits[index] = value;
    setFormData(prev => ({
      ...prev,
      benefits: newBenefits
    }));
  };

  const removeBenefit = (index) => {
    const newBenefits = formData.benefits.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      benefits: newBenefits
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      coverImage: file
    }));
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return now.toLocaleDateString('es-ES', options);
  };

  const getTextLength = () => {
    return editorRef.current?.textContent?.length || 0;
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
          backgroundColor: isDark ? '#2a2a2a' : '#e9ecef'
        }}
      >
        <div className="container-fluid p-4">
          {/* Header */}
          <div className="row">
            <div className="col-12">
              <h1 
                className="fw-bold mb-4"
                style={{ 
                  color: isDark ? '#ffffff' : '#333333',
                  fontSize: '1.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                NUEVO / EDITAR SUSCRIPCIÓN
              </h1>
            </div>
          </div>

          <div className="row">
            {/* Columna izquierda - Formulario */}
            <div className="col-12 col-lg-8">
              {/* Título y Estado */}
              <div className="row mb-4">
                <div className="col-12 col-md-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Escribe título de la suscripción..."
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    style={{
                      backgroundColor: isDark ? '#3a3a3a' : '#ffffff',
                      borderColor: isDark ? '#555555' : '#ced4da',
                      color: isDark ? '#ffffff' : '#000000'
                    }}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <select
                    className="form-select"
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    style={{
                      backgroundColor: isDark ? '#3a3a3a' : '#ffffff',
                      borderColor: isDark ? '#555555' : '#ced4da',
                      color: isDark ? '#ffffff' : '#000000'
                    }}
                  >
                    <option value="borrador">Borrador</option>
                    <option value="publicado">Publicado</option>
                    <option value="programado">Programado</option>
                  </select>
                </div>
              </div>

              {/* Descripción e información */}
              <div className="mb-4">
                <h5 
                  className="fw-bold mb-3"
                  style={{ color: isDark ? '#ffffff' : '#333333' }}
                >
                  Descripción e información
                </h5>
                
                {/* Toolbar del editor funcional */}
                <div 
                  className="d-flex align-items-center p-2 border-bottom flex-wrap"
                  style={{
                    backgroundColor: isDark ? '#3a3a3a' : '#f8f9fa',
                    borderColor: isDark ? '#555555' : '#ced4da'
                  }}
                >
                  <button 
                    className="btn btn-sm btn-outline-secondary me-1 mb-1" 
                    title="Negrita"
                    onClick={() => formatText('bold')}
                  >
                    <i className="bi bi-type-bold"></i>
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-secondary me-1 mb-1" 
                    title="Cursiva"
                    onClick={() => formatText('italic')}
                  >
                    <i className="bi bi-type-italic"></i>
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-secondary me-1 mb-1" 
                    title="Subrayado"
                    onClick={() => formatText('underline')}
                  >
                    <i className="bi bi-type-underline"></i>
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-secondary me-1 mb-1" 
                    title="Enlace"
                    onClick={insertLink}
                  >
                    <i className="bi bi-link"></i>
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-secondary me-1 mb-1" 
                    title="Lista con viñetas"
                    onClick={() => insertList('unordered')}
                  >
                    <i className="bi bi-list-ul"></i>
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-secondary me-1 mb-1" 
                    title="Lista numerada"
                    onClick={() => insertList('ordered')}
                  >
                    <i className="bi bi-list-ol"></i>
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-secondary me-1 mb-1" 
                    title="Alinear al centro"
                    onClick={() => alignText('Center')}
                  >
                    <i className="bi bi-text-center"></i>
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-secondary me-1 mb-1" 
                    title="Alinear a la izquierda"
                    onClick={() => alignText('Left')}
                  >
                    <i className="bi bi-text-left"></i>
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-secondary me-1 mb-1" 
                    title="Alinear a la derecha"
                    onClick={() => alignText('Right')}
                  >
                    <i className="bi bi-text-right"></i>
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-secondary me-1 mb-1" 
                    title="Insertar imagen"
                    onClick={insertImage}
                  >
                    <i className="bi bi-image"></i>
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-secondary me-1 mb-1" 
                    title="Cita"
                    onClick={insertQuote}
                  >
                    <i className="bi bi-chat-quote"></i>
                  </button>
                </div>

                {/* Input oculto para imágenes */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageInsert}
                  style={{ display: 'none' }}
                />

                {/* Editor de texto contentEditable */}
                <div
                  ref={editorRef}
                  contentEditable
                  className="form-control"
                  onInput={handleEditorInput}
                  data-placeholder="Escribe la descripción de la suscripción..."
                  style={{
                    backgroundColor: isDark ? '#3a3a3a' : '#ffffff',
                    borderColor: isDark ? '#555555' : '#ced4da',
                    color: isDark ? '#ffffff' : '#000000',
                    borderTop: 'none',
                    borderTopLeftRadius: '0',
                    borderTopRightRadius: '0',
                    minHeight: '200px',
                    resize: 'vertical',
                    overflow: 'auto'
                  }}
                />
                
                {/* Contador de caracteres */}
                <div className="text-end mt-1">
                  <small style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}>
                    {getTextLength()}/1500
                  </small>
                </div>
              </div>

              {/* Beneficios */}
              <div className="mb-4">
                <h5 
                  className="fw-bold mb-3"
                  style={{ color: isDark ? '#ffffff' : '#333333' }}
                >
                  Beneficios
                </h5>
                
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <input
                      type="text"
                      className="form-control me-2"
                      placeholder="Describe el beneficio..."
                      value={benefit}
                      onChange={(e) => updateBenefit(index, e.target.value)}
                      style={{
                        backgroundColor: isDark ? '#3a3a3a' : '#ffffff',
                        borderColor: isDark ? '#555555' : '#ced4da',
                        color: isDark ? '#ffffff' : '#000000'
                      }}
                    />
                    {formData.benefits.length > 1 && (
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeBenefit(index)}
                        title="Eliminar beneficio"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    )}
                  </div>
                ))}
                
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={addBenefit}
                >
                  <i className="bi bi-plus-circle me-1"></i>
                  Añadir más beneficios
                </button>
              </div>

              {/* Limitar miembros */}
              <div className="mb-4">
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="limitMembers"
                    checked={formData.limitMembers}
                    onChange={(e) => handleInputChange('limitMembers', e.target.checked)}
                  />
                  <label 
                    className="form-check-label fw-medium"
                    htmlFor="limitMembers"
                    style={{ color: isDark ? '#ffffff' : '#333333' }}
                  >
                    Limitar la cantidad de Miembros
                  </label>
                </div>
                
                {formData.limitMembers && (
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Número máximo de miembros"
                        value={formData.memberLimit}
                        onChange={(e) => handleInputChange('memberLimit', e.target.value)}
                        style={{
                          backgroundColor: isDark ? '#3a3a3a' : '#ffffff',
                          borderColor: isDark ? '#555555' : '#ced4da',
                          color: isDark ? '#ffffff' : '#000000'
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Columna derecha - Panel lateral */}
            <div className="col-12 col-lg-4">
              <div className="sticky-top" style={{ top: '20px' }}>
                {/* Acciones */}
                <div 
                  className="card mb-3"
                  style={{
                    backgroundColor: isDark ? '#3a3a3a' : '#ffffff',
                    borderColor: isDark ? '#555555' : '#ced4da'
                  }}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <button className="btn btn-outline-secondary btn-sm">
                        <i className="bi bi-eye me-1"></i>
                        Vista previa
                      </button>
                      <small style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}>
                        {getCurrentDateTime()}
                      </small>
                    </div>
                    
                    <button 
                      className="btn btn-danger w-100 fw-bold"
                      style={{
                        background: 'linear-gradient(45deg, #dc3545, #c82333)',
                        border: 'none'
                      }}
                    >
                      <i className="bi bi-check-circle me-2"></i>
                      Publicar
                    </button>
                  </div>
                </div>

                {/* Precio Mensual */}
                <div 
                  className="card mb-3"
                  style={{
                    backgroundColor: isDark ? '#3a3a3a' : '#ffffff',
                    borderColor: isDark ? '#555555' : '#ced4da'
                  }}
                >
                  <div className="card-body">
                    <h6 
                      className="card-title fw-bold"
                      style={{ color: isDark ? '#ffffff' : '#333333' }}
                    >
                      Precio Mensual
                    </h6>
                    
                    <div className="mb-3">
                      <div className="input-group">
                        <span 
                          className="input-group-text"
                          style={{
                            backgroundColor: isDark ? '#555555' : '#e9ecef',
                            borderColor: isDark ? '#555555' : '#ced4da',
                            color: isDark ? '#ffffff' : '#333333'
                          }}
                        >
                          $
                        </span>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="0.00"
                          step="0.01"
                          value={formData.monthlyPrice}
                          onChange={(e) => handleInputChange('monthlyPrice', e.target.value)}
                          style={{
                            backgroundColor: isDark ? '#3a3a3a' : '#ffffff',
                            borderColor: isDark ? '#555555' : '#ced4da',
                            color: isDark ? '#ffffff' : '#000000'
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="payWithCoins"
                        checked={formData.payWithCoins}
                        onChange={(e) => handleInputChange('payWithCoins', e.target.checked)}
                      />
                      <label 
                        className="form-check-label"
                        htmlFor="payWithCoins"
                        style={{ 
                          color: isDark ? '#ffffff' : '#333333',
                          fontSize: '0.9rem'
                        }}
                      >
                        Pagar con la cantidad Reizu Coins equivalente
                      </label>
                    </div>
                  </div>
                </div>

                {/* Cubierta de la suscripción */}
                <div 
                  className="card"
                  style={{
                    backgroundColor: isDark ? '#3a3a3a' : '#ffffff',
                    borderColor: isDark ? '#555555' : '#ced4da'
                  }}
                >
                  <div className="card-body">
                    <h6 
                      className="card-title fw-bold mb-3"
                      style={{ color: isDark ? '#ffffff' : '#333333' }}
                    >
                      CUBIERTA DE LA SUSCRIPCIÓN
                    </h6>
                    
                    <div 
                      className="mb-3 d-flex align-items-center justify-content-center"
                      style={{
                        height: '200px',
                        backgroundColor: isDark ? '#555555' : '#d6d6d6',
                        border: `2px dashed ${isDark ? '#777777' : '#adb5bd'}`,
                        borderRadius: '8px'
                      }}
                    >
                      {formData.coverImage ? (
                        <img
                          src={URL.createObjectURL(formData.coverImage)}
                          alt="Cubierta"
                          style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'cover',
                            borderRadius: '6px'
                          }}
                        />
                      ) : (
                        <div className="text-center">
                          <i 
                            className="bi bi-image"
                            style={{ 
                              fontSize: '3rem',
                              color: isDark ? '#888888' : '#6c757d'
                            }}
                          ></i>
                          <p 
                            className="mt-2 mb-0"
                            style={{ 
                              color: isDark ? '#888888' : '#6c757d',
                              fontSize: '0.9rem'
                            }}
                          >
                            Sin imagen seleccionada
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="d-grid">
                      <label 
                        htmlFor="coverImageInput"
                        className="btn btn-dark"
                        style={{ cursor: 'pointer' }}
                      >
                        <i className="bi bi-upload me-2"></i>
                        Elegir Archivo
                      </label>
                      <input
                        type="file"
                        id="coverImageInput"
                        className="d-none"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                    
                    {formData.coverImage && (
                      <small 
                        className="text-muted d-block mt-2"
                        style={{ fontSize: '0.8rem' }}
                      >
                        {formData.coverImage.name}
                      </small>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS personalizado para el editor */}
      <style jsx>{`
        [contenteditable="true"]:empty::before {
          content: attr(data-placeholder);
          color: ${isDark ? '#8a8a8a' : '#6c757d'};
          pointer-events: none;
        }
        [contenteditable="true"]:focus {
          outline: none;
        }
        [contenteditable="true"] blockquote {
          border-left: 4px solid #dc3545;
          padding-left: 16px;
          margin: 16px 0;
          font-style: italic;
          background-color: ${isDark ? 'rgba(220, 53, 69, 0.1)' : 'rgba(220, 53, 69, 0.05)'};
          padding: 12px 16px;
          border-radius: 4px;
        }
        [contenteditable="true"] img {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
          margin: 8px 0;
        }
        [contenteditable="true"] ul, [contenteditable="true"] ol {
          padding-left: 20px;
          margin: 8px 0;
        }
        [contenteditable="true"] a {
          color: #dc3545;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default AddSubscription;
