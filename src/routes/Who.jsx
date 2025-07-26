import React from 'react';
import useTheme from '../hooks/useTheme';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import logo from '../assets/logo.svg';
import mascota from '../assets/Emotes/mascota3.png'
import './qs.css';

export default function Who() {
  const { isDark } = useTheme();
  return (
    <>
      <Navbar />
      <div className={`container py-5 ${isDark ? 'bg-dark text-light' : ''}`}>
        <div className="row align-items-center">
          <div className="col-md-6">
            <img src={logo} alt="Reizu Logo" className="img-fluid mb-4" />
          </div>
          <div className="col-md-6">
            <h5 className="text-danger">REIZU COMICS LLC</h5>
            <h2>Conoce más sobre nosotros</h2>
            <p>Reizu Comics es una editorial y plataforma digital dedicada a la publicación de mangas, cómics y novelas de autores latinos. Nuestro objetivo es conectar el talento creativo de Latinoamérica con audiencias globales, ofreciendo historias que destacan por su calidad, originalidad y diversidad.</p>
            <button className="btn btn-danger">Contáctanos</button>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <h5 className="text-danger">Nuestra Misión</h5>
            <p>Ofrecer la mejor calidad de mangas, cómics y novelas de artistas latinos e hispanos al mundo, brindando nuevas experiencias y grandes historias que impulsen el manga latino y español hacia el siguiente nivel.</p>
            <h5 className="text-danger">Nuestra Visión</h5>
            <p>Convertirnos en una de las plataformas más leídas a nivel global, conocida por la calidad excepcional de nuestras obras y la variedad de géneros. Aspiramos a ser una industria sostenible, donde las historias conecten emocionalmente con los lectores y los transporten a mundos por descubrir.</p>
          </div>
        </div>
      </div>

      <div 
      style={{
        // maxHeight: '400px',
        position: 'relative',
        backgroundColor: isDark ? 'gray' : '#1E1E1E',
      }}
      className={`  p-5 text-light`}>
        <div className="row align-items-center">
          <div className="col-md-7">
            <blockquote
            className="blockquote">
              <p className="mb-4 fs-2 w-75">“Todo gran sueño comienza con un gran soñador. Recuerda siempre: tienes en tu interior la fuerza, la paciencia y la pasión para alcanzar las estrellas y cambiar el mundo.”</p>
              <footer className="blockquote-footer text-light">Harriet Tubma</footer>
            </blockquote>
          </div>
          <div className="col-md-5 position-relative" style={{ overflow: 'visible' }}>
            <img
              src={mascota}
              alt="Mascota ilustrando"
              className="position-absolute img-fluid image_card"
              style={{
                right: '0%',       // sobresale a la derecha
                bottom: '-200px', // sobresale hacia abajo
                width: '100%',       // escala según quieras
                maxWidth: 'none'     // ignora límites de contenedor
              }}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}