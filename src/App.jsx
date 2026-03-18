import React, { useState, useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { supabase, SUPABASE_TABLE } from './lib/supabaseClient'
import HomePage from './pages/Home'
import ProductsPage from './pages/Products'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'
import FloatingButtons from './components/FloatingButtons'
import PWABanner from './components/PWABanner'
import Notification from './components/Notification'
import Carrito from './components/Carrito'
import Footer from './components/Footer'

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
    mostrarNotificacion('¡Bienvenido!', 'success')
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

  const agregarAlCarrito = (producto) => {
    // Para compatibilidad con items viejos que no tienen ID, usamos nombre como fallback
    const productoExistente = carrito.find(item => item.id === producto.id || item.nombre === producto.nombre)
    const cantidadActual = productoExistente ? productoExistente.cantidad : 0

    if (cantidadActual >= producto.stock) {
      mostrarNotificacion(`¡Lo sentimos, solo hay ${producto.stock} unidades en stock!`, 'warning')
      return
    }

    let nuevoCarrito

    if (productoExistente) {
      nuevoCarrito = carrito.map(item =>
        (item.id === producto.id || item.nombre === producto.nombre)
          ? { ...item, cantidad: item.cantidad + 1, stock: producto.stock }
          : item
      )
    } else {
      nuevoCarrito = [...carrito, {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1,
        stock: producto.stock
      }]
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

    // Validate stock on increment
    if (cambio > 0 && item.stock !== undefined && nuevaCantidad > item.stock) {
      mostrarNotificacion(`¡Lo sentimos, solo hay ${item.stock} unidades en stock!`, 'warning')
      return
    }

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

  const finalizarCompra = async () => {
    if (carrito.length === 0) {
      mostrarNotificacion('Tu carrito está vacío.', 'warning')
      return
    }
    cerrarCarrito()

    // Descontar inventario de Supabase antes de enviar el WhatsApp
    try {
      mostrarNotificacion('Procesando pedido y actualizando inventario...', 'info')
      for (const item of carrito) {
        // Consultar el stock actual más reciente (por si alguien más compró mientras mirábamos)
        const { data: productoActual, error: errorSelect } = await supabase
          .from(SUPABASE_TABLE)
          .select('stock')
          .eq('id', item.id)
          .single()

        if (!errorSelect && productoActual) {
          const nuevoStock = productoActual.stock - item.cantidad

          await supabase
            .from(SUPABASE_TABLE)
            .update({ stock: nuevoStock < 0 ? 0 : nuevoStock })
            .eq('id', item.id)
        }
      }
    } catch (error) {
      console.error('Error al actualizar el stock en Supabase:', error)
      // Aunque falle la actualización por red, permitimos que se envíe el WhatsApp.
    }

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

  const configurarPWA = () => { }
  const registrarServiceWorker = () => { }

  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <HomePage
              menuActivo={menuActivo}
              toggleMenu={toggleMenu}
              cerrarMenu={cerrarMenu}
              carritoCount={carrito.reduce((sum, item) => sum + item.cantidad, 0)}
            />
          } />
          <Route path="/productos" element={
            <ProductsPage
              menuActivo={menuActivo}
              toggleMenu={toggleMenu}
              cerrarMenu={cerrarMenu}
              carritoCount={carrito.reduce((sum, item) => sum + item.cantidad, 0)}
              agregarAlCarrito={agregarAlCarrito}
            />
          } />
          <Route path="/nosotros" element={
            <AboutPage 
              menuActivo={menuActivo}
              toggleMenu={toggleMenu}
              cerrarMenu={cerrarMenu}
              carritoCount={carrito.reduce((sum, item) => sum + item.cantidad, 0)}
            />
          } />
          <Route path="/contacto" element={
            <ContactPage 
              menuActivo={menuActivo}
              toggleMenu={toggleMenu}
              cerrarMenu={cerrarMenu}
              carritoCount={carrito.reduce((sum, item) => sum + item.cantidad, 0)}
            />
          } />
        </Routes>

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
        {notificacion && (
          <Notification
            mensaje={notificacion.mensaje}
            tipo={notificacion.tipo}
            onClose={() => setNotificacion(null)}
          />
        )}
      </div>
    </HashRouter>
  )
}

export default App
