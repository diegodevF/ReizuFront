import { useState, useRef, useEffect } from "react";
import LogoLight from "../assets/logo.svg";
import LogoDark from "../assets/Logos/Reizu Comics Logo Blanco.svg";
import useTheme from '../hooks/useTheme';
import Perfil from "../assets/authors/perro.jpeg";
import { Link } from "react-router-dom";

import IconBell from '../assets/icons/notificacion.svg';
import IconEnvelope from '../assets/icons/mensaje.svg';
import ruizCoins from '../assets/icons/ReizuCoins.svg';
import './Navbar.css';

function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  // Estados para dropdowns
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  
  // Referencias para detectar clics fuera
  const notificationsRef = useRef(null);
  const messagesRef = useRef(null);

  const [ruizCoinsAmount, setRuizCoinsAmount] = useState(1000); // Simulación de cantidad de monedas

  // Hook para tema claro/oscuro
  const { theme, isDark } = useTheme();

  // Datos simulados para notificaciones
  const notifications = [
    {
      id: 1,
      type: 'like',
      title: 'Nueva reacción',
      message: 'A alguien le gustó tu comentario en "Aventura Épica"',
      time: '2 min',
      read: false,
      avatar: '/assets/authors/user1.jpg'
    },
    {
      id: 2,
      type: 'comment',
      title: 'Nuevo comentario',
      message: 'MAMBA comentó en tu publicación',
      time: '15 min',
      read: false,
      avatar: '/assets/authors/user2.jpg'
    },
    {
      id: 3,
      type: 'follow',
      title: 'Nuevo seguidor',
      message: 'Usuario123 ahora te sigue',
      time: '1 hora',
      read: true,
      avatar: '/assets/authors/user3.jpg'
    },
    {
      id: 4,
      type: 'update',
      title: 'Nuevo capítulo',
      message: 'Se publicó el capítulo 15 de "Historia Fantástica"',
      time: '2 horas',
      read: true,
      avatar: '/assets/covers/cover1.jpg'
    }
  ];

  // Datos simulados para mensajes
  const messages = [
    {
      id: 1,
      name: 'MAMBA',
      message: 'Hola! ¿Cómo estás? Quería preguntarte sobre...',
      time: '5 min',
      read: false,
      avatar: '/assets/authors/mamba.jpg',
      online: true
    },
    {
      id: 2,
      name: 'Usuario123',
      message: 'Gracias por seguirme! Me encanta tu trabajo',
      time: '30 min',
      read: false,
      avatar: '/assets/authors/user123.jpg',
      online: false
    },
    {
      id: 3,
      name: 'ArtistCreator',
      message: 'El nuevo capítulo está increíble 🔥',
      time: '2 horas',
      read: true,
      avatar: '/assets/authors/artist.jpg',
      online: true
    },
    {
      id: 4,
      name: 'FanReader',
      message: '¿Cuándo sale el próximo capítulo?',
      time: '1 día',
      read: true,
      avatar: '/assets/authors/fan.jpg',
      online: false
    }
  ];

  // Cerrar dropdowns al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (messagesRef.current && !messagesRef.current.contains(event.target)) {
        setShowMessages(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleToggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-bs-theme", newTheme);
  };

  const handleLogout = () => setIsLoggedIn(false);

  // Toggle de notificaciones
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowMessages(false); // Cerrar mensajes si están abiertos
  };

  // Toggle de mensajes
  const toggleMessages = () => {
    setShowMessages(!showMessages);
    setShowNotifications(false); // Cerrar notificaciones si están abiertas
  };

  // Contar notificaciones no leídas
  const unreadNotifications = notifications.filter(n => !n.read).length;
  const unreadMessages = messages.filter(m => !m.read).length;

  // Función para obtener icono según tipo de notificación
  const getNotificationIcon = (type) => {
    switch(type) {
      case 'like': return '❤️';
      case 'comment': return '💬';
      case 'follow': return '👤';
      case 'update': return '📖';
      default: return '🔔';
    }
  };

  return (
    <nav className="position-relative navbar navbar-expand-lg bg-body-tertiary px-2 px-lg-3 py-2 shadow-sm" style={{ zIndex: 9999 }}>
      <div className="container-fluid gap-2">
        {/* Logo - siempre visible */}
        <Link to={"/"} className="navbar-brand fw-bold text-danger me-0 me-lg-4">
          <img src={isDark ? LogoDark : LogoLight} alt="Logo" width="100" height="50" />
        </Link>
        
        {/* Botón hamburguesa y utilidades */}
        <div className="d-flex align-items-center ms-auto order-lg-3 gap-1">
          {/* Búsqueda móvil (icono) */}
          <button 
            className="btn btn-link d-lg-none" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#searchCollapse" 
            aria-expanded="false"
          >
            <i className="bi bi-search"></i>
          </button>
          
          {/* Mensajes */}
          {isLoggedIn && (
            <div className="position-relative d-none d-sm-block" ref={messagesRef}>
              <button 
                className="btn btn-link position-relative"
                onClick={toggleMessages}
                style={{ filter: isDark ? 'brightness(0) invert(1)' : 'none' }}
              >
                <img src={IconEnvelope} alt="Mensajes" width="24" height="24" />
                {/* Punto rojo para mensajes no leídos */}
                {unreadMessages > 0 && (
                  <span 
                    className="position-absolute bg-danger rounded-circle"
                    style={{
                      top: '8px',
                      right: '8px',
                      width: '10px',
                      height: '10px',
                      border: '2px solid white',
                      animation: 'pulse 2s infinite'
                    }}
                  ></span>
                )}
              </button>

              {/* Dropdown de Mensajes */}
              {showMessages && (
                <div 
                  className="position-absolute end-0 mt-2 shadow-lg border rounded"
              style={{
                    width: '350px',
                    maxHeight: '400px',
                    backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
                    borderColor: isDark ? '#444444' : '#dee2e6',
                    zIndex: 1050
                  }}
                >
                  {/* Header */}
                  <div 
                    className="px-3 py-2 border-bottom d-flex justify-content-between align-items-center"
            style={{ borderColor: isDark ? '#444444' : '#dee2e6' }}
                  >
                    <h6 className="mb-0 fw-bold" style={{ color: isDark ? '#ffffff' : '#212529' }}>
                      Mensajes
                      {unreadMessages > 0 && (
                        <span className="badge bg-danger ms-2" style={{ fontSize: '0.7rem' }}>
                          {unreadMessages}
                        </span>
                      )}
                    </h6>
                    <Link 
                      to="/messages" 
                      className="btn btn-link btn-sm p-0"
                      style={{ color: '#d32f2f' }}
                    >
                      Ver todos
                    </Link>
                  </div>

                  {/* Lista de mensajes */}
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {messages.map((message) => (
                      <div 
                        key={message.id}
                        className="px-3 py-2 border-bottom position-relative"
                        style={{ 
                          borderColor: isDark ? '#444444' : '#f1f1f1',
                          backgroundColor: !message.read ? (isDark ? '#3a3a3a' : '#f8f9fa') : 'transparent',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = isDark ? '#404040' : '#f0f0f0';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = !message.read ? (isDark ? '#3a3a3a' : '#f8f9fa') : 'transparent';
                        }}
                      >
                        <div className="d-flex align-items-start">
                          <div className="position-relative me-2">
                            <div
                              className="rounded-circle"
                              style={{
                                width: '40px',
                                height: '40px',
                                backgroundColor: isDark ? '#555555' : '#e9ecef',
                                backgroundImage: `url(${message.avatar})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                              }}
                            ></div>
                            {message.online && (
                              <span 
                                className="position-absolute bottom-0 end-0 bg-success rounded-circle"
                                style={{ width: '12px', height: '12px', border: '2px solid white' }}
                              ></span>
                            )}
                          </div>
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-center">
                              <h6 className="mb-0" style={{ color: isDark ? '#ffffff' : '#212529', fontSize: '0.9rem' }}>
                                {message.name}
                              </h6>
                              <small style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}>
                                {message.time}
                              </small>
                            </div>
                            <p 
                              className="mb-0 text-truncate"
                              style={{ 
                                color: isDark ? '#cccccc' : '#495057',
                                fontSize: '0.85rem',
                                maxWidth: '250px'
                              }}
                            >
                              {message.message}
                            </p>
                          </div>
                          {!message.read && (
                            <div 
                              className="bg-primary rounded-circle"
                              style={{ width: '8px', height: '8px' }}
                            ></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="px-3 py-2 text-center">
                    <Link 
                      to="/messages"
                      className="btn btn-outline-primary btn-sm w-100"
                      style={{
                        borderColor: '#d32f2f',
                        color: '#d32f2f'
                      }}
                    >
                      Abrir chat completo
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Notificaciones */}
          {isLoggedIn && (
            <div className="position-relative d-none d-sm-block" ref={notificationsRef}>
              <button 
                className="btn btn-link position-relative"
                onClick={toggleNotifications}
                style={{ filter: isDark ? 'brightness(0) invert(1)' : 'none' }}
              >
                <img src={IconBell} alt="Notificaciones" width="24" height="24" />
                {/* Punto rojo para notificaciones no leídas */}
                {unreadNotifications > 0 && (
                  <span 
                    className="position-absolute bg-danger rounded-circle"
                    style={{
                      top: '8px',
                      right: '8px',
                      width: '10px',
                      height: '10px',
                      border: '2px solid white',
                      animation: 'pulse 2s infinite'
                    }}
                  ></span>
                )}
              </button>

              {/* Dropdown de Notificaciones */}
              {showNotifications && (
                <div 
                  className="position-absolute end-0 mt-2 shadow-lg border rounded"
                  style={{
                    width: '350px',
                    maxHeight: '400px',
                    backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
                    borderColor: isDark ? '#444444' : '#dee2e6',
                    zIndex: 1050
                  }}
                >
                  {/* Header */}
                  <div 
                    className="px-3 py-2 border-bottom d-flex justify-content-between align-items-center"
                    style={{ borderColor: isDark ? '#444444' : '#dee2e6' }}
                  >
                    <h6 className="mb-0 fw-bold" style={{ color: isDark ? '#ffffff' : '#212529' }}>
                      Notificaciones
                      {unreadNotifications > 0 && (
                        <span className="badge bg-danger ms-2" style={{ fontSize: '0.7rem' }}>
                          {unreadNotifications}
                        </span>
                      )}
                    </h6>
                    <button 
                      className="btn btn-link btn-sm p-0"
                      style={{ color: '#d32f2f' }}
                    >
                      Marcar como leídas
                    </button>
                  </div>

                  {/* Lista de notificaciones */}
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className="px-3 py-2 border-bottom"
                        style={{ 
                          borderColor: isDark ? '#444444' : '#f1f1f1',
                          backgroundColor: !notification.read ? (isDark ? '#3a3a3a' : '#f8f9fa') : 'transparent',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = isDark ? '#404040' : '#f0f0f0';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = !notification.read ? (isDark ? '#3a3a3a' : '#f8f9fa') : 'transparent';
                        }}
                      >
                        <div className="d-flex align-items-start">
                          <div className="me-2">
                            <div
                              className="rounded-circle d-flex align-items-center justify-content-center"
                              style={{
                                width: '40px',
                                height: '40px',
                                backgroundColor: isDark ? '#555555' : '#e9ecef',
                                backgroundImage: `url(${notification.avatar})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                fontSize: '1.2rem'
                              }}
                            >
                              {!notification.avatar && getNotificationIcon(notification.type)}
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-center">
                              <h6 className="mb-0" style={{ color: isDark ? '#ffffff' : '#212529', fontSize: '0.9rem' }}>
                                {notification.title}
                              </h6>
                              <small style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}>
                                {notification.time}
                              </small>
                            </div>
                            <p 
                              className="mb-0"
                              style={{ 
                                color: isDark ? '#cccccc' : '#495057',
                                fontSize: '0.85rem'
                              }}
                            >
                              {notification.message}
                            </p>
                          </div>
                          {!notification.read && (
                            <div 
                              className="bg-primary rounded-circle"
                              style={{ width: '8px', height: '8px' }}
                            ></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="px-3 py-2 text-center">
                    <Link 
                      to="/notifications"
                      className="btn btn-outline-primary btn-sm w-100"
                      style={{
                        borderColor: '#d32f2f',
                        color: '#d32f2f'
                      }}
                    >
                      Ver todas las notificaciones
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Botón Dark/Light mode */}
          <button
            className="btn btn-link"
            type="button"
            title={isDark ? "Modo claro" : "Modo oscuro"}
            onClick={handleToggleTheme}
          >
            <i className={`bi ${isDark ? "bi-sun-fill text-warning" : "bi-moon-stars-fill text-dark"}`}></i>
          </button>
          
          {/* RuizCoins */}
          <div className="d-flex align-items-center">
            <img 
            width={40}
            height={40}
            src={ruizCoins} alt="" />


            <span>{ruizCoinsAmount >= 1000 ? `${(ruizCoinsAmount / 1000).toFixed(0)}k` : ruizCoinsAmount}</span>
          </div>

          {/* Avatar o login/register */}
          {isLoggedIn ? (
            <div className="dropdown" 
            style={{width: '50px', height: '50px',display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            >
              <img
                src={Perfil}
                alt="Avatar"
                className="rounded-circle dropdown-toggle"
                width="35"
                height="35"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ cursor: "pointer" }}
              />
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/Profile">Mi perfil</Link>
                </li>
                <li>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-danger fw-bold">Iniciar sesión</Link>
              <Link to="/register" className="btn btn-danger fw-bold">Registrarse</Link>
            </>
          )}
          
          {/* Botón hamburguesa */}
          <button 
            className="navbar-toggler border-0" 
            type="button" 
            onClick={handleNavCollapse}
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {/* Búsqueda móvil (desplegable) */}
        <div className="collapse w-100 mt-2 order-lg-4" id="searchCollapse">
          <form className="d-flex" role="search">
            <input
              className="form-control"
              type="search"
              placeholder="Buscar..."
              aria-label="Search"
            />
            <button 
              className="btn btn-danger ms-2" 
              type="submit" 
              aria-label="Buscar"
            >
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div>
        
        {/* Contenido colapsable (menú) */}
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse order-lg-2`} id="navbarNav">
          {/* Links principales */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-center text-lg-start py-2" to={"/Exclusives"}>Exclusivos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-center text-lg-start py-2" to={"/Genres"}>Géneros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-center text-lg-start py-2" to={"/Shop"}>Tienda</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-center text-lg-start py-2 disabled">Convocatoria</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle text-center text-lg-start py-2" role="button" data-bs-toggle="dropdown">
                Más
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="#">Opción 1</Link></li>
                <li><Link className="dropdown-item" to="#">Opción 2</Link></li>
              </ul>
            </li>
          </ul>
          
          {/* Íconos en versión móvil */}
          {isLoggedIn && (
            <div className="d-flex justify-content-center d-sm-none mb-2">
              <div className="position-relative mx-2">
                <button className="btn btn-link" onClick={toggleMessages}>
                  <img src={IconEnvelope} alt="Mensajes" width="24" height="24" />
                </button>
                {/* Punto rojo móvil - Mensajes */}
                {unreadMessages > 0 && (
                  <span 
                    className="position-absolute bg-danger rounded-circle"
                    style={{
                      top: '8px',
                      right: '8px',
                      width: '10px',
                      height: '10px',
                      border: '2px solid white',
                      animation: 'pulse 2s infinite'
                    }}
                  ></span>
                )}
              </div>
              <div className="position-relative mx-2">
                <button className="btn btn-link" onClick={toggleNotifications}>
                  <img src={IconBell} alt="Notificaciones" width="24" height="24" />
                </button>
                {/* Punto rojo móvil - Notificaciones */}
                {unreadNotifications > 0 && (
                  <span 
                    className="position-absolute bg-danger rounded-circle"
                    style={{
                      top: '8px',
                      right: '8px',
                      width: '10px',
                      height: '10px',
                      border: '2px solid white',
                      animation: 'pulse 2s infinite',
                      backgroundColor: '#d32f2f'
                    }}
                  ></span>
                )}
              </div>
            </div>
          )}
          
          {/* Buscador para pantallas grandes */}
          <form className="d-none d-lg-flex" role="search">
            <input
              className="form-control search-input"
              type="search"
              placeholder="Buscar..."
              aria-label="Search"
            />
            <button 
              className="btn btn-danger ms-2" 
              type="submit" 
              aria-label="Buscar"
            >
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
