import React, { useState, useRef } from 'react';
import Sidebar from './components/Sidebar.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Configuración del grid para subida de imágenes
const GRID_ROWS_CASCADA = 3;  // Filas para versión cascada
const GRID_COLS_CASCADA = 7;  // Columnas para versión cascada
const GRID_ROWS_PAGINADA = 4; // Filas para versión paginada
const GRID_COLS_PAGINADA = 7; // Columnas para versión paginada

// Datos simulados de participantes para la tabla de calificaciones
const participantesData = Array(6).fill({
  usuario: "Yuki Mysterman (Epico)",
  email: "handagmail.com", 
  originalidad: "3/5",
  tecnica: "3/5",
  dibujo: "3/5",
  historia: "3/5",
  total: 12,
  fecha: "2025/02/25"
});

/**
 * Componente principal para crear un nuevo ONESHOT
 * Permite subir imágenes en dos formatos: cascada y paginada
 * Incluye formulario completo con géneros, configuración técnica y tabla de calificaciones
 */
const AddParticipant = () => {
  // Estados principales del componente
  const [sidebarOpen, setSidebarOpen] = useState(true); // Control de apertura/cierre del sidebar
  
  // Estado del formulario principal con todos los campos necesarios
  const [formData, setFormData] = useState({
    titulo: '',                                    // Título del oneshot
    visitias: 0,                                  // Contador de visitas
    periodo: 'CONVOCATORIA DE FEBRERO',           // Periodo de la convocatoria
    premio: '1er lugar',                          // Posición del premio
    categoria: 'Manga',                           // Categoría del trabajo
    formato: 'Horizontal',                        // Formato de lectura
    mancha: 'Negro',                              // Tipo de arte (blanco y negro o color)
    resolucion: '300px',                          // Resolución de las imágenes
    palabrasAutor: '',                            // Comentarios del autor
    portada: null,                                // Archivo de portada
    generos: {                                    // Géneros seleccionados (checkboxes)
      accion: false,
      aventura: false,
      comedia: false,
      cienciaFiccion: false,
      drama: false,
      fantasia: false,
      horror: false,
      misterio: false,
      romance: false,
      slice: false,
      sobrenatural: false,
      thriller: false,
      historico: false,
      psicologico: false,
      madreche: false,
      bl: false
    }
  });

  // Estados para manejo de archivos subidos
  const [paginasCascada, setPaginasCascada] = useState([]);   // Archivos para versión cascada
  const [paginasPaginada, setPaginasPaginada] = useState([]); // Archivos para versión paginada
  
  // Referencias para inputs de archivo (para abrir dialogo de selección)
  const cascadaInputRef = useRef(null);   // Referencia input cascada
  const paginadaInputRef = useRef(null);  // Referencia input paginada
  const portadaInputRef = useRef(null);   // Referencia input portada

  /**
   * Maneja cambios en todos los inputs del formulario
   * Incluye lógica especial para géneros que usan checkboxes
   */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Manejo especial para géneros (checkboxes con nombre genero_*)
    if (name.startsWith('genero_')) {
      const genero = name.replace('genero_', ''); // Extrae el nombre del género
      setFormData(prev => ({
        ...prev,
        generos: {
          ...prev.generos,
          [genero]: checked // Actualiza solo el género específico
        }
      }));
    } else {
      // Manejo normal para otros campos
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  /**
   * Maneja la subida de archivos para versión cascada
   * Limita la cantidad según el tamaño del grid
   */
  const handleCascadaChange = (e) => {
    const files = Array.from(e.target.files);
    const maxFiles = GRID_ROWS_CASCADA * GRID_COLS_CASCADA; // Calcula máximo de archivos
    setPaginasCascada(files.slice(0, maxFiles)); // Limita archivos al máximo permitido
  };

  /**
   * Maneja la subida de archivos para versión paginada
   * Limita la cantidad según el tamaño del grid
   */
  const handlePaginadaChange = (e) => {
    const files = Array.from(e.target.files);
    const maxFiles = GRID_ROWS_PAGINADA * GRID_COLS_PAGINADA; // Calcula máximo de archivos
    setPaginasPaginada(files.slice(0, maxFiles)); // Limita archivos al máximo permitido
  };

  /**
   * Maneja la subida del archivo de portada
   * Solo permite un archivo
   */
  const handlePortadaChange = (e) => {
    const file = e.target.files[0];
    if (file) setFormData(prev => ({ ...prev, portada: file }));
  };

  /**
   * Renderiza el grid de imágenes para versión cascada
   * Crea placeholders vacíos y muestra las imágenes subidas
   */
  const renderGridCascada = () => {
    const total = GRID_ROWS_CASCADA * GRID_COLS_CASCADA; // Total de slots disponibles
    let items = [];
    
    // Genera cada slot del grid
    for (let i = 0; i < total; i++) {
      const file = paginasCascada[i]; // Archivo correspondiente a esta posición
      items.push(
        <div
          key={i}
          style={{
            width: 70,
            height: 90,
            // Si hay archivo, fondo claro; si no, gradiente placeholder
            background: file ? '#f8f9fa' : 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            border: '2px dashed #dee2e6',
            transition: 'all 0.2s ease'
          }}
        >
          {file ? (
            // Si hay archivo, muestra la imagen
            <img
              src={URL.createObjectURL(file)}
              alt={`cascada ${i + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6 }}
            />
          ) : (
            // Si no hay archivo, muestra ícono placeholder
            <i className="bi bi-image text-muted" style={{ fontSize: '1.2rem' }}></i>
          )}
        </div>
      );
    }
    return items;
  };

  /**
   * Renderiza el grid de imágenes para versión paginada
   * Funciona igual que renderGridCascada pero para páginas
   */
  const renderGridPaginada = () => {
    const total = GRID_ROWS_PAGINADA * GRID_COLS_PAGINADA; // Total de slots disponibles
    let items = [];
    
    // Genera cada slot del grid
    for (let i = 0; i < total; i++) {
      const file = paginasPaginada[i]; // Archivo correspondiente a esta posición
      items.push(
        <div
          key={i}
          style={{
            width: 70,
            height: 90,
            // Si hay archivo, fondo claro; si no, gradiente placeholder
            background: file ? '#f8f9fa' : 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            border: '2px dashed #dee2e6',
            transition: 'all 0.2s ease'
          }}
        >
          {file ? (
            // Si hay archivo, muestra la imagen
            <img
              src={URL.createObjectURL(file)}
              alt={`paginada ${i + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6 }}
            />
          ) : (
            // Si no hay archivo, muestra ícono placeholder
            <i className="bi bi-image text-muted" style={{ fontSize: '1.2rem' }}></i>
          )}
        </div>
      );
    }
    return items;
  };

  return (
    <div className="d-flex" style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* Sidebar principal */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Botón flotante para abrir sidebar cuando está cerrado */}
      {!sidebarOpen && (
        <button
          className="btn position-fixed"
          style={{
            top: 16,
            left: 0,
            zIndex: 2000,
            borderRadius: '0% 50% 50% 0%',
            width: 42,
            height: 42,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: "linear-gradient(135deg, #d32f2f 0%, #e53935 100%)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(211, 47, 47, 0.4)"
          }}
          onClick={() => setSidebarOpen(true)}
        >
          <i className="bi bi-chevron-right" style={{ fontSize: 22 }}></i>
        </button>
      )}

      {/* Contenido principal del formulario */}
      <div
        style={{
          flexGrow: 1,
          marginLeft: sidebarOpen ? 280 : 0, // Ajusta margen según estado del sidebar
          transition: "margin-left 0.3s",
          minHeight: "100vh"
        }}
      >
        <div style={{ padding: 32, display: "flex", gap: 24 }}>
          {/* Columna principal - Formulario principal */}
          <div style={{ flex: 1, minWidth: 0 }}>
            
            {/* Header con título y campo de título */}
            <div style={{
              background: "#fff",
              padding: "24px 32px",
              borderRadius: 16,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              marginBottom: 24,
              border: "1px solid #e9ecef"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 16 }}>
                <h2 style={{ 
                  fontWeight: 700, 
                  fontSize: 24, 
                  color: "#2d3748",
                  margin: 0,
                  background: "linear-gradient(135deg, #d32f2f 0%, #e53935 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>
                  Nuevo ONESHOT
                </h2>
                {/* Línea decorativa */}
                <div className="flex-grow-1" style={{ height: 2, background: "linear-gradient(135deg, #d32f2f 0%, #e53935 100%)", borderRadius: 1 }}></div>
              </div>
              
              {/* Campo de título con efectos de focus */}
              <input
                type="text"
                placeholder="Escribe título del oneshot..."
                name="titulo"
                value={formData.titulo}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  fontSize: 18,
                  border: "2px solid #e9ecef",
                  borderRadius: 12,
                  padding: "12px 20px",
                  background: "#f8f9fa",
                  color: "#2d3748",
                  transition: "all 0.3s ease",
                  fontWeight: 500
                }}
                onFocus={(e) => {
                  // Efectos visuales al enfocar el campo
                  e.target.style.borderColor = "#d32f2f";
                  e.target.style.background = "#fff";
                  e.target.style.boxShadow = "0 0 0 3px rgba(211, 47, 47, 0.1)";
                }}
                onBlur={(e) => {
                  // Revertir efectos al perder el foco
                  e.target.style.borderColor = "#e9ecef";
                  e.target.style.background = "#f8f9fa";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Sección de versión cascada */}
            <div style={{
              background: "#fff",
              borderRadius: 16,
              padding: 24,
              marginBottom: 24,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              border: "1px solid #e9ecef"
            }}>
              {/* Header de la sección cascada */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                <h3 style={{ 
                  fontWeight: 600, 
                  fontSize: 18,
                  color: "#2d3748",
                  margin: 0
                }}>
                  Versión de lectura Cascada
                </h3>
                {/* Botón para abrir selector de archivos */}
                <button
                  style={{
                    background: "linear-gradient(135deg, #d32f2f 0%, #e53935 100%)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    padding: "10px 20px",
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                    boxShadow: "0 4px 15px rgba(211, 47, 47, 0.3)",
                    transition: "all 0.3s ease"
                  }}
                  onClick={() => cascadaInputRef.current.click()} // Activa input oculto
                  onMouseOver={e => e.target.style.transform = "translateY(-2px)"}
                  onMouseOut={e => e.target.style.transform = "translateY(0)"}
                >
                  <i className="bi bi-cloud-upload me-2"></i>
                  Elegir Archivo
                </button>
                {/* Input oculto para selección de archivos múltiples */}
                <input
                  ref={cascadaInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleCascadaChange}
                  style={{ display: "none" }}
                />
              </div>
              
              {/* Grid de imágenes cascada */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${GRID_COLS_CASCADA}, 1fr)`, // Columnas dinámicas
                gap: 12,
                background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                padding: 20,
                borderRadius: 12,
                marginBottom: 16,
                border: "2px dashed #dee2e6"
              }}>
                {renderGridCascada()}
              </div>
              
              {/* Nota informativa */}
              <p style={{
                fontSize: 14,
                color: "#6c757d",
                margin: 0,
                lineHeight: 1.5,
                background: "#f8f9fa",
                padding: 12,
                borderRadius: 8,
                borderLeft: "4px solid #d32f2f"
              }}>
                💡 Sube las páginas del oneshot en formato imagen de forma normal, se ordenarán automáticamente.
              </p>
            </div>

            {/* Sección de versión paginada */}
            <div style={{
              background: "#fff",
              borderRadius: 16,
              padding: 24,
              marginBottom: 24,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              border: "1px solid #e9ecef"
            }}>
              {/* Header de la sección paginada */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                <h3 style={{ 
                  fontWeight: 600, 
                  fontSize: 18,
                  color: "#2d3748",
                  margin: 0
                }}>
                  Versión de lectura Paginada
                </h3>
                {/* Botón para abrir selector de archivos */}
                <button
                  style={{
                    background: "linear-gradient(135deg, #d32f2f 0%, #e53935 100%)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    padding: "10px 20px",
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                    boxShadow: "0 4px 15px rgba(211, 47, 47, 0.3)",
                    transition: "all 0.3s ease"
                  }}
                  onClick={() => paginadaInputRef.current.click()} // Activa input oculto
                  onMouseOver={e => e.target.style.transform = "translateY(-2px)"}
                  onMouseOut={e => e.target.style.transform = "translateY(0)"}
                >
                  <i className="bi bi-cloud-upload me-2"></i>
                  Elegir Archivo
                </button>
                {/* Input oculto para selección de archivos múltiples */}
                <input
                  ref={paginadaInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePaginadaChange}
                  style={{ display: "none" }}
                />
                {/* Badge informativo */}
                <div style={{
                  background: "#fff3e0",
                  color: "#f57c00",
                  padding: "6px 12px",
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 500
                }}>
                  ✓ Página en blanco al inicio
                </div>
              </div>
              
              {/* Grid de imágenes paginada */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${GRID_COLS_PAGINADA}, 1fr)`, // Columnas dinámicas
                gap: 12,
                background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                padding: 20,
                borderRadius: 12,
                marginBottom: 16,
                border: "2px dashed #dee2e6"
              }}>
                {renderGridPaginada()}
              </div>
              
              {/* Nota informativa */}
              <p style={{
                fontSize: 14,
                color: "#6c757d",
                margin: 0,
                lineHeight: 1.5,
                background: "#f8f9fa",
                padding: 12,
                borderRadius: 8,
                borderLeft: "4px solid #d32f2f"
              }}>
                📖 Sube las páginas en orden. Compatible con PDF (conversión automática). Corta páginas dobles si las hay.
              </p>
            </div>

            {/* Sección de palabras del autor */}
            <div style={{
              background: "#fff",
              borderRadius: 16,
              padding: 24,
              marginBottom: 24,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              border: "1px solid #e9ecef"
            }}>
              <label style={{ 
                fontWeight: 600, 
                fontSize: 16, 
                display: "block", 
                marginBottom: 12,
                color: "#2d3748"
              }}>
                💭 Palabras del Autor
              </label>
              {/* Textarea con efectos de focus */}
              <textarea
                name="palabrasAutor"
                value={formData.palabrasAutor}
                onChange={handleInputChange}
                rows={4}
                style={{
                  width: "100%",
                  padding: 16,
                  fontSize: 15,
                  borderRadius: 12,
                  border: "2px solid #e9ecef",
                  background: "#f8f9fa",
                  color: "#2d3748",
                  resize: "vertical",
                  transition: "all 0.3s ease",
                  lineHeight: 1.6
                }}
                placeholder="Comparte tus pensamientos sobre este oneshot..."
                onFocus={(e) => {
                  // Efectos visuales al enfocar
                  e.target.style.borderColor = "#d32f2f";
                  e.target.style.background = "#fff";
                  e.target.style.boxShadow = "0 0 0 3px rgba(211, 47, 47, 0.1)";
                }}
                onBlur={(e) => {
                  // Revertir efectos al perder el foco
                  e.target.style.borderColor = "#e9ecef";
                  e.target.style.background = "#f8f9fa";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Tabla de calificaciones */}
            <div style={{
              background: "#fff",
              borderRadius: 16,
              padding: 24,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              border: "1px solid #e9ecef"
            }}>
              {/* Header de la tabla */}
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 12, 
                marginBottom: 20 
              }}>
                <h3 style={{ 
                  fontWeight: 600, 
                  fontSize: 18,
                  color: "#2d3748",
                  margin: 0
                }}>
                  📊 CALIFICACIONES
                </h3>
                {/* Badge con información de puntuación */}
                <div style={{
                  background: "linear-gradient(135deg, #d32f2f 0%, #e53935 100%)",
                  color: "#fff",
                  padding: "4px 12px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 600
                }}>
                  PROMEDIO TOTAL 50 PUNTOS
                </div>
              </div>
              
              {/* Contenedor con scroll horizontal para la tabla */}
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                  {/* Encabezados de la tabla */}
                  <thead>
                    <tr style={{ background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)" }}>
                      <th style={{ textAlign: "left", padding: "16px 12px", fontWeight: 600, color: "#495057", borderRadius: "8px 0 0 8px" }}>Usuario</th>
                      <th style={{ textAlign: "center", padding: "16px 12px", fontWeight: 600, color: "#495057" }}>Originalidad</th>
                      <th style={{ textAlign: "center", padding: "16px 12px", fontWeight: 600, color: "#495057" }}>Técnica</th>
                      <th style={{ textAlign: "center", padding: "16px 12px", fontWeight: 600, color: "#495057" }}>Dibujo</th>
                      <th style={{ textAlign: "center", padding: "16px 12px", fontWeight: 600, color: "#495057" }}>Historia</th>
                      <th style={{ textAlign: "center", padding: "16px 12px", fontWeight: 600, color: "#495057" }}>Total</th>
                      <th style={{ textAlign: "center", padding: "16px 12px", fontWeight: 600, color: "#495057", borderRadius: "0 8px 8px 0" }}>Fecha</th>
                    </tr>
                  </thead>
                  {/* Cuerpo de la tabla con datos simulados */}
                  <tbody>
                    {participantesData.map((item, idx) => (
                      <tr key={idx} style={{ 
                        borderBottom: "1px solid #f1f3f4",
                        transition: "background-color 0.2s ease"
                      }}
                      // Efectos hover en las filas
                      onMouseOver={e => e.currentTarget.style.backgroundColor = "#f8f9fa"}
                      onMouseOut={e => e.currentTarget.style.backgroundColor = "transparent"}
                      >
                        {/* Celda de usuario con avatar */}
                        <td style={{ padding: "16px 12px", display: "flex", alignItems: "center", gap: 12 }}>
                          {/* Avatar circular con inicial */}
                          <div style={{ 
                            width: 36, 
                            height: 36, 
                            background: "linear-gradient(135deg, #d32f2f 0%, #e53935 100%)", 
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: 12
                          }}>
                            {item.usuario.charAt(0)} {/* Primera letra del nombre */}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: "#2d3748" }}>{item.usuario}</div>
                            <div style={{ fontSize: 12, color: "#6c757d" }}>{item.email}</div>
                          </div>
                        </td>
                        {/* Celdas de calificaciones */}
                        <td style={{ padding: "16px 12px", textAlign: "center", fontWeight: 500 }}>{item.originalidad}</td>
                        <td style={{ padding: "16px 12px", textAlign: "center", fontWeight: 500 }}>{item.tecnica}</td>
                        <td style={{ padding: "16px 12px", textAlign: "center", fontWeight: 500 }}>{item.dibujo}</td>
                        <td style={{ padding: "16px 12px", textAlign: "center", fontWeight: 500 }}>{item.historia}</td>
                        {/* Celda de total destacada */}
                        <td style={{ 
                          padding: "16px 12px", 
                          textAlign: "center", 
                          fontWeight: 700,
                          color: "#d32f2f"
                        }}>
                          {item.total}
                        </td>
                        <td style={{ padding: "16px 12px", textAlign: "center", fontSize: 13, color: "#6c757d" }}>{item.fecha}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Paginación de la tabla */}
              <div style={{ 
                textAlign: "center", 
                marginTop: 20, 
                fontSize: 14,
                color: "#6c757d"
              }}>
                206 elementos | 
                {/* Botones de paginación */}
                {[1,2,3,4,5,6].map(n => 
                  <span key={n} style={{
                    margin: "0 4px",
                    padding: "6px 10px",
                    borderRadius: 6,
                    background: n === 3 ? "linear-gradient(135deg, #d32f2f 0%, #e53935 100%)" : "#f8f9fa",
                    color: n === 3 ? "#fff" : "#6c757d",
                    cursor: "pointer",
                    fontWeight: n === 3 ? 600 : 400
                  }}>{n}</span>
                )}
              </div>
            </div>
          </div>

          {/* Panel lateral derecho */}
          <div style={{ width: 320, minWidth: 300 }}>
            
            {/* Card de información y acciones principales */}
            <div style={{
              background: "#fff",
              borderRadius: 16,
              padding: 20,
              marginBottom: 20,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              border: "1px solid #e9ecef"
            }}>
              {/* Información de visitas y vista previa */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontSize: 15, color: "#6c757d" }}>
                  👁️ Visitas: <strong style={{ color: "#2d3748" }}>{formData.visitias}</strong>
                </span>
                <button style={{
                  background: "linear-gradient(135deg, #d32f2f 0%, #e53935 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "6px 16px",
                  fontWeight: 600,
                  fontSize: 12,
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(211, 47, 47, 0.3)"
                }}>
                  Vista previa
                </button>
              </div>
              
              {/* Select de periodo */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontWeight: 600, fontSize: 14, color: "#495057", display: "block", marginBottom: 6 }}>Periodo</label>
                <select 
                  name="periodo" 
                  value={formData.periodo} 
                  onChange={handleInputChange} 
                  style={{ 
                    borderRadius: 8, 
                    padding: "8px 12px", 
                    width: "100%", 
                    fontSize: 14, 
                    background: "#f8f9fa", 
                    color: "#2d3748", 
                    border: "2px solid #e9ecef",
                    transition: "all 0.3s ease"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#d32f2f";
                    e.target.style.background = "#fff";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e9ecef";
                    e.target.style.background = "#f8f9fa";
                  }}
                >
                  <option>CONVOCATORIA DE FEBRERO</option>
                  <option>CONVOCATORIA DE MARZO</option>
                </select>
              </div>
              
              {/* Select de premio */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontWeight: 600, fontSize: 14, color: "#495057", display: "block", marginBottom: 6 }}>Premio</label>
                <select 
                  name="premio" 
                  value={formData.premio} 
                  onChange={handleInputChange} 
                  style={{ 
                    borderRadius: 8, 
                    padding: "8px 12px", 
                    width: "100%", 
                    fontSize: 14, 
                    background: "#f8f9fa", 
                    color: "#2d3748", 
                    border: "2px solid #e9ecef",
                    transition: "all 0.3s ease"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#d32f2f";
                    e.target.style.background = "#fff";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e9ecef";
                    e.target.style.background = "#f8f9fa";
                  }}
                >
                  <option>🥇 1er lugar</option>
                  <option>🥈 2do lugar</option>
                  <option>🥉 3er lugar</option>
                </select>
              </div>

              {/* Información de fecha */}
              <div style={{ 
                textAlign: "center", 
                margin: "16px 0", 
                padding: 12,
                background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                borderRadius: 8,
                fontSize: 13, 
                color: "#6c757d"
              }}>
                📅 Publico el 2025/01/05 a las 18:45
              </div>
              
              {/* Botones de acción */}
              <div style={{ display: "flex", gap: 12 }}>
                {/* Botón programar */}
                <button style={{
                  flex: 1, 
                  background: "linear-gradient(135deg, #495057 0%, #343a40 100%)", 
                  color: "#fff", 
                  border: "none", 
                  borderRadius: 10,
                  padding: "12px 0", 
                  fontWeight: 600, 
                  fontSize: 14, 
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(73, 80, 87, 0.3)",
                  transition: "all 0.3s ease"
                }}
                onMouseOver={e => e.target.style.transform = "translateY(-2px)"}
                onMouseOut={e => e.target.style.transform = "translateY(0)"}
                >
                  ⏰ Programar
                </button>
                {/* Botón publicar */}
                <button style={{
                  flex: 1, 
                  background: "linear-gradient(135deg, #d32f2f 0%, #e53935 100%)", 
                  color: "#fff", 
                  border: "none", 
                  borderRadius: 10,
                  padding: "12px 0", 
                  fontWeight: 600, 
                  fontSize: 14, 
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(211, 47, 47, 0.3)",
                  transition: "all 0.3s ease"
                }}
                onMouseOver={e => e.target.style.transform = "translateY(-2px)"}
                onMouseOut={e => e.target.style.transform = "translateY(0)"}
                >
                  🚀 Publicar
                </button>
              </div>
            </div>

            {/* Card de portada */}
            <div style={{
              background: "#fff",
              borderRadius: 16,
              padding: 20,
              marginBottom: 20,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              border: "1px solid #e9ecef"
            }}>
              <h4 style={{ 
                fontWeight: 600, 
                marginBottom: 16, 
                textAlign: "center", 
                fontSize: 16,
                color: "#2d3748"
              }}>
                🎨 PORTADA DEL ONESHOT
              </h4>
              
              {/* Área de previsualización de portada */}
              <div style={{
                width: "100%", 
                height: 200, 
                background: formData.portada ? "#f8f9fa" : "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)", 
                borderRadius: 12,
                marginBottom: 16, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                border: "2px dashed #dee2e6",
                overflow: "hidden"
              }}>
                {formData.portada ? (
                  // Muestra la imagen si existe
                  <img 
                    src={URL.createObjectURL(formData.portada)} 
                    alt="Portada" 
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 10 }} 
                  />
                ) : (
                  // Muestra placeholder si no hay imagen
                  <div style={{ textAlign: "center", color: "#6c757d" }}>
                    <i className="bi bi-image" style={{ fontSize: "2rem", marginBottom: 8 }}></i>
                    <div style={{ fontSize: 14 }}>Sube la portada</div>
                  </div>
                )}
              </div>
              
              {/* Botón para seleccionar portada */}
              <button
                style={{
                  background: "linear-gradient(135deg, #d32f2f 0%, #e53935 100%)", 
                  color: "#fff", 
                  border: "none", 
                  borderRadius: 10,
                  padding: "10px 20px", 
                  fontWeight: 600, 
                  fontSize: 14, 
                  cursor: "pointer", 
                  width: "100%",
                  boxShadow: "0 4px 15px rgba(211, 47, 47, 0.3)",
                  transition: "all 0.3s ease"
                }}
                onClick={() => portadaInputRef.current.click()} // Activa input oculto
                onMouseOver={e => e.target.style.transform = "translateY(-2px)"}
                onMouseOut={e => e.target.style.transform = "translateY(0)"}
              >
                <i className="bi bi-cloud-upload me-2"></i>
                Elegir Archivo
              </button>
              {/* Input oculto para portada */}
              <input
                ref={portadaInputRef}
                type="file"
                accept="image/*"
                onChange={handlePortadaChange}
                style={{ display: "none" }}
              />
            </div>

            {/* Card de géneros */}
            <div style={{
              background: "#fff",
              borderRadius: 16,
              padding: 20,
              marginBottom: 20,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              border: "1px solid #e9ecef"
            }}>
              <h4 style={{ 
                fontWeight: 600, 
                marginBottom: 16, 
                fontSize: 16,
                color: "#2d3748"
              }}>
                🏷️ GÉNEROS
              </h4>
              
              {/* Grid de checkboxes de géneros */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 13 }}>
                {/* Mapea todos los géneros disponibles */}
                {Object.entries({
                  accion: "ACCIÓN", aventura: "AVENTURA", comedia: "COMEDIA", cienciaFiccion: "CIENCIA FICCIÓN",
                  drama: "DRAMA", fantasia: "FANTASÍA", horror: "HORROR", misterio: "MISTERIO",
                  romance: "ROMANCE", slice: "SLICE OF LIFE", sobrenatural: "SOBRENATURAL", thriller: "THRILLER",
                  historico: "HISTÓRICO", psicologico: "PSICOLÓGICO", madreche: "MADRECHE", bl: "BL"
                }).map(([key, label]) => (
                  <label key={key} style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 8,
                    padding: 8,
                    borderRadius: 8,
                    // Cambia colores según si está seleccionado
                    background: formData.generos[key] ? "linear-gradient(135deg, #d32f2f 0%, #e53935 100%)" : "#f8f9fa",
                    color: formData.generos[key] ? "#fff" : "#495057",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    border: formData.generos[key] ? "none" : "1px solid #e9ecef"
                  }}>
                    <input
                      type="checkbox"
                      name={`genero_${key}`} // Nombre especial para géneros
                      checked={formData.generos[key]}
                      onChange={handleInputChange}
                      style={{ 
                        accentColor: "#d32f2f",
                        transform: "scale(1.1)"
                      }}
                    />
                    <span style={{ fontWeight: 500 }}>{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Card de configuración técnica */}
            <div style={{
              background: "#fff",
              borderRadius: 16,
              padding: 20,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              border: "1px solid #e9ecef"
            }}>
              <h4 style={{ 
                fontWeight: 600, 
                marginBottom: 16, 
                fontSize: 16,
                color: "#2d3748"
              }}>
                ⚙️ CONFIGURACIÓN
              </h4>
              
              {/* Mapea campos de configuración técnica */}
              {[
                { name: "categoria", label: "Categoría", value: formData.categoria, options: ["Manga", "Comic"] },
                { name: "formato", label: "Formato", value: formData.formato, options: ["Horizontal", "Vertical"] },
                { name: "mancha", label: "Mancha", value: formData.mancha, options: ["Negro", "Color"] },
                { name: "resolucion", label: "Resolución", value: formData.resolucion, options: ["300px", "150px"] }
              ].map((field, idx) => (
                <div key={field.name} style={{ marginBottom: idx < 3 ? 12 : 0 }}>
                  <label style={{ 
                    fontWeight: 600, 
                    fontSize: 13, 
                    color: "#495057", 
                    display: "block", 
                    marginBottom: 6 
                  }}>
                    {field.label}
                  </label>
                  <select 
                    name={field.name} 
                    value={field.value} 
                    onChange={handleInputChange} 
                    style={{ 
                      width: "100%", 
                      fontSize: 13, 
                      padding: "8px 12px", 
                      background: "#f8f9fa", 
                      color: "#2d3748", 
                      border: "2px solid #e9ecef",
                      borderRadius: 8,
                      transition: "all 0.3s ease"
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#d32f2f";
                      e.target.style.background = "#fff";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e9ecef";
                      e.target.style.background = "#f8f9fa";
                    }}
                  >
                    {/* Mapea opciones disponibles para cada campo */}
                    {field.options.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddParticipant;
