import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import StoreNavbar from '../components/StoreNavbar';
import Footer from '../components/Footer';
import useTheme from '../hooks/useTheme';

const RedeemCode = () => {
  const { isDark } = useTheme();
  const [code, setCode] = useState('');

  const handleRedeem = (e) => {
    e.preventDefault();
    // Lógica de canjeo de código
    console.log('Canjeando código:', code);
  };

  return (
    <>
      <Navbar />

      {/* Sección de título */}
      <div
        className="py-5 text-center"
        style={{ backgroundColor: isDark ? 'var(--bs-body-bg)' : '#f2f2f2' }}
      >
        <div className="container">
          <h2 className="fw-bold mb-2 text-danger">CANJEA TUS CÓDIGOS</h2>
          <p className="mb-0 text-muted">
            Canjea los códigos de regalos, descuentos, promociones entre otras formas de conseguir.
          </p>
        </div>
      </div>

      {/* Sección de input de código */}
      <div className="py-5 text-center">
        <div className="container">
          <form
            onSubmit={handleRedeem}
            className="d-flex justify-content-center align-items-center flex-column gap-3"
          >
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value)}
              className="form-control w-50 me-3"
              placeholder="Escribe el código para canjear..."
            />
            <button type="submit" className="btn btn-danger px-5 py-2 fs-5 fw-bold">
              Canjear
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default RedeemCode;
