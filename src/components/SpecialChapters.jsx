import React from "react";

const chapters = [
  {
    id: 1,
    title: "AUREUS GRAPHERS",
    author: "Suzaku",
    genres: "Ciencia Ficción - Aventura",
    type: "Serie",
    typeColor: "danger",
    score: 54,
    ex: false,
  },
  {
    id: 2,
    title: "EL AMOR DURA LO QUE DURA PARA SIEMPRE TE CONOZCO",
    author: "Suzaku",
    genres: "Drama - Romance",
    type: "Novela",
    typeColor: "primary",
    score: 3,
    ex: false,
  },
  {
    id: 3,
    title: "AUREUS GRAPHERS",
    author: "Suzaku",
    genres: "Drama - Aventura",
    type: "Oneshot",
    typeColor: "success",
    score: 20,
    ex: false,
  },
  {
    id: 4,
    title: "AUREUS GRAPHERS",
    author: "Suzaku",
    genres: "Aventura - Drama",
    type: "Serie",
    typeColor: "danger",
    score: 150,
    ex: true,
  },
  // ...repite para los otros 4
];

const SpecialChapters = () => (
  <div className="container py-4" style={{ maxWidth: 1300 }}>
    <h4 className="fw-bold mb-4 text-center">
      Descubre nuevos Capítulos especiales de cualquier autor.
    </h4>
    <div className="row g-4">
      {chapters.concat(chapters).slice(0, 8).map((ch, i) => (
        <div key={i} className="col-12 col-sm-6 col-md-3">
          <div className="card shadow-sm" style={{
            background: "#d3d3d3",
            borderRadius: 8,
            minHeight: 300,
            height: 340,
            border: "none",
            position: "relative"
          }}>
            {/* Badge tipo */}
            <span
              className={`badge bg-${ch.typeColor} position-absolute top-0 end-0 m-2`}
              style={{ fontSize: 13, zIndex: 2 }}
            >
              {ch.type}
            </span>
            <div className="card-body d-flex flex-column justify-content-end p-3" style={{ height: "100%" }}>
              <div>
                <div
                  className="fw-bold mb-0"
                  style={{
                    fontSize: 16,
                    borderBottom: "2px solid #222",
                    lineHeight: 1.15,
                    textTransform: "uppercase"
                  }}
                >
                  {ch.title}
                </div>
                <div style={{ fontSize: 13 }}>{ch.author}</div>
                <div style={{ fontSize: 13, color: "#333", marginBottom: 6 }}>
                  {ch.genres}
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-end mt-auto">
                {ch.ex && (
                  <span
                    className="badge bg-danger me-2"
                    style={{ fontWeight: 700, fontSize: 15 }}
                  >
                    EX
                  </span>
                )}
                <span className="fw-bold" style={{ fontSize: 20 }}>
                  {ch.score}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SpecialChapters;
