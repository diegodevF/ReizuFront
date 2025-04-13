import perfilFoto from "../assets/perro.jpeg";

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

function ArtistasDestacados() {
  return (
    <div className="container my-5 p-5">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="mb-0">
          Artistas destacados del mes <span className="text-danger">❯</span>
        </h5>
        <select className="form-select w-auto">
          <option>Diciembre</option>
          <option>Noviembre</option>
          <option>Octubre</option>
        </select>
      </div>

      {/* Lista de artistas */}
      <div className="d-flex justify-content-center gap-5 flex-wrap">
        {destacados.map((artista, i) => (
          <div key={i} className="text-center">
            <img
              src={artista.imagen}
              alt={artista.nombre}
              className="rounded-circle"
              width="320"
              height="320"
              style={{ objectFit: "cover" }}
            />
            <h6 className="mt-2 fw-bold">{artista.nombre}</h6>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArtistasDestacados;
