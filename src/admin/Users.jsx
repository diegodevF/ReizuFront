import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Datos de ejemplo
const usersData = Array(12).fill().map((_, i) => ({
  id: i + 1,
  username: i % 3 === 0 ? 'Darkkiller22' : i % 3 === 1 ? 'MangaLover99' : 'ComicFan2024',
  alias: i % 3 === 0 ? 'FelipeArt' : i % 3 === 1 ? 'YukiManga' : 'RedReader',
  email: i % 3 === 0 ? 'Drakkiller@gmail.com' : i % 3 === 1 ? 'yuki@manga.com' : 'reader@comics.com',
  role: i % 4 === 0 ? 'Administrador' : i % 4 === 1 ? 'Editor' : i % 4 === 2 ? 'Autor' : 'Usuario',
  posts: Math.floor(Math.random() * 50) + 1,
  comments: Math.floor(Math.random() * 100) + 1,
  status: i % 5 === 0 ? 'Inactivo' : 'Activo',
  joinDate: '13/02/2025 at 20:20'
}));

// Detectar el tema global de Bootstrap
const getTheme = () => {
  if (typeof document !== "undefined") {
    return document.documentElement.getAttribute("data-bs-theme") || "light";
  }
  return "light";
};

const Users = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [theme, setTheme] = useState(getTheme());
  const [filterRole, setFilterRole] = useState('all');
  const [filterDate, setFilterDate] = useState('all');

  // Estadísticas
  const stats = {
    total: 108,
    admin: 90,
    editor: 3,
    author: 15,
    collaborator: 5,
    subscriber: 19,
    assistant: 19,
    user: 19
  };

  // Paginación
  const itemsPerPage = 12;
  const totalPages = 17;
  const totalItems = 200;

  // Detectar cambios en el tema de Bootstrap
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
  
  const isDark = theme === 'dark';

  // Filtrar por búsqueda
  const filteredData = usersData.filter(user =>
    user.username.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Selección por checkbox
  const handleSelect = (id) => {
    setSelected(selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id]);
  };

  const handleSelectAll = () => {
    setSelected(selected.length === filteredData.length ? [] : filteredData.map(u => u.id));
  };

  // Estilos para inputs con focus rojo
  const inputStyles = {
    background: isDark ? '#2d2d2d' : '#fff',
    color: isDark ? '#fff' : '#333',
    border: `1px solid ${isDark ? '#404040' : '#ced4da'}`,
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
  };

  const inputFocusStyles = {
    borderColor: '#d32f2f',
    boxShadow: '0 0 0 0.2rem rgba(211, 47, 47, 0.25)'
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'Administrador': return '#d32f2f';
      case 'Editor': return '#0d6efd';
      case 'Autor': return '#198754';
      default: return isDark ? '#6c757d' : '#495057';
    }
  };

  return (
    <div className="d-flex" style={{
      background: isDark ? '#121212' : '#f5f7fa',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif',
      transition: 'background 0.3s'
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
      <div
        style={{
          flexGrow: 1,
          marginLeft: sidebarOpen ? 280 : 0,
          transition: "margin-left 0.3s",
          minHeight: "100vh",
          padding: '32px 0'
        }}
      >
        {/* Header */}
        <div style={{
          background: isDark ? '#1e1e1e' : '#fff',
          padding: '32px 48px 24px 48px',
          borderBottom: `1px solid ${isDark ? '#404040' : '#e9ecef'}`,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{
                fontWeight: 700,
                fontSize: 28,
                color: isDark ? '#fff' : '#2d3748',
                margin: 0,
                marginBottom: 8
              }}>
                <i className="bi bi-people me-2" style={{ color: '#d32f2f' }}></i>
                Gestionar Usuarios
              </h2>
              <p style={{ 
                color: isDark ? '#adb5bd' : '#6c757d',
                fontSize: '16px',
                margin: 0
              }}>
                Administra todos los usuarios de la plataforma
              </p>
            </div>
            <button style={{
              background: 'linear-gradient(135deg, #d32f2f 0%, #e53935 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '14px 28px',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(211, 47, 47, 0.3)',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={e => e.target.style.transform = 'translateY(-1px)'}
            onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Nuevo Usuario
            </button>
          </div>

          {/* Estadísticas */}
          <div style={{ 
            fontSize: 16, 
            color: isDark ? '#adb5bd' : '#6c757d', 
            fontWeight: 500,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <span><strong style={{ color: isDark ? '#fff' : '#2d3748' }}>Todo</strong> ({stats.total})</span>
            <span>Administrador ({stats.admin})</span>
            <span>Editor ({stats.editor})</span>
            <span>Autor ({stats.author})</span>
            <span>Colaborador ({stats.collaborator})</span>
            <span>Suscriptor ({stats.subscriber})</span>
            <span>Asistente ({stats.assistant})</span>
            <span>Usuario ({stats.user})</span>
          </div>
        </div>

        {/* Filtros */}
        <div style={{
          background: isDark ? '#1e1e1e' : '#fff',
          padding: '24px 48px',
          borderBottom: `1px solid ${isDark ? '#404040' : '#e9ecef'}`,
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          flexWrap: 'wrap'
        }}>
          <select 
            style={{
              ...inputStyles,
              minWidth: 160
            }}
            onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
            onBlur={e => Object.assign(e.target.style, {
              borderColor: isDark ? '#404040' : '#ced4da',
              boxShadow: 'none'
            })}
          >
            <option>Acciones por lote</option>
            <option>Activar usuarios</option>
            <option>Desactivar usuarios</option>
            <option>Eliminar usuarios</option>
          </select>
          
          <button style={{
            background: 'linear-gradient(135deg, #d32f2f 0%, #e53935 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 20px',
            fontWeight: 600,
            fontSize: 14,
            cursor: 'pointer'
          }}>
            Aplicar
          </button>

          <select 
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            style={{
              ...inputStyles,
              minWidth: 140
            }}
            onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
            onBlur={e => Object.assign(e.target.style, {
              borderColor: isDark ? '#404040' : '#ced4da',
              boxShadow: 'none'
            })}
          >
            <option value="all">Todas las fechas</option>
            <option value="today">Hoy</option>
            <option value="week">Esta semana</option>
            <option value="month">Este mes</option>
          </select>

          <select 
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            style={{
              ...inputStyles,
              minWidth: 140
            }}
            onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
            onBlur={e => Object.assign(e.target.style, {
              borderColor: isDark ? '#404040' : '#ced4da',
              boxShadow: 'none'
            })}
          >
            <option value="all">Todos los roles</option>
            <option value="admin">Administrador</option>
            <option value="editor">Editor</option>
            <option value="author">Autor</option>
            <option value="user">Usuario</option>
          </select>

          <button style={{
            background: isDark ? '#404040' : '#6c757d',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 20px',
            fontWeight: 600,
            fontSize: 14,
            cursor: 'pointer'
          }}>
            Filtrar
          </button>

          <input
            type="text"
            placeholder="Buscar usuarios..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              ...inputStyles,
              marginLeft: 'auto',
              minWidth: 250
            }}
            onFocus={e => Object.assign(e.target.style, inputFocusStyles)}
            onBlur={e => Object.assign(e.target.style, {
              borderColor: isDark ? '#404040' : '#ced4da',
              boxShadow: 'none'
            })}
          />
        </div>

        {/* Tabla */}
        <div style={{
          padding: '0 24px',
          overflowX: 'auto'
        }}>
          <div style={{
            background: isDark ? '#1e1e1e' : '#fff',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)',
            border: `1px solid ${isDark ? '#404040' : '#e9ecef'}`,
            marginTop: 24
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'separate',
              borderSpacing: 0,
              fontSize: 14
            }}>
              <thead>
                <tr style={{
                  background: isDark ? '#2d2d2d' : '#f8f9fa',
                  borderBottom: `2px solid ${isDark ? '#404040' : '#e9ecef'}`
                }}>
                  <th style={{ padding: '16px 20px', textAlign: 'left', width: 40 }}>
                    <input 
                      type="checkbox" 
                      checked={selected.length === filteredData.length && filteredData.length > 0}
                      onChange={handleSelectAll}
                      style={{ accentColor: '#d32f2f' }}
                    />
                  </th>
                  <th style={{ 
                    padding: '16px 20px', 
                    textAlign: 'left', 
                    color: isDark ? '#fff' : '#2d3748',
                    fontWeight: 600,
                    minWidth: 200
                  }}>
                    Nombre de usuario
                  </th>
                  <th style={{ 
                    padding: '16px 20px', 
                    textAlign: 'left', 
                    color: isDark ? '#fff' : '#2d3748',
                    fontWeight: 600,
                    minWidth: 120
                  }}>
                    Alias
                  </th>
                  <th style={{ 
                    padding: '16px 20px', 
                    textAlign: 'left', 
                    color: isDark ? '#fff' : '#2d3748',
                    fontWeight: 600,
                    minWidth: 200
                  }}>
                    Correo Electrónico
                  </th>
                  <th style={{ 
                    padding: '16px 20px', 
                    textAlign: 'left', 
                    color: isDark ? '#fff' : '#2d3748',
                    fontWeight: 600,
                    minWidth: 120
                  }}>
                    Rol
                  </th>
                  <th style={{ 
                    padding: '16px 20px', 
                    textAlign: 'center', 
                    color: isDark ? '#fff' : '#2d3748',
                    fontWeight: 600,
                    width: 100
                  }}>
                    Publicaciones
                  </th>
                  <th style={{ 
                    padding: '16px 20px', 
                    textAlign: 'center', 
                    color: isDark ? '#fff' : '#2d3748',
                    fontWeight: 600,
                    width: 100
                  }}>
                    Comentarios
                  </th>
                  <th style={{ width: 20 }}></th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((user, index) => (
                  <tr key={user.id} style={{
                    borderBottom: `1px solid ${isDark ? '#404040' : '#e9ecef'}`,
                    background: index % 2 === 0 
                      ? (isDark ? '#1e1e1e' : '#fff') 
                      : (isDark ? '#252525' : '#fafbfc'),
                    transition: 'background 0.2s'
                  }}>
                    <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={selected.includes(user.id)}
                        onChange={() => handleSelect(user.id)}
                        style={{ accentColor: '#d32f2f' }}
                      />
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <div>
                        <div style={{ 
                          fontWeight: 600,
                          color: isDark ? '#fff' : '#2d3748',
                          marginBottom: 4
                        }}>
                          {user.username}
                        </div>
                        <div style={{ 
                          fontSize: 12, 
                          color: isDark ? '#adb5bd' : '#6c757d',
                          display: 'flex',
                          gap: 12
                        }}>
                          <a href="#" style={{ color: '#0d6efd', textDecoration: 'none' }}>Editar</a>
                          <a href="#" style={{ color: '#0d6efd', textDecoration: 'none' }}>Ver</a>
                          <a href="#" style={{ color: '#d32f2f', textDecoration: 'none' }}>Eliminar</a>
                        </div>
                      </div>
                    </td>
                    <td style={{ 
                      padding: '16px 20px',
                      color: isDark ? '#adb5bd' : '#6c757d',
                      fontWeight: 500
                    }}>
                      {user.alias}
                    </td>
                    <td style={{ 
                      padding: '16px 20px',
                      color: isDark ? '#adb5bd' : '#6c757d'
                    }}>
                      {user.email}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{
                        background: getRoleColor(user.role),
                        color: '#fff',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: 12,
                        fontWeight: 600
                      }}>
                        {user.role}
                      </span>
                    </td>
                    <td style={{ 
                      padding: '16px 20px', 
                      textAlign: 'center',
                      color: isDark ? '#fff' : '#2d3748',
                      fontWeight: 600
                    }}>
                      {user.posts}
                    </td>
                    <td style={{ 
                      padding: '16px 20px', 
                      textAlign: 'center',
                      color: isDark ? '#fff' : '#2d3748',
                      fontWeight: 600
                    }}>
                      {user.comments}
                    </td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer paginación */}
        <div style={{
          background: isDark ? '#1e1e1e' : '#fff',
          padding: '24px 48px',
          borderTop: `1px solid ${isDark ? '#404040' : '#e9ecef'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 32,
          boxShadow: isDark ? '0 -2px 8px rgba(0,0,0,0.3)' : '0 -2px 8px rgba(0,0,0,0.08)'
        }}>
          <span style={{ 
            fontSize: 16, 
            color: isDark ? '#adb5bd' : '#6c757d',
            fontWeight: 500
          }}>
            {totalItems} elementos
          </span>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button 
              disabled={page === 1} 
              onClick={() => setPage(Math.max(1, page - 1))}
              style={{
                border: 'none',
                background: isDark ? '#404040' : '#e9ecef',
                borderRadius: 8,
                padding: '8px 16px',
                color: isDark ? '#fff' : '#2d3748',
                cursor: page === 1 ? 'not-allowed' : 'pointer',
                opacity: page === 1 ? 0.5 : 1,
                fontWeight: 600
              }}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                onClick={() => setPage(n)}
                style={{
                  border: 'none',
                  background: n === page
                    ? 'linear-gradient(135deg, #d32f2f 0%, #e53935 100%)'
                    : (isDark ? '#404040' : '#e9ecef'),
                  color: n === page ? '#fff' : (isDark ? '#fff' : '#2d3748'),
                  borderRadius: 8,
                  padding: '8px 16px',
                  fontWeight: n === page ? 700 : 500,
                  cursor: 'pointer',
                  boxShadow: n === page ? '0 2px 8px rgba(211, 47, 47, 0.3)' : 'none',
                  minWidth: 40
                }}
              >
                {n}
              </button>
            ))}
            
            <button 
              disabled={page === totalPages} 
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              style={{
                border: 'none',
                background: isDark ? '#404040' : '#e9ecef',
                borderRadius: 8,
                padding: '8px 16px',
                color: isDark ? '#fff' : '#2d3748',
                cursor: page === totalPages ? 'not-allowed' : 'pointer',
                opacity: page === totalPages ? 0.5 : 1,
                fontWeight: 600
              }}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
          
          <span style={{ 
            fontSize: 16, 
            color: isDark ? '#adb5bd' : '#6c757d',
            fontWeight: 500
          }}>
            Página {page} de {totalPages}
          </span>
        </div>
      </div>
      
    </div>
  );
};

export default Users;
