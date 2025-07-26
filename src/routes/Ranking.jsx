import React, { useState } from 'react';
import useTheme from '../hooks/useTheme';
import Navbar from '../components/Navbar';
import NavBarConvo from '../components/navBarConvo';
import Footer from '../components/Footer';

export default function Ranking() {
  const { isDark } = useTheme();
  const currentEdition = '2025 Edición VIII-1';
  const previousEditions = ['2024 Edición VII-1'];
  const [filterEdition, setFilterEdition] = useState(previousEditions[0]);

  // Datos de ejemplo
  const participants = [
    { name: 'Aureus Graphers', author: 'mario', image: '', category: 'Oneshots', edition: currentEdition },
    { name: 'Luna Creators', author: 'luis', image: '', category: 'Oneshots', edition: currentEdition },
    { name: 'Nexo Scribes', author: 'goku', image: '', category: 'Relatos', edition: currentEdition },
    // más participantes actuales...
    { name: 'Vega Writers', author: 'diego', image: '', category: 'Oneshots', edition: previousEditions[0] },
    { name: 'Orion Art', author: 'felipe', image: '', category: 'Relatos', edition: previousEditions[0] },
    // más participantes anteriores...
  ];

  const categories = ['Oneshots', 'Relatos'];

  const renderSection = (title, data, showFilter) => (
    <div className="mb-5 card p-4">
      <div className="d-flex flex-column gap-4 justify-content-between align-items-center mb-3">
        <h3 className={`text-center m-0 text-danger mx-auto`}>{title}</h3>
        {showFilter && (
          
          <div className="d-flex align-items-center"
           style={{
            alignSelf:"end"
           }}
          >
            <label className="me-2 mb-0">Filtrar por:</label>
            <select
              className="form-select"
              style={{ width: '200px' }}
              value={filterEdition}
              onChange={e => setFilterEdition(e.target.value)}
            >
              {previousEditions.map(ed => (
                <option key={ed} value={ed}>{ed}</option>
              ))}
            </select>
          </div>
        )}
      </div>
      {categories.map(cat => (
        <div key={cat} className="mb-4">
          <h5 className={`mb-3 ${isDark ? 'text-light' : ''}`}>Categoría {cat.toUpperCase()}</h5>
          <div className="row">
            {data
              .filter(p => p.category === cat && (!showFilter || p.edition === filterEdition))
              .map((p, idx) => (
                <div key={idx} className="col-6 col-sm-4 col-md-3 col-lg-2 mb-3">
                  <div className={`card  ${isDark ? 'bg-dark text-light' : ''}`}>
                    <div
                      className="card-img-top bg-secondary"
                      style={{
                        aspectRatio: '237 / 300',
                        backgroundSize: 'cover', backgroundImage: p.image ? `url(${p.image})` : 'none' }}
                    />
                    <div className="card-body p-2 text-center">
                      <p className="card-title mb-1 fw-bold">{p.name}</p>
                      <p className="card-text text-muted mb-0">{p.author}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
     <Navbar/>
     <NavBarConvo/>

     <div
       style={{
             backgroundColor: isDark ? '#1b1a1aff' : '#f8f9fa',
    }}>


    <div className='container py-5'
  
    >

      {renderSection(
        'PARTICIPANTES DE LA CONVOCATORIA ACTUAL',
        participants.filter(p => p.edition === currentEdition),
        false
      )}
      {renderSection(
        'PARTICIPANTES DE LA CONVOCATORIA ANTERIOR',
        participants.filter(p => p.edition !== currentEdition),
        true
      )}
    </div>

    </div>

    <Footer />
    </>
  );
}