import React from 'react'

const FloatingButtons = ({ abrirCarrito, abrirWhatsApp, carritoCount }) => {
  return (
    <div className="floating-buttons-container">
      <button 
        className="btn-floating btn-cart" 
        onClick={abrirCarrito}
        aria-label="Abrir Carrito"
      >
        🛒
        {carritoCount > 0 && (
          <span className="cart-badge">{carritoCount}</span>
        )}
      </button>
      
      <button 
        className="btn-floating btn-whatsapp" 
        onClick={abrirWhatsApp}
        aria-label="Contactar por WhatsApp"
      >
        💬
      </button>
    </div>
  )
}

export default FloatingButtons
