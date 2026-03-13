import React from 'react'

const Notification = ({ mensaje, tipo, onClose }) => {
  return (
    <div className={`notification ${tipo}`} onClick={onClose}>
      {mensaje}
    </div>
  )
}

export default Notification
