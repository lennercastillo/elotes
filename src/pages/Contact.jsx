import React from 'react'
import Header from '../components/Header'
import PWABanner from '../components/PWABanner'
import Footer from '../components/Footer'
import { MapPin, Phone, MessageCircle, Clock, Instagram, Facebook } from 'lucide-react'

const ContactPage = ({ menuActivo, toggleMenu, cerrarMenu, carritoCount }) => {
  const telefono = import.meta.env.VITE_WHATSAPP_NUMBER || ''
  
  const handleWhatsApp = () => {
    const mensaje = '¡Hola! Me gustaría hacerles una consulta.'
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank')
  }

  return (
    <div className="contact-page fade-in" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header 
        menuActivo={menuActivo}
        toggleMenu={toggleMenu}
        cerrarMenu={cerrarMenu}
        carritoCount={carritoCount}
      />
      
      <main className="main-content flex-grow" style={{ padding: '6rem 1.5rem 4rem', background: 'var(--bg-color)' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Contáctanos</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>¿Tienes alguna duda o quieres cotizar un evento especial? ¡Estamos listos para atenderte!</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            {/* Información de Contacto */}
            <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1.5rem' }}>Información</h2>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                <MapPin size={24} color="#facc15" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 'bold', margin: '0 0 0.25rem' }}>Ubicación</h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>Blvd. Principal #123, Colonia Centro<br/>Ciudad, Estado</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                <Phone size={24} color="#facc15" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 'bold', margin: '0 0 0.25rem' }}>Teléfono / WhatsApp</h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>+52 {telefono || '123 456 7890'}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                <Clock size={24} color="#facc15" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 'bold', margin: '0 0 0.25rem' }}>Horario</h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>Miércoles a Domingo<br/>5:00 PM - 11:00 PM</p>
                </div>
              </div>
            </div>

            {/* Acción Rápida */}
            <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Hablemos ahora</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>La forma más rápida de comunicarte con nosotros es enviándonos un mensaje directo por WhatsApp.</p>
              
              <button 
                onClick={handleWhatsApp}
                style={{ 
                  background: '#25D366', 
                  color: 'white', 
                  border: 'none', 
                  padding: '0.8rem 1.5rem', 
                  borderRadius: '2rem', 
                  fontSize: '1rem', 
                  fontWeight: 'bold', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <MessageCircle size={20} />
                Enviar WhatsApp
              </button>

              <div style={{ marginTop: '3rem', width: '100%' }}>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>Síguenos en nuestras redes</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                  <a href="#" style={{ color: 'var(--text-main)', padding: '0.5rem', background: '#f8fafc', borderRadius: '50%' }}><Instagram size={20} /></a>
                  <a href="#" style={{ color: 'var(--text-main)', padding: '0.5rem', background: '#f8fafc', borderRadius: '50%' }}><Facebook size={20} /></a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      
      <PWABanner />
      <Footer />
    </div>
  )
}

export default ContactPage
