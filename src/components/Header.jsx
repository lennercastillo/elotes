import React from 'react'
import { Link } from 'react-router-dom'
import { Store, ShoppingCart } from 'lucide-react'

const Header = ({ menuActivo, toggleMenu, cerrarMenu, carritoCount }) => {
  return (
    <header className="header-light">
      <div className="container header-content-light">
        <div className="logo-container">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <span className="logo-icon-m">
              <Store size={20} />
            </span>
            <span className="logo-text-black">Tienda en línea</span>
          </Link>
        </div>

        <button
          className={`menu-toggle-dark ${menuActivo ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav-menu-light ${menuActivo ? 'active' : ''}`}>
          <ul className="nav-list-light">
            <li><Link to="/" onClick={cerrarMenu}>Inicio</Link></li>
            <li><Link to="/productos" onClick={cerrarMenu}>Catálogo</Link></li>
            <li><Link to="/nosotros" onClick={cerrarMenu}>Sobre Nosotros</Link></li>
            <li><Link to="/contacto" onClick={cerrarMenu}>Contacto</Link></li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="cart-icon-btn">
            <ShoppingCart size={24} color="#475569" />
            {carritoCount > 0 && <span className="cart-badge-header">{carritoCount}</span>}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
