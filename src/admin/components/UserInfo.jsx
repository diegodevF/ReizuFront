import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Función para obtener el tema actual
const getTheme = () => {
  if (typeof document !== "undefined") {
    return document.documentElement.getAttribute("data-bs-theme") || "light";
  }
  return "light";
};

const UserInfo = () => {
  const [theme, setTheme] = useState(getTheme());
  const [saving, setSaving] = useState(false);
  
  // Estados del formulario
  const [formData, setFormData] = useState({
    // Author Data
    exclusiveAuthor: false,
    
    // Social Networks
    facebook: '',
    instagram: '',
    twitter: '',
    tiktok: '',
    youtube: '',
    twitch: '',
    
    // About Me
    aboutMe: '',
    acceptsCommissions: false,
    
    // Content Types
    contentTypes: {
      nowW: false,
      mangas: false,
      animales: false,
      paisajes: false,
      modelos3d: false,
      mechas: false,
      fanArts: false,
      ocs: false,
      humanos: false,
      aliens: false,
      ships: false,
      aliens2: false,
      ecchi: false,
      furry: false,
      monstruos: false,
      vintage: false
    },
    
    // Drawing Software
    drawingSoftware: '',
    
    // FAQ
    faqs: [
      { question: '', answer: '' }
    ],
    
    // Related Works
    relatedWorks: ''
  });
  
  const [portfolioImages, setPortfolioImages] = useState(Array(10).fill(null));
  const fileInputRefs = useRef(Array(10).fill(null).map(() => React.createRef()));

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
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Manejar carga de imágenes del portafolio
  const handleImageUpload = (index, file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const newImages = [...portfolioImages];
      newImages[index] = event.target.result;
      setPortfolioImages(newImages);
    };
    reader.readAsDataURL(file);
  };

  // Remover imagen del portafolio
  const removeImage = (index) => {
    const newImages = [...portfolioImages];
    newImages[index] = null;
    setPortfolioImages(newImages);
  };

  // Agregar FAQ
  const addFAQ = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }]
    }));
  };

  // Remover FAQ
  const removeFAQ = (index) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  // Actualizar FAQ
  const updateFAQ = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) => 
        i === index ? { ...faq, [field]: value } : faq
      )
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('User information updated successfully ✅');
    } catch (error) {
      console.error(error);
      alert('Error updating information. Please try again.');
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

  const contentTypeItems = [
    { key: 'nowW', label: 'NoW\'W', icon: 'bi-star' },
    { key: 'mangas', label: 'Mangas', icon: 'bi-book' },
    { key: 'animales', label: 'Animals', icon: 'bi-bug' },
    { key: 'paisajes', label: 'Landscapes', icon: 'bi-tree' },
    { key: 'modelos3d', label: '3D Models', icon: 'bi-box' },
    { key: 'mechas', label: 'Mechas', icon: 'bi-robot' },
    { key: 'fanArts', label: 'Fan Arts', icon: 'bi-heart' },
    { key: 'ocs', label: 'OC\'s', icon: 'bi-person' },
    { key: 'humanos', label: 'Humans', icon: 'bi-people' },
    { key: 'aliens', label: 'Aliens', icon: 'bi-rocket' },
    { key: 'ships', label: 'Ships', icon: 'bi-ship' },
    { key: 'aliens2', label: 'Aliens', icon: 'bi-rocket' },
    { key: 'ecchi', label: 'Ecchi', icon: 'bi-suit-heart' },
    { key: 'furry', label: 'Furry', icon: 'bi-paw' },
    { key: 'monstruos', label: 'Monsters', icon: 'bi-emoji-angry' },
    { key: 'vintage', label: 'Vintage', icon: 'bi-clock-history' }
  ];

  return (
    <div style={{
      background: isDarkMode ? '#121212' : '#f5f7fa',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif',
      padding: '32px',
      transition: 'background-color 0.3s ease'
    }}>
      <div className="container" style={{ maxWidth: 1200 }}>
        {/* Header */}
        <div className="mb-4">
          <h1 style={{
            color: isDarkMode ? '#fff' : '#2d3748',
            fontSize: '32px',
            fontWeight: '700',
            margin: '0 0 8px 0',
            letterSpacing: '0.5px'
          }}>
            <i className="bi bi-person-gear me-2" style={{ color: '#d32f2f' }}></i>
            USER INFORMATION
          </h1>
          <p style={{ 
            color: isDarkMode ? '#adb5bd' : '#6c757d',
            fontSize: '16px',
            margin: 0
          }}>
            Manage your profile and professional information
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Author Data */}
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
              <h4 className="mb-3" style={{ 
                color: isDarkMode ? '#fff' : '#2d3748',
                fontSize: '18px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                <i className="bi bi-person-badge me-2" style={{ color: '#d32f2f' }}></i>
                Author Data
              </h4>
              
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="exclusiveAuthor"
                  checked={formData.exclusiveAuthor}
                  onChange={(e) => handleInputChange('exclusiveAuthor', e.target.checked)}
                  style={{ accentColor: '#d32f2f' }}
                />
                <label className="form-check-label" htmlFor="exclusiveAuthor" style={{
                  color: isDarkMode ? '#fff' : '#2d3748',
                  fontWeight: '500'
                }}>
                  Mark this option if the author has exclusive works.
                </label>
              </div>
            </div>
          </div>

          {/* Social Networks */}
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
              <h4 className="mb-3" style={{ 
                color: isDarkMode ? '#fff' : '#2d3748',
                fontSize: '18px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                <i className="bi bi-share me-2" style={{ color: '#d32f2f' }}></i>
                Social Networks
              </h4>

              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label fw-semibold" style={{ color: isDarkMode ? '#fff' : '#2d3748' }}>
                    Facebook
                  </label>
                  <input
                    type="url"
                    value={formData.facebook}
                    onChange={(e) => handleInputChange('facebook', e.target.value)}
                    style={inputStyles}
                    onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                    onBlur={e => Object.assign(e.target.style, inputStyles)}
                    placeholder="Facebook URL"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold" style={{ color: isDarkMode ? '#fff' : '#2d3748' }}>
                    Instagram
                  </label>
                  <input
                    type="url"
                    value={formData.instagram}
                    onChange={(e) => handleInputChange('instagram', e.target.value)}
                    style={inputStyles}
                    onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                    onBlur={e => Object.assign(e.target.style, inputStyles)}
                    placeholder="Instagram URL"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold" style={{ color: isDarkMode ? '#fff' : '#2d3748' }}>
                    X (Twitter)
                  </label>
                  <input
                    type="url"
                    value={formData.twitter}
                    onChange={(e) => handleInputChange('twitter', e.target.value)}
                    style={inputStyles}
                    onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                    onBlur={e => Object.assign(e.target.style, inputStyles)}
                    placeholder="X URL"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold" style={{ color: isDarkMode ? '#fff' : '#2d3748' }}>
                    TikTok
                  </label>
                  <input
                    type="url"
                    value={formData.tiktok}
                    onChange={(e) => handleInputChange('tiktok', e.target.value)}
                    style={inputStyles}
                    onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                    onBlur={e => Object.assign(e.target.style, inputStyles)}
                    placeholder="TikTok URL"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold" style={{ color: isDarkMode ? '#fff' : '#2d3748' }}>
                    YouTube
                  </label>
                  <input
                    type="url"
                    value={formData.youtube}
                    onChange={(e) => handleInputChange('youtube', e.target.value)}
                    style={inputStyles}
                    onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                    onBlur={e => Object.assign(e.target.style, inputStyles)}
                    placeholder="YouTube URL"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold" style={{ color: isDarkMode ? '#fff' : '#2d3748' }}>
                    Twitch
                  </label>
                  <input
                    type="url"
                    value={formData.twitch}
                    onChange={(e) => handleInputChange('twitch', e.target.value)}
                    style={inputStyles}
                    onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                    onBlur={e => Object.assign(e.target.style, inputStyles)}
                    placeholder="Twitch URL"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio */}
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
              <h4 className="mb-3" style={{ 
                color: isDarkMode ? '#fff' : '#2d3748',
                fontSize: '18px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                <i className="bi bi-images me-2" style={{ color: '#d32f2f' }}></i>
                Portfolio
              </h4>

              <div className="row g-3">
                <div className="col-12">
                  <div style={{
                    background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
                    border: `2px dashed ${isDarkMode ? '#555' : '#ced4da'}`,
                    borderRadius: '12px',
                    padding: '16px',
                    textAlign: 'center',
                    marginBottom: '16px'
                  }}>
                    <p style={{ 
                      color: isDarkMode ? '#adb5bd' : '#6c757d',
                      fontSize: '14px',
                      margin: 0,
                      fontWeight: '500'
                    }}>
                      <i className="bi bi-upload me-2"></i>
                      Upload up to 10 images for your portfolio gallery
                    </p>
                    <small style={{ color: isDarkMode ? '#666' : '#999' }}>
                      Maximum file size: 10MB | Archive file
                    </small>
                  </div>
                </div>
              </div>

              <div className="row g-3">
                {portfolioImages.map((image, index) => (
                  <div key={index} className="col-lg-2 col-md-3 col-4">
                    <div style={{
                      aspectRatio: '1',
                      background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
                      border: `2px dashed ${isDarkMode ? '#555' : '#ced4da'}`,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      position: 'relative'
                    }}
                    onClick={() => !image && fileInputRefs.current[index].current.click()}
                    >
                      {image ? (
                        <>
                          <img 
                            src={image} 
                            alt={`Portfolio ${index + 1}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage(index);
                            }}
                            style={{
                              position: 'absolute',
                              top: '8px',
                              right: '8px',
                              background: '#dc3545',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '50%',
                              width: '24px',
                              height: '24px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}
                          >
                            <i className="bi bi-x"></i>
                          </button>
                        </>
                      ) : (
                        <div style={{ 
                          color: isDarkMode ? '#666' : '#999',
                          textAlign: 'center'
                        }}>
                          <i className="bi bi-plus" style={{ fontSize: 24, display: 'block' }}></i>
                          <small>Add Image</small>
                        </div>
                      )}
                      <input
                        ref={fileInputRefs.current[index]}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => handleImageUpload(index, e.target.files[0])}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* About Me */}
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
              <h4 className="mb-3" style={{ 
                color: isDarkMode ? '#fff' : '#2d3748',
                fontSize: '18px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                <i className="bi bi-info-circle me-2" style={{ color: '#d32f2f' }}></i>
                About Me
              </h4>

              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ color: isDarkMode ? '#fff' : '#2d3748' }}>
                  Detailed information (will not be displayed if the same information appears in the "Description")
                </label>
                <textarea
                  rows="6"
                  value={formData.aboutMe}
                  onChange={(e) => handleInputChange('aboutMe', e.target.value)}
                  style={{
                    ...inputStyles,
                    resize: 'vertical'
                  }}
                  onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                  onBlur={e => Object.assign(e.target.style, inputStyles)}
                  placeholder="Tell us about yourself, your experience, and your artistic style..."
                  maxLength={1500}
                />
                <small className="text-muted mt-1 d-block">
                  {formData.aboutMe.length}/1500 characters
                </small>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="acceptsCommissions"
                  checked={formData.acceptsCommissions}
                  onChange={(e) => handleInputChange('acceptsCommissions', e.target.checked)}
                  style={{ accentColor: '#d32f2f' }}
                />
                <label className="form-check-label" htmlFor="acceptsCommissions" style={{
                  color: isDarkMode ? '#fff' : '#2d3748',
                  fontWeight: '500'
                }}>
                  Do you accept commissions?
                </label>
              </div>
            </div>
          </div>

          {/* Content Types */}
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
              <h4 className="mb-3" style={{ 
                color: isDarkMode ? '#fff' : '#2d3748',
                fontSize: '18px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                <i className="bi bi-palette me-2" style={{ color: '#d32f2f' }}></i>
                What kind of content can you create?
              </h4>

              <div className="row g-3">
                {contentTypeItems.map((item) => (
                  <div key={item.key} className="col-lg-3 col-md-4 col-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={item.key}
                        checked={formData.contentTypes[item.key]}
                        onChange={(e) => handleInputChange(`contentTypes.${item.key}`, e.target.checked)}
                        style={{ accentColor: '#d32f2f' }}
                      />
                      <label className="form-check-label d-flex align-items-center" htmlFor={item.key} style={{
                        color: isDarkMode ? '#fff' : '#2d3748',
                        fontWeight: '500'
                      }}>
                        <i className={`${item.icon} me-2`} style={{ color: '#d32f2f' }}></i>
                        {item.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Drawing Software */}
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
              <h4 className="mb-3" style={{ 
                color: isDarkMode ? '#fff' : '#2d3748',
                fontSize: '18px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                <i className="bi bi-pc-display me-2" style={{ color: '#d32f2f' }}></i>
                Which drawing software do you use?
              </h4>

              <textarea
                rows="3"
                value={formData.drawingSoftware}
                onChange={(e) => handleInputChange('drawingSoftware', e.target.value)}
                style={{
                  ...inputStyles,
                  resize: 'vertical'
                }}
                onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                onBlur={e => Object.assign(e.target.style, inputStyles)}
                placeholder="List the software and tools you use for your artwork..."
                maxLength={500}
              />
              <small className="text-muted mt-1 d-block">
                Estimated delivery time: {formData.drawingSoftware.length}/500 characters
              </small>
            </div>
          </div>

          {/* FAQs */}
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
                <h4 style={{ 
                  color: isDarkMode ? '#fff' : '#2d3748',
                  fontSize: '18px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  margin: 0
                }}>
                  <i className="bi bi-question-circle me-2" style={{ color: '#d32f2f' }}></i>
                  Frequently Asked Questions
                </h4>
                <button
                  type="button"
                  onClick={addFAQ}
                  style={{
                    background: 'linear-gradient(135deg, #d32f2f 0%, #e53935 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  <i className="bi bi-plus me-1"></i>
                  Add FAQ
                </button>
              </div>

              {formData.faqs.map((faq, index) => (
                <div key={index} className="mb-3 p-3" style={{
                  background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
                  borderRadius: '12px',
                  border: `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}`
                }}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span style={{ 
                      color: isDarkMode ? '#fff' : '#2d3748',
                      fontWeight: '600',
                      fontSize: '14px'
                    }}>
                      FAQ #{index + 1}
                    </span>
                    {formData.faqs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFAQ(index)}
                        style={{
                          background: '#dc3545',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '4px 8px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    )}
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      placeholder="Question"
                      value={faq.question}
                      onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                      style={inputStyles}
                      onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                      onBlur={e => Object.assign(e.target.style, inputStyles)}
                    />
                  </div>
                  <textarea
                    rows="2"
                    placeholder="Answer"
                    value={faq.answer}
                    onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                    style={{
                      ...inputStyles,
                      resize: 'vertical'
                    }}
                    onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                    onBlur={e => Object.assign(e.target.style, inputStyles)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Related Works */}
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
              <h4 className="mb-3" style={{ 
                color: isDarkMode ? '#fff' : '#2d3748',
                fontSize: '18px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                <i className="bi bi-collection me-2" style={{ color: '#d32f2f' }}></i>
                Related Works
              </h4>

              <select
                value={formData.relatedWorks}
                onChange={(e) => handleInputChange('relatedWorks', e.target.value)}
                style={inputStyles}
                onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                onBlur={e => Object.assign(e.target.style, inputStyles)}
              >
                <option value="">Select related works...</option>
                <option value="work1">+ Add new work</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={saving}
              style={{
                background: saving 
                  ? '#aaa' 
                  : 'linear-gradient(135deg, #d32f2f 0%, #e53935 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                padding: '16px 48px',
                fontWeight: '600',
                fontSize: '18px',
                cursor: saving ? 'not-allowed' : 'pointer',
                boxShadow: saving ? 'none' : '0 4px 15px rgba(211, 47, 47, 0.3)',
                transition: 'all 0.2s ease'
              }}
            >
              {saving ? (
                <>
                  <div className="spinner-border spinner-border-sm me-2" role="status">
                    <span className="visually-hidden">Saving...</span>
                  </div>
                  Updating Information...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle me-2"></i>
                  Update User Information
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
