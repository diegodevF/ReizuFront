import React from 'react';
import useTheme from '../hooks/useTheme';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import mascota from '../assets/Emotes/masco77.png'

export default function ContactE() {
  const { isDark } = useTheme();
  return (
    <>
      <Navbar />
      <div className={`container card mt-3 py-5 ${isDark ? 'bg-dark text-light' : ''}`}>  
        <div className="row mb-4 ">
          <div className="col-md-6 p-4">
            <h2>
              <span className="border-bottom border-3 border-danger">Preguntas</span> sobre <strong>Negocio</strong>
            </h2>
            <p className='text-muted mt-3'>
              En <strong>Reizu Comics</strong> estamos abiertos y en búsqueda a cualquier tipo de colaboraciones con socios nacionales e internacionales, todo para mejorar el funcionamiento y la experiencia tanto del artista como del consumidor, y tener la mejor calidad de obras para Latinoamérica y el mundo. <strong>No dude en contactar con nosotros.</strong>
            </p>
            <img src={mascota} alt="Mascota con megáfono" width={400} height={400} className="img-fluid mt-3" />
          </div>
          <div className="col-md-6">
            <h5 className="text-danger text-center">FORMULARIO</h5>
            <div className="card p-4">
              <form>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label className="form-label">Nombre *</label>
                    <input type="text" className="form-control" required />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label">Apellido *</label>
                    <input type="text" className="form-control" required />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Correo electrónico *</label>
                    <input type="email" className="form-control" required />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label">Compañía</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label">Lugar de residencia *</label>
                    <input type="text" className="form-control" required />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Mensaje *</label>
                    <textarea className="form-control" rows={4} required />
                  </div>
                  <div className="col-12 text-center">
                    <button type="submit" className="btn btn-danger px-4">Enviar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}