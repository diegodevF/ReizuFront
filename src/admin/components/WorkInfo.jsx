import React from 'react';

const WorkInfo = ({
  bannerImg,
  coverImg,
  workData,
  isDark,
  onEdit
}) => (
  <>
    {/* ---------- BANNER ---------- */}
    <header
      className="position-relative"
      style={{
        height: 480,
        background: `url(${bannerImg}) center/cover`,
        boxShadow: isDark
          ? '0 4px 15px rgba(0,0,0,.5)'
          : '0 4px 15px rgba(0,0,0,.1)'
      }}
    >
      {/* gradiente de legibilidad */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,.55), rgba(0,0,0,.15))'
        }}
      />

      {/* botón editar */}
      <button
        onClick={onEdit}
        className="btn btn-danger position-absolute"
        style={{ top: 24, right: 24, zIndex: 2 }}
      >
        <i className="bi bi-pencil-square me-2" />
        Editar obra
      </button>

      {/* portada */}
      <div
        style={{
          position: 'absolute',
          bottom: -70,
          left: 40,
          width: 190,
          height: 250,
          borderRadius: 12,
          overflow: 'hidden',
          border: '4px solid #fff',
          background: `url(${coverImg}) center/cover`,
          boxShadow: '0 6px 20px rgba(0,0,0,.3)',
          zIndex: 2
        }}
      />

      {/* título / info */}
      <div
        className="position-absolute text-white"
        style={{ bottom: 40, left: 260, zIndex: 2 }}
      >
        <h1
          className="fw-bold mb-1"
          style={{ textShadow: '0 1px 3px rgba(0,0,0,.6)' }}
        >
          {workData.title}
        </h1>
        <p className="mb-2">
          por <span className="fw-semibold">{workData.author}</span>
        </p>
        <span className="badge bg-success me-2">{workData.status}</span>
        <i className="bi bi-star-fill text-warning me-1" />
        {workData.rating}
      </div>
    </header>

    {/* ---------- DETALLES ---------- */}
    <section
      className="container-fluid px-4 py-5"
      style={{ backgroundColor: isDark ? '#2a2a2a' : '#fff', marginTop: 70 }}
    >
      <div className="row">
        {/* ---------- datos principales ---------- */}
        <div className="col-lg-8">
          {/* métricas */}
          <div className="row g-3 mb-4">
            {[
              { label: 'Capítulos', value: workData.chapters, color: '#d32f2f' },
              { label: 'Vistas', value: workData.views.toLocaleString(), color: '#28a745' },
              { label: 'Me gusta', value: workData.likes, color: '#dc3545' },
              { label: 'Seguidores', value: workData.followers, color: '#ffc107', text: '#000' }
            ].map((m) => (
              <div key={m.label} className="col-6 col-md-3">
                <div
                  className="text-center rounded p-3"
                  style={{
                    background: isDark ? '#3a3a3a' : '#f8f9fa',
                    border: `1px solid ${isDark ? '#555' : '#e9ecef'}`
                  }}
                >
                  <span
                    className="fw-bold d-block"
                    style={{ fontSize: '1.4rem', color: m.color }}
                  >
                    {m.value}
                  </span>
                  <small className="text-muted">{m.label}</small>
                </div>
              </div>
            ))}
          </div>

          {/* sinopsis */}
          <article className="mb-4">
            <h5 className="fw-bold mb-2 border-bottom border-danger d-inline-block pb-1">
              Sinopsis
            </h5>
            <p className="mb-0" style={{ lineHeight: 1.6 }}>
              {workData.description}
            </p>
          </article>

          {/* géneros */}
          <div>
            <h6 className="fw-bold">Géneros</h6>
            {workData.genres.map((g) => (
              <span
                key={g}
                className="badge me-2 mb-2"
                style={{
                  background: isDark ? '#555' : '#e9ecef',
                  color: isDark ? '#fff' : '#495057'
                }}
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* ---------- panel lateral ---------- */}
        <aside className="col-lg-4 mt-4 mt-lg-0">
          <div
            className="p-4 rounded"
            style={{
              background: isDark ? '#3a3a3a' : '#f8f9fa',
              border: `1px solid ${isDark ? '#555' : '#e9ecef'}`,
              position: 'sticky',
              top: 20
            }}
          >
            <h6 className="fw-bold mb-3">Información</h6>
            <p className="mb-2">
              <small className="text-muted">Última actualización</small>
              <br />
              {workData.lastUpdate}
            </p>
            <p className="mb-4">
              <small className="text-muted">Estado</small>
              <br />
              <span className="badge bg-success">{workData.status}</span>
            </p>

            <button className="btn btn-danger w-100 mb-2">
              <i className="bi bi-heart me-2" />
              Seguir obra
            </button>
            <button
              className="btn w-100"
              style={{
                borderColor: isDark ? '#555' : '#6c757d',
                color: isDark ? '#fff' : '#6c757d'
              }}
            >
              <i className="bi bi-bookmark me-2" />
              Añadir a lista
            </button>
          </div>
        </aside>
      </div>
    </section>
  </>
);

export default WorkInfo;
