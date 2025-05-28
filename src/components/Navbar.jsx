import { useState } from "react";
import LogoLight from "../assets/logo.svg";
import LogoDark from "../assets/Logos/Reizu Comics Logo Blanco.svg";
import Perfil from "../assets/authors/perro.jpeg";
import { Link } from "react-router-dom";

function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  // Estado de sesión (falso por defecto, cámbialo según tu lógica)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Detecta el tema actual al cargar
  const getInitialTheme = () => {
    if (typeof document !== "undefined") {
      return document.documentElement.getAttribute("data-bs-theme") === "dark";
    }
    return false;
  };
  const [darkMode, setDarkMode] = useState(getInitialTheme());

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleToggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    document.documentElement.setAttribute("data-bs-theme", newTheme);
    setDarkMode(!darkMode);
  };

  // Simulación de login/logout (puedes conectar esto a tu sistema real)
  const handleLogin = () => setIsLoggedIn(false);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-2 px-lg-3 py-2 sticky-top shadow-sm">
      <div className="container-fluid">
        {/* Logo - siempre visible */}
        <Link to={"/"} className="navbar-brand fw-bold text-danger me-0 me-lg-4" href="#">
          <img src={darkMode ? LogoDark : LogoLight} alt="Logo" width="100" height="50" />
        </Link>
        
        {/* Botón hamburguesa y utilidades */}
        <div className="d-flex align-items-center ms-auto order-lg-3">
          {/* Búsqueda móvil (icono) */}
          <button className="btn btn-link d-lg-none me-2" type="button" data-bs-toggle="collapse" data-bs-target="#searchCollapse" aria-expanded="false">
            <i className="bi bi-search"></i>
          </button>
          
          {/* Mensaje */}
          {isLoggedIn && (
            <button className="btn btn-link d-none d-sm-block me-1">
              <i className="bi bi-envelope"></i>
            </button>
          )}
          
          {/* Notificaciones */}
          {isLoggedIn && (
            <button className="btn btn-link d-none d-sm-block me-1">
              <i className="bi bi-bell"></i>
            </button>
          )}

          {/* Botón Dark/Light mode */}
          <button
            className="btn btn-link me-1"
            type="button"
            title={darkMode ? "Modo claro" : "Modo oscuro"}
            onClick={handleToggleTheme}
          >
            <i className={`bi ${darkMode ? "bi-sun-fill text-warning" : "bi-moon-stars-fill text-dark"}`}></i>
          </button>
          
          {/* Avatar o login/register */}
          {isLoggedIn ? (
            <div className="dropdown">
              <img
                src={Perfil}
                alt="Avatar"
                className="rounded-circle mx-2 dropdown-toggle"
                width="35"
                height="35"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ cursor: "pointer" }}
              />
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/profile">Mi perfil</Link>
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
              <Link to="/login" className="btn btn-outline-danger fw-bold me-2">Iniciar sesión</Link>
              <Link to="/register" className="btn btn-danger fw-bold">Registrarse</Link>
            </>
          )}
          
          {/* Botón hamburguesa */}
          <button 
            className="navbar-toggler border-0" 
            type="button" 
            onClick={handleNavCollapse}
            aria-expanded={!isNavCollapsed ? true : false}
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
              <Link className="nav-link text-center text-lg-start py-2" to={"/Genres"} >Generos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-center text-lg-start py-2" >Tienda</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-center text-lg-start py-2 enable disabled" >Convocatoria</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle text-center text-lg-start py-2"  role="button" data-bs-toggle="dropdown">
                Mas
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" >Opción 1</Link></li>
                <li><Link className="dropdown-item" >Opción 2</Link></li>
              </ul>
            </li>
          </ul>
          
          {/* Íconos en versión móvil */}
          {isLoggedIn && (
            <div className="d-flex justify-content-center d-sm-none mb-2">
              <button className="btn btn-link mx-2">
                <i className="bi bi-envelope"></i>
              </button>
              <button className="btn btn-link mx-2">
                <i className="bi bi-bell"></i>
              </button>
            </div>
          )}
          
          {/* Buscador para pantallas grandes */}
          <form className="d-none d-lg-flex" role="search">
            <input
              className="form-control"
              type="search"
              placeholder="Buscar..."
              aria-label="Search"
            />
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
