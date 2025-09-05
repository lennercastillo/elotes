import React, { useEffect } from 'react'

const Hero = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const hero = document.querySelector('.hero')
      
      if (hero) {
        const rate = scrolled * -0.5
        hero.style.transform = `translateY(${rate}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToProductos = () => {
    const productosSection = document.querySelector('#productos')
    if (productosSection) {
      const headerHeight = document.querySelector('.header').offsetHeight
      const targetPosition = productosSection.offsetTop - headerHeight
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="inicio" className="hero">
      <div className="hero-content">
        <h1>Elotes Locos</h1>
        <p>Los mejores elotes de Nicaragua, preparados con ingredientes frescos y mucho sabor. ¡Disfruta de una experiencia única!</p>
        <a href="#productos" className="cta-button" onClick={scrollToProductos}>
          Ver Productos
        </a>
      </div>
    </section>
  )
}

export default Hero
