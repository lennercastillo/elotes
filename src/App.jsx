import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Objetivo from './components/Objetivo'
import Productos from './components/Productos'
import Contacto from './components/Contacto'
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
    mostrarNotificacion('¡Bienvenido a Elotes Locos! 🌽', 'success')
  }, [])

  const cargarCarrito = () => {
    const carritoGuardado = localStorage.getItem('elotesCarrito')
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
    localStorage.setItem('elotesCarrito', JSON.stringify(nuevoCarrito))
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
    mostrarNotificacion(`¡${nombre} agregado al carrito! 🛒`, 'success')
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
    const itemEliminado = carrito[index]
    const nuevoCarrito = carrito.filter((_, i) => i !== index)
    setCarrito(nuevoCarrito)
    actualizarTotal(nuevoCarrito)
    guardarCarrito(nuevoCarrito)
    mostrarNotificacion(`¡${itemEliminado.nombre} eliminado del carrito! 🗑️`, 'info')
  }

  const vaciarCarrito = () => {
    setCarrito([])
    setTotal(0)
    guardarCarrito([])
    mostrarNotificacion('¡Carrito vaciado! 🛒', 'info')
    setShowCarrito(false)
  }

  const abrirCarrito = () => {
    if (carrito.length === 0) {
      mostrarNotificacion('Tu carrito está vacío. ¡Agrega algunos elotes! 🌽', 'info')
      return
    }
    setShowCarrito(true)
    setTimeout(() => {
      mostrarNotificacion('💡 Los pedidos se envían directamente a WhatsApp con pago en efectivo', 'info')
    }, 500)
  }

  const cerrarCarrito = () => {
    setShowCarrito(false)
  }

  const finalizarCompra = () => {
    if (carrito.length === 0) {
      mostrarNotificacion('Tu carrito está vacío. ¡Agrega algunos elotes! 🌽', 'warning')
      return
    }
    cerrarCarrito()
    enviarPedidoWhatsApp()
  }

  const generarMensajePedido = () => {
    const fecha = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

    let mensaje = `🌽 *NUEVO PEDIDO - ELOTES LOCOS* 🌽\n`
    mensaje += `📅 Fecha: ${fecha}\n`
    mensaje += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`

    carrito.forEach((item, index) => {
      const subtotal = item.precio * item.cantidad
      mensaje += `🍽️ *${item.nombre}*\n`
      mensaje += `   • Cantidad: ${item.cantidad}\n`
      mensaje += `   • Precio unitario: C$ ${item.precio}\n`
      mensaje += `   • Subtotal: C$ ${subtotal}\n\n`
    })

    mensaje += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
    mensaje += `💰 *TOTAL DEL PEDIDO: C$ ${total}*\n\n`
    mensaje += `💳 *Método de Pago: EFECTIVO*\n`
    mensaje += `📱 *Cliente: Nuevo cliente*\n\n`
    mensaje += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
    mensaje += `📋 *INSTRUCCIONES:*\n`
    mensaje += `• Por favor confirma este pedido\n`
    mensaje += `• Indica tiempo de entrega estimado\n`
    mensaje += `• Confirma dirección de entrega\n`
    mensaje += `• Confirma método de pago (efectivo)\n\n`
    mensaje += `¡Gracias por tu atención! 🌽✨`

    return mensaje
  }

  const enviarPedidoWhatsApp = () => {
    if (carrito.length === 0) {
      mostrarNotificacion('Tu carrito está vacío. ¡Agrega algunos elotes! 🌽', 'warning')
      return
    }

    const mensaje = generarMensajePedido()
    const telefono = '+50584924965'
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`

    mostrarNotificacion('¡Redirigiendo a WhatsApp para confirmar tu pedido! 📱', 'success')

    setTimeout(() => {
      window.open(url, '_blank')
      setCarrito([])
      setTotal(0)
      guardarCarrito([])
      mostrarNotificacion('¡Pedido enviado! Tu carrito ha sido limpiado. 🛒', 'info')
    }, 1500)
  }

  const abrirWhatsApp = () => {
    const telefono = '+50584924965'
    const mensaje = '¡Hola! Me gustaría hacer un pedido de elotes locos 🌽'
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank')
  }

  const mostrarNotificacion = (mensaje, tipo) => {
    setNotificacion({ mensaje, tipo })
    setTimeout(() => {
      setNotificacion(null)
    }, 5000)
  }

  const toggleMenu = () => {
    setMenuActivo(!menuActivo)
  }

  const cerrarMenu = () => {
    setMenuActivo(false)
  }

  const configurarPWA = () => {
    // PWA configuration will be handled in PWABanner component
  }

  const registrarServiceWorker = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registrado:', registration)
        })
        .catch((error) => {
          console.log('Error al registrar Service Worker:', error)
        })
    }
  }

  return (
    <div className="App">
      <Header 
        menuActivo={menuActivo}
        toggleMenu={toggleMenu}
        cerrarMenu={cerrarMenu}
      />
      <Hero />
      <Objetivo />
      <Productos agregarAlCarrito={agregarAlCarrito} />
      <Contacto abrirWhatsApp={abrirWhatsApp} />
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
