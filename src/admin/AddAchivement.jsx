import React, { useRef, useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';

const mockWinners = [
  {
    user: 'Yuki Miyasawa (@yuki)',
    email: 'hshdsa@gmail.com',
    date: '2025/02/25'
  },
  {
    user: 'Yuki Miyasawa (@yuki)',
    email: 'hshdsa@gmail.com',
    date: '2025/02/25'
  },
  {
    user: 'Yuki Miyasawa (@yuki)',
    email: 'hshdsa@gmail.com',
    date: '2025/02/25'
  }
];

// Función para obtener el tema actual
const getTheme = () => {
  if (typeof document !== "undefined") {
    return document.documentElement.getAttribute("data-bs-theme") || "light";
  }
  return "light";
};

const AddAchievement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [image, setImage] = useState(null);
  const [theme, setTheme] = useState(getTheme());
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('Borrador');
  const [prize, setPrize] = useState('');
  const [maxUserEarning, setMaxUserEarning] = useState('');
  const [maxGlobalEarning, setMaxGlobalEarning] = useState('');
  const [steps, setSteps] = useState('');
  const [achievementType, setAchievementType] = useState('Comentario');
  
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

  // Maneja la carga de la imagen
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
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

  return (
    <div style={{
      background: isDarkMode ? '#121212' : '#f5f7fa',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif',
      display: 'flex',
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

      {/* Contenido principal */}
      <div style={{
        flex: 1,
        padding: '32px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        marginLeft: sidebarOpen ? 280 : 0,
        transition: "margin-left 0.3s"
      }}>
        {/* Header */}
        <div style={{
          padding: '0 48px',
          marginBottom: 16
        }}>
          <h2 style={{
            fontWeight: 700,
            fontSize: 28,
            margin: 0,
            color: isDarkMode ? '#fff' : '#2d3748'
          }}>
            <i className="bi bi-award me-2" style={{ color: '#d32f2f' }}></i>
            Añadir / Editar Logro
          </h2>
          <p style={{ 
            color: isDarkMode ? '#adb5bd' : '#6c757d',
            fontSize: '16px',
            margin: '8px 0 0 0'
          }}>
            Crea y gestiona los logros de la plataforma
          </p>
        </div>

        {/* Formulario principal */}
        <div style={{
          background: isDarkMode ? '#1e1e1e' : '#fff',
          borderRadius: 16,
          margin: '0 48px',
          boxShadow: isDarkMode 
            ? '0 4px 20px rgba(0,0,0,0.3)' 
            : '0 4px 20px rgba(0,0,0,0.08)',
          border: `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}`,
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 28
        }}>
          {/* Título y estado */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <input
              type="text"
              placeholder="Nombre del logro..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                ...inputStyles,
                flex: 1,
                fontSize: '17px'
              }}
              onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
              onBlur={e => Object.assign(e.target.style, {
                borderColor: isDarkMode ? '#404040' : '#e0e0e0',
                boxShadow: 'none'
              })}
            />
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{
                background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
                color: isDarkMode ? '#fff' : '#333',
                border: `2px solid ${isDarkMode ? '#404040' : '#ced4da'}`,
                borderRadius: 8,
                padding: '12px 18px',
                fontSize: 15,
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option>Borrador</option>
              <option>Publicado</option>
            </select>
          </div>

          {/* Inputs de premio y ganancias */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 24,
            alignItems: 'start'
          }}>
            <div>
              <label style={{ 
                fontWeight: 600, 
                fontSize: 15, 
                color: isDarkMode ? '#fff' : '#2d3748',
                display: 'block',
                marginBottom: 8
              }}>
                <i className="bi bi-coin me-2" style={{ color: '#d32f2f' }}></i>
                Premio:
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input 
                  type="number" 
                  value={prize}
                  onChange={(e) => setPrize(e.target.value)}
                  style={{
                    ...inputStyles,
                    width: 120
                  }}
                  onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                  onBlur={e => Object.assign(e.target.style, {
                    borderColor: isDarkMode ? '#404040' : '#e0e0e0',
                    boxShadow: 'none'
                  })}
                />
                <span style={{ 
                  fontSize: 15, 
                  color: isDarkMode ? '#adb5bd' : '#6c757d',
                  fontWeight: 500
                }}>
                  Reizu Coins
                </span>
              </div>
            </div>
            
            <div>
              <label style={{ 
                fontWeight: 600, 
                fontSize: 15, 
                color: isDarkMode ? '#fff' : '#2d3748',
                display: 'block',
                marginBottom: 8
              }}>
                <i className="bi bi-person-check me-2" style={{ color: '#d32f2f' }}></i>
                Ganancia Máxima por usuario:
              </label>
              <input 
                type="number" 
                value={maxUserEarning}
                onChange={(e) => setMaxUserEarning(e.target.value)}
                style={inputStyles}
                onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                onBlur={e => Object.assign(e.target.style, {
                  borderColor: isDarkMode ? '#404040' : '#e0e0e0',
                  boxShadow: 'none'
                })}
              />
            </div>
            
            <div>
              <label style={{ 
                fontWeight: 600, 
                fontSize: 15, 
                color: isDarkMode ? '#fff' : '#2d3748',
                display: 'block',
                marginBottom: 8
              }}>
                <i className="bi bi-globe me-2" style={{ color: '#d32f2f' }}></i>
                Ganancia Máxima Global:
              </label>
              <input 
                type="number" 
                value={maxGlobalEarning}
                onChange={(e) => setMaxGlobalEarning(e.target.value)}
                style={inputStyles}
                onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
                onBlur={e => Object.assign(e.target.style, {
                  borderColor: isDarkMode ? '#404040' : '#e0e0e0',
                  boxShadow: 'none'
                })}
              />
            </div>
          </div>

          {/* Pasos a completar */}
          <div>
            <label style={{ 
              fontWeight: 600, 
              fontSize: 15, 
              color: isDarkMode ? '#fff' : '#2d3748',
              display: 'block',
              marginBottom: 8
            }}>
              <i className="bi bi-list-check me-2" style={{ color: '#d32f2f' }}></i>
              Pasos a Completar:
            </label>
            <textarea
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              placeholder="Describe los pasos necesarios para obtener este logro..."
              rows={3}
              style={{
                ...inputStyles,
                resize: 'vertical'
              }}
              onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
              onBlur={e => Object.assign(e.target.style, {
                borderColor: isDarkMode ? '#404040' : '#e0e0e0',
                boxShadow: 'none'
              })}
            />
          </div>
        </div>

        {/* Tabla de ganadores */}
        <div style={{
          background: isDarkMode ? '#1e1e1e' : '#fff',
          borderRadius: 16,
          margin: '0 48px',
          boxShadow: isDarkMode 
            ? '0 4px 20px rgba(0,0,0,0.3)' 
            : '0 4px 20px rgba(0,0,0,0.08)',
          border: `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}`,
          overflow: 'hidden'
        }}>
          <div style={{
            borderBottom: `2px solid ${isDarkMode ? '#404040' : '#e9ecef'}`,
            padding: '20px 32px',
            background: isDarkMode ? '#2d2d2d' : '#f8f9fa'
          }}>
            <h3 style={{
              fontWeight: 700,
              fontSize: 18,
              color: isDarkMode ? '#fff' : '#2d3748',
              margin: 0
            }}>
              <i className="bi bi-trophy me-2" style={{ color: '#d32f2f' }}></i>
              Ganadores ({mockWinners.length})
            </h3>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: 15
            }}>
              <thead>
                <tr style={{ 
                  background: isDarkMode ? '#2a2a2a' : '#f8f9fa'
                }}>
                  <th style={{ 
                    textAlign: 'left', 
                    padding: '16px 32px', 
                    fontWeight: 600,
                    color: isDarkMode ? '#fff' : '#2d3748'
                  }}>
                    Usuario
                  </th>
                  <th style={{ 
                    textAlign: 'left', 
                    padding: '16px 20px', 
                    fontWeight: 600,
                    color: isDarkMode ? '#fff' : '#2d3748'
                  }}>
                    Fecha
                  </th>
                  <th style={{ 
                    textAlign: 'left', 
                    padding: '16px 20px', 
                    fontWeight: 600,
                    color: isDarkMode ? '#fff' : '#2d3748'
                  }}>
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockWinners.map((winner, idx) => (
                  <tr key={idx} style={{
                    borderTop: `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}`,
                    background: idx % 2 === 0 
                      ? (isDarkMode ? '#1e1e1e' : '#fff') 
                      : (isDarkMode ? '#252525' : '#f8f9fa'),
                    transition: 'background-color 0.2s ease'
                  }}>
                    <td style={{ padding: '16px 32px' }}>
                      <div style={{ 
                        fontWeight: 600,
                        color: isDarkMode ? '#fff' : '#2d3748'
                      }}>
                        {winner.user}
                      </div>
                      <div style={{ 
                        color: isDarkMode ? '#adb5bd' : '#6c757d', 
                        fontSize: 13,
                        marginTop: 2
                      }}>
                        {winner.email}
                      </div>
                    </td>
                    <td style={{ 
                      padding: '16px 20px',
                      color: isDarkMode ? '#adb5bd' : '#6c757d'
                    }}>
                      {winner.date}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <button style={{
                        background: 'none',
                        border: 'none',
                        color: '#d32f2f',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontSize: 14,
                        padding: '6px 12px',
                        borderRadius: '6px',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={e => e.target.style.backgroundColor = isDarkMode ? '#404040' : '#f8f9fa'}
                      onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
                      >
                        <i className="bi bi-x-circle me-1"></i>
                        Revocar logro
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Panel lateral */}
      <div style={{
        width: 350,
        minWidth: 300,
        background: isDarkMode ? '#1a1a1a' : '#f0f2f5',
        borderLeft: `2px solid ${isDarkMode ? '#404040' : '#e9ecef'}`,
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 24
      }}>
        {/* Info superior */}
        <div style={{
          background: isDarkMode ? '#1e1e1e' : '#fff',
          borderRadius: 16,
          boxShadow: isDarkMode 
            ? '0 4px 20px rgba(0,0,0,0.3)' 
            : '0 4px 20px rgba(0,0,0,0.08)',
          border: `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}`,
          padding: '20px',
          marginBottom: 8
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: 16 
          }}>
            <span style={{ 
              fontSize: 15, 
              color: isDarkMode ? '#adb5bd' : '#6c757d' 
            }}>
              Visitas: <strong style={{ color: isDarkMode ? '#fff' : '#2d3748' }}>0</strong>
            </span>
            <button style={{
              background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
              color: isDarkMode ? '#fff' : '#2d3748',
              border: `2px solid ${isDarkMode ? '#404040' : '#ced4da'}`,
              borderRadius: 8,
              padding: '8px 16px',
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => {
              e.target.style.borderColor = '#d32f2f';
              e.target.style.color = '#d32f2f';
            }}
            onMouseLeave={e => {
              e.target.style.borderColor = isDarkMode ? '#404040' : '#ced4da';
              e.target.style.color = isDarkMode ? '#fff' : '#2d3748';
            }}
            >
              <i className="bi bi-eye me-2"></i>
              Vista previa
            </button>
          </div>
          
          <div style={{ marginBottom: 16 }}>
            <label style={{ 
              fontWeight: 600, 
              fontSize: 15,
              color: isDarkMode ? '#fff' : '#2d3748',
              display: 'block',
              marginBottom: 8
            }}>
              <i className="bi bi-tag me-2" style={{ color: '#d32f2f' }}></i>
              Tipo de logro:
            </label>
            <select 
              value={achievementType}
              onChange={(e) => setAchievementType(e.target.value)}
              style={{
                width: '100%',
                background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
                color: isDarkMode ? '#fff' : '#333',
                border: `2px solid ${isDarkMode ? '#404040' : '#ced4da'}`,
                borderRadius: 8,
                padding: '10px 14px',
                fontSize: 15,
                fontWeight: 500,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option>Comentario</option>
              <option>Cuenta</option>
              <option>Lectura</option>
              <option>Interacción</option>
            </select>
          </div>
          
          <div style={{
            background: isDarkMode ? '#2a2a2a' : '#f8f9fa',
            borderRadius: 8,
            padding: '12px 14px',
            fontSize: 13,
            color: isDarkMode ? '#adb5bd' : '#6c757d',
            marginBottom: 16,
            border: `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}`
          }}>
            <i className="bi bi-calendar-check me-2"></i>
            18 de May 2025 a las 15:45
          </div>
          
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{
              flex: 1,
              background: isDarkMode ? '#404040' : '#6c757d',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '12px 0',
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={e => e.target.style.backgroundColor = isDarkMode ? '#505050' : '#5a6268'}
            onMouseLeave={e => e.target.style.backgroundColor = isDarkMode ? '#404040' : '#6c757d'}
            >
              <i className="bi bi-clock me-2"></i>
              Programar
            </button>
            <button style={{
              flex: 1,
              background: 'linear-gradient(135deg, #d32f2f 0%, #e53935 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '12px 0',
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(211, 47, 47, 0.3)',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={e => e.target.style.transform = 'translateY(-1px)'}
            onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
            >
              <i className="bi bi-check-circle me-2"></i>
              Publicar
            </button>
          </div>
        </div>

        {/* Imagen del logro */}
        <div style={{
          background: isDarkMode ? '#1e1e1e' : '#fff',
          borderRadius: 16,
          boxShadow: isDarkMode 
            ? '0 4px 20px rgba(0,0,0,0.3)' 
            : '0 4px 20px rgba(0,0,0,0.08)',
          border: `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}`,
          padding: '20px',
          textAlign: 'center'
        }}>
          <h4 style={{ 
            fontWeight: 700, 
            fontSize: 16, 
            marginBottom: 16,
            color: isDarkMode ? '#fff' : '#2d3748'
          }}>
            <i className="bi bi-image me-2" style={{ color: '#d32f2f' }}></i>
            Imagen del Logro
          </h4>
          
          <div style={{
            width: '100%',
            height: 180,
            background: isDarkMode ? '#2a2a2a' : '#f0f2f5',
            border: `2px dashed ${isDarkMode ? '#555' : '#ccc'}`,
            borderRadius: 12,
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isDarkMode ? '#666' : '#999',
            fontWeight: 600,
            fontSize: 16,
            flexDirection: 'column',
            overflow: 'hidden',
            transition: 'border-color 0.3s ease',
            cursor: 'pointer'
          }}
          onClick={() => fileInputRef.current.click()}
          onMouseEnter={e => e.target.style.borderColor = '#d32f2f'}
          onMouseLeave={e => e.target.style.borderColor = isDarkMode ? '#555' : '#ccc'}
          >
            {image ? (
              <img 
                src={image} 
                alt="Logro" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  borderRadius: 8
                }} 
              />
            ) : (
              <>
                <i className="bi bi-cloud-upload" style={{ fontSize: 32, marginBottom: 8 }}></i>
                <span>Subir Imagen</span>
                <small style={{ fontSize: 12, marginTop: 4 }}>
                  PNG, JPG hasta 5MB
                </small>
              </>
            )}
          </div>
          
          <button
            style={{
              background: 'linear-gradient(135deg, #d32f2f 0%, #e53935 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 24px',
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(211, 47, 47, 0.3)',
              transition: 'transform 0.2s ease'
            }}
            onClick={() => fileInputRef.current.click()}
            onMouseEnter={e => e.target.style.transform = 'translateY(-1px)'}
            onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
          >
            <i className="bi bi-upload me-2"></i>
            {image ? 'Cambiar Archivo' : 'Elegir Archivo'}
          </button>
          
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AddAchievement;
