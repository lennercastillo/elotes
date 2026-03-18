import React from 'react'
import Header from '../components/Header'
import PWABanner from '../components/PWABanner'
import Footer from '../components/Footer'

const AboutPage = ({ menuActivo, toggleMenu, cerrarMenu, carritoCount }) => {
  return (
    <div className="about-page fade-in" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header 
        menuActivo={menuActivo}
        toggleMenu={toggleMenu}
        cerrarMenu={cerrarMenu}
        carritoCount={carritoCount}
      />
      
      <main className="main-content flex-grow" style={{ padding: '6rem 1.5rem 4rem', background: 'var(--bg-color)' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--text-main)', marginBottom: '1.5rem' }}>Sobre Nosotros</h1>
          
          <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', textAlign: 'left' }}>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
              Bienvenidos a nuestra <strong>Tienda en Línea</strong>, tu lugar de confianza para encontrar los mejores productos y ofertas desde la comodidad de tu hogar.
            </p>
            
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginTop: '2rem', marginBottom: '1rem' }}>Nuestra Misión</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              Brindar a nuestros clientes una experiencia de compra fácil, rápida y segura, ofreciendo productos de alta calidad y un servicio de atención excepcional. ¡Queremos facilitar tu vida brindándote exactamente lo que necesitas!
            </p>

            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginTop: '2rem', marginBottom: '1rem' }}>¿Por qué elegirnos?</h2>
            <ul style={{ color: 'var(--text-muted)', lineHeight: '1.8', paddingLeft: '1.2rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>🌟 Gran variedad de productos seleccionados cuidadosamente para ti.</li>
              <li style={{ marginBottom: '0.5rem' }}>🔒 Compras y pedidos 100% seguros y transparentes.</li>
              <li style={{ marginBottom: '0.5rem' }}>🚀 Envío rápido directo a tu ubicación o punto de entrega.</li>
              <li style={{ marginBottom: '0.5rem' }}>💬 Atención al cliente personalizada por WhatsApp.</li>
            </ul>
          </div>
        </div>
      </main>
      
      <PWABanner />
      <Footer />
    </div>
  )
}

export default AboutPage
