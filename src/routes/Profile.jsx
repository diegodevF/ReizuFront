import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import AuthorProfile from "../components/AuthorProfile";
import AuthorNav from "../components/AuthorNav";
import ProfileSummary from "../components/ProfileSummary";
import Achievements from "../components/Achievements";
import PostSummary from "../components/PostSummary";
import Post from "../components/Post";
import Footer from "../components/Footer";

const Profile = () => {
  const [activeTab, setActiveTab] = useState('muro');

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <Navbar />
      
        <AuthorProfile />
        <AuthorNav 
          onTabChange={handleTabChange} 
          defaultTab="muro" 
        />
        
      <div className="container mt-4">
        {/* Contenido según tab activo */}
        {activeTab === 'muro' && (
          <div className="row mt-3">
            {/* Columna izquierda - Sidebar */}
            <div className="col-12 col-lg-4 order-2 order-lg-1">
              <div className="sticky-top" style={{ top: '20px' }}>
                <ProfileSummary />
                <div className="mt-3">
                  <Achievements />
                </div>
                <div className="mt-3">
                  <PostSummary />
                </div>
              </div>
            </div>
            
            {/* Columna derecha - Publicaciones */}
            <div className="col-12 col-lg-8 order-1 order-lg-2">
              <Post />
            </div>
          </div>
        )}

        {/* Tab Portafolio */}
        {activeTab === 'portafolio' && (
          <div className="row mt-3">
            <div className="col-12">
              <div 
                className="rounded p-4 text-center"
                style={{
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #dee2e6',
                  minHeight: '400px'
                }}
              >
                <h4 className="text-muted mb-3">Portafolio</h4>
                <p className="text-muted">Aquí se mostrará el portafolio del autor</p>
                <i className="bi bi-palette text-muted" style={{ fontSize: '3rem' }}></i>
              </div>
            </div>
          </div>
        )}

        {/* Tab Productos */}
        {activeTab === 'productos' && (
          <div className="row mt-3">
            <div className="col-12">
              <div 
                className="rounded p-4 text-center"
                style={{
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #dee2e6',
                  minHeight: '400px'
                }}
              >
                <h4 className="text-muted mb-3">Productos</h4>
                <p className="text-muted">Aquí se mostrarán los productos del autor</p>
                <i className="bi bi-shop text-muted" style={{ fontSize: '3rem' }}></i>
              </div>
            </div>
          </div>
        )}

        {/* Tab Suscripciones */}
        {activeTab === 'suscripciones' && (
          <div className="row mt-3">
            <div className="col-12">
              <div 
                className="rounded p-4 text-center"
                style={{
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #dee2e6',
                  minHeight: '400px'
                }}
              >
                <h4 className="text-muted mb-3">Suscripciones</h4>
                <p className="text-muted">Aquí se mostrarán los planes de suscripción</p>
                <i className="bi bi-credit-card text-muted" style={{ fontSize: '3rem' }}></i>
              </div>
            </div>
          </div>
        )}

        {/* Tab Sobre mí */}
        {activeTab === 'sobre-mi' && (
          <div className="row mt-3">
            <div className="col-12">
              <div 
                className="rounded p-4 text-center"
                style={{
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #dee2e6',
                  minHeight: '400px'
                }}
              >
                <h4 className="text-muted mb-3">Sobre mí</h4>
                <p className="text-muted">Aquí se mostrará información personal del autor</p>
                <i className="bi bi-person-circle text-muted" style={{ fontSize: '3rem' }}></i>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </>
  );
};

export default Profile;
