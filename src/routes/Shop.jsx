import Navbar from "../components/Navbar";
import StoreNavbar from "../components/StoreNavbar";
import Banner from "../assets/Banner/9.png"
import PersonalizeSection from "../components/PersonalizeSection";

const Shop = () => {
    return (
        <>
            <Navbar></Navbar>
            <StoreNavbar></StoreNavbar>
            <div className="w-100">
                <img 
                    src={Banner} 
                    alt="Banner" 
                    className="w-100" 
                    style={{ height: '500px', objectFit: 'cover', display: 'block' }} 
                />
            </div>
            
                <div className="py-5" style={{backgroundColor: 'var(--bs-light)'}}>
  <div className="container" style={{maxWidth: '1300px'}}>
    <div className="text-center mb-5">
      <h2
        className="fw-bold mb-3"
        style={{color: '#dc3545', fontSize: '2.5rem', letterSpacing: '1px'}}
      >
        CANJEA TUS REIZU COINS
      </h2>
      <p
        className="mx-auto"
        style={{
          maxWidth: '600px',
          fontSize: '1.1rem',
          color: 'var(--bs-secondary)',
        }}
      >
        Úsalos como quieras, Canjea tus reizu coins en diferentes productos o servicios, capítulos especiales o comisiones de artistas.
      </p>
    </div>

    <div className="row g-4 justify-content-center">
      <div className="col-lg-4 col-md-6">
        <div
          className="rounded-3 d-flex align-items-center justify-content-center"
          style={{
            height: '400px',
            backgroundColor: '#c0c0c0',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={e => (e.target.style.transform = 'scale(1.02)')}
          onMouseLeave={e => (e.target.style.transform = 'scale(1)')}
        >
          {/* Aquí puedes poner: <img src="imagen1.jpg" alt="Producto 1" className="w-100 h-100 rounded-3" style={{ objectFit: 'cover' }} /> */}
        </div>
      </div>

      <div className="col-lg-4 col-md-6">
        <div
          className="rounded-3 d-flex align-items-center justify-content-center"
          style={{
            height: '400px',
            backgroundColor: '#c0c0c0',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={e => (e.target.style.transform = 'scale(1.02)')}
          onMouseLeave={e => (e.target.style.transform = 'scale(1)')}
        >
          {/* Aquí puedes poner: <img src="imagen2.jpg" alt="Producto 2" className="w-100 h-100 rounded-3" style={{ objectFit: 'cover' }} /> */}
        </div>
      </div>

      <div className="col-lg-4 col-md-6">
        <div
          className="rounded-3 d-flex align-items-center justify-content-center"
          style={{
            height: '400px',
            backgroundColor: '#c0c0c0',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={e => (e.target.style.transform = 'scale(1.02)')}
          onMouseLeave={e => (e.target.style.transform = 'scale(1)')}
        >
          {/* Aquí puedes poner: <img src="imagen3.jpg" alt="Producto 3" className="w-100 h-100 rounded-3" style={{ objectFit: 'cover' }} /> */}
        </div>
      </div>
    </div>
  </div>
</div>
          <PersonalizeSection />


        </>
    );
}

export default Shop;
