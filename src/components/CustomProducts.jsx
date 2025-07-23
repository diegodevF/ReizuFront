import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomProducts = () => {
  const [theme, setTheme] = useState('light');
  const [activeCategory, setActiveCategory] = useState('todo');
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

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

  // Categorías de productos
  const categories = [
    { id: 'todo', label: 'Mostrar Todos' },
    { id: 'stickers', label: 'Stickers' },
    { id: 'banners', label: 'Banners' },
    { id: 'perfiles', label: 'Perfiles' },
    { id: 'marcos', label: 'Marcos' }
  ];

  // Datos de productos
  const products = [
    {
      id: 1,
      title: '¡Alto!',
      image: 'https://picsum.photos/300/200?random=31',
      price: 300,
      category: 'stickers',
      type: 'Sticker'
    },
    {
      id: 2,
      title: 'Interesante',
      image: 'https://picsum.photos/300/200?random=32',
      price: 300,
      category: 'stickers',
      type: 'Sticker'
    },
    {
      id: 3,
      title: 'Drangocito azul',
      image: 'https://picsum.photos/300/200?random=33',
      price: 1300,
      category: 'marcos',
      type: 'Marco'
    },
    {
      id: 4,
      title: 'Ezquizofrenia',
      image: 'https://picsum.photos/300/200?random=34',
      price: 1300,
      category: 'banners',
      type: 'Banner'
    },
    {
      id: 5,
      title: 'Ezquizofrenia',
      image: 'https://picsum.photos/300/200?random=35',
      price: 1300,
      category: 'banners',
      type: 'Banner'
    },
    {
      id: 6,
      title: 'Producto 6',
      image: 'https://picsum.photos/300/200?random=36',
      price: 800,
      category: 'perfiles',
      type: 'Perfil'
    },
    {
      id: 7,
      title: 'Producto 7',
      image: 'https://picsum.photos/300/200?random=37',
      price: 450,
      category: 'stickers',
      type: 'Sticker'
    }
  ];

  const checkArrowsVisibility = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    checkArrowsVisibility();
    window.addEventListener('resize', checkArrowsVisibility);
    return () => window.removeEventListener('resize', checkArrowsVisibility);
  }, [activeCategory]);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -280, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 280, behavior: 'smooth' });
  };

  const formatPrice = (price) => {
    return price >= 1000 ? `${(price / 1000).toFixed(1)}K` : price.toString();
  };

  const filteredProducts = activeCategory === 'todo' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const ProductCard = ({ product }) => (
    <div
      className="flex-shrink-0 me-4"
      style={{ width: '250px', minWidth: '250px' }}
    >
      <div 
        className="position-relative" 
        style={{ 
          borderRadius: '12px', 
          overflow: 'hidden',
          boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.4)' : '0 4px 12px rgba(0,0,0,0.15)',
          cursor: 'pointer',
          transition: 'transform 0.3s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        {/* Imagen del producto */}
        <Link 
          to={`/product/${product.id}`} 
          className="d-block"
          style={{ textDecoration: 'none' }}
        >
          <div
            style={{
              width: '100%',
              height: '180px',
              backgroundImage: `url(${product.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative'
            }}
          >
            {/* Badge del tipo */}
            <div
              className="position-absolute top-0 start-0 bg-danger text-white px-2 py-1 fw-bold"
              style={{
                fontSize: '0.7rem',
                borderTopLeftRadius: '12px',
                borderBottomRightRadius: '12px',
                zIndex: 1
              }}
            >
              {product.type}
            </div>

            {/* Precio en esquina superior derecha */}
            <div
              className="position-absolute top-0 end-0 bg-warning text-dark px-2 py-1 d-flex align-items-center fw-bold"
              style={{
                fontSize: '0.8rem',
                borderTopRightRadius: '12px',
                borderBottomLeftRadius: '12px',
                zIndex: 1
              }}
            >
              <i className="bi bi-coin me-1"></i>
              {formatPrice(product.price)}
            </div>

            {/* Botón COMPRAR en el centro */}
            <div 
              className="position-absolute top-50 start-50 translate-middle"
              style={{ zIndex: 1 }}
            >
              <button 
                className="btn btn-danger"
                style={{
                  background: 'linear-gradient(45deg, #d32f2f, #e53935)',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  padding: '8px 20px',
                  borderRadius: '20px',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }}
              >
                COMPRAR
              </button>
            </div>
          </div>
        </Link>
      </div>
      
      {/* Título debajo de la imagen */}
      <div className="mt-3">
        <Link 
          to={`/product/${product.id}`}
          style={{ textDecoration: 'none' }}
        >
          <p 
            className="mb-0 fw-bold text-truncate" 
            style={{ 
              fontSize: '0.9rem',
              color: isDark ? '#ffffff' : '#212529',
              transition: 'color 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.target.style.color = '#d32f2f'}
            onMouseOut={(e) => e.target.style.color = isDark ? '#ffffff' : '#212529'}
          >
            {product.title}
          </p>
        </Link>
      </div>
    </div>
  );

  return (
    <div 
      className="rounded p-4 mt-3"
      style={{
        backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
        borderColor: isDark ? '#333333' : '#dee2e6',
        boxShadow: isDark ? '0 2px 10px rgba(0,0,0,0.3)' : '0 2px 10px rgba(0,0,0,0.1)',
        border: `1px solid ${isDark ? '#333333' : '#dee2e6'}`,
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
    >
      {/* Header */}
      <div className="mb-4">
        <h5 
          className="fw-bold mb-2"
          style={{ 
            color: isDark ? '#ffffff' : '#212529',
            borderBottom: '3px solid #d32f2f',
            paddingBottom: '8px',
            display: 'inline-block'
          }}
        >
          <i className="bi bi-palette-fill me-2 text-danger"></i>
          Artículos Personalizados
        </h5>
        <p 
          className="mb-0 mt-3"
          style={{ 
            color: isDark ? '#b3b3b3' : '#6c757d',
            fontSize: '0.85rem',
            lineHeight: '1.5'
          }}
        >
          Para una comisión personalizada, consultarlo con el autor antes de realizar un pedido.
        </p>
      </div>

      {/* Navegación por categorías */}
      <div className="mb-4">
        <div className="d-flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`btn ${activeCategory === category.id ? 'btn-danger' : 'btn-outline-secondary'}`}
              onClick={() => setActiveCategory(category.id)}
              style={{
                fontSize: '0.8rem',
                padding: '5px 12px',
                border: activeCategory === category.id 
                  ? '2px solid #d32f2f' 
                  : `2px solid ${isDark ? '#555555' : '#6c757d'}`,
                backgroundColor: activeCategory === category.id 
                  ? '#d32f2f' 
                  : 'transparent',
                color: activeCategory === category.id 
                  ? '#ffffff' 
                  : isDark ? '#cccccc' : '#6c757d',
                transition: 'all 0.3s ease'
              }}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Carrusel de productos */}
      <div className="position-relative">
        {/* Flecha izquierda */}
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="position-absolute start-0 top-50 translate-middle-y btn btn-danger rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: '45px',
              height: '45px',
              zIndex: 2,
              left: '-22px',
              border: 'none',
              boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.2)',
              background: 'linear-gradient(45deg, #d32f2f, #e53935)'
            }}
          >
            <i className="bi bi-chevron-left text-white fw-bold"></i>
          </button>
        )}
        
        {/* Flecha derecha */}
        {showRightArrow && (
          <button
            onClick={scrollRight}
            className="position-absolute end-0 top-50 translate-middle-y btn btn-danger rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: '45px',
              height: '45px',
              zIndex: 2,
              right: '-22px',
              border: 'none',
              boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.2)',
              background: 'linear-gradient(45deg, #d32f2f, #e53935)'
            }}
          >
            <i className="bi bi-chevron-right text-white fw-bold"></i>
          </button>
        )}
        
        {/* Contenedor del carrusel */}
        <div
          ref={scrollContainerRef}
          className="d-flex overflow-auto pb-3"
          onScroll={checkArrowsVisibility}
          style={{
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            justifyContent: 'flex-start',
            padding: '0 20px'
          }}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Footer informativo */}
      <div className="text-center mt-3">
        <small 
          style={{ color: isDark ? '#8a8a8a' : '#6c757d' }}
        >
          <i className="bi bi-arrow-left-right me-1"></i>
          {filteredProducts.length} productos en {
            categories.find(cat => cat.id === activeCategory)?.label.toLowerCase()
          }
        </small>
      </div>

      {/* CSS para el efecto hover del botón COMPRAR */}
      <style jsx>{`
        .flex-shrink-0:hover .comprar-btn {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default CustomProducts;
