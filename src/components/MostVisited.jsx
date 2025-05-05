import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

const top10 = [
  {
    id: 1,
    title: 'AUREUS GRAPHERS',
    author: 'Suzaku',
    genre: 'Ciencia Ficción - Aventura',
    visits: 54,
  },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
];

const MostVisited = () => {
  return (
    <div className="container my-4 p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">#10 Más visitadas del mes</h5>
        <select className="form-select form-select-sm w-auto">
          <option>Diciembre</option>
          <option>Noviembre</option>
          <option>Octubre</option>
        </select>
      </div>

      <div className="row g-2">
        {/* Primer lugar destacado */}
        <div className="col-12 col-md-6">
          <div className="position-relative bg-light rounded shadow-sm p-3 h-100 d-flex flex-column justify-content-end">
            <div className="position-absolute top-0 start-0 m-2 d-flex align-items-center">
              <span className="fs-1 fw-bold text-danger me-1">1</span>
              <i className="bi bi-crown-fill fs-3 text-danger"></i>
            </div>
            <div>
              <h5 className="fw-bold">{top10[0].title}</h5>
              <p className="mb-1 small">{top10[0].author}</p>
              <p className="mb-1 small">{top10[0].genre}</p>
              <hr className="my-1" />
              <h5 className="fw-bold text-end mb-0">{top10[0].visits}</h5>
            </div>
          </div>
        </div>

        {/* Puestos 2 al 10 */}
        <div className="col-12 col-md-6">
          <div className="row g-2">
            {top10.slice(1).map((item) => (
              <div key={item.id} className="col-4">
                <div className="position-relative bg-light rounded shadow-sm" style={{ paddingTop: '140%' }}>
                  <span className="position-absolute top-0 start-0 bg-dark text-white small px-2 py-1 rounded-bottom">
                    {item.id}
                  </span>
                  {/* Aquí puedes poner la miniatura */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostVisited;
