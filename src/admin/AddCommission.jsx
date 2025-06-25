import React, { useState, useRef } from 'react';
import Sidebar from './components/Sidebar.jsx';

const etiquetas = [
  "Comic", "Manga", "Realista", "Pixel Art", "Cyberpunk", "Fantasia Oscura", "Gótico",
  "Surrealista", "Abstracto", "Cartoon", "Chibi", "Steampunk", "Noir", "Medieval",
  "Acuarela", "NSFW", "Gore", "Animales", "Paisajes", "Edificios", "Vehículos", "Modelos 3D",
  "Monstruos", "Mechas", "Furry", "Fan Arts", "Ecchi", "Vintage", "OC's", "Humanos", "Ships", "Aliens"
];

const pedidosData = Array(4).fill({
  usuario: "MauriX412",
  mensaje: "Hola estoy buscando hacer un diseño de un personaje que me gusta mucho y tu estilo es perfecto para ello, tu me veas de w...",
  estado: "Fijado",
  fecha: "Hoy",
  avatar: null
});

const AddCommission = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [titulo, setTitulo] = useState('');
  const [estado, setEstado] = useState('Borrador');
  const [descripcion, setDescripcion] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [portada, setPortada] = useState(null);
  const [tipo, setTipo] = useState('Personaje');
  const [acabado, setAcabado] = useState('Boceto');
  const [opciones, setOpciones] = useState('Medio Cuerpo');
  const [etiquetasSel, setEtiquetasSel] = useState([]);
  const [entrega, setEntrega] = useState('4 días');
  const [revisiones, setRevisiones] = useState('5 revisiones');
  const [autor, setAutor] = useState('Personaje');
  const inputImgRef = useRef();
  const inputPortadaRef = useRef();

  const handleImagenes = (e) => {
    setImagenes([...imagenes, ...Array.from(e.target.files).slice(0, 10 - imagenes.length)]);
  };

  const handlePortada = (e) => {
    setPortada(e.target.files[0]);
  };

  const handleEtiqueta = (et) => {
    setEtiquetasSel(sel => sel.includes(et) ? sel.filter(e => e !== et) : [...sel, et]);
  };

  return (
    <div style={{ background: "#bdbdbd", minHeight: "100vh", fontFamily: "system-ui, sans-serif", display: "flex" }}>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Botón flotante para abrir la sidebar si está cerrada */}
      {!sidebarOpen && (
        <button
          style={{
            position: "fixed",
            top: 16,
            left: 0,
            zIndex: 2000,
            borderRadius: '0% 50% 50% 0%',
            width: 38,
            height: 38,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: "#d32f2f",
            color: "#fff",
            border: "none",
            cursor: "pointer"
          }}
          onClick={() => setSidebarOpen(true)}
        >
          <i className="bi bi-chevron-right" style={{ fontSize: 22 }}></i>
        </button>
      )}

      {/* Contenido principal */}
      <div style={{
        flexGrow: 1,
        marginLeft: sidebarOpen ? 280 : 0,
        transition: "margin-left 0.3s",
        minHeight: "100vh"
      }}>
        <div style={{ padding: 32, display: "flex", gap: 24 }}>
          {/* Columna principal */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
              <span style={{ fontWeight: 700, fontSize: 20, color: "#fff" }}>NUEVO / EDITAR COMISION</span>
              <input
                type="text"
                placeholder="Escribe título del capítulo..."
                value={titulo}
                onChange={e => setTitulo(e.target.value)}
                style={{
                  flex: 1,
                  padding: "8px 16px",
                  fontSize: 17,
                  borderRadius: 8,
                  border: "1px solid #ddd",
                  background: "#fff",
                  color: "#222",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}
              />
              <select 
                value={estado} 
                onChange={e => setEstado(e.target.value)} 
                style={{ 
                  borderRadius: 8, 
                  padding: "8px 12px", 
                  fontSize: 16,
                  background: "#fff",
                  color: "#222",
                  border: "1px solid #ddd",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}
              >
                <option>Borrador</option>
                <option>Publicado</option>
              </select>
            </div>

            {/* Imágenes de referencia */}
            <div style={{ background: "#fff", borderRadius: 12, padding: 20, marginBottom: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                <span style={{ fontWeight: 700, fontSize: 18 }}>Imágenes de referencias</span>
                <button
                  style={{
                    background: "linear-gradient(90deg, #d32f2f 0%, #e53935 100%)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "8px 20px",
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                    boxShadow: "0 4px 8px rgba(211, 47, 47, 0.3)"
                  }}
                  onClick={() => inputImgRef.current.click()}
                >Elegir Archivo</button>
                <input
                  ref={inputImgRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImagenes}
                  style={{ display: "none" }}
                />
                <span style={{ color: "#e53935", fontSize: 14, fontWeight: 500 }}>Peso máximo 40MB</span>
              </div>
              <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                {[...imagenes, ...Array(10 - imagenes.length).fill(null)].map((img, i) =>
                  <div key={i} style={{
                    width: 80, height: 80, background: "#f5f5f5", borderRadius: 8,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "2px dashed #ddd"
                  }}>
                    {img && <img src={URL.createObjectURL(img)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6 }} />}
                  </div>
                )}
              </div>
            </div>

            {/* Descripción */}
            <div style={{ background: "#fff", borderRadius: 12, padding: 20, marginBottom: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <label style={{ fontWeight: 700, fontSize: 18, display: "block", marginBottom: 12 }}>Descripción e información</label>
              <textarea
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
                maxLength={1500}
                rows={6}
                style={{
                  width: "100%",
                  padding: 16,
                  fontSize: 15,
                  borderRadius: 8,
                  border: "1px solid #ddd",
                  background: "#fff",
                  color: "#222",
                  resize: "vertical",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                }}
                placeholder="Describe tu comisión, detalles, referencias, etc."
              />
              <div style={{ textAlign: "right", fontSize: 13, color: "#888", marginTop: 8 }}>{descripcion.length}/1500</div>
            </div>

            {/* Opciones */}
            <div style={{ background: "#fff", borderRadius: 12, padding: 20, marginBottom: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <div style={{ display: "flex", gap: 20, marginBottom: 16 }}>
                <div>
                  <label style={{ fontWeight: 600, fontSize: 14, display: "block", marginBottom: 6 }}>Tipo</label>
                  <select 
                    value={tipo} 
                    onChange={e => setTipo(e.target.value)} 
                    style={{ 
                      borderRadius: 6, 
                      padding: "6px 12px", 
                      fontSize: 14, 
                      background: "#fff", 
                      color: "#222", 
                      border: "1px solid #ddd",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                    }}
                  >
                    <option>Personaje</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: 14, display: "block", marginBottom: 6 }}>Acabado</label>
                  <select 
                    value={acabado} 
                    onChange={e => setAcabado(e.target.value)} 
                    style={{ 
                      borderRadius: 6, 
                      padding: "6px 12px", 
                      fontSize: 14, 
                      background: "#fff", 
                      color: "#222", 
                      border: "1px solid #ddd",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                    }}
                  >
                    <option>Boceto</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: 14, display: "block", marginBottom: 6 }}>Otras opciones</label>
                  <select 
                    value={opciones} 
                    onChange={e => setOpciones(e.target.value)} 
                    style={{ 
                      borderRadius: 6, 
                      padding: "6px 12px", 
                      fontSize: 14, 
                      background: "#fff", 
                      color: "#222", 
                      border: "1px solid #ddd",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                    }}
                  >
                    <option>Medio Cuerpo</option>
                  </select>
                </div>
              </div>
              {/* Etiquetas */}
              <div>
                <label style={{ fontWeight: 600, marginBottom: 12, display: "block", fontSize: 16 }}>Etiquetas</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {etiquetas.map(et => (
                    <label key={et} style={{
                      display: "flex", alignItems: "center", gap: 6,
                      background: etiquetasSel.includes(et) ? "linear-gradient(90deg, #d32f2f, #e53935)" : "#f5f5f5",
                      color: etiquetasSel.includes(et) ? "#fff" : "#333",
                      borderRadius: 20, padding: "6px 14px", fontSize: 13, cursor: "pointer",
                      fontWeight: 500,
                      boxShadow: etiquetasSel.includes(et) ? "0 2px 8px rgba(211, 47, 47, 0.3)" : "0 1px 3px rgba(0,0,0,0.1)",
                      transition: "all 0.2s"
                    }}>
                      <input
                        type="checkbox"
                        checked={etiquetasSel.includes(et)}
                        onChange={() => handleEtiqueta(et)}
                        style={{ accentColor: "#d32f2f" }}
                      />
                      {et}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Pedidos y órdenes */}
            <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Pedidos y ordenes</div>
              <div style={{ marginBottom: 16, fontSize: 15 }}>
                <span style={{ color: "#d32f2f", fontWeight: 700, cursor: "pointer", marginRight: 16 }}>Todo (105)</span>
                <span style={{ color: "#666", cursor: "pointer", marginRight: 16 }}>Nuevos (5)</span>
                <span style={{ color: "#666", cursor: "pointer", marginRight: 16 }}>Leídos (90)</span>
                <span style={{ color: "#666", cursor: "pointer", marginRight: 16 }}>Completados (3)</span>
                <span style={{ color: "#666", cursor: "pointer" }}>Cancelados (15)</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <select style={{ 
                  fontSize: 14, 
                  padding: "8px 12px", 
                  borderRadius: 6, 
                  background: "#fff", 
                  color: "#222", 
                  border: "1px solid #ddd",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}>
                  <option>Acciones por lote</option>
                </select>
                <button style={{
                  background: "linear-gradient(90deg, #d32f2f 0%, #e53935 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "8px 20px",
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(211, 47, 47, 0.3)"
                }}>Aplicar</button>
              </div>
              {/* Lista de pedidos */}
              {pedidosData.map((p, i) => (
                <div key={i} style={{
                  borderBottom: "1px solid #f0f0f0",
                  padding: "16px 0",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12
                }}>
                  <div style={{
                    width: 40, height: 40, background: "#f5f5f5", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center", marginTop: 4
                  }}>
                    {/* Avatar si hay */}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: "#d32f2f", fontSize: 15 }}>{p.usuario}</div>
                    <div style={{ fontSize: 14, margin: "6px 0", color: "#555" }}>{p.mensaje}</div>
                    <div style={{ fontSize: 13, color: "#888", display: "flex", gap: 16 }}>
                      <span style={{ color: "#d32f2f", fontWeight: 600 }}>Fijado</span>
                      <span style={{ cursor: "pointer" }}>Leído</span>
                      <span style={{ cursor: "pointer" }}>Completar</span>
                      <span style={{ cursor: "pointer" }}>Cancelar</span>
                    </div>
                  </div>
                  <button style={{
                    background: "#f5f5f5",
                    border: "1px solid #ddd",
                    borderRadius: 6,
                    padding: "8px 16px",
                    color: "#333",
                    fontWeight: 500,
                    fontSize: 13,
                    cursor: "pointer"
                  }}>Descargar Historial</button>
                </div>
              ))}
              {/* Paginación */}
              <div style={{ textAlign: "center", marginTop: 16, fontSize: 15 }}>
                <span style={{ marginRight: 12, cursor: "pointer", color: "#666" }}>ANT</span>
                {[1,2,3,4,5,6].map(n =>
                  <span key={n} style={{
                    margin: "0 6px",
                    color: n === 3 ? "#d32f2f" : "#666",
                    fontWeight: n === 3 ? 700 : 400,
                    textDecoration: n === 3 ? "underline" : "none",
                    cursor: "pointer"
                  }}>{n}</span>
                )}
                <span style={{ marginLeft: 12, cursor: "pointer", color: "#666" }}>SIG</span>
              </div>
            </div>
          </div>

          {/* Panel lateral */}
          <div style={{ width: 320, minWidth: 280 }}>
            <div style={{
              background: "#fff", borderRadius: 12, padding: 20, marginBottom: 20,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontSize: 15, fontWeight: 500 }}>Visitas: <b>0</b></span>
                <button style={{
                  background: "linear-gradient(90deg, #d32f2f 0%, #e53935 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "6px 16px",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(211, 47, 47, 0.3)"
                }}>Vista previa</button>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontWeight: 600, fontSize: 14, display: "block", marginBottom: 6 }}>Entrega</label>
                <select 
                  value={entrega} 
                  onChange={e => setEntrega(e.target.value)} 
                  style={{ 
                    borderRadius: 6, 
                    padding: "8px 12px", 
                    width: "100%", 
                    fontSize: 14, 
                    background: "#fff", 
                    color: "#222", 
                    border: "1px solid #ddd",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                  }}
                >
                  <option>4 días</option>
                  <option>7 días</option>
                  <option>14 días</option>
                </select>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontWeight: 600, fontSize: 14, display: "block", marginBottom: 6 }}>Revisiones</label>
                <select 
                  value={revisiones} 
                  onChange={e => setRevisiones(e.target.value)} 
                  style={{ 
                    borderRadius: 6, 
                    padding: "8px 12px", 
                    width: "100%", 
                    fontSize: 14, 
                    background: "#fff", 
                    color: "#222", 
                    border: "1px solid #ddd",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                  }}
                >
                  <option>5 revisiones</option>
                  <option>3 revisiones</option>
                  <option>Sin revisiones</option>
                </select>
              </div>
              <div style={{ textAlign: "center", margin: "16px 0", fontSize: 13, color: "#888" }}>
                18 de May 2025 a las 15:45
              </div>
              <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                <button style={{
                  flex: 1, 
                  background: "linear-gradient(90deg, #424242 0%, #616161 100%)", 
                  color: "#fff", 
                  border: "none", 
                  borderRadius: 8,
                  padding: "10px 0", 
                  fontWeight: 600, 
                  fontSize: 14, 
                  cursor: "pointer",
                  boxShadow: "0 4px 8px rgba(66, 66, 66, 0.3)"
                }}>Programar</button>
                <button style={{
                  flex: 1, 
                  background: "linear-gradient(90deg, #d32f2f, #e53935)", 
                  color: "#fff", 
                  border: "none", 
                  borderRadius: 8,
                  padding: "10px 0", 
                  fontWeight: 600, 
                  fontSize: 14, 
                  cursor: "pointer",
                  boxShadow: "0 4px 8px rgba(211, 47, 47, 0.3)"
                }}>Publicar</button>
              </div>
            </div>
            {/* Portada */}
            <div style={{
              background: "#fff", borderRadius: 12, padding: 20, marginBottom: 20,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}>
              <div style={{ fontWeight: 700, marginBottom: 12, textAlign: "center", fontSize: 16 }}>PORTADA DE LA COMISION</div>
              <div style={{
                width: "100%", height: 160, background: "#f5f5f5", borderRadius: 8,
                marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center",
                border: "2px dashed #ddd"
              }}>
                {portada && <img src={URL.createObjectURL(portada)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6 }} />}
              </div>
              <button
                style={{
                  background: "linear-gradient(90deg, #d32f2f 0%, #e53935 100%)", 
                  color: "#fff", 
                  border: "none", 
                  borderRadius: 8,
                  padding: "8px 16px", 
                  fontWeight: 600, 
                  fontSize: 14, 
                  cursor: "pointer", 
                  width: "100%",
                  boxShadow: "0 4px 8px rgba(211, 47, 47, 0.3)"
                }}
                onClick={() => inputPortadaRef.current.click()}
              >Elegir Archivo</button>
              <input
                ref={inputPortadaRef}
                type="file"
                accept="image/*"
                onChange={handlePortada}
                style={{ display: "none" }}
              />
            </div>
            {/* Asignar autor */}
            <div style={{
              background: "#fff", borderRadius: 12, padding: 20,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}>
              <label style={{ fontWeight: 700, marginBottom: 12, display: "block", fontSize: 16 }}>Asignar autor</label>
              <select 
                value={autor} 
                onChange={e => setAutor(e.target.value)} 
                style={{ 
                  borderRadius: 6, 
                  padding: "8px 12px", 
                  width: "100%", 
                  fontSize: 14, 
                  background: "#fff", 
                  color: "#222", 
                  border: "1px solid #ddd",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}
              >
                <option>Personaje</option>
                <option>Otro autor</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCommission;
