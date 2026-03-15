import React, { useEffect, useState } from 'react'
import { supabase, SUPABASE_TABLE } from '../lib/supabaseClient'

const Catalog = ({ agregarAlCarrito }) => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProductos = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from(SUPABASE_TABLE).select('*')
      if (error) throw error
      if (data) setProductos(data)
    } catch (err) {
      console.error("Error fetching products:", err.message)
      setError("No se pudieron cargar los productos. Por favor actualiza la página o verifica la conexión a Supabase.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductos()

    // Realtime subscription setup
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: SUPABASE_TABLE,
        },
        (payload) => {
          console.log('Cambio detectado en tiempo real:', payload)
          if (payload.eventType === 'INSERT') {
            setProductos(prev => [...prev, payload.new])
          } else if (payload.eventType === 'UPDATE') {
            setProductos(prev => prev.map(p => p.id === payload.new.id ? payload.new : p))
          } else if (payload.eventType === 'DELETE') {
            setProductos(prev => prev.filter(p => p.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <section id="catalogo" className="catalog-section">
      <div className="container">
        <h2 className="section-title">Nuestros Productos</h2>
        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading-message">Cargando catálogo...</div>
        ) : productos.length === 0 && !error ? (
          <div className="empty-message">No hay productos disponibles por el momento.</div>
        ) : (
          <div className="catalog-grid">
            {productos.map(producto => (
              <div key={producto.id} className="catalog-card">
                <div className="card-image-container">
                  {producto.imagen ? (
                    <img src={producto.imagen} alt={producto.nombre} className="card-image" />
                  ) : (
                    <div className="placeholder-image">Sin imagen</div>
                  )}
                  {producto.categoria && (
                    <span className="card-category-badge">{producto.categoria}</span>
                  )}
                </div>
                <div className="card-info">
                  <h3 className="card-title">{producto.nombre}</h3>
                  <p className="card-description">{producto.descripcion || 'Sin descripción detallada.'}</p>

                  {producto.stock > 0 ? (
                    <div className="stock-info" style={{ fontSize: '0.85rem', color: producto.stock <= 5 ? '#ef4444' : 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: '500' }}>
                      {producto.stock <= 5 ? `¡Solo quedan ${producto.stock} en stock!` : `Disponibles: ${producto.stock}`}
                    </div>
                  ) : (
                    <div className="stock-info" style={{ fontSize: '0.85rem', color: '#ef4444', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      Agotado
                    </div>
                  )}

                  <div className="card-footer">
                    <span className="card-price">${producto.precio}</span>
                    <button
                      className="btn-primary"
                      onClick={() => agregarAlCarrito(producto)}
                      disabled={producto.stock <= 0}
                      style={{ opacity: producto.stock <= 0 ? 0.5 : 1, cursor: producto.stock <= 0 ? 'not-allowed' : 'pointer' }}
                    >
                      {producto.stock <= 0 ? 'Sin Stock' : 'Agregar'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Catalog
