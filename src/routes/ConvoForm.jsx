import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import NavBarConvo from '../components/navBarConvo';
import useTheme from '../hooks/useTheme';
import Footer from '../components/Footer';

export default function ConvoForm() {
  const {isDark} = useTheme()



  // State hooks
  const [title, setTitle] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [genres, setGenres] = useState([]);
  const [category, setCategory] = useState('');
  const [format, setFormat] = useState('');
  const [workMethod, setWorkMethod] = useState('');
  const [authors, setAuthors] = useState([{ name: '', country: '', age: '' }]);
  const [email, setEmail] = useState('');
  const [cover, setCover] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [workFiles, setWorkFiles] = useState([]);
  const [accepted, setAccepted] = useState(false);

  const genreOptions = [
    'Acción', 'Aventura', 'BL', 'Ciencia Ficción', 'Comedia', 'Deporte',
    'Drama', 'Ecológico', 'Histórico', 'Horror', 'Misterio', 'Psicológico',
    'Romance', 'Terror', 'Thriller'
  ];
  const categoryOptions = ['Oneshot', 'Relato'];
  const formatOptions = ['MANGA/COMIC', 'WEBCOMIC/MANWHA'];
  const methodOptions = ['DIGITAL', 'TRADICIONAL', 'MIXTO'];
  const countryOptions = [
    'Afganistán', 'Albania', 'Argelia', 'Andorra', 'Angola',
    'Antigua y Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
    'Azerbaiyán', 'Bahamas', 'Baréin', 'Bangladés', 'Barbados',
    'Bielorrusia', 'Bélgica', 'Belice', 'Benín', 'Bután',
    'Bolivia', 'Bosnia y Herzegovina', 'Botsuana', 'Brasil', 'Brunéi',
    'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Camboya',
    'Camerún', 'Canadá', 'Chad', 'Chile', 'China',
    'Colombia', 'Comoras', 'Congo (República del)', 'Congo (R.D.)',
    'Costa Rica', 'Costa de Marfil', 'Croacia', 'Cuba', 'Chipre',
    'República Checa', 'Dinamarca', 'Yibuti', 'Dominica', 'Ecuador',
    'Egipto', 'El Salvador', 'Guinea Ecuatorial', 'Eritrea', 'Estonia',
    'Esuatini', 'Etiopía', 'Fiyi', 'Finlandia', 'Francia',
    'Gabón', 'Gambia', 'Georgia', 'Alemania', 'Ghana',
    'Grecia', 'Granada', 'Guatemala', 'Guinea', 'Guinea-Bisáu',
    'Guyana', 'Haití', 'Honduras', 'Hungría', 'Islandia',
    'India', 'Indonesia', 'Irán', 'Iraq', 'Irlanda',
    'Israel', 'Italia', 'Jamaica', 'Japón', 'Jordania',
    'Kazajistán', 'Kenia', 'Kiribati', 'Kosovo', 'Kuwait',
    'Kirguistán', 'Laos', 'Letonia', 'Líbano', 'Lesoto',
    'Liberia', 'Libia', 'Liechtenstein', 'Lituania', 'Luxemburgo',
    'Madagascar', 'Malaui', 'Malasia', 'Maldivas', 'Malí',
    'Malta', 'Islas Marshall', 'Mauritania', 'Mauricio', 'México',
    'Micronesia', 'Moldavia', 'Mónaco', 'Mongolia', 'Montenegro',
    'Marruecos', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru',
    'Nepal', 'Países Bajos', 'Nueva Zelanda', 'Nicaragua', 'Níger',
    'Nigeria', 'Corea del Norte', 'Macedonia del Norte', 'Noruega', 'Omán',
    'Pakistán', 'Palaos', 'Panamá', 'Papúa Nueva Guinea', 'Paraguay',
    'Perú', 'Filipinas', 'Polonia', 'Portugal', 'Catar',
    'Rumanía', 'Rusia', 'Ruanda', 'San Cristóbal y Nieves', 'Santa Lucía',
    'San Vicente y las Granadinas', 'Samoa', 'San Marino', 'Santo Tomé y Príncipe',
    'Arabia Saudita', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leona',
    'Singapur', 'Eslovaquia', 'Eslovenia', 'Islas Salomón', 'Somalia',
    'Sudáfrica', 'Corea del Sur', 'Sudán del Sur', 'España', 'Sri Lanka',
    'Sudán', 'Surinam', 'Suecia', 'Suiza', 'Siria',
    'Tayikistán', 'Tanzania', 'Tailandia', 'Togo', 'Tonga',
    'Trinidad y Tobago', 'Túnez', 'Turquía', 'Turkmenistán', 'Tuvalu',
    'Uganda', 'Ucrania', 'Emiratos Árabes Unidos', 'Reino Unido', 'Estados Unidos',
    'Uruguay', 'Uzbekistán', 'Vanuatu', 'Ciudad del Vaticano', 'Venezuela',
    'Vietnam', 'Yemen', 'Zambia', 'Zimbabue'
  ];

  const handleGenreChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      if (genres.length < 2) setGenres([...genres, value]);
      else alert('Solo puedes seleccionar hasta 2 géneros');
    } else {
      setGenres(genres.filter((g) => g !== value));
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    setCover(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setCoverPreview(previewUrl);
    } else {
      setCoverPreview(null);
    }
  };
  const handleWorkFilesChange = (e) => setWorkFiles(Array.from(e.target.files));

  const addAuthor = () => setAuthors([...authors, { name: '', country: '', age: '' }]);
  const removeAuthor = (index) => setAuthors(authors.filter((_, i) => i !== index));
  const handleAuthorFieldChange = (index, field, value) => {
    setAuthors(authors.map((a, i) => i === index ? { ...a, [field]: value } : a));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!accepted) {
      alert('Debes aceptar los términos antes de enviar.');
      return;
    }
    // Aquí podrías procesar o enviar los datos
    alert('Formulario enviado');
  };

  return (
    <>
    <Navbar/>
    <NavBarConvo/>
    <div className='p-3'
      style={{ 
        
        backgroundColor: isDark ? '#1b1a1aff' : '#f8f9fa',

      
      }}
    >
    <div className="card container mt-5 mb-5 p-4">
      <h2 className="text-center mb-4 text-danger">FORMULARIO DE INSCRIPCIÓN</h2>
      <p
        className='text-center mb-4'
      >AQUI PUEDES MANDAR TU ONESHOT O RELATO PARA PARTICIPAR EN LA CONVOCATORIA INTERNACIONAL, REALIZA EL FORMULARIO UNA VEZ TENGA LA OBRA TERMINADA Y QUE HAYA CUMPLIDO TODOS LOS REQUISITOS.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre de la obra *</label>
          <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Sinopsis *</label>
          <textarea className="form-control" rows="3" value={synopsis} onChange={e => setSynopsis(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Géneros * <small className="text-muted">(Selecciona hasta 2)</small></label>
          <div className="d-flex flex-wrap">
            {genreOptions.map((g) => (
              <div key={g} className="form-check me-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={g}
                  value={g}
                  checked={genres.includes(g)}
                  onChange={handleGenreChange}
                />
                <label className="form-check-label" htmlFor={g}>{g}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Categoría *</label>
            <select className="form-select" value={category} onChange={e => setCategory(e.target.value)} required>
              <option value="">Seleccione...</option>
              {categoryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          {category === 'Oneshot' && (
            <>            
            <div className="col-md-4 mb-3">
              <label className="form-label">Formato *</label>
              <select className="form-select" value={format} onChange={e => setFormat(e.target.value)} required>
                <option value="">Seleccione...</option>
                {formatOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Método de Trabajo *</label>
              <select className="form-select" value={workMethod} onChange={e => setWorkMethod(e.target.value)} required>
                <option value="">Seleccione...</option>
                {methodOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            </>
          )}
        </div>
        <div className="row">
          <div className="col-12 mb-3">
            <label className="form-label">Autor(es) *</label>
            {authors.map((author, idx) => (
              <div key={idx} className="row g-2 align-items-end mb-2">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre"
                    value={author.name}
                    onChange={e => handleAuthorFieldChange(idx, 'name', e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <select
                    className="form-select"
                    value={author.country}
                    onChange={e => handleAuthorFieldChange(idx, 'country', e.target.value)}
                    required
                  >
                    <option value="">País...</option>
                    {countryOptions.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="col-md-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Edad"
                    value={author.age}
                    min="1"
                    onChange={e => handleAuthorFieldChange(idx, 'age', e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-1">
                  {authors.length > 1 && (
                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => removeAuthor(idx)}>
                      &times;
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button type="button" className="btn btn-outline-danger btn-sm" onClick={addAuthor}>
              Agregar Autor
            </button>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Correo de Contacto *</label>
          <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Imagen de Portada</label>
            <div className="mb-2" style={{ minHeight: '200px' }}>
              {coverPreview ? (
                <img
                  src={coverPreview}
                  alt="Previsualización portada"
                  className="img-thumbnail"
                  style={{ maxWidth: '200px',minHeight: '200px', objectFit: 'cover' }}
                />
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center bg-light border"
                  style={{ width: '200px', height: '200px' }}
                >
                  <span className="text-muted">Sin imagen</span>
                </div>
              )}
            </div>
            <input type="file" className="form-control" accept="image/*" onChange={handleCoverChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Subir la Obra en Formato PDF *</label>
            <input type="file" className="form-control" accept="application/pdf" multiple onChange={handleWorkFilesChange} required />
          </div>
        </div>

            <p
              className='text-center mb-4 mt-4'
            >*Al darle al botón de enviar en el formulario afirma y acepta todo lo que está dentro de "REGLAS OFICIALES DE LA CONVOCATORIA REIZU ONESHOT Y RELATOS OCTAVA EDICIÓN", el trabajo presentado es exclusivo e inédito, de su total autoría, creado por usted y/o los colaboradores que lo componen como también está de acuerdo a que podemos usar su obra para fines publicitarios como también reproducción del mismo si la obra llega a estar entre los 10 finalistas en la categoria de oneshot y 3 finalistas de la categoria de relatos escritos. Todos los derechos de la obra y distribución siguen siendo suyos.</p>

        <div className="text-center">

          <button type="submit" className="btn btn-danger px-4">Enviar Participación</button>
        </div>
      </form>
    </div>
    </div>

    <Footer/>
    </>
  );
}