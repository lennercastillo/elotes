import React from 'react'

const Notification = ({ mensaje, tipo, onClose }) => {
  const getBackgroundColor = () => {
    switch (tipo) {
      case 'success': return '#27ae60'
      case 'warning': return '#f39c12'
      case 'error': return '#e74c3c'
      default: return '#3498db'
    }
  }

  return (
    <div 
      className="notificacion"
      style={{
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: getBackgroundColor(),
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
        zIndex: 5000,
        maxWidth: '400px',
        animation: 'slideInRight 0.3s ease'
      }}
    >
      <div 
        className="notificacion-contenido"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}
      >
        <span className="notificacion-mensaje">{mensaje}</span>
        <button 
          className="notificacion-cerrar"
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: 0,
            lineHeight: 1
          }}
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default Notification
