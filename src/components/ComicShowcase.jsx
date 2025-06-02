import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Foto1 from '../assets/foto1.jpg';
import Foto2 from '../assets/foto2.jpg';
import Foto3 from '../assets/foto3.jpg';
import MascotaImg from '../assets/authors/perro.jpeg';
import MascotaDecorativa from '../assets/mascota.png';

const ComicShowcase = () => {
  // Datos de ejemplo para los comics
  const comics = [
    {
      id: 1,
      title: "FrankArt Terminator",
      image: Foto1,
      genre: "DRAMA - COMEDIA",
      author: "FrankArt Terminator",
      authorAvatar: MascotaImg,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting."
    },
    {
      id: 2,
      title: "Comic Example 2",
      image: Foto2,
      genre: "ACCIÓN - AVENTURA",
      author: "Autor Ejemplo",
      authorAvatar: MascotaImg,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting."
    },
    {
      id: 3,
      title: "Comic Example 3",
      image: Foto3,
      genre: "FANTASÍA - MISTERIO",
      author: "Otro Autor",
      authorAvatar: MascotaImg,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting."
    }
  ];

  const [currentComicIndex, setCurrentComicIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('opacity-100');

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass('opacity-50');
      setTimeout(() => {
        setCurrentComicIndex((prevIndex) => (prevIndex + 1) % comics.length);
        setFadeClass('opacity-100');
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [comics.length]);

  return (
    <div className="d-flex justify-content-center my-4 px-3">
      <div 
        className="row g-0 shadow-lg mx-auto"
        style={{ 
          borderRadius: '12px', 
          overflow: 'hidden',
          width: '1210px',
          height: '650px',
          maxWidth: '100%'
        }}
      >
        {/* Panel izquierdo - Negro */}
        <div 
          className="col-4 d-flex flex-column justify-content-between text-white position-relative"
          style={{
            background: '#1a1a1a',
            height: '650px'
          }}
        >
          <div className="text-center p-5 flex-grow-1 d-flex flex-column justify-content-center">
            <h3 className="fw-bold lh-1 mb-4" style={{ fontSize: '1.6rem' }}>
              DISFRUTA DE NUESTRAS<br />
              <span style={{ color: '#dc3545' }}>OBRAS EXCLUSIVAS</span>
            </h3>
            <p className="mb-0" style={{ fontSize: '1.2rem', opacity: 0.9 }}>
              Encuéntralas únicamente en este lugar
            </p>
          </div>
          
          {/* Imagen de la mascota centrada, más alta y menos ancha */}
          <div className="position-absolute bottom-0 start-50 translate-middle-x p-4">
            <img 
              src={MascotaDecorativa || MascotaImg} 
              alt="Mascota" 
              style={{
                width: '120px',
                height: '180px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
              }}
            />
          </div>
        </div>
        
        {/* Panel central - Imagen del cómic */}
        <div className="col-4 position-relative p-0">
          <div 
            className={`${fadeClass} w-100 h-100`} 
            style={{ 
              transition: 'opacity 0.5s ease', 
              height: '650px'
            }}
          >
            <img 
              src={comics[currentComicIndex].image}
              alt={comics[currentComicIndex].title} 
              className="w-100 h-100"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        
        {/* Panel derecho - Rojo */}
        <div 
          className="col-4 d-flex flex-column justify-content-between text-white"
          style={{
            background: '#dc3545',
            height: '650px'
          }}
        >
          <div className="p-5 text-center">
            <h4 className="fw-bold mb-4 pt-4" style={{ 
              letterSpacing: '1px',
              fontSize: '1.5rem'
            }}>
              {comics[currentComicIndex].genre}
            </h4>
            
            <div className={`${fadeClass}`} style={{ transition: 'opacity 0.5s ease' }}>
              <p 
                className="mb-0 lh-base" 
                style={{ 
                  fontSize: '1.1rem',
                  textAlign: 'justify',
                  opacity: 0.95
                }}
              >
                {comics[currentComicIndex].description}
              </p>
            </div>
          </div>
          
          {/* Autor y avatar */}
          <div className="text-center p-5">
            <div className="d-flex justify-content-center mb-4">
              <img
                src={comics[currentComicIndex].authorAvatar}
                alt={comics[currentComicIndex].author}
                className="rounded-circle border border-3 border-white"
                style={{ 
                  width: '130px', 
                  height: '130px', 
                  objectFit: 'cover',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}
              />
            </div>
            <p className="fw-bold mb-0" style={{ fontSize: '1.4rem' }}>
              {comics[currentComicIndex].author}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicShowcase;
