import React, { useEffect, useRef } from 'react'

const Objetivo = () => {
  const objetivoRef = useRef(null)

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

    if (objetivoRef.current) {
      objetivoRef.current.style.opacity = '0'
      objetivoRef.current.style.transform = 'translateY(30px)'
      objetivoRef.current.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      observador.observe(objetivoRef.current)
    }

    return () => {
      if (objetivoRef.current) {
        observador.unobserve(objetivoRef.current)
      }
    }
  }, [])

  return (
    <section id="objetivo" className="objetivo">
      <div className="container">
        <h2>Nuestro Objetivo</h2>
        <div className="objetivo-content" ref={objetivoRef}>
          <div className="objetivo-text">
            <p>
              En Elotes Locos, nuestro objetivo es brindar a nuestros clientes una experiencia gastronómica única y deliciosa, 
              ofreciendo los mejores elotes preparados con ingredientes frescos y de la más alta calidad.
            </p>
            <p>
              Nos comprometemos a mantener los más altos estándares de higiene y sabor, asegurando que cada bocado sea una 
              explosión de sabores auténticos que representen la tradición culinaria nicaragüense.
            </p>
            <ul>
              <li>✅ Ingredientes frescos y de calidad</li>
              <li>✅ Preparación artesanal tradicional</li>
              <li>✅ Servicio rápido y eficiente</li>
              <li>✅ Precios accesibles para todos</li>
              <li>✅ Satisfacción garantizada</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Objetivo
