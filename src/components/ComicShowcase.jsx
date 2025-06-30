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
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {
      id: 2,
      title: "Comic Example 2",
      image: Foto2,
      genre: "ACCIÓN - AVENTURA",
      author: "Autor Ejemplo",
      authorAvatar: MascotaImg,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {
      id: 3,
      title: "Comic Example 3",
      image: Foto3,
      genre: "FANTASÍA - MISTERIO",
      author: "Otro Autor",
      authorAvatar: MascotaImg,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
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
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [comics.length]);

  return (
    <div className="d-flex justify-content-center my-3 px-2">
      <div 
        className="row g-0 shadow mx-auto"
        style={{ 
          borderRadius: '8px', 
          overflow: 'hidden',
          width: '900px',
          height: '400px',
          maxWidth: '100%'
        }}
      >
        {/* Panel izquierdo - Simplificado */}
        <div 
          className="col-4 d-flex flex-column justify-content-center text-white position-relative"
          style={{ background: '#333', height: '400px' }}
        >
          <div className="text-center p-3">
            <h4 className="fw-bold mb-2" style={{ fontSize: '1.1rem', lineHeight: '1.2' }}>
              DISFRUTA DE NUESTRAS<br />
              <span style={{ color: '#e74c3c' }}>OBRAS EXCLUSIVAS</span>
            </h4>
            <p className="mb-0" style={{ fontSize: '0.85rem', opacity: 0.8 }}>
              Únicamente aquí
            </p>
          </div>
          
          {/* Mascota más pequeña */}
          <div className="position-absolute bottom-0 start-50 translate-middle-x">
            <img 
              src={MascotaDecorativa || MascotaImg} 
              alt="Mascota" 
              style={{
                width: '70px',
                height: '100px',
                objectFit: 'contain'
              }}
            />
          </div>
        </div>
        
        {/* Panel central - Imagen */}
        <div className="col-4 position-relative p-0">
          <div 
            className={`${fadeClass} w-100 h-100`} 
            style={{ transition: 'opacity 0.3s ease', height: '400px' }}
          >
            <img 
              src={comics[currentComicIndex].image}
              alt={comics[currentComicIndex].title} 
              className="w-100 h-100"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        
        {/* Panel derecho - Simplificado */}
        <div 
          className="col-4 d-flex flex-column justify-content-between text-white"
          style={{ background: '#e74c3c', height: '400px' }}
        >
          <div className="p-3 text-center flex-grow-1 d-flex flex-column justify-content-center">
            <h5 className="fw-bold mb-3" style={{ fontSize: '1rem', letterSpacing: '0.5px' }}>
              {comics[currentComicIndex].genre}
            </h5>
            
            <div className={`${fadeClass}`} style={{ transition: 'opacity 0.3s ease' }}>
              <p 
                className="mb-0" 
                style={{ 
                  fontSize: '0.8rem',
                  lineHeight: '1.3',
                  opacity: 0.9
                }}
              >
                {comics[currentComicIndex].description.substring(0, 180)}...
              </p>
            </div>
          </div>
          
          {/* Autor compacto */}
          <div className="text-center p-3">
            <div className="d-flex justify-content-center mb-2">
              <img
                src={comics[currentComicIndex].authorAvatar}
                alt={comics[currentComicIndex].author}
                className="rounded-circle border border-2 border-white"
                style={{ 
                  width: '60px', 
                  height: '60px', 
                  objectFit: 'cover'
                }}
              />
            </div>
            <p className="fw-bold mb-0" style={{ fontSize: '0.9rem' }}>
              {comics[currentComicIndex].author}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicShowcase;
