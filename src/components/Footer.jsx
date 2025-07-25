import Logo from "../assets/Logos/Reizu Comics Logo Blanco.svg"
import Pet from "../assets/pet.png";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Kofi from "../assets/Logos/kofi.svg";
import { Link } from "react-router-dom";

function Footer() {

  const petStyleImage ={
    width: '100%',
    maxWidth: 300,
    padding: '0px',
  }

  const footerStyle = {
    backgroundColor: 'rgba(79, 79, 79, 1)'
  };

  return (
    <>
    <div className="d-flex justify-content-center">
      <img src={Pet} style={petStyleImage} alt="Mascota" />
    </div>
    <footer className="text-white pt-5 pb-3" style={footerStyle}>
      <div className="container text-center">
        {/* ICONOS */}
        <div className="mb-4 d-flex justify-content-center gap-4 fs-4">
          <i className="bi bi-facebook"></i>
          <i className="bi bi-twitter-x"></i>
          <i className="bi bi-youtube"></i>
          <i className="bi bi-instagram"></i>
          <i className="bi bi-twitch"></i>
          <i className="bi bi-discord"></i>
          <img src={Kofi} alt="Kofi" width={24} height={36}/>
        </div>

        {/* LINKS */}
        <div className="row text-center mb-4">
          <div className="col-6 col-md-3 mb-2">Quienes somos</div>
          <div className="col-6 col-md-3 mb-2">Explorar</div>
          <div className="col-6 col-md-3 mb-2">Términos y Condiciones</div>
          <div className="col-6 col-md-3 mb-2">Políticas y Privacidad</div>
          <div className="col-6 col-md-3 mb-2">Preguntas Frecuentes</div>
          <div className="col-6 col-md-3 mb-2">Contacto Empresa</div>
          <div className="col-6 col-md-3 mb-2">Guía de Usuario</div>
          <Link to="/redeem-code" className="col-6 col-md-3 mb-2">Canjear Código</Link>
        </div>

        {/* LOGO */}
        <div className="mb-3">
          <img src={Logo} alt="REIZU Comics" height="50" />
        </div>

        {/* COPYRIGHT */}
        <p className="mb-1 small">
          © 2025 REIZU Comics LLC – Todos los derechos reservados
        </p>
        <p className="small">E-mail: soporte@reizucomics.com</p>
      </div>
    </footer>
    </>
  );
}

export default Footer;
