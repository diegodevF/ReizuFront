import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import StoreNavbar from '../components/StoreNavbar';
import Footer from '../components/Footer';
import useTheme from '../hooks/useTheme';
import Mascot from '../assets/reizuo.png';
import Mascot2 from '../assets/mascota.png';

const RuizInfo = () => {
  const { isDark } = useTheme();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contacto enviado:', form);
  };

  return (
    <>
      <Navbar />

      {/* Sección principal */}
      <div className='p-5 d-flex flex-column gap-4'
        style={{ backgroundColor: isDark ? 'var(--bs-body-bg' : '#D9D9D9' }}
      >
      <div style={{ backgroundColor: isDark ? '#343a40' : '#ffffff',
        padding: '2rem',
        borderRadius:"0.5rem"
       }}>
        <div className="container d-flex flex-column flex-md-row align-items-center gap-4">
          {/* Imagen a la izquierda */}
          <div className="col-md-6 text-center">
            <img src={Mascot} alt="Mascot" className="img-fluid" />
          </div>
          {/* Texto a la derecha */}
          <div className="col-md-6 text-center">
            <h2 className="fw-bold text-danger">REIZU COINS</h2>
            <h4 className="fw-bold" style={{ color: isDark ? '#ddd' : '#555' }}>
              Consigue y disfruta de los beneficios
            </h4>
            <p style={{ color: isDark ? '#aaa' : '#666' }}>
              Descubre la modalidad en la que puede adquirir Reizu Coins,
              comprándolas o adquiriendo de forma gratuita para poder
              donar a los artistas y canjearlos por diferentes productos y
              servicios dentro de la plataforma.
            </p>
            <div className="mt-3">
              <button className="btn btn-danger px-5 py-2 fs-5 fw-bold">COMPRAR</button>
</div>
          </div>
        </div>
      </div>

      {/* Sección FAQ */}
      <div className="py-5" style={{ backgroundColor: isDark ? '#343a40' : '#ffffff', borderRadius:"0.5rem" }}>
        <div className="container">
          <h3 className="fw-bold text-danger text-center mb-4 fs-2"
            style={{
              borderBottom:"6px solid #FF2020",
              paddingBottom:"24px"
            }}

          >
            Conoce más de nuestra moneda, funciones y como obtenerla
          </h3>
          {/* center content */}
          <div className="row justify-content-center align-items-center" >
            <div className="col-lg-6">
              <div 
    className="accordion" 
    id="faqAccordion"
    style={{
      // color de texto cuando está abierto
      '--bs-accordion-active-color': '#FF2020',
      // fondo cuando está abierto
      '--bs-accordion-active-bg': isDark ? '#3a3a3a' : '#FFECEC',
      // color del ícono de flecha al abrir
      '--bs-accordion-active-icon': '#FF2020'
    }}
  >
                {/* FAQ items */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      ¿Qué son las Reizu Coins?
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body text-start">
                      Las Reizu Coins son la moneda virtual de la plataforma.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      ¿Cómo se puede obtener?
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body text-start">
                      Comprando paquetes de Reizu Coins o participando en promociones.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      ¿Qué puedo canjear?
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body text-start">
                      Con tus Reizu Coins, puedes canjear capítulos especiales,
                      comisiones a artistas, suscripciones y más.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFour">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      ¿Puedo ver mis movimientos al momento?
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body text-start">
                      Sí, en tu perfil podrás revisar el historial de tus transacciones.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mt-4 mt-lg-0 text-center">
             <img src={Mascot2} alt="" className='img-fluid' />
            </div>
          </div>
        </div>
      

      {/* Sección Contacto */}
      <div className="py-5"
      >
        <div className="container">
          <h3 className="fw-bold text-danger text-center mb-4 fs-2"
            style={
              {
                borderTop:"6px solid #FF2020",
                paddingTop:"24px"
              }
            }
          >
            Si tienes algún problema Contáctanos
          </h3>

          {/* center */}
          <div className='d-flex gap-5 justify-content-center align-items-center'>
            <p className='fw-bold fs-5'
              style={{maxWidth: '700px',color: isDark ? '#aaa' : '#666'}}
            >
              No dudes en rellenar este formulario si tienes alguna pregunta o problema referente a Reizu Coins, sobre canje, compra, donación, no se recibió las monedas de algún logro o misión, como también algún otro tipo de problema sino está funcionando correctamente
            </p>


       
          <form onSubmit={handleSubmit} className="text-start"  
          style={{
            width: '100%',
          }}
          
          >
            <div className="mb-3">
              <label className="form-label">Nombre *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Correo electrónico *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mensaje *</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="form-control"
                rows={4}
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-danger fw-bold px-4 fs-5">
                Enviar
              </button>
            </div>
          </form>
             </div>
          </div>
        </div>
      </div>
</div>
      <Footer />
    </>
  );
};

export default RuizInfo;
