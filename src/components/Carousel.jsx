import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../variables.css';
import Img1 from '../assets/Banner/1.png';
import Img2 from '../assets/Banner/2.png';
import Img3 from '../assets/Banner/13.png';

const Carousel = () => (
  <div 
    id="carouselExampleAutoplaying" 
    className="carousel slide carousel-fade bg-dark-subtle bg-light wallpaper"
    data-bs-ride="carousel"
    style={{ 
      boxShadow: "inset 0 10px 10px -10px rgba(0, 0, 0, 0.2), inset 0 -10px 10px -10px rgba(0, 0, 0, 0.2)",
      padding: '0',
      height: '650px',
      overflow: 'hidden'
    }}
  >
    <div className="carousel-inner h-100">
      <div className="carousel-item active h-100">
        <img 
          src={Img1} 
          className="d-block w-100 h-100" 
          alt="Image 1"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="carousel-item h-100">
        <img 
          src={Img2} 
          className="d-block w-100 h-100" 
          alt="Image 2"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="carousel-item h-100">
        <img 
          src={Img3} 
          className="d-block w-100 h-100" 
          alt="Image 3"
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
    
    {/* Controles */}
    <button 
      className="carousel-control-prev" 
      type="button" 
      data-bs-target="#carouselExampleAutoplaying" 
      data-bs-slide="prev"
      style={{ width: '60px' }}
    >
      <span 
        className="carousel-control-prev-icon" 
        aria-hidden="true"
        style={{ 
          width: '40px', 
          height: '40px',
          backgroundSize: '100% 100%' 
        }}
      ></span>
      <span className="visually-hidden">Previous</span>
    </button>
    
    <button 
      className="carousel-control-next" 
      type="button" 
      data-bs-target="#carouselExampleAutoplaying" 
      data-bs-slide="next"
      style={{ width: '60px' }}
    >
      <span 
        className="carousel-control-next-icon" 
        aria-hidden="true"
        style={{ 
          width: '40px', 
          height: '40px',
          backgroundSize: '100% 100%' 
        }}
      ></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
);

export default Carousel;
