import React, { useState, useEffect } from 'react'

const PWABanner = () => {
  const [showBanner, setShowBanner] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      if (!localStorage.getItem('pwa-banner-dismissed')) {
        setShowBanner(true)
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    if ('standalone' in window.navigator && window.navigator.standalone) {
      document.body.classList.add('pwa-installed')
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const instalarPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        console.log('Usuario aceptó instalar la PWA')
      } else {
        console.log('Usuario rechazó instalar la PWA')
      }
      
      setDeferredPrompt(null)
      ocultarBanner()
    }
  }

  const ocultarBanner = () => {
    setShowBanner(false)
    localStorage.setItem('pwa-banner-dismissed', 'true')
  }

  if (!showBanner) return null

  return (
    <div className={`pwa-banner ${showBanner ? 'show' : ''}`}>
      <div className="pwa-banner-content">
        <div className="pwa-banner-text">
          <i className="fas fa-mobile-alt"></i>
          <span>¡Instala nuestra app para una mejor experiencia!</span>
        </div>
        <div className="pwa-banner-actions">
          <button className="btn-install" onClick={instalarPWA}>
            Instalar
          </button>
          <button className="btn-dismiss" onClick={ocultarBanner}>
            Ahora no
          </button>
        </div>
      </div>
    </div>
  )
}

export default PWABanner
