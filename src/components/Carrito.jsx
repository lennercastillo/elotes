import React from 'react'

const Carrito = ({ 
  show, 
  carrito, 
  total, 
  cambiarCantidad, 
  eliminarItem, 
  vaciarCarrito, 
  finalizarCompra, 
  cerrarCarrito 
}) => {
  if (!show) return null

  return (
    <div className="carrito-overlay" style={{ display: 'flex' }} onClick={cerrarCarrito}>
      <div className="carrito-content" onClick={(e) => e.stopPropagation()}>
        <div className="carrito-header">
          <h3>Tu Carrito</h3>
          <button className="cerrar-carrito" onClick={cerrarCarrito}>
            ×
          </button>
        </div>
        
        <div className="carrito-items">
          {carrito.length === 0 ? (
            <p>Tu carrito está vacío</p>
          ) : (
            carrito.map((item, index) => (
              <div key={index} className="carrito-item">
                <div>
                  <strong>{item.nombre}</strong>
                  <br />
                  <small>C$ {item.precio} x {item.cantidad}</small>
                </div>
                <div>
                  <button 
                    className="btn-cantidad"
                    onClick={() => cambiarCantidad(index, -1)}
                  >
                    -
                  </button>
                  <span style={{ margin: '0 10px' }}>{item.cantidad}</span>
                  <button 
                    className="btn-cantidad"
                    onClick={() => cambiarCantidad(index, 1)}
                  >
                    +
                  </button>
                  <button 
                    className="btn-eliminar"
                    onClick={() => eliminarItem(index)}
                    style={{
                      marginLeft: '10px',
                      background: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      padding: '2px 8px',
                      cursor: 'pointer'
                    }}
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
              <strong>Total: C$ {total}</strong>
            </div>
            
            <div className="carrito-acciones">
              <button className="btn-vaciar" onClick={vaciarCarrito}>
                Vaciar Carrito
              </button>
              <button className="btn-finalizar" onClick={finalizarCompra}>
                📱 Enviar a WhatsApp
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Carrito
