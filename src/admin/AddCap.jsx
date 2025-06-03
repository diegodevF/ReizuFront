import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AddCap = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Manejadores de drag and drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList);
    
    // Validaciones
    if (files.length + newFiles.length > 100) {
      alert("Solo se pueden subir hasta 100 archivos");
      return;
    }

    // Filtrar solo imágenes
    const imageFiles = newFiles.filter(file => {
      return file.type.startsWith('image/');
    });

    if (imageFiles.length !== newFiles.length) {
      alert("Solo se pueden subir archivos de imagen");
      return;
    }

    // Calcular peso total
    const totalSize = [...files, ...imageFiles].reduce((acc, file) => acc + file.size, 0);
    const totalSizeMB = totalSize / (1024 * 1024);
    
    if (totalSizeMB > 50) {
      alert("El peso total no debe superar los 50MB");
      return;
    }

    setFiles(prev => [...prev, ...imageFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
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
      
      {/* Contenido principal */}
      <div
        className="flex-grow-1"
        style={{
          marginLeft: sidebarOpen ? "280px" : "0",
          transition: "margin-left 0.3s",
          minHeight: "100vh",
          backgroundColor: '#e9ecef'
        }}
      >
        <div className="container-fluid p-4">
          {/* Header */}
          <div className="mb-4">
            <h2 className="fw-bold text-dark">Nuevo Capítulo</h2>
          </div>

          {/* Card principal */}
          <div className="card border-0 shadow-sm">
            <div className="card-body p-5">
              {/* Zona de drag and drop */}
              <div
                className={`border-2 border-dashed rounded-3 p-5 text-center ${
                  dragActive ? 'border-primary bg-light' : 'border-secondary'
                }`}
                style={{
                  minHeight: '400px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={onButtonClick}
              >
                <i 
                  className="bi bi-cloud-upload text-muted mb-3" 
                  style={{ fontSize: '4rem' }}
                ></i>
                <h4 className="text-muted mb-3">
                  Arrastra y soltar aquí<br />o si no
                </h4>
                <button 
                  className="btn btn-dark px-4 py-2"
                  onClick={onButtonClick}
                >
                  Elegir Archivo
                </button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleChange}
                  style={{ display: 'none' }}
                />
              </div>

              {/* Instrucciones */}
              <div className="mt-4">
                <ul className="list-unstyled text-danger" style={{ fontSize: '0.9rem' }}>
                  <li className="mb-2">
                    • <strong>Subir todas las páginas del capítulo</strong>, una vez cargados podrá seguir configurando el capítulo a su gusto.
                  </li>
                  <li className="mb-2">
                    • <strong>Tamaño máximo 800x1500 px</strong> (Imagen que supere el tamaño máximo, bajará la resolución y puede perder calidad).
                  </li>
                  <li className="mb-2">
                    • <strong>No hay límite de peso por imagen</strong>, no obstante la cantidad total de páginas no debe pesar más de <strong>50MB</strong>.
                  </li>
                  <li className="mb-2">
                    • <strong>Solo se puede subir hasta 100 archivos</strong>.
                  </li>
                  <li className="mb-2">
                    • <strong>Para Manhwa/Webcomic</strong>, subir las tiras ya recortadas.
                  </li>
                </ul>
              </div>

              {/* Lista de archivos subidos */}
              {files.length > 0 && (
                <div className="mt-4">
                  <h5 className="mb-3">
                    Archivos seleccionados ({files.length}/100)
                  </h5>
                  <div className="row g-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {files.map((file, index) => (
                      <div key={index} className="col-md-4">
                        <div className="card h-100">
                          <div className="card-body p-2 d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                              <i className="bi bi-file-earmark-image text-primary me-2"></i>
                              <div>
                                <div className="small fw-medium text-truncate" style={{ maxWidth: '150px' }}>
                                  {file.name}
                                </div>
                                <div className="text-muted small">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => removeFile(index)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Información del peso total */}
                  <div className="mt-3 text-muted small">
                    Peso total: {(files.reduce((acc, file) => acc + file.size, 0) / 1024 / 1024).toFixed(2)} MB / 50 MB
                  </div>
                </div>
              )}

              {/* Botones de acción */}
              {files.length > 0 && (
                <div className="mt-4 d-flex gap-3 justify-content-end">
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={() => setFiles([])}
                  >
                    Limpiar Todo
                  </button>
                  <Link 
                    className="btn btn-danger"
                    disabled={uploading}
                    to={uploading ? '#' : '/Admin/AddCapConfig'}
                  >
                    {uploading ? 'Subiendo...' : 'Continuar'}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCap;
