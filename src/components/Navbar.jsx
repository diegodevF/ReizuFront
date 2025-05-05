import { useState } from "react";
import Logo from "../assets/logo.svg";
import Perfil from "../assets/perro.jpeg";

function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-2 px-lg-3 py-2">
      <div className="container-fluid">
        {/* Logo - siempre visible */}
        <a className="navbar-brand fw-bold text-danger me-0 me-lg-4" href="#">
          <img src={Logo} alt="Logo" width="100" height="50" />
        </a>
        
        {/* Botón hamburguesa en móviles */}
        <div className="d-flex align-items-center ms-auto order-lg-3">
          {/* Búsqueda móvil (icono) */}
          <button className="btn btn-link d-lg-none me-2" type="button" data-bs-toggle="collapse" data-bs-target="#searchCollapse" aria-expanded="false">
            <i className="bi bi-search"></i>
          </button>
          
          {/* Mensaje */}
          <button className="btn btn-link d-none d-sm-block me-1">
            <i className="bi bi-envelope"></i>
          </button>
          
          {/* Notificaciones */}
          <button className="btn btn-link d-none d-sm-block me-1">
            <i className="bi bi-bell"></i>
          </button>
          
          {/* Avatar */}
          <img
            src={Perfil}
            alt="Avatar"
            className="rounded-circle mx-2"
            width="35"
            height="35"
          />
          
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
              <a className="nav-link text-center text-lg-start py-2" href="#">Exclusivos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-center text-lg-start py-2" href="#">Generos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-center text-lg-start py-2" href="#">Tienda</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-center text-lg-start py-2" href="#">Convocatoria</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-center text-lg-start py-2" href="#" role="button" data-bs-toggle="dropdown">
                Mas
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Opción 1</a></li>
                <li><a className="dropdown-item" href="#">Opción 2</a></li>
              </ul>
            </li>
          </ul>
          
          {/* Íconos en versión móvil */}
          <div className="d-flex justify-content-center d-sm-none mb-2">
            <button className="btn btn-link mx-2">
              <i className="bi bi-envelope"></i>
            </button>
            <button className="btn btn-link mx-2">
              <i className="bi bi-bell"></i>
            </button>
          </div>
          
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