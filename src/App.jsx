import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Catalog from './components/Catalog'
import Footer from './components/Footer'
import Carrito from './components/Carrito'
import FloatingButtons from './components/FloatingButtons'
import PWABanner from './components/PWABanner'
import Notification from './components/Notification'

function App() {
  const [carrito, setCarrito] = useState([])
  const [total, setTotal] = useState(0)
  const [showCarrito, setShowCarrito] = useState(false)
  const [notificacion, setNotificacion] = useState(null)
  const [menuActivo, setMenuActivo] = useState(false)

  useEffect(() => {
    cargarCarrito()
    configurarPWA()
    registrarServiceWorker()
    mostrarNotificacion('¡Bienvenido al Catálogo!', 'success')
  }, [])

  const cargarCarrito = () => {
    const carritoGuardado = localStorage.getItem('catalogoCarrito')
    if (carritoGuardado) {
      const carritoData = JSON.parse(carritoGuardado)
      setCarrito(carritoData)
      actualizarTotal(carritoData)
    }
  }

  const actualizarTotal = (carritoData) => {
    const nuevoTotal = carritoData.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
    setTotal(nuevoTotal)
  }

  const guardarCarrito = (nuevoCarrito) => {
    localStorage.setItem('catalogoCarrito', JSON.stringify(nuevoCarrito))
  }

  const agregarAlCarrito = (nombre, precio) => {
    const productoExistente = carrito.find(item => item.nombre === nombre)
    let nuevoCarrito

    if (productoExistente) {
      nuevoCarrito = carrito.map(item =>
        item.nombre === nombre
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    } else {
      nuevoCarrito = [...carrito, { nombre, precio, cantidad: 1 }]
    }

    setCarrito(nuevoCarrito)
    actualizarTotal(nuevoCarrito)
    guardarCarrito(nuevoCarrito)
    mostrarNotificacion(`¡Producto agregado al carrito!`, 'success')
  }

  const cambiarCantidad = (index, cambio) => {
    const nuevoCarrito = [...carrito]
    const item = nuevoCarrito[index]
    const nuevaCantidad = item.cantidad + cambio

    if (nuevaCantidad <= 0) {
      eliminarItem(index)
    } else {
      item.cantidad = nuevaCantidad
      setCarrito(nuevoCarrito)
      actualizarTotal(nuevoCarrito)
      guardarCarrito(nuevoCarrito)
    }
  }

  const eliminarItem = (index) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index)
    setCarrito(nuevoCarrito)
    actualizarTotal(nuevoCarrito)
    guardarCarrito(nuevoCarrito)
    mostrarNotificacion(`¡Producto eliminado del carrito!`, 'info')
  }

  const vaciarCarrito = () => {
    setCarrito([])
    setTotal(0)
    guardarCarrito([])
    mostrarNotificacion('¡Carrito vaciado!', 'info')
    setShowCarrito(false)
  }

  const abrirCarrito = () => {
    if (carrito.length === 0) {
      mostrarNotificacion('Tu carrito está vacío. ¡Agrega algunos productos!', 'info')
      return
    }
    setShowCarrito(true)
  }

  const cerrarCarrito = () => {
    setShowCarrito(false)
  }

  const finalizarCompra = () => {
    if (carrito.length === 0) {
      mostrarNotificacion('Tu carrito está vacío.', 'warning')
      return
    }
    cerrarCarrito()
    enviarPedidoWhatsApp()
  }

  const generarMensajePedido = () => {
    const fecha = new Date().toLocaleDateString('es-ES', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })

    let mensaje = `📦 *NUEVO PEDIDO* 📦\n`
    mensaje += `📅 Fecha: ${fecha}\n`
    mensaje += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`

    carrito.forEach((item) => {
      const subtotal = item.precio * item.cantidad
      mensaje += `🔹 *${item.nombre}*\n`
      mensaje += `   • Cantidad: ${item.cantidad}\n`
      mensaje += `   • Precio unitario: $${item.precio}\n`
      mensaje += `   • Subtotal: $${subtotal}\n\n`
    })

    mensaje += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
    mensaje += `💰 *TOTAL DEL PEDIDO: $${total}*\n\n`
    mensaje += `📋 *Por favor confirma este pedido*`
    return mensaje
  }

  const enviarPedidoWhatsApp = () => {
    if (carrito.length === 0) return
    
    const mensaje = generarMensajePedido()
    // Placeholder WhatsApp number, user will configure it 
    const telefono = import.meta.env.VITE_WHATSAPP_NUMBER || '' 
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`

    mostrarNotificacion('Redirigiendo a WhatsApp...', 'success')

    setTimeout(() => {
      window.open(url, '_blank')
      vaciarCarrito()
    }, 1500)
  }

  const abrirWhatsApp = () => {
    const telefono = import.meta.env.VITE_WHATSAPP_NUMBER || ''
    const mensaje = '¡Hola! Requiero información.'
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank')
  }

  const mostrarNotificacion = (mensaje, tipo) => {
    setNotificacion({ mensaje, tipo })
    setTimeout(() => setNotificacion(null), 3000)
  }

  const toggleMenu = () => setMenuActivo(!menuActivo)
  const cerrarMenu = () => setMenuActivo(false)

  const configurarPWA = () => {}
  const registrarServiceWorker = () => {}

  return (
    <div className="App">
      <Header 
        menuActivo={menuActivo}
        toggleMenu={toggleMenu}
        cerrarMenu={cerrarMenu}
      />
      <main className="main-content flex-grow">
        <Catalog agregarAlCarrito={agregarAlCarrito} />
      </main>
      <Footer />
      <FloatingButtons 
        abrirCarrito={abrirCarrito}
        abrirWhatsApp={abrirWhatsApp}
        carritoCount={carrito.reduce((sum, item) => sum + item.cantidad, 0)}
      />
      <Carrito 
        show={showCarrito}
        carrito={carrito}
        total={total}
        cambiarCantidad={cambiarCantidad}
        eliminarItem={eliminarItem}
        vaciarCarrito={vaciarCarrito}
        finalizarCompra={finalizarCompra}
        cerrarCarrito={cerrarCarrito}
      />
      <PWABanner />
      {notificacion && (
        <Notification 
          mensaje={notificacion.mensaje}
          tipo={notificacion.tipo}
          onClose={() => setNotificacion(null)}
        />
      )}
    </div>
  )
}

export default App
