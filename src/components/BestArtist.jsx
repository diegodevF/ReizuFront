import perfilFoto from "../assets/authors/perro.jpeg";

const destacados = [
  {
    nombre: "User1",
    imagen: perfilFoto
  },
  {
    nombre: "User2",
    imagen: perfilFoto
  },
  {
    nombre: "User3",
    imagen: perfilFoto
  }
];

function BestArtist() {
  return (
    <div className="container my-5 p-5">
      {/* Encabezado */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
        <h5 className="mb-0">
          Artistas destacados del mes <span className="text-danger">❯</span>
        </h5>
        <select className="form-select form-select-sm w-auto">
          <option>Diciembre</option>
          <option>Noviembre</option>
          <option>Octubre</option>
        </select>
      </div>

      {/* Lista de artistas */}
      <div className="d-flex justify-content-center gap-5 flex-wrap">
        {destacados.map((artista, i) => (
          <div key={i} className="text-center mb-4">
            <img
              src={artista.imagen}
              alt={artista.nombre}
              className="rounded-circle img-fluid"
              style={{ maxWidth: "250px", height: "auto", objectFit: "cover" }}
            />
            <h6 className="mt-2 fw-bold">{artista.nombre}</h6>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestArtist;
