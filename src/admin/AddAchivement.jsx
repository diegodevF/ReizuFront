import React, { useRef, useState } from 'react';
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

const AddAchievement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  // Maneja la carga de la imagen
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div style={{
      background: '#f4f4f4',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif',
      display: 'flex'
    }}>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Botón flotante para abrir sidebar si está cerrada */}
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
        padding: '40px 0 40px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        marginLeft: sidebarOpen ? 270 : 0,
        transition: "margin-left 0.3s"
      }}>
        {/* Header */}
        <div style={{
          padding: '0 48px',
          marginBottom: 16
        }}>
          <h2 style={{
            fontWeight: 700,
            fontSize: 22,
            margin: 0,
            color: '#222'
          }}>
            Añadir / Editar Logro
          </h2>
        </div>

        {/* Formulario principal */}
        <div style={{
          background: '#fff',
          borderRadius: 12,
          margin: '0 48px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          padding: '32px 32px 24px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 28
        }}>
          {/* Título y estado */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <input
              type="text"
              placeholder="Escribe título del capítulo..."
              style={{
                flex: 1,
                fontSize: 17,
                border: '2px solid #e0e0e0',
                borderRadius: 8,
                padding: '12px 16px',
                background: '#fafbfc',
                color: '#222',
                fontWeight: 500,
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={e => e.target.style.borderColor = '#d32f2f'}
              onBlur={e => e.target.style.borderColor = '#e0e0e0'}
            />
            <select style={{
              border: '1.5px solid #bdbdbd',
              borderRadius: 8,
              padding: '10px 18px',
              fontSize: 15,
              background: '#f4f4f4',
              fontWeight: 500
            }}>
              <option>Borrador</option>
              <option>Publicado</option>
            </select>
          </div>

          {/* Inputs de premio y ganancias */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 24,
            alignItems: 'center'
          }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: 15, color: '#444' }}>Premio:</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <input type="text" style={{
                  width: 100,
                  border: '2px solid #e0e0e0',
                  borderRadius: 8,
                  padding: '10px 12px',
                  fontSize: 15,
                  background: '#fafbfc'
                }} />
                <span style={{ fontSize: 15, color: '#888' }}>Reizu Coins</span>
              </div>
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: 15, color: '#444' }}>Ganancia Máxima por usuario:</label>
              <input type="text" style={{
                width: '100%',
                border: '2px solid #e0e0e0',
                borderRadius: 8,
                padding: '10px 12px',
                fontSize: 15,
                background: '#fafbfc'
              }} />
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: 15, color: '#444' }}>Ganancia Máxima Global:</label>
              <input type="text" style={{
                width: '100%',
                border: '2px solid #e0e0e0',
                borderRadius: 8,
                padding: '10px 12px',
                fontSize: 15,
                background: '#fafbfc'
              }} />
            </div>
          </div>

          {/* Pasos a completar */}
          <div>
            <label style={{ fontWeight: 600, fontSize: 15, color: '#444' }}>Pasos a Completar:</label>
            <input type="text" style={{
              width: '100%',
              border: '2px solid #e0e0e0',
              borderRadius: 8,
              padding: '10px 12px',
              fontSize: 15,
              background: '#fafbfc'
            }} />
          </div>
        </div>

        {/* Tabla de ganadores */}
        <div style={{
          background: '#fff',
          borderRadius: 12,
          margin: '0 48px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          padding: '0 0 24px 0'
        }}>
          <div style={{
            borderBottom: '2px solid #e0e0e0',
            padding: '18px 32px',
            fontWeight: 700,
            fontSize: 17,
            color: '#222'
          }}>
            Ganadores
          </div>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 15
          }}>
            <thead>
              <tr style={{ background: '#f9f9f9' }}>
                <th style={{ textAlign: 'left', padding: '14px 32px', fontWeight: 600 }}>Usuario</th>
                <th style={{ textAlign: 'left', padding: '14px 0', fontWeight: 600 }}>Fecha</th>
                <th style={{ textAlign: 'left', padding: '14px 0', fontWeight: 600 }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {mockWinners.map((w, idx) => (
                <tr key={idx} style={{
                  borderTop: '1px solid #eee',
                  background: idx % 2 === 0 ? '#fff' : '#fafbfc'
                }}>
                  <td style={{ padding: '12px 32px' }}>
                    <div style={{ fontWeight: 600 }}>{w.user}</div>
                    <div style={{ color: '#888', fontSize: 13 }}>{w.email}</div>
                  </td>
                  <td style={{ padding: '12px 0' }}>{w.date}</td>
                  <td style={{ padding: '12px 0' }}>
                    <button style={{
                      background: 'none',
                      border: 'none',
                      color: '#d32f2f',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: 15
                    }}>
                      Revocar logro
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Panel lateral */}
      <div style={{
        width: 350,
        minWidth: 300,
        background: '#ededed',
        borderLeft: '1.5px solid #d1d1d1',
        padding: '36px 24px 24px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 32
      }}>
        {/* Info superior */}
        <div style={{
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          padding: '20px 18px 18px 18px',
          marginBottom: 12
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontSize: 15, color: '#888' }}>Visitas: <b>0</b></span>
            <button style={{
              background: '#fff',
              border: '1.5px solid #bdbdbd',
              borderRadius: 8,
              padding: '7px 18px',
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer'
            }}>
              Vista previa
            </button>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontWeight: 600, fontSize: 15 }}>Tipo de logro:</label>
            <select style={{
              width: '100%',
              border: '1.5px solid #bdbdbd',
              borderRadius: 8,
              padding: '10px 12px',
              fontSize: 15,
              background: '#f4f4f4',
              marginTop: 6
            }}>
              <option>Comentario</option>
              <option>Cuenta</option>
            </select>
          </div>
          <div style={{
            background: '#f4f4f4',
            borderRadius: 8,
            padding: '10px 12px',
            fontSize: 13,
            color: '#888',
            marginBottom: 14
          }}>
            18 de May 2025 a las 15:45
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{
              flex: 1,
              background: '#888',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 0',
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer'
            }}>
              Programar
            </button>
            <button style={{
              flex: 1,
              background: 'linear-gradient(135deg, #d32f2f 0%, #e53935 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 0',
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer'
            }}>
              Publicar
            </button>
          </div>
        </div>

        {/* Imagen del logro */}
        <div style={{
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          padding: '20px 18px',
          textAlign: 'center'
        }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Imagen del Logro</div>
          <div style={{
            width: '100%',
            height: 180,
            background: '#e0e0e0',
            borderRadius: 8,
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#bdbdbd',
            fontWeight: 700,
            fontSize: 22,
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {image ? (
              <img src={image} alt="Logro" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <>
                <span>IMAGEN</span>
                <span style={{ fontSize: 18 }}>Logro</span>
              </>
            )}
          </div>
          <button
            style={{
              background: '#222',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 24px',
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer'
            }}
            onClick={() => fileInputRef.current.click()}
          >
            Elegir Archivo
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
