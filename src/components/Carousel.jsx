import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../variables.css'; // <-- importa tu CSS
import Img1 from '../assets/Banner/1.png';
import Img2 from '../assets/Banner/2.png';
import Img3 from '../assets/Banner/13.png';

const Carousel = () => (
  <div id="carouselExampleAutoplaying" className="carousel slide carousel-fade bg-dark-subtle p-4 bg-light wallpaper"
    data-bs-ride="carousel"
    style={{ boxShadow: "inset 0 10px 10px -10px rgba(0, 0, 0, 0.2), inset 0 -10px 10px -10px rgba(0, 0, 0, 0.2)" }}>
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img src={Img1} className="d-block mx-auto w-50 carousel-img-mask" alt="Image"/>
      </div>
      <div className="carousel-item">
        <img src={Img2} className="d-block mx-auto w-50 carousel-img-mask" alt="Image"/>
      </div>
      <div className="carousel-item">
        <img src={Img3} className="d-block mx-auto w-50 carousel-img-mask" alt="Image"/>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
);

export default Carousel;
