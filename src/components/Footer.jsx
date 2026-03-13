import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Catálogo Virtual. Todos los derechos reservados.</p>
        <p style={{marginTop: '0.5rem', fontSize: '0.8rem'}}>Desarrollado con ❤️ para tu negocio.</p>
      </div>
    </footer>
  )
}

export default Footer
