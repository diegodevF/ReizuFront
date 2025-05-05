import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Foto1 from '../assets/foto1.jpg'
import Foto2 from '../assets/foto2.jpg'
import Foto3 from '../assets/foto3.jpg'

const ComicShowcase = () => {
  // Datos de ejemplo para los comics
  const comics = [
    {
      id: 1,
      title: "FrankArt Terminator",
      image: Foto1,
      genre: "DRAMA - COMEDIA",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's ever since t centurlso the leap into electronic typesetting. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's ever since t centurlso the leap..."
    },
    {
      id: 2,
      title: "Comic Example 2",
      image: Foto2,
      genre: "ACCIÓN - AVENTURA",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's ever since t centurlso the leap into electronic typesetting. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's ever since t centurlso the leap..."
    },
    {
      id: 3,
      title: "Comic Example 3",
      image: Foto3,
      genre: "FANTASÍA - MISTERIO",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's ever since t centurlso the leap into electronic typesetting. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's ever since t centurlso the leap..."
    }
  ];

  // Estado para controlar qué comic se muestra actualmente
  const [currentComicIndex, setCurrentComicIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('opacity-100');

  // Cambia el comic mostrado cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      // Iniciar efecto fade out
      setFadeClass('opacity-50');
      
      // Cambiar al siguiente comic después de completar fade out
      setTimeout(() => {
        setCurrentComicIndex((prevIndex) => (prevIndex + 1) % comics.length);
        setFadeClass('opacity-100'); // Fade in con el nuevo comic
      }, 500);
      
    }, 5000);

    return () => clearInterval(interval);
  }, [comics.length]);

  return (
    <div className="container my-5 p-5 rounded-3 bg-none">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="row g-0 shadow">
            {/* Panel izquierdo con título */}
            <div className="col-md-4 bg-light d-flex flex-column justify-content-between" style={{height: '500px'}}>
              <div className="text-center p-4">
                <h2 className="fw-bold">DISFRUTA DE NUESTRAS<br />OBRAS EXCLUSIVAS</h2>
                <p className="mt-2">Encuéntralas únicamente en este lugar</p>
              </div>
              
              {/* Cuadro gris para la imagen mascota */}
              <div className="p-3 pb-4">
                <div className="bg-secondary bg-opacity-25 mx-auto" style={{height: '200px', width: '200px', borderRadius: "100%" }}>
                  <img src="../assets/perro.jpeg" alt=""width={"100%"}/>
                </div>
              </div>
            </div>
            
            {/* Panel central (imagen del cómic) */}
            <div className="col-md-4 position-relative bg-light p-0">
              <div className={`${fadeClass}`} style={{transition: 'opacity 0.5s ease', height: '500px'}}>
                <img 
                  src={comics[currentComicIndex].image}
                  alt={comics[currentComicIndex].title} 
                  className="img-fluid w-100 h-100"
                  style={{objectFit: 'cover'}}
                />
              </div>
            </div>
            
            {/* Panel derecho con información del comic */}
            <div className="col-md-4 bg-light py-3 px-3 text-center" style={{height: '500px'}}>
              <h6 className="mb-2 fw-bold pt-3">{comics[currentComicIndex].genre}</h6>
              
              <div className={`${fadeClass}`} style={{transition: 'opacity 0.5s ease'}}>
                <p className="mb-3 px-2" style={{fontSize: '0.9rem'}}>{comics[currentComicIndex].description}</p>
              </div>
              
              {/* Imagen circular */}
              <div className="d-flex justify-content-center my-4">
                <div className="rounded-circle bg-secondary" 
                     style={{width: '70px', height: '70px'}}></div>
              </div>
              
              <p className="fw-bold mt-1">{comics[currentComicIndex].title}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicShowcase;