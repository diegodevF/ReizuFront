import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Datos de ejemplo
const achievementsData = Array(6).fill().map((_, i) => ({
  id: i + 1,
  image: null,
  name: i % 2 === 0 ? 'Much Text' : 'My Moment Has Arrived',
  type: i % 2 === 0 ? 'Comments' : 'Account',
  action: i % 2 === 0 ? 'Make 100 comments on any chapter.' : 'Register on the site',
  reward: i % 2 === 0 ? '200 Reizu Coins' : '150 Reizu Coins',
  timesWon: 50,
  visibility: 'Public',
  date: '13/02/2025 at 20:20'
}));

// Detectar el tema global de Bootstrap
const getTheme = () => {
  if (typeof document !== "undefined") {
    return document.documentElement.getAttribute("data-bs-theme") || "light";
  }
  return "light";
};

const Achievements = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [theme, setTheme] = useState(getTheme());

  // Paginación simple
  const itemsPerPage = 6;
  const totalPages = 5;
  const totalItems = 200;

  // Detectar cambios en el tema de Bootstrap
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(getTheme());
    });
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['data-bs-theme'] 
    });
    return () => observer.disconnect();
  }, []);
  const isDark = theme === 'dark';

  // Filtrar por búsqueda
  const filteredData = achievementsData.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Selección por checkbox
  const handleSelect = (id) => {
    setSelected(selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id]);
  };

  return (
    <div className="d-flex" style={{
      background: isDark ? '#18191a' : '#ededed',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif',
      transition: 'background 0.3s'
    }}>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Botón flotante para abrir sidebar si está cerrada */}
      {!sidebarOpen && (
        <button
          className="btn position-fixed"
          style={{
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
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(211, 47, 47, 0.3)"
          }}
          onClick={() => setSidebarOpen(true)}
        >
          <i className="bi bi-chevron-right" style={{ fontSize: 22 }}></i>
        </button>
      )}

      {/* Contenido principal */}
      <div
        style={{
          flexGrow: 1,
          marginLeft: sidebarOpen ? 270 : 0,
          transition: "margin-left 0.3s",
          minHeight: "100vh",
          padding: '40px 0 32px 0'
        }}
      >
        {/* Header */}
        <div style={{
          background: isDark ? '#23272b' : '#e5e5e5',
          padding: '32px 48px 18px 48px',
          borderBottom: isDark ? '1px solid #343a40' : '1px solid #ccc',
          display: 'flex',
          flexDirection: 'column',
          gap: 18
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            <span style={{
              fontWeight: 700,
              fontSize: 26,
              color: isDark ? '#fff' : '#444',
              letterSpacing: '-1px'
            }}>
              Achievements
            </span>
            <button style={{
              marginLeft: 28,
              background: 'linear-gradient(135deg, #d32f2f 0%, #e53935 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '14px 34px',
              fontWeight: 700,
              fontSize: 17,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(211, 47, 47, 0.15)'
            }}>
              <i className="bi bi-plus-circle me-2"></i>
              New Achievement
            </button>
          </div>
          <div style={{ fontSize: 16, color: isDark ? '#bbb' : '#555', fontWeight: 500, marginTop: 6 }}>
            <b>All</b> (105) &nbsp;|&nbsp;
            Published (90) &nbsp;|&nbsp;
            Drafts (3) &nbsp;|&nbsp;
            Private (15) &nbsp;|&nbsp;
            Pending (5) &nbsp;|&nbsp;
            Trash (19)
          </div>
        </div>

        {/* Filtros */}
        <div style={{
          background: isDark ? '#23272b' : '#f7f7f7',
          padding: '28px 48px',
          borderBottom: isDark ? '1px solid #343a40' : '1px solid #ccc',
          display: 'flex',
          alignItems: 'center',
          gap: 24
        }}>
          <select style={{
            padding: '12px 18px',
            borderRadius: 8,
            border: isDark ? '1px solid #343a40' : '1px solid #ccc',
            fontSize: 16,
            background: isDark ? '#18191a' : '#fff',
            color: isDark ? '#fff' : '#222'
          }}>
            <option>Batch actions</option>
          </select>
          <button style={{
            background: 'linear-gradient(135deg, #d32f2f 0%, #e53935 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px 24px',
            fontWeight: 600,
            fontSize: 15,
            cursor: 'pointer'
          }}>
            Apply
          </button>
          <select style={{
            padding: '12px 18px',
            borderRadius: 8,
            border: isDark ? '1px solid #343a40' : '1px solid #ccc',
            fontSize: 16,
            background: isDark ? '#18191a' : '#fff',
            color: isDark ? '#fff' : '#222'
          }}>
            <option>All dates</option>
          </select>
          <select style={{
            padding: '12px 18px',
            borderRadius: 8,
            border: isDark ? '1px solid #343a40' : '1px solid #ccc',
            fontSize: 16,
            background: isDark ? '#18191a' : '#fff',
            color: isDark ? '#fff' : '#222'
          }}>
            <option>All authors</option>
          </select>
          <button style={{
            background: 'linear-gradient(135deg, #d32f2f 0%, #e53935 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px 24px',
            fontWeight: 600,
            fontSize: 15,
            cursor: 'pointer'
          }}>
            Filter
          </button>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              marginLeft: 'auto',
              borderRadius: 8,
              border: isDark ? '1px solid #343a40' : '1px solid #ccc',
              padding: '12px 18px',
              fontSize: 16,
              background: isDark ? '#18191a' : '#fff',
              color: isDark ? '#fff' : '#222'
            }}
          />
        </div>

        {/* Tabla */}
        <div style={{
          padding: '0 24px',
          overflowX: 'auto'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: 0,
            fontSize: 16,
            background: isDark ? '#23272b' : '#fff',
            color: isDark ? '#fff' : '#222',
            boxShadow: isDark ? '0 2px 8px #0004' : '0 2px 8px #0001',
            marginTop: 32,
            borderRadius: 18,
            overflow: 'hidden'
          }}>
            <thead>
              <tr style={{
                background: isDark ? '#18191a' : '#f3f3f3',
                borderBottom: isDark ? '2px solid #343a40' : '2px solid #ccc'
              }}>
                <th style={{ padding: '20px 12px', textAlign: 'left', width: 34 }}>
                  <input type="checkbox" />
                </th>
                <th style={{ padding: '20px 12px', textAlign: 'left', width: 70 }}>Image</th>
                <th style={{ padding: '20px 12px', textAlign: 'left', minWidth: 180 }}>Name</th>
                <th style={{ padding: '20px 12px', textAlign: 'left' }}>Type</th>
                <th style={{ padding: '20px 12px', textAlign: 'left', minWidth: 200 }}>Action</th>
                <th style={{ padding: '20px 12px', textAlign: 'left' }}>Reward</th>
                <th style={{ padding: '20px 12px', textAlign: 'left' }}>Times Won</th>
                <th style={{ padding: '20px 12px', textAlign: 'left' }}>Visibility</th>
                <th style={{ padding: '20px 12px', textAlign: 'left', minWidth: 150 }}>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(item => (
                <tr key={item.id} style={{
                  borderBottom: isDark ? '1px solid #343a40' : '1px solid #eee',
                  background: isDark ? '#23272b' : '#fff',
                  transition: 'background 0.2s'
                }}>
                  <td style={{ padding: '18px 12px', textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={selected.includes(item.id)}
                      onChange={() => handleSelect(item.id)}
                    />
                  </td>
                  <td style={{ padding: '18px 12px' }}>
                    <div style={{
                      width: 52, height: 52, background: isDark ? '#343a40' : '#d2d2d2',
                      borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {/* Imagen o placeholder */}
                      <i className="bi bi-award" style={{ fontSize: 28, color: isDark ? '#fff' : '#888' }}></i>
                    </div>
                  </td>
                  <td style={{ padding: '18px 12px', fontWeight: 700 }}>
                    {item.name}
                    <div style={{ fontSize: 13, color: isDark ? '#bbb' : '#888', fontWeight: 400, marginTop: 4 }}>
                      <a href="#" style={{ color: '#1976d2', marginRight: 14 }}>Edit</a>
                      <a href="#" style={{ color: '#1976d2', marginRight: 14 }}>View</a>
                      <a href="#" style={{ color: '#d32f2f' }}>Delete</a>
                    </div>
                  </td>
                  <td style={{ padding: '18px 12px' }}>{item.type}</td>
                  <td style={{ padding: '18px 12px' }}>{item.action}</td>
                  <td style={{ padding: '18px 12px', fontWeight: 700 }}>{item.reward}</td>
                  <td style={{ padding: '18px 12px' }}>{item.timesWon}</td>
                  <td style={{ padding: '18px 12px' }}>{item.visibility}</td>
                  <td style={{ padding: '18px 12px' }}>{item.date}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer paginación */}
        <div style={{
          background: isDark ? '#23272b' : '#e5e5e5',
          padding: '24px 48px',
          borderTop: isDark ? '1px solid #343a40' : '1px solid #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 40
        }}>
          <span style={{ fontSize: 16, color: isDark ? '#bbb' : '#444' }}>{totalItems} items</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button disabled={page === 1} style={{
              border: 'none',
              background: isDark ? '#343a40' : '#ccc',
              borderRadius: 6,
              padding: '8px 18px',
              color: isDark ? '#fff' : '#222',
              cursor: 'pointer'
            }}>{'<'}</button>
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                onClick={() => setPage(n)}
                style={{
                  border: 'none',
                  background: n === page
                    ? 'linear-gradient(135deg, #d32f2f 0%, #e53935 100%)'
                    : (isDark ? '#343a40' : '#ccc'),
                  color: n === page ? '#fff' : (isDark ? '#fff' : '#222'),
                  borderRadius: 6,
                  padding: '8px 18px',
                  fontWeight: n === page ? 700 : 500,
                  cursor: 'pointer',
                  boxShadow: n === page ? '0 2px 8px rgba(211, 47, 47, 0.15)' : 'none'
                }}
              >{n}</button>
            ))}
            <button disabled={page === totalPages} style={{
              border: 'none',
              background: isDark ? '#343a40' : '#ccc',
              borderRadius: 6,
              padding: '8px 18px',
              color: isDark ? '#fff' : '#222',
              cursor: 'pointer'
            }}>{'>'}</button>
          </div>
          <span style={{ fontSize: 16, color: isDark ? '#bbb' : '#444' }}>Page {page} of {totalPages}</span>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
