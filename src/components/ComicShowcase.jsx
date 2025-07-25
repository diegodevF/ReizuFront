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
    <div className="d-flex justify-content-center my-3 px-5 ">
      <div 
        className="d-flex mx-auto"
        style={{ 
          height: '420px', // ✅ Aumentado de 400px a 420px
          maxWidth: '100%',
          gap: '12px' // ✅ Separación entre secciones
        }}
      >
        {/* Panel izquierdo - Separado */}
        <div 
          className="d-flex flex-column justify-content-center text-white position-relative"
          style={{ 
            background: '#333', 
            height: '420px', // ✅ Aumentado
            flex: 1, // ✅ Para que ocupe el espacio restante
            borderRadius: '8px', // ✅ Bordes redondeados individuales
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)' // ✅ Sombra individual
          }}
        >
          <div className="text-center p-3">
            <h4 className="fw-bold mb-2" style={{ fontSize: '1.15rem', lineHeight: '1.2' }}> {/* ✅ Texto ligeramente más grande */}
              DISFRUTA DE NUESTRAS<br />
              <span style={{ color: '#e74c3c' }}>OBRAS EXCLUSIVAS</span>
            </h4>
            <p className="mb-0" style={{ fontSize: '0.9rem', opacity: 0.8 }}> {/* ✅ Texto ligeramente más grande */}
              Únicamente aquí
            </p>
          </div>
          
          {/* Mascota más pequeña */}
          <div className="position-absolute bottom-0 start-50 translate-middle-x">
            <img 
              src={MascotaDecorativa || MascotaImg} 
              alt="Mascota" 
              style={{
                width: '75px', // ✅ Ligeramente más grande
                height: '105px', // ✅ Ligeramente más grande
                objectFit: 'contain'
              }}
            />
          </div>
        </div>
        
        {/* Panel central - Imagen separada */}
        <div 
          className="position-relative p-0"
          style={{ 
            width: '33.33%', // ✅ Ancho proporcional
            borderRadius: '8px', // ✅ Bordes redondeados individuales
            overflow: 'hidden', // ✅ Para que la imagen respete el border radius
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)' // ✅ Sombra individual
          }}
        >
          <div 
            className={`${fadeClass} w-100 h-100`} 
            style={{ transition: 'opacity 0.3s ease', height: '420px' }} // ✅ Aumentado
          >
            <img 
              src={comics[currentComicIndex].image}
              alt={comics[currentComicIndex].title} 
              className="w-100 h-100"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        
        {/* Panel derecho - Separado */}
        <div 
          className="d-flex flex-column justify-content-between text-white"
          style={{ 
            background: '#e74c3c', 
            height: '420px', // ✅ Aumentado
            width: '33.33%', // ✅ Ancho proporcional
            borderRadius: '8px', // ✅ Bordes redondeados individuales
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)' // ✅ Sombra individual
          }}
        >
          <div className="p-3 text-center flex-grow-1 d-flex flex-column justify-content-center">
            <h5 className="fw-bold mb-3" style={{ fontSize: '1.05rem', letterSpacing: '0.5px' }}> {/* ✅ Ligeramente más grande */}
              {comics[currentComicIndex].genre}
            </h5>
            
            <div className={`${fadeClass}`} style={{ transition: 'opacity 0.3s ease' }}>
              <p 
                className="mb-0" 
                style={{ 
                  fontSize: '0.85rem', // ✅ Ligeramente más grande
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
                  width: '65px', // ✅ Ligeramente más grande
                  height: '65px', // ✅ Ligeramente más grande
                  objectFit: 'cover'
                }}
              />
            </div>
            <p className="fw-bold mb-0" style={{ fontSize: '0.95rem' }}> {/* ✅ Ligeramente más grande */}
              {comics[currentComicIndex].author}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicShowcase;
