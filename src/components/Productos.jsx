import React, { useEffect, useRef } from 'react'
import enteroImg from '/entero.png'
import desgranadoImg from '/desgranado.jpg'
import mixtoImg from '/mixto.jpg'

const Productos = ({ agregarAlCarrito }) => {
  const productosRef = useRef(null)

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

    if (productosRef.current) {
      const cards = productosRef.current.querySelectorAll('.producto-card')
      cards.forEach(card => {
        card.style.opacity = '0'
        card.style.transform = 'translateY(30px)'
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
        observador.observe(card)
      })
    }

    return () => {
      if (productosRef.current) {
        const cards = productosRef.current.querySelectorAll('.producto-card')
        cards.forEach(card => {
          observador.unobserve(card)
        })
      }
    }
  }, [])

  const productos = [
    {
      id: 1,
      nombre: 'Elote Entero',
      precio: 50,
      imagen: enteroImg,
      descripcion: 'Elote completo con mayonesa, queso, chile y limón. Una delicia tradicional que no puedes dejar de probar.'
    },
    {
      id: 2,
      nombre: 'Elote Desgranado',
      precio: 55,
      imagen: desgranadoImg,
      descripcion: 'Granos de elote desgranados con todos los condimentos. Perfecto para disfrutar con cuchara.'
    },
    {
      id: 3,
      nombre: 'Elote Mixto',
      precio: 45,
      imagen: mixtoImg,
      descripcion: 'Combinación especial de elote con ingredientes únicos. Una mezcla de sabores que te sorprenderá.'
    }
  ]

  return (
    <section id="productos" className="productos">
      <div className="container">
        <h2>Nuestros Productos</h2>
        <div className="productos-grid" ref={productosRef}>
          {productos.map(producto => (
            <div key={producto.id} className="producto-card">
              <div className="producto-imagen">
                <img src={producto.imagen} alt={producto.nombre} />
              </div>
              <div className="producto-info">
                <h3>{producto.nombre}</h3>
                <p className="descripcion">{producto.descripcion}</p>
                <div className="precio">C$ {producto.precio}</div>
                <button 
                  className="btn-comprar"
                  onClick={() => agregarAlCarrito(producto.nombre, producto.precio)}
                >
                  Agregar al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Productos
