import Logo from "../assets/logo.svg"

function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-5">
      <div className="container text-center">
        {/* ICONOS */}
        <div className="mb-4 d-flex justify-content-center gap-4 fs-4">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-x-twitter"></i>
          <i className="fab fa-youtube"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-twitch"></i>
          <i className="fas fa-gamepad"></i>
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
          <div className="col-6 col-md-3 mb-2">Canjear Código</div>
        </div>

        {/* LOGO */}
        <div className="mb-3">
          <img src={Logo} alt="REIZU Comics" height="40" />
        </div>

        {/* COPYRIGHT */}
        <p className="mb-1 small">
          © 2025 REIZU Comics LLC – Todos los derechos reservados
        </p>
        <p className="small">E-mail: soporte@reizucomics.com</p>
      </div>
    </footer>
  );
}

export default Footer;
