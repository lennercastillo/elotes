import React from 'react'

const Header = ({ menuActivo, toggleMenu, cerrarMenu }) => {
  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo-container">
          <span className="logo-text">Catálogo</span>
        </div>

        <button
          className={`menu-toggle ${menuActivo ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav-menu ${menuActivo ? 'active' : ''}`}>
          <ul className="nav-list">
            <li><a href="#catalogo" onClick={cerrarMenu}>Productos</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
