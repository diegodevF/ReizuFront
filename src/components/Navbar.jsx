import Logo from "../assets/logo.svg";
import Perfil from "../assets/perro.jpeg"

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-3">
      <div className="container-fluid d-flex">
        
        {/* IZQUIERDA: Logo + Links */}
        <div className="d-flex align-items-center">
          <a className="navbar-brand fw-bold text-danger me-4" href="#">
            <img src={Logo} alt="" width="200px" height="50px"/>
          </a>
          <ul className="navbar-nav d-flex flex-row gap-">
            <li className="nav-item">
              <a className="nav-link" href="#">EXCLUSIVOS</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">GÉNEROS</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">PUBLICAR</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                MÁS
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Opción 1</a></li>
                <li><a className="dropdown-item" href="#">Opción 2</a></li>
              </ul>
            </li>
          </ul>
        </div>

        {/* DERECHA: Íconos + Buscador + Perfil (pegado a la derecha) */}
        <div className="d-flex align-items-center gap-2 p-2">

          {/* Buscador */}
          <form className="d-flex" role="search">
            <input
              className="form-control"
              type="search"
              placeholder="Buscar..."
              aria-label="Search"
            />
          </form>

          {/* Mensaje */}
          <button className="btn btn-link">
            <i class="bi bi-envelope"></i>
          </button>

          {/* Notificaciones */}
          <button className="btn btn-link">
            <i class="bi bi-bell"></i>
          </button>

          {/* Monedas pendientes de agregar a futuro
           
          <div className="d-flex align-items-center">
            <img src="/ruta/moneda.png" alt="Moneda" width="20" className="me-1" />
            <span>34.k</span>
          </div> */}

          {/* Avatar */}
          <img
            src={Perfil}
            alt="Avatar"
            className="rounded-circle"
            width="35"
            height="35"
          />
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
