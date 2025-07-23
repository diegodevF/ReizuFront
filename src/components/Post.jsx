import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Posts = ({ authorId, onLoadMore }) => {
  const [theme, setTheme] = useState('light');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [newPost, setNewPost] = useState({ content: '', images: [] });
  const [showCreatePost, setShowCreatePost] = useState(false);

  // Función para obtener el tema actual
  const getTheme = () => {
    if (typeof document !== "undefined") {
      return document.documentElement.getAttribute("data-bs-theme") || "light";
    }
    return "light";
  };

  // Observer para detectar cambios de tema
  useEffect(() => {
    setTheme(getTheme());
    
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

  // Datos de ejemplo - reemplaza con tu API
  const generateMockPosts = useCallback((count = 5) => {
    const mockPosts = [];
    for (let i = 0; i < count; i++) {
      mockPosts.push({
        id: Date.now() + i,
        authorName: 'MAMBA',
        authorAvatar: '/path/to/avatar.jpg',
        content: `Esta es una publicación de ejemplo #${posts.length + i + 1}. Puede contener texto, imágenes y diferentes tipos de contenido multimedia.`,
        images: Math.random() > 0.5 ? ['/path/to/image1.jpg', '/path/to/image2.jpg'] : [],
        likes: Math.floor(Math.random() * 500),
        comments: Math.floor(Math.random() * 50),
        shares: Math.floor(Math.random() * 20),
        date: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
        isLiked: Math.random() > 0.5
      });
    }
    return mockPosts;
  }, [posts.length]);

  // Cargar publicaciones iniciales
  useEffect(() => {
    const initialPosts = generateMockPosts(3);
    setPosts(initialPosts);
  }, []);

  // Función para cargar más publicaciones
  const loadMorePosts = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    // Simular carga de API
    setTimeout(() => {
      const newPosts = generateMockPosts(3);
      setPosts(prev => [...prev, ...newPosts]);
      setLoading(false);
      
      // Simular que no hay más publicaciones después de 15 posts
      if (posts.length + newPosts.length >= 15) {
        setHasMore(false);
      }
    }, 1000);
  };

  // Crear nueva publicación
  const handleCreatePost = () => {
    if (!newPost.content.trim()) return;

    const post = {
      id: Date.now(),
      authorName: 'MAMBA',
      authorAvatar: '/path/to/avatar.jpg',
      content: newPost.content,
      images: newPost.images,
      likes: 0,
      comments: 0,
      shares: 0,
      date: new Date().toISOString(),
      isLiked: false
    };

    setPosts([post, ...posts]);
    setNewPost({ content: '', images: [] });
    setShowCreatePost(false);
  };

  // Manejar like
  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  return (
    <div>
      {/* Header */}
      <div 
        className="rounded p-4 mb-3"
        style={{
          backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
          borderColor: isDark ? '#333333' : '#dee2e6',
          boxShadow: isDark ? '0 2px 10px rgba(0,0,0,0.3)' : '0 2px 10px rgba(0,0,0,0.1)',
          border: `1px solid ${isDark ? '#333333' : '#dee2e6'}`
        }}
      >
        <div className="d-flex align-items-center justify-content-between">
          <h5 
            className="fw-bold mb-0"
            style={{ color: isDark ? '#ffffff' : '#212529' }}
          >
            <i className="bi bi-newspaper me-2"></i>
            Publicaciones
          </h5>
          
          <button 
            className="btn btn-danger"
            onClick={() => setShowCreatePost(!showCreatePost)}
            style={{
              background: 'linear-gradient(45deg, #d32f2f, #e53935)',
              border: 'none'
            }}
          >
            <i className="bi bi-plus-lg me-2"></i>
            Nueva Publicación
          </button>
        </div>

        {/* Formulario para crear publicación */}
        {showCreatePost && (
          <div 
            className="mt-3 p-3 rounded"
            style={{
              backgroundColor: isDark ? '#2a2a2a' : '#f8f9fa',
              border: `1px solid ${isDark ? '#444444' : '#e9ecef'}`
            }}
          >
            <textarea
              className="form-control mb-3"
              rows="3"
              placeholder="¿Qué estás pensando?"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              style={{
                backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
                borderColor: isDark ? '#555555' : '#ced4da',
                color: isDark ? '#ffffff' : '#212529'
              }}
            />
            
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <button 
                  className="btn btn-outline-secondary btn-sm me-2"
                  style={{
                    borderColor: isDark ? '#555555' : '#6c757d',
                    color: isDark ? '#8a8a8a' : '#6c757d'
                  }}
                >
                  <i className="bi bi-image me-1"></i>
                  Imagen
                </button>
                <button 
                  className="btn btn-outline-secondary btn-sm"
                  style={{
                    borderColor: isDark ? '#555555' : '#6c757d',
                    color: isDark ? '#8a8a8a' : '#6c757d'
                  }}
                >
                  <i className="bi bi-emoji-smile me-1"></i>
                  Emoji
                </button>
              </div>
              
              <div>
                <button 
                  className="btn btn-secondary btn-sm me-2"
                  onClick={() => setShowCreatePost(false)}
                >
                  Cancelar
                </button>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={handleCreatePost}
                  disabled={!newPost.content.trim()}
                >
                  Publicar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lista de publicaciones */}
      <div className="posts-container">
        {posts.map((post) => (
          <div 
            key={post.id}
            className="rounded p-4 mb-3"
            style={{
              backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
              borderColor: isDark ? '#333333' : '#dee2e6',
              boxShadow: isDark ? '0 2px 10px rgba(0,0,0,0.3)' : '0 2px 10px rgba(0,0,0,0.1)',
              border: `1px solid ${isDark ? '#333333' : '#dee2e6'}`
            }}
          >
            {/* Header del post */}
            <div className="d-flex align-items-center mb-3">
              <div
                className="rounded-circle me-3"
                style={{
                  width: '45px',
                  height: '45px',
                  backgroundColor: isDark ? '#2a2a2a' : '#f8f9fa',
                  border: '2px solid #d32f2f',
                  backgroundImage: post.authorAvatar ? `url(${post.authorAvatar})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              
              <div className="flex-grow-1">
                <h6 
                  className="fw-bold mb-0"
                  style={{ color: isDark ? '#ffffff' : '#212529' }}
                >
                  {post.authorName}
                </h6>
                <small 
                  style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}
                >
                  {new Date(post.date).toLocaleDateString()} • {new Date(post.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </small>
              </div>
              
              <div className="dropdown">
                <button 
                  className="btn btn-link p-0"
                  style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-three-dots"></i>
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Editar</a></li>
                  <li><a className="dropdown-item" href="#">Eliminar</a></li>
                  <li><a className="dropdown-item" href="#">Reportar</a></li>
                </ul>
              </div>
            </div>

            {/* Contenido del post */}
            <div className="mb-3">
              <p 
                style={{ 
                  color: isDark ? '#cccccc' : '#212529',
                  lineHeight: '1.5'
                }}
              >
                {post.content}
              </p>
              
              {/* Imágenes del post */}
              {post.images.length > 0 && (
                <div className="row g-2 mt-2">
                  {post.images.map((image, index) => (
                    <div key={index} className={`col-${post.images.length === 1 ? '12' : '6'}`}>
                      <div
                        className="rounded"
                        style={{
                          height: '200px',
                          backgroundColor: isDark ? '#2a2a2a' : '#f8f9fa',
                          backgroundImage: `url(${image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          border: `1px solid ${isDark ? '#444444' : '#e9ecef'}`
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Acciones del post */}
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <button 
                  className="btn btn-link p-0 me-4"
                  onClick={() => handleLike(post.id)}
                  style={{ 
                    color: post.isLiked ? '#d32f2f' : (isDark ? '#8a8a8a' : '#6c757d'),
                    textDecoration: 'none'
                  }}
                >
                  <i className={`bi ${post.isLiked ? 'bi-heart-fill' : 'bi-heart'} me-1`}></i>
                  {post.likes}
                </button>
                
                <button 
                  className="btn btn-link p-0 me-4"
                  style={{ 
                    color: isDark ? '#8a8a8a' : '#6c757d',
                    textDecoration: 'none'
                  }}
                >
                  <i className="bi bi-chat me-1"></i>
                  {post.comments}
                </button>
                
                <button 
                  className="btn btn-link p-0"
                  style={{ 
                    color: isDark ? '#8a8a8a' : '#6c757d',
                    textDecoration: 'none'
                  }}
                >
                  <i className="bi bi-share me-1"></i>
                  {post.shares}
                </button>
              </div>
              
              <button 
                className="btn btn-link p-0"
                style={{ 
                  color: isDark ? '#8a8a8a' : '#6c757d',
                  textDecoration: 'none'
                }}
              >
                <i className="bi bi-bookmark"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Botón para cargar más */}
      {hasMore && (
        <div className="text-center mb-4">
          <button 
            className="btn btn-outline-danger"
            onClick={loadMorePosts}
            disabled={loading}
            style={{
              borderColor: '#d32f2f',
              color: isDark ? '#e53935' : '#d32f2f'
            }}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Cargando...
              </>
            ) : (
              <>
                <i className="bi bi-arrow-down me-2"></i>
                Cargar más publicaciones
              </>
            )}
          </button>
        </div>
      )}

      {/* Mensaje cuando no hay más publicaciones */}
      {!hasMore && posts.length > 0 && (
        <div className="text-center mb-4">
          <small 
            style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}
          >
            No hay más publicaciones que mostrar
          </small>
        </div>
      )}
    </div>
  );
};

export default Posts;