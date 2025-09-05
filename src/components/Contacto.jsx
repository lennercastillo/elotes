import React, { useEffect, useRef, useState } from 'react'
import whatsappLogo from '/whatsapp-logo.jpg?url'

const Contacto = ({ abrirWhatsApp }) => {
  const contactoRef = useRef(null)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  })

  useEffect(() => {
    const observador = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1'
          entry.target.style.transform = 'translateY(0)'
        }
      })
    }, {
      threshold: 0.1
    })

    if (contactoRef.current) {
      const items = contactoRef.current.querySelectorAll('.contacto-item')
      items.forEach(item => {
        item.style.opacity = '0'
        item.style.transform = 'translateY(30px)'
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
        observador.observe(item)
      })
    }

    return () => {
      if (contactoRef.current) {
        const items = contactoRef.current.querySelectorAll('.contacto-item')
        items.forEach(item => {
          observador.unobserve(item)
        })
      }
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simular envío del formulario
    console.log('Formulario enviado:', formData)
    setFormData({ nombre: '', email: '', mensaje: '' })
    // Aquí podrías mostrar una notificación de éxito
  }

  return (
    <section id="contacto" className="contacto">
      <div className="container">
        <h2>Contacto</h2>
        <div className="contacto-content" ref={contactoRef}>
          <div className="contacto-info">
            <div className="contacto-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h4>Email</h4>
                <p>eloteslocos11mob@gmail.com</p>
              </div>
            </div>
            
            <div className="contacto-item">
              <i className="fas fa-phone"></i>
              <div>
                <h4>Teléfono</h4>
                <p>+505 8492 4965</p>
              </div>
            </div>
            
            <div className="contacto-item whatsapp-contacto" onClick={abrirWhatsApp}>
              <img 
                src={whatsappLogo} 
                alt="WhatsApp" 
                className="contacto-whatsapp-icon"
              />
              <div>
                <h4>WhatsApp</h4>
                <p>Chatea con nosotros</p>
              </div>
            </div>
          </div>
          
          <div className="contacto-form">
            <h3>Envíanos un mensaje</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="nombre"
                placeholder="Tu nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Tu email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="mensaje"
                placeholder="Tu mensaje"
                rows="5"
                value={formData.mensaje}
                onChange={handleInputChange}
                required
              ></textarea>
              <button type="submit" className="btn-enviar">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contacto
