import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell 
} from 'recharts';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [activeTab, setActiveTab] = useState('traffic');

  const trafficData = [
    { name: 'Lun', visitas: 4000, lecturas: 2400 },
    { name: 'Mar', visitas: 3000, lecturas: 1398 },
    { name: 'Mié', visitas: 2000, lecturas: 9800 },
    { name: 'Jue', visitas: 2780, lecturas: 3908 },
    { name: 'Vie', visitas: 1890, lecturas: 4800 },
    { name: 'Sáb', visitas: 2390, lecturas: 3800 },
    { name: 'Dom', visitas: 3490, lecturas: 4300 },
  ];

  const comicPopularityData = [
    { name: 'Avengers', lecturas: 2400 },
    { name: 'Spider-Man', lecturas: 1398 },
    { name: 'X-Men', lecturas: 9800 },
    { name: 'Batman', lecturas: 3908 },
    { name: 'Superman', lecturas: 4800 },
  ];

  const deviceData = [
    { name: 'Móvil', value: 400 },
    { name: 'Tablet', value: 300 },
    { name: 'Desktop', value: 300 },
  ];

  const performanceData = [
    { name: 'Ene', tiempo: 400, rebote: 24 },
    { name: 'Feb', tiempo: 300, rebote: 13 },
    { name: 'Mar', tiempo: 200, rebote: 98 },
    { name: 'Abr', tiempo: 278, rebote: 39 },
    { name: 'May', tiempo: 189, rebote: 48 },
    { name: 'Jun', tiempo: 239, rebote: 38 },
    { name: 'Jul', tiempo: 349, rebote: 43 },
  ];

  // Paleta de colores actualizada
  const COLORS = ['#d32f2f', '#e53935', '#f44336', '#ff5252', '#ff8a80'];
  const BG_COLOR = '#121212';
  const CARD_BG = '#1e1e1e';
  const TEXT_COLOR = '#ffffff';
  const BORDER_COLOR = '#333333';

  // Estilo personalizado para Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ 
          background: CARD_BG, 
          padding: '10px', 
          border: `1px solid ${BORDER_COLOR}`,
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          <p style={{ fontWeight: 600, color: TEXT_COLOR, marginBottom: '5px' }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ 
              color: COLORS[index % COLORS.length],
              margin: '3px 0'
            }}>
              {entry.name}: <strong>{entry.value}</strong>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container-fluid p-4" style={{ background: BG_COLOR, minHeight: '100vh' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 mb-0" style={{ color: TEXT_COLOR }}>Dashboard de Analíticas</h1>
        <div className="btn-group">
          <button 
            className={`btn btn-sm ${timeRange === 'day' ? 'btn-danger' : 'btn-outline-secondary'}`}
            onClick={() => setTimeRange('day')}
          >
            Día
          </button>
          <button 
            className={`btn btn-sm ${timeRange === 'week' ? 'btn-danger' : 'btn-outline-secondary'}`}
            onClick={() => setTimeRange('week')}
          >
            Semana
          </button>
          <button 
            className={`btn btn-sm ${timeRange === 'month' ? 'btn-danger' : 'btn-outline-secondary'}`}
            onClick={() => setTimeRange('month')}
          >
            Mes
          </button>
        </div>
      </div>

      <div className="card mb-4" style={{ background: CARD_BG, border: `1px solid ${BORDER_COLOR}` }}>
        <div className="card-header" style={{ background: CARD_BG, borderBottom: `1px solid ${BORDER_COLOR}` }}>
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'traffic' ? 'active text-danger' : 'text-light'}`}
                style={{ background: activeTab === 'traffic' ? CARD_BG : 'transparent' }}
                onClick={() => setActiveTab('traffic')}
              >
                Tráfico
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'content' ? 'active text-danger' : 'text-light'}`}
                style={{ background: activeTab === 'content' ? CARD_BG : 'transparent' }}
                onClick={() => setActiveTab('content')}
              >
                Contenido
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'audience' ? 'active text-danger' : 'text-light'}`}
                style={{ background: activeTab === 'audience' ? CARD_BG : 'transparent' }}
                onClick={() => setActiveTab('audience')}
              >
                Audiencia
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'performance' ? 'active text-danger' : 'text-light'}`}
                style={{ background: activeTab === 'performance' ? CARD_BG : 'transparent' }}
                onClick={() => setActiveTab('performance')}
              >
                Rendimiento
              </button>
            </li>
          </ul>
        </div>
        
        <div className="card-body p-0" style={{ background: BG_COLOR }}>
          {/* Panel de Tráfico */}
          {activeTab === 'traffic' && (
            <div className="p-4">
              <div className="row">
                <div className="col-md-8">
                  <h5 className="mb-3" style={{ color: TEXT_COLOR }}>Tráfico en los últimos 7 días</h5>
                  <div style={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={trafficData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke={BORDER_COLOR} />
                        <XAxis dataKey="name" stroke={TEXT_COLOR} />
                        <YAxis stroke={TEXT_COLOR} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ color: TEXT_COLOR }} />
                        <Line 
                          type="monotone" 
                          dataKey="visitas" 
                          stroke="#d32f2f" 
                          activeDot={{ r: 8, stroke: '#d32f2f', strokeWidth: 2, fill: '#fff' }} 
                          name="Visitas" 
                          strokeWidth={2}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="lecturas" 
                          stroke="#82ca9d" 
                          name="Lecturas completas" 
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="col-md-4">
                  <h5 className="mb-3" style={{ color: TEXT_COLOR }}>Dispositivos de los lectores</h5>
                  <div style={{ height: 250 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={deviceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => (
                            <text 
                              fill="#fff" 
                              x={0} 
                              y={0} 
                              textAnchor="middle" 
                              dominantBaseline="middle"
                            >
                              {`${(percent * 100).toFixed(0)}%`}
                            </text>
                          )}
                        >
                          {deviceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ color: TEXT_COLOR }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="card border-0 shadow-sm" style={{ background: CARD_BG }}>
                    <div className="card-body">
                      <h6 className="card-title text-muted">Visitas totales</h6>
                      <h3 className="card-text" style={{ color: '#d32f2f' }}>24,531</h3>
                      <div className="text-success">
                        <small>+12% desde la semana pasada</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card border-0 shadow-sm" style={{ background: CARD_BG }}>
                    <div className="card-body">
                      <h6 className="card-title text-muted">Lecturas completas</h6>
                      <h3 className="card-text" style={{ color: '#82ca9d' }}>15,231</h3>
                      <div className="text-success">
                        <small>+5% desde la semana pasada</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Panel de Contenido */}
          {activeTab === 'content' && (
            <div className="p-4">
              <h5 className="mb-3" style={{ color: TEXT_COLOR }}>Cómics más populares</h5>
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={comicPopularityData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={BORDER_COLOR} />
                    <XAxis dataKey="name" stroke={TEXT_COLOR} />
                    <YAxis stroke={TEXT_COLOR} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ color: TEXT_COLOR }} />
                    <Bar 
                      dataKey="lecturas" 
                      fill="#d32f2f" 
                      name="Lecturas" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="card border-0 shadow-sm" style={{ background: CARD_BG }}>
                    <div className="card-body">
                      <h6 className="card-title text-muted">Cómic más leído</h6>
                      <h3 className="card-text" style={{ color: '#d32f2f' }}>X-Men</h3>
                      <div className="text-muted">
                        <small>9,800 lecturas esta semana</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card border-0 shadow-sm" style={{ background: CARD_BG }}>
                    <div className="card-body">
                      <h6 className="card-title text-muted">Cómic con más crecimiento</h6>
                      <h3 className="card-text" style={{ color: '#d32f2f' }}>Avengers</h3>
                      <div className="text-success">
                        <small>+18% desde la semana pasada</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Panel de Rendimiento */}
          {activeTab === 'performance' && (
            <div className="p-4">
              <h5 className="mb-3" style={{ color: TEXT_COLOR }}>Rendimiento de lectura</h5>
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={BORDER_COLOR} />
                    <XAxis dataKey="name" stroke={TEXT_COLOR} />
                    <YAxis yAxisId="left" stroke={TEXT_COLOR} />
                    <YAxis yAxisId="right" orientation="right" stroke={TEXT_COLOR} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ color: TEXT_COLOR }} />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="tiempo" 
                      stroke="#d32f2f" 
                      activeDot={{ r: 8, stroke: '#d32f2f', strokeWidth: 2, fill: '#fff' }} 
                      name="Tiempo promedio (seg)" 
                      strokeWidth={2}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="rebote" 
                      stroke="#82ca9d" 
                      name="Tasa de rebote (%)" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="row mt-4">
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm" style={{ background: CARD_BG }}>
                    <div className="card-body">
                      <h6 className="card-title text-muted">Tiempo promedio</h6>
                      <h3 className="card-text" style={{ color: '#d32f2f' }}>2.4 min</h3>
                      <div className="text-success">
                        <small>+8% desde el mes pasado</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm" style={{ background: CARD_BG }}>
                    <div className="card-body">
                      <h6 className="card-title text-muted">Tasa de rebote</h6>
                      <h3 className="card-text" style={{ color: '#d32f2f' }}>42%</h3>
                      <div className="text-danger">
                        <small>-3% desde el mes pasado</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm" style={{ background: CARD_BG }}>
                    <div className="card-body">
                      <h6 className="card-title text-muted">Páginas por sesión</h6>
                      <h3 className="card-text" style={{ color: '#d32f2f' }}>4.2</h3>
                      <div className="text-success">
                        <small>+12% desde el mes pasado</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Panel de Audiencia */}
          {activeTab === 'audience' && (
            <div className="p-4">
              <div className="row">
                <div className="col-md-6">
                  <div className="card border-0 shadow-sm mb-4" style={{ background: CARD_BG }}>
                    <div className="card-body">
                      <h6 className="card-title text-muted">Países principales</h6>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0" style={{ background: CARD_BG, color: TEXT_COLOR }}>
                          <span>🇲🇽 México</span>
                          <span className="badge bg-danger rounded-pill">42%</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0" style={{ background: CARD_BG, color: TEXT_COLOR }}>
                          <span>🇪🇸 España</span>
                          <span className="badge bg-danger rounded-pill">23%</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0" style={{ background: CARD_BG, color: TEXT_COLOR }}>
                          <span>🇨🇴 Colombia</span>
                          <span className="badge bg-danger rounded-pill">15%</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0" style={{ background: CARD_BG, color: TEXT_COLOR }}>
                          <span>🇦🇷 Argentina</span>
                          <span className="badge bg-danger rounded-pill">12%</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card border-0 shadow-sm" style={{ background: CARD_BG }}>
                    <div className="card-body">
                      <h6 className="card-title text-muted">Demografía</h6>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0" style={{ background: CARD_BG, color: TEXT_COLOR }}>
                          <span>Hombres</span>
                          <span className="badge bg-danger rounded-pill">68%</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0" style={{ background: CARD_BG, color: TEXT_COLOR }}>
                          <span>Mujeres</span>
                          <span className="badge bg-danger rounded-pill">28%</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0" style={{ background: CARD_BG, color: TEXT_COLOR }}>
                          <span>18-24 años</span>
                          <span className="badge bg-danger rounded-pill">45%</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0" style={{ background: CARD_BG, color: TEXT_COLOR }}>
                          <span>25-34 años</span>
                          <span className="badge bg-danger rounded-pill">32%</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="card border-0 shadow-sm" style={{ background: CARD_BG }}>
                    <div className="card-body">
                      <h6 className="card-title text-muted">Fuentes de tráfico</h6>
                      <div className="d-flex mb-2">
                        <div className="w-25" style={{ color: TEXT_COLOR }}>Directo</div>
                        <div className="w-75">
                          <div className="progress">
                            <div 
                              className="progress-bar bg-danger" 
                              role="progressbar" 
                              style={{ width: '45%' }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex mb-2">
                        <div className="w-25" style={{ color: TEXT_COLOR }}>Redes</div>
                        <div className="w-75">
                          <div className="progress">
                            <div 
                              className="progress-bar bg-danger" 
                              role="progressbar" 
                              style={{ width: '30%' }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex mb-2">
                        <div className="w-25" style={{ color: TEXT_COLOR }}>Búsqueda</div>
                        <div className="w-75">
                          <div className="progress">
                            <div 
                              className="progress-bar bg-danger" 
                              role="progressbar" 
                              style={{ width: '15%' }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="w-25" style={{ color: TEXT_COLOR }}>Referidos</div>
                        <div className="w-75">
                          <div className="progress">
                            <div 
                              className="progress-bar bg-danger" 
                              role="progressbar" 
                              style={{ width: '10%' }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card border-0 shadow-sm h-100" style={{ background: CARD_BG }}>
                    <div className="card-body">
                      <h6 className="card-title text-muted">Retención de usuarios</h6>
                      <div className="d-flex align-items-center justify-content-center h-100">
                        <div className="text-center">
                          <div className="display-4" style={{ color: '#d32f2f' }}>62%</div>
                          <p className="text-muted mb-0">Usuarios que regresan</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card border-0 shadow-sm h-100" style={{ background: CARD_BG }}>
            <div className="card-body">
              <h5 className="card-title" style={{ color: TEXT_COLOR }}>Actividad reciente</h5>
              <div className="list-group list-group-flush">
                <a href="#" className="list-group-item list-group-item-action" style={{ background: CARD_BG, color: TEXT_COLOR }}>
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-1">Usuario123 leyó "X-Men #42"</h6>
                    <small>Hace 5 min</small>
                  </div>
                  <small className="text-muted">Completó el 100% del cómic</small>
                </a>
                <a href="#" className="list-group-item list-group-item-action" style={{ background: CARD_BG, color: TEXT_COLOR }}>
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-1">Usuario456 comentó en "Spider-Man"</h6>
                    <small>Hace 15 min</small>
                  </div>
                  <small className="text-muted">"¡Increíble número este mes!"</small>
                </a>
                <a href="#" className="list-group-item list-group-item-action" style={{ background: CARD_BG, color: TEXT_COLOR }}>
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-1">Nuevo usuario registrado</h6>
                    <small>Hace 30 min</small>
                  </div>
                  <small className="text-muted">ComicFan22 se unió a la plataforma</small>
                </a>
                <a href="#" className="list-group-item list-group-item-action" style={{ background: CARD_BG, color: TEXT_COLOR }}>
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-1">Usuario789 compartió "Avengers"</h6>
                    <small>Hace 2 horas</small>
                  </div>
                  <small className="text-muted">Compartido en Twitter</small>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 mb-4">
          <div className="card border-0 shadow-sm h-100" style={{ background: CARD_BG }}>
            <div className="card-body">
              <h5 className="card-title" style={{ color: TEXT_COLOR }}>Objetivos</h5>
              <div className="d-flex align-items-center mb-4">
                <div className="flex-grow-1">
                  <h6 className="mb-1" style={{ color: TEXT_COLOR }}>Lecturas completas</h6>
                  <div className="progress" style={{ height: '10px' }}>
                    <div 
                      className="progress-bar bg-danger" 
                      role="progressbar" 
                      style={{ width: '75%' }}
                    ></div>
                  </div>
                </div>
                <div className="ms-3">
                  <span className="badge bg-danger">75%</span>
                </div>
              </div>
              
              <div className="d-flex align-items-center mb-4">
                <div className="flex-grow-1">
                  <h6 className="mb-1" style={{ color: TEXT_COLOR }}>Nuevos usuarios</h6>
                  <div className="progress" style={{ height: '10px' }}>
                    <div 
                      className="progress-bar bg-danger" 
                      role="progressbar" 
                      style={{ width: '50%' }}
                    ></div>
                  </div>
                </div>
                <div className="ms-3">
                  <span className="badge bg-danger">50%</span>
                </div>
              </div>
              
              <div className="d-flex align-items-center mb-4">
                <div className="flex-grow-1">
                  <h6 className="mb-1" style={{ color: TEXT_COLOR }}>Tasa de retención</h6>
                  <div className="progress" style={{ height: '10px' }}>
                    <div 
                      className="progress-bar bg-danger" 
                      role="progressbar" 
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                </div>
                <div className="ms-3">
                  <span className="badge bg-danger">85%</span>
                </div>
              </div>
              
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h6 className="mb-1" style={{ color: TEXT_COLOR }}>Ingresos</h6>
                  <div className="progress" style={{ height: '10px' }}>
                    <div 
                      className="progress-bar bg-danger" 
                      role="progressbar" 
                      style={{ width: '30%' }}
                    ></div>
                  </div>
                </div>
                <div className="ms-3">
                  <span className="badge bg-danger">30%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
