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
              Bienvenidos a <strong>Elotes Locos</strong>, tu lugar favorito para disfrutar de los mejores antojitos y productos preparados con los ingredientes de más alta calidad.
            </p>
            
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginTop: '2rem', marginBottom: '1rem' }}>Nuestra Misión</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              Brindar a nuestros clientes una experiencia de sabor inolvidable en cada bocado, manteniendo la tradición de nuestras recetas mientras innovamos para sorprenderte todos los días. ¡Queremos ser los elegidos en tus momentos de antojo!
            </p>

            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginTop: '2rem', marginBottom: '1rem' }}>¿Por qué elegirnos?</h2>
            <ul style={{ color: 'var(--text-muted)', lineHeight: '1.8', paddingLeft: '1.2rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>🌽 Ingredientes frescos y seleccionados diariamente.</li>
              <li style={{ marginBottom: '0.5rem' }}>✨ Higiene y preparación con los más altos estándares.</li>
              <li style={{ marginBottom: '0.5rem' }}>🚚 Servicio rápido para que no esperes por tu antojo.</li>
              <li style={{ marginBottom: '0.5rem' }}>❤️ Hecho con mucho amor y dedicación.</li>
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
