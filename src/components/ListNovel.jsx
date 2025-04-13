import Logo from "../assets/logo.svg"

// Arreglo de datos
const libros = {
  novelas: [
    {
      titulo: "ROMANCE CON EL CHICO DE MIS SUEÑOS",
      genero: "Romance - Drama",
      autor: "Kingu Art",
      portada: Logo
    },
    {
      titulo: "ROMANCE CON EL CHICO DE MIS SUEÑOS",
      genero: "Romance - Drama",
      autor: "Kingu Art",
      portada: Logo
    },
    {
      titulo: "ROMANCE CON EL CHICO DE MIS SUEÑOS",
      genero: "Romance - Drama",
      autor: "Kingu Art",
      portada: Logo
    }
  ],
  oneshots: [
    {
      titulo: "ROMANCE CON EL CHICO DE MIS SUEÑOS",
      genero: "Romance - Drama",
      autor: "Kingu Art",
      portada: Logo
    },
    {
      titulo: "ROMANCE CON EL CHICO DE MIS SUEÑOS",
      genero: "Romance - Drama",
      autor: "Kingu Art",
      portada: Logo
    },
    {
      titulo: "ROMANCE CON EL CHICO DE MIS SUEÑOS",
      genero: "Romance - Drama",
      autor: "Kingu Art",
      portada: Logo
    }
  ]
};

// Componente de libro individual
const LibroCard = ({ libro }) => (
    <a href="">
  <div className="d-flex gap-3 border-bottom py-3 align-items-start">
    <img
      src={libro.portada}
      alt={libro.titulo}
      width="100"
      height="100"
      style={{ objectFit: "" }}
    />
    <div>
      <p className="text-muted mb-1">{libro.genero}</p>
      <h6 className="mb-0 fw-bold">{libro.titulo}</h6>
      <small className="text-secondary">{libro.autor}</small>
    </div>
  </div>
  </a>
);

// Componente principal
function ListaLibros() {
  return (
    <div className="container mt-5 p-5">
      <div className="row">
        {/* NOVELAS */}
        <div className="col-md-6">
          <h5 className="text-center border-bottom pb-2 mb-3">
            Lista de Novelas
            <div style={{ height: "3px", background: "red", width: "60px", margin: "auto", marginTop: "5px" }} />
          </h5>
          {libros.novelas.map((libro, i) => (
            <LibroCard key={i} libro={libro} />
          ))}
        </div>

        {/* ONESHOTS */}
        <div className="col-md-6">
          <h5 className="text-center border-bottom pb-2 mb-3">
            Lista de Oneshots
            <div style={{ height: "3px", background: "red", width: "60px", margin: "auto", marginTop: "5px" }} />
          </h5>
          {libros.oneshots.map((libro, i) => (
            <LibroCard key={i} libro={libro} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListaLibros;
