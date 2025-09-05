import React, { useEffect, useState } from 'react'
import whatsappLogo from './logo/whatsapp-logo.jpg'

const Header = ({ menuActivo, toggleMenu, cerrarMenu }) => {
  const [enlaceActivo, setEnlaceActivo] = useState('')

  useEffect(() => {
    const marcarEnlaceActivo = () => {
      const secciones = document.querySelectorAll('section[id]')
      let seccionActual = ''
      
      secciones.forEach(seccion => {
        const rect = seccion.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          seccionActual = seccion.getAttribute('id')
        }
      })
      
      setEnlaceActivo(seccionActual)
    }

    window.addEventListener('scroll', marcarEnlaceActivo)
    return () => window.removeEventListener('scroll', marcarEnlaceActivo)
  }, [])

  const configurarNavegacion = (e) => {
    e.preventDefault()
    const targetId = e.target.getAttribute('href')
    const targetSection = document.querySelector(targetId)
    
    if (targetSection) {
      const headerHeight = document.querySelector('.header').offsetHeight
      const targetPosition = targetSection.offsetTop - headerHeight
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
    cerrarMenu()
  }

  const configurarMenuTouch = (handler) => (e) => {
    e.preventDefault()
    e.stopPropagation()
    handler()
  }

  return (
    <>
      <header className="header">
        <nav className="nav">
          <div className="nav-brand">
            <div className="logo-container">
              <img 
                src={whatsappLogo} 
                alt="Logo WhatsApp" 
                className="logo"
              />
              <h1>Elotes Locos</h1>
            </div>
          </div>
          
          <ul className={`nav-menu ${menuActivo ? 'active' : ''}`} id="navMenu">
            <li>
              <a 
                href="#inicio" 
                className={enlaceActivo === 'inicio' ? 'active' : ''}
                onClick={configurarNavegacion}
                onTouchStart={configurarMenuTouch(cerrarMenu)}
              >
                Inicio
              </a>
            </li>
            <li>
              <a 
                href="#objetivo" 
                className={enlaceActivo === 'objetivo' ? 'active' : ''}
                onClick={configurarNavegacion}
                onTouchStart={configurarMenuTouch(cerrarMenu)}
              >
                Objetivo
              </a>
            </li>
            <li>
              <a 
                href="#productos" 
                className={enlaceActivo === 'productos' ? 'active' : ''}
                onClick={configurarNavegacion}
                onTouchStart={configurarMenuTouch(cerrarMenu)}
              >
                Productos
              </a>
            </li>
            <li>
              <a 
                href="#contacto" 
                className={enlaceActivo === 'contacto' ? 'active' : ''}
                onClick={configurarNavegacion}
                onTouchStart={configurarMenuTouch(cerrarMenu)}
              >
                Contacto
              </a>
            </li>
          </ul>
          
          <div 
            className={`hamburger ${menuActivo ? 'active' : ''}`}
            onClick={toggleMenu}
            onTouchStart={configurarMenuTouch(toggleMenu)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </header>
      
      <div 
        className={`nav-overlay ${menuActivo ? 'active' : ''}`}
        onClick={cerrarMenu}
        onTouchStart={configurarMenuTouch(cerrarMenu)}
      ></div>
    </>
  )
}

export default Header
