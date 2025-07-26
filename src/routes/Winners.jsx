import React, { useState } from 'react';
import useTheme from '../hooks/useTheme';
import Navbar from '../components/Navbar';
import NavBarConvo from '../components/navBarConvo';
import Footer from '../components/Footer';
import gold from '../assets/icons/gold.svg'
import plate from '../assets/icons/plate.svg'
import bronce from '../assets/icons/bronce.svg'

import reizu from '../assets/Emotes/reizu1.png'


export default function Winners() {
  const { isDark } = useTheme();
  const currentEdition = '2025 Edición VIII-1';
  const previousEditions = ['2024 Edición VII-2', '2024 Edición VII-1'];
  const [filterEdition, setFilterEdition] = useState(previousEditions[0]);

  // Datos de ganadores de ejemplo
  const winnersData = [
    {
      edition: currentEdition,
      first: [
        { name: 'EL PRÍNCIPE OLVIDADO', subtitle: 'Wicked Duet', image: '' },
        { name: 'PISO - 7', subtitle: 'ConfirmoTIY', image: '' }
      ],
      rest:[
        { name: 'JUEGA CONMIGO LUCY', subtitle: 'Walter Luna', image: '' },
        { name: 'GHOST LINK', subtitle: 'Vanrock', image: '' }
      ]
    },

    ...previousEditions.map((ed) => ({
      edition: ed,
      first: [
        { name: 'EL PRÍNCIPE OLVIDADO', subtitle: 'Wicked Duet', image: '' },
        { name: 'PISO - 7', subtitle: 'ConfirmoTIY', image: '' }
      ],
      rest: [
        { name: 'JUEGA CONMIGO LUCY', subtitle: 'Walter Luna', image: '' },
        { name: 'GHOST LINK', subtitle: 'Vanrock', image: '' }
      ]
    }))
  ];

  const renderSection = (title, data, showFilter) => {
    const block = showFilter
      ? winnersData.find((w) => w.edition === filterEdition)
      : winnersData.find((w) => w.edition === currentEdition);
    // Si no hay datos de ganadores para esta edición, mostrar mensaje
    if (!block || (block.first.length === 0 && !showFilter)) {
      return (
        <div className="mb-5">
          <div className="d-flex flex-column justify-content-between align-items-center mb-3">
            <h3 className="text-danger m-0">{title}</h3>
            {!showFilter ? (
              <span 
              style={{
                alignSelf: "end"
              }}
              className={`${isDark ? 'text-light' : 'text-muted'}`}>{currentEdition}</span>
            ) : (
              <div className="d-flex align-items-center">
                <label className="me-2 mb-0">Filtrar por:</label>
                <select
                  className="form-select"
                  style={{ width: '200px' }}
                  value={filterEdition}
                  onChange={(e) => setFilterEdition(e.target.value)}
                >
                  {previousEditions.map((ed) => (
                    <option key={ed} value={ed}>{ed}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div className="text-center d-flex align-items-center justify-content-center p-4">

            <img
              width={300}
              height={300}
            src={reizu} alt="" />
            <p 
            style={{
              maxWidth: "600px",
            }}
            className={`${isDark ? 'text-light' : 'text-muted'} fs-4`}>ESTAMOS EN ESPERA DE RESULTADOS
ESTAMOS IGUAL DE IMPACIENTE 
COMO USTEDES</p>
          </div>
        </div>
      );
    }

    return (
      <div className="mb-5">
        <div className="d-flex flex-column gap-4 justify-content-between align-items-center mb-3">
          <h3 className="text-danger m-0">{title}</h3>
          {!showFilter ? (
            <span 
              style={{alignSelf: "end"}}
            className={`${isDark ? 'text-light' : 'text-muted'}`}>{currentEdition}</span>
          ) : (
            <div 
              style={{alignSelf:"end"}}
            className="d-flex align-items-center">
              <label className="me-2 mb-0">Filtrar por:</label>
              <select
                className="form-select"
                style={{ width: '200px' }}
                value={filterEdition}
                onChange={(e) => setFilterEdition(e.target.value)}
              >
                {previousEditions.map((ed) => (
                  <option key={ed} value={ed}>{ed}</option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className="row gx-1 align-items-center justify-content-center">
          <div className="col-md-5">
            <h6 className={`${isDark ? 'text-light' : 'text-muted'} text-center`}>PRIMER LUGAR DE ONESHOT Y RELATO</h6>
            <div className="d-flex justify-content-center">
              {block.first.map((w, i) => (
                <div key={i} className={`card m-2 ${isDark ? 'bg-dark text-light' : ''}`} style={{ width: '250px' }}>
                  <div
                    className="card-img-top bg-secondary"
                    style={{ height: '250px', backgroundSize: 'cover', backgroundImage: w.image ? `url(${w.image})` : 'none', position: 'relative' }}
                  >
                    <img
                      width={30}
                      height={30}
                      src={gold} alt=""
                      style={{
                        bottom: '0',
                        left: '0',
                        right: '0',
                        position: 'absolute',

                      }}
                    />
                    </div>
                  <div className="card-body p-2 text-center">
                    <p className="card-title mb-1 fw-bold" style={{ fontSize: '0.9rem' }}>{w.name}</p>
                    <p className="card-text text-muted" style={{ fontSize: '0.8rem' }}>{w.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-auto d-flex justify-content-center">
             <h1 className={`${isDark ? 'text-light' : 'text-muted'}`}>-</h1>
           </div>
          <div className="col-md-5">
            <h6 className={`${isDark ? 'text-light' : 'text-muted'} text-center`}>2DO Y 3ER LUGAR DE ONESHOT</h6>
            <div className="d-flex justify-content-center">
              {block.rest.map((w, i) => (
                <div key={i} className={`card m-2 ${isDark ? 'bg-dark text-light' : ''}`} style={{ width: '250px' }}>
                  <div
                    className="card-img-top bg-secondary"
                    style={{ position: 'relative', height: '250px', backgroundSize: 'cover', backgroundImage: w.image ? `url(${w.image})` : 'none' }}
                  >
                    <img
                      width={30}
                      height={30}
                      src={
                        i === 0 ? plate : bronce
                      } 
                       alt=""
                      style={{
                        bottom: '0',
                        left: '0',
                        right: '0',
                        position: 'absolute',

                      }}
                    />
                    </div>
                  <div className="card-body p-2 text-center">
                    <p className="card-title mb-1 fw-bold" style={{ fontSize: '0.9rem' }}>{w.name}</p>
                    <p className="card-text text-muted" style={{ fontSize: '0.8rem' }}>{w.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (

    <>
    <Navbar />
    <NavBarConvo />


    <div className='p-4'
      style={{
                backgroundColor: isDark ? '#1b1a1aff' : '#f8f9fa',
      }}
    >

    <div className={`container py-5 card`}>      
      {renderSection('GANADORES DE LA CONVOCATORIA ACTUAL', null, false)}
      {renderSection('GANADORES DE LA CONVOCATORIA ANTERIOR', null, true)}
    </div>
    </div>
    <Footer/>
    </>
  );
}