# Elotes Locos - React Version

Una aplicación web moderna para la venta de elotes locos, desarrollada con React y Vite.

## 🌽 Características

- **Interfaz React Moderna**: Componentes funcionales con hooks
- **Diseño Responsivo**: Optimizado para móviles, tablets y desktop
- **Carrito de Compras**: Gestión de productos con persistencia local
- **Integración WhatsApp**: Envío directo de pedidos a WhatsApp
- **PWA (Progressive Web App)**: Instalable y funciona offline
- **Animaciones Suaves**: Transiciones y efectos visuales atractivos
- **Notificaciones**: Sistema de notificaciones en tiempo real

## 🚀 Tecnologías Utilizadas

- **React 18**: Biblioteca de JavaScript para interfaces de usuario
- **Vite**: Herramienta de construcción rápida
- **CSS3**: Estilos modernos con Flexbox y Grid
- **Service Worker**: Funcionalidad offline
- **Local Storage**: Persistencia de datos del carrito
- **WhatsApp API**: Integración para envío de pedidos

## 📦 Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd elotes-locos-react
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**:
   ```bash
   npm run dev
   ```

4. **Construir para producción**:
   ```bash
   npm run build
   ```

5. **Previsualizar build de producción**:
   ```bash
   npm run preview
   ```

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── Header.jsx          # Navegación principal
│   ├── Hero.jsx            # Sección hero
│   ├── Objetivo.jsx        # Sección objetivo
│   ├── Productos.jsx       # Catálogo de productos
│   ├── Contacto.jsx        # Información de contacto
│   ├── Footer.jsx          # Pie de página
│   ├── Carrito.jsx         # Modal del carrito
│   ├── FloatingButtons.jsx # Botones flotantes
│   ├── PWABanner.jsx       # Banner de instalación PWA
│   └── Notification.jsx    # Sistema de notificaciones
├── App.jsx                 # Componente principal
├── main.jsx               # Punto de entrada
└── index.css              # Estilos globales

public/
├── manifest.json          # Configuración PWA
├── sw.js                  # Service Worker
├── browserconfig.xml      # Configuración para Edge
└── [imágenes]            # Assets estáticos
```

## 🛒 Funcionalidades

### Carrito de Compras
- Agregar/eliminar productos
- Modificar cantidades
- Persistencia en Local Storage
- Cálculo automático del total

### Sistema de Pedidos
- Envío directo a WhatsApp
- Formato estructurado del mensaje
- Información completa del pedido
- Pago siempre en efectivo

### PWA (Progressive Web App)
- Instalable en dispositivos móviles
- Funciona offline
- Notificaciones push
- Experiencia nativa

### Diseño Responsivo
- Menú hamburguesa en móviles
- Animaciones optimizadas
- Touch-friendly en móviles
- Adaptable a todos los tamaños

## 📱 Uso

1. **Navegación**: Usa el menú para navegar entre secciones
2. **Productos**: Haz clic en "Agregar al Carrito" para añadir productos
3. **Carrito**: Usa el botón flotante del carrito para ver/modificar pedidos
4. **Pedido**: Haz clic en "📱 Enviar a WhatsApp" para enviar el pedido
5. **Contacto**: Usa el formulario o botones de WhatsApp para contactar

## 🔧 Configuración

### WhatsApp
- Número configurado: `+50584924965`
- Mensaje personalizable en `App.jsx`

### PWA
- Configuración en `public/manifest.json`
- Service Worker en `public/sw.js`

### Estilos
- Variables CSS en `src/index.css`
- Diseño responsive con media queries

## 🚀 Despliegue

### Vercel
```bash
# Opción 1: Deploy automático desde GitHub (Recomendado)
# 1. Conecta tu repositorio a Vercel
# 2. Vercel detectará automáticamente que es un proyecto Vite
# 3. El build se ejecutará automáticamente

# Opción 2: Deploy manual
npm run build
# Subir carpeta 'dist' a Vercel
```

**Configuración Vercel:**
- **Framework Preset**: Vite
- **Build Command**: `npm run build` (automático)
- **Output Directory**: `dist` (automático)
- **Install Command**: `npm install` (automático)

**Archivo de configuración incluido:**
- `vercel.json` - Configuración para SPA routing

### Netlify
```bash
npm run build
# Arrastrar carpeta 'dist' a Netlify
```

### GitHub Pages
```bash
npm run build
# Subir contenido de 'dist' a la rama gh-pages
```

## 📋 Scripts Disponibles

- `npm run dev`: Servidor de desarrollo
- `npm run build`: Construcción para producción
- `npm run preview`: Previsualizar build
- `npm run lint`: Linter de código

## 🎨 Personalización

### Colores
Modifica las variables CSS en `src/index.css`:
```css
:root {
  --primary-color: #ff6b35;
  --secondary-color: #f7931e;
  --whatsapp-color: #25d366;
}
```

### Productos
Edita el array `productos` en `src/components/Productos.jsx`

### Información de Contacto
Modifica los datos en `src/components/Contacto.jsx`

## 🔒 Seguridad

- Validación de formularios
- Sanitización de inputs
- HTTPS requerido para PWA
- Service Worker seguro

## 📊 Rendimiento

- Lazy loading de componentes
- Optimización de imágenes
- Caching inteligente
- Bundle splitting automático

## 🐛 Solución de Problemas

### PWA no se instala
- Verificar que el sitio esté en HTTPS
- Comprobar manifest.json
- Revisar Service Worker

### Carrito no persiste
- Verificar Local Storage habilitado
- Comprobar función `guardarCarrito`

### WhatsApp no abre
- Verificar número de teléfono
- Comprobar formato del mensaje

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👨‍💻 Desarrollo

Desarrollado con ❤️ usando React y Vite.

## 🖼️ **Verificar Imágenes:**

Una vez que el servidor esté ejecutándose en `http://localhost:3000`, puedes verificar que las imágenes se cargan correctamente visitando:

- **Aplicación principal**: `http://localhost:3000` (o el puerto que Vite asigne)

Si las imágenes no se muestran, verifica que estén en la carpeta `public/` y que el servidor esté ejecutándose correctamente.

## 🔧 **Solución de Problemas de Imágenes:**

### Las imágenes no se cargan
1. Verifica que las imágenes estén en la carpeta `public/`
2. Asegúrate de que el servidor esté ejecutándose (`npm run dev`)
3. Revisa la consola del navegador para errores
4. Verifica que las rutas en los componentes sean correctas

### Error de build en Vercel con imágenes
- **Problema**: `Rollup failed to resolve import "/imagen.jpg?url"`
- **Solución**: Usar rutas directas `/imagen.jpg` en lugar de imports con `?url`
- **Archivos afectados**: Todos los componentes que usan imágenes

### Rutas incorrectas de imágenes
- **Problema**: Imágenes con rutas `/dist/imagen.jpg` en desarrollo
- **Solución**: Usar rutas directas `/imagen.jpg` que funcionan tanto en desarrollo como en producción
- **Archivos corregidos**: `src/components/Productos.jsx`

### Imágenes se ven distorsionadas
- Las imágenes se redimensionan automáticamente con `object-fit: cover`
- Ajusta los estilos CSS si necesitas un comportamiento diferente

---

**Nota**: Esta es la versión React del proyecto original. Mantiene toda la funcionalidad y diseño del proyecto original, pero utiliza React para una mejor organización del código y experiencia de desarrollo.
