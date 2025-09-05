import React from 'react'

const FloatingButtons = ({ abrirCarrito, abrirWhatsApp, carritoCount }) => {
  return (
    <>
      <div className="carrito-flotante" onClick={abrirCarrito}>
        🛒
        {carritoCount > 0 && (
          <div className="carrito-contador">
            {carritoCount}
          </div>
        )}
      </div>
      
      <div className="whatsapp-flotante" onClick={abrirWhatsApp}>
        <img 
          src="/whatsapp-logo.jpg" 
          alt="WhatsApp" 
          className="whatsapp-icon"
        />
        <span className="whatsapp-text">WhatsApp</span>
      </div>
    </>
  )
}

export default FloatingButtons
