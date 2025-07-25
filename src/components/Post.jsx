import React, { useState, useEffect, useCallback, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Posts = ({ authorId, onLoadMore }) => {
  const [theme, setTheme] = useState('light');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [newPost, setNewPost] = useState({ content: '', images: [] });
  const [showCreatePost, setShowCreatePost] = useState(false);
  
  // Estados para comentarios
  const [comments, setComments] = useState({});
  const [showComments, setShowComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [commentImages, setCommentImages] = useState({});

  // Referencias para inputs de archivos
  const imageInputRef = useRef(null);
  const commentImageInputRefs = useRef({});

  // Stickers desde carpeta local
  const localStickers = [
    { id: 1, name: 'Smile', path: '/stickers/smile.png' },
    { id: 2, name: 'Laugh', path: '/stickers/laugh.png' },
    { id: 3, name: 'Love', path: '/stickers/love.png' },
    { id: 4, name: 'Angry', path: '/stickers/angry.png' },
    { id: 5, name: 'Cry', path: '/stickers/cry.png' },
    { id: 6, name: 'Star', path: '/stickers/star.png' },
    { id: 7, name: 'Fire', path: '/stickers/fire.png' },
    { id: 8, name: 'Heart', path: '/stickers/heart.png' },
    { id: 9, name: 'Thumbs Up', path: '/stickers/thumbs-up.png' },
    { id: 10, name: 'Party', path: '/stickers/party.png' },
    { id: 11, name: 'Cool', path: '/stickers/cool.png' },
    { id: 12, name: 'Wink', path: '/stickers/wink.png' }
  ];

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
      const postId = Date.now() + i;
      mockPosts.push({
        id: postId,
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
      
      // Generar comentarios de ejemplo para cada post
      const mockComments = [];
      const commentCount = Math.floor(Math.random() * 5) + 1;
      for (let j = 0; j < commentCount; j++) {
        const commentType = Math.random();
        mockComments.push({
          id: Date.now() + j + (i * 100),
          authorName: `Usuario ${j + 1}`,
          authorAvatar: '/path/to/avatar.jpg',
          content: commentType > 0.7 ? '' : `Este es un comentario de ejemplo ${j + 1}`,
          type: commentType > 0.8 ? 'sticker' : commentType > 0.6 ? 'image' : 'text',
          sticker: commentType > 0.8 ? localStickers[Math.floor(Math.random() * localStickers.length)] : null,
          image: commentType > 0.6 && commentType <= 0.8 ? '/path/to/comment-image.jpg' : null,
          likes: Math.floor(Math.random() * 50),
          date: new Date(Date.now() - Math.random() * 86400000).toISOString(),
          isLiked: Math.random() > 0.5
        });
      }
      setComments(prev => ({ ...prev, [postId]: mockComments }));
    }
    return mockPosts;
  }, [posts.length, localStickers]);

  // Cargar publicaciones iniciales
  useEffect(() => {
    const initialPosts = generateMockPosts(3);
    setPosts(initialPosts);
  }, []);

  // Función para cargar más publicaciones
  const loadMorePosts = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    setTimeout(() => {
      const newPosts = generateMockPosts(3);
      setPosts(prev => [...prev, ...newPosts]);
      setLoading(false);
      
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
    setComments(prev => ({ ...prev, [post.id]: [] }));
    setNewPost({ content: '', images: [] });
    setShowCreatePost(false);
  };

  // Manejar like de post
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

  // Manejar like de comentario
  const handleCommentLike = (postId, commentId) => {
    setComments(prev => ({
      ...prev,
      [postId]: prev[postId].map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
            }
          : comment
      )
    }));
  };

  // Mostrar/ocultar comentarios
  const toggleComments = (postId) => {
    setShowComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  // Manejar selección de imagen para comentario
  const handleCommentImageSelect = (postId, event) => {
    const file = event.target.files[0];
    if (file) {
      // Validar tipo de archivo
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        alert('Por favor selecciona un archivo de imagen válido (JPG, PNG, GIF)');
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen es demasiado grande. Máximo 5MB permitido.');
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setCommentImages(prev => ({ ...prev, [postId]: { file, url: imageUrl } }));
    }
  };

  // Agregar comentario
  const handleAddComment = (postId, type = 'text', content = '', sticker = null, image = null) => {
    if (type === 'text' && !content.trim()) return;
    if (type === 'sticker' && !sticker) return;
    if (type === 'image' && !image) return;

    const comment = {
      id: Date.now(),
      authorName: 'Tú',
      authorAvatar: '/path/to/your-avatar.jpg',
      content: content,
      type: type,
      sticker: sticker,
      image: image,
      likes: 0,
      date: new Date().toISOString(),
      isLiked: false
    };

    setComments(prev => ({
      ...prev,
      [postId]: [comment, ...(prev[postId] || [])]
    }));

    // Incrementar contador de comentarios en el post
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, comments: post.comments + 1 }
        : post
    ));

    // Limpiar formulario
    setNewComment(prev => ({ ...prev, [postId]: '' }));
    setCommentImages(prev => ({ ...prev, [postId]: null }));
  };

  // Agregar sticker
  const handleAddSticker = (postId, sticker) => {
    handleAddComment(postId, 'sticker', '', sticker, null);
  };

  // Agregar imagen desde comentario
  const handleAddCommentImage = (postId) => {
    const imageData = commentImages[postId];
    if (imageData) {
      handleAddComment(postId, 'image', 'Imagen compartida', null, imageData.url);
    }
  };

  // Abrir selector de imagen para comentario
  const openCommentImageSelector = (postId) => {
    if (!commentImageInputRefs.current[postId]) {
      // Crear input dinámicamente si no existe
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => handleCommentImageSelect(postId, e);
      commentImageInputRefs.current[postId] = input;
    }
    commentImageInputRefs.current[postId].click();
  };

  // Remover imagen seleccionada del comentario
  const removeCommentImage = (postId) => {
    setCommentImages(prev => ({ ...prev, [postId]: null }));
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
            <div className="d-flex align-items-center justify-content-between mb-3">
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
                  onClick={() => toggleComments(post.id)}
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

            {/* Sección de comentarios */}
            {showComments[post.id] && (
              <div 
                className="mt-3 pt-3"
                style={{
                  borderTop: `1px solid ${isDark ? '#333333' : '#e9ecef'}`
                }}
              >
                {/* Formulario para nuevo comentario */}
                <div className="mb-3">
                  <div className="d-flex align-items-start mb-2">
                    <div
                      className="rounded-circle me-2 flex-shrink-0"
                      style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: isDark ? '#2a2a2a' : '#f8f9fa',
                        border: '2px solid #d32f2f'
                      }}
                    ></div>
                    
                    <div className="flex-grow-1">
                      <textarea
                        className="form-control form-control-sm mb-2"
                        rows="2"
                        placeholder="Escribe un comentario..."
                        value={newComment[post.id] || ''}
                        onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                        style={{
                          backgroundColor: isDark ? '#2a2a2a' : '#f8f9fa',
                          borderColor: isDark ? '#444444' : '#e9ecef',
                          color: isDark ? '#ffffff' : '#212529',
                          fontSize: '0.9rem'
                        }}
                      />

                      {/* Vista previa de imagen seleccionada */}
                      {commentImages[post.id] && (
                        <div className="mb-2 position-relative d-inline-block">
                          <img
                            src={commentImages[post.id].url}
                            alt="Vista previa"
                            style={{
                              maxWidth: '150px',
                              maxHeight: '150px',
                              borderRadius: '8px',
                              border: `1px solid ${isDark ? '#444444' : '#e9ecef'}`
                            }}
                          />
                          <button
                            className="btn btn-danger btn-sm position-absolute top-0 end-0"
                            style={{ 
                              width: '24px', 
                              height: '24px',
                              padding: '0',
                              fontSize: '0.7rem',
                              transform: 'translate(50%, -50%)'
                            }}
                            onClick={() => removeCommentImage(post.id)}
                          >
                            ×
                          </button>
                        </div>
                      )}
                      
                      {/* Botones de acción para comentarios */}
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          {/* Botón de imagen */}
                          <button
                            className="btn btn-link p-1 me-2"
                            onClick={() => openCommentImageSelector(post.id)}
                            style={{ 
                              color: isDark ? '#8a8a8a' : '#6c757d',
                              fontSize: '0.9rem'
                            }}
                            title="Agregar imagen"
                          >
                            <i className="bi bi-image"></i>
                          </button>
                          
                          {/* Selector de stickers locales */}
                          <div className="dropdown me-2">
                            <button
                              className="btn btn-link p-1 dropdown-toggle"
                              data-bs-toggle="dropdown"
                              style={{ 
                                color: isDark ? '#8a8a8a' : '#6c757d',
                                fontSize: '0.9rem'
                              }}
                              title="Agregar sticker"
                            >
                              <i className="bi bi-emoji-smile"></i>
                            </button>
                            <div 
                              className="dropdown-menu p-2"
                              style={{
                                backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
                                border: `1px solid ${isDark ? '#444444' : '#e9ecef'}`,
                                minWidth: '280px',
                                maxHeight: '300px',
                                overflowY: 'auto'
                              }}
                            >
                              <div className="row g-1">
                                {localStickers.map((sticker) => (
                                  <div key={sticker.id} className="col-3">
                                    <button
                                      className="btn btn-link p-1 w-100"
                                      onClick={() => handleAddSticker(post.id, sticker)}
                                      style={{ 
                                        border: `1px solid ${isDark ? '#444444' : '#e9ecef'}`,
                                        borderRadius: '4px',
                                        height: '50px'
                                      }}
                                      title={sticker.name}
                                    >
                                      <img
                                        src={sticker.path}
                                        alt={sticker.name}
                                        style={{
                                          width: '32px',
                                          height: '32px',
                                          objectFit: 'contain'
                                        }}
                                        onError={(e) => {
                                          // Fallback si la imagen no carga
                                          e.target.style.display = 'none';
                                          e.target.nextSibling.style.display = 'block';
                                        }}
                                      />
                                      <span 
                                        style={{ 
                                          display: 'none',
                                          fontSize: '0.7rem',
                                          color: isDark ? '#8a8a8a' : '#6c757d'
                                        }}
                                      >
                                        {sticker.name}
                                      </span>
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          {commentImages[post.id] && (
                            <button
                              className="btn btn-success btn-sm me-2"
                              onClick={() => handleAddCommentImage(post.id)}
                              style={{ fontSize: '0.8rem' }}
                            >
                              Enviar Imagen
                            </button>
                          )}
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleAddComment(post.id, 'text', newComment[post.id])}
                            disabled={!newComment[post.id]?.trim() && !commentImages[post.id]}
                            style={{ fontSize: '0.8rem' }}
                          >
                            Comentar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lista de comentarios */}
                <div className="comments-list">
                  {(comments[post.id] || []).map((comment) => (
                    <div key={comment.id} className="d-flex align-items-start mb-3">
                      <div
                        className="rounded-circle me-2 flex-shrink-0"
                        style={{
                          width: '32px',
                          height: '32px',
                          backgroundColor: isDark ? '#2a2a2a' : '#f8f9fa',
                          border: '1px solid #d32f2f',
                          backgroundImage: comment.authorAvatar ? `url(${comment.authorAvatar})` : 'none',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      ></div>
                      
                      <div className="flex-grow-1">
                        <div 
                          className="rounded p-2 mb-1"
                          style={{
                            backgroundColor: isDark ? '#2a2a2a' : '#f8f9fa',
                            border: `1px solid ${isDark ? '#444444' : '#e9ecef'}`
                          }}
                        >
                          <h6 
                            className="fw-bold mb-1"
                            style={{ 
                              color: isDark ? '#ffffff' : '#212529',
                              fontSize: '0.8rem'
                            }}
                          >
                            {comment.authorName}
                          </h6>
                          
                          {/* Contenido del comentario según tipo */}
                          {comment.type === 'text' && (
                            <p 
                              className="mb-0"
                              style={{ 
                                color: isDark ? '#cccccc' : '#495057',
                                fontSize: '0.9rem'
                              }}
                            >
                              {comment.content}
                            </p>
                          )}
                          
                          {comment.type === 'sticker' && (
                            <div className="mt-1">
                              <img
                                src={comment.sticker.path}
                                alt={comment.sticker.name}
                                style={{
                                  width: '48px',
                                  height: '48px',
                                  objectFit: 'contain'
                                }}
                                onError={(e) => {
                                  e.target.alt = comment.sticker.name;
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'inline';
                                }}
                              />
                              <span 
                                style={{ 
                                  display: 'none',
                                  fontSize: '1.5rem',
                                  color: isDark ? '#cccccc' : '#495057'
                                }}
                              >
                                [{comment.sticker.name}]
                              </span>
                            </div>
                          )}
                          
                          {comment.type === 'image' && (
                            <div className="mt-1">
                              <img
                                src={comment.image}
                                alt="Imagen de comentario"
                                className="rounded"
                                style={{
                                  maxWidth: '200px',
                                  maxHeight: '200px',
                                  objectFit: 'cover',
                                  border: `1px solid ${isDark ? '#555555' : '#ced4da'}`
                                }}
                              />
                            </div>
                          )}
                        </div>
                        
                        {/* Acciones del comentario */}
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-link p-0 me-3"
                            onClick={() => handleCommentLike(post.id, comment.id)}
                            style={{
                              color: comment.isLiked ? '#d32f2f' : (isDark ? '#8a8a8a' : '#6c757d'),
                              textDecoration: 'none',
                              fontSize: '0.75rem'
                            }}
                          >
                            <i className={`bi ${comment.isLiked ? 'bi-heart-fill' : 'bi-heart'} me-1`}></i>
                            {comment.likes}
                          </button>
                          
                          <small 
                            style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}
                          >
                            {new Date(comment.date).toLocaleDateString()}
                          </small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
