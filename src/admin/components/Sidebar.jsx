import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Perro from "../../assets/authors/perro.jpeg";

// Definición de roles actualizada
const USER_ROLES = {
  ADMIN: 'admin',
  AUTHOR: 'author',
  ASSISTANT: 'assistant' // Nuevo rol
};

const sidebarItems = [
  {
    id: 0,
    title: "Panel de Control",
    icon: "bi-house",
    href: "/Admin",
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.AUTHOR, USER_ROLES.ASSISTANT] // Todos
  },
  {
    id: 1,
    title: "Visuales",
    icon: "bi-bar-chart",
    allowedRoles: [USER_ROLES.ADMIN], // Solo admin
    subpages: [
      { 
        title: "Banners", 
        href: "", 
        isSubsection: true,
        allowedRoles: [USER_ROLES.ADMIN]
      },
      { 
        title: "Todos los banners", 
        href: "/Admin/Banners", 
        isSubitem: true,
        allowedRoles: [USER_ROLES.ADMIN]
      },
      { 
        title: "Nuevo banner", 
        href: "/Admin/AddBanner", 
        isSubitem: true,
        allowedRoles: [USER_ROLES.ADMIN]
      },
      { 
        title: "Popups", 
        href: "#", 
        isSubsection: true,
        allowedRoles: [USER_ROLES.ADMIN]
      },
      { 
        title: "Todos los popups", 
        href: "/Admin/Popups", 
        isSubitem: true,
        allowedRoles: [USER_ROLES.ADMIN]
      },
      { 
        title: "Nuevo popup", 
        href: "/Admin/AddPopup", 
        isSubitem: true,
        allowedRoles: [USER_ROLES.ADMIN]
      }
    ]
  },
  {
    id: 2,
    title: "Comentarios",
    icon: "bi-chat-dots",
    href: "/Admin/Comments",
    subpages: [],
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.AUTHOR, USER_ROLES.ASSISTANT] // Todos
  },
  {
    id: 3,
    title: "Reizu Coins",
    icon: "bi-coin",
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.AUTHOR, USER_ROLES.ASSISTANT], // Todos
    subpages: [
      { 
        title: "Logros", 
        href: "/Admin/Achivements",
        allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.AUTHOR, USER_ROLES.ASSISTANT] // Todos ven
      },
      { 
        title: "Añadir Logro", 
        href: "/Admin/AddAchivement",
        allowedRoles: [USER_ROLES.ADMIN] // Solo admin puede crear
      },
    ]
  },
  {
    id: 4,
    title: "Suscripciones", // Nueva sección
    icon: "bi-credit-card",
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.AUTHOR, USER_ROLES.ASSISTANT], // Todos
    subpages: [
      { 
        title: "Todas las suscripciones", 
        href: "/Admin/Subscriptions",
        allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.AUTHOR, USER_ROLES.ASSISTANT]
      },
      { 
        title: "Nueva suscripción", 
        href: "/Admin/AddSubscription",
        allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.AUTHOR] // Asistente no puede crear
      },
    ]
  },
  {
    id: 5,
    title: "Tienda",
    icon: "bi-shop",
    allowedRoles: [USER_ROLES.ADMIN], // Solo admin
    subpages: [
      { 
        title: "Todos los productos", 
        href: "/Admin/ProductsShop",
        allowedRoles: [USER_ROLES.ADMIN]
      },
      { 
        title: "Nuevo producto", 
        href: "/Admin/AddProduct",
        allowedRoles: [USER_ROLES.ADMIN]
      }
    ]
  },
  {
    id: 6,
    title: "Usuarios",
    icon: "bi-people",
    allowedRoles: [USER_ROLES.ADMIN], // Solo admin
    subpages: [
      { 
        title: "Todos los usuarios", 
        href: "/Admin/Users",
        allowedRoles: [USER_ROLES.ADMIN]
      },
      { 
        title: "Nuevo usuario", 
        href: "/Admin/AddUser",
        allowedRoles: [USER_ROLES.ADMIN]
      }
    ]
  },
  {
    id: 7,
    title: "Notificaciones",
    icon: "bi-bell",
    allowedRoles: [USER_ROLES.ADMIN], // Solo admin
    subpages: [
      { 
        title: "Todas las notificaciones", 
        href: "/admin/notificaciones/todas-las-notificaciones",
        allowedRoles: [USER_ROLES.ADMIN]
      },
      { 
        title: "Nueva notificación", 
        href: "/admin/notificaciones/nueva-notificacion",
        allowedRoles: [USER_ROLES.ADMIN]
      }
    ]
  },
  {
    id: 8,
    title: "Guía de usuario",
    icon: "bi-book-half",
    allowedRoles: [USER_ROLES.ADMIN], // Solo admin
    subpages: [
      { 
        title: "Todas las guías", 
        href: "/admin/guia-de-usuario/todas-las-guias",
        allowedRoles: [USER_ROLES.ADMIN]
      },
      { 
        title: "Nueva guía", 
        href: "/admin/guia-de-usuario/nueva-guia",
        allowedRoles: [USER_ROLES.ADMIN]
      }
    ]
  },
  {
    id: 9,
    title: "Convocatoria",
    icon: "bi-megaphone",
    allowedRoles: [USER_ROLES.ADMIN], // Solo admin
    subpages: [
      { 
        title: "Todos los participantes", 
        href: "/Admin/Participants",
        allowedRoles: [USER_ROLES.ADMIN]
      },
      { 
        title: "Nuevo participante", 
        href: "/Admin/AddParticipant",
        allowedRoles: [USER_ROLES.ADMIN]
      },
      { 
        title: "Información", 
        href: "/Admin/ConvocatoriaInfo",
        allowedRoles: [USER_ROLES.ADMIN]
      },
      { 
        title: "Reglas", 
        href: "/Admin/ConvocatoriaRules",
        allowedRoles: [USER_ROLES.ADMIN]
      },
      { 
        title: "Formulario", 
        href: "/admin/convocatoria/formulario",
        allowedRoles: [USER_ROLES.ADMIN]
      }
    ]
  },
  {
    id: 10,
    title: "Obras",
    icon: "bi-journal-text",
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.AUTHOR], // Admin y Author
    subpages: [
      { 
        title: "Todas las obras", 
        href: "/admin/Works",
        allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.AUTHOR]
      },
      { 
        title: "Nueva obra", 
        href: "/admin/AddWork",
        allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.AUTHOR]
      }
    ]
  },
  {
    id: 11,
    title: "Capítulos",
    icon: "bi-book",
    allowedRoles: [USER_ROLES.ADMIN], // Solo admin
    subpages: [
      { 
        title: "Todos los capítulos", 
        href: "/admin/Caps",
        allowedRoles: [USER_ROLES.ADMIN]
      },
      { 
        title: "Nuevo capítulo", 
        href: "/admin/AddCap",
        allowedRoles: [USER_ROLES.ADMIN]
      }
    ]
  },
  {
    id: 12,
    title: "Artbooks",
    icon: "bi-journal-album",
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.AUTHOR], // Admin y Author
    subpages: [
      { 
        title: "Todos los artbooks", 
        href: "/Admin/ArtBooks",
        allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.AUTHOR]
      },
      { 
        title: "Nuevo artbook", 
        href: "/Admin/AddArtBook",
        allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.AUTHOR]
      }
    ]
  },
  {
    id: 13,
    title: "Comisiones",
    icon: "bi-palette",
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.AUTHOR, USER_ROLES.ASSISTANT], // Todos
    subpages: [
      { 
        title: "Todas las comisiones", 
        href: "/Admin/Commissions",
        allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.AUTHOR, USER_ROLES.ASSISTANT] // Todos ven
      },
      { 
        title: "Nueva comisión", 
        href: "/Admin/AddCommission",
        allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.AUTHOR] // Asistente no puede crear
      }
    ]
  },
  // ✨ NUEVA OPCIÓN: Editar Perfil
  {
    id: 14,
    title: "Editar Perfil",
    icon: "bi-person-gear",
    href: "/Admin/EditProfile",
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.AUTHOR, USER_ROLES.ASSISTANT] // Todos pueden editar su perfil
  }
];

const Sidebar = ({ 
  isOpen = true, 
  onToggle, 
  currentUser = null // Nueva prop para el usuario actual
}) => {
  const [activeSection, setActiveSection] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Usuario por defecto si no se proporciona (para testing)
  const user = currentUser || {
    id: 1,
    name: "Reizu",
    role: USER_ROLES.ADMIN, // Cambiar aquí para probar diferentes roles ADMIN/AUTHOR/ASSISTANT
    avatar: Perro
  };

  // Función para verificar si el usuario tiene acceso a un item
  const hasAccess = (allowedRoles) => {
    if (!user || !user.role) return false;
    return allowedRoles.includes(user.role);
  };

  // Función para filtrar items basado en el rol del usuario
  const filterItemsByRole = (items) => {
    return items.filter(item => {
      if (hasAccess(item.allowedRoles)) {
        if (item.subpages && item.subpages.length > 0) {
          // Filtrar subpages también
          item.subpages = item.subpages.filter(subpage => 
            hasAccess(subpage.allowedRoles)
          );
        }
        return true;
      }
      return false;
    });
  };

  // Filtrar items del sidebar basado en el rol del usuario
  const filteredSidebarItems = filterItemsByRole([...sidebarItems]);

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

  // CERRAR COMPLETAMENTE la sidebar
  const closeSidebar = () => {
    if (onToggle) onToggle();
  };

  const shouldShowCollapsed = isOpen && isCollapsed;

  // Función para obtener el nombre del rol de forma legible
  const getRoleName = (role) => {
    const roleNames = {
      [USER_ROLES.ADMIN]: 'Administrador',
      [USER_ROLES.AUTHOR]: 'Autor',
      [USER_ROLES.ASSISTANT]: 'Asistente' // Nuevo rol
    };
    return roleNames[role] || 'Usuario';
  };

  // Función para obtener el color del rol
  const getRoleColor = (role) => {
    const roleColors = {
      [USER_ROLES.ADMIN]: '#28a745',    // Verde
      [USER_ROLES.AUTHOR]: '#ffc107',   // Amarillo
      [USER_ROLES.ASSISTANT]: '#007bff' // Azul
    };
    return roleColors[role] || '#6c757d';
  };

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
                  src={user.avatar || Perro}
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
                    Hola {user.name}
                  </h6>
                  <small 
                    className="d-block"
                    style={{ 
                      color: getRoleColor(user.role)
                    }}
                  >
                    {getRoleName(user.role)}
                  </small>
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
                  src={user.avatar || Perro}
                  alt="Perfil Admin"
                  className="rounded-circle"
                  style={{
                    width: '35px',
                    height: '35px',
                    objectFit: 'cover',
                    border: '2px solid #dc3545'
                  }}
                  title={`${user.name} - ${getRoleName(user.role)}`}
                />
              </div>
            )}
            
            {/* BOTONES: Cerrar */}
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
            {filteredSidebarItems.map((item) => (
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

        {/* Footer con información del rol */}
        {!shouldShowCollapsed && (
          <div className="border-top border-secondary p-2 mt-auto">
            <small 
              className="d-block text-center"
              style={{ 
                color: getRoleColor(user.role)
              }}
            >
              Acceso: {getRoleName(user.role)}
            </small>
          </div>
        )}
      </nav>
    </>
  );
};

export default Sidebar;
