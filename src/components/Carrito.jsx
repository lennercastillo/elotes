import React from 'react'

const Carrito = ({ 
  show, carrito, total, cambiarCantidad, eliminarItem, vaciarCarrito, finalizarCompra, cerrarCarrito 
}) => {
  if (!show) return null

  return (
    <div className="carrito-overlay" onClick={cerrarCarrito}>
      <div className="carrito-content" onClick={(e) => e.stopPropagation()}>
        <div className="carrito-header">
          <h3>Tu Carrito</h3>
          <button className="cerrar-carrito" onClick={cerrarCarrito}>×</button>
        </div>
        
        <div className="carrito-items">
          {carrito.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Tu carrito está vacío</p>
          ) : (
            carrito.map((item, index) => (
              <div key={index} className="carrito-item">
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{item.nombre}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>${item.precio} x {item.cantidad}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button className="btn-cantidad" onClick={() => cambiarCantidad(index, -1)}>-</button>
                  <span style={{ fontWeight: '600', minWidth: '20px', textAlign: 'center', color: 'var(--text-main)' }}>{item.cantidad}</span>
                  <button className="btn-cantidad" onClick={() => cambiarCantidad(index, 1)}>+</button>
                  <button 
                    onClick={() => eliminarItem(index)}
                    style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', width: '28px', height: '28px', cursor: 'pointer', marginLeft: '4px', fontWeight: 'bold' }}
                    aria-label="Eliminar"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        
        {carrito.length > 0 && (
          <>
            <div className="carrito-total">
              <strong>Total: ${total}</strong>
            </div>
            
            <div className="carrito-acciones">
              <button className="btn-vaciar" onClick={vaciarCarrito}>
                Vaciar Carrito
              </button>
              <button className="btn-finalizar" onClick={finalizarCompra}>
                Enviar Pedido
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Carrito
