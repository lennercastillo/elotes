import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import PWABanner from '../components/PWABanner'
import Footer from '../components/Footer'

const HomePage = ({ menuActivo, toggleMenu, cerrarMenu, carritoCount }) => {
  return (
    <div className="home-page fade-in">
      <Header 
        menuActivo={menuActivo}
        toggleMenu={toggleMenu}
        cerrarMenu={cerrarMenu}
        carritoCount={carritoCount}
      />
      <main className="main-content flex-grow">
        <Hero />
        {/* We can add a featured items section or info here later if desired */}
        <section className="info-section container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>¿Por qué comprar con nosotros?</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Ofrecemos la mejor selección de productos con garantía de calidad y satisfacción. Nuestra plataforma te permite ver todo el catálogo, agregar lo que te guste al carrito y hacer pedidos de forma fácil y segura por WhatsApp.
          </p>
        </section>
      </main>
      <PWABanner />
      <Footer />
    </div>
  )
}

export default HomePage
