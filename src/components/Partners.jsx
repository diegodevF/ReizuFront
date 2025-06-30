import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

//Importamos imagenes de patrocinadores y afiliados
import XpPen from '../assets/Logos/Xp.png';

const Partners = () => {
  return (
    <div className="partners-section">
      {/* Sección de Patrocinadores */}
      <div className="bg-danger text-white py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col">
              <h2 className="display-4 fw-bold mb-4">
                Nuestros patrocinadores
              </h2>
              
              <div className="row align-items-center justify-content-center">
                <div className="col-auto me-4">
                  <img 
                    src={XpPen}
                    alt="XP-Pen"
                    style={{
                      height: '60px',
                    }}
                  />
                </div>
                <div className="col-auto">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Afiliados */}
      <div className="bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col">
              {/* Títulos */}
              <div className="text-center mb-5">
                <h2 className="display-5 fw-bold text-dark mb-3">
                  Descubre nuestros afiliados y consigue descuentos
                </h2>
                <p className="lead text-muted">
                  Realiza compras y apoya a la plataforma
                </p>
              </div>

              {/* 3 afiliados directos sin .map */}
              <div className="row justify-content-center align-items-center">
                <div className="col-6 col-sm-4 col-md-4 col-lg-4 text-center mb-4">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Wondershare_Logo.svg/2560px-Wondershare_Logo.svg.png"
                    alt="Wondershare"
                    className="img-fluid"
                    style={{
                      maxHeight: '60px',
                      maxWidth: '150px',
                      objectFit: 'contain'
                    }}
                  />
                </div>
                
                <div className="col-6 col-sm-4 col-md-4 col-lg-4 text-center mb-4">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Clip_Studio_Paint_Logo.svg/2048px-Clip_Studio_Paint_Logo.svg.png"
                    alt="Clip Studio Paint"
                    className="img-fluid"
                    style={{
                      maxHeight: '60px',
                      maxWidth: '150px',
                      objectFit: 'contain'
                    }}
                  />
                </div>
                
                <div className="col-6 col-sm-4 col-md-4 col-lg-4 text-center mb-4">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Kinguin_logo.svg/2560px-Kinguin_logo.svg.png"
                    alt="Kinguin"
                    className="img-fluid"
                    style={{
                      maxHeight: '60px',
                      maxWidth: '150px',
                      objectFit: 'contain'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
