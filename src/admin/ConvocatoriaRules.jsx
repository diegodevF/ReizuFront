import React, { useState, useRef } from 'react';
import Sidebar from './components/Sidebar.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ConvocatoriaRules = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [content, setContent] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [currentColor, setCurrentColor] = useState('#000000');
  const editorRef = useRef(null);

  // Función para aplicar formato bold
  const toggleBold = () => {
    document.execCommand('bold');
    setIsBold(!isBold);
    editorRef.current.focus();
  };

  // Función para cambiar color del texto
  const changeColor = (color) => {
    setCurrentColor(color);
    document.execCommand('foreColor', false, color);
    editorRef.current.focus();
  };

  // Colores predefinidos
  const colors = [
    '#000000', '#d32f2f', '#1976d2', '#388e3c', '#f57c00', 
    '#7b1fa2', '#455a64', '#e91e63', '#00acc1', '#689f38'
  ];

  return (
    <div className="d-flex" style={{ background: '#f5f7fa', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />

      {/* Botón flotante */}
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
          minHeight: "100vh",
          padding: '32px'
        }}
      >
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #d32f2f 0%, #e53935 100%)',
            color: '#fff',
            padding: '24px 32px',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontSize: '24px',
              fontWeight: '700',
              margin: 0
            }}>
              Reglas de la Convocatoria
            </h1>
          </div>

          {/* Toolbar de formato */}
          <div style={{
            background: '#f8f9fa',
            padding: '16px 32px',
            borderBottom: '1px solid #e9ecef',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            {/* Botón Bold */}
            <button
              onClick={toggleBold}
              style={{
                background: isBold ? '#d32f2f' : '#fff',
                color: isBold ? '#fff' : '#495057',
                border: '2px solid #d32f2f',
                borderRadius: '6px',
                padding: '8px 12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.3s ease'
              }}
              title="Negrita"
            >
              <i className="bi bi-type-bold"></i>
            </button>

            {/* Separador */}
            <div style={{
              width: '1px',
              height: '24px',
              background: '#dee2e6'
            }}></div>

            {/* Selector de color */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#495057' }}>
                Color:
              </span>
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => changeColor(color)}
                  style={{
                    width: '32px',
                    height: '32px',
                    background: color,
                    border: currentColor === color ? '3px solid #d32f2f' : '2px solid #dee2e6',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  title={`Color ${color}`}
                />
              ))}
              
              {/* Color picker personalizado */}
              <input
                type="color"
                value={currentColor}
                onChange={(e) => changeColor(e.target.value)}
                style={{
                  width: '32px',
                  height: '32px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
                title="Seleccionar color personalizado"
              />
            </div>
          </div>

          {/* Editor de texto completamente vacío */}
          <div style={{ padding: '32px' }}>
            <div
              ref={editorRef}
              contentEditable="true"
              style={{
                minHeight: '500px',
                padding: '20px',
                border: '2px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '15px',
                lineHeight: '1.6',
                background: '#fff',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#d32f2f';
                e.target.style.boxShadow = '0 0 0 3px rgba(211, 47, 47, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e9ecef';
                e.target.style.boxShadow = 'none';
              }}
              onInput={(e) => setContent(e.target.innerHTML)}
            />
          </div>

          {/* Footer con acciones */}
          <div style={{
            background: '#f8f9fa',
            padding: '20px 32px',
            borderTop: '1px solid #e9ecef',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: '14px', color: '#6c757d' }}>
              {content.length > 0 ? `${content.length} caracteres` : 'Sin contenido'}
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => {
                  editorRef.current.innerHTML = '';
                  setContent('');
                }}
                style={{
                  background: '#6c757d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 20px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.3s ease'
                }}
              >
                <i className="bi bi-trash me-1"></i>
                Limpiar
              </button>
              
              <button
                onClick={() => {
                  console.log('Contenido guardado:', content);
                  alert('Reglas guardadas correctamente');
                }}
                style={{
                  background: 'linear-gradient(135deg, #d32f2f 0%, #e53935 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 24px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '14px',
                  boxShadow: '0 4px 15px rgba(211, 47, 47, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <i className="bi bi-check-circle me-1"></i>
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConvocatoriaRules;
