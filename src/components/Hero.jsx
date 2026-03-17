import React from 'react';
import { Link } from 'react-router-dom';
import heroPos from './images/publicacion1HD_pv4652.webp';

const Hero = () => {
  return (
    <section className="hero-section" id="inicio">
      <div className="container hero-grid">
        
        {/* Main Left Card */}
        <div className="hero-card hero-card-main">
          <div className="hero-card-content">
            <div className="badge-group">
              <span className="badge badge-white">TENDENCIA</span>
              <span className="badge-text">Descubre nuestro catálogo de productos</span>
              <span className="badge-arrow">›</span>
            </div>
            
            <h1 className="hero-title">
              Todo lo que<br />
              necesitas en<br />
              un solo lugar
            </h1>
            
            <p className="hero-subtitle">
              Explora nuestra amplia variedad de productos. Calidad garantizada y los mejores precios del mercado para ti.
            </p>
            
            <div className="hero-price-action">
              <div className="price-label">
                <span className="price-from">Compra de forma</span>
                <span className="price-amount">Segura</span>
              </div>
              <Link to="/productos" className="btn-hero-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>VER CATÁLOGO</Link>
            </div>
          </div>
          <div className="hero-image-wrapper-main">
            <img src={heroPos} alt="Sistema de Punto de Venta" className="hero-image-main" />
          </div>
        </div>

        {/* Top Right Card */}
        <div className="hero-card hero-card-top-right">
          <div className="hero-card-content-sm">
            <h2 className="hero-title-sm">
              Variedad<br />
              Increíble
            </h2>
            <p className="hero-subtitle-sm">
              Nuevos ingresos •<br />
              Ofertas • Destacados
            </p>
            <div className="arrow-icon-sm">→</div>
          </div>
          <div className="hero-image-placeholder-sm" style={{ alignSelf: 'center', marginRight: '2rem', fontSize: '4rem' }}>⭐</div>
        </div>

        {/* Bottom Right Card */}
        <div className="hero-card hero-card-bottom-right">
          <div className="hero-card-content-sm">
            <h2 className="hero-title-sm">
              Envíos<br />
              Rápidos
            </h2>
            <p className="hero-subtitle-sm">
              Pide por WhatsApp y<br />
              recibe en tu puerta
            </p>
            <div className="arrow-icon-sm">→</div>
          </div>
          <div className="hero-image-placeholder-sm" style={{ alignSelf: 'center', marginRight: '2rem', fontSize: '4rem' }}>🚚</div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
