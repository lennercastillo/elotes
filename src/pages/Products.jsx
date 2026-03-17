import React from 'react'
import Header from '../components/Header'
import Catalog from '../components/Catalog'
import PWABanner from '../components/PWABanner'
import Footer from '../components/Footer'

const ProductsPage = ({ menuActivo, toggleMenu, cerrarMenu, carritoCount, agregarAlCarrito }) => {
  return (
    <div className="products-page fade-in">
      <Header 
        menuActivo={menuActivo}
        toggleMenu={toggleMenu}
        cerrarMenu={cerrarMenu}
        carritoCount={carritoCount}
      />
      <main className="main-content flex-grow" style={{ minHeight: '80vh' }}>
        <div style={{ background: 'var(--bg-color)', padding: '2rem 0 0' }}>
          <div className="container">
            <h1 style={{ fontSize: '2.5rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Nuestro Catálogo</h1>
            <p style={{ color: 'var(--text-muted)' }}>Explora todos los productos disponibles en nuestra tienda.</p>
          </div>
        </div>
        <Catalog agregarAlCarrito={agregarAlCarrito} />
      </main>
      <PWABanner />
      <Footer />
    </div>
  )
}

export default ProductsPage
