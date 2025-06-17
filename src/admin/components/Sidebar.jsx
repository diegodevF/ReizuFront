import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Perro from "../../assets/authors/perro.jpeg";

const sidebarItems = [
  {
    id: 0,
    title: "Panel de Control",
    icon: "bi-house",
    href: "/admin/Dashboard",
  },
  {
    id: 1,
    title: "Estadísticas",
    icon: "bi-bar-chart",
    subpages: [
      { title: "Banners", href: "", isSubsection: true },
      { title: "Todos los banners", href: "/Admin/Banners", isSubitem: true },
      { title: "Nuevo banner", href: "/Admin/AddBanner", isSubitem: true },
      { title: "Popups", href: "#", isSubsection: true },
      { title: "Todos los popups", href: "/admin/estadisticas/todos-los-popups", isSubitem: true },
      { title: "Nuevo popup", href: "/admin/estadisticas/nuevo-popup", isSubitem: true }
    ]
  },
  {
    id: 2,
    title: "Comentarios",
    icon: "bi-chat-dots",
    href: "/Admin/Comments",
    subpages: []
  },
  {
    id: 3,
    title: "Reizu Coins",
    icon: "bi-coin",
    subpages: [
      { title: "Misiones", href: "/admin/reizu-coins/misiones" },
      { title: "Logros", href: "/admin/reizu-coins/logros" },
      { title: "Configurar", href: "/admin/reizu-coins/configurar" }
    ]
  },
  {
    id: 4,
    title: "Tienda",
    icon: "bi-shop",
    subpages: [
      { title: "Todos los productos", href: "/admin/tienda/todos-los-productos" },
      { title: "Nuevo producto", href: "/admin/tienda/nuevo-producto" }
    ]
  },
  {
    id: 5,
    title: "Usuarios",
    icon: "bi-people",
    subpages: [
      { title: "Todos los usuarios", href: "/admin/usuarios/todos-los-usuarios" },
      { title: "Nuevo usuario", href: "/admin/usuarios/nuevo-usuario" }
    ]
  },
  {
    id: 6,
    title: "Notificaciones",
    icon: "bi-bell",
    subpages: [
      { title: "Todas las notificaciones", href: "/admin/notificaciones/todas-las-notificaciones" },
      { title: "Nueva notificación", href: "/admin/notificaciones/nueva-notificacion" }
    ]
  },
  {
    id: 7,
    title: "Guía de usuario",
    icon: "bi-book-half",
    subpages: [
      { title: "Todas las guías", href: "/admin/guia-de-usuario/todas-las-guias" },
      { title: "Nueva guía", href: "/admin/guia-de-usuario/nueva-guia" }
    ]
  },
  {
    id: 8,
    title: "Convocatoria",
    icon: "bi-megaphone",
    subpages: [
      { title: "Todos los participantes", href: "/admin/convocatoria/todos-los-participantes" },
      { title: "Nuevo participante", href: "/admin/convocatoria/nuevo-participante" },
      { title: "Información", href: "/admin/convocatoria/informacion" },
      { title: "Reglas", href: "/admin/convocatoria/reglas" },
      { title: "Formulario", href: "/admin/convocatoria/formulario" }
    ]
  },
  {
    id: 9,
    title: "Obras",
    icon: "bi-journal-text",
    subpages: [
      { title: "Todas las obras", href: "/admin/Works" },
      { title: "Nueva obra", href: "/admin/AddWork" }
    ]
  },
  {
    id: 10,
    title: "Capítulos",
    icon: "bi-book",
    subpages: [
      { title: "Todos los capítulos", href: "/admin/Caps" },
      { title: "Nuevo capítulo", href: "/admin/AddCap" }
    ]
  },
  {
    id: 11,
    title: "Artbooks",
    icon: "bi-journal-album",
    subpages: [
      { title: "Todos los artbooks", href: "/admin/artbooks/todos-los-artbooks" },
      { title: "Nuevo artbook", href: "/admin/artbooks/nuevo-artbook" }
    ]
  },
  {
    id: 12,
    title: "Revistas",
    icon: "bi-journals",
    subpages: [
      { title: "Todas las revistas", href: "/admin/revistas/todas-las-revistas" },
      { title: "Nueva revista", href: "/admin/revistas/nueva-revista" }
    ]
  },
  {
    id: 13,
    title: "Comisiones",
    icon: "bi-palette",
    subpages: [
      { title: "Todas las comisiones", href: "/admin/comisiones/todas-las-comisiones" },
      { title: "Nueva comisión", href: "/admin/comisiones/nueva-comision" }
    ]
  }
];

const Sidebar = ({ isOpen = true, onToggle }) => {
  const [activeSection, setActiveSection] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Resetear isCollapsed cuando la sidebar se abre
  useEffect(() => {
    if (isOpen && isCollapsed) {
      setIsCollapsed(false);
      setActiveSection(null);
    }
  }, [isOpen, isCollapsed]);

  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // ✅ CERRAR COMPLETAMENTE la sidebar
  const closeSidebar = () => {
    if (onToggle) onToggle();
  };

  const shouldShowCollapsed = isOpen && isCollapsed;

  return (
    <>
      <nav 
        className="sidebar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: shouldShowCollapsed ? '60px' : '280px',
          height: '100vh',
          backgroundColor: '#1a1a1a',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s cubic-bezier(.4,0,.2,1), width 0.3s ease',
          zIndex: 1051,
          overflowY: 'auto',
          borderRight: '1px solid #333'
        }}
      >
        {/* Header */}
        <div className="sidebar-header p-3 border-bottom border-secondary">
          <div className="d-flex align-items-center justify-content-between">
            {!shouldShowCollapsed && (
              <div className="d-flex align-items-center">
                <img
                  src={Perro}
                  alt="Perfil Admin"
                  className="rounded-circle me-2"
                  style={{
                    width: '40px',
                    height: '40px',
                    objectFit: 'cover',
                    border: '2px solid #dc3545'
                  }}
                />
                <div>
                  <h6 className="text-white mb-0 fw-bold">
                    Hola Reizu
                  </h6>
                  <small className="text-muted">
                    <Link to="/" className="text-decoration-none text-white">
                      <i className="bi bi-arrow-left me-1 text-white"></i>
                      Regresar al Sitio
                    </Link>
                  </small>
                </div>
              </div>
            )}
            {shouldShowCollapsed && (
              <div className="d-flex justify-content-center w-100">
                <img
                  src={Perro}
                  alt="Perfil Admin"
                  className="rounded-circle"
                  style={{
                    width: '35px',
                    height: '35px',
                    objectFit: 'cover',
                    border: '2px solid #dc3545'
                  }}
                />
              </div>
            )}
            
            {/* ✅ BOTONES: Colapsar y Cerrar */}
            <div className="d-flex gap-1">
              <button 
                className="btn btn-outline-danger btn-sm"
                onClick={closeSidebar}
                title="Cerrar Sidebar"
              >
                <i className="bi bi-chevron-left"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="sidebar-menu p-0">
          <ul className="list-unstyled mb-0">
            {sidebarItems.map((item) => (
              <li key={item.id} className="sidebar-item">
                <div>
                  {item.href ? (
                    <Link 
                      to={item.href}
                      className="sidebar-link d-flex align-items-center px-3 py-2 text-decoration-none"
                      style={{ color: '#e0e0e0' }}
                      onMouseEnter={e => e.target.style.backgroundColor = '#333'}
                      onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
                      title={shouldShowCollapsed ? item.title : ''}
                    >
                      <i className={`${item.icon} ${shouldShowCollapsed ? 'fs-5' : 'me-3'}`} style={{ fontSize: shouldShowCollapsed ? '1.2rem' : '1.1rem' }}></i>
                      {!shouldShowCollapsed && <span className="fw-medium">{item.title}</span>}
                    </Link>
                  ) : (
                    <button 
                      className="sidebar-link w-100 d-flex align-items-center justify-content-between px-3 py-2 border-0 text-start"
                      style={{ 
                        backgroundColor: 'transparent', 
                        color: '#e0e0e0',
                        transition: 'background-color 0.2s'
                      }}
                      onClick={() => !shouldShowCollapsed && toggleSection(item.id)}
                      onMouseEnter={e => e.target.style.backgroundColor = '#333'}
                      onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
                      title={shouldShowCollapsed ? item.title : ''}
                    >
                      <div className="d-flex align-items-center">
                        <i className={`${item.icon} ${shouldShowCollapsed ? 'fs-5' : 'me-3'}`} style={{ fontSize: shouldShowCollapsed ? '1.2rem' : '1.1rem' }}></i>
                        {!shouldShowCollapsed && <span className="fw-medium">{item.title}</span>}
                      </div>
                      {!shouldShowCollapsed && (item.subpages?.length > 0) && (
                        <i className={`bi bi-chevron-${activeSection === item.id ? 'down' : 'right'} small`}></i>
                      )}
                    </button>
                  )}
                </div>
                {!shouldShowCollapsed && (item.subpages?.length > 0) && (
                  <div 
                    className={`sidebar-submenu ${activeSection === item.id ? 'show' : ''}`}
                    style={{
                      maxHeight: activeSection === item.id ? '500px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.3s ease-in-out',
                      backgroundColor: '#0d0d0d'
                    }}
                  >
                    <ul className="list-unstyled mb-0 py-1">
                      {item.subpages.map((subpage, index) => (
                        <li key={index}>
                          {subpage.isSubsection ? (
                            <div 
                              className="px-4 py-1 fw-bold small"
                              style={{ 
                                color: '#fff',
                                fontSize: '0.8rem',
                                paddingLeft: '2.5rem',
                                backgroundColor: '#1a1a1a',
                                borderLeft: '3px solid #dc3545'
                              }}
                            >
                              {subpage.title}
                            </div>
                          ) : (
                            <Link 
                              to={subpage.href}
                              className="sidebar-sublink d-block px-4 py-1 text-decoration-none small"
                              style={{ 
                                color: '#b0b0b0',
                                fontSize: '0.85rem',
                                paddingLeft: subpage.isSubitem ? '4rem' : '3.5rem'
                              }}
                              onMouseEnter={e => {
                                e.target.style.backgroundColor = '#333';
                                e.target.style.color = '#fff';
                              }}
                              onMouseLeave={e => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.color = '#b0b0b0';
                              }}
                            >
                              {subpage.title}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
